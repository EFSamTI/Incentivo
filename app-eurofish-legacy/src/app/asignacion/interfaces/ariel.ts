
export interface IRequestAriel {
  view: string;
  fields: string[];
  operators: any[];
  conditions: Condition[];
  order: Order[];
  limit?: number;
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

export const cargos: string[] = ['OPERARIO EMPACADOR DE FUNDAS','OPERADOR DE AUTOCLAVE','AUTOCLAVE (ESTERILIZADO)','FILETEADOR', 'DESPELLEJADOR', 'PANZA'];
export const tunos: string[] = ['TURNO 1', 'TURNO 2', 'TURNO 3'];
export const lineas: string[] = ['LINEA 1', 'LINEA 2', 'LINEA 3', 'LINEA 4', 'LINEA 5', 'LINEA 6', 'LINEA 7'];


export interface IResponseArielMarcacion {
  items: ItemMarcacion[];
  total: number;
  message: null;
}

interface ItemMarcacion {
  codigo: string;
  hora: string;
  tipo_marcaje: string;
  num_empresa: number;
  nombre: string;
}


export interface IResponseArieL {
  items: IItemAriel[];
  total: number;
  message: null;
}

export interface IItemAriel {
  cod_area: string;
  id_linea: null | number;
  cod_persona: string;
  cedula: string;
  turno: string;
  linea: null | string;
  actividad: null | string;
  horas: number;
  cod_jefatura: string;
  area_persona: string;
  cargo: string;
  cod_area_persona: string;
  id_cargo: number;
  proceso: null | string;
  hora_entrada: string;
  nombre_persona: string;
  tipo_gasto: string;
  num_empresa: number;
  cod_gerencia: string;
  id_turno: number;
  id_proceso: null | number;
  fecha: string;
  hora_salida: string;
  nombre_area: string;
  nombre_gerencia: string;
  id_actividad: null | number;
  nombre_jefatura: string;
  asignado?: string
  isComodin?: boolean;
  itemMarcacion?: ItemMarcacion;
}


