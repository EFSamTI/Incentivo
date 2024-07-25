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
exports.listAllAreas = exports.findArea = exports.findOrCreateArea = void 0;
const area_1 = require("../models/area");
const findOrCreateArea = (area, cc) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = yield area_1.Area.findOne({
        where: { nombre_area: area },
    });
    if (!validate) {
        const newArea = area_1.Area.create({
            nombre_area: area,
            cod_area: cc,
            created_at: new Date(),
        });
        return yield newArea.save();
    }
    else {
        return validate;
    }
});
exports.findOrCreateArea = findOrCreateArea;
const findArea = (area) => __awaiter(void 0, void 0, void 0, function* () {
    return yield area_1.Area.findOne({
        where: { nombre_area: area },
    });
});
exports.findArea = findArea;
const listAllAreas = () => __awaiter(void 0, void 0, void 0, function* () {
    const areas = yield area_1.Area.find();
    if (!areas)
        return { status: 404, message: "No se encontraron areas" };
    return { status: 200, data: areas };
});
exports.listAllAreas = listAllAreas;
