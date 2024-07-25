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
exports.OrdenFabricacion = void 0;
const typeorm_1 = require("typeorm");
const orden_fabricacion_recurso_1 = require("./orden-fabricacion-recurso");
const orden_fabricacion_tipo_ingreso_1 = require("./orden-fabricacion-tipo-ingreso");
let OrdenFabricacion = class OrdenFabricacion extends typeorm_1.BaseEntity {
};
exports.OrdenFabricacion = OrdenFabricacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrdenFabricacion.prototype, "orden_fabricacion_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], OrdenFabricacion.prototype, "numero_orden", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrdenFabricacion.prototype, "nivel_orden", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], OrdenFabricacion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrdenFabricacion.prototype, "tipo_ingreso_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], OrdenFabricacion.prototype, "id_ordenpadre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], OrdenFabricacion.prototype, "registeredByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], OrdenFabricacion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], OrdenFabricacion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orden_fabricacion_recurso_1.OrdenFabricacionRecurso, ordenFabricacionRecurso => ordenFabricacionRecurso.ordenFabricacion),
    __metadata("design:type", Array)
], OrdenFabricacion.prototype, "recursos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => orden_fabricacion_tipo_ingreso_1.OrdenFabricacionTipoIngreso, tipo_ingreso => tipo_ingreso.tipo_ingreso),
    (0, typeorm_1.JoinColumn)({ name: "tipo_ingreso_id" }),
    __metadata("design:type", orden_fabricacion_tipo_ingreso_1.OrdenFabricacionTipoIngreso)
], OrdenFabricacion.prototype, "tipo_ingreso", void 0);
exports.OrdenFabricacion = OrdenFabricacion = __decorate([
    (0, typeorm_1.Entity)("orden_fabricacion")
], OrdenFabricacion);
