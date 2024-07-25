

export interface IChanges {
    asignacionid: number;
    area: string;
    cargo: string;
 }

 
export  interface IRestablecerCambios {
    idMovimiento: number;
    empleado: string; 
    ci: string;
    idOriginal: number;
    cargoOriginal: string;
    areaOriginal: string;
    idCambio: number;
    cargoCambio: string;
    areaCambio: string;
    hora: string;
  }
  
  
export interface IResponseAriel {
  items: IItemAriel[];
  total: number;
  message: null;
}



export interface IItemAriel{
  cod_area: string;
  id_linea: number;
  cod_persona: string;
  cedula: string;
  turno: string;
  linea: string;
  actividad: null;
  horas: number;
  cod_jefatura: string;
  area_persona: string;
  cargo: string;
  cod_area_persona: string;
  id_cargo: number;
  proceso: null;
  hora_entrada: string;
  nombre_persona: string;
  tipo_gasto: string;
  num_empresa: number;
  cod_gerencia: string;
  id_turno: number;
  id_proceso: null;
  fecha: string;
  hora_salida: string;
  nombre_area: string;
  nombre_gerencia: string;
  id_actividad: null;
  nombre_jefatura: string;
  asignado?:string
  isComodin?:boolean
}