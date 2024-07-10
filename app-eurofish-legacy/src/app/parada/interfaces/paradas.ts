
export interface IRegisterParada {
    fecha: string;
    turno: string;
    linea: string;
    colaborador?: string; 
    tipo_parada: string;
    hora_inicio: string;
    hora_fin: string;
}

export interface IFilterParada {
  fecha?: string;
  linea?: string;
  turno?: string;
}


export interface IParada {
  paradaid: number;
  asignacionid: number;
  tipo_parada: string;
  hora_inicio: string;
  hora_fin: string;
  created_at: string;
  update_at: null;
  nombre_area: string;
  centro_costo: string;
  empleado: string;
  nombrelinea: string;
  nombre_turno: string;
}

export interface IParadaUpdate {
    paradaid: number;
    hora_inicio: string;
    hora_fin: string;
  }
  