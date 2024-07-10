

export interface Role {
  name: string;
  description: string;
  options: string[];
}

export interface IResponseRole {
  roleName: string;
  description: string;
  registeredByUserId: number;
  createdAt: string;
  updatedAt: null;
  roleId: number;
}

export interface IRoleAndOptions {
  roleId: number;
  roleName: string;
  description: string;
  registeredByUserId: number;
  createdAt: string;
  updatedAt: null;
  roleOptions: RoleOption[];
}

interface RoleOption {
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