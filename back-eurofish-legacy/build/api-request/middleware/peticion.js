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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTaliMessage = exports.fetchArielMessage = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fetchArielMessage = (result) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${process.env.URL_ARIEL}/v1/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
    });
    if (!response.ok)
        return null;
    return response.json();
});
exports.fetchArielMessage = fetchArielMessage;
const fetchTaliMessage = (result, fechas) => __awaiter(void 0, void 0, void 0, function* () {
    const responses = [];
    for (const fecha of fechas) {
        const url = `${result.tipoRequest.url}/?created_from=${fecha}`;
        const response = yield fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            responses.push({ fecha, data: null });
        }
        else {
            const data = yield response.json();
            responses.push({ fecha, data });
        }
    }
    return responses;
});
exports.fetchTaliMessage = fetchTaliMessage;
