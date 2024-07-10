import { Router } from "express";
import { activarConfigRequestCtrl, createConfigRequestCtrl, desactivarConfigRequestCtrl, eliminarConfigRequestCtrl, getConfigsRequestCtrl, postAriel, updateConfigRequestCtrl } from "../controller/api-request";
import { checkJwt } from "../../user/middleware/session";


const routeApiRequest = Router();

routeApiRequest.post("/api-request",checkJwt, postAriel);
routeApiRequest.get("/api-request", checkJwt, getConfigsRequestCtrl);
routeApiRequest.post("/api-request/crear", checkJwt, createConfigRequestCtrl);
routeApiRequest.put("/api-request", checkJwt, updateConfigRequestCtrl);
routeApiRequest.put("/api-request/desactivar", checkJwt, desactivarConfigRequestCtrl);
routeApiRequest.put("/api-request/activar", checkJwt, activarConfigRequestCtrl);
routeApiRequest.put("/api-request/eliminar", checkJwt, eliminarConfigRequestCtrl);

export { routeApiRequest };