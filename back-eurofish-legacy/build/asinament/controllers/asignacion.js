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
exports.verifiAsignacionesCtrl = exports.deleteAsignacionesCtrl = exports.asignacionesSinCambiosCtrl = exports.asignacionesArielCtrl = exports.asignacionesComodinCtrl = void 0;
const error_handle_1 = require("../../user/utils/error.handle");
const jwt_handle_1 = require("../../user/utils/jwt.handle");
const asignacion_1 = require("../services/asignacion");
const verifiAsignacionesCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        if (!data)
            return (0, error_handle_1.httpError)(res, "Data is required");
        const result = yield (0, asignacion_1.verifyAsignaciones)(data);
        res.status(result.status).send(result.data);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.verifiAsignacionesCtrl = verifiAsignacionesCtrl;
const asignacionesComodinCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { data } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return (0, error_handle_1.httpError)(res, "Token is required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        const result = yield (0, asignacion_1.saveAsignacionesComodin)(data, id);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.asignacionesComodinCtrl = asignacionesComodinCtrl;
const asignacionesArielCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { data } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return (0, error_handle_1.httpError)(res, "Token is required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        const result = yield (0, asignacion_1.saveAsignacionesAriel)(data, id);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.asignacionesArielCtrl = asignacionesArielCtrl;
const asignacionesSinCambiosCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { data } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return (0, error_handle_1.httpError)(res, "Token is required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        const result = yield (0, asignacion_1.saveAsignacionesSinCambios)(data, id);
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.asignacionesSinCambiosCtrl = asignacionesSinCambiosCtrl;
const deleteAsignacionesCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const result = yield (0, asignacion_1.deleteAsignacion)(data);
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.deleteAsignacionesCtrl = deleteAsignacionesCtrl;
