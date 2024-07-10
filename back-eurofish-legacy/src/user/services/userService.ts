import { IUser } from "../interfaces/user";
import { Role } from "../models/role";
import { User } from "../models/user";
import { UserRole } from "../models/userole";
import { encrypt } from "../utils/bcrypt.handle";

const createUser = async (user: IUser, id: number, foto?: any) => {
  const userExists = await User.findOne({
    where: { username: user.username },
  });
  if (userExists) return { status: 400, message: "User already exists" };

  if (user.roles.length === 0)
    return { status: 400, message: "Roles are required" };

  for (const roleName of user.roles) {
    const role = await Role.findOne({
      where: { roleName: roleName },
    });
    if (!role) return { status: 404, message: `Role ${roleName} not found` };
  }

  const password = await encrypt(user.password);
  const newUser = User.create({
    username: user.username,
    name: user.name,
    password: password,
    state: true,
    registeredByUserId: id,
    createdAt: new Date(),
    foto: foto.buffer,
  });
  const userSave = await newUser.save();
  for (const roleName of user.roles) {
    const role = await Role.findOne({
      where: { roleName: roleName },
    });
    if (!role) return { status: 404, message: `Role ${roleName} not found` };
    await UserRole.create({
      user: userSave,
      role: role,
    }).save();
  }
  return { status: 200, data: userSave };
};

const updateUser = async (user: IUser, id: number) => {
  const userToUpdate = await User.findOne({
    where: { userId: id },
  });
  if (!userToUpdate) return { status: 404, message: "User not found" };
  const currentRoles = await UserRole.find({
    where: { user: userToUpdate },
    relations: ["role"],
  });
  if (!currentRoles) return { status: 404, message: "Roles not found" };
  for (const roleName of user.roles) {
    const role = await Role.findOne({
      where: { roleName: roleName },
    });
    if (!role) return { status: 404, message: `Role ${roleName} not found` };
  }

  const password = await encrypt(user.password);
  userToUpdate.username = user.username;
  userToUpdate.name = user.name;
  userToUpdate.password = password;
  userToUpdate.updatedAt = new Date();
  await userToUpdate.save();

  const currentRoleNames = new Set(
    currentRoles.map((userRole) => userRole.role.roleName)
  );
  const newRoleNames = new Set(user.roles);
  const rolesToDelete = currentRoles.filter(
    (userRole) => !newRoleNames.has(userRole.role.roleName)
  );
  for (const userRole of rolesToDelete) {
    await UserRole.remove(userRole);
  }
  for (const roleName of newRoleNames) {
    if (!currentRoleNames.has(roleName)) {
      const roleToAdd = await Role.findOne({ where: { roleName: roleName } });
      if (roleToAdd) {
        await UserRole.create({
          user: userToUpdate,
          role: roleToAdd,
        }).save();
      }
    }
  }

  return { status: 200, data: userToUpdate };
};

const deleteUser = async (id: number) => {
  const userToDelete = await User.findOne({
    where: { userId: id },
  });
  if (!userToDelete) return { status: 404, message: "User not found" };
  userToDelete.state = false;
  await userToDelete.save();
  return { status: 200, message: "User deleted" };
};

const getUsers = async () => {
  const users = await User.find({ relations: ["roles", "roles.role"] });
  if (!users.length) return { status: 404, message: "Users not found" };
  const usersWithDetails = users.map((user) => ({
    userId: user.userId,
    username: user.username,
    name: user.name,
    state: user.state,
    createAt: user.createdAt,
    updatedAt: user.updatedAt,
    roles: user.roles.map((userRole) => userRole.role.roleName),
    registeredBy: user.registeredByUserId
      ? users.find((u) => u.userId === user.registeredByUserId)?.name
      : null,
  }));
  return { status: 200, data: usersWithDetails };
};
const getUserFoto = async (id: number, includePhoto: boolean) => {
  const user = await User.findOne({
    where: { userId: id },
    select: includePhoto ? ["name", "foto"] : ["name"]
  });

  if (!user) return { status: 404, message: "User not found" };

  if (includePhoto && user.foto) {
    const photoBase64 = user.foto.toString('base64');
    return { status: 200, data: { name: user.name, foto: photoBase64 } };
  }

  return { status: 200, data: { name: user.name } };
};

const getUserInfoById = async (id: number) => {
  const user = await User.findOne({
    where: { userId: id },
    relations: ["roles", "roles.role"],
    select: ["userId", "username", "name", "state", "createdAt", "updatedAt"],
  });
  if (!user) return { status: 404, message: "User not found" };
  
  return { status: 200, data: user };

}

export { createUser, updateUser, deleteUser, getUsers, getUserFoto, getUserInfoById };
