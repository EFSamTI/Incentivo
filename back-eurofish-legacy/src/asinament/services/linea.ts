import { Linea } from "../models/linea";


const findOrCreateLinea = async (linea: string) => {
    const validate = await Linea.findOne({
        where: { nombrelinea: linea },
    });

    if (!validate) {
        const newLinea = Linea.create({
            nombrelinea: linea,
            created_at: new Date(),
        });
        return await newLinea.save();
    }
    else {
        return validate;
    }
}


const listAllLineas = async () => {
    const lineas = await Linea.find();
    if (!lineas) return { status: 404, message: "No se encontraron lineas" };
    
    return { status: 200, data: lineas };
}

export { findOrCreateLinea, listAllLineas };