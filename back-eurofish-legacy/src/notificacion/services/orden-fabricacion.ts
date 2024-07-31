import { findOrCreateTurno } from "../../asinament/services/turno";
import { IOrdenFabricacionSave } from "../interfaces/orden-fabricacion";
import { OrdenFabricacion } from "../models/orden-fabricacion";
import { createOrdenFabricacionConsumo } from "./orden-fabricacion-consumo";
import { findOrdenFabricacionProduccion } from "./orden-fabricacion-produccion";
import { createOrdenFabricacionRecurso } from "./orden-fabricacion-recurso";

const createOrdenFabricacion = async (
  data: IOrdenFabricacionSave,
  idRegister: number
) => {
  const ordenFabricacion = OrdenFabricacion.create({
    numero_orden: data.numero_orden,
    nivel_orden: data.nivel_orden,
    registeredByUserId: idRegister,
    createdAt: new Date(),
  });
  const saveOrdenFabricacion = await ordenFabricacion.save();

  const turno = await findOrCreateTurno(data.turno);

  findOrdenFabricacionProduccion(
    turno.turnoid,
    data.fecha_produccion,
    saveOrdenFabricacion
  );

  const recurso = await createOrdenFabricacionRecurso(
    data,
    idRegister,
    saveOrdenFabricacion
  );

  if (!recurso) {
    return {
      status: 400,
      message: "Error al crear recurso",
    };
  }

  const consumos = await createOrdenFabricacionConsumo(
    data.recursos,
    recurso,
    idRegister
  );

  if (!consumos.length) {
    return {
      status: 400,
      message: "Error al crear consumos",
    };
  }

  return {
    status: 200,
    data: consumos,
  };
};

export { createOrdenFabricacion };
