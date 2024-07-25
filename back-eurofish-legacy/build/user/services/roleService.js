"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOption = exports.getOptions = exports.getRolesAndOptions = exports.getRolesAndOptionsByUser = exports.deleteRolAndOptions = exports.updateRoleAndOptions = exports.createRole = void 0;
const role_1 = require("../models/role");
const roleoption_1 = require("../models/roleoption");
const option_1 = require("../models/option");
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const createRole = (role, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!role)
        return { status: 400, message: "Role is required" };
    if (role.options && role.options.length === 0)
        return { status: 400, message: "Options are required" };
    for (const option of role.options) {
        const validateOption = yield option_1.Option.findOne({
            where: { optionName: option },
        });
        if (!validateOption)
            return { status: 404, message: `Option ${validateOption} not found` };
    }
    const newRole = yield role_1.Role.create({
        roleName: role.name,
        description: role.description,
        registeredByUserId: id,
        createdAt: new Date(),
    }).save();
    for (const option of role.options) {
        const newOption = yield option_1.Option.findOne({
            where: { optionName: option },
        });
        if (newOption) {
            yield roleoption_1.RoleOption.create({
                role: newRole,
                option: newOption,
            }).save();
        }
    }
    return { status: 201, data: newRole };
});
exports.createRole = createRole;
const updateRoleAndOptions = (role, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!role)
        return { status: 400, message: "Role is required" };
    if (role.options && role.options.length === 0)
        return { status: 400, message: "Options are required" };
    const roleToUpdate = yield role_1.Role.findOne({
        where: { roleId: id },
        relations: ["roleOptions", "roleOptions.option"],
    });
    if (!roleToUpdate)
        return { status: 404, message: "Role not found" };
    const options = yield option_1.Option.find({
        where: { optionName: (0, typeorm_1.In)(role.options) },
    });
    if (options.length !== role.options.length) {
        return { status: 404, message: "One or more options not found" };
    }
    roleToUpdate.roleName = role.name;
    roleToUpdate.description = role.description;
    roleToUpdate.updatedAt = new Date();
    yield roleToUpdate.save();
    const existingOptions = roleToUpdate.roleOptions.map(ro => ro.option);
    const existingOptionNames = existingOptions.map(option => option.optionName);
    const optionsToAdd = options.filter(option => !existingOptionNames.includes(option.optionName));
    const optionsToRemove = existingOptions.filter(option => !role.options.includes(option.optionName));
    for (const option of optionsToAdd) {
        const existingRelation = roleToUpdate.roleOptions.find(ro => ro.option.optionId === option.optionId);
        if (!existingRelation) {
            yield roleoption_1.RoleOption.create({
                role: roleToUpdate,
                option: option,
            }).save();
        }
    }
    for (const option of optionsToRemove) {
        const roleOptionToRemove = roleToUpdate.roleOptions.find(ro => ro.option.optionId === option.optionId);
        if (roleOptionToRemove) {
            yield roleoption_1.RoleOption.remove(roleOptionToRemove);
        }
    }
    const updatedRole = yield role_1.Role.findOne({ where: { roleId: id } });
    return { status: 200, data: updatedRole };
});
exports.updateRoleAndOptions = updateRoleAndOptions;
const deleteRolAndOptions = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const roleToDelete = yield role_1.Role.findOne({
        where: { roleId: id },
        relations: ["roleOptions", "userRoles"],
    });
    if (!roleToDelete)
        return { status: 404, message: "Role not found" };
    if (roleToDelete.userRoles && roleToDelete.userRoles.length > 0) {
        return { status: 400, message: "Role is associated with one or more users and cannot be deleted" };
    }
    yield roleoption_1.RoleOption.delete({ role: roleToDelete });
    yield roleToDelete.remove();
    return { status: 200, message: "Role deleted" };
});
exports.deleteRolAndOptions = deleteRolAndOptions;
const getRolesAndOptionsByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({
        where: { userId: id },
        relations: ["roles", "roles.role"]
    });
    if (!user)
        return { status: 404, message: "User not found" };
    if (!user.roles.length)
        return { status: 404, message: "Roles not found for this user" };
    const optionsMap = new Map();
    yield Promise.all(user.roles.flatMap((userRole) => __awaiter(void 0, void 0, void 0, function* () {
        const roleWithOptions = yield role_1.Role.findOne({
            where: { roleId: userRole.role.roleId },
            relations: ["roleOptions", "roleOptions.option"]
        });
        if (!roleWithOptions)
            return [];
        roleWithOptions.roleOptions.forEach(roleOption => {
            if (roleOption.option && !optionsMap.has(roleOption.option.optionId)) {
                optionsMap.set(roleOption.option.optionId, roleOption.option);
            }
        });
    })));
    const uniqueOptions = Array.from(optionsMap.values());
    return { status: 200, data: uniqueOptions };
});
exports.getRolesAndOptionsByUser = getRolesAndOptionsByUser;
const getRolesAndOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_1.Role.find({ relations: ["roleOptions.option"] });
    if (!roles)
        return { status: 404, message: "Roles not found" };
    return { status: 200, data: roles };
});
exports.getRolesAndOptions = getRolesAndOptions;
const getOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = yield option_1.Option.find();
    if (!options)
        return { status: 404, message: "Options not found" };
    return { status: 200, data: options };
});
exports.getOptions = getOptions;
const createOption = (option, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!option)
        return { status: 400, message: "Option is required" };
    const newOption = yield option_1.Option.create({
        optionName: option.name,
        description: option.description,
        path: option.path,
        createdByUserId: id,
        createdAt: new Date(),
    }).save();
    return { status: 201, data: newOption };
});
exports.createOption = createOption;
