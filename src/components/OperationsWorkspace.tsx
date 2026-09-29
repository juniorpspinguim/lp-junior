'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BarChart3, Building2, Cable, FileText, Mic, ChevronRight, Check } from 'lucide-react'
import WhitePinguimLogo from './WhitePinguimLogo'

const sources = ['Meta Ads', 'Instagram', 'Cardápio Web', 'Saipos', 'Vucafood', 'Takeat', 'Google Meu Negócio', 'iFood']
const channels = ['Cardápio próprio', 'iFood', '99Food', 'Salão', 'WhatsApp']
const steps = ['Cliente e unidade', 'Conexões', 'Indicadores', 'Análise e relatório']
const inputStyle = 'mt-2 w-full rounded-xl border border-white/15 bg-[#101521] p-3 text-white outline-none focus:border-blue-400'

export default function OperationsWorkspace() {
  const [tab, setTab] = useState('Visão geral')
  const [client, setClient] = useState('')
  const [unit, setUnit] = useState('Matriz')
  const [platform, setPlatform] = useState('Cardápio Web')
  const [period, setPeriod] = useState('')
  const [version, setVersion] = useState('Completo')
  const [notes, setNotes] = useState('')
  const [pilot, setPilot] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const report = `Relatório ${client || '[Cliente]'}${unit ? ` — ${unit}` : ''}\nPeríodo: ${period || '[Selecione o mês]'}\nVersão: ${version}\n\n${version === 'Completo' ? 'RESULTADOS\nIndicadores ainda não conectados.\n\n' : ''}ANÁLISE DO MÊS\n${notes.trim() || '[Adicione sua análise]'}\n\nPRÓXIMOS PASSOS\n[Defina ações, responsáveis e prazos]`

  return <main className="min-h-screen bg-[#090c13] text-white px-5 py-8 md:px-10">
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-6">
        <div className="w-36 [&>svg]:w-full"><WhitePinguimLogo /></div>
        <Link href="/painel" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={16}/>Voltar ao painel</Link>
      </header>
      <div className="my-9 flex flex-wrap items-end justify-between gap-5">
        <div><p className="text-xs uppercase tracking-[.2em] text-blue-400">Gestão de clientes</p><h1 className="mt-3 text-4xl font-bold">Operacional</h1><p className="mt-3 text-slate-400">Do resultado do mês ao próximo passo do restaurante.</p></div>
        <span className="rounded-full border border-amber-300/20 bg-amber-300/5 px-4 py-2 text-xs text-amber-200">Prévia para avaliação</span>
      </div>
      <div className="mb-7 rounded-xl border border-blue-400/20 bg-blue-500/5 p-4 text-sm text-slate-300">Esta é a primeira versão visual. O cadastro e os textos ficam apenas nesta sessão; ainda não são salvos no sistema. As importações e a análise por voz aguardam configuração.</div>
      <nav aria-label="Área operacional" className="mb-8 flex gap-2 overflow-x-auto">{['Visão geral', 'Conexões', 'Relatórios'].map((name, i) => {const Icon = [BarChart3, Cable, FileText][i]; return <button key={name} onClick={() => setTab(name)} className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm ${tab === name ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}><Icon size={17}/>{name}</button>})}</nav>
      {tab === 'Visão geral' && <>
        <section className="grid gap-7 lg:grid-cols-[1.25fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/50 to-[#101521] p-7">
            <div className="flex items-center gap-3"><Building2 className="text-blue-400"/><h2 className="text-xl font-semibold">Seu primeiro cliente piloto</h2></div>
            <p className="mt-3 text-sm leading-6 text-slate-400">Escolha um restaurante para validar as conexões e a leitura dos resultados antes de expandir para toda a carteira.</p>
            <form className="mt-6 space-y-4" onSubmit={e => {e.preventDefault(); setPilot(true)}}>
              <label className="block text-sm text-slate-300">Restaurante<input required maxLength={120} value={client} onChange={e => {setClient(e.target.value); setPilot(false)}} placeholder="Nome do restaurante" className={inputStyle}/></label>
              <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm text-slate-300">Unidade<input required maxLength={100} value={unit} onChange={e => setUnit(e.target.value)} className={inputStyle}/></label><label className="text-sm text-slate-300">Plataforma<select value={platform} onChange={e => setPlatform(e.target.value)} className={inputStyle}>{sources.slice(2,6).map(s => <option key={s}>{s}</option>)}</select></label></div>
              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500">{pilot ? <Check size={18}/> : <ChevronRight size={18}/>} {pilot ? 'Piloto selecionado nesta prévia' : 'Visualizar cliente piloto'}</button>
            </form>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.025] p-7"><h2 className="text-xl font-semibold">Como vai funcionar</h2><div className="mt-6 space-y-6">{steps.map((s,i) => <div key={s} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-sm text-blue-300">{i+1}</span><div><h3 className="font-medium">{s}</h3><p className="mt-1 text-sm text-slate-400">{['Cada operação com seus canais e histórico.','Autorizar as fontes e acompanhar a atualização.','Comparar os resultados entre meses e anos.','Adicionar sua leitura e revisar antes de compartilhar.'][i]}</p></div></div>)}</div></div>
        </section>
        <section className="mt-8"><div className="mb-5 flex flex-wrap items-center justify-between gap-4"><h2 className="text-xl font-semibold">{pilot ? `${client} · ${unit}` : 'Indicadores do cliente'}</h2><label className="text-sm text-slate-400">Mês de referência<input aria-label="Mês de referência" type="month" value={period} onChange={e => setPeriod(e.target.value)} className="ml-3 rounded-lg border border-white/15 bg-[#101521] p-2 text-white"/></label></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{['Faturamento total', 'Pedidos', 'Ticket médio', 'Investimento em anúncios'].map(s => <div key={s} className="rounded-2xl border border-white/10 bg-white/[.03] p-6"><p className="text-sm text-slate-400">{s}</p><p className="my-3 text-3xl text-slate-500">—</p><p className="text-xs text-slate-500">Aguardando conexão</p></div>)}</div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10"><table className="w-full min-w-[500px] text-left text-sm"><thead className="bg-white/5 text-slate-400"><tr>{['Canal de venda', 'Faturamento', 'Pedidos', 'Ticket médio'].map(s => <th key={s} className="p-4 font-medium">{s}</th>)}</tr></thead><tbody>{channels.map(s => <tr key={s} className="border-t border-white/5"><td className="p-4">{s}</td><td className="p-4 text-slate-500">Não informado</td><td className="p-4 text-slate-500">—</td><td className="p-4 text-slate-500">—</td></tr>)}</tbody></table></div>
        </section>
      </>}
      {tab === 'Conexões' && <section><h2 className="text-2xl font-semibold">Fontes dos indicadores</h2><p className="mb-6 mt-2 text-slate-400">Nenhuma conta conectada. A disponibilidade de cada indicador será confirmada com o fornecedor.</p><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{sources.map(s => <div key={s} className="rounded-2xl border border-white/10 bg-white/[.03] p-6"><Cable className="mb-5 text-blue-400" size={24}/><h3 className="font-semibold">{s}</h3><p className="mt-2 text-xs text-amber-200">Não conectado</p><p className="mt-5 text-sm leading-6 text-slate-400">{s === 'Meta Ads' || s === 'Instagram' ? 'Conferir os ativos e as permissões do seu usuário na Meta.' : s === 'Google Meu Negócio' || s === 'iFood' ? 'Validar acesso à API e autorização das lojas.' : 'Validar acesso à API, métricas e histórico disponíveis.'}</p><p className="mt-5 text-xs text-slate-500">Última atualização: nenhuma</p></div>)}</div></section>}
      {tab === 'Relatórios' && <section className="grid gap-6 lg:grid-cols-2"><div className="rounded-3xl border border-white/10 bg-white/[.03] p-6"><h2 className="text-2xl font-semibold">Sua análise, organizada</h2><p className="mt-3 text-sm text-slate-400">Experimente a estrutura com suas observações. A geração com IA será conectada em uma próxima etapa.</p><div className="my-6 flex gap-2" aria-label="Versão do relatório">{['Completo','Marketing'].map(s => <button key={s} onClick={() => setVersion(s)} className={`rounded-xl px-4 py-2 ${version === s ? 'bg-blue-600' : 'bg-white/5'}`}>{s}</button>)}</div><p className="mb-4 text-xs text-slate-400">{version === 'Marketing' ? 'Modelo sem bloco financeiro. Revise suas observações para não incluir valores nesta versão.' : 'Modelo com espaço para resultados e análise da operação.'}</p><label className="text-sm text-slate-300">Observações do mês<textarea value={notes} onChange={e => setNotes(e.target.value)} maxLength={12000} rows={8} placeholder="O que melhorou? O que precisa de atenção? Quais ações você recomenda?" className={inputStyle}/></label><div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 p-4 text-sm text-slate-400"><Mic size={20}/><span>Análise por voz: aguardando integração.</span></div></div><div className="rounded-3xl border border-white/10 bg-[#111824] p-6"><h2 className="mb-5 font-semibold">Prévia do rascunho</h2><pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-300">{report}</pre><button onClick={async () => {try {await navigator.clipboard.writeText(report); setCopied(true); setError('')} catch {setError('Não foi possível copiar. Selecione o texto da prévia.')}}} className="mt-6 rounded-xl bg-blue-600 px-5 py-3">{copied ? 'Copiado — copiar novamente' : 'Copiar rascunho'}</button>{error && <p role="alert" className="mt-3 text-sm text-amber-200">{error}</p>}</div></section>}
    </div>
  </main>
}
