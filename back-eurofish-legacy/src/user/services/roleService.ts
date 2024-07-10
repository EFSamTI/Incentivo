import { Role } from "../models/role";
import { RoleOption } from "../models/roleoption";
import { Option } from "../models/option";
import { IOption, IRole } from "../interfaces/rolesAndOptions";
import { In } from "typeorm";
import { User } from "../models/user";

const createRole = async (role: IRole, id: number) => {
  if (!role) return { status: 400, message: "Role is required" };
  if (role.options && role.options.length === 0)
    return { status: 400, message: "Options are required" };
  for (const option of role.options) {
    const validateOption = await Option.findOne({
      where: { optionName: option },
    });
    if (!validateOption)
      return { status: 404, message: `Option ${validateOption} not found` };
  }
  const newRole = await Role.create({
    roleName: role.name,
    description: role.description,
    registeredByUserId: id,
    createdAt: new Date(),
  }).save();

  for (const option of role.options) {
    const newOption = await Option.findOne({
      where: { optionName: option },
    });
    if (newOption) {
      await RoleOption.create({
        role: newRole,
        option: newOption,
      }).save();
    }
  }
  return { status: 201, data: newRole };
};


const updateRoleAndOptions = async (role: IRole, id: number) => {
  if (!role) return { status: 400, message: "Role is required" };
  if (role.options && role.options.length === 0)
    return { status: 400, message: "Options are required" };

  const roleToUpdate = await Role.findOne({
    where: { roleId: id },
    relations: ["roleOptions", "roleOptions.option"],
  });

  if (!roleToUpdate) return { status: 404, message: "Role not found" };

  const options = await Option.find({
    where: { optionName: In(role.options) },
  });

  if (options.length !== role.options.length) {
    return { status: 404, message: "One or more options not found" };
  }

  roleToUpdate.roleName = role.name;
  roleToUpdate.description = role.description;
  roleToUpdate.updatedAt = new Date();
  await roleToUpdate.save();

  const existingOptions = roleToUpdate.roleOptions.map(ro => ro.option);
  const existingOptionNames = existingOptions.map(option => option.optionName);
  const optionsToAdd = options.filter(option => !existingOptionNames.includes(option.optionName));
  const optionsToRemove = existingOptions.filter(option => !role.options.includes(option.optionName));

  for (const option of optionsToAdd) {
    const existingRelation = roleToUpdate.roleOptions.find(ro => ro.option.optionId === option.optionId);
    if (!existingRelation) {
      await RoleOption.create({
        role: roleToUpdate,
        option: option,
      }).save();
    }
  }

  for (const option of optionsToRemove) {
    const roleOptionToRemove = roleToUpdate.roleOptions.find(ro => ro.option.optionId === option.optionId);
    if (roleOptionToRemove) {
      await RoleOption.remove(roleOptionToRemove);
    }
  }

  const updatedRole = await Role.findOne({ where: { roleId: id } });
  return { status: 200, data: updatedRole };
};
const deleteRolAndOptions = async (id: number) => {
  const roleToDelete = await Role.findOne({
    where: { roleId: id },
    relations: ["roleOptions", "userRoles"], // Cambiado de "users" a "userRoles"
  });
  if (!roleToDelete) return { status: 404, message: "Role not found" };

  // Verificar si el rol está asociado a algún usuario a través de la relación "userRoles"
  if (roleToDelete.userRoles && roleToDelete.userRoles.length > 0) {
    return { status: 400, message: "Role is associated with one or more users and cannot be deleted" };
  }

  await RoleOption.delete({ role: roleToDelete });

  await roleToDelete.remove();
  return { status: 200, message: "Role deleted" };
};

const getRolesAndOptionsByUser = async (id: number) => {
  const user = await User.findOne({
    where: { userId: id },
    relations: ["roles", "roles.role"]
  });
  if (!user) return { status: 404, message: "User not found" };

  if (!user.roles.length) return { status: 404, message: "Roles not found for this user" };
  const optionsMap = new Map();
  await Promise.all(user.roles.flatMap(async (userRole) => {
    const roleWithOptions = await Role.findOne({
      where: { roleId: userRole.role.roleId },
      relations: ["roleOptions", "roleOptions.option"]
    });
    if (!roleWithOptions) return [];
    roleWithOptions.roleOptions.forEach(roleOption => {
      if (roleOption.option && !optionsMap.has(roleOption.option.optionId)) {
        optionsMap.set(roleOption.option.optionId, roleOption.option);
      }
    });
  }));
  const uniqueOptions = Array.from(optionsMap.values());
  return { status: 200, data: uniqueOptions };
};


const getRolesAndOptions = async () => {
  const roles = await Role.find({ relations: ["roleOptions.option"] });
  if (!roles) return { status: 404, message: "Roles not found" };
  return { status: 200, data: roles };
}

const getOptions = async () => {
  const options = await Option.find();
  if (!options) return { status: 404, message: "Options not found" };
  return { status: 200, data: options };
}

const createOption = async (option: IOption, id: number) => {
  if (!option) return { status: 400, message: "Option is required" };
  const newOption = await Option.create({
    optionName: option.name,
    description: option.description,
    path: option.path,
    createdByUserId: id,
    createdAt: new Date(),
  }).save();
  return { status: 201, data: newOption };
};



export {
  createRole,
  updateRoleAndOptions,
  deleteRolAndOptions,
  getRolesAndOptionsByUser,
  getRolesAndOptions,
  getOptions,
  createOption
};
