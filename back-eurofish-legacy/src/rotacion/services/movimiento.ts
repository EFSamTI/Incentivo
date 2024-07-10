import { IChanges, IRestablecerCambios } from "../../asinament/interfaces/ariel";

import { Asignacion } from "../../asinament/models/asignacion";
import { AsignacionTipoAsignacion } from "../../asinament/models/asignacionTipoAsginacion";

import { findArea } from "../../asinament/services/area";
import { saveEntrada } from "../../asinament/services/asistencia";
import { findCargo, findOrCreateCargo } from "../../asinament/services/cargo";
import { findOrCreateTipoAsignacion } from "../../asinament/services/tipoAsignacion";
import { IFilterAsignaciones, IFilterCambios, IBody } from "../interfaces/movimiento";
import { Movimiento } from "../models/movimiento";

const listFilterAsignaciones = async (filter: IFilterAsignaciones) => {
  let sqlQuery = `
  SELECT a.asignacionid, a.created_at, a.update_at,ta.descripcion as tipo_asignacion, l.nombrelinea, t.nombre_turno, e.nombre AS nombre_empleado, e.ci AS cedula, c.cargoname, ar.nombre_area
  FROM isentive_tasignaciones a
  JOIN isentive_tlineas l ON a.lineaid = l.lineaid
  JOIN isentive_tturnos t ON a.turnoid = t.turnoid
  JOIN isentive_templeados e ON a.empleadoid = e.empleadoid
  JOIN isentive_tcargos c ON a.cargoid = c.cargoid
  JOIN isentive_tareas ar ON a.areaid = ar.areaid
  JOIN isentive_tasignacion_tipo_asignacion ata ON a.asignacionid = ata.asignacionid
  JOIN isentive_ttipo_asignacion ta ON ata.tipoid = ta.tipoid
  WHERE ta.descripcion IN ('NORMAL', 'CAMBIO', 'COMODIN')
  AND a.estado = TRUE
`;
  if (filter.linea) {
    sqlQuery += ` AND l.nombrelinea = '${filter.linea}'`;
  }
  if (filter.turno) {
    sqlQuery += ` AND t.nombre_turno = '${filter.turno}'`;
  }

  const Asignaciones = await Asignacion.query(sqlQuery);
  if (Asignaciones.length === 0)
    return { status: 404, message: "No se encontraron asignaciones" };

  return { status: 200, data: Asignaciones };
};

const listMovimientosPersonal = async (filter: IFilterCambios) => {
  let sqlQuery = `
  SELECT  m.movimientoid,
          m.created_at,
          l.nombrelinea,
          t.nombre_turno,
          e.nombre AS empleado_nombre,
          e.ci,
          co.cargoname AS cargo_original,
          area_o.nombre_area AS area_original,
          cc.cargoname AS cargo_cambio,
          area_c.nombre_area AS area_cambio
  FROM isentive_tmovimientos m
  JOIN isentive_tasignaciones ao ON m.asignacion_original = ao.asignacionid
  JOIN isentive_tasignaciones ac ON m.asignacion_cambio = ac.asignacionid
  JOIN isentive_templeados e ON ao.empleadoid = e.empleadoid
  JOIN isentive_tlineas l ON ao.lineaid = l.lineaid
  JOIN isentive_tturnos t ON ao.turnoid = t.turnoid
  JOIN isentive_tcargos co ON ao.cargoid = co.cargoid
  JOIN isentive_tareas area_o ON ao.areaid = area_o.areaid
  JOIN isentive_tcargos cc ON ac.cargoid = cc.cargoid
  JOIN isentive_tareas area_c ON ac.areaid = area_c.areaid
  WHERE 1=1
  `;
  if (filter.fecha) {
    sqlQuery += ` AND m.created_at::DATE = '${filter.fecha}'`;
  }
  if (filter.linea) {
    sqlQuery += ` AND l.nombrelinea = '${filter.linea}'`;
  }
  if (filter.turno) {
    sqlQuery += ` AND t.nombre_turno = '${filter.turno}'`;
  }

  const Movimientos = await Movimiento.query(sqlQuery);
  if (Movimientos.length === 0)
    return { status: 404, message: "No se encontraron cambios" };

  return { status: 200, data: Movimientos };
};

const listFilterUltimosMovimientos = async (filter: IFilterCambios) => {
  let sqlQuery = `
   SELECT DISTINCT ON (e.empleadoid) 
    m.movimientoid,
    e.empleadoid,
    e.nombre AS empleado_nombre,
    e.ci,
    t.nombre_turno,
    l.nombrelinea,
    ao.asignacionid AS id_original,
    co.cargoname AS cargo_original,
    ao2.nombre_area AS area_original,
    ac.asignacionid AS id_cambio,
    cc.cargoname AS cargo_cambio,
    ac2.nombre_area AS area_cambio,
    m.created_at
  FROM isentive_tmovimientos m
  INNER JOIN isentive_tasignaciones ao ON m.asignacion_original = ao.asignacionid
  INNER JOIN isentive_tasignaciones ac ON m.asignacion_cambio = ac.asignacionid
  INNER JOIN isentive_templeados e ON ao.empleadoid = e.empleadoid
  INNER JOIN isentive_tlineas l ON ao.lineaid = l.lineaid
  INNER JOIN isentive_tturnos t ON ao.turnoid = t.turnoid
  INNER JOIN isentive_tcargos co ON ao.cargoid = co.cargoid
  INNER JOIN isentive_tareas ao2 ON ao.areaid = ao2.areaid
  INNER JOIN isentive_tcargos cc ON ac.cargoid = cc.cargoid
  INNER JOIN isentive_tareas ac2 ON ac.areaid = ac2.areaid
   WHERE 1=1
`;
  if (filter.fecha) {
    sqlQuery += ` AND m.created_at::DATE = '${filter.fecha}'`;
  }
  if (filter.linea) {
    sqlQuery += ` AND l.nombrelinea = '${filter.linea}'`;
  }
  if (filter.turno) {
    sqlQuery += ` AND t.nombre_turno = '${filter.turno}'`;
  }

  const Movimientos = await Movimiento.query(sqlQuery);
  if (Movimientos.length === 0)
    return { status: 404, message: "No se encontraron cambios" };

  return { status: 200, data: Movimientos };
};

const aplicarMovimientoAsignacion = async (changes: IChanges[]) => {
  for (const a of changes) {
    const asignacionOriginal = await Asignacion.findOne({
      where: { asignacionid: a.asignacionid },
      relations: ["linea", "empleado", "cargo", "turno", "area"],
    });
    if (!asignacionOriginal)
      return { status: 404, message: "No se encontró la asignación" };
    const [area, cargo, tipoChange] = await Promise.all([
      findArea(a.area),
      findCargo(a.cargo),
      findOrCreateTipoAsignacion("CAMBIO"),
    ]);
    if (!area || !cargo || !tipoChange)
      return { status: 404, message: "No se encontró la asignación" };
    const nuevaAsignacion = Asignacion.create({
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
    await nuevaAsignacion.save();
    await saveEntrada(nuevaAsignacion);
    const asignacionTipoAsingacion = AsignacionTipoAsignacion.create({
      asignacion: nuevaAsignacion,
      tipoAsignacion: tipoChange,
      created_at: new Date(),
    });
    await asignacionTipoAsingacion.save();
    asignacionOriginal.estado = false;
    await asignacionOriginal.save();
    const movimiento = Movimiento.create({
      asignacion_original: asignacionOriginal.asignacionid,
      asignacion_cambio: nuevaAsignacion.asignacionid,
      created_at: new Date(),
    });
    await movimiento.save();
  }
  return { status: 200, message: "Cambios aplicados correctamente" };
};

const restablecerMovimiento = async (restablecer: IRestablecerCambios[]) => {
  for (const r of restablecer) {
    const cambio = await Movimiento.findOne({
      where: { movimientoid: r.idMovimiento },
    });
    if (!cambio) return { status: 404, message: "No se encontró el cambio" };
    const asignacionOriginal = await Asignacion.findOne({
      where: { asignacionid: r.idOriginal },
      relations: ["empleado", "cargo", "area"],
    });
    if (!asignacionOriginal)
      return {
        status: 404,
        message: "No se encontró la asignación original del cambio",
      };
    const [area, cargo] = await Promise.all([
      findArea(r.areaOriginal),
      findCargo(r.cargoOriginal),
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
    await asignacionOriginal.save();
    const asignacionCambio = await Asignacion.findOne({
      where: { asignacionid: r.idCambio },
    });
    if (asignacionCambio) {
      asignacionCambio.estado = false;
      await asignacionCambio.save();
    }
    await cambio.remove();
  }
  return { status: 200, message: "Cambios rest establecidos correctamente" };
};

const listMovimientosFuncionBD = async (body: IBody) => {
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
    const movimientos = await Movimiento.query(baseQuery);

    return movimientos.length === 0
      ? { status: 404, message: "No se encontraron cambios" }
      : { status: 200, data: movimientos };
  } catch (error) {
    return { status: 500, message: "Error al ejecutar la consulta" };
  }
};
export {
  listFilterAsignaciones,
  listMovimientosPersonal,
  listFilterUltimosMovimientos,
  aplicarMovimientoAsignacion,
  restablecerMovimiento,
  listMovimientosFuncionBD,
  
};
