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
exports.registerUser = exports.logoutUser = exports.loginUser = void 0;
const typeorm_1 = require("typeorm");
const jwt_handle_1 = require("../utils/jwt.handle");
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const sesion_1 = require("../models/sesion");
const user_1 = require("../models/user");
const user_helper_1 = require("../helpers/user.helper");
const loginUser = (usuario, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_helper_1.findUser)(usuario);
    const userLogin = yield user_1.User.findOne({
        where: { userId: user === null || user === void 0 ? void 0 : user.userId },
    });
    if (!user)
        return { status: 404, message: "Usuario no encontrado" };
    else if (!user.state)
        return { status: 403, message: "Usuario le quitaron el acceso al sistema" };
    const passworHash = user.password;
    const isVerified = yield (0, user_helper_1.verifyPassword)(password, passworHash);
    if (!isVerified) {
        yield user.save();
        return { status: 403, message: "Contraseña incorrecta" };
    }
    yield (0, user_helper_1.createSession)(user);
    const token = (0, jwt_handle_1.generateToken)(user.userId);
    const data = {
        token,
        user: userLogin
    };
    return { status: 200, data: data };
});
exports.loginUser = loginUser;
const registerUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, name, username, } = body;
    const userByUsername = yield user_1.User.findOne({
        where: { username: username },
    });
    if (userByUsername)
        return { status: 409, message: "Nombre de usuario ya existe" };
    const passHash = yield (0, bcrypt_handle_1.encrypt)(password);
    const newUser = user_1.User.create({
        username: username,
        name: name,
        password: passHash,
        state: true,
        createdAt: new Date(),
    });
    yield newUser.save();
    return { status: 201, data: newUser };
});
exports.registerUser = registerUser;
const logoutUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({ where: { userId: Number(id) } });
    if (!user)
        return { status: 404, message: "Usuario no encontrado" };
    const activeSession = yield sesion_1.Session.findOne({
        where: { user: user, logoutTime: (0, typeorm_1.IsNull)() },
    });
    if (!activeSession)
        return {
            status: 404,
            message: "No hay sesiones activas para este usuario",
        };
    activeSession.logoutTime = new Date();
    yield activeSession.save();
    return { status: 204, message: "Sesión cerrada" };
});
exports.logoutUser = logoutUser;
