import { Router } from "express";
import { activarConfigRequestCtrl, createConfigRequestCtrl, desactivarConfigRequestCtrl, eliminarConfigRequestCtrl, getConfigsRequestCtrl, updateConfigRequestCtrl } from "../controller/config-request";
import { checkJwt } from "../../user/middleware/session";
import { getAsistenciaWithMarcacionCtrl } from "../controller/ariel";
import { getDetalleOrdenFabricacionCtrl, getInventoryExitsCtrl } from "../controller/bussines-one";


const routeApiRequest = Router();



//Peticiones a vistas Ariel
routeApiRequest.post("/api-request/ariel/marcacion", getAsistenciaWithMarcacionCtrl);

//Peticiones a vistas bussines-one
routeApiRequest.post("/api-request/bussines-one/inventory-exits", getInventoryExitsCtrl);
routeApiRequest.post("/api-request/bussines-one/detalle-orden-fabricacion", getDetalleOrdenFabricacionCtrl);

//Peticiones a vistas config-request
routeApiRequest.get("/api-request", checkJwt, getConfigsRequestCtrl);
routeApiRequest.post("/api-request/crear", checkJwt, createConfigRequestCtrl);
routeApiRequest.put("/api-request", checkJwt, updateConfigRequestCtrl);
routeApiRequest.put("/api-request/desactivar", checkJwt, desactivarConfigRequestCtrl);
routeApiRequest.put("/api-request/activar", checkJwt, activarConfigRequestCtrl);
routeApiRequest.put("/api-request/eliminar", checkJwt, eliminarConfigRequestCtrl);

export { routeApiRequest };