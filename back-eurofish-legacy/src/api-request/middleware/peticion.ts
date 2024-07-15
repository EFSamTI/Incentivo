import dotenv from "dotenv";
import { IRequestTali, IResponseTali } from "../interfaces/tali";
import { ConfigRequest } from "../model/config-request";
dotenv.config();

const fetchArielMessage = async (result: any): Promise<any> => {
    const response = await fetch(`${process.env.URL_ARIEL}/v1/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
    });
    if (!response.ok) return null;
    return response.json();
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
