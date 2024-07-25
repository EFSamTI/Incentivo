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
exports.findOrCreateTipoAsignacion = void 0;
const tipoAsignacion_1 = require("../models/tipoAsignacion");
const findOrCreateTipoAsignacion = (tipoAsignacion) => __awaiter(void 0, void 0, void 0, function* () {
    const validateTipoAsignacion = yield tipoAsignacion_1.TipoAsignacion.findOne({
        where: { descripcion: tipoAsignacion },
    });
    if (!validateTipoAsignacion) {
        const newTipoAsignacion = tipoAsignacion_1.TipoAsignacion.create({
            descripcion: tipoAsignacion,
            created_at: new Date(),
        });
        return yield newTipoAsignacion.save();
    }
    else {
        return validateTipoAsignacion;
    }
});
exports.findOrCreateTipoAsignacion = findOrCreateTipoAsignacion;
