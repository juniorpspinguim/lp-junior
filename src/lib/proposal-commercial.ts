export const BASE_PRICE = 2000;
export const MARKETPLACE_PRICE = 1000;
export const AD_BUDGET = 1500;
export const PINGUIM_SERVICES = ['Tráfego Pago', 'Otimização de Google Meu Negócio', 'Análise de Desempenho', 'Engenharia de Cardápio'];
export type ProposalService = { id: string; name: string; price?: number; quantity?: number };
export type CommercialProposal = { restaurant_name: string; logo_url?: string | null; service_value: number; ad_value: number; contract_duration: number; units?: number; services?: ProposalService[] };
export function marketplaceTotal(platforms: number, units: number, price = MARKETPLACE_PRICE) {
  return platforms * units * price;
}
