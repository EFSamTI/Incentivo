import { OrdenFabricacionTipoIngreso } from './../notificacion/models/orden-fabricacion-tipo-ingreso';
import { DataSource } from "typeorm";

import dotenv from "dotenv";

import { User } from "../user/models/user";
import { Session } from '../user/models/sesion';
import { RoleOption } from '../user/models/roleoption';
import { Role } from "../user/models/role";
import { UserRole } from "../user/models/userole";
import { Option } from "../user/models/option";
import { Asignacion } from "../asinament/models/asignacion";
import { TipoAsignacion } from "../asinament/models/tipoAsignacion";
import { AsignacionTipoAsignacion } from "../asinament/models/asignacionTipoAsginacion";
import { Movimiento } from "../rotacion/models/movimiento";

import { Empleado } from "../asinament/models/empleado";
import { Linea } from "../asinament/models/linea";

import { Area } from "../asinament/models/area";
import { Turno } from "../asinament/models/turno";

import { TipoParada } from "../parada/models/tipoparada";
import { ConfigRequest } from "../api-request/model/config-request";
import { ConfigAmbiente } from "../api-request/model/ambiente";
import { ConfigTipo } from "../api-request/model/tipo";
import { Parada } from "../parada/models/parada";
import { OrdenFabricacion } from '../notificacion/models/orden-fabricacion';
import { OrdenFabricacionRecurso } from '../notificacion/models/orden-fabricacion-recurso';
import { OrdenFabricacionProduccion } from '../notificacion/models/orden-fabricacion-produccion';
import { ApisTally } from '../apis-tally/models/api-tally';
import { Marcaje } from '../asinament/models/marcaje';
import { Actividad } from '../asinament/models/actividad';

dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USER,
    password: process.env.PASSWORD_BD,
    database: process.env.DATABASE,
    logging: true,
    entities: [ApisTally,OrdenFabricacion, OrdenFabricacionProduccion, OrdenFabricacionRecurso, OrdenFabricacionTipoIngreso,ConfigRequest, ConfigAmbiente, ConfigTipo, User, Session, RoleOption, Role, UserRole, Option, Asignacion, TipoAsignacion, AsignacionTipoAsignacion, Movimiento, Actividad, Empleado, Linea, Marcaje, Area, Turno, Parada, TipoParada],
    synchronize: true
});