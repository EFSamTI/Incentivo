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
exports.ConfigAmbiente = void 0;
const typeorm_1 = require("typeorm");
const config_request_1 = require("./config-request");
let ConfigAmbiente = class ConfigAmbiente extends typeorm_1.BaseEntity {
};
exports.ConfigAmbiente = ConfigAmbiente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConfigAmbiente.prototype, "ambienteid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfigAmbiente.prototype, "nombre_ambiente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false }),
    __metadata("design:type", Date)
], ConfigAmbiente.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], ConfigAmbiente.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => config_request_1.ConfigRequest, configRequest => configRequest.ambiente),
    __metadata("design:type", config_request_1.ConfigRequest)
], ConfigAmbiente.prototype, "configRequest", void 0);
exports.ConfigAmbiente = ConfigAmbiente = __decorate([
    (0, typeorm_1.Entity)("config_ambiente")
], ConfigAmbiente);
