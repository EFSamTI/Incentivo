import { Router } from "express";
import { getLineasCtrl } from "../controllers/linea";
import { checkJwt } from "../../user/middleware/session";


const routeLinea = Router();

routeLinea.get("/lineas", checkJwt, getLineasCtrl);

export { routeLinea };