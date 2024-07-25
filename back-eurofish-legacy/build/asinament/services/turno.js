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
exports.findOrCreateTurno = void 0;
const turno_1 = require("../models/turno");
const findOrCreateTurno = (turno) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = yield turno_1.Turno.findOne({
        where: { nombre_turno: turno },
    });
    if (!validate) {
        const newTurno = turno_1.Turno.create({
            nombre_turno: turno,
            created_at: new Date(),
        });
        return yield newTurno.save();
    }
    else {
        return validate;
    }
});
exports.findOrCreateTurno = findOrCreateTurno;
