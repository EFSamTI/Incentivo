import { Router } from "express";
import { checkJwt } from "../../user/middleware/session";
import { asignacionesComodinCtrl, asignacionesArielCtrl, asignacionesSinCambiosCtrl, deleteAsignacionesCtrl, verifiAsignacionesCtrl } from "../controllers/asignacion";


const routerAsignacion = Router();

routerAsignacion.post("/asignacion/verificar", checkJwt, verifiAsignacionesCtrl);
routerAsignacion.post("/asignacion/comodin", checkJwt, asignacionesComodinCtrl);
routerAsignacion.post("/asignacion/ariel", checkJwt, asignacionesArielCtrl);
routerAsignacion.post("/asignacion", checkJwt, asignacionesSinCambiosCtrl);
routerAsignacion.delete("/asignacion", checkJwt, deleteAsignacionesCtrl);

export { routerAsignacion };