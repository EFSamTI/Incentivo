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
exports.ConfigRequest = void 0;
const typeorm_1 = require("typeorm");
const ambiente_1 = require("./ambiente");
const tipo_1 = require("./tipo");
let ConfigRequest = class ConfigRequest extends typeorm_1.BaseEntity {
};
exports.ConfigRequest = ConfigRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConfigRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfigRequest.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfigRequest.prototype, "ambienteid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfigRequest.prototype, "tipoid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfigRequest.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfigRequest.prototype, "operation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfigRequest.prototype, "verb", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConfigRequest.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], ConfigRequest.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ConfigRequest.prototype, "registeredByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
    }),
    __metadata("design:type", Date)
], ConfigRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], ConfigRequest.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ambiente_1.ConfigAmbiente, configAmbiente => configAmbiente.configRequest),
    (0, typeorm_1.JoinColumn)({ name: "ambienteid" }),
    __metadata("design:type", ambiente_1.ConfigAmbiente)
], ConfigRequest.prototype, "ambiente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_1.ConfigTipo, configTipo => configTipo.configRequest),
    (0, typeorm_1.JoinColumn)({ name: "tipoid" }),
    __metadata("design:type", tipo_1.ConfigTipo)
], ConfigRequest.prototype, "tipoRequest", void 0);
exports.ConfigRequest = ConfigRequest = __decorate([
    (0, typeorm_1.Entity)("config_request")
], ConfigRequest);
