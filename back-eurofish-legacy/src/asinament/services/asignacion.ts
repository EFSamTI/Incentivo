import { Area } from "./../models/area";
import { Asignacion } from "../models/asignacion";
import { AsignacionTipoAsignacion } from "../models/asignacionTipoAsginacion";
import { findOrCreateEmpleado } from "./empleado";
import { findOrCreateLinea } from "./linea";
import { findOrCreateTipoAsignacion } from "./tipoAsignacion";
import { saveEntrada } from "./asistencia";
import { findOrCreateArea } from "./area";
import { findOrCreateTurno } from "./turno";
import { TipoAsignacion } from "../models/tipoAsignacion";
import { In } from "typeorm";
import { findOrCreateCargo } from "./cargo";
import { IItemAriel } from "../interfaces/ariel";

const saveAsignacionesComodin = async (
  comodin: IItemAriel[],
  idCreator: number
) => {
  const asignaciones = await saveAsignaciones(comodin, "COMODIN", idCreator);
  if (asignaciones.length > 0) {
    return { status: 200, data: asignaciones };
  } else {
    return { status: 404, message: "No se encontraron asignaciones" };
  }
};

const saveAsignacionesAriel = async (
  ariel: IItemAriel[],
  idCreator: number
) => {
  const asignaciones = await saveAsignaciones(ariel, "ARIEL", idCreator);
  if (asignaciones.length > 0) {
    return { status: 200, data: asignaciones };
  }
  return { status: 404, message: "No se encontraron asignaciones" };
};

const saveAsignacionesSinCambios = async (
  ariel: IItemAriel[],
  idCreator: number
) => {
  const asignaciones = await saveAsignaciones(ariel, "NORMAL", idCreator);
  if (asignaciones.length > 0) {
    return { status: 200, data: asignaciones };
  }
  return { status: 404, message: "No se encontraron asignaciones" };
};

const verifyAsignaciones = async (itemsAriel: IItemAriel[]) => {
  let asignacionesModificadas: IItemAriel[] = [];
  try {
    const tiposAsignacion = await TipoAsignacion.find({
      where: [
        { descripcion: "NORMAL" },
        { descripcion: "CAMBIO" },
        { descripcion: "COMODIN"}
      ]
    });
    if (tiposAsignacion.length === 0) {
      return { status: 200, data: itemsAriel }; 
    }

    const idsTiposAsignacion = tiposAsignacion.map(tipo => tipo.tipoid);
    for (const a of itemsAriel) {
      const fechaCorteRemesulDate = new Date(a.fecha);
      const asignacionExistente = await Asignacion.findOne({
        where: {
          asignacionTipoAsignaciones: { tipoid: In(idsTiposAsignacion) },
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
  } catch (error) {

    return { status: 500, message: "Error interno del servidor" };
  }
};


const saveAsignaciones = async (
  ariel: IItemAriel[],
  tipo: string,
  idCreator: number
) => {
  const asignacionesGuardadas = [];
  for (const a of ariel) {
    const [empleado, cargo, linea, area, turno, tipoAsignacion] = await Promise.all([
      findOrCreateEmpleado(a.nombre_persona, a.cedula, a.cod_persona),
      findOrCreateCargo(a.cargo, a.id_cargo),
      findOrCreateLinea(a.linea),
      findOrCreateArea(a.nombre_area, a.cod_area),
      findOrCreateTurno(a.turno),
      findOrCreateTipoAsignacion(tipo),
    ]);
    const asignacion = Asignacion.create({
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
    
    await asignacion.save();

    const asignacionTipoAsignacion = AsignacionTipoAsignacion.create({
      asignacion: asignacion,
      tipoAsignacion: tipoAsignacion,
      created_at: new Date(),
    });
    await asignacionTipoAsignacion.save();
    if (tipo !== "Ariel") {
      await saveEntrada(asignacion);
    }
    asignacionesGuardadas.push(asignacion);
  }
  return asignacionesGuardadas;
};

const deleteAsignacion = async (asignacion: IItemAriel) => {
  const asignacionDelete = await Asignacion.findOne({
    where: {     
      empleado: { ci: asignacion.cedula, nombre: asignacion.nombre_persona },
      turno: { nombre_turno: asignacion.turno },
      fecha_ariel: new Date(asignacion.fecha),
    },
  });
  if (!asignacionDelete)
    return { status: 404, message: "Asignacion no encontrada" };
  asignacionDelete.estado = false;
  await asignacionDelete.save();
  return { status: 200, data: asignacionDelete };
};

export {
  saveAsignacionesComodin,
  saveAsignacionesAriel,
  saveAsignacionesSinCambios,
  deleteAsignacion,
  verifyAsignaciones
};
