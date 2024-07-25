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
exports.deleteParadasCtrl = exports.putParadasCtrl = exports.postParadasCtrl = exports.getParadasCtrl = void 0;
const error_handle_1 = require("../../user/utils/error.handle");
const jwt_handle_1 = require("../../user/utils/jwt.handle");
const parada_1 = require("../services/parada");
const getParadasCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const result = yield (0, parada_1.listFilterParadas)(data);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getParadasCtrl = getParadasCtrl;
const postParadasCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { data } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return (0, error_handle_1.httpError)(res, "Token is required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        const result = yield (0, parada_1.createFilterParada)(data, id);
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.postParadasCtrl = postParadasCtrl;
const putParadasCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const result = yield (0, parada_1.actualizarParada)(data);
        res.status(result.status).send(result.message || result.data);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.putParadasCtrl = putParadasCtrl;
const deleteParadasCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const result = yield (0, parada_1.eliminarParada)(data);
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.deleteParadasCtrl = deleteParadasCtrl;
