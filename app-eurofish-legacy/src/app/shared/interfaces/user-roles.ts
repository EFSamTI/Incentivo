
export interface IUserRole {
  roleId: number;
  roleName: string;
  description: string;
  registeredByUserId: number;
  createdAt: string;
  updatedAt: null;
  roleOptions: RoleOption[];
}

export interface RoleOption {
  roleOptionId: number;
  option: Option;
}

interface Option {
  optionId: number;
  optionName: string;
  description: string;
  path: string;
  createdAt: string;
  createdByUserId: number;
  updatedAt: null;
}


export interface IUserImage {
  name: string;
  foto: string;
}