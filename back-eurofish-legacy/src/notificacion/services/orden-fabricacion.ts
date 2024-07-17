import { findOrCreateTurno } from "../../asinament/services/turno";
import { OrdenFabricacion } from "../models/orden-fabricacion";
import { findOrdenFabricacionProduccion } from "./orden-fabricacion-produccion";
import {
  createOrdenFabricacionRecurso,
  IOrdenFabricacionRecursos,
} from "./orden-fabricacion-recurso";
import { findOrdenFabricacionTipoIngreso } from "./orden-fabricacion-tipo-ingreso";

export interface IOrdenFabricacion {
  numero_orden: string;
  nivel_orden: string;
  tipo_ingreso: string;
  fecha_produccion: string;
  turno: string;
  recursos: IOrdenFabricacionRecursos[];
}

const createOrdenFabricacion = async (
  data: IOrdenFabricacion,
  idRegister: number
) => {
  const tipo = await findOrdenFabricacionTipoIngreso(data.tipo_ingreso);
  if (!tipo)
    return { status: 400, message: "Error al crear el tipo de ingreso" };
  const ordenFabricacion = OrdenFabricacion.create({
    numero_orden: data.numero_orden,
    nivel_orden: data.nivel_orden,
    tipo_ingreso: tipo,
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

  const recursos = await createOrdenFabricacionRecurso(
    data.recursos,
    idRegister,
    saveOrdenFabricacion
  );

  return {
    status: 200,
    data: { ordenFabricacion: saveOrdenFabricacion, recursos },
  };
};


export { createOrdenFabricacion };