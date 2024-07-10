import { httpError } from "../../user/utils/error.handle";
import { aplicarMovimientoAsignacion, listFilterAsignaciones, listFilterUltimosMovimientos, listMovimientosFuncionBD, listMovimientosPersonal, restablecerMovimiento } from "../services/movimiento";

import { Request, Response } from "express";

const getAsignaciones = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const result = await listFilterAsignaciones(data);
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
        httpError(res, error.message);
        }
    }
}

const postAplicarCambios= async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        if (!data) return httpError(res, "Cambios is required");
        const result = await aplicarMovimientoAsignacion(data);
        res.status(result.status).send({message: result.message});
    } catch (error) {
        if (error instanceof Error) {
        httpError(res, error.message);
        }
    }
}

const postRestablecerCambios = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        if (!data) return httpError(res, "Cambios is required");
        const result = await restablecerMovimiento(data);
        res.status(result.status).send({message: result.message});
    } catch (error) {
        if (error instanceof Error) {
        httpError(res, error.message);
        }
    }
}

const getCambiosFuncionBD = async (req: Request, res: Response) => {
    try {
        const { body } = req.body;
        const result = await listMovimientosFuncionBD(body);
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

const getCambios = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const result = await listMovimientosPersonal(data);
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}
const getUltimoCamnbios = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const result = await listFilterUltimosMovimientos(data);
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}
export  { getAsignaciones, postAplicarCambios, postRestablecerCambios, getCambios, getUltimoCamnbios, getCambiosFuncionBD};