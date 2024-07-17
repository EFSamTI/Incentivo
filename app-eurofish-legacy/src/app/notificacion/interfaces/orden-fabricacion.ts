

export interface IOrdenFabricacionRecursos {
    codigo_posicion: string;
    tipo: string;
    cantidad?: number;
    um?: string;
}

export interface IOrdenFabricacion {
    numero_orden: string;
    nivel_orden: string;
    tipo_ingreso: string;
    fecha_produccion: string;
    turno: string;
    recursos: IOrdenFabricacionRecursos[];
  }
  