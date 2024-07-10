import { Request, Response } from "express";
import { httpError } from "../../user/utils/error.handle";
import { tokenInfo } from "../../user/utils/jwt.handle";
import {
  deleteAsignacion,
  saveAsignacionesAriel,

  saveAsignacionesComodin,
  saveAsignacionesSinCambios,
  verifyAsignaciones,
} from "../services/asignacion";


const verifiAsignacionesCtrl = async (req: Request, res: Response) => { 
  try {
    const { data } = req.body;
    if (!data) return httpError(res, "Data is required");
    const result = await verifyAsignaciones(data);
    res.status(result.status).send(result.data);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
}


const asignacionesComodinCtrl = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return httpError(res, "Token is required");
    const id = tokenInfo(token);
    const result = await saveAsignacionesComodin(data, id);
    res.status(result.status).send(result.data || result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const asignacionesArielCtrl = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return httpError(res, "Token is required");
    const id = tokenInfo(token);
    const result = await saveAsignacionesAriel(data, id);
    res.status(result.status).send(result.data || result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};


const asignacionesSinCambiosCtrl = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return httpError(res, "Token is required");
    const id = tokenInfo(token);
    const result = await saveAsignacionesSinCambios(data, id);
    res.status(result.status).send(result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
}

const deleteAsignacionesCtrl = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const result = await deleteAsignacion(data);
    res.status(result.status).send(result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
}

export { asignacionesComodinCtrl, asignacionesArielCtrl, asignacionesSinCambiosCtrl, deleteAsignacionesCtrl, verifiAsignacionesCtrl };
