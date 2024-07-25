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
exports.OrdenFabricacionRecurso = void 0;
const typeorm_1 = require("typeorm");
const orden_fabricacion_1 = require("./orden-fabricacion");
let OrdenFabricacionRecurso = class OrdenFabricacionRecurso extends typeorm_1.BaseEntity {
};
exports.OrdenFabricacionRecurso = OrdenFabricacionRecurso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrdenFabricacionRecurso.prototype, "orden_fabricacion_recurso_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], OrdenFabricacionRecurso.prototype, "orden_fabricacion_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => orden_fabricacion_1.OrdenFabricacion, ordenFabricacion => ordenFabricacion.recursos),
    (0, typeorm_1.JoinColumn)({ name: "orden_fabricacion_id" }),
    __metadata("design:type", orden_fabricacion_1.OrdenFabricacion)
], OrdenFabricacionRecurso.prototype, "ordenFabricacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrdenFabricacionRecurso.prototype, "codigo_posicion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], OrdenFabricacionRecurso.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", nullable: true }),
    __metadata("design:type", Number)
], OrdenFabricacionRecurso.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrdenFabricacionRecurso.prototype, "um", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], OrdenFabricacionRecurso.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], OrdenFabricacionRecurso.prototype, "registeredByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], OrdenFabricacionRecurso.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], OrdenFabricacionRecurso.prototype, "updatedAt", void 0);
exports.OrdenFabricacionRecurso = OrdenFabricacionRecurso = __decorate([
    (0, typeorm_1.Entity)("orden_fabricacion_recurso")
], OrdenFabricacionRecurso);
