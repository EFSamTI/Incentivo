export interface UsuarioLoginResponse {
  token: string;
  user: Usuario;
}

export interface Usuario {
  userId: number;
  username: string;
  name: string;
  password: string;
  state: boolean;
  registeredByUserId: null;
  foto?: Foto;
  createdAt: string;
  updatedAt: null;
}


interface Foto {
  type: string;
  data: number[];
}


export interface UserLogin {
    usuario: string;
    password: string;
}


