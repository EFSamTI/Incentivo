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
exports.verifyAsignaciones = exports.deleteAsignacion = exports.saveAsignacionesSinCambios = exports.saveAsignacionesAriel = exports.saveAsignacionesComodin = void 0;
const asignacion_1 = require("../models/asignacion");
const asignacionTipoAsginacion_1 = require("../models/asignacionTipoAsginacion");
const empleado_1 = require("./empleado");
const linea_1 = require("./linea");
const tipoAsignacion_1 = require("./tipoAsignacion");
const asistencia_1 = require("./asistencia");
const area_1 = require("./area");
const turno_1 = require("./turno");
const tipoAsignacion_2 = require("../models/tipoAsignacion");
const typeorm_1 = require("typeorm");
const cargo_1 = require("./cargo");
const saveAsignacionesComodin = (comodin, idCreator) => __awaiter(void 0, void 0, void 0, function* () {
    const asignaciones = yield saveAsignaciones(comodin, "COMODIN", idCreator);
    if (asignaciones.length > 0) {
        return { status: 200, data: asignaciones };
    }
    else {
        return { status: 404, message: "No se encontraron asignaciones" };
    }
});
exports.saveAsignacionesComodin = saveAsignacionesComodin;
const saveAsignacionesAriel = (ariel, idCreator) => __awaiter(void 0, void 0, void 0, function* () {
    const asignaciones = yield saveAsignaciones(ariel, "ARIEL", idCreator);
    if (asignaciones.length > 0) {
        return { status: 200, data: asignaciones };
    }
    return { status: 404, message: "No se encontraron asignaciones" };
});
exports.saveAsignacionesAriel = saveAsignacionesAriel;
const saveAsignacionesSinCambios = (ariel, idCreator) => __awaiter(void 0, void 0, void 0, function* () {
    const asignaciones = yield saveAsignaciones(ariel, "NORMAL", idCreator);
    if (asignaciones.length > 0) {
        return { status: 200, data: asignaciones };
    }
    return { status: 404, message: "No se encontraron asignaciones" };
});
exports.saveAsignacionesSinCambios = saveAsignacionesSinCambios;
const verifyAsignaciones = (itemsAriel) => __awaiter(void 0, void 0, void 0, function* () {
    let asignacionesModificadas = [];
    try {
        const tiposAsignacion = yield tipoAsignacion_2.TipoAsignacion.find({
            where: [
                { descripcion: "NORMAL" },
                { descripcion: "CAMBIO" },
                { descripcion: "COMODIN" }
            ]
        });
        if (tiposAsignacion.length === 0) {
            return { status: 200, data: itemsAriel };
        }
        const idsTiposAsignacion = tiposAsignacion.map(tipo => tipo.tipoid);
        for (const a of itemsAriel) {
            const fechaCorteRemesulDate = new Date(a.fecha);
            const asignacionExistente = yield asignacion_1.Asignacion.findOne({
                where: {
                    asignacionTipoAsignaciones: { tipoid: (0, typeorm_1.In)(idsTiposAsignacion) },
                    empleado: { ci: a.cedula, nombre: a.nombre_persona },
                    turno: { nombre_turno: a.turno },
                    fecha_ariel: fechaCorteRemesulDate
                }
            });
            if (asignacionExistente) {
                const codigo = `${a.hora_entrada}-${a.cod_persona}-${a.nombre_area}`;
                a.asignado = codigo;
            }
            asignacionesModificadas.push(a);
        }
        return { status: 200, data: asignacionesModificadas };
    }
    catch (error) {
        return { status: 500, message: "Error interno del servidor" };
    }
});
exports.verifyAsignaciones = verifyAsignaciones;
const saveAsignaciones = (ariel, tipo, idCreator) => __awaiter(void 0, void 0, void 0, function* () {
    const asignacionesGuardadas = [];
    for (const a of ariel) {
        const [empleado, cargo, linea, area, turno, tipoAsignacion] = yield Promise.all([
            (0, empleado_1.findOrCreateEmpleado)(a.nombre_persona, a.cedula, a.cod_persona),
            (0, cargo_1.findOrCreateCargo)(a.cargo, a.id_cargo),
            (0, linea_1.findOrCreateLinea)(a.linea, a.id_linea),
            (0, area_1.findOrCreateArea)(a.nombre_area, a.cod_area),
            (0, turno_1.findOrCreateTurno)(a.turno),
            (0, tipoAsignacion_1.findOrCreateTipoAsignacion)(tipo),
        ]);
        const asignacion = asignacion_1.Asignacion.create({
            estado: true,
            created_at: new Date(),
            registeredByUserId: idCreator,
            fecha_ariel: new Date(a.fecha),
            hora_asignacion: new Date().toISOString().split('T')[1].substring(0, 8),
            area,
            turno,
            empleado,
            cargo,
            linea,
        });
        yield asignacion.save();
        const asignacionTipoAsignacion = asignacionTipoAsginacion_1.AsignacionTipoAsignacion.create({
            asignacion: asignacion,
            tipoAsignacion: tipoAsignacion,
            created_at: new Date(),
        });
        yield asignacionTipoAsignacion.save();
        if (tipo !== "Ariel") {
            yield (0, asistencia_1.saveEntrada)(asignacion);
        }
        asignacionesGuardadas.push(asignacion);
    }
    return asignacionesGuardadas;
});
const deleteAsignacion = (asignacion) => __awaiter(void 0, void 0, void 0, function* () {
    const asignacionDelete = yield asignacion_1.Asignacion.findOne({
        where: {
            empleado: { ci: asignacion.cedula, nombre: asignacion.nombre_persona },
            turno: { nombre_turno: asignacion.turno },
            fecha_ariel: new Date(asignacion.fecha),
        },
    });
    if (!asignacionDelete)
        return { status: 404, message: "Asignacion no encontrada" };
    asignacionDelete.estado = false;
    yield asignacionDelete.save();
    return { status: 200, data: asignacionDelete };
});
exports.deleteAsignacion = deleteAsignacion;
