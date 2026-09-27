import { ArrowRight, FileSignature, Wallet, KeyRound, Compass, Mountain, MessageCircle } from "lucide-react";
import { CommercialProposal, PINGUIM_SERVICES, BASE_PRICE, AD_BUDGET } from '@/lib/proposal-commercial';
const money = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const defaults: CommercialProposal = { restaurant_name: 'Seu restaurante', service_value: BASE_PRICE, ad_value: AD_BUDGET, contract_duration: 3, units: 1, services: PINGUIM_SERVICES.map(name => ({ id: name, name })) };
export function InvestmentSlide({ proposal }: { proposal?: CommercialProposal }) {
  const p = proposal ?? defaults;
  const services = p.services ?? [];
  const extras = services.filter(s => ['ifood', '99food'].includes(s.id) && typeof s.price === 'number' && typeof s.quantity === 'number');
  const extraTotal = extras.reduce((total, s) => total + s.price! * s.quantity!, 0);
  return <section className="relative isolate w-full max-w-6xl max-h-full overflow-y-auto py-3">
    <div aria-hidden="true" className="absolute -z-10 right-10 top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[90px]" />
    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Plano e investimento{!proposal ? ' • modelo' : ''}</p>
    <h2 className="text-3xl md:text-5xl font-black text-white">Uma estratégia para <span className="text-blue-400">{p.restaurant_name}.</span></h2>
    <div className="grid md:grid-cols-2 gap-6 mt-7">
      <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.10] to-white/[0.02] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_24px_80px_rgba(0,0,0,0.25)] p-7"><h3 className="text-xl font-bold text-white">Seu plano de trabalho</h3><div className="mt-5 space-y-3">{services.map(s => <p key={s.id} className="text-sm text-slate-200 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">✓ {s.name}</p>)}</div><p className="text-xs text-slate-400 mt-6">{p.units ?? 1} unidade(s) • Prazo mínimo de {p.contract_duration} meses</p></div>
      <div className="rounded-3xl border border-blue-300/30 bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-white/[0.03] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_24px_80px_rgba(0,71,255,0.15)] p-7 text-white"><p className="text-xs uppercase tracking-wider text-blue-300">Honorários mensais</p><p className="text-4xl md:text-5xl font-black tracking-tight mt-3">{money(p.service_value)}<span className="text-sm font-normal text-slate-400"> / mês</span></p>
      {extras.length > 0 && <div className="text-xs text-slate-300 mt-4 space-y-2"><p>Serviços base: {money(p.service_value - extraTotal)}</p>{extras.map(s => <p key={s.id}>{s.name}: {s.quantity} unidade(s) × {money(s.price!)} = {money(s.price! * s.quantity!)}</p>)}</div>}
      <div className="border-t border-white/10 mt-5 pt-4"><p className="text-sm">Verba mensal de anúncios: <strong>{money(p.ad_value)}</strong></p><p className="text-xs text-slate-400 mt-2">Separada dos honorários, paga pelo cliente às plataformas de anúncios.</p></div><p className="text-sm mt-5">Pagamento via Pix no início do período.</p></div>
    </div>
  </section>;
}
export function NextStepsSlide() {
  const steps = [
    { title: 'Assinatura do contrato', text: 'Formalizamos o escopo e as condições combinadas.', icon: FileSignature, color: '#64A7FF' },
    { title: 'Pagamento via Pix', text: 'Pagamento inicial para dar sequência à contratação.', icon: Wallet, color: '#64A7FF' },
    { title: 'Reunião de acessos', text: 'Reunimos os acessos e alinhamos as prioridades do restaurante.', icon: KeyRound, color: '#64A7FF' },
    { title: 'Bússola do Pinguim', text: 'Referências por tipo de conteúdo, seleção de conteúdos para anúncios e um bloco de legendas.', icon: Compass, color: '#B89AFF' },
    { title: 'O iceberg do seu restaurante', text: 'Análise geral dos dados para entender o cenário e identificar oportunidades e próximas ações.', icon: Mountain, color: '#38D3D9' },
    { title: 'Acompanhamento contínuo', text: 'WhatsApp e planilha atualizada mensalmente. Reunião mensal para analisar os dados, se o cliente desejar.', icon: MessageCircle, color: '#63D9A0' },
  ];
  return <section className="w-full max-w-6xl max-h-full overflow-y-auto py-3">
    <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">Sua jornada com a Pinguim</p>
    <h2 className="text-3xl md:text-5xl font-black text-white">Cada passo tem <span className="text-blue-400">uma direção.</span></h2>
    <p className="text-slate-400 text-sm mt-3">Da contratação às primeiras entregas. E daí em diante, seguimos juntos.</p>
    <ol className="grid md:grid-cols-3 gap-4 mt-6">
      {steps.map((step, i) => <li key={step.title} className={`relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 ${i === 3 ? "md:col-start-3 md:row-start-2" : i === 4 ? "md:col-start-2 md:row-start-2" : i === 5 ? "md:col-start-1 md:row-start-2" : ""}`}>
        <div className="flex items-center gap-3 mb-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold" style={{ color: step.color, borderColor: `${step.color}55`, backgroundColor: `${step.color}15` }}>{String(i + 1).padStart(2, '0')}</span><step.icon size={20} style={{ color: step.color }} aria-hidden="true" />{i < 5 && <ArrowRight size={18} className={`absolute z-10 text-blue-300 bg-[#0A0C14] rounded-full p-0.5 ${i === 2 ? "right-5 -bottom-3 rotate-90" : i > 2 ? "-left-3 top-9 rotate-180" : "-right-3 top-9"} hidden md:block`} aria-hidden="true" />}</div>
        <h3 className="text-white font-bold text-sm">{step.title}</h3><p className="text-xs leading-relaxed text-slate-400 mt-2">{step.text}</p>
      </li>)}
    </ol>

  </section>;
}
