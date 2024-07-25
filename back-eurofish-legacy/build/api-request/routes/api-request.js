"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeApiRequest = void 0;
const express_1 = require("express");
const api_request_1 = require("../controller/api-request");
const session_1 = require("../../user/middleware/session");
const routeApiRequest = (0, express_1.Router)();
exports.routeApiRequest = routeApiRequest;
//Peticiones al middleware
routeApiRequest.post("/api-request/ariel", session_1.checkJwt, api_request_1.postAriel);
routeApiRequest.post("/api-request/tali", session_1.checkJwt, api_request_1.postTali);
routeApiRequest.get("/api-request", session_1.checkJwt, api_request_1.getConfigsRequestCtrl);
routeApiRequest.post("/api-request/crear", session_1.checkJwt, api_request_1.createConfigRequestCtrl);
routeApiRequest.put("/api-request", session_1.checkJwt, api_request_1.updateConfigRequestCtrl);
routeApiRequest.put("/api-request/desactivar", session_1.checkJwt, api_request_1.desactivarConfigRequestCtrl);
routeApiRequest.put("/api-request/activar", session_1.checkJwt, api_request_1.activarConfigRequestCtrl);
routeApiRequest.put("/api-request/eliminar", session_1.checkJwt, api_request_1.eliminarConfigRequestCtrl);
