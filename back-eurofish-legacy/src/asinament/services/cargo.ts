import { Cargo } from "../models/cargo";
const findOrCreateCargo = async (cargo: string, id:number) => {
    const validatecargo = await Cargo.findOne({
        where: { cargoname: cargo },
    });
    if (!validatecargo) {
        const newCargo = Cargo.create({
            cargoid: id,
            cargoname: cargo,
            created_at: new Date(),
        });
        return await newCargo.save();
    }
    else {
        return validatecargo;
    }
}

const findCargo = async (cargo: string) => {
    return await Cargo.findOne({
        where: { cargoname: cargo },
    });
}

export { findOrCreateCargo, findCargo };