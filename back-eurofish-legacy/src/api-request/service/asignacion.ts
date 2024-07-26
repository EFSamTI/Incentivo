import {
  ItemMarcaje,
  IResponseAriel,
  ItemAsistencia,
} from "../interfaces/ariel";

import { IBodyRequest } from "../interfaces/request";
import { fetchArielMessage } from "../middleware/peticion";
import { requestAriel } from "./api-request";

const getAsistenciaWithMarcacion = async (
  bodyMarcacion: IBodyRequest[],
  itemAsistencia: ItemAsistencia
) => {
  const confRequest = await requestAriel();
  if (!confRequest)
    return { status: 404, message: "No se encontraron los parametros" };

  const responseMarcacion = await fetchArielMessage(confRequest, bodyMarcacion);

  const marcacion: IResponseAriel<ItemMarcaje> = responseMarcacion.data;

  if (!marcacion.items)
    return { status: 404, message: "No se encontraron items en la respuesta" };

  const horaEntradaPlanificada = new Date(
    itemAsistencia.hora_entrada
  ).getTime();
  const horaSalidaPlanificada = new Date(itemAsistencia.hora_salida).getTime();

  let entradaCercana: ItemMarcaje | undefined;
  let salidaCercana: ItemMarcaje | undefined;
  let diferenciaEntradaMinima = Infinity;
  let diferenciaSalidaMinima = Infinity;

  marcacion.items.forEach((item) => {
    const horaMarcaje = new Date(item.hora).getTime();
    const diferenciaEntrada = Math.abs(horaMarcaje - horaEntradaPlanificada);
    const diferenciaSalida = Math.min(
      Math.abs(horaMarcaje - horaSalidaPlanificada),
      Math.abs(horaMarcaje - (horaSalidaPlanificada + 24 * 60 * 60 * 1000)),
      Math.abs(horaMarcaje - (horaSalidaPlanificada - 24 * 60 * 60 * 1000))
    );

    if (diferenciaEntrada < diferenciaEntradaMinima) {
      entradaCercana = item;
      diferenciaEntradaMinima = diferenciaEntrada;
    }
    if (diferenciaSalida < diferenciaSalidaMinima) {
      salidaCercana = item;
      diferenciaSalidaMinima = diferenciaSalida;
    }
  });

  return {
    status: 200,
    data: { entrada: entradaCercana, salida: salidaCercana },
  };
};
export { getAsistenciaWithMarcacion };
