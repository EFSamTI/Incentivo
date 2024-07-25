"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoParada = void 0;
const typeorm_1 = require("typeorm");
const parada_1 = require("./parada");
let TipoParada = class TipoParada extends typeorm_1.BaseEntity {
};
exports.TipoParada = TipoParada;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TipoParada.prototype, "tipo_paradaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], TipoParada.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], TipoParada.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], TipoParada.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parada_1.Parada, Parada => Parada.tipoParada),
    __metadata("design:type", Array)
], TipoParada.prototype, "tipoParada", void 0);
exports.TipoParada = TipoParada = __decorate([
    (0, typeorm_1.Entity)("isentive_ttipo_parada")
], TipoParada);
