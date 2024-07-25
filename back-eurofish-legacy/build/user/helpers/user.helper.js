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
exports.createSession = exports.verifyPassword = exports.findUser = void 0;
const sesion_1 = require("../models/sesion");
const user_1 = require("../models/user");
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const findUser = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.User.findOne({ where: { username: usuario } });
});
exports.findUser = findUser;
const verifyPassword = (password, passworHash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcrypt_handle_1.verified)(password, passworHash);
});
exports.verifyPassword = verifyPassword;
const createSession = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newSession = sesion_1.Session.create({
        loginTime: new Date(),
        user: user,
        createdAt: new Date(),
    });
    yield newSession.save();
});
exports.createSession = createSession;
