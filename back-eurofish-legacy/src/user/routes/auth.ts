import { Router } from "express";
import { loginCtrl, logoutCtrl, registerCtrl } from "../controllers/auth";
import { validateUsuario } from "../validators/user";
import { readImage } from "../middleware/read";



const routeAuth = Router();
routeAuth.post("/login", loginCtrl);
routeAuth.post("/logout/:id", logoutCtrl);
routeAuth.post("/register", validateUsuario, registerCtrl);
export { routeAuth };