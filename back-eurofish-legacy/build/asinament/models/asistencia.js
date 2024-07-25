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
exports.Asistencia = void 0;
const typeorm_1 = require("typeorm");
const asignacion_1 = require("./asignacion");
let Asistencia = class Asistencia extends typeorm_1.BaseEntity {
};
exports.Asistencia = Asistencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Asistencia.prototype, "movimientoid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Asistencia.prototype, "asignacionid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time" }),
    __metadata("design:type", String)
], Asistencia.prototype, "hora_entrada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time", nullable: true }),
    __metadata("design:type", String)
], Asistencia.prototype, "hora_salida", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "interval", nullable: true }),
    __metadata("design:type", Object)
], Asistencia.prototype, "tiempo_trabajo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Asistencia.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Asistencia.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => asignacion_1.Asignacion, asignacion => asignacion.asistencia),
    (0, typeorm_1.JoinColumn)({ name: "asignacionid" }),
    __metadata("design:type", asignacion_1.Asignacion)
], Asistencia.prototype, "asignacion", void 0);
exports.Asistencia = Asistencia = __decorate([
    (0, typeorm_1.Entity)("isentive_tasistencia")
], Asistencia);
