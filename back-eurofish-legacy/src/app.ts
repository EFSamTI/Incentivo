import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routerRol } from './user/routes/role';
import { routerUser } from './user/routes/user';
import { routeAuth } from './user/routes/auth';
import { routerAsignacion } from './asinament/routes/asignacion';
import { routeMovimiento } from './rotacion/routes/movimiento';
import { routeEmpleado } from './asinament/routes/empleado';
import { routeParada } from './rotacion/routes/parada';
import { routeLinea } from './asinament/routes/linea';
import { routeApiRequest } from './api-request/routes/api-request';
import { routeArea } from './asinament/routes/area';
import { routeDashboard } from './dashboard/routes/dashboard';

const app = express();
const apiAuthUrl = '/auth';
const apiUrl = '/api/v1';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(apiAuthUrl,routeAuth);
app.use(apiUrl,routerUser);
app.use(apiUrl,routerRol);
app.use(apiUrl, routerAsignacion);
app.use(apiUrl, routeMovimiento);
app.use(apiUrl, routeEmpleado)
app.use(apiUrl, routeParada);
app.use(apiUrl, routeLinea);
app.use(apiUrl, routeApiRequest);
app.use(apiUrl, routeArea);
app.use(apiUrl, routeDashboard);


export default app;