import { TipoParada } from "../models/tipoparada";

  

export interface IParada {
    asignacionid: number;
    tipo_parada: TipoParada;
    hora_inicio: string;
    hora_fin: string;
    created_at: Date;
    update_at: Date;
}


export interface IParadaFilter {
    fecha: string;
    turno: string;
    linea: string;
    colaborador?: string; 
    tipo_parada: string;
    hora_inicio: string;
    hora_fin: string;
}


export interface IParadaUpdate {
    paradaid: number;
    hora_inicio: string;
    hora_fin: string;
  }
  