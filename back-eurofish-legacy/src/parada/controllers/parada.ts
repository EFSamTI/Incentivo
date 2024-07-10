import { httpError } from "../../user/utils/error.handle";
import { tokenInfo } from "../../user/utils/jwt.handle";

import { Request, Response } from "express";
import { actualizarParada, createFilterParada, eliminarParada, listFilterParadas } from "../services/parada";




const getParadasCtrl = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const result = await listFilterParadas(data);
        res.status(result.status).send(result.data || result.message);

    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
         }
    }
}

const postParadasCtrl = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return httpError(res, "Token is required");
        const id = tokenInfo(token);
        const result = await createFilterParada(data, id);
        res.status(result.status).send( result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}


const putParadasCtrl = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const result = await actualizarParada(data);
        res.status(result.status).send(result.message || result.data);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }

}

const deleteParadasCtrl = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const result = await eliminarParada(data);
        res.status(result.status).send(result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }

}



export { getParadasCtrl, postParadasCtrl, putParadasCtrl, deleteParadasCtrl };