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
exports.RoleOption = void 0;
const typeorm_1 = require("typeorm");
const role_1 = require("./role");
const option_1 = require("./option");
let RoleOption = class RoleOption extends typeorm_1.BaseEntity {
};
exports.RoleOption = RoleOption;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RoleOption.prototype, "roleOptionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_1.Role, role => role.roleOptions),
    (0, typeorm_1.JoinColumn)({ name: "roleId" }),
    __metadata("design:type", role_1.Role)
], RoleOption.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => option_1.Option, option => option.roleOptions),
    (0, typeorm_1.JoinColumn)({ name: "optionId" }),
    __metadata("design:type", option_1.Option)
], RoleOption.prototype, "option", void 0);
exports.RoleOption = RoleOption = __decorate([
    (0, typeorm_1.Entity)("role_options")
], RoleOption);
