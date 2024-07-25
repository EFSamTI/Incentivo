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
exports.getUserInfoById = exports.getUserFoto = exports.getUsers = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const role_1 = require("../models/role");
const user_1 = require("../models/user");
const userole_1 = require("../models/userole");
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const createUser = (user, id, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_1.User.findOne({
        where: { username: user.username },
    });
    if (userExists)
        return { status: 400, message: "User already exists" };
    if (user.roles.length === 0)
        return { status: 400, message: "Roles are required" };
    for (const roleName of user.roles) {
        const role = yield role_1.Role.findOne({
            where: { roleName: roleName },
        });
        if (!role)
            return { status: 404, message: `Role ${roleName} not found` };
    }
    const password = yield (0, bcrypt_handle_1.encrypt)(user.password);
    const newUser = user_1.User.create({
        username: user.username,
        name: user.name,
        password: password,
        state: true,
        registeredByUserId: id,
        createdAt: new Date(),
        foto: foto.buffer,
    });
    const userSave = yield newUser.save();
    for (const roleName of user.roles) {
        const role = yield role_1.Role.findOne({
            where: { roleName: roleName },
        });
        if (!role)
            return { status: 404, message: `Role ${roleName} not found` };
        yield userole_1.UserRole.create({
            user: userSave,
            role: role,
        }).save();
    }
    return { status: 200, data: userSave };
});
exports.createUser = createUser;
const updateUser = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const userToUpdate = yield user_1.User.findOne({
        where: { userId: id },
    });
    if (!userToUpdate)
        return { status: 404, message: "User not found" };
    const currentRoles = yield userole_1.UserRole.find({
        where: { user: userToUpdate },
        relations: ["role"],
    });
    if (!currentRoles)
        return { status: 404, message: "Roles not found" };
    for (const roleName of user.roles) {
        const role = yield role_1.Role.findOne({
            where: { roleName: roleName },
        });
        if (!role)
            return { status: 404, message: `Role ${roleName} not found` };
    }
    const password = yield (0, bcrypt_handle_1.encrypt)(user.password);
    userToUpdate.username = user.username;
    userToUpdate.name = user.name;
    userToUpdate.password = password;
    userToUpdate.updatedAt = new Date();
    yield userToUpdate.save();
    const currentRoleNames = new Set(currentRoles.map((userRole) => userRole.role.roleName));
    const newRoleNames = new Set(user.roles);
    const rolesToDelete = currentRoles.filter((userRole) => !newRoleNames.has(userRole.role.roleName));
    for (const userRole of rolesToDelete) {
        yield userole_1.UserRole.remove(userRole);
    }
    for (const roleName of newRoleNames) {
        if (!currentRoleNames.has(roleName)) {
            const roleToAdd = yield role_1.Role.findOne({ where: { roleName: roleName } });
            if (roleToAdd) {
                yield userole_1.UserRole.create({
                    user: userToUpdate,
                    role: roleToAdd,
                }).save();
            }
        }
    }
    return { status: 200, data: userToUpdate };
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userToDelete = yield user_1.User.findOne({
        where: { userId: id },
    });
    if (!userToDelete)
        return { status: 404, message: "User not found" };
    userToDelete.state = false;
    yield userToDelete.save();
    return { status: 200, message: "User deleted" };
});
exports.deleteUser = deleteUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.find({ relations: ["roles", "roles.role"] });
    if (!users.length)
        return { status: 404, message: "Users not found" };
    const usersWithDetails = users.map((user) => {
        var _a;
        return ({
            userId: user.userId,
            username: user.username,
            name: user.name,
            state: user.state,
            createAt: user.createdAt,
            updatedAt: user.updatedAt,
            roles: user.roles.map((userRole) => userRole.role.roleName),
            registeredBy: user.registeredByUserId
                ? (_a = users.find((u) => u.userId === user.registeredByUserId)) === null || _a === void 0 ? void 0 : _a.name
                : null,
        });
    });
    return { status: 200, data: usersWithDetails };
});
exports.getUsers = getUsers;
const getUserFoto = (id, includePhoto) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({
        where: { userId: id },
        select: includePhoto ? ["name", "foto"] : ["name"]
    });
    if (!user)
        return { status: 404, message: "User not found" };
    if (includePhoto && user.foto) {
        const photoBase64 = user.foto.toString('base64');
        return { status: 200, data: { name: user.name, foto: photoBase64 } };
    }
    return { status: 200, data: { name: user.name } };
});
exports.getUserFoto = getUserFoto;
const getUserInfoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({
        where: { userId: id },
        relations: ["roles", "roles.role"],
        select: ["userId", "username", "name", "state", "createdAt", "updatedAt"],
    });
    if (!user)
        return { status: 404, message: "User not found" };
    return { status: 200, data: user };
});
exports.getUserInfoById = getUserInfoById;
