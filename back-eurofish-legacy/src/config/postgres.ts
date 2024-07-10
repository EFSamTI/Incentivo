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

import { Cargo } from "../asinament/models/cargo";
import { Empleado } from "../asinament/models/empleado";
import { Linea } from "../asinament/models/linea";
import { Asistencia } from "../asinament/models/asistencia";
import { Area } from "../asinament/models/area";
import { Turno } from "../asinament/models/turno";

import { TipoParada } from "../parada/models/tipoparada";
import { ConfigRequest } from "../api-request/model/config-request";
import { ConfigAmbiente } from "../api-request/model/ambiente";
import { ConfigTipo } from "../api-request/model/tipo";
import { Parada } from "../parada/models/parada";

dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USER,
    password: process.env.PASSWORD_BD,
    database: process.env.DATABASE,
    logging: true,
    entities: [ConfigRequest, ConfigAmbiente, ConfigTipo, User, Session, RoleOption, Role, UserRole, Option, Asignacion, TipoAsignacion, AsignacionTipoAsignacion, Movimiento, Cargo, Empleado, Linea, Asistencia, Area, Turno, Parada, TipoParada],
    synchronize: true
});