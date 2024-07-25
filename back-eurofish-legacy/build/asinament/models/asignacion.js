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
exports.Asignacion = void 0;
const typeorm_1 = require("typeorm");
const empleado_1 = require("./empleado");
const linea_1 = require("./linea");
const asignacionTipoAsginacion_1 = require("./asignacionTipoAsginacion");
const asistencia_1 = require("./asistencia");
const area_1 = require("./area");
const turno_1 = require("./turno");
const cargo_1 = require("./cargo");
let Asignacion = class Asignacion extends typeorm_1.BaseEntity {
};
exports.Asignacion = Asignacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Asignacion.prototype, "asignacionid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Asignacion.prototype, "lineaid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Asignacion.prototype, "empleadoid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Asignacion.prototype, "cargoid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Asignacion.prototype, "areaid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Asignacion.prototype, "turnoid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Asignacion.prototype, "registeredByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Asignacion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Asignacion.prototype, "fecha_ariel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Asignacion.prototype, "hora_asignacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Asignacion.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Asignacion.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asignacionTipoAsginacion_1.AsignacionTipoAsignacion, asignacionTipoAsignacion => asignacionTipoAsignacion.asignacion),
    __metadata("design:type", Array)
], Asignacion.prototype, "asignacionTipoAsignaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => linea_1.Linea, linea => linea.asignaciones),
    (0, typeorm_1.JoinColumn)({ name: "lineaid" }),
    __metadata("design:type", linea_1.Linea)
], Asignacion.prototype, "linea", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => area_1.Area, area => area.asignaciones),
    (0, typeorm_1.JoinColumn)({ name: "areaid" }),
    __metadata("design:type", area_1.Area)
], Asignacion.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cargo_1.Cargo, cargo => cargo.asignaciones),
    (0, typeorm_1.JoinColumn)({ name: "cargoid" }),
    __metadata("design:type", cargo_1.Cargo)
], Asignacion.prototype, "cargo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turno_1.Turno, turno => turno.asignaciones),
    (0, typeorm_1.JoinColumn)({ name: "turnoid" }),
    __metadata("design:type", turno_1.Turno)
], Asignacion.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_1.Empleado, empleado => empleado.asignaciones),
    (0, typeorm_1.JoinColumn)({ name: "empleadoid" }),
    __metadata("design:type", empleado_1.Empleado)
], Asignacion.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asistencia_1.Asistencia, asitencia => asitencia.asignacion),
    __metadata("design:type", Array)
], Asignacion.prototype, "asistencia", void 0);
exports.Asignacion = Asignacion = __decorate([
    (0, typeorm_1.Entity)("isentive_tasignaciones")
], Asignacion);
