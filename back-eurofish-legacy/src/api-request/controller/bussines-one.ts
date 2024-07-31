
import { Request, Response } from "express";
import { getDetalleOrdenFabricacion, getInventoryExits } from "../service/bussines-one";
import { httpError } from "../../user/utils/error.handle";

const getInventoryExitsCtrl = async (req: Request, res: Response) => {
    try {
      const dataResponse = await getInventoryExits();
      if (!dataResponse) return httpError(res, "No se encontraron los parametros");
      res.status(dataResponse.status).send(dataResponse.data || dataResponse.message);
    } catch (error) {
      if (error instanceof Error) {
        httpError(res, error.message);
      }
    }
}


const getDetalleOrdenFabricacionCtrl = async (req: Request, res: Response) => {
    try {
      const dataResponse = await getDetalleOrdenFabricacion();
      if (!dataResponse) return httpError(res, "No se encontraron los parametros");
      res.status(dataResponse.status).send(dataResponse.data || dataResponse.message);
    } catch (error) {
      if (error instanceof Error) {
        httpError(res, error.message);
      }
    }
}

export { getDetalleOrdenFabricacionCtrl, getInventoryExitsCtrl };
