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
exports.saveSalida = exports.saveEntrada = void 0;
const asistencia_1 = require("../models/asistencia");
const saveEntrada = (asignacion) => __awaiter(void 0, void 0, void 0, function* () {
    const newMovimiento = asistencia_1.Asistencia.create({
        asignacionid: asignacion.asignacionid,
        hora_entrada: asignacion.hora_asignacion,
        created_at: new Date(),
    });
    yield newMovimiento.save();
});
exports.saveEntrada = saveEntrada;
const saveSalida = (asignacion) => __awaiter(void 0, void 0, void 0, function* () {
    const movimiento = yield asistencia_1.Asistencia.findOne({
        where: { asignacion: asignacion },
    });
    if (!movimiento)
        return { status: 404, message: "Movimiento no encontrado" };
    const horaSalida = new Date().toLocaleTimeString();
    movimiento.hora_salida = horaSalida;
    const entrada = new Date(`1970-01-01T${movimiento.hora_entrada}Z`);
    const salida = new Date(`1970-01-01T${horaSalida}Z`);
    let diferenciaHoras = (salida.getTime() - entrada.getTime()) / (1000 * 60 * 60);
    const duracionAlmuerzo = 1;
    diferenciaHoras -= duracionAlmuerzo;
    movimiento.tiempo_trabajo = `${diferenciaHoras} hours`;
    yield movimiento.save();
    return { status: 200, data: movimiento };
});
exports.saveSalida = saveSalida;
