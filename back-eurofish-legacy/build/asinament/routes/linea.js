"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeLinea = void 0;
const express_1 = require("express");
const linea_1 = require("../controllers/linea");
const session_1 = require("../../user/middleware/session");
const routeLinea = (0, express_1.Router)();
exports.routeLinea = routeLinea;
routeLinea.get("/lineas", session_1.checkJwt, linea_1.getLineasCtrl);
