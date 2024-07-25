"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const orden_fabricacion_tipo_ingreso_1 = require("./../notificacion/models/orden-fabricacion-tipo-ingreso");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../user/models/user");
const sesion_1 = require("../user/models/sesion");
const roleoption_1 = require("../user/models/roleoption");
const role_1 = require("../user/models/role");
const userole_1 = require("../user/models/userole");
const option_1 = require("../user/models/option");
const asignacion_1 = require("../asinament/models/asignacion");
const tipoAsignacion_1 = require("../asinament/models/tipoAsignacion");
const asignacionTipoAsginacion_1 = require("../asinament/models/asignacionTipoAsginacion");
const movimiento_1 = require("../rotacion/models/movimiento");
const cargo_1 = require("../asinament/models/cargo");
const empleado_1 = require("../asinament/models/empleado");
const linea_1 = require("../asinament/models/linea");
const asistencia_1 = require("../asinament/models/asistencia");
const area_1 = require("../asinament/models/area");
const turno_1 = require("../asinament/models/turno");
const tipoparada_1 = require("../parada/models/tipoparada");
const config_request_1 = require("../api-request/model/config-request");
const ambiente_1 = require("../api-request/model/ambiente");
const tipo_1 = require("../api-request/model/tipo");
const parada_1 = require("../parada/models/parada");
const orden_fabricacion_1 = require("../notificacion/models/orden-fabricacion");
const orden_fabricacion_recurso_1 = require("../notificacion/models/orden-fabricacion-recurso");
const orden_fabricacion_produccion_1 = require("../notificacion/models/orden-fabricacion-produccion");
const api_tally_1 = require("../apis-tally/models/api-tally");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USER,
    password: process.env.PASSWORD_BD,
    database: process.env.DATABASE,
    logging: true,
    entities: [api_tally_1.ApisTally, orden_fabricacion_1.OrdenFabricacion, orden_fabricacion_produccion_1.OrdenFabricacionProduccion, orden_fabricacion_recurso_1.OrdenFabricacionRecurso, orden_fabricacion_tipo_ingreso_1.OrdenFabricacionTipoIngreso, config_request_1.ConfigRequest, ambiente_1.ConfigAmbiente, tipo_1.ConfigTipo, user_1.User, sesion_1.Session, roleoption_1.RoleOption, role_1.Role, userole_1.UserRole, option_1.Option, asignacion_1.Asignacion, tipoAsignacion_1.TipoAsignacion, asignacionTipoAsginacion_1.AsignacionTipoAsignacion, movimiento_1.Movimiento, cargo_1.Cargo, empleado_1.Empleado, linea_1.Linea, asistencia_1.Asistencia, area_1.Area, turno_1.Turno, parada_1.Parada, tipoparada_1.TipoParada],
    synchronize: true
});
