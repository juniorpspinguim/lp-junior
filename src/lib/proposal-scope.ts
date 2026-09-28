import type { CommercialProposal } from './proposal-commercial';
export function isFullMethod(p: CommercialProposal) {
  if (p.plan_type) return p.plan_type !== 'personalizado';
  const names = (p.services ?? []).map(s => s.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase());
  return ['trafego', 'google', 'analise', 'cardapio'].every(term => names.some(name => name.includes(term)));
}
export function proposalExtras(p: CommercialProposal) {
  return (p.services ?? []).filter(s => ['ifood', '99food'].includes(s.id));
}
