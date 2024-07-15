import { Request, Response } from "express";
import { httpError } from "../../user/utils/error.handle";
import {
  activarConfigRequest,
  createConfigRequest,
  desactivarConfigRequest,
  eliminarConfigRequests,
  listConfigRequest,
  requestAriel,
  requestTali,
  updateConfigRequest,
} from "../service/api-request";
import { fetchArielMessage, fetchTaliMessage } from "../middleware/peticion";
import { tokenInfo } from "../../user/utils/jwt.handle";

const postAriel = async (req: Request, res: Response) => {
  try {
    const { body } = req.body;
    const result = await requestAriel(body);
    if (!result) return httpError(res, "No se encontraron los parametros");
    const dataResponse = await fetchArielMessage(result);
    if (!dataResponse)
      return httpError(res, "No se pudo obtener la respuesta de Ariel");
    res.status(200).send(dataResponse);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const postTali= async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    if (!data) return httpError(res, "Lista de fecha es requerida para la peticion");
    const result = await requestTali();
    if (!result) return httpError(res, "No se encontraron los parametros");
    const dataResponse = await fetchTaliMessage(result, data);
    res.status(200).send(dataResponse);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};



const createConfigRequestCtrl = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return httpError(res, "Token is required");
    const id = tokenInfo(token);
    const result = await createConfigRequest(data, id);
    res.status(result.status).send(result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};
const updateConfigRequestCtrl = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const result = await updateConfigRequest(data);
    res.status(result.status).send( result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};
const desactivarConfigRequestCtrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const result = await desactivarConfigRequest(Number(id));
    res.status(result.status).send(result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};
const activarConfigRequestCtrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const result = await activarConfigRequest(Number(id));
    res.status(result.status).send(result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};
const getConfigsRequestCtrl = async (req: Request, res: Response) => {
  try {
    const result = await listConfigRequest();
    res.status(result.status).send(result.data || result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
}
const eliminarConfigRequestCtrl = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const result = await eliminarConfigRequests(data);
    res.status(result.status).send(result.message);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
}
export {
  postAriel,
  postTali,
  createConfigRequestCtrl,
  updateConfigRequestCtrl,
  desactivarConfigRequestCtrl,
  activarConfigRequestCtrl,
  getConfigsRequestCtrl,
  eliminarConfigRequestCtrl
};
