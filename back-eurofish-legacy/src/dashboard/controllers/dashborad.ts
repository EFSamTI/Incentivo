import { Request, Response } from "express";
import { httpError } from "../../user/utils/error.handle";
import { listMovimientos, listTotalesIsentivos } from "../services/dashboard";


const getTotales = async (req: Request, res: Response) => {
    try {
        const result = await listTotalesIsentivos();
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

const getMovimientos = async (req: Request, res: Response) => {
    try {
        const result = await listMovimientos();
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

export { getTotales, getMovimientos };