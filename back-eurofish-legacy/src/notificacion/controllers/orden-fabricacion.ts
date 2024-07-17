
import { Request, Response } from "express";
import { httpError } from "../../user/utils/error.handle";
import { tokenInfo } from "../../user/utils/jwt.handle";
import { createOrdenFabricacion } from "../services/orden-fabricacion";
const postCrearOrdenFabricacion = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return httpError(res, "Token is required");
        const id = tokenInfo(token);
        const result = await createOrdenFabricacion(data, id);
        res.status(result.status).send(result.message || result.data);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

export { postCrearOrdenFabricacion };