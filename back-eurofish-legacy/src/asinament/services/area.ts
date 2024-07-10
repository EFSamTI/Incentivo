import { Area } from "../models/area";


const findOrCreateArea = async (area: string, cc: string) => {
    const validate = await Area.findOne({
        where: { nombre_area: area },
    });

    if (!validate) {
        const newArea = Area.create({
            nombre_area: area,
            cod_area: cc,
            created_at: new Date(),
        });
        return await newArea.save();
    }
    else {
        return validate;
    }
};

const findArea = async (area: string) => {
    return await Area.findOne({
        where: { nombre_area: area },
    });
}

const listAllAreas = async () => {
    const areas = await Area.find();
    if (!areas) return { status: 404, message: "No se encontraron areas" };
    
    return { status: 200, data: areas };
}

export { findOrCreateArea, findArea, listAllAreas};