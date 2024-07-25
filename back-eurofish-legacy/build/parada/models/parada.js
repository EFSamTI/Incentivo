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
exports.Parada = void 0;
const typeorm_1 = require("typeorm");
const tipoparada_1 = require("./tipoparada");
let Parada = class Parada extends typeorm_1.BaseEntity {
};
exports.Parada = Parada;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Parada.prototype, "paradaid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Parada.prototype, "asignacionid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Parada.prototype, "tipo_paradaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Parada.prototype, "hora_inicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Parada.prototype, "hora_fin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Parada.prototype, "registeredByUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipoparada_1.TipoParada, tipo => tipo.tipoParada),
    (0, typeorm_1.JoinColumn)({ name: "tipo_paradaid" }),
    __metadata("design:type", tipoparada_1.TipoParada)
], Parada.prototype, "tipoParada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Parada.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Parada.prototype, "update_at", void 0);
exports.Parada = Parada = __decorate([
    (0, typeorm_1.Entity)("isentive_tparada")
], Parada);
