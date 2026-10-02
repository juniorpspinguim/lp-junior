'use client'
import { useState, useTransition } from 'react'
import { checkVillaMeta, type MetaCheck } from '@/app/painel/operacional/meta-actions'
import { metaMetrics, validateMetaQuery } from '@/lib/meta-query'

export default function MetaConnectionCheck({accountId="901463374171335",clientName="Villa Bistrô"}:{accountId?:string;clientName?:string}){
 const [result,setResult]=useState<MetaCheck|null>(null)
 const [since,setSince]=useState(accountId==='269412715465914'?'2026-09-01':'2026-08-01')
 const [until,setUntil]=useState(accountId==='269412715465914'?'2026-09-30':'2026-08-31')
 const [selected,setSelected]=useState<string[]>(metaMetrics.map(m=>m.key))
 const [pending,start]=useTransition()
 const input={since,until,metrics:selected}
 const validation=validateMetaQuery(input)
 function recent(days:number){
  const end=new Date()
  const start=new Date(end);start.setDate(start.getDate()-days+1)
  const local=(d:Date)=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')
  setSince(local(start));setUntil(local(end));setResult(null)
 }
 return <section className="mb-6 rounded-2xl border border-blue-400/25 bg-blue-500/5 p-6">
  <h2 className="text-xl font-semibold">Meta Ads · {clientName}</h2>
  <p className="mt-2 text-sm text-blue-200">Conta vinculada · consulta disponível</p>
  <p className="mt-2 text-sm text-slate-400">Escolha as métricas e os dias que deseja consultar diretamente na Meta. Este filtro é independente do comparativo mensal do relatório.</p>
  <details className="mt-4 rounded-xl border border-white/10 p-4"><summary className="cursor-pointer text-sm font-medium">Filtros · {selected.length} métricas · {since.split('-').reverse().join('/')} a {until.split('-').reverse().join('/')}</summary><fieldset disabled={pending} className="mt-5 disabled:opacity-60">
   <legend className="text-sm font-semibold">Período do Meta Ads</legend>
   <div className="my-3 flex flex-wrap gap-2">{[7,14,30].map(days=><button key={days} onClick={()=>recent(days)} className="rounded-lg bg-white/10 px-3 py-2 text-sm">Últimos {days} dias</button>)}</div>
   <div className="flex flex-wrap gap-4">
    <label className="text-sm text-slate-300">De<input type="date" value={since} onChange={e=>{setSince(e.target.value);setResult(null)}} className="mt-2 block rounded-lg border border-white/15 bg-[#101521] p-3 text-white [color-scheme:dark]"/></label>
    <label className="text-sm text-slate-300">Até<input type="date" value={until} onChange={e=>{setUntil(e.target.value);setResult(null)}} className="mt-2 block rounded-lg border border-white/15 bg-[#101521] p-3 text-white [color-scheme:dark]"/></label>
   </div>
   <p className="mt-3 text-xs text-slate-400">As duas datas estão incluídas. Os atalhos incluem hoje, cujos resultados ainda podem mudar.</p>
   <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{metaMetrics.map(m=><label key={m.key} className="flex items-center gap-2 rounded-lg bg-white/5 p-3 text-sm"><input type="checkbox" checked={selected.includes(m.key)} onChange={()=>{setSelected(old=>old.includes(m.key)?old.filter(k=>k!==m.key):[...old,m.key]);setResult(null)}} className="h-4 w-4 accent-blue-500"/>{m.label}</label>)}</div>
  </fieldset></details>
  {validation&&<p className="mt-3 text-sm text-amber-200">{validation}</p>}
  <button disabled={pending||!!validation} onClick={()=>start(async()=>{setResult(null);try{setResult(await checkVillaMeta(input,accountId))}catch{setResult({ok:false,message:'Falha de conexão. Tente novamente.'})}})} className="mt-5 rounded-xl bg-blue-600 px-5 py-3 disabled:opacity-50">{pending?'Consultando a Meta…':'Consultar Meta Ads'}</button>
  {result&&<div role="status" className="mt-5">
   <p className={result.ok?'text-emerald-300':'text-amber-200'}>{result.message}</p>
   <p className="mt-2 text-sm text-slate-300">{since.split('-').reverse().join('/')} a {until.split('-').reverse().join('/')}</p>
   {result.account&&<p className="mt-2 text-sm text-slate-400">{result.account} · {result.currency} · {result.timezone}</p>}
   <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">{result.metrics?.map(m=><div key={m.label} className="rounded-xl bg-white/5 p-4"><p className="text-xs text-slate-400">{m.label}</p><p className="mt-2 text-lg">{m.value}</p></div>)}</div>
   <p className="mt-3 text-xs text-slate-400">Compras e ROAS são atribuídos pela Meta e dependem do rastreamento de conversões. Não representam o faturamento total. Métricas ausentes aparecem como “Não informado”.</p>{result.checkedAt&&<p className="mt-3 text-xs text-slate-500">Consulta em {new Date(result.checkedAt).toLocaleString('pt-BR',{timeZone:'America/Bahia'})}. A sincronização automática ainda não está ativa.</p>}
  </div>}
 </section>
}
