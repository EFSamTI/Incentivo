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
exports.createOrdenFabricacionRecurso = void 0;
const orden_fabricacion_recurso_1 = require("../models/orden-fabricacion-recurso");
const createOrdenFabricacionRecurso = (recursos, idCreator, ordenFabricacion) => __awaiter(void 0, void 0, void 0, function* () {
    const recursosSave = [];
    for (const recurso of recursos) {
        const ordenFabricacionRecurso = orden_fabricacion_recurso_1.OrdenFabricacionRecurso.create({
            codigo_posicion: recurso.codigo_posicion,
            ordenFabricacion: ordenFabricacion,
            descripcion: recurso.tipo,
            cantidad: recurso.cantidad,
            um: recurso.um,
            estado: true,
            registeredByUserId: idCreator,
        });
        const save = yield ordenFabricacionRecurso.save();
        recursosSave.push(save);
    }
    return recursosSave;
});
exports.createOrdenFabricacionRecurso = createOrdenFabricacionRecurso;
