import { IRequestAsistencia, IRequestMarcacion } from "../interfaces/ariel";
import { IBodyRequest } from "../interfaces/request";
import { fetchArielMessage } from "../middleware/peticion";
import { requestAriel } from "./api-request";

const getAsistenciaWithMarcacion = async (bodyMarcacion: IBodyRequest[]) => {
    const confRequest = await requestAriel();
    if (!confRequest)
        return { status: 404, message: "No se encontraron los parametros" };


    const responseMarcacion = await fetchArielMessage(confRequest, bodyMarcacion);

    const marcacion: IRequestMarcacion = responseMarcacion.data;

 
    if ( !marcacion.items)
        return { status: 404, message: "No se encontraron items en la respuesta" };



    return { status: 200, data: marcacion };
}

export { getAsistenciaWithMarcacion };