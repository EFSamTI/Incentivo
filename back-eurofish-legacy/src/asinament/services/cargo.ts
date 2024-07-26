import { Actividad } from "../models/actividad";
const findOrCreateActividad = async (cargo: string, id:number) => {
    const validatecargo = await Actividad.findOne({
        where: { actividadname: cargo },
    });
    if (!validatecargo) {
        const newCargo = Actividad.create({
            actividadid: id,
            actividadname: cargo,
            created_at: new Date(),
        });
        return await newCargo.save();
    }
    else {
        return validatecargo;
    }
}

const findOrCreateActividadNew = async (cargo: string) => {
    const validate = await Actividad.findOne({
        where: { actividadname: cargo },
    });
    if (!validate) {
        const newActividad = Actividad.create({
    
            actividadname: cargo,
            created_at: new Date(),
        });
        return await newActividad.save();
    }
    else {
        return validate;
    }
}
export { findOrCreateActividad, findOrCreateActividadNew };