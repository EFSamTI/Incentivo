import { IsNull } from "typeorm";

import { generateToken } from "../utils/jwt.handle";
import { encrypt } from "../utils/bcrypt.handle";
import { Session } from "../models/sesion";
import { User } from "../models/user";
import { findUser, verifyPassword, createSession } from "../helpers/user.helper";

const loginUser = async (usuario: string, password: string) => {

  const user = await findUser(usuario);

  const userLogin = await User.findOne({
    where: { userId: user?.userId },
  });

  if (!user) return { status: 404, message: "Usuario no encontrado" };
  else if (!user.state)
    return { status: 403, message: "Usuario le quitaron el acceso al sistema" };

  const passworHash = user.password;
  const isVerified = await verifyPassword(password, passworHash);

  if (!isVerified) {
    await user.save();
    return { status: 403, message: "Contraseña incorrecta" };
  }

  await createSession(user);
  const token = generateToken(user.userId);

  const data = {
    token,
    user: userLogin
  };

  return { status: 200, data: data };
};


const registerUser = async (body: any) => {
  const {
    password,
    name,
    username,
  } = body;

  const userByUsername = await User.findOne({
    where: { username: username },
  });
  if (userByUsername)
    return { status: 409, message: "Nombre de usuario ya existe" };

  const passHash = await encrypt(password);

  const newUser = User.create({
    username:username,
    name: name,
    password: passHash,
    state: true,
    createdAt: new Date(),
  });

  await newUser.save();
  return { status: 201, data: newUser };
};

const logoutUser = async (id: number) => {
  const user = await User.findOne({ where: { userId: Number(id) } });
  if (!user) return { status: 404, message: "Usuario no encontrado" };

  const activeSession = await Session.findOne({
    where: { user: user, logoutTime: IsNull() },
  });
  if (!activeSession)
    return {
      status: 404,
      message: "No hay sesiones activas para este usuario",
    };

  activeSession.logoutTime = new Date();
  await activeSession.save();

  return { status: 204, message: "Sesión cerrada" };
};


export { loginUser, logoutUser, registerUser };
