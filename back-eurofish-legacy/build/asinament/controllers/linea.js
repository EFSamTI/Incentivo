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
exports.getLineasCtrl = void 0;
const error_handle_1 = require("../../user/utils/error.handle");
const linea_1 = require("../services/linea");
const getLineasCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, linea_1.listAllLineas)();
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.getLineasCtrl = getLineasCtrl;
