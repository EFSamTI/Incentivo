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
exports.getCambiosFuncionBD = exports.getUltimoCamnbios = exports.getCambios = exports.postRestablecerCambios = exports.postAplicarCambios = exports.getAsignaciones = void 0;
const error_handle_1 = require("../../user/utils/error.handle");
const movimiento_1 = require("../services/movimiento");
const getAsignaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const result = yield (0, movimiento_1.listFilterAsignaciones)(data);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getAsignaciones = getAsignaciones;
const postAplicarCambios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        if (!data)
            return (0, error_handle_1.httpError)(res, "Cambios is required");
        const result = yield (0, movimiento_1.aplicarMovimientoAsignacion)(data);
        res.status(result.status).send({ message: result.message });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.postAplicarCambios = postAplicarCambios;
const postRestablecerCambios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        if (!data)
            return (0, error_handle_1.httpError)(res, "Cambios is required");
        const result = yield (0, movimiento_1.restablecerMovimiento)(data);
        res.status(result.status).send({ message: result.message });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.postRestablecerCambios = postRestablecerCambios;
const getCambiosFuncionBD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req.body;
        const result = yield (0, movimiento_1.listMovimientosFuncionBD)(body);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getCambiosFuncionBD = getCambiosFuncionBD;
const getCambios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const result = yield (0, movimiento_1.listMovimientosPersonal)(data);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getCambios = getCambios;
const getUltimoCamnbios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const result = yield (0, movimiento_1.listFilterUltimosMovimientos)(data);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getUltimoCamnbios = getUltimoCamnbios;
