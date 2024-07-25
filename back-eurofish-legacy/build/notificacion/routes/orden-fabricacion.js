"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeOrdenFabricacion = void 0;
const express_1 = require("express");
const session_1 = require("../../user/middleware/session");
const orden_fabricacion_1 = require("../controllers/orden-fabricacion");
const routeOrdenFabricacion = (0, express_1.Router)();
exports.routeOrdenFabricacion = routeOrdenFabricacion;
routeOrdenFabricacion.post("/orden-fabricacion", session_1.checkJwt, orden_fabricacion_1.postCrearOrdenFabricacion);
