import WhitePinguimLogo from '@/components/WhitePinguimLogo';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';

import { CommercialProposal, PINGUIM_SERVICES } from '@/lib/proposal-commercial';
import { isFullMethod, proposalExtras } from '@/lib/proposal-scope';
import { proposalReference } from '@/lib/proposal-reference';
const pillars = [
  ['Comunicação', 'Clareza para comprar', 'Bússola do Pinguim: referências de conteúdo, seleção para anúncios e legendas.'],
  ['Posicionamento', 'Confiança para escolher', 'Otimização do Google Meu Negócio e orientação sobre conteúdo e avaliações.'],
  ['Aquisição', 'Novos clientes chegando', 'Gestão de tráfego pago para levar clientes aos canais de vendas.'],
  ['Vendas', 'Mais pedidos e ticket médio', 'Engenharia de cardápio e orientação sobre ofertas e calendário comercial.'],
  ['Recorrência', 'Motivos para voltar', 'Remarketing e orientação sobre satisfação.'],
];
const demo: CommercialProposal = {restaurant_name: 'Brasa da Vila', service_value: 2000, ad_value: 1500, contract_duration: 3, units: 1, proposal_number: 101, proposal_year: 2026, services: PINGUIM_SERVICES.map(name=>({id:name,name}))};
const money = (n:number) => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
export default function CompactProposal({ proposal }: { proposal?: CommercialProposal }) {
  const p = proposal ?? demo;
  const extras = proposalExtras(p);
  const fullMethod = isFullMethod(p);
  const planLabel = fullMethod ? 'Método Pinguim' : 'Plano personalizado';
  const extraTotal = extras.reduce((sum, s) => sum + (s.price ?? 0) * (s.quantity ?? 0), 0);
  return <main className="bg-[#090c13] text-white min-h-screen">
    <nav aria-label="Páginas da proposta" className="sticky top-0 z-20 border-b border-white/10 bg-[#090c13]/90 backdrop-blur-xl px-5 py-4 flex items-center justify-between gap-4">
      <span className="text-xs tracking-[.18em] text-slate-400 uppercase">Pinguim <span className="hidden sm:inline">/ Proposta comercial</span></span>
      <div className="flex gap-5 text-xs"><a href="#capa" className="hover:text-blue-400">01 Capa</a><a href="#escopo" className="hover:text-blue-400">02 Escopo</a><a href="#investimento" className="hover:text-blue-400">03 Investimento</a></div>
    </nav>
    <div className="max-w-6xl mx-auto px-6 md:px-14">
      <section id="capa" className="relative scroll-mt-16 min-h-[85svh] flex flex-col justify-between py-12 md:py-16 border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-28 w-64 h-64 bg-blue-600/15 blur-[100px] rounded-full" />
        <div className="flex flex-wrap items-center justify-between gap-6"><WhitePinguimLogo/><span className="rounded-full border border-blue-400/25 px-4 py-2 text-[10px] uppercase tracking-widest text-blue-300">{proposal ? 'Proposta comercial' : 'Esboço • dados ilustrativos'}</span></div>
        <div className="py-16 relative"><p className="text-blue-400 uppercase tracking-[.25em] text-xs mb-6">Proposta nº {proposalReference(p)} / {planLabel}</p><h1 className="text-5xl md:text-7xl font-bold leading-[1.04] max-w-3xl">O próximo capítulo<br/>do <span className="text-blue-400">seu restaurante.</span></h1><div className="mt-10 border-l-2 border-blue-500 pl-5"><p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Preparada para</p><p className="text-2xl font-medium">{p.restaurant_name}</p>{p.logo_url && <img src={p.logo_url} alt={`Logo de ${p.restaurant_name}`} className="h-16 w-24 object-contain mt-4"/>}<p className="text-slate-400 text-sm mt-2">Marketing para restaurantes & delivery</p></div></div>
        <div className="flex justify-between items-end"><p className="text-xs text-slate-500">Uma direção clara. Um trabalho contínuo.<br/><span className="text-slate-300">Mais oportunidades para o seu negócio.</span></p><a href="#escopo" className="flex items-center gap-3 text-sm text-blue-300">Conheça o escopo <ArrowDown size={18}/></a></div>
      </section>
      <section id="escopo" className="scroll-mt-16 py-14 md:py-20 border-b border-white/10">
        <p className="text-blue-400 text-xs tracking-[.2em] uppercase">02 / O que você está contratando</p><h2 className="text-4xl md:text-5xl font-bold mt-4">{planLabel}.<br/><span className="text-slate-400">Da atenção à próxima compra.</span></h2><p className="text-slate-400 max-w-2xl leading-relaxed mt-5">{fullMethod ? 'Conectamos comunicação, posicionamento, aquisição, vendas e recorrência em uma estratégia para o seu restaurante.' : 'Um escopo de trabalho selecionado para as necessidades do seu restaurante.'}</p>
        <div className="mt-8 divide-y divide-white/10">{(fullMethod ? pillars : (p.services ?? []).filter(s => !['ifood', '99food'].includes(s.id)).map(s => ['Contratado', s.name, 'Serviço incluído nesta proposta.'])).map(([name, title, text], i)=><article key={name} className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-6 py-5"><p className="text-blue-400 text-sm"><span className="text-slate-600 mr-3">0{i+1}</span>{name}</p><div><h3 className="text-lg font-semibold">{title}</h3><p className="text-sm text-slate-400 mt-1 leading-relaxed">{text}</p></div></article>)}</div>
        {fullMethod && <div className="mt-6 rounded-2xl border border-blue-400/20 bg-blue-500/5 p-5"><p className="text-sm text-blue-300">Dados que orientam o trabalho</p><p className="text-sm text-slate-400 mt-2">Iceberg do restaurante, planilha mensal e acompanhamento via WhatsApp. Reunião mensal, se desejar.</p></div>}
        {proposal && <p className="text-xs text-slate-400 mt-5">Escopo contratado: {(p.services ?? []).map(s=>s.name).join(' • ')}.</p>}

      </section>
      <section id="investimento" className="scroll-mt-16 py-14 md:py-20">
        <p className="text-blue-400 text-xs tracking-[.2em] uppercase">03 / Investimento e condições</p><h2 className="text-4xl md:text-5xl font-bold mt-4">Clareza para dar<br/>o próximo passo.</h2>
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-5 mt-9"><div className="rounded-3xl border border-blue-300/30 bg-gradient-to-br from-blue-500/20 to-white/[.03] p-8 shadow-[inset_0_1px_0_#ffffff20]"><p className="text-blue-200 text-xs uppercase tracking-widest">{planLabel} • {p.units ?? 1} unidade(s)</p><p className="text-5xl md:text-6xl font-bold mt-6">{money(p.service_value)}<span className="text-base text-slate-400 font-normal"> / mês</span></p><p className="text-sm text-slate-400 mt-4">Honorários pelos serviços contratados.</p>{extraTotal > 0 && <p className="text-xs text-slate-400 mt-3">Serviços base: {money(p.service_value - extraTotal)} • Marketplace: {money(extraTotal)}</p>}<div className="mt-7 pt-5 border-t border-white/10 text-sm space-y-3"><p className="flex gap-2"><Check size={17} className="text-blue-400"/>Prazo mínimo de {p.contract_duration} meses</p><p className="flex gap-2"><Check size={17} className="text-blue-400"/>Pagamento via Pix no início do período</p></div></div><div className="rounded-3xl border border-white/10 p-8 bg-white/[.03]"><p className="text-slate-400 text-xs uppercase tracking-widest">Investimento em mídia</p><p className="text-3xl font-semibold mt-6">{money(p.ad_value)}<span className="text-sm font-normal text-slate-400"> / mês</span></p><p className="text-sm text-slate-400 leading-relaxed mt-4">Verba recomendada para anúncios, paga diretamente às plataformas. Separada dos honorários da Pinguim.</p>{extras.length > 0 && <div className="mt-6 border-t border-white/10 pt-5"><p className="text-sm text-white">Marketplace contratado</p>{extras.map(s=><p key={s.id} className="text-xs text-slate-400 leading-relaxed mt-2">{s.name}{s.price != null && s.quantity != null ? ` • ${s.quantity} unidade(s) × ${money(s.price)}/mês` : ''}</p>)}<p className="text-xs text-slate-400 mt-2">Incluído nos honorários apresentados.</p></div>}</div></div>
        <div className="mt-10"><h3 className="text-xs text-slate-400 uppercase tracking-widest mb-5">Como começamos</h3><ol className="grid sm:grid-cols-4 gap-4">{['Assinatura do contrato','Pagamento via Pix','Reunião de acessos','Primeiras entregas'].map((s,i)=><li key={s} className="border-t border-white/15 pt-4 text-sm"><span className="text-blue-400 text-xs block mb-2">0{i+1}</span>{s}</li>)}</ol></div>
        <footer className="mt-14 pt-8 border-t border-white/10 flex gap-5 items-center justify-between"><p className="text-lg md:text-2xl font-medium">O seu restaurante tem uma história.<br/><span className="text-slate-400">Vamos construir o próximo capítulo juntos.</span></p><ArrowUpRight className="text-blue-400 shrink-0" size={32}/></footer>
      </section>
    </div>
  </main>;
}
