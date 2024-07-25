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
exports.findOrCreateAmbiente = void 0;
const ambiente_1 = require("../model/ambiente");
const findOrCreateAmbiente = (ambiente) => __awaiter(void 0, void 0, void 0, function* () {
    const ambienteExistente = yield ambiente_1.ConfigAmbiente.findOne({
        where: { nombre_ambiente: ambiente },
    });
    if (!ambienteExistente) {
        const ambienteNuevo = yield ambiente_1.ConfigAmbiente.create({
            nombre_ambiente: ambiente
        }).save();
        return ambienteNuevo;
    }
    return ambienteExistente;
});
exports.findOrCreateAmbiente = findOrCreateAmbiente;
