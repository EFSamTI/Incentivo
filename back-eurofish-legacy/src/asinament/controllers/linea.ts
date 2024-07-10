import { httpError } from "../../user/utils/error.handle";
import { Request, Response } from "express";
import { listAllLineas } from "../services/linea";


const getLineasCtrl = async (req: Request, res: Response) => {
    try {
        const result = await listAllLineas();
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

export { getLineasCtrl };