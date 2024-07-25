"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeApisTally = void 0;
const api_tally_1 = require("../controllers/api-tally");
const express_1 = require("express");
const routeApisTally = (0, express_1.Router)();
exports.routeApisTally = routeApisTally;
routeApisTally.get('/apis/tally', api_tally_1.getApisTallyCtrl);
routeApisTally.post('/apis/tally', api_tally_1.postApisTallyCtrl);
