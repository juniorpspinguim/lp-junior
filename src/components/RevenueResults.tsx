"use client";

import { useState } from "react";

const cases = [
  { name: "Paixão Burger", niche: "Hamburgueria", record: true, logo: "paixao-burgers.png", from: "Ago/2025", to: "Ago/2026", before: 56250.68, after: 82021.74, metric: "Faturamento total", color: "#64A7FF", note: "Soma das receitas de cardápio digital, iFood e salão.", source: "1_Tsm-mRNtzcA6crHZ6exwyJvIcLyB1c_B3Nmf7HLUu4", range: "BC7:BC19" },
  { name: "La Vecchia", niche: "Pizzaria", record: true, logo: "la-vecchia-forneria.png", from: "Ago/2025", to: "Jul/2026", before: 11257, after: 54824.41, metric: "Faturamento total", color: "#63D9A0", note: "Soma das receitas de cardápio digital, iFood e salão. Comparação de agosto de 2025 com julho de 2026; são meses diferentes e pode haver efeito de sazonalidade.", source: "120tHwlItQ6ikgrmoAKIw455BvD4DflMMzqjsRBdc1fs", range: "BC10:BC21" },
  { name: "Da Talli", niche: "Padaria artesanal", record: true, logo: "da-talli.png", from: "Ago/2025", to: "Ago/2026", before: 101252.11, after: 144963.77, metric: "Faturamento total", color: "#B89AFF", note: "Receita total registrada. Em agosto de 2025, o total contém apenas salão; em agosto de 2026, inclui também cardápio digital e iFood. Parte da variação reflete essa diferença de composição.", source: "1V_SIIiVb9zA-qwOZg5CkpcySkXkOX2ECOb6Pk3ycvPc", range: "BC9:BC21" },
  { name: "Villa Bistro", niche: "Hamburgueria", record: true, logo: "villa-bistro.png", from: "Ago/2025", to: "Jul/2026", before: 426546.66, after: 566949.07, metric: "Faturamento total", color: "#38D3D9", note: "Total dos canais registrados. Julho de 2026 inclui R$ 11.905,64 do canal 99, sem valor registrado em agosto de 2025. Agosto de 2026 está sem total preenchido. Comparação entre meses diferentes, sujeita à sazonalidade.", source: "1W9SPeyrA9NHn7qnLeB6Kmw7TsAmGqZqs7sf54CijmzU", range: "BE15:BE26" },
  { name: "A Lasanharia", niche: "Restaurante", record: true, logo: "a-lasanharia.png", from: "Ago/2025", to: "Ago/2026", before: 221492.22, after: 258670.50, metric: "Faturamento das duas unidades", color: "#F2BA68", note: "Consolidado Matriz e Villas. Agosto de 2026 inclui R$ 78.895,09 do canal 99 nas duas unidades, sem valores registrados nesse canal em agosto de 2025.", source: "1dXDPMPIeut0WpkwtA-FMD7WfMR0lOH6dWAw_x4__z90", range: "CG9:CG21" },
  { name: "Jeanne Garcia", niche: "Confeitaria", record: false, logo: "jeanne-garcia.jpeg", from: "Mar/2025", to: "Mar/2026", before: 114040.12, after: 146988.66, metric: "Faturamento total • março", color: "#F29AC1", note: "Soma de salão, encomendas e iFood. Março é o recorte mensal disponível; não equivale ao faturamento específico de Páscoa, que precisa de períodos próprios para comparação. Este recorte mostra o desempenho de março, não uma tendência contínua: agosto de 2026 teve queda de 10,5% em relação a agosto de 2025.", source: "1E4tZbSD41E1R4etAsWJumH60u3shm42P5RMhqZ7keOU", range: "BD8:BD20" },
];
type RevenueCase = typeof cases[number];
const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const growth = (item: RevenueCase) => ((item.after / item.before - 1) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1, minimumFractionDigits: 1 });

export default function RevenueResults() {
  const [anonymous, setAnonymous] = useState(false);
  return <section className="w-full max-w-6xl max-h-full overflow-y-auto py-1" aria-label="Resultados de faturamento">
    <div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-2">Resultados • Pinguim Digital</p><h2 className="text-3xl md:text-4xl font-black text-white">Crescimento que aparece <span className="text-blue-400">nos números.</span></h2><p className="mt-3 text-slate-400 text-sm">Evolução do faturamento nos períodos indicados.</p><button onClick={() => setAnonymous(!anonymous)} aria-pressed={anonymous} className="mt-3 text-xs text-blue-300 underline underline-offset-4">{anonymous ? "Mostrar identificação dos clientes" : "Ocultar identificação dos clientes"}</button></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">{cases.map(item => <article key={item.name} className="text-left rounded-2xl border border-white/10 bg-[#101521] p-3 md:p-4" style={{ backgroundImage: `radial-gradient(ellipse at top right, ${item.color}14, transparent 70%)` }}>
      <div className="flex items-center gap-3 mb-2">{!anonymous && item.logo ? <img src={`/clientes-proposta/${item.logo}`} alt="" className="h-10 w-10 rounded-full object-cover" /> : <span className="h-10 w-10 rounded-full bg-cyan-400/10 flex items-center justify-center font-bold text-cyan-300">{item.niche.slice(0, 1)}</span>}<div><h3 className="font-bold text-white">{anonymous ? item.niche : item.name}</h3>{!anonymous && <p className="text-xs text-slate-400 mt-1">{item.niche}</p>}</div></div>
      <p className="text-3xl font-black tracking-tight" style={{ color: item.color }}>+{growth(item)}%</p><p className="text-xs text-slate-300 mt-1">{item.metric}</p>
      <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-white/10">{[[item.from, item.before], [item.to, item.after]].map(([period, value]) => <div key={period}><p className="text-[11px] text-slate-500 mb-1">{period}</p><p className="text-xs md:text-sm font-semibold text-white">{money(Number(value))}</p></div>)}</div>
      {item.record && <p className="mt-3 text-[10px] font-semibold" style={{ color: item.color }}>↗ Recorde de faturamento no período analisado</p>}
    </article>)}</div>
    <p className="mt-4 text-[10px] leading-relaxed text-slate-500">Fonte: planilhas de acompanhamento dos clientes. Recortes específicos de receita registrada nos períodos indicados.</p>
  </section>;
}
