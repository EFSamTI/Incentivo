import { Router } from "express";
import { getMovimientos, getTotales } from "../controllers/dashborad";
import { checkJwt } from "../../user/middleware/session";


const routeDashboard = Router();

routeDashboard.get("/dashboard/totales",checkJwt, getTotales);

routeDashboard.get("/dashboard/movimientos",checkJwt, getMovimientos);

export { routeDashboard };
