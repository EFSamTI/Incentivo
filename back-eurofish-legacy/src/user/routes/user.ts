import { Router } from "express";
import multerMiddleware from '../middleware/file';
import { checkJwt } from "../middleware/session";
import { getUsersCtrl, getUserImageByIdCtrl, registerUserCtrl, updateUserCtrl, deleteUserCtrl, getUserInfoCtrl } from "../controllers/user";
import { readImage } from "../middleware/read";

const routerUser = Router();

routerUser.get("/usuarios", checkJwt, getUsersCtrl);
routerUser.get("/usuario/foto", checkJwt, getUserImageByIdCtrl);
routerUser.get("/usuario/info", checkJwt, getUserInfoCtrl);
routerUser.post("/usuario",checkJwt, multerMiddleware.single('file'), readImage, registerUserCtrl);
routerUser.put("/usuario/update", checkJwt, updateUserCtrl);
routerUser.post("/usuario/delete", checkJwt, deleteUserCtrl);

export { routerUser };
