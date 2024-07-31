import {ProductionOrderLine } from "./eufi";

export interface IOrdenFabricacion {
  numero_orden: string;
  nivel_orden: string;
  fecha_produccion: string;
  turno: string;
  codigo: string;
  descripcion: string;
  cantidad_planificada: number;
  cantidad_completada: number;
  cantidad_rechazada: number;
  unidad_medida: string;
    recursos: ProductionOrderLine[];
  }
  