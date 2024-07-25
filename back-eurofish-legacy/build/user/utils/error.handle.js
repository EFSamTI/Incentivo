"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpError = void 0;
const httpError = (res, error, errorRaw) => {
    console.log(errorRaw);
    res.status(500);
    res.send({ error });
};
exports.httpError = httpError;
