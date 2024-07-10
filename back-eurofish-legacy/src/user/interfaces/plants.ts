export interface IPlant{
    description: string;
    plantTag: string;
    sapCode: string;
    module: IModule;
}

export interface IModule{
    moduleId: number;
    moduleName: string;
    description: string;
}