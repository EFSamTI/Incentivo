import { ConfigTipo } from "../model/tipo";


const findOrCreateTipo = async (tipo: string) => {
    const tipoExistente = await ConfigTipo.findOne({
        where: { nombre_tipo: tipo },
    });

    if (!tipoExistente) {
        const tipoNuevo = await ConfigTipo.create({
            nombre_tipo: tipo,
        }).save();
        return tipoNuevo;
    }
    return tipoExistente
}

export { findOrCreateTipo}