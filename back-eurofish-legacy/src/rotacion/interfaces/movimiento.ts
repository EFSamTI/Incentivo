
export interface IBody {
  fields?: string[];
  order?: Order;
  limit?: number;
}

interface Order {
  field: string;
  order?: string;
  option?: string;
}

export interface IFilterAsignaciones {
  linea?: string;
  turno?: string;
}


export interface IFilterCambios {
  fecha?: string;
  linea?: string;
  turno?: string;
}




export interface IChanges {
  asignacionid: number;
  area: string;
  actividad: string;
}


export  interface IRestablecerCambios {
  idMovimiento: number;
  empleado: string; 
  ci: string;
  idOriginal: number;
  actividadOriginal: string;
  areaOriginal: string;
  idCambio: number;
  actividadCambio: string;
  areaCambio: string;
  hora: string;
}

