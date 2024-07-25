"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUsuario = void 0;
const express_validator_1 = require("express-validator");
const validate_helper_1 = require("../helpers/validate.helper");
const validateUsuario = [
    (0, express_validator_1.check)('password')
        .exists().withMessage('La contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .not().contains(' ').withMessage('La contraseña no debe contener espacios')
        .matches(/\W/).withMessage('La contraseña debe contener al menos un signo'),
    (0, express_validator_1.check)('username')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 8, max: 20 }).withMessage('El nombre debe tener entre 8 y 20 caracteres')
        .matches(/^[A-Za-z0-9]+$/).withMessage('El nombre no puede contener signos')
        .matches(/\d/).withMessage('El nombre debe contener al menos un número')
        .matches(/[A-Z]/).withMessage('El nombre debe contener al menos una letra mayúscula'),
    (0, express_validator_1.check)('name')
        .exists().withMessage('Los apellidos son requeridos')
        .not().isEmpty().withMessage('Los apellidos no pueden estar vacíos'),
    (req, res, next) => {
        (0, validate_helper_1.validateResult)(req, res, next);
    }
];
exports.validateUsuario = validateUsuario;
