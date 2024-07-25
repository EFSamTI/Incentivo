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
exports.listTotalParadasArea = exports.listMovimientos = exports.listTotalesIsentivos = void 0;
const asignacion_1 = require("../../asinament/models/asignacion");
const listTotalesIsentivos = () => __awaiter(void 0, void 0, void 0, function* () {
    let query = `SELECT * FROM vista_estadisticas_isentivos`;
    const totales = yield asignacion_1.Asignacion.query(query);
    if (totales.length === 0) {
        return {
            status: 404,
            message: "No se encontraron totales en la base de datos",
        };
    }
    return { status: 200, data: totales };
});
exports.listTotalesIsentivos = listTotalesIsentivos;
const listMovimientos = () => __awaiter(void 0, void 0, void 0, function* () {
    let query = `SELECT * FROM vista_movimientos_ultima_semana`;
    const movimientos = yield asignacion_1.Asignacion.query(query);
    if (movimientos.length === 0) {
        return {
            status: 404,
            message: "No se encontraron movimientos en la base de datos",
        };
    }
    return { status: 200, data: movimientos };
});
exports.listMovimientos = listMovimientos;
const listTotalParadasArea = () => __awaiter(void 0, void 0, void 0, function* () {
    let query = `SELECT * FROM vista_paradas_por_area_ultimo_mes`;
    const paradas = yield asignacion_1.Asignacion.query(query);
    if (paradas.length === 0) {
        return {
            status: 404,
            message: "No se encontraron paradas en la base de datos",
        };
    }
    return { status: 200, data: paradas };
});
exports.listTotalParadasArea = listTotalParadasArea;
