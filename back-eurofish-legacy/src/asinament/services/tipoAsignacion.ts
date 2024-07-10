import { TipoAsignacion } from "../models/tipoAsignacion";


const findOrCreateTipoAsignacion = async (tipoAsignacion: string) => {

    const validateTipoAsignacion = await TipoAsignacion.findOne({
        where: { descripcion: tipoAsignacion },
    });

    if (!validateTipoAsignacion) {
        const newTipoAsignacion = TipoAsignacion.create({
            descripcion: tipoAsignacion,
            created_at: new Date(),
        });
        return await newTipoAsignacion.save();
    }
    else {
        return validateTipoAsignacion;
    }
}

export { findOrCreateTipoAsignacion };
