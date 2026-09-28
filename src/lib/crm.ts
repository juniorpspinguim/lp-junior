export const CRM_STAGES = [
  { id: 'novo', label: 'Novo contato', color: '#94a3b8' },
  { id: 'diagnostico', label: 'Diagnóstico', color: '#38bdf8' },
  { id: 'reuniao', label: 'Reunião', color: '#a78bfa' },
  { id: 'proposta', label: 'Proposta', color: '#60a5fa' },
  { id: 'negociacao', label: 'Negociação', color: '#fbbf24' },
  { id: 'ganho', label: 'Ganho', color: '#34d399' },
  { id: 'perdido', label: 'Perdido', color: '#fb7185' },
] as const;
export type CrmStage = typeof CRM_STAGES[number]['id'];
export type CrmContact = {
  id: string; restaurant_name: string; contact_name: string; phone: string; email: string;
  city: string; niche: string; source: string; stage: CrmStage; estimated_value: number;
  proposal_slug: string | null; created_at: string; updated_at: string;
};
export type CrmTask = { id: string; contact_id: string; title: string; due_date: string; completed_at: string | null; created_at: string };
export type CrmEvent = { id: string; contact_id: string; kind: string; body: string; created_at: string };
export type CrmProposal = { slug: string; restaurant_name: string; proposal_number?: number; proposal_year?: number; deleted_at?: string | null };
export const isCrmStage = (value: unknown): value is CrmStage => CRM_STAGES.some(s => s.id === value);
export const crmToday = () => new Intl.DateTimeFormat('en-CA', {timeZone: 'America/Bahia', year:'numeric', month:'2-digit', day:'2-digit'}).format(new Date());
export function taskTiming(task: Pick<CrmTask, 'due_date' | 'completed_at'>, today: string) {
  if (task.completed_at) return 'done';
  return task.due_date < today ? 'overdue' : task.due_date === today ? 'today' : 'future';
}
export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value && value >= '2000-01-01' && value <= '2100-12-31';
}
export function validateContact(input: Record<string, unknown>) {
  if (typeof input.restaurant_name !== 'string' || !input.restaurant_name.trim() || input.restaurant_name.length > 160) return 'Informe o nome do restaurante (até 160 caracteres).';
  if (!isCrmStage(input.stage)) return 'Selecione uma etapa válida.';
  if (typeof input.estimated_value !== 'number' || !Number.isFinite(input.estimated_value) || input.estimated_value < 0 || input.estimated_value > 99999999) return 'Informe um valor mensal válido.';
  for (const field of ['contact_name','phone','email','city','niche','source']) if (typeof input[field] !== 'string' || (input[field] as string).length > 200) return 'Revise os dados de contato (máximo de 200 caracteres por campo).';
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email as string)) return 'Informe um e-mail válido.';
  return null;
}
