import { In } from "typeorm";
import { IParada, IParadaFilter, IParadaUpdate } from "../interfaces/parada";
import { Asignacion } from "../../asinament/models/asignacion";

import { TipoAsignacion } from "../../asinament/models/tipoAsignacion";
import { findOrCreateTipoParada } from "./tipoParada";
import { Parada } from "../models/parada";

interface IFilterParada {
  fecha?: string;
  linea?: string;
  turno?: string;
}

const listFilterParadas = async (filter: IFilterParada) => {
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

  const paradas = await Parada.query(query);

  if (paradas.length === 0) {
    return {
      status: 404,
      message: "No se encontraron paradas en la base de datos",
    };
  }

  return { status: 200, data: paradas };
};

const actualizarParada = async (parada: IParadaUpdate) => {
  const paradaToUpdate = await Parada.findOne({
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

  const diferenciaHoras =
    (fechaHoraFin.getTime() - fechaHoraInicio.getTime()) / (1000 * 60 * 60);
  if (diferenciaHoras < 0 || diferenciaHoras > 8) {
    return {
      status: 400,
      message: "La diferencia de horas debe estar entre 0 a 8 horas.",
    };
  }

  paradaToUpdate.hora_inicio = fechaHoraInicio;
  paradaToUpdate.hora_fin = fechaHoraFin;
  paradaToUpdate.update_at = new Date();

  await paradaToUpdate.save();
  return { status: 200, data: paradaToUpdate };
};

const eliminarParada = async (paradaid: number) => {
  const parada = await Parada.findOne({ where: { paradaid } });
  if (!parada) {
    return {
      status: 404,
      message: "No se encontró la parada",
    };
  }
  await parada.remove();
  return { status: 200, message: "Parada eliminada" };
};

const createFilterParada = async (filter: IParadaFilter, idCreator: number) => {
  const tiposAsignacion = await TipoAsignacion.find({
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

  const diferenciaHoras =
    (fechaHoraFin.getTime() - fechaHoraInicio.getTime()) / (1000 * 60 * 60);
  if (diferenciaHoras < 0 || diferenciaHoras > 8) {
    return {
      status: 400,
      message: "La diferencia de horas debe estar entre 0 a 8 horas.",
    };
  }

  const idsTiposAsignacion = tiposAsignacion.map((tipo) => tipo.tipoid);
  if (!filter.colaborador) {
    return await createParadaGrupal(
      filter,
      idCreator,
      idsTiposAsignacion,
      fecha
    );
  } else {
    return await createParadaIndividual(
      filter,
      idCreator,
      idsTiposAsignacion,
      fecha
    );
  }
};

const createParadaGrupal = async (
  filter: IParadaFilter,
  idCreator: number,
  idsTiposAsignacion: number[],
  fecha: Date
) => {
  const verifyAsignaciones = await Asignacion.find({
    where: {
      asignacionTipoAsignaciones: { tipoid: In(idsTiposAsignacion) },
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

  const paradas: IParada[] = [];
  const paradasConConflicto: IParada[] = [];
  const paradasCreated = [];

  for (const asignacion of verifyAsignaciones) {
    const parada: IParada = {
      asignacionid: asignacion.asignacionid,
      tipo_parada: await findOrCreateTipoParada(filter.tipo_parada),
      hora_inicio: filter.hora_inicio,
      hora_fin: filter.hora_fin,
      created_at: new Date(),
      update_at: new Date(),
    };

    const existingParadas = await Parada.find({
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

      if (
        paradaInicio < existingParadaFin &&
        paradaFin > existingParadaInicio
      ) {
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
    const paradasSave = await createParada(parada, idCreator);
    paradasCreated.push(paradasSave);
  }

  if (paradasConConflicto.length > 0) {
    return {
      status: 404,
      message:
        "Se guardaron las paradas, salvo excepciones que tienen cruces de horas.",
    };
  }

  return { status: 200, data: paradasCreated };
};

const createParadaIndividual = async (
  filter: IParadaFilter,
  idCreator: number,
  idsTiposAsignacion: number[],
  fecha: Date
) => {
  const verfifyAsignacion = await Asignacion.findOne({
    where: {
      asignacionTipoAsignaciones: { tipoid: In(idsTiposAsignacion) },
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

  const parada: IParada = {
    asignacionid: verfifyAsignacion.asignacionid,
    tipo_parada: await findOrCreateTipoParada(filter.tipo_parada),
    hora_inicio: filter.hora_inicio,
    hora_fin: filter.hora_fin,
    created_at: new Date(),
    update_at: new Date(),
  };

  const existingParadas = await Parada.find({
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

  const result = await createParada(parada, idCreator);
  return { status: 200, data: result };
};

const createParada = async (parada: IParada, id: number) => {
  const paradaCreate = Parada.create({
    asignacionid: parada.asignacionid,
    hora_inicio: parada.hora_inicio,
    hora_fin: parada.hora_fin,
    created_at: new Date(),
    registeredByUserId: id,
    tipoParada: parada.tipo_parada,
  });
  return await paradaCreate.save();
};

export {
  createFilterParada,
  listFilterParadas,
  actualizarParada,
  eliminarParada,
};
