import { httpError } from "../../user/utils/error.handle";
import { listEmpleados } from "../services/empleado";
import { Request, Response } from "express";


const getEmpleados = async (req: Request, res: Response) => {
    try {
        const result = await listEmpleados();
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

export { getEmpleados };