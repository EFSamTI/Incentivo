
import { Request, Response } from "express";
import { getAsistenciaWithMarcacion } from "../service/ariel";
import { httpError } from "../../user/utils/error.handle";

const getAsistenciaWithMarcacionCtrl = async (req: Request, res: Response) => {
    try {
      const { bodyMarcacion, itemAsistencia } = req.body;
      const dataResponse = await getAsistenciaWithMarcacion(bodyMarcacion, itemAsistencia);
      if (!dataResponse) return httpError(res, "No se encontraron los parametros");
      res.status(dataResponse.status).send(dataResponse.data || dataResponse.message);
    } catch (error) {
      if (error instanceof Error) {
        httpError(res, error.message);
      }
    }
  }

  export { getAsistenciaWithMarcacionCtrl };