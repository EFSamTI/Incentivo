
import { Asignacion } from "../models/asignacion";
import { Asistencia } from "../models/asistencia";

const saveEntrada = async (asignacion: Asignacion) => {
  const newMovimiento = Asistencia.create({
    asignacionid: asignacion.asignacionid,
    hora_entrada: asignacion.hora_asignacion,
    created_at: new Date(),
  });
  await newMovimiento.save();
};


const saveSalida = async (asignacion: Asignacion) => {
  const movimiento = await Asistencia.findOne({
    where: { asignacion: asignacion },
  });

  if (!movimiento) return { status: 404, message: "Movimiento no encontrado" };

  const horaSalida = new Date().toLocaleTimeString();
  movimiento.hora_salida = horaSalida;

  const entrada = new Date(`1970-01-01T${movimiento.hora_entrada}Z`);
  const salida = new Date(`1970-01-01T${horaSalida}Z`);

  let diferenciaHoras =
    (salida.getTime() - entrada.getTime()) / (1000 * 60 * 60);

  const duracionAlmuerzo = 1;
  diferenciaHoras -= duracionAlmuerzo;

  movimiento.tiempo_trabajo = `${diferenciaHoras} hours`;

  await movimiento.save();
  return { status: 200, data: movimiento };
};


export { saveEntrada, saveSalida };