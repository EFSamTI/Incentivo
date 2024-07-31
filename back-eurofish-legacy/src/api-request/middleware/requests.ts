
import { ConfigRequest } from "../model/config-request";
import {  IBodyRequest } from "../interfaces/request";


const upFetch = async (config: ConfigRequest, body?: IBodyRequest[]) => {
    
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
            body:  body || null
        })
    });
    if (!response.ok) {
        return { status: 404, message: `Error: Estado ${response.statusText} ` };
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


export { upFetch };
