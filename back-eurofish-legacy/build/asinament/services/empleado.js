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
exports.listEmpleados = exports.findOrCreateEmpleado = void 0;
const empleado_1 = require("../models/empleado");
const listEmpleados = () => __awaiter(void 0, void 0, void 0, function* () {
    const empleados = yield empleado_1.Empleado.find();
    if (empleados.length === 0)
        return { status: 404, message: "No se encontraron empleados" };
    return { status: 200, data: empleados };
});
exports.listEmpleados = listEmpleados;
const findOrCreateEmpleado = (nombre, ci, cod_persona) => __awaiter(void 0, void 0, void 0, function* () {
    const empleadoExistente = yield empleado_1.Empleado.findOne({
        where: { nombre: nombre },
    });
    if (!empleadoExistente) {
        const empleadoNuevo = yield empleado_1.Empleado.create({
            nombre: nombre,
            cod_persona: cod_persona,
            ci: ci,
            created_at: new Date(),
        }).save();
        return empleadoNuevo;
    }
    return empleadoExistente;
});
exports.findOrCreateEmpleado = findOrCreateEmpleado;
