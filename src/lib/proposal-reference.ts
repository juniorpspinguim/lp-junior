export function proposalReference(p: { proposal_number?: number | null; proposal_year?: number | null }) {
  return p.proposal_number && p.proposal_year ? `${String(p.proposal_number).padStart(3, '0')}/${p.proposal_year}` : 'A atribuir';
}
