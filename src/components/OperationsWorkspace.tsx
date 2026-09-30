'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, Mic } from 'lucide-react'
import OperationsHistory from './OperationsHistory'
import MetaConnectionCheck from './MetaConnectionCheck'
import WhitePinguimLogo from './WhitePinguimLogo'
import { groups, sourceUrl, formatValue, comparison, buildReportHtml, type Pilot } from '@/lib/operations'
const sources=['Meta Ads','Instagram','Google Ads','Cardápio Web','Saipos','Vucafood','Takeat','Google Meu Negócio','iFood']
export default function OperationsWorkspace({pilot}:{pilot:Pilot}) {
 const [tab,setTab]=useState('Visão geral')
 const [period,setPeriod]=useState(pilot.months.some(m=>m.key==='2026-08')?'2026-08':pilot.months[0]?.key||'')
 const [baseline,setBaseline]=useState(pilot.months.some(m=>m.key==='2026-07')?'2026-07':pilot.months[1]?.key||'')
 const [version,setVersion]=useState('Completo')
 const [notes,setNotes]=useState<Record<string,string>>({})
 const [copyStatus,setCopyStatus]=useState('')
 const current=pilot.months.find(m=>m.key===period)
 const previous=pilot.months.find(m=>m.key===baseline)
 const noteKey=`${period}-${version}`
 const html=current?buildReportHtml(current,previous,version,notes[noteKey]||'',pilot.loadedAt):''
 function viewReport(){
  const url=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'}))
  const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';document.body.appendChild(link);link.click();link.remove()
  setTimeout(()=>URL.revokeObjectURL(url),300000)
 }
 function downloadReport(){
  if(!current)return
  const url=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'}))
  const link=document.createElement('a');link.href=url;link.download=`villa-bistro-${period}-${version.toLowerCase()}.html`
  document.body.appendChild(link);link.click();link.remove()
  setTimeout(()=>URL.revokeObjectURL(url),60000)
  setCopyStatus('Download solicitado. O HTML pode ser aberto no navegador, mesmo sem internet.')
 }
 const panel='rounded-2xl border border-white/10 bg-white/[.03] p-6'
 return <main className="min-h-screen bg-[#090c13] px-5 py-8 text-white md:px-10"><div className="mx-auto max-w-7xl">
 <header className="flex items-center justify-between border-b border-white/10 pb-6"><div className="w-36 [&>svg]:w-full"><WhitePinguimLogo/></div><Link href="/painel" className="flex items-center gap-2 text-sm text-slate-400"><ArrowLeft size={16}/>Painel</Link></header>
 <div className="my-8"><p className="text-xs uppercase tracking-[.2em] text-blue-400">Operacional · Cliente piloto</p><h1 className="mt-3 text-4xl font-bold">Villa Bistrô</h1><p className="mt-3 text-slate-400">Resultados mensais, leitura por canal e relatório para o cliente.</p></div>
 <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-400/20 bg-blue-500/5 p-4 text-sm text-slate-300"><div><p>Fonte atual: <a href={sourceUrl} target="_blank" rel="noreferrer" className="text-blue-300 underline">planilha do Villa</a>. Leitura ao abrir ou atualizar esta página.</p><p className="mt-1 text-xs text-slate-400">{pilot.loadedAt?`Consultada em ${new Date(pilot.loadedAt).toLocaleString('pt-BR',{timeZone:'America/Bahia'})}. `:''}As integrações diretas e a voz ainda não estão ativas.</p></div><button onClick={()=>window.location.reload()} className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2"><RefreshCw size={15}/>Atualizar planilha</button></div>
 <nav className="mb-6 flex gap-2" aria-label="Área operacional">{['Visão geral','Conexões','Relatórios'].map(t=><button key={t} onClick={()=>setTab(t)} className={`rounded-xl px-4 py-3 text-sm ${tab===t?'bg-blue-600':'bg-white/5 text-slate-400'}`}>{t}</button>)}</nav>
 {pilot.error && <p role="alert" className="mb-6 rounded-xl bg-amber-500/10 p-5 text-amber-200">{pilot.error}</p>}
 {current && tab!=='Conexões' && <div className="mb-6 flex flex-wrap gap-5"><label className="text-sm text-slate-400">Mês analisado<select value={period} onChange={e=>{setPeriod(e.target.value);setCopyStatus('')}} className="ml-3 rounded-lg border border-white/15 bg-[#101521] p-2 text-white">{pilot.months.map(m=><option key={m.key} value={m.key}>{m.label}</option>)}</select></label><label className="text-sm text-slate-400">Comparar com<select value={baseline} onChange={e=>{setBaseline(e.target.value);setCopyStatus('')}} className="ml-3 rounded-lg border border-white/15 bg-[#101521] p-2 text-white">{pilot.months.map(m=><option key={m.key} value={m.key}>{m.label}</option>)}</select></label><p className="w-full text-xs text-slate-500">Períodos mensais disponíveis na planilha. Novos meses aparecem após atualizar a fonte; ainda não há recorte por dia.</p></div>}
 {tab==='Visão geral' && current && <>
 <OperationsHistory months={pilot.months}/>
 {current.values[56]==null && <div className="mb-6 rounded-xl border border-amber-300/20 bg-amber-300/5 p-5 text-sm leading-6 text-amber-100"><strong>Fechamento financeiro pendente.</strong> Em {current.label.toLowerCase()}, o total do restaurante não está preenchido na fonte. Os números abaixo mostram somente os canais com dados disponíveis.</div>}
 <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{label:'Faturamento total',index:56,kind:'money' as const},{label:'Receita do cardápio',index:29,kind:'money' as const},{label:'Pedidos do cardápio',index:27,kind:'number' as const},{label:'Seguidores ganhos',index:4,kind:'number' as const}].map(m=><div key={m.label} className={panel}><p className="text-sm text-slate-400">{m.label}</p><p className="my-3 text-2xl font-semibold">{formatValue(current.values[m.index],m.kind)}</p><p className="text-sm text-blue-300">{comparison(current.values[m.index],previous?.values[m.index],m.kind)}</p></div>)}</div>
 <div className="grid items-start gap-4 xl:grid-cols-2">{groups.map(g=><details key={g.title} className={panel}><summary className="cursor-pointer text-lg font-semibold">{g.title}<span className="ml-3 text-xs font-normal text-slate-400">Ver indicadores</span></summary><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[470px] text-left text-sm"><thead className="text-xs text-slate-500"><tr><th className="pb-3">Indicador</th><th className="pb-3">{current.label}</th><th className="pb-3">{previous?.label}</th><th className="pb-3">Variação</th></tr></thead><tbody>{g.metrics.map(m=><tr key={m.index} className="border-t border-white/5"><td className="py-3 pr-3 text-slate-300">{m.label}</td><td className="py-3 pr-3">{formatValue(current.values[m.index],m.kind)}</td><td className="py-3 pr-3 text-slate-400">{formatValue(previous?.values[m.index],m.kind)}</td><td className="py-3 text-blue-300">{comparison(current.values[m.index],previous?.values[m.index],m.kind)}</td></tr>)}</tbody></table></div></details>)}</div><p className="mt-5 text-xs leading-6 text-slate-500">Variações de taxas exibidas em pontos percentuais. Os valores e taxas são os registrados na planilha. Pedidos do cardápio não representam todos os pedidos do restaurante. Não há atribuição de faturamento aos anúncios nesta fonte.</p></>}
 {tab==='Conexões' && <section><MetaConnectionCheck/><h2 className="mb-2 text-2xl font-semibold">Integrações diretas</h2><p className="mb-6 text-slate-400">O piloto lê o Google Sheets. As fontes abaixo ainda precisam de autorização e configuração.</p><div className="grid gap-4 md:grid-cols-3">{sources.map(s=><div key={s} className={panel}><h3 className="font-semibold">{s}</h3><p className="mt-3 text-sm text-amber-200">Não conectado</p><p className="mt-3 text-sm text-slate-400">Validar acesso, indicadores e histórico disponíveis.</p></div>)}</div></section>}
 {tab==='Relatórios' && current && <section className="space-y-6"><details open className={panel}><summary className="cursor-pointer text-lg font-semibold">Sua análise · texto e futura transcrição de voz</summary><div className="mt-5"><h2 className="text-2xl font-semibold">Sua análise do mês</h2><p className="my-4 text-sm leading-6 text-slate-400">HTML montado com os dados da planilha. O arquivo baixado preserva este período e abre sem internet. Acrescente sua interpretação e revise antes de compartilhar. As observações não são salvas e se perdem ao sair ou atualizar.</p><div className="my-5 flex gap-2">{['Completo','Marketing'].map(v=><button key={v} onClick={()=>{setVersion(v);setCopyStatus('')}} className={`rounded-xl px-4 py-2 ${version===v?'bg-blue-600':'bg-white/5'}`}>{v}</button>)}</div><p className="mb-4 text-xs text-slate-400">{version==='Marketing'?'Sem indicadores monetários. As observações desta versão são separadas; evite incluir informações financeiras no texto.':'Inclui valores disponíveis e pendências de faturamento.'}</p><label className="text-sm text-slate-300">Observações e plano de ação<textarea rows={6} maxLength={12000} value={notes[noteKey]||''} onChange={e=>{setNotes({...notes,[noteKey]:e.target.value});setCopyStatus('')}} placeholder="O que os resultados indicam? O que será feito no próximo mês?" className="mt-2 w-full rounded-xl border border-white/15 bg-[#101521] p-4 text-white"/></label><p className="mt-4 flex items-center gap-2 text-sm text-slate-400"><Mic size={18}/>Voz: próxima etapa de integração.</p></div></details><div className={panel}><div className="mb-5 flex flex-wrap items-center justify-between gap-4"><h2 className="text-xl font-semibold">Apresentação de resultados</h2><div className="flex gap-3"><button onClick={viewReport} className="rounded-xl border border-blue-400/40 px-5 py-3 text-blue-200">Visualizar HTML ↗</button><button onClick={downloadReport} className="rounded-xl bg-blue-600 px-5 py-3">Baixar HTML ↓</button></div></div><iframe title="Prévia do relatório HTML" sandbox="" srcDoc={html} className="h-[80vh] min-h-[600px] w-full rounded-xl border border-white/10 bg-[#090d17]"/><p role="status" className="mt-3 text-sm text-blue-300">{copyStatus}</p></div></section>}
 </div></main>
}
