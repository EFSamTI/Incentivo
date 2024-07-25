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
exports.OrdenFabricacionTipoIngreso = void 0;
const typeorm_1 = require("typeorm");
const orden_fabricacion_1 = require("./orden-fabricacion");
let OrdenFabricacionTipoIngreso = class OrdenFabricacionTipoIngreso extends typeorm_1.BaseEntity {
};
exports.OrdenFabricacionTipoIngreso = OrdenFabricacionTipoIngreso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrdenFabricacionTipoIngreso.prototype, "orden_fabricacion_tipo_ingresoid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], OrdenFabricacionTipoIngreso.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], OrdenFabricacionTipoIngreso.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], OrdenFabricacionTipoIngreso.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orden_fabricacion_1.OrdenFabricacion, OrdenFabricacion => OrdenFabricacion.tipo_ingreso),
    __metadata("design:type", Array)
], OrdenFabricacionTipoIngreso.prototype, "tipo_ingreso", void 0);
exports.OrdenFabricacionTipoIngreso = OrdenFabricacionTipoIngreso = __decorate([
    (0, typeorm_1.Entity)("orden_fabricacion_tipo_ingreso")
], OrdenFabricacionTipoIngreso);
