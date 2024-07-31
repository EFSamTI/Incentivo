
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
    actividad_original,
    area_original,
    actividad_cambio,
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
    actividad_original,
    area_original,
    id_cambio,
    actividad_cambio,
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
      relations: ["linea", "empleado", "actividad", "turno", "area"],
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
  console.log(restablecer);

  for (const r of restablecer) {
    const cambio = await Movimiento.findOne({
      where: { movimientoid: r.movimientoid },
    });
    if (!cambio) return { status: 404, message: "No se encontró el cambio" };

    const asignacionOriginal = await Asignacion.findOne({
      where: { asignacionid: r.id_original },
      relations: ["empleado", "actividad", "area"],
    });
    if (!asignacionOriginal)
      return {
        status: 404,
        message: "No se encontró la asignación original del cambio",
      };

    const [area, actividad] = await Promise.all([
      findArea(r.area_original),
      findOrCreateActividadNew(r.actividad_original),
    ]);
    if (!area || !actividad)
      return {
        status: 404,
        message: "No se encontró la asignación original del cambio",
      };

    asignacionOriginal.estado = true;
    asignacionOriginal.area = area;
    asignacionOriginal.actividad = actividad;
    asignacionOriginal.update_at = new Date();

    await asignacionOriginal.save();

    const asignacionCambio = await Asignacion.findOne({
      where: { asignacionid: r.id_cambio },
    });
    if (asignacionCambio) {
      asignacionCambio.estado = false;
      await asignacionCambio.save();
    }

    await cambio.remove();
  }

  return { status: 200, message: "Cambios restablecidos correctamente" };
};

export {
  listFilterAsignaciones,
  listMovimientosPersonal,
  listFilterUltimosMovimientos,
  aplicarMovimientoAsignacion,
  restablecerMovimiento
};
