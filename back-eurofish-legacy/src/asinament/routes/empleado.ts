import { Router } from "express";
import { checkJwt } from "../../user/middleware/session";
import { getEmpleados } from "../controllers/empleado";


const routeEmpleado = Router();

routeEmpleado.get("/empleados", checkJwt, getEmpleados);


export { routeEmpleado };
