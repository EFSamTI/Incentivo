import { Router } from "express";
import { getRolesUserCtrl, registerRoleCtrl, updateRoleCtrl, deleteRoleCtrl, getRolesCtrl, getOptionsCtrl, createOptionCtrl } from "../controllers/role";
import { checkJwt } from "../middleware/session";

const routerRol = Router();

routerRol.get("/roles/user", checkJwt, getRolesUserCtrl);
routerRol.post("/role", checkJwt, registerRoleCtrl);
routerRol.put("/role/update", checkJwt, updateRoleCtrl);
routerRol.post("/role/delete", checkJwt, deleteRoleCtrl);
routerRol.get("/roles", checkJwt, getRolesCtrl);
routerRol.get("/options", checkJwt, getOptionsCtrl);
routerRol.post("/new/option", checkJwt, createOptionCtrl);

export { routerRol };
