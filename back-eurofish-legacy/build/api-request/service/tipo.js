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
exports.findOrCreateTipo = void 0;
const tipo_1 = require("../model/tipo");
const findOrCreateTipo = (tipo, url) => __awaiter(void 0, void 0, void 0, function* () {
    const tipoExistente = yield tipo_1.ConfigTipo.findOne({
        where: { nombre_tipo: tipo },
    });
    if (!tipoExistente) {
        const tipoNuevo = yield tipo_1.ConfigTipo.create({
            nombre_tipo: tipo,
            url: url
        }).save();
        return tipoNuevo;
    }
    return tipoExistente;
});
exports.findOrCreateTipo = findOrCreateTipo;
