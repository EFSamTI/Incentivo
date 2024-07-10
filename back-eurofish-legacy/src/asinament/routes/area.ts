import { Router } from "express";
import { checkJwt } from "../../user/middleware/session";
import { getAreasCtrl } from "../controllers/area";


const routeArea = Router();

routeArea.get("/areas", getAreasCtrl);

export { routeArea };