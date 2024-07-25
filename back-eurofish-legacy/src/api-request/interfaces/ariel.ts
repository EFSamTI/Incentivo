
export interface IRequestAsistencia {
  items: Asistencia[];
  total: number;
  message: null;
}

interface Asistencia {
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
}


export interface IRequestMarcacion {
  items: Marca[];
  total: number;
  message: null;
}

interface Marca {
  codigo: string;
  hora: string;
  tipo_marcaje: string;
  num_empresa: number;
  nombre: string;
}