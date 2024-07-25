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
exports.findOrdenFabricacionProduccion = void 0;
const orden_fabricacion_produccion_1 = require("../models/orden-fabricacion-produccion");
const findOrdenFabricacionProduccion = (turnid, fecha_produccion, ordenFabricacion) => __awaiter(void 0, void 0, void 0, function* () {
    const fecha = new Date(fecha_produccion);
    const ordenFabricacionProduccion = yield orden_fabricacion_produccion_1.OrdenFabricacionProduccion.findOne({
        where: { turno_id: turnid, fecha_produccion: fecha, ordenFabricacion: ordenFabricacion },
    });
    if (!ordenFabricacionProduccion) {
        const newOrdenFabricacionProduccion = orden_fabricacion_produccion_1.OrdenFabricacionProduccion.create({
            ordenFabricacion: ordenFabricacion,
            fecha_produccion: fecha,
            turno_id: turnid,
            createdAt: new Date(),
        });
        return yield newOrdenFabricacionProduccion.save();
    }
    else {
        return ordenFabricacionProduccion;
    }
});
exports.findOrdenFabricacionProduccion = findOrdenFabricacionProduccion;
