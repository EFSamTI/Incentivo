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
exports.requestTali = exports.eliminarConfigRequests = exports.activarConfigRequest = exports.listConfigRequest = exports.desactivarConfigRequest = exports.updateConfigRequest = exports.createConfigRequest = exports.requestAriel = void 0;
const typeorm_1 = require("typeorm");
const config_request_1 = require("../model/config-request");
const ambiente_1 = require("./ambiente");
const tipo_1 = require("./tipo");
const requestAriel = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const peticion = yield obtenerParametros(body);
    if (!peticion)
        return null;
    return peticion;
});
exports.requestAriel = requestAriel;
const requestTali = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield config_request_1.ConfigRequest.findOne({
        where: { state: true, tipoRequest: { nombre_tipo: "Tali" } },
        relations: ["tipoRequest"],
    });
    if (!data)
        return null;
    return data;
});
exports.requestTali = requestTali;
const obtenerParametros = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield config_request_1.ConfigRequest.findOne({
        where: { state: true, tipoRequest: { nombre_tipo: "Ariel" } },
    });
    if (!data)
        return null;
    const requestAriel = {
        source: data.source,
        destination: data.destination,
        operation: data.operation,
        verb: data.verb,
        path: data.path,
        body: body,
    };
    return requestAriel;
});
const createConfigRequest = (config, creatorid) => __awaiter(void 0, void 0, void 0, function* () {
    const ambiente = yield (0, ambiente_1.findOrCreateAmbiente)(config.ambiente);
    const tipoRequest = yield (0, tipo_1.findOrCreateTipo)(config.tipo, config.url);
    config_request_1.ConfigRequest.create({
        source: config.source,
        destination: config.destination,
        operation: config.operation,
        verb: config.verb,
        path: config.path,
        state: false,
        ambiente: ambiente,
        tipoRequest: tipoRequest,
        registeredByUserId: creatorid,
    }).save();
    return { status: 200, message: "Configuracion creada con exito" };
});
exports.createConfigRequest = createConfigRequest;
const updateConfigRequest = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const ambiente = yield (0, ambiente_1.findOrCreateAmbiente)(config.ambiente);
    if (!ambiente)
        return { status: 404, message: "Ambiente no encontrado" };
    const tipoRequest = yield (0, tipo_1.findOrCreateTipo)(config.tipo, config.url);
    if (!tipoRequest)
        return { status: 404, message: "Tipo no encontrado" };
    const configRequest = yield config_request_1.ConfigRequest.findOne({
        where: { id: config.id },
    });
    if (!configRequest)
        return { status: 404, message: "Configuracion no encontrada" };
    if (config.id) {
        const activeConfigOfSameType = yield config_request_1.ConfigRequest.findOne({
            where: { tipoRequest: tipoRequest, state: true, id: (0, typeorm_1.Not)((0, typeorm_1.Equal)(config.id)) },
        });
        if (activeConfigOfSameType) {
            configRequest.state = false;
        }
    }
    tipoRequest.url = config.url;
    tipoRequest.updateAt = new Date();
    yield tipoRequest.save();
    configRequest.source = config.source;
    configRequest.destination = config.destination;
    configRequest.operation = config.operation;
    configRequest.verb = config.verb;
    configRequest.path = config.path;
    configRequest.ambiente = ambiente;
    configRequest.tipoRequest = tipoRequest;
    configRequest.updateAt = new Date();
    yield configRequest.save();
    return { status: 200, message: "Configuracion actualizada con exito" };
});
exports.updateConfigRequest = updateConfigRequest;
const desactivarConfigRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const configRequest = yield config_request_1.ConfigRequest.findOne({
        where: { id: id },
    });
    if (!configRequest)
        return { status: 404, message: "Configuracion no encontrada" };
    configRequest.state = false;
    configRequest.updateAt = new Date();
    yield configRequest.save();
    return { status: 200, message: "Configuracion eliminada con exito" };
});
exports.desactivarConfigRequest = desactivarConfigRequest;
const activarConfigRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const configRequestToActivate = yield config_request_1.ConfigRequest.findOne({ where: { id: id } });
    if (!configRequestToActivate)
        return { status: 404, message: "Configuración no encontrada" };
    yield config_request_1.ConfigRequest.update({ tipoid: configRequestToActivate.tipoid, id: (0, typeorm_1.Not)((0, typeorm_1.Equal)(id)) }, { state: false, updateAt: new Date() });
    configRequestToActivate.state = true;
    configRequestToActivate.updateAt = new Date();
    yield configRequestToActivate.save();
    return { status: 200, message: "Configuración activada con éxito" };
});
exports.activarConfigRequest = activarConfigRequest;
const listConfigRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const configRequest = yield config_request_1.ConfigRequest.find({
        relations: ["ambiente", "tipoRequest"],
    });
    if (!configRequest)
        return { status: 404, message: "Configuracion no encontrada" };
    return { status: 200, data: configRequest };
});
exports.listConfigRequest = listConfigRequest;
const eliminarConfigRequests = (id) => __awaiter(void 0, void 0, void 0, function* () {
    for (const i of id) {
        const configRequest = yield config_request_1.ConfigRequest.findOne({ where: { id: i } });
        if (configRequest) {
            yield configRequest.remove();
        }
    }
    return { status: 200, message: "Configuraciones eliminadas con éxito" };
});
exports.eliminarConfigRequests = eliminarConfigRequests;
