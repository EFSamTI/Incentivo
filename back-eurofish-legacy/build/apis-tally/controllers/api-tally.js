"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postApisTallyCtrl = exports.getApisTallyCtrl = void 0;
const error_handle_1 = require("../../user/utils/error.handle");
const api_tally_service_1 = require("../services/api-tally-service");
const request_1 = require("../middleware/request");
const getApisTallyCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, api_tally_service_1.listApiTally)();
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getApisTallyCtrl = getApisTallyCtrl;
const postApisTallyCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { api, fechas } = req.body;
        const result = yield (0, request_1.fetchTallyApi)(api, fechas);
        res.status(result.status).send(result.message || result.data);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.postApisTallyCtrl = postApisTallyCtrl;
