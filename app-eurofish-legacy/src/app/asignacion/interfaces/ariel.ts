
export interface IBody {
  view: string;
  fields: string[];
  operators: any[];
  conditions: Condition[];
  order: Order[];
  limit: number;
}

interface Order {
  field: string;
  order?: string;
  option?: string;
}

export interface Condition {
  field: string;
  operator: string;
  value: number | string;
}

export const cargos: string[] = ['OPERARIO EMPACADOR DE FUNDAS','FILETEADOR', 'DESPELLEJADOR', 'PANZA'];
export const tunos: string[] = ['TURNO 1', 'TURNO 2', 'TURNO 3'];
export const lineas: string[] = ['LINEA 1', 'LINEA 2', 'LINEA 3', 'LINEA 4', 'LINEA 5', 'LINEA 6', 'LINEA 7'];


export interface IResponseAriel {
  items: IItemAriel[];
  total: number;
  message: null;
}

export interface IItemAriel {
  cod_area: string;
  tipo: string;
  id_linea: number;
  cod_persona: string;
  proceso: null;
  nombre_persona: string;
  turno: string;
  num_empresa: number;
  linea: string;
  id_turno: number;
  actividad: null;
  horas: null;
  id_proceso: null;
  fecha: string;
  area_persona: string;
  nombre_area: string;
  cargo: string;
  id_actividad: null;
  cod_area_persona: string;
  id_cargo: number;
  cedula: string;
  hora_entrada: string;
  asignado?: string;
  isComodin?: boolean;
}


export const itemExampleAriel: IItemAriel[] = [
  {
    cod_area: "2013",
    tipo: "A",
    id_linea: 5,
    cod_persona: "10044",
    proceso: null,
    nombre_persona: "MERO LUCAS GABRIELA ALEXANDRA",
    turno: "TURNO 1",
    num_empresa: 1,
    linea: "LINEA 5",
    id_turno: 1,
    actividad: null,
    horas: null,
    id_proceso: null,
    fecha: "2021-05-16",
    area_persona: "PROCESO",
    nombre_area: "PROCESO",
    cargo: "OPERARIO EMPACADOR DE FUNDAS",
    id_actividad: null,
    cod_area_persona: "2013",
    id_cargo: 179,
    cedula: "1234567890",
    hora_entrada: "08:00",
  },
  {
    cod_area: "2013",
    tipo: "A",
    id_linea: 1,
    cod_persona: "10089",
    proceso: null,
    nombre_persona: "DELGADO MERO JESSICA MONSERRATE",
    turno: "TURNO 1",
    num_empresa: 1,
    linea: "LINEA 1",
    id_turno: 1,
    actividad: null,
    horas: null,
    id_proceso: null,
    fecha: "2021-05-16",
    area_persona: "PROCESO",
    nombre_area: "PROCESO",
    cargo: "OPERARIO EMPACADOR DE FUNDAS",
    id_actividad: null,
    cod_area_persona: "2013",
    id_cargo: 179,
    cedula: "1234567891",
    hora_entrada: "08:00",
  },
  {
    cod_area: "2013",
    tipo: "A",
    id_linea: 6,
    cod_persona: "10144",
    proceso: null,
    nombre_persona: "DELGADO BARCIA ALBA MARINA",
    turno: "TURNO 1",
    num_empresa: 1,
    linea: "LINEA 6",
    id_turno: 1,
    actividad: null,
    horas: null,
    id_proceso: null,
    fecha: "2021-05-16",
    area_persona: "PROCESO",
    nombre_area: "PROCESO",
    cargo: "OPERARIO EMPACADOR DE FUNDAS",
    id_actividad: null,
    cod_area_persona: "2013",
    id_cargo: 179,
    cedula: "1234567892",
    hora_entrada: "08:00",
  }
]
