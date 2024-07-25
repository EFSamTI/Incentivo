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
exports.eliminarParada = exports.actualizarParada = exports.listFilterParadas = exports.createFilterParada = void 0;
const typeorm_1 = require("typeorm");
const asignacion_1 = require("../../asinament/models/asignacion");
const tipoAsignacion_1 = require("../../asinament/models/tipoAsignacion");
const tipoParada_1 = require("./tipoParada");
const parada_1 = require("../models/parada");
const listFilterParadas = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    let query = `
 SELECT p.paradaid, p.asignacionid, tp.descripcion AS tipo_parada, p.hora_inicio, p.hora_fin, p.created_at, p.update_at,
           a.nombre_area, a.cod_area, e.nombre AS empleado, l.nombrelinea, t.nombre_turno
    FROM isentive_tparada p
    JOIN isentive_tasignaciones asig ON p.asignacionid = asig.asignacionid
    JOIN isentive_tareas a ON asig.areaid = a.areaid
    JOIN isentive_templeados e ON asig.empleadoid = e.empleadoid
    JOIN isentive_tlineas l ON asig.lineaid = l.lineaid
    JOIN isentive_tturnos t ON asig.turnoid = t.turnoid
    JOIN isentive_ttipo_parada tp ON p.tipo_paradaid = tp.tipo_paradaid
    WHERE 1=1
  `;
    if (filter.fecha) {
        query += ` AND (p.hora_inicio::DATE = '${filter.fecha}' OR p.hora_fin::DATE = '${filter.fecha}')`;
    }
    if (filter.linea) {
        query += ` AND l.nombrelinea = '${filter.linea}'`;
    }
    if (filter.turno) {
        query += ` AND t.nombre_turno = '${filter.turno}'`;
    }
    const paradas = yield parada_1.Parada.query(query);
    if (paradas.length === 0) {
        return {
            status: 404,
            message: "No se encontraron paradas en la base de datos",
        };
    }
    return { status: 200, data: paradas };
});
exports.listFilterParadas = listFilterParadas;
const actualizarParada = (parada) => __awaiter(void 0, void 0, void 0, function* () {
    const paradaToUpdate = yield parada_1.Parada.findOne({
        where: { paradaid: parada.paradaid },
    });
    if (!paradaToUpdate) {
        return {
            status: 404,
            message: "No se encontró la parada",
        };
    }
    const fechaHoraInicio = new Date(parada.hora_inicio);
    const fechaHoraFin = new Date(parada.hora_fin);
    if (fechaHoraInicio >= fechaHoraFin) {
        return {
            status: 400,
            message: "La hora de inicio debe ser menor a la hora de fin.",
        };
    }
    const diferenciaHoras = (fechaHoraFin.getTime() - fechaHoraInicio.getTime()) / (1000 * 60 * 60);
    if (diferenciaHoras < 0 || diferenciaHoras > 8) {
        return {
            status: 400,
            message: "La diferencia de horas debe estar entre 0 a 8 horas.",
        };
    }
    paradaToUpdate.hora_inicio = fechaHoraInicio;
    paradaToUpdate.hora_fin = fechaHoraFin;
    paradaToUpdate.update_at = new Date();
    yield paradaToUpdate.save();
    return { status: 200, data: paradaToUpdate };
});
exports.actualizarParada = actualizarParada;
const eliminarParada = (paradaid) => __awaiter(void 0, void 0, void 0, function* () {
    const parada = yield parada_1.Parada.findOne({ where: { paradaid } });
    if (!parada) {
        return {
            status: 404,
            message: "No se encontró la parada",
        };
    }
    yield parada.remove();
    return { status: 200, message: "Parada eliminada" };
});
exports.eliminarParada = eliminarParada;
const createFilterParada = (filter, idCreator) => __awaiter(void 0, void 0, void 0, function* () {
    const tiposAsignacion = yield tipoAsignacion_1.TipoAsignacion.find({
        where: [
            { descripcion: "NORMAL" },
            { descripcion: "CAMBIO" },
            { descripcion: "COMODIN" },
        ],
    });
    const fecha = new Date(filter.fecha);
    const fechaHoraInicio = new Date(filter.hora_inicio);
    const fechaHoraFin = new Date(filter.hora_fin);
    if (fechaHoraInicio >= fechaHoraFin) {
        return {
            status: 400,
            message: "La hora de inicio debe ser menor a la hora de fin.",
        };
    }
    if (fechaHoraFin < fechaHoraInicio) {
        return {
            status: 400,
            message: "La hora de fin debe ser mayor a la hora de inicio.",
        };
    }
    const diferenciaHoras = (fechaHoraFin.getTime() - fechaHoraInicio.getTime()) / (1000 * 60 * 60);
    if (diferenciaHoras < 0 || diferenciaHoras > 8) {
        return {
            status: 400,
            message: "La diferencia de horas debe estar entre 0 a 8 horas.",
        };
    }
    const idsTiposAsignacion = tiposAsignacion.map((tipo) => tipo.tipoid);
    if (!filter.colaborador) {
        return yield createParadaGrupal(filter, idCreator, idsTiposAsignacion, fecha);
    }
    else {
        return yield createParadaIndividual(filter, idCreator, idsTiposAsignacion, fecha);
    }
});
exports.createFilterParada = createFilterParada;
const createParadaGrupal = (filter, idCreator, idsTiposAsignacion, fecha) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyAsignaciones = yield asignacion_1.Asignacion.find({
        where: {
            asignacionTipoAsignaciones: { tipoid: (0, typeorm_1.In)(idsTiposAsignacion) },
            estado: true,
            linea: { nombrelinea: filter.linea },
            turno: { nombre_turno: filter.turno },
        },
        relations: ["empleado", "linea", "turno", "asignacionTipoAsignaciones"],
    });
    if (verifyAsignaciones.length === 0)
        return { status: 404, message: "No se encontró la asignación" };
    const fecharString = fecha.toISOString().split("T")[0];
    const fechaCreacionStr = new Date(verifyAsignaciones[0].created_at)
        .toISOString()
        .split("T")[0];
    if (fecharString !== fechaCreacionStr)
        return {
            status: 404,
            message: "No se encontró la asignación en la fecha seleccionada",
        };
    const paradas = [];
    const paradasConConflicto = [];
    const paradasCreated = [];
    for (const asignacion of verifyAsignaciones) {
        const parada = {
            asignacionid: asignacion.asignacionid,
            tipo_parada: yield (0, tipoParada_1.findOrCreateTipoParada)(filter.tipo_parada),
            hora_inicio: filter.hora_inicio,
            hora_fin: filter.hora_fin,
            created_at: new Date(),
            update_at: new Date(),
        };
        const existingParadas = yield parada_1.Parada.find({
            where: {
                asignacionid: parada.asignacionid,
            },
        });
        let conflicto = false;
        for (const existingParada of existingParadas) {
            const paradaInicio = new Date(parada.hora_inicio);
            const paradaFin = new Date(parada.hora_fin);
            const existingParadaInicio = new Date(existingParada.hora_inicio);
            const existingParadaFin = new Date(existingParada.hora_fin);
            if (paradaInicio < existingParadaFin &&
                paradaFin > existingParadaInicio) {
                conflicto = true;
                paradasConConflicto.push(parada);
                break;
            }
        }
        if (!conflicto) {
            paradas.push(parada);
        }
    }
    for (const parada of paradas) {
        const paradasSave = yield createParada(parada, idCreator);
        paradasCreated.push(paradasSave);
    }
    if (paradasConConflicto.length > 0) {
        return {
            status: 404,
            message: "Se guardaron las paradas, salvo excepciones que tienen cruces de horas.",
        };
    }
    return { status: 200, data: paradasCreated };
});
const createParadaIndividual = (filter, idCreator, idsTiposAsignacion, fecha) => __awaiter(void 0, void 0, void 0, function* () {
    const verfifyAsignacion = yield asignacion_1.Asignacion.findOne({
        where: {
            asignacionTipoAsignaciones: { tipoid: (0, typeorm_1.In)(idsTiposAsignacion) },
            estado: true,
            empleado: { nombre: filter.colaborador },
            linea: { nombrelinea: filter.linea },
            turno: { nombre_turno: filter.turno },
        },
        relations: ["empleado", "linea", "turno", "asignacionTipoAsignaciones"],
    });
    if (!verfifyAsignacion)
        return { status: 404, message: "No se encontro la asignacion" };
    const fecharString = fecha.toISOString().split("T")[0];
    const fechaCreacionStr = new Date(verfifyAsignacion.created_at)
        .toISOString()
        .split("T")[0];
    if (fecharString !== fechaCreacionStr)
        return {
            status: 404,
            message: "No se encontro la asignacion en la fecha seleccionada",
        };
    const parada = {
        asignacionid: verfifyAsignacion.asignacionid,
        tipo_parada: yield (0, tipoParada_1.findOrCreateTipoParada)(filter.tipo_parada),
        hora_inicio: filter.hora_inicio,
        hora_fin: filter.hora_fin,
        created_at: new Date(),
        update_at: new Date(),
    };
    const existingParadas = yield parada_1.Parada.find({
        where: {
            asignacionid: parada.asignacionid,
        },
    });
    for (const existingParada of existingParadas) {
        const paradaInicio = new Date(parada.hora_inicio);
        const paradaFin = new Date(parada.hora_fin);
        const existingParadaInicio = new Date(existingParada.hora_inicio);
        const existingParadaFin = new Date(existingParada.hora_fin);
        if (paradaInicio < existingParadaFin && paradaFin > existingParadaInicio) {
            return {
                status: 400,
                message: "Existe un conflicto de horarios con otra parada.",
            };
        }
    }
    const result = yield createParada(parada, idCreator);
    return { status: 200, data: result };
});
const createParada = (parada, id) => __awaiter(void 0, void 0, void 0, function* () {
    const paradaCreate = parada_1.Parada.create({
        asignacionid: parada.asignacionid,
        hora_inicio: parada.hora_inicio,
        hora_fin: parada.hora_fin,
        created_at: new Date(),
        registeredByUserId: id,
        tipoParada: parada.tipo_parada,
    });
    return yield paradaCreate.save();
});
