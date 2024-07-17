import { OrdenFabricacionTipoIngreso } from "../models/orden-fabricacion-tipo-ingreso";


const findOrdenFabricacionTipoIngreso = async (tipo: string) => {
    const ordenFabricacionTipoIngreso = await OrdenFabricacionTipoIngreso.findOne({
        where: { descripcion: tipo },
    });
    if (!ordenFabricacionTipoIngreso) {
       const newOrdenFabricacionTipoIngreso = OrdenFabricacionTipoIngreso.create({
            descripcion: tipo,
            createdAt: new Date(),
        });
        return await newOrdenFabricacionTipoIngreso.save();
    }else{
        return ordenFabricacionTipoIngreso;
    }
}

export { findOrdenFabricacionTipoIngreso };