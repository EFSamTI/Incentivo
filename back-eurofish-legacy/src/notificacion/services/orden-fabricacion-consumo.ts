import { ProductionOrderLine } from "../interfaces/orden-fabricacion";
import { OrdenFabricacionConsumo } from "../models/orden-fabricacion-consumo";
import { OrdenFabricacionRecurso } from "../models/orden-fabricacion-recurso";




const createOrdenFabricacionConsumo = async ( consumos: ProductionOrderLine[], recurso: OrdenFabricacionRecurso, idCreator: number) => {

    let consumosSave: OrdenFabricacionConsumo[] = [];
    
    for (const consumo of consumos) {
        const consumoSave = OrdenFabricacionConsumo.create({
            item_nombre: consumo.ItemName,
            cantidad_planificada: consumo.PlannedQuantity,
            cantidad_usada: consumo.IssuedQuantity,
            um: `${ consumo.UoMCode}`,
            estado: true,
            registeredByUserId: idCreator,
            ordenFabricacionRecurso: recurso
        });
        const save = await consumoSave.save();
        consumosSave.push(save);
    }
    return consumosSave;

}

export { createOrdenFabricacionConsumo };