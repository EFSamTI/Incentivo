
import { ConfigRequest } from "../model/config-request";
import {  IBodyRequest } from "../interfaces/request";


const fetchArielMessage = async (config: ConfigRequest, body: IBodyRequest[]) => {
    const url = `${config.tipoRequest.url}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            source: config.source,
            destination: config.destination,
            operation: config.operation,
            verb: config.verb,
            path: config.path,
            body: body
        })
    });
    if (!response.ok) {
        return { status: 404, message: "No se encontraron los parametros" };
    } else {
        const text = await response.text(); 
        if (text) { 
            const data = JSON.parse(text); 
            return { status: 200, data: data };
        } else {
            return { status: 204, message: "Respuesta vacía del servidor" };
        }
    }
};


interface IResponseFechaAndData {
    fecha: string;
    data: any;
}

const fetchTaliMessage = async (result: ConfigRequest, fechas: string[]) => {
    const responses:IResponseFechaAndData[] = [];
    for (const fecha of fechas) {
        const url = `${result.tipoRequest.url}/?created_from=${fecha}`; 
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            responses.push({ fecha, data: null });
        } else {
            const data = await response.json();
            responses.push({ fecha, data });
        }
    }
    return responses;
}

export { fetchArielMessage, fetchTaliMessage };
