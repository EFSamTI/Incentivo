
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