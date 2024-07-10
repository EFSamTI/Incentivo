import { Router } from "express";
import { checkJwt } from "../../user/middleware/session";
import { getAsignaciones, getCambios, getCambiosFuncionBD, getUltimoCamnbios, postAplicarCambios, postRestablecerCambios } from "../controllers/movimiento";


const routeMovimiento = Router();

routeMovimiento.post("/asignaciones",checkJwt, getAsignaciones);
routeMovimiento.post("/movimientos", checkJwt, getCambios);
routeMovimiento.get("/movimientos/enviar",checkJwt,getCambiosFuncionBD);
routeMovimiento.post("/movimiento/ultimos",checkJwt, getUltimoCamnbios);
routeMovimiento.post("/movimiento/aplicar", checkJwt, postAplicarCambios);
routeMovimiento.post("/movimiento/restablecer", checkJwt, postRestablecerCambios);


export { routeMovimiento };