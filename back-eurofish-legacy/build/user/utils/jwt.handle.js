"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenInfo = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = "token.01010101";
const generateToken = (id) => {
    const jwt = (0, jsonwebtoken_1.sign)({ id }, JWT_SECRET, {
        expiresIn: "48h",
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (jwt) => {
    const isOk = (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
    return isOk;
};
exports.verifyToken = verifyToken;
const tokenInfo = (jwt) => {
    const decoded = (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
    return decoded.id;
};
exports.tokenInfo = tokenInfo;
