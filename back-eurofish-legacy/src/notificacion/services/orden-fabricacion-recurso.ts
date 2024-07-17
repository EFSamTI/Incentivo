import { OrdenFabricacionRecurso } from "../models/orden-fabricacion-recurso";
import { OrdenFabricacion } from '../models/orden-fabricacion';

export interface IOrdenFabricacionRecursos {
    codigo_posicion: string;
    tipo: string;
    cantidad?: number;
    um?: string;
}


const createOrdenFabricacionRecurso = async (recursos:IOrdenFabricacionRecursos[], idCreator: number, ordenFabricacion: OrdenFabricacion) => {
  
    const recursosSave = [];
    for (const recurso of recursos) {
    const ordenFabricacionRecurso = OrdenFabricacionRecurso.create({
        codigo_posicion: recurso.codigo_posicion,
        ordenFabricacion: ordenFabricacion,
        descripcion: recurso.tipo,
        cantidad: recurso.cantidad,
        um: recurso.um,
        estado: true,
        registeredByUserId: idCreator,
    });
    const save  = await ordenFabricacionRecurso.save();
    recursosSave.push(save);

  }
    return recursosSave;
}


export { createOrdenFabricacionRecurso };