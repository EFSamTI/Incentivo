
import { Asignacion } from "../../asinament/models/asignacion";
import { AsignacionTipoAsignacion } from "../../asinament/models/asignacionTipoAsginacion";

import { findArea } from "../../asinament/services/area";

import { findOrCreateActividadNew } from "../../asinament/services/cargo";
import { findOrCreateTipoAsignacion } from "../../asinament/services/tipoAsignacion";
import {
  IFilterAsignaciones,
  IFilterCambios,
  IBody,
  IChanges,
  IRestablecerCambios,
} from "../interfaces/movimiento";
import { Movimiento } from "../models/movimiento";

const listFilterAsignaciones = async (filter: IFilterAsignaciones) => {
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
    actividadname,
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

  const Asignaciones = await Asignacion.query(sqlQuery);
  if (Asignaciones.length === 0)
    return { status: 404, message: "No se encontraron asignaciones" };

  return { status: 200, data: Asignaciones };
};

const listMovimientosPersonal = async (filter: IFilterCambios) => {
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

  const Movimientos = await Movimiento.query(sqlQuery);
  if (Movimientos.length === 0)
    return { status: 404, message: "No se encontraron cambios" };

  return { status: 200, data: Movimientos };
};

const listFilterUltimosMovimientos = async (filter: IFilterCambios) => {
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
    const [area, actividad, tipoChange] = await Promise.all([
      findArea(a.area),
      findOrCreateActividadNew(a.actividad),
      findOrCreateTipoAsignacion("CAMBIO"),
    ]);
    if (!area || !actividad || !tipoChange)
      return {
        status: 404,
        message: "No se encontró la asignación area, cargo, tipochange",
      };
    const nuevaAsignacion = Asignacion.create({
      linea: asignacionOriginal.linea,
      estado: true,
      registeredByUserId: asignacionOriginal.registeredByUserId,
      empleado: asignacionOriginal.empleado,
      area,
      actividad,
      turno: asignacionOriginal.turno,
      created_at: new Date(),
      fecha_ariel: asignacionOriginal.fecha_ariel,
      hora_asignacion: asignacionOriginal.hora_asignacion,
    });
    await nuevaAsignacion.save();
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
      findOrCreateActividadNew(r.actividadOriginal),
    ]);
    if (!area || !cargo)
      return {
        status: 404,
        message: "No se encontró la asignación original del cambio",
      };

    asignacionOriginal.estado = true;
    asignacionOriginal.area = area;
    asignacionOriginal.actividad = cargo;
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
