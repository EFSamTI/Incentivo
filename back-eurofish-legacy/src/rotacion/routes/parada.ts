import { Router } from "express";
import { checkJwt } from "../../user/middleware/session";
import { deleteParadasCtrl, getParadasCtrl, postParadasCtrl, putParadasCtrl } from "../../parada/controllers/parada";



const routeParada = Router();

routeParada.post("/paradas",checkJwt, getParadasCtrl);
routeParada.post("/parada", checkJwt, postParadasCtrl);
routeParada.put("/parada", checkJwt, putParadasCtrl);
routeParada.put("/parada/delete", checkJwt, deleteParadasCtrl);
export { routeParada };