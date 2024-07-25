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
exports.Turno = void 0;
const typeorm_1 = require("typeorm");
const asignacion_1 = require("./asignacion");
let Turno = class Turno extends typeorm_1.BaseEntity {
};
exports.Turno = Turno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Turno.prototype, "turnoid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Turno.prototype, "nombre_turno", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Turno.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Turno.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asignacion_1.Asignacion, asignacion => asignacion.turno),
    __metadata("design:type", Array)
], Turno.prototype, "asignaciones", void 0);
exports.Turno = Turno = __decorate([
    (0, typeorm_1.Entity)("isentive_tturnos")
], Turno);
