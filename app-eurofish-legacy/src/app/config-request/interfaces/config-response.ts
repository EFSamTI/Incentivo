export interface IConfiRequiest {
  id: number;
  source: string;
  ambienteid: number;
  tipoid: number;
  destination: string;
  operation: string;
  verb: string;
  path: string;
  state: boolean;
  registeredByUserId: number;
  createdAt: string;
  updateAt: null;
  ambiente: Ambiente;
  tipoRequest: TipoRequest;
}

interface TipoRequest {
  tipoid: number;
  nombre_tipo: string;
  createdAt: string;
  updateAt: null;
}

interface Ambiente {
  ambienteid: number;
  nombre_ambiente: string;
  createdAt: string;
  updateAt: null;
}

export interface IRegisterRequest {
    id?: number;
    tipo: string;
    source: string;
    destination: string;
    operation: string;
    verb: string;
    path: string;
    ambiente: string;
  }
  
  
//   {
//     "items": [
//         {
//             "cod_area": "2013",
//             "tipo": "A",
//             "id_linea": 5,
//             "cod_persona": "10044",
//             "proceso": null,
//             "nombre_persona": "MERO LUCAS GABRIELA ALEXANDRA",
//             "turno": "TURNO 1",
//             "num_empresa": 1,
//             "linea": "LINEA 5",
//             "id_turno": 1,
//             "actividad": null,
//             "horas": null,
//             "id_proceso": null,
//             "fecha": "2021-05-16",
//             "area_persona": "PROCESO",
//             "nombre_area": "PROCESO",
//             "cargo": "OPERARIO EMPACADOR DE FUNDAS",
//             "id_actividad": null,
//             "cod_area_persona": "2013",
//             "id_cargo": 179
//         },
//         {
//             "cod_area": "2013",
//             "tipo": "A",
//             "id_linea": 1,
//             "cod_persona": "10089",
//             "proceso": null,
//             "nombre_persona": "DELGADO MERO JESSICA MONSERRATE",
//             "turno": "TURNO 1",
//             "num_empresa": 1,
//             "linea": "LINEA 1",
//             "id_turno": 1,
//             "actividad": null,
//             "horas": null,
//             "id_proceso": null,
//             "fecha": "2021-05-16",
//             "area_persona": "PROCESO",
//             "nombre_area": "PROCESO",
//             "cargo": "OPERARIO EMPACADOR DE FUNDAS",
//             "id_actividad": null,
//             "cod_area_persona": "2013",
//             "id_cargo": 179
//         },
//         {
//             "cod_area": "2013",
//             "tipo": "A",
//             "id_linea": 6,
//             "cod_persona": "10144",
//             "proceso": null,
//             "nombre_persona": "DELGADO BARCIA ALBA MARINA",
//             "turno": "TURNO 1",
//             "num_empresa": 1,
//             "linea": "LINEA 6",
//             "id_turno": 1,
//             "actividad": null,
//             "horas": null,
//             "id_proceso": null,
//             "fecha": "2021-05-16",
//             "area_persona": "PROCESO",
//             "nombre_area": "PROCESO",
//             "cargo": "OPERARIO EMPACADOR DE FUNDAS",
//             "id_actividad": null,
//             "cod_area_persona": "2013",
//             "id_cargo": 179
//         }
//     ],
//     "total": 33,
//     "message": null
// }