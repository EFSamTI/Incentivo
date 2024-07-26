
import { ItemMarcaje } from "../../api-request/interfaces/ariel";
import { Asignacion } from "../models/asignacion";
import { Marcaje } from "../models/marcaje";


const saveMarcacion = async (asignacion: Asignacion, marcacion: ItemMarcaje) => {
  const newMarcaje = Marcaje.create({
    asignacion,
    tipo: marcacion.tipo_marcaje,
    hora: new Date(marcacion.hora), 
    codigo: marcacion.codigo,
    created_at: new Date(),
  });
  await newMarcaje.save();
};


export { saveMarcacion };