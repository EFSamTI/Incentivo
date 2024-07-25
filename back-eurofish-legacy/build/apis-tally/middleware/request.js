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
exports.fetchTallyApi = void 0;
const fetchTallyApi = (api, fechas) => __awaiter(void 0, void 0, void 0, function* () {
    const responses = [];
    if (api.parametros.length === 1) {
        for (const fecha of fechas) {
            const url = `${api.url_base}/${api.uuid}/?${api.parametros[0]}=${fecha}`;
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                responses.push(null);
            }
            else {
                const data = yield response.json();
                responses.push(data);
            }
        }
    }
    else if (api.parametros.length === 2) {
        const url = `${api.url_base}/${api.uuid}/?${api.parametros[0]}=${fechas[0]}&${api.parametros[1]}=${fechas[fechas.length - 1]}`;
        console.log(url);
        const response = yield fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            responses.push(null);
        }
        else {
            const data = yield response.json();
            if (Array.isArray(data)) {
                responses.push(...data);
            }
            else {
                responses.push(data);
            }
        }
    }
    else {
        return { status: 400, message: "No se encontraron apis tally en la base de datos" };
    }
    return { status: 200, data: responses.flat(Infinity) };
});
exports.fetchTallyApi = fetchTallyApi;
