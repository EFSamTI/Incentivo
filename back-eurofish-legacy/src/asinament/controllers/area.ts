

import { Request, Response } from "express";
import { httpError } from "../../user/utils/error.handle";
import { listAllAreas } from "../services/area";

const getAreasCtrl = async (req: Request, res: Response) => {
    try {
        const result = await listAllAreas();
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

export { getAreasCtrl };