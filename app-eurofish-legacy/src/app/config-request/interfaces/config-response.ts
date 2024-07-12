export interface IConfiRequiest {
  id: number;
  source: string;
  ambienteid: number;
  tipoid: number;
  destination: string;
  operation: string;
  verb: string;
  path: string;
  state: boolean;
  registeredByUserId: number;
  createdAt: string;
  updateAt: null;
  ambiente: Ambiente;
  tipoRequest: TipoRequest;
}

interface TipoRequest {
  tipoid: number;
  nombre_tipo: string;
  createdAt: string;
  updateAt: null;
}

interface Ambiente {
  ambienteid: number;
  nombre_ambiente: string;
  uri: string;
  createdAt: string;
  updateAt: null;
}

export interface IRegisterRequest {
    id?: number;
    uri: string;
    tipo: string;
    source: string;
    destination: string;
    operation: string;
    verb: string;
    path: string;
    ambiente: string;
  }
  