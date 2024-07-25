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
exports.ConfigTipo = void 0;
const typeorm_1 = require("typeorm");
const config_request_1 = require("./config-request");
let ConfigTipo = class ConfigTipo extends typeorm_1.BaseEntity {
};
exports.ConfigTipo = ConfigTipo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConfigTipo.prototype, "tipoid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfigTipo.prototype, "nombre_tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfigTipo.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false }),
    __metadata("design:type", Date)
], ConfigTipo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], ConfigTipo.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => config_request_1.ConfigRequest, configRequest => configRequest.tipoRequest),
    __metadata("design:type", config_request_1.ConfigRequest)
], ConfigTipo.prototype, "configRequest", void 0);
exports.ConfigTipo = ConfigTipo = __decorate([
    (0, typeorm_1.Entity)("config_Tipo")
], ConfigTipo);
