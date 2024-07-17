
import { Request, Response } from "express";
import { httpError } from "../../user/utils/error.handle";
import { listApiTally } from "../services/api-tally-service";

const getApisTallyCtrl = async (req: Request, res: Response) => {

    try {
        const result = await listApiTally();
        res.status(result.status).send(result.data || result.message);
    }catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

export { getApisTallyCtrl };