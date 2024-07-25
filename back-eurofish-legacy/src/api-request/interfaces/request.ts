export interface IRegisterRequest {
  id?: number;
  tipo: string;
  url: string;
  source: string;
  destination: string;
  operation: string;
  verb: string;
  path: string;
  ambiente: string;
}

export interface IRequestAriel {
    source: string;
    destination: string;
    operation: string;
    verb: string;
    path: string;
    body?: IBodyRequest;
  }
  
export  interface IBodyRequest {
    view: string;
    fields: string[];
    operators: any[];
    conditions: Condition[];
    order?: Order[];
    limit?: number;
  }
  
  interface Order {
    field: string;
    order?: string;
    option?: string;
  }
  
  export interface Condition {
    field: string;
    operator: string;
    value: number | string;
  }
  