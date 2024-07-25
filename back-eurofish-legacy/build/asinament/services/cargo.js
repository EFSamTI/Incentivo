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
exports.findOrCreateCargoNew = exports.findOrCreateCargo = void 0;
const cargo_1 = require("../models/cargo");
const findOrCreateCargo = (cargo, id) => __awaiter(void 0, void 0, void 0, function* () {
    const validatecargo = yield cargo_1.Cargo.findOne({
        where: { cargoname: cargo },
    });
    if (!validatecargo) {
        const newCargo = cargo_1.Cargo.create({
            cargoid: id,
            cargoname: cargo,
            created_at: new Date(),
        });
        return yield newCargo.save();
    }
    else {
        return validatecargo;
    }
});
exports.findOrCreateCargo = findOrCreateCargo;
const findOrCreateCargoNew = (cargo) => __awaiter(void 0, void 0, void 0, function* () {
    const validatecargo = yield cargo_1.Cargo.findOne({
        where: { cargoname: cargo },
    });
    if (!validatecargo) {
        const newCargo = cargo_1.Cargo.create({
            cargoname: cargo,
            created_at: new Date(),
        });
        return yield newCargo.save();
    }
    else {
        return validatecargo;
    }
});
exports.findOrCreateCargoNew = findOrCreateCargoNew;
