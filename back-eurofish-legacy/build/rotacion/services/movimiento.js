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
exports.listMovimientosFuncionBD = exports.restablecerMovimiento = exports.aplicarMovimientoAsignacion = exports.listFilterUltimosMovimientos = exports.listMovimientosPersonal = exports.listFilterAsignaciones = void 0;
const asignacion_1 = require("../../asinament/models/asignacion");
const asignacionTipoAsginacion_1 = require("../../asinament/models/asignacionTipoAsginacion");
const area_1 = require("../../asinament/services/area");
const asistencia_1 = require("../../asinament/services/asistencia");
const cargo_1 = require("../../asinament/services/cargo");
const tipoAsignacion_1 = require("../../asinament/services/tipoAsignacion");
const movimiento_1 = require("../models/movimiento");
const listFilterAsignaciones = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    let sqlQuery = `
  SELECT 
    asignacionid, 
    created_at, 
    update_at, 
    tipo_asignacion, 
    nombrelinea, 
    nombre_turno, 
    nombre_empleado, 
    cedula, 
    cargoname, 
    nombre_area
  FROM 
    vista_asignaciones_detalle
  WHERE 
    1=1 
`;
    if (filter.linea) {
        sqlQuery += ` AND nombrelinea = '${filter.linea}'`;
    }
    if (filter.turno) {
        sqlQuery += ` AND nombre_turno = '${filter.turno}'`;
    }
    const Asignaciones = yield asignacion_1.Asignacion.query(sqlQuery);
    if (Asignaciones.length === 0)
        return { status: 404, message: "No se encontraron asignaciones" };
    return { status: 200, data: Asignaciones };
});
exports.listFilterAsignaciones = listFilterAsignaciones;
const listMovimientosPersonal = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    let sqlQuery = `
  SELECT 
    movimientoid,
    created_at,
    nombrelinea,
    nombre_turno,
    empleado_nombre,
    ci,
    cargo_original,
    area_original,
    cargo_cambio,
    area_cambio
  FROM 
    vista_movimientos_detalle
  WHERE 
    1=1
  `;
    if (filter.fecha) {
        sqlQuery += ` AND created_at::DATE = '${filter.fecha}'`;
    }
    if (filter.linea) {
        sqlQuery += ` AND nombrelinea = '${filter.linea}'`;
    }
    if (filter.turno) {
        sqlQuery += ` AND nombre_turno = '${filter.turno}'`;
    }
    const Movimientos = yield movimiento_1.Movimiento.query(sqlQuery);
    if (Movimientos.length === 0)
        return { status: 404, message: "No se encontraron cambios" };
    return { status: 200, data: Movimientos };
});
exports.listMovimientosPersonal = listMovimientosPersonal;
const listFilterUltimosMovimientos = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    let sqlQuery = `
  SELECT 
    movimientoid,
    empleadoid,
    empleado_nombre,
    ci,
    nombre_turno,
    nombrelinea,
    id_original,
    cargo_original,
    area_original,
    id_cambio,
    cargo_cambio,
    area_cambio,
    created_at
  FROM 
    vista_movimientos_empleados_detalle
  WHERE 
    1=1
`;
    if (filter.fecha) {
        sqlQuery += ` AND created_at::DATE = '${filter.fecha}'`;
    }
    if (filter.linea) {
        sqlQuery += ` AND nombrelinea = '${filter.linea}'`;
    }
    if (filter.turno) {
        sqlQuery += ` AND nombre_turno = '${filter.turno}'`;
    }
    const Movimientos = yield movimiento_1.Movimiento.query(sqlQuery);
    if (Movimientos.length === 0)
        return { status: 404, message: "No se encontraron cambios" };
    return { status: 200, data: Movimientos };
});
exports.listFilterUltimosMovimientos = listFilterUltimosMovimientos;
const aplicarMovimientoAsignacion = (changes) => __awaiter(void 0, void 0, void 0, function* () {
    for (const a of changes) {
        const asignacionOriginal = yield asignacion_1.Asignacion.findOne({
            where: { asignacionid: a.asignacionid },
            relations: ["linea", "empleado", "cargo", "turno", "area"],
        });
        if (!asignacionOriginal)
            return { status: 404, message: "No se encontró la asignación" };
        const [area, cargo, tipoChange] = yield Promise.all([
            (0, area_1.findArea)(a.area),
            (0, cargo_1.findOrCreateCargoNew)(a.cargo),
            (0, tipoAsignacion_1.findOrCreateTipoAsignacion)("CAMBIO"),
        ]);
        if (!area || !cargo || !tipoChange)
            return {
                status: 404,
                message: "No se encontró la asignación area, cargo, tipochange",
            };
        const nuevaAsignacion = asignacion_1.Asignacion.create({
            linea: asignacionOriginal.linea,
            estado: true,
            registeredByUserId: asignacionOriginal.registeredByUserId,
            empleado: asignacionOriginal.empleado,
            area,
            cargo,
            turno: asignacionOriginal.turno,
            created_at: new Date(),
            fecha_ariel: asignacionOriginal.fecha_ariel,
            hora_asignacion: asignacionOriginal.hora_asignacion,
        });
        yield nuevaAsignacion.save();
        yield (0, asistencia_1.saveEntrada)(nuevaAsignacion);
        const asignacionTipoAsingacion = asignacionTipoAsginacion_1.AsignacionTipoAsignacion.create({
            asignacion: nuevaAsignacion,
            tipoAsignacion: tipoChange,
            created_at: new Date(),
        });
        yield asignacionTipoAsingacion.save();
        asignacionOriginal.estado = false;
        yield asignacionOriginal.save();
        const movimiento = movimiento_1.Movimiento.create({
            asignacion_original: asignacionOriginal.asignacionid,
            asignacion_cambio: nuevaAsignacion.asignacionid,
            created_at: new Date(),
        });
        yield movimiento.save();
    }
    return { status: 200, message: "Cambios aplicados correctamente" };
});
exports.aplicarMovimientoAsignacion = aplicarMovimientoAsignacion;
const restablecerMovimiento = (restablecer) => __awaiter(void 0, void 0, void 0, function* () {
    for (const r of restablecer) {
        const cambio = yield movimiento_1.Movimiento.findOne({
            where: { movimientoid: r.idMovimiento },
        });
        if (!cambio)
            return { status: 404, message: "No se encontró el cambio" };
        const asignacionOriginal = yield asignacion_1.Asignacion.findOne({
            where: { asignacionid: r.idOriginal },
            relations: ["empleado", "cargo", "area"],
        });
        if (!asignacionOriginal)
            return {
                status: 404,
                message: "No se encontró la asignación original del cambio",
            };
        const [area, cargo] = yield Promise.all([
            (0, area_1.findArea)(r.areaOriginal),
            (0, cargo_1.findOrCreateCargoNew)(r.cargoOriginal),
        ]);
        if (!area || !cargo)
            return {
                status: 404,
                message: "No se encontró la asignación original del cambio",
            };
        asignacionOriginal.estado = true;
        asignacionOriginal.area = area;
        asignacionOriginal.cargo = cargo;
        asignacionOriginal.update_at = new Date();
        yield asignacionOriginal.save();
        const asignacionCambio = yield asignacion_1.Asignacion.findOne({
            where: { asignacionid: r.idCambio },
        });
        if (asignacionCambio) {
            asignacionCambio.estado = false;
            yield asignacionCambio.save();
        }
        yield cambio.remove();
    }
    return { status: 200, message: "Cambios rest establecidos correctamente" };
});
exports.restablecerMovimiento = restablecerMovimiento;
const listMovimientosFuncionBD = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let baseQuery = "SELECT * FROM get_movimientos(";
    let fieldsQuery = "";
    for (const field of body.fields || []) {
        switch (field) {
            case "movimiento":
                fieldsQuery +=
                    "'movimientoid', m.movimientoid, 'fecha_movimiento', m.created_at, ";
                break;
            case "empleado":
                fieldsQuery +=
                    "'nombre_empleado', empleado.nombre, 'cedula', empleado.ci, ";
                break;
            case "turno":
                fieldsQuery += "'turno', turno.nombre_turno, ";
                break;
            case "linea":
                fieldsQuery += "'linea', linea.nombrelinea, ";
                break;
            case "CC":
                fieldsQuery +=
                    "'CC_original', area_original.centro_costo, 'CC_cambio', area_cambio.centro_costo, ";
                break;
            case "cargo":
                fieldsQuery +=
                    "'cargo_original', c_original.cargoname, 'cargo_cambio', c_cambio.cargoname, ";
                break;
            case "area":
                fieldsQuery +=
                    "'area_original', area_original.nombre_area, 'area_cambio', area_cambio.nombre_area, ";
                break;
            default:
                break;
        }
    }
    if (fieldsQuery.length > 0) {
        fieldsQuery = fieldsQuery.slice(0, -2);
    }
    let orderQuery = "";
    if (body.order) {
        let orderField = "";
        switch (body.order.field) {
            case "movimiento":
                orderField = "m.movimientoid";
                break;
            case "empleado":
                orderField = "empleado.nombre";
                break;
            case "turno":
                orderField = "turno.nombre_turno";
                break;
            case "linea":
                orderField = "linea.nombrelinea";
                break;
            case "CC":
                orderField = "area_original.centro_costo";
                break;
            case "cargo":
                orderField = "c_original.cargoname";
                break;
            case "area":
                orderField = "area_original.nombre_area";
                break;
            default:
                break;
        }
        orderQuery = `, '${orderField} ${body.order.order}'`;
    }
    baseQuery += `'${fieldsQuery.replace(/'/g, "''")}'${orderQuery})`;
    baseQuery += ";";
    try {
        const movimientos = yield movimiento_1.Movimiento.query(baseQuery);
        return movimientos.length === 0
            ? { status: 404, message: "No se encontraron cambios" }
            : { status: 200, data: movimientos };
    }
    catch (error) {
        return { status: 500, message: "Error al ejecutar la consulta" };
    }
});
exports.listMovimientosFuncionBD = listMovimientosFuncionBD;
