'use client'
import { useState } from 'react'
import { groups, formatValue, type Month } from '@/lib/operations'
export default function OperationsHistory({months}:{months:Month[]}){
 const [metricIndex,setMetricIndex]=useState(56)
 const metric=groups.flatMap(g=>g.metrics).find(m=>m.index===metricIndex)!
 const ordered=[...months].sort((a,b)=>a.key.localeCompare(b.key))
 const max=Math.max(1,...ordered.map(m=>Math.max(0,m.values[metric.index]??0)))
 return <section className="mb-6 rounded-2xl border border-white/10 bg-white/[.03] p-6">
 <div className="mb-5 flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-semibold">Histórico completo</h2><p className="mt-1 text-sm text-slate-400">Todos os meses da planilha. Os filtros acima controlam apenas o comparativo abaixo.</p></div><label className="text-sm text-slate-400">Indicador do histórico<select value={metricIndex} onChange={e=>setMetricIndex(Number(e.target.value))} className="ml-3 rounded-lg border border-white/15 bg-[#101521] p-2 text-white">{groups.map(g=><optgroup key={g.title} label={g.title}>{g.metrics.map(m=><option key={m.index} value={m.index}>{m.label}</option>)}</optgroup>)}</select></label></div>
 <div className="overflow-x-auto"><div className="flex min-w-max items-end gap-4 border-b border-white/10 pb-3">{ordered.map(m=><div key={m.key} className="w-28 shrink-0 text-center"><p className="mb-2 text-xs text-slate-300">{formatValue(m.values[metric.index],metric.kind)}</p><div className="flex h-32 items-end justify-center"><div title={m.label} className="w-10 rounded-t-lg bg-gradient-to-t from-blue-700 to-cyan-300" style={{height:m.values[metric.index]==null?0:`${Math.max(0,m.values[metric.index]!)/max*100}%`}}/></div><p className="mt-3 text-xs text-slate-400">{m.label.replace(' de ',' / ')}</p></div>)}</div></div>
 <details className="mt-5"><summary className="cursor-pointer text-sm text-blue-300">Ver todos os indicadores por mês</summary><div className="mt-4 max-h-[480px] overflow-auto"><table className="w-full text-left text-xs"><thead><tr><th className="sticky left-0 bg-[#101521] p-3">Indicador</th>{ordered.map(m=><th key={m.key} className="whitespace-nowrap p-3 text-slate-400">{m.label}</th>)}</tr></thead><tbody>{groups.flatMap(g=>g.metrics.map(m=><tr key={m.index} className="border-t border-white/10"><th className="sticky left-0 min-w-44 bg-[#101521] p-3 font-normal"><span className="block text-[10px] text-blue-300">{g.title}</span>{m.label}</th>{ordered.map(month=><td key={month.key} className="whitespace-nowrap p-3">{formatValue(month.values[m.index],m.kind)}</td>)}</tr>))}</tbody></table></div></details>
 </section>
}
