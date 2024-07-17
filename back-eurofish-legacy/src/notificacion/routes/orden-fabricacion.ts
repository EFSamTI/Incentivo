import { Router } from "express";
import { checkJwt } from "../../user/middleware/session";
import { postCrearOrdenFabricacion } from "../controllers/orden-fabricacion";


const routeOrdenFabricacion = Router();

routeOrdenFabricacion.post("/orden-fabricacion",checkJwt, postCrearOrdenFabricacion);

export { routeOrdenFabricacion };