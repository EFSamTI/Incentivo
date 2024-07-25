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
exports.findOrdenFabricacionTipoIngreso = void 0;
const orden_fabricacion_tipo_ingreso_1 = require("../models/orden-fabricacion-tipo-ingreso");
const findOrdenFabricacionTipoIngreso = (tipo) => __awaiter(void 0, void 0, void 0, function* () {
    const ordenFabricacionTipoIngreso = yield orden_fabricacion_tipo_ingreso_1.OrdenFabricacionTipoIngreso.findOne({
        where: { descripcion: tipo },
    });
    if (!ordenFabricacionTipoIngreso) {
        const newOrdenFabricacionTipoIngreso = orden_fabricacion_tipo_ingreso_1.OrdenFabricacionTipoIngreso.create({
            descripcion: tipo,
            createdAt: new Date(),
        });
        return yield newOrdenFabricacionTipoIngreso.save();
    }
    else {
        return ordenFabricacionTipoIngreso;
    }
});
exports.findOrdenFabricacionTipoIngreso = findOrdenFabricacionTipoIngreso;
