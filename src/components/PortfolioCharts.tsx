'use client'
import {useState} from 'react'
import OperationsHistory from './OperationsHistory'
import {formatValue,groups} from '@/lib/operations'
import type {OperationsClient} from './OperationsPortfolio'
export default function PortfolioCharts({clients,period,indices}:{clients:OperationsClient[];period:string;indices:number[]}){
 const [chosen,setChosen]=useState(56)
 const options=groups.flatMap(g=>g.metrics.map(m=>({...m,channel:g.title}))).filter(m=>indices.includes(m.index))
 const metric=options.find(m=>m.index===chosen)??options[0]
 const values=metric?clients.map(c=>({client:c,value:c.pilot?.months.find(m=>m.key===period)?.values[metric.index]})):[]
 const max=Math.max(1,...values.map(v=>Math.max(0,v.value??0)))
 return <div className="space-y-6 mb-6">
 <div className="grid gap-3 sm:grid-cols-3">{[['Clientes na carteira',clients.length],['Com fonte conectada',clients.filter(c=>c.pilot?.months.length).length],['Com dados no mês',clients.filter(c=>c.pilot?.months.some(m=>m.key===period)).length]].map(([label,value])=><div key={label} className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><p className="text-sm text-slate-400">{label}</p><strong className="mt-2 block text-3xl">{value}</strong></div>)}</div>
 {metric&&<section className="rounded-2xl border border-white/10 bg-white/[.03] p-6"><div className="mb-6 flex flex-wrap justify-between gap-4"><h2 className="text-xl font-semibold">Clientes lado a lado</h2><label className="text-sm text-slate-400">Indicador do gráfico<select value={metric.index} onChange={e=>setChosen(Number(e.target.value))} className="ml-3 rounded-lg bg-[#101521] p-2 text-white">{options.map(m=><option key={m.index} value={m.index}>{m.channel} · {m.label}</option>)}</select></label></div><div className="space-y-5">{values.map(({client,value})=><div key={client.id}><div className="mb-2 flex justify-between gap-3 text-sm"><span>{client.name}</span><span className="text-slate-300">{value==null?client.pilot?'Sem dados no mês':'Fonte não conectada':formatValue(value,metric.kind)}</span></div><div className="h-5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-300" style={{width:`${value==null?0:Math.max(0,value)/max*100}%`}}/></div></div>)}</div></section>}
 <section><h2 className="mb-2 text-xl font-semibold">Evolução de todos os clientes</h2><p className="mb-5 text-sm text-slate-400">Histórico completo por cliente, preservado independentemente do filtro do mês. Cada gráfico usa sua própria escala.</p>{clients.map(c=><div key={c.id} className="mb-5"><h3 className="mb-3 font-semibold text-blue-200">{c.name}</h3>{c.pilot?.months.length?<OperationsHistory months={c.pilot.months}/>:<p className="rounded-xl border border-white/10 p-4 text-sm text-slate-400">{c.pilot?.error?'Não foi possível consultar a fonte.': 'Histórico aguardando conexão da fonte.'}</p>}</div>)}</section>
 </div>
}
