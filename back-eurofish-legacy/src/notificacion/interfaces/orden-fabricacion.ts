
export interface IOrdenFabricacionSave {
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
  

  
export interface ProductionOrderLine {
    DocumentAbsoluteEntry: number;
    LineNumber: number;
    ItemNo: string;
    BaseQuantity: number;
    PlannedQuantity: number;
    IssuedQuantity: number;
    ProductionOrderIssueType: string;
    Warehouse: string;
    VisualOrder: number;
    DistributionRule: null;
    LocationCode: null;
    Project: null;
    DistributionRule2: null;
    DistributionRule3: null;
    DistributionRule4: null;
    DistributionRule5: null;
    UoMEntry: number;
    UoMCode: number;
    WipAccount: string;
    ItemType: string;
    LineText: null;
    AdditionalQuantity: number;
    ResourceAllocation: null | string;
    StartDate: string;
    EndDate: string;
    StageID: null;
    RequiredDays: number;
    ItemName: string;
    WeightOfRecycledPlastic: number;
    PlasticPackageExemptionReason: null;
    SerialNumbers: any[];
    BatchNumbers: any[];
    isNotStockItem?: number;
  }
  