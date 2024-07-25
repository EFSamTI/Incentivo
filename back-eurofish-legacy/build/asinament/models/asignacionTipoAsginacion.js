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
exports.AsignacionTipoAsignacion = void 0;
const typeorm_1 = require("typeorm");
const asignacion_1 = require("./asignacion");
const tipoAsignacion_1 = require("./tipoAsignacion");
let AsignacionTipoAsignacion = class AsignacionTipoAsignacion extends typeorm_1.BaseEntity {
};
exports.AsignacionTipoAsignacion = AsignacionTipoAsignacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AsignacionTipoAsignacion.prototype, "asignacion_tipo_asignacion_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AsignacionTipoAsignacion.prototype, "tipoid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], AsignacionTipoAsignacion.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], AsignacionTipoAsignacion.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => asignacion_1.Asignacion, asignacion => asignacion.asignacionTipoAsignaciones),
    (0, typeorm_1.JoinColumn)({ name: "asignacionid" }),
    __metadata("design:type", asignacion_1.Asignacion)
], AsignacionTipoAsignacion.prototype, "asignacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipoAsignacion_1.TipoAsignacion, tipoAsignacion => tipoAsignacion.asignacionTipoAsignaciones),
    (0, typeorm_1.JoinColumn)({ name: "tipoid" }),
    __metadata("design:type", tipoAsignacion_1.TipoAsignacion)
], AsignacionTipoAsignacion.prototype, "tipoAsignacion", void 0);
exports.AsignacionTipoAsignacion = AsignacionTipoAsignacion = __decorate([
    (0, typeorm_1.Entity)("isentive_tasignacion_tipo_asignacion")
], AsignacionTipoAsignacion);
