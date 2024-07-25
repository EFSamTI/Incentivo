"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeArea = void 0;
const express_1 = require("express");
const area_1 = require("../controllers/area");
const routeArea = (0, express_1.Router)();
exports.routeArea = routeArea;
routeArea.get("/areas", area_1.getAreasCtrl);
