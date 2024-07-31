import { OrdenFabricacionRecurso } from "../models/orden-fabricacion-recurso";
import { OrdenFabricacion } from '../models/orden-fabricacion';
import { IOrdenFabricacionSave } from "../interfaces/orden-fabricacion";



const createOrdenFabricacionRecurso = async (of:IOrdenFabricacionSave, idCreator: number, ordenFabricacion: OrdenFabricacion) => {
    const recursoSave = OrdenFabricacionRecurso.create({
        codigo: of.codigo,
        ordenFabricacion: ordenFabricacion,
        descripcion: of.descripcion,
        cantidad_planificada: of.cantidad_planificada,
        cantidad_completada: of.cantidad_completada,
        cantidad_rechazada: of.cantidad_rechazada,
        um: of.unidad_medida,
        estado: true,
        registeredByUserId: idCreator,
    });

    const save = await recursoSave.save();
    return save;
}


export { createOrdenFabricacionRecurso };