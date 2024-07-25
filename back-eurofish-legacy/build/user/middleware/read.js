"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readImage = void 0;
const readImage = (req, res, next) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).send("No se subió ningún archivo o el archivo no se cargó correctamente");
    }
    next();
};
exports.readImage = readImage;
