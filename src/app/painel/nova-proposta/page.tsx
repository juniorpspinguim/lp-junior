'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeft, Check, Copy, ExternalLink, Loader2, ImagePlus, X, Plus, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ProposalViewer from '@/components/ProposalViewer'

type PlanType = 'metodo_pinguim' | 'metodo_marketplace' | 'personalizado'

const PINGUIM_SERVICES = [
  'Tráfego Pago',
  'Gestão de Google Meu Negócio',
  'Análise de Ativos',
  'Engenharia de Cardápio',
]

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const PLANS = [
  {
    id: 'metodo_pinguim' as PlanType,
    label: 'Método Pinguim',
    description: 'Pacote completo de marketing digital',
    services: PINGUIM_SERVICES,
  },
  {
    id: 'metodo_marketplace' as PlanType,
    label: 'Método Pinguim + Marketplace',
    description: 'Inclui gestão de plataformas de delivery',
    services: PINGUIM_SERVICES,
  },
  {
    id: 'personalizado' as PlanType,
    label: 'Personalizado',
    description: 'Monte as entregas manualmente',
    services: [],
  },
]

export default function NovaPropostaPage() {
  const [restaurantName, setRestaurantName] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [plan, setPlan] = useState<PlanType>('metodo_pinguim')
  const [units, setUnits] = useState(1)
  const [marketplaces, setMarketplaces] = useState({ ifood: false, '99food': false })
  const [customServices, setCustomServices] = useState<string[]>([''])
  const [serviceValue, setServiceValue] = useState(0)
  const [adValue, setAdValue] = useState(0)
  const [contractDuration, setContractDuration] = useState(3)
  const [leadSource, setLeadSource] = useState('Indicação')
  const [customLeadSource, setCustomLeadSource] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [generatedSlug, setGeneratedSlug] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const addCustomService = () => setCustomServices(prev => [...prev, ''])
  const updateCustomService = (i: number, val: string) =>
    setCustomServices(prev => prev.map((s, idx) => idx === i ? val : s))
  const removeCustomService = (i: number) =>
    setCustomServices(prev => prev.filter((_, idx) => idx !== i))

  // Monta a lista final de serviços para salvar
  const buildServices = () => {
    if (plan === 'metodo_pinguim') return PINGUIM_SERVICES.map(name => ({ id: name, name }))
    if (plan === 'metodo_marketplace') {
      const mp = []
      if (marketplaces.ifood) mp.push({ id: 'ifood', name: 'Gestão de Marketplace - iFood' })
      if (marketplaces['99food']) mp.push({ id: '99food', name: 'Gestão de Marketplace - 99' })
      return [...PINGUIM_SERVICES.map(name => ({ id: name, name })), ...mp]
    }
    return customServices.filter(s => s.trim()).map(name => ({ id: name, name }))
  }

  const servicesList = buildServices()

  const handleGenerate = async () => {
    if (!restaurantName.trim()) return alert('Informe o nome do restaurante.')
    if (plan === 'metodo_marketplace' && !marketplaces.ifood && !marketplaces['99food'])
      return alert('Selecione ao menos uma plataforma de Marketplace.')
    setLoading(true)
    const slug = Math.random().toString(36).substring(2, 9)
    const { data: { user } } = await supabase.auth.getUser()

    let logo_url: string | null = null
    if (logoFile) {
      const ext = logoFile.name.split('.').pop()
      const path = `${user?.id}/${slug}.${ext}`
      const { error: uploadError } = await supabase.storage.from('logos').upload(path, logoFile, { upsert: true })
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('logos').getPublicUrl(path)
        logo_url = urlData.publicUrl
      }
    }

    const finalLeadSource = leadSource === 'Outro' ? customLeadSource.trim() : leadSource

    const { error } = await supabase.from('proposals').insert({
      user_id: user?.id,
      restaurant_name: restaurantName.trim(),
      services: servicesList,
      service_value: serviceValue,
      ad_value: adValue,
      contract_duration: contractDuration,
      lead_source: finalLeadSource,
      units,
      status: 'pending',
      slug,
      logo_url,
    })
    if (error) { alert('Erro ao gerar proposta: ' + error.message); console.error(error); setLoading(false); return }
    setGeneratedSlug(slug)
    setLoading(false)
  }

  const proposalUrl = generatedSlug
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/proposta/${generatedSlug}`
    : null

  const handleCopy = () => {
    if (proposalUrl) { navigator.clipboard.writeText(proposalUrl); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  return (
    <div className="min-h-screen bg-[#0D0D12] font-sans">
      <header className="fixed top-0 w-full z-50 bg-[#0D0D12]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/painel" className="text-slate-400 hover:text-white transition-colors p-1">
              <ArrowLeft size={20} />
            </Link>
            <Image src="/logo-pinguim.png" alt="Pinguim" width={120} height={34} className="object-contain brightness-0 invert" />
          </div>
          <span className="text-slate-500 text-sm">Nova Proposta</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Gerar Nova Proposta</h1>
          <p className="text-slate-400 text-sm">Configure os serviços e gere o link para o cliente.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT */}
          <div className="space-y-5">

            {/* 1. Nome + Unidades */}
            <div className="bg-[#0F1014] border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 bg-[#0047FF] rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">1</span>
                Nome do Restaurante
              </h2>
              <input type="text" value={restaurantName} onChange={e => setRestaurantName(e.target.value)}
                className="w-full bg-[#1A1A24]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#0047FF]/60 focus:ring-1 focus:ring-[#0047FF]/50 transition-all text-sm"
                placeholder="Ex: Burger House Salvador" />

              {/* Unidades */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm font-medium">Unidades <span className="text-slate-500 font-normal">(opcional)</span></p>
                    <p className="text-slate-600 text-xs mt-0.5">Número de unidades do cliente</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setUnits(u => Math.max(1, u - 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold flex items-center justify-center transition-colors text-lg leading-none">
                      −
                    </button>
                    <span className="text-white font-bold text-lg w-8 text-center">{units}</span>
                    <button onClick={() => setUnits(u => u + 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold flex items-center justify-center transition-colors text-lg leading-none">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Logo */}
            <div className="bg-[#0F1014] border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 bg-[#0047FF] rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">2</span>
                Logo do Cliente <span className="text-slate-500 font-normal">(opcional)</span>
              </h2>
              {logoPreview ? (
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium mb-1 truncate max-w-[160px]">{logoFile?.name}</p>
                    <p className="text-slate-500 text-xs mb-3">{logoFile ? (logoFile.size / 1024).toFixed(0) + ' KB' : ''}</p>
                    <button onClick={removeLogo} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 border border-red-400/20 px-3 py-1.5 rounded-lg transition-colors">
                      <X size={12} /> Remover
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-white/10 hover:border-[#0047FF]/40 rounded-xl p-6 flex flex-col items-center gap-3 transition-all group hover:bg-[#0047FF]/5">
                  <div className="w-10 h-10 bg-white/5 group-hover:bg-[#0047FF]/10 rounded-xl flex items-center justify-center transition-colors">
                    <ImagePlus size={20} className="text-slate-500 group-hover:text-[#0047FF] transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Clique para adicionar a logo</p>
                    <p className="text-slate-600 text-xs mt-1">PNG, JPG ou SVG · Máx. 2MB</p>
                  </div>
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoSelect} className="hidden" />
            </div>

            {/* 3. Plano */}
            <div className="bg-[#0F1014] border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 bg-[#0047FF] rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">3</span>
                Plano de Serviços
              </h2>
              <div className="space-y-3">
                {PLANS.map(p => (
                  <div key={p.id}>
                    <button onClick={() => setPlan(p.id)}
                      className={`w-full text-left flex items-start gap-3 px-4 py-3.5 rounded-xl border transition-all ${plan === p.id ? 'border-[#0047FF]/50 bg-[#0047FF]/8' : 'border-white/5 bg-[#1A1A24]/20 hover:border-white/10'}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${plan === p.id ? 'border-[#0047FF] bg-[#0047FF]' : 'border-white/20'}`}>
                        {plan === p.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${plan === p.id ? 'text-white' : 'text-slate-400'}`}>{p.label}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{p.description}</p>
                      </div>
                    </button>

                    {/* Serviços do plano selecionado */}
                    {plan === p.id && p.id !== 'personalizado' && (
                      <div className="mt-2 ml-4 pl-4 border-l-2 border-[#0047FF]/20 space-y-1.5">
                        {PINGUIM_SERVICES.map(s => (
                          <div key={s} className="flex items-center gap-2 text-xs text-slate-400 py-1">
                            <Check size={12} className="text-[#0047FF] shrink-0" /> {s}
                          </div>
                        ))}
                        {/* Marketplace sub-opções */}
                        {p.id === 'metodo_marketplace' && (
                          <div className="pt-2 space-y-1.5">
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Plataformas</p>
                            {(['ifood', '99food'] as const).map(mp => (
                              <button key={mp} onClick={() => setMarketplaces(prev => ({ ...prev, [mp]: !prev[mp] }))}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all ${marketplaces[mp] ? 'border-[#0047FF]/40 bg-[#0047FF]/5 text-white' : 'border-white/5 text-slate-500 hover:border-white/10'}`}>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${marketplaces[mp] ? 'bg-[#0047FF] border-[#0047FF]' : 'border-white/20'}`}>
                                  {marketplaces[mp] && <Check size={9} className="text-white" />}
                                </div>
                                {mp === 'ifood' ? 'iFood' : '99'}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Personalizado */}
                    {plan === p.id && p.id === 'personalizado' && (
                      <div className="mt-2 ml-4 pl-4 border-l-2 border-[#0047FF]/20 space-y-2">
                        {customServices.map((s, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input type="text" value={s} onChange={e => updateCustomService(i, e.target.value)}
                              className="flex-1 bg-[#1A1A24]/60 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[#0047FF]/60 text-xs"
                              placeholder={`Entrega ${i + 1}...`} />
                            {customServices.length > 1 && (
                              <button onClick={() => removeCustomService(i)} className="text-slate-600 hover:text-red-400 transition-colors p-1">
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button onClick={addCustomService}
                          className="flex items-center gap-1.5 text-xs text-[#0047FF] hover:text-[#003BCC] transition-colors py-1">
                          <Plus size={13} /> Adicionar entrega
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Investimento */}
            <div className="bg-[#0F1014] border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 bg-[#0047FF] rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">4</span>
                Investimento
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">Honorários mensais (R$)</label>
                  <input type="number" value={serviceValue || ''} onChange={e => setServiceValue(Number(e.target.value))}
                    className="w-full bg-[#1A1A24]/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0047FF]/60 focus:ring-1 focus:ring-[#0047FF]/50 transition-all text-sm" placeholder="0" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">Verba de Anúncios (pago pelo cliente)</label>
                  <input type="number" value={adValue || ''} onChange={e => setAdValue(Number(e.target.value))}
                    className="w-full bg-[#1A1A24]/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0047FF]/60 focus:ring-1 focus:ring-[#0047FF]/50 transition-all text-sm" placeholder="0" />
                </div>
              </div>
            </div>

            {/* 5. Prazo */}
            <div className="bg-[#0F1014] border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 bg-[#0047FF] rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">5</span>
                Prazo de Contrato
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[3, 6, 12].map(m => (
                  <button key={m} onClick={() => setContractDuration(m)}
                    className={`py-3 rounded-xl border text-sm font-semibold transition-all ${contractDuration === m ? 'bg-[#0047FF] border-[#0047FF] text-white shadow-[0_0_20px_rgba(0,71,255,0.3)]' : 'border-white/10 text-slate-400 hover:border-[#0047FF]/40 hover:text-white'}`}>
                    {m} meses
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Origem do Lead */}
            <div className="bg-[#0F1014] border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 bg-[#0047FF] rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">6</span>
                Origem do Lead <span className="text-slate-500 font-normal text-xs">(Uso interno)</span>
              </h2>
              <div className="flex flex-wrap gap-3 mb-3">
                {['Evento', 'Indicação', 'Tráfego', 'Conteúdo', 'Outro'].map(s => (
                  <button key={s} onClick={() => setLeadSource(s)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${leadSource === s ? 'bg-[#0047FF] border-[#0047FF] text-white shadow-[0_0_15px_rgba(0,71,255,0.3)]' : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white bg-white/5'}`}>
                    {s}
                  </button>
                ))}
              </div>
              {leadSource === 'Outro' && (
                <input type="text" value={customLeadSource} onChange={e => setCustomLeadSource(e.target.value)}
                  className="w-full bg-[#1A1A24]/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0047FF]/60 transition-all text-sm mt-2" placeholder="Digite a origem..." />
              )}
            </div>
          </div>

          {/* RIGHT: Resumo */}
          <div className="sticky top-24">
            <div className="bg-[#0F1014] border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-6 text-sm">Resumo da Proposta</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Restaurante</span>
                  <span className="text-white font-medium truncate max-w-[180px]">{restaurantName || '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Plano</span>
                  <span className="text-white font-medium">
                    {plan === 'metodo_pinguim' ? 'Método Pinguim' : plan === 'metodo_marketplace' ? 'Método + Marketplace' : 'Personalizado'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Prazo</span>
                  <span className="text-white">{contractDuration} meses</span>
                </div>
                {units > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Unidades</span>
                    <span className="text-white">{units} unidades</span>
                  </div>
                )}
                <div className="border-t border-white/5 pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Honorários</span>
                    <span className="text-white font-bold text-lg">{fmt(serviceValue)}</span>
                  </div>
                  {adValue > 0 && (
                    <div className="flex justify-between items-center bg-white/[0.03] rounded-xl px-3 py-2.5">
                      <p className="text-slate-400 text-xs">Verba de Anúncios</p>
                      <span className="text-slate-300 text-sm font-medium">{fmt(adValue)}</span>
                    </div>
                  )}
                </div>
              </div>

              {servicesList.length > 0 && (
                <div className="mb-6 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                  <p className="text-slate-500 text-xs mb-3 font-medium uppercase tracking-wider">Serviços incluídos</p>
                  <div className="space-y-2">
                    {servicesList.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0047FF] shrink-0" />
                        {s.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!generatedSlug ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    disabled={!restaurantName.trim()}
                    className="w-full flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 font-semibold py-3.5 rounded-xl transition-all text-sm"
                  >
                    <Eye size={16} /> Pré-visualizar Proposta
                  </button>
                  <button onClick={handleGenerate} disabled={loading || !restaurantName.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-[#0047FF] hover:bg-[#003BCC] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(0,71,255,0.3)] hover:shadow-[0_0_40px_rgba(0,71,255,0.5)]">
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Gerar Proposta'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
                    <p className="text-green-400 text-sm font-semibold">✅ Proposta gerada!</p>
                  </div>
                  <button onClick={handleCopy} className="w-full flex items-center justify-center gap-2 bg-[#0047FF] hover:bg-[#003BCC] text-white font-bold py-3.5 rounded-xl transition-all text-sm">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copiado!' : 'Copiar Link'}
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <a href={proposalUrl!} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 border border-[#0047FF]/30 bg-[#0047FF]/10 hover:bg-[#0047FF]/20 text-[#0047FF] font-semibold py-3 rounded-xl transition-all text-sm">
                      <ExternalLink size={14} /> Só Proposta
                    </a>
                    <a href={generatedSlug ? `/apresentacao/${generatedSlug}` : '/'} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold py-3 rounded-xl transition-all text-sm">
                      <ExternalLink size={14} /> Apresentação
                    </a>
                  </div>
                  <button onClick={() => router.push('/painel')} className="w-full text-slate-500 hover:text-slate-300 text-sm py-2 transition-colors">
                    ← Voltar ao Painel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE PRÉ-VISUALIZAÇÃO */}
      {showPreview && (
        <div className="fixed inset-0 z-[9999] bg-[#0D0D12]">
          {/* Botão de fechar flutuante */}
          <button
            onClick={() => setShowPreview(false)}
            className="fixed top-4 right-4 z-[10000] flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white font-semibold text-sm px-4 py-2.5 rounded-full transition-all shadow-xl"
          >
            <X size={16} /> Fechar Preview
          </button>

          {/* Badge de rascunho */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold px-4 py-2 rounded-full">
            👀 MODO RASCUNHO — não foi salvo
          </div>

          <ProposalViewer
            proposal={{
              slug: 'preview',
              restaurant_name: restaurantName || 'Nome do Restaurante',
              logo_url: logoPreview,
              service_value: serviceValue,
              ad_value: adValue,
              contract_duration: contractDuration,
              units,
            }}
            services={servicesList}
            whatsapp="#"
          />
        </div>
      )}
    </div>
  )
}
