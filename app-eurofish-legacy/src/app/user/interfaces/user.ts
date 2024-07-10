
export interface User {
  username: string;
  name: string;
  password: string;
  roles: string[];

}

export interface IUsers {
  userId: number;
  username: string;
  name: string;
  state: boolean;
  createAt: string;
  updatedAt: null | string;
  roles: string[];
  registeredBy: null | string;
}



export interface IUserSinFoto {
  userId: number;
  username: string;
  name: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  roles: Role2[];
}

interface Role2 {
  userRoleId: number;
  role: Role;
}

interface Role {
  roleId: number;
  roleName: string;
  description: string;
  registeredByUserId: number;
  createdAt: string;
  updatedAt: string;
}