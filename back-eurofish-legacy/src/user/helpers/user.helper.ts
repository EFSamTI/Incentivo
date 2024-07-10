import { Session } from "../models/sesion";
import { User } from "../models/user";
import { verified } from "../utils/bcrypt.handle";


const findUser = async (usuario: string) => {
  return await User.findOne({ where: { username: usuario } });
};

const verifyPassword = async (password: string, passworHash: string) => {
  return await verified(password, passworHash);
};

const createSession = async (user: User) => {
  const newSession = Session.create({
    loginTime: new Date(),
    user: user,
    createdAt: new Date(),
  });
  await newSession.save();
};

 
export { findUser, verifyPassword, createSession };