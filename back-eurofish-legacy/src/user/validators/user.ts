

import { check } from "express-validator";

import { Request, Response, NextFunction } from 'express';
import { validateResult } from "../helpers/validate.helper";

const validateUsuario = [
    check('password')
        .exists().withMessage('La contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .not().contains(' ').withMessage('La contraseña no debe contener espacios')
        .matches(/\W/).withMessage('La contraseña debe contener al menos un signo'),
    check('username')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 8, max: 20 }).withMessage('El nombre debe tener entre 8 y 20 caracteres')
        .matches(/^[A-Za-z0-9]+$/).withMessage('El nombre no puede contener signos')
        .matches(/\d/).withMessage('El nombre debe contener al menos un número')
        .matches(/[A-Z]/).withMessage('El nombre debe contener al menos una letra mayúscula'),
    check('name')
        .exists().withMessage('Los apellidos son requeridos')
        .not().isEmpty().withMessage('Los apellidos no pueden estar vacíos'),
    (req: Request, res: Response, next: NextFunction) => {
       validateResult(req, res, next);
    }
];

export { validateUsuario };