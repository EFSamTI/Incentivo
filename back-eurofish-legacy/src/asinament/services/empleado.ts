import { Cargo } from "../models/cargo";
import { Empleado } from '../models/empleado';
import { findOrCreateCargo } from "./cargo";


const listEmpleados = async () => {
    const empleados = await Empleado.find();
    if (empleados.length === 0) return { status: 404, message: "No se encontraron empleados" }; 
    return { status: 200, data: empleados };
}

const findOrCreateEmpleado = async (nombre: string, ci: string, cod_persona: string) => {

    const empleadoExistente = await Empleado.findOne({
        where: { nombre: nombre },
    });

    if (!empleadoExistente) {
        const empleadoNuevo = await Empleado.create({
            nombre: nombre,
            cod_persona: cod_persona,
            ci: ci,
            created_at: new Date(),
        }).save();
        return empleadoNuevo;
    }

    return empleadoExistente;
}



export { findOrCreateEmpleado, listEmpleados };
