

export interface IAsignacion {
  asignacionid: number;
  created_at: string;
  update_at: null;
  tipo_asignacion: string;
  nombrelinea: string;
  nombre_turno: string;
  nombre_empleado: string;
  cedula: string;
  cargoname: string;
  nombre_area: string;
}

export interface Empleado {
  empleadoid: number;
  nombre: string;
  ci: string;
  created_at: string;
  update_at: null;
}



export interface IMovimiento {
  movimientoid: number;
  empleadoid: number;
  empleado_nombre: string;
  ci: string;
  nombre_turno: string;
  nombrelinea: string;
  id_original: number;
  cargo_original: string;
  area_original: string;
  id_cambio: number;
  cargo_cambio: string;
  area_cambio: string;
  created_at: string;
}
export interface IHistoryMovimiento {
  movimientoid: number;
  created_at: string;
  nombrelinea: string;
  nombre_turno: string;
  empleado_nombre: string;
  ci: string;
  cargo_original: string;
  area_original: string;
  cargo_cambio: string;
  area_cambio: string;
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