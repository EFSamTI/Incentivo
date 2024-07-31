
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

// [
//   {
//     movimientoid: 8,
//     empleadoid: 1,
//     empleado_nombre: 'ZAMORA ZAMBRANO LILIANA VERONICA',
//     ci: '0803131069',
//     nombre_turno: 'TURNO 2',
//     nombrelinea: 'LINEA 6',
//     id_original: 4,
//     actividad_original: 'LIMPIEZA DE LOMOS',
//     area_original: 'PROCESO',
//     id_cambio: 13,
//     actividad_cambio: 'BANDA FLAKE',
//     area_cambio: 'PROCESO',
//     created_at: '2024-07-30T20:31:58.745Z'
//   }
// ]

export  interface IRestablecerCambios {
  movimientoid: number;
  empleadoid: number; 
  empleado_nombre: string;
  ci: string;
  nombre_turno: string;
  nombrelinea: string;
  id_original: number;
  actividad_original: string;
  area_original: string;
  id_cambio: number;
  actividad_cambio: string;
  area_cambio: string;
  created_at: string;
  
}

