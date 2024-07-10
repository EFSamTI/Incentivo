import { Turno } from "../models/turno";


const findOrCreateTurno = async (turno: string, id: number) => {
    const validate = await Turno.findOne({
        where: { nombre_turno: turno },
    });

    if (!validate) {
        const newTurno = Turno.create({
            turnoid: id,
            nombre_turno: turno,
            created_at: new Date(),
        });
        return await newTurno.save();
    }
    else {
        return validate;
    }
}
    

export { findOrCreateTurno };