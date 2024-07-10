import { Request, Response, NextFunction } from "express";

export const readImage = (req: Request, res: Response, next: NextFunction) => {

  if (!req.file || !req.file.buffer) {
    return res.status(400).send("No se subió ningún archivo o el archivo no se cargó correctamente");
  }
  next();
};