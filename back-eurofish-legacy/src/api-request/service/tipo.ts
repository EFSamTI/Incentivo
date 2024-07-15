import { ConfigTipo } from "../model/tipo";


const findOrCreateTipo = async (tipo: string, url:string) => {
    const tipoExistente = await ConfigTipo.findOne({
        where: { nombre_tipo: tipo },
    });

    if (!tipoExistente) {
        const tipoNuevo = await ConfigTipo.create({
            nombre_tipo: tipo,
            url: url
        }).save();
        return tipoNuevo;
    }
    return tipoExistente
}

export { findOrCreateTipo}