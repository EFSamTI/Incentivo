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
exports.createOptionCtrl = exports.getOptionsCtrl = exports.getRolesCtrl = exports.deleteRoleCtrl = exports.updateRoleCtrl = exports.registerRoleCtrl = exports.getRolesUserCtrl = void 0;
const roleService_1 = require("../services/roleService");
const error_handle_1 = require("../utils/error.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const getRolesUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return (0, error_handle_1.httpError)(res, "Token and user are required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        const result = yield (0, roleService_1.getRolesAndOptionsByUser)(id);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getRolesUserCtrl = getRolesUserCtrl;
const registerRoleCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const { role } = req.body;
        if (!token || !role)
            return (0, error_handle_1.httpError)(res, "Token and user are required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        if (!id || isNaN(Number(id)))
            return (0, error_handle_1.httpError)(res, "Invalid token");
        const result = yield (0, roleService_1.createRole)(role, Number(id));
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.registerRoleCtrl = registerRoleCtrl;
const updateRoleCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, role } = req.body;
        if (!id || !role)
            return (0, error_handle_1.httpError)(res, "Role owner and role are required");
        const result = yield (0, roleService_1.updateRoleAndOptions)(role, Number(id));
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.updateRoleCtrl = updateRoleCtrl;
const deleteRoleCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id)
            return (0, error_handle_1.httpError)(res, "Id is required");
        const result = yield (0, roleService_1.deleteRolAndOptions)(Number(id));
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.deleteRoleCtrl = deleteRoleCtrl;
const getRolesCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roleService_1.getRolesAndOptions)();
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getRolesCtrl = getRolesCtrl;
const getOptionsCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roleService_1.getOptions)();
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getOptionsCtrl = getOptionsCtrl;
const createOptionCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { option } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token || !option)
            return (0, error_handle_1.httpError)(res, "Token and option are required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        if (!id || isNaN(Number(id)))
            return (0, error_handle_1.httpError)(res, "Invalid token");
        const result = yield (0, roleService_1.createOption)(option, Number(id));
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.createOptionCtrl = createOptionCtrl;
