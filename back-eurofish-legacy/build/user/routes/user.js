"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const file_1 = __importDefault(require("../middleware/file"));
const session_1 = require("../middleware/session");
const user_1 = require("../controllers/user");
const read_1 = require("../middleware/read");
const routerUser = (0, express_1.Router)();
exports.routerUser = routerUser;
routerUser.get("/usuarios", session_1.checkJwt, user_1.getUsersCtrl);
routerUser.get("/usuario/foto", session_1.checkJwt, user_1.getUserImageByIdCtrl);
routerUser.get("/usuario/info", session_1.checkJwt, user_1.getUserInfoCtrl);
routerUser.post("/usuario", session_1.checkJwt, file_1.default.single('file'), read_1.readImage, user_1.registerUserCtrl);
routerUser.put("/usuario/update", session_1.checkJwt, user_1.updateUserCtrl);
routerUser.post("/usuario/delete", session_1.checkJwt, user_1.deleteUserCtrl);
