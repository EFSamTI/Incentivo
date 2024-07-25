"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeEmpleado = void 0;
const express_1 = require("express");
const session_1 = require("../../user/middleware/session");
const empleado_1 = require("../controllers/empleado");
const routeEmpleado = (0, express_1.Router)();
exports.routeEmpleado = routeEmpleado;
routeEmpleado.get("/empleados", session_1.checkJwt, empleado_1.getEmpleados);
