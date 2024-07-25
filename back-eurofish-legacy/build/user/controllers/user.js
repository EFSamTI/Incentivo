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
exports.getUserInfoCtrl = exports.deleteUserCtrl = exports.updateUserCtrl = exports.registerUserCtrl = exports.getUserImageByIdCtrl = exports.getUsersCtrl = void 0;
const error_handle_1 = require("../utils/error.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const userService_1 = require("../services/userService");
const getUsersCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userService_1.getUsers)();
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getUsersCtrl = getUsersCtrl;
const getUserImageByIdCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return (0, error_handle_1.httpError)(res, "Token is required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        const result = yield (0, userService_1.getUserFoto)(id, true);
        if (result.status === 404) {
            return res.status(404).send(result.message);
        }
        const user = result.data;
        if (!user)
            return (0, error_handle_1.httpError)(res, "User not found");
        res.json({
            name: user.name,
            foto: user.foto
        });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getUserImageByIdCtrl = getUserImageByIdCtrl;
const getUserInfoCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return (0, error_handle_1.httpError)(res, "Token is required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        const result = yield (0, userService_1.getUserInfoById)(id);
        return res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getUserInfoCtrl = getUserInfoCtrl;
const registerUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userString = req.body.user;
        const foto = req.file;
        const user = userString ? JSON.parse(userString) : null;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token || !user)
            return (0, error_handle_1.httpError)(res, "Token and user are required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        if (!id || isNaN(Number(id)))
            return (0, error_handle_1.httpError)(res, "Invalid token");
        const result = yield (0, userService_1.createUser)(user, Number(id), foto);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.registerUserCtrl = registerUserCtrl;
const updateUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, user } = req.body;
        if (!id || !user)
            return (0, error_handle_1.httpError)(res, "User owner and user are required");
        const result = yield (0, userService_1.updateUser)(user, Number(id));
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.updateUserCtrl = updateUserCtrl;
const deleteUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id)
            return (0, error_handle_1.httpError)(res, "Id is required");
        const result = yield (0, userService_1.deleteUser)(Number(id));
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.deleteUserCtrl = deleteUserCtrl;
