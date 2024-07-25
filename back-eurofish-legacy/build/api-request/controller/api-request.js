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
exports.eliminarConfigRequestCtrl = exports.getConfigsRequestCtrl = exports.activarConfigRequestCtrl = exports.desactivarConfigRequestCtrl = exports.updateConfigRequestCtrl = exports.createConfigRequestCtrl = exports.postTali = exports.postAriel = void 0;
const error_handle_1 = require("../../user/utils/error.handle");
const api_request_1 = require("../service/api-request");
const peticion_1 = require("../middleware/peticion");
const jwt_handle_1 = require("../../user/utils/jwt.handle");
const postAriel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req.body;
        const result = yield (0, api_request_1.requestAriel)(body);
        if (!result)
            return (0, error_handle_1.httpError)(res, "No se encontraron los parametros");
        const dataResponse = yield (0, peticion_1.fetchArielMessage)(result);
        if (!dataResponse)
            return (0, error_handle_1.httpError)(res, "No se pudo obtener la respuesta de Ariel");
        res.status(200).send(dataResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.postAriel = postAriel;
const postTali = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        if (!data)
            return (0, error_handle_1.httpError)(res, "Lista de fecha es requerida para la peticion");
        const result = yield (0, api_request_1.requestTali)();
        if (!result)
            return (0, error_handle_1.httpError)(res, "No se encontraron los parametros");
        const dataResponse = yield (0, peticion_1.fetchTaliMessage)(result, data);
        res.status(200).send(dataResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.postTali = postTali;
const createConfigRequestCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { data } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return (0, error_handle_1.httpError)(res, "Token is required");
        const id = (0, jwt_handle_1.tokenInfo)(token);
        const result = yield (0, api_request_1.createConfigRequest)(data, id);
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.createConfigRequestCtrl = createConfigRequestCtrl;
const updateConfigRequestCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const result = yield (0, api_request_1.updateConfigRequest)(data);
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.updateConfigRequestCtrl = updateConfigRequestCtrl;
const desactivarConfigRequestCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const result = yield (0, api_request_1.desactivarConfigRequest)(Number(id));
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.desactivarConfigRequestCtrl = desactivarConfigRequestCtrl;
const activarConfigRequestCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const result = yield (0, api_request_1.activarConfigRequest)(Number(id));
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.activarConfigRequestCtrl = activarConfigRequestCtrl;
const getConfigsRequestCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, api_request_1.listConfigRequest)();
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getConfigsRequestCtrl = getConfigsRequestCtrl;
const eliminarConfigRequestCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const result = yield (0, api_request_1.eliminarConfigRequests)(data);
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.eliminarConfigRequestCtrl = eliminarConfigRequestCtrl;
