import { OrdenFabricacionProduccion } from "../models/orden-fabricacion-produccion";
import { OrdenFabricacion } from '../models/orden-fabricacion';


const findOrdenFabricacionProduccion = async (turnid:number, fecha_produccion: string, ordenFabricacion:OrdenFabricacion) => {
    const fecha = new Date(fecha_produccion);
    const ordenFabricacionProduccion = await OrdenFabricacionProduccion.findOne({
        where: { turno_id: turnid, fecha_produccion: fecha, ordenFabricacion: ordenFabricacion },
    });
    if (!ordenFabricacionProduccion) {
        const newOrdenFabricacionProduccion = OrdenFabricacionProduccion.create({
            ordenFabricacion: ordenFabricacion,
            fecha_produccion: fecha,
            turno_id: turnid,
            createdAt: new Date(),
        });
        return await newOrdenFabricacionProduccion.save();
    }else{
        return ordenFabricacionProduccion;
    }
}
export { findOrdenFabricacionProduccion };