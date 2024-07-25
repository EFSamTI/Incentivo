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
exports.listAllLineas = exports.findOrCreateLinea = void 0;
const linea_1 = require("../models/linea");
const findOrCreateLinea = (linea, id) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = yield linea_1.Linea.findOne({
        where: { nombrelinea: linea },
    });
    if (!validate) {
        const newLinea = linea_1.Linea.create({
            lineaid: id,
            nombrelinea: linea,
            created_at: new Date(),
        });
        return yield newLinea.save();
    }
    else {
        return validate;
    }
});
exports.findOrCreateLinea = findOrCreateLinea;
const listAllLineas = () => __awaiter(void 0, void 0, void 0, function* () {
    const lineas = yield linea_1.Linea.find();
    if (!lineas)
        return { status: 404, message: "No se encontraron lineas" };
    return { status: 200, data: lineas };
});
exports.listAllLineas = listAllLineas;
