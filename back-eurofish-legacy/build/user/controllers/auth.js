"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCtrl = exports.logoutCtrl = exports.loginCtrl = void 0;
const error_handle_1 = require("../utils/error.handle");
const authService_1 = require("../services/authService");
const loginCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, password } = req.body;
        const result = yield (0, authService_1.loginUser)(usuario, password);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.loginCtrl = loginCtrl;
const registerCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, authService_1.registerUser)(req.body);
        res.status(result.status).send(result.data || result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.registerCtrl = registerCtrl;
const logoutCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, authService_1.logoutUser)(Number(id));
        res.status(result.status).send(result.message);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handle_1.httpError)(res, error.message);
        }
    }
});
exports.logoutCtrl = logoutCtrl;
