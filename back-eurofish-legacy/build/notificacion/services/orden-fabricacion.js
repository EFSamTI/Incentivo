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
exports.createOrdenFabricacion = void 0;
const turno_1 = require("../../asinament/services/turno");
const orden_fabricacion_1 = require("../models/orden-fabricacion");
const orden_fabricacion_produccion_1 = require("./orden-fabricacion-produccion");
const orden_fabricacion_recurso_1 = require("./orden-fabricacion-recurso");
const orden_fabricacion_tipo_ingreso_1 = require("./orden-fabricacion-tipo-ingreso");
const createOrdenFabricacion = (data, idRegister) => __awaiter(void 0, void 0, void 0, function* () {
    const tipo = yield (0, orden_fabricacion_tipo_ingreso_1.findOrdenFabricacionTipoIngreso)(data.tipo_ingreso);
    if (!tipo)
        return { status: 400, message: "Error al crear el tipo de ingreso" };
    const ordenFabricacion = orden_fabricacion_1.OrdenFabricacion.create({
        numero_orden: data.numero_orden,
        nivel_orden: data.nivel_orden,
        tipo_ingreso: tipo,
        registeredByUserId: idRegister,
        createdAt: new Date(),
    });
    const saveOrdenFabricacion = yield ordenFabricacion.save();
    const turno = yield (0, turno_1.findOrCreateTurno)(data.turno);
    (0, orden_fabricacion_produccion_1.findOrdenFabricacionProduccion)(turno.turnoid, data.fecha_produccion, saveOrdenFabricacion);
    const recursos = yield (0, orden_fabricacion_recurso_1.createOrdenFabricacionRecurso)(data.recursos, idRegister, saveOrdenFabricacion);
    return {
        status: 200,
        data: { ordenFabricacion: saveOrdenFabricacion, recursos },
    };
});
exports.createOrdenFabricacion = createOrdenFabricacion;
