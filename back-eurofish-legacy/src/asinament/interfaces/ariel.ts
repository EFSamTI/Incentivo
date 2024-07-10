

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

export interface IItemAriel {
  cod_area: string;
  id_linea: number;
  cod_persona: string;
  nombre_persona: string;
  turno: string;
  linea: string;
  id_turno: number;
  fecha: string;
  area_persona: string;
  nombre_area: string;
  cargo: string;
  cod_area_persona: string;
  id_cargo: number;
  cedula: string;
  hora_entrada: string;
  asignado?: string;
}