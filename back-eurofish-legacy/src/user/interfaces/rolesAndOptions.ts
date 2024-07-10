export interface IRole {
    name: string;
    description: string;
    registeredByUserId: number;
    options: string[];
}

export interface IOption {
    name: string;
    description: string;
    path: string;
  }