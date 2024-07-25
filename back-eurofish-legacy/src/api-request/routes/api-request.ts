import { Router } from "express";
import { activarConfigRequestCtrl, createConfigRequestCtrl, desactivarConfigRequestCtrl, eliminarConfigRequestCtrl, getAsistenciaWithMarcacionCtrl, getConfigsRequestCtrl, postAriel, postTali, updateConfigRequestCtrl } from "../controller/api-request";
import { checkJwt } from "../../user/middleware/session";


const routeApiRequest = Router();

//Peticiones al middleware
routeApiRequest.post("/api-request/ariel",checkJwt, postAriel);
routeApiRequest.post("/api-request/tali",checkJwt, postTali);

//Peticiones a vistas
routeApiRequest.post("/api-request/ariel/marcacion", getAsistenciaWithMarcacionCtrl);


routeApiRequest.get("/api-request", checkJwt, getConfigsRequestCtrl);
routeApiRequest.post("/api-request/crear", checkJwt, createConfigRequestCtrl);
routeApiRequest.put("/api-request", checkJwt, updateConfigRequestCtrl);
routeApiRequest.put("/api-request/desactivar", checkJwt, desactivarConfigRequestCtrl);
routeApiRequest.put("/api-request/activar", checkJwt, activarConfigRequestCtrl);
routeApiRequest.put("/api-request/eliminar", checkJwt, eliminarConfigRequestCtrl);

export { routeApiRequest };