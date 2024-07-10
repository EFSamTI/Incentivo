import { TipoParada } from "../../parada/models/tipoparada";


const findOrCreateTipoParada = async (tipoParada: string) => {
    const validateTipoParada = await TipoParada.findOne({
        where: { descripcion: tipoParada },
    });
    if (!validateTipoParada) {
        const newTipoParada = TipoParada.create({
            descripcion: tipoParada,
            created_at: new Date(),
        });
        return await newTipoParada.save();
    }
    else {
        return validateTipoParada;
    }
}

export { findOrCreateTipoParada };