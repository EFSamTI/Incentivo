import { ConfigAmbiente } from "../model/ambiente";


const findOrCreateAmbiente = async (ambiente: string, creatorid?: number) => {
    const ambienteExistente = await ConfigAmbiente.findOne({
        where: { nombre_ambiente: ambiente },
    });

    if (!ambienteExistente) {
        const ambienteNuevo = await ConfigAmbiente.create({
            nombre_ambiente: ambiente
        }).save();
        return ambienteNuevo;
    }
    return ambienteExistente;
}   


export { findOrCreateAmbiente };
    