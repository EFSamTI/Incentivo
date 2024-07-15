export interface IResponseTali {
  shift: number;
  line: number;
  prod_date: string;
  vessel_lot: string;
  vessel_name: string;
  final_species: string;
  final_species_size: string;
  species_code: number;
  final_control_no: string;
  final_control_sprayed: number;
  mp_calculada: number;
  mp_calculada_perc: number;
  final_trolley_count: number;
  net_weight_crudo: number;
  loin_kg: number;
  flake_kg: number;
  other_loin_kg: number;
  other_flake_kg: number;
  total_loin: number;
  total_flake: number;
  relac: number;
  weight_kg_rociado: number;
  weight_kg_cocido: number;
  cleaning_type: string;
  piezas: number;
  factor: number;
  exponente: number;
  peso_prom: number;
  loin_pct: number;
  flake_pct: number;
  rend_curva: number;
  curva_pct: null | number;
  merma_perc: number;
  total_reject: number;
  bleach_weight: number;
  distributed_value: number;
  std_loin: number;
  rend_kg_field: number;
  yield_expected_lomo: number;
  yield_expected_flake: number;
  lomo_esperado_kg: number;
  flake_esperado_kg: number;
}



export interface IRequestTali {
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
  updateAt: string;
  tipoRequest: TipoRequest;
}

interface TipoRequest {
  tipoid: number;
  nombre_tipo: string;
  url: string;
  createdAt: string;
  updateAt: string;
}