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
exports.listApiTally = void 0;
const api_tally_1 = require("../models/api-tally");
const listApiTally = () => __awaiter(void 0, void 0, void 0, function* () {
    const apiTally = yield api_tally_1.ApisTally.find();
    if (apiTally.length === 0) {
        return {
            status: 404,
            message: "No se encontraron apis tally en la base de datos",
        };
    }
    return { status: 200, data: apiTally };
});
exports.listApiTally = listApiTally;
