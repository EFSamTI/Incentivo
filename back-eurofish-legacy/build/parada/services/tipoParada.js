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
exports.findOrCreateTipoParada = void 0;
const tipoparada_1 = require("../../parada/models/tipoparada");
const findOrCreateTipoParada = (tipoParada) => __awaiter(void 0, void 0, void 0, function* () {
    const validateTipoParada = yield tipoparada_1.TipoParada.findOne({
        where: { descripcion: tipoParada },
    });
    if (!validateTipoParada) {
        const newTipoParada = tipoparada_1.TipoParada.create({
            descripcion: tipoParada,
            created_at: new Date(),
        });
        return yield newTipoParada.save();
    }
    else {
        return validateTipoParada;
    }
});
exports.findOrCreateTipoParada = findOrCreateTipoParada;
