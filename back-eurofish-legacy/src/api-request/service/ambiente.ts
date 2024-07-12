import { ConfigAmbiente } from "../model/ambiente";


const findOrCreateAmbiente = async (ambiente: string, uri: string) => {
    const ambienteExistente = await ConfigAmbiente.findOne({
        where: { nombre_ambiente: ambiente },
    });

    if (!ambienteExistente) {
        const ambienteNuevo = await ConfigAmbiente.create({
            nombre_ambiente: ambiente,
            uri: uri,
        }).save();
        return ambienteNuevo;
    }
    return ambienteExistente;
}   


export { findOrCreateAmbiente };
    