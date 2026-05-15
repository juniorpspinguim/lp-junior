export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LogOut, PlusCircle, CheckCircle2, XCircle, Clock, FileText, LayoutDashboard, Settings, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { deleteProposal } from './actions'

type Proposal = {
  id: string
  created_at: string
  restaurant_name: string
  services: { id: string; name: string }[]
  service_value: number
  ad_value: number
  contract_duration: number
  status: 'pending' | 'approved' | 'rejected'
  slug: string
}

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const statusConfig = {
  pending:  { label: 'Aguardando', icon: Clock,        color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  approved: { label: 'Aprovada',   icon: CheckCircle2, color: 'text-green-400  bg-green-400/10  border-green-400/20'  },
  rejected: { label: 'Recusada',   icon: XCircle,      color: 'text-red-400    bg-red-400/10    border-red-400/20'    },
}

export default async function PainelPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) redirect('/login')

  const { data: proposals } = await supabase
    .from('proposals')
    .select('*')
    .order('created_at', { ascending: false })

  const list     = (proposals ?? []) as Proposal[]
  const total    = list.length
  const approved = list.filter(p => p.status === 'approved').length
  const rejected = list.filter(p => p.status === 'rejected').length
  const pending  = list.filter(p => p.status === 'pending').length
  const rate     = total > 0 ? Math.round((approved / total) * 100) : 0

  return (
    <div className="min-h-screen bg-[#0D0D12] font-sans flex">

      {/* ── SIDEBAR ── */}
      <aside className="fixed top-0 left-0 h-full w-60 bg-[#0A0A0F] border-r border-white/5 flex flex-col z-50">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5">
          <Image src="/logo-pinguim.png" alt="Pinguim" width={120} height={34} className="object-contain brightness-0 invert" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {/* Dashboard (ativo) */}
          <Link
            href="/painel"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0047FF]/10 border border-[#0047FF]/20 text-[#0047FF] font-semibold text-sm transition-all"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>

          {/* Admin */}
          <Link
            href="/painel/admin"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-all"
          >
            <Settings size={16} />
            Administração
          </Link>

          {/* Nova Proposta — botão de destaque */}
          <div className="pt-4">
            <Link
              href="/painel/nova-proposta"
              className="flex items-center justify-center gap-2 w-full bg-[#0047FF] hover:bg-[#003BCC] text-white font-bold px-4 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(0,71,255,0.25)] hover:shadow-[0_0_30px_rgba(0,71,255,0.45)] text-sm"
            >
              <PlusCircle size={16} /> Nova Proposta
            </Link>
          </div>
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-white/5">
          <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 mb-2">
            <p className="text-white text-xs font-semibold truncate">Junior PS</p>
            <p className="text-slate-500 text-xs truncate mt-0.5">{data.user.email}</p>
          </div>
          <form action="/auth/signout" method="post">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 font-medium text-sm transition-all">
              <LogOut size={16} />
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="ml-60 flex-1 px-8 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-slate-400 text-sm">Acompanhe suas propostas comerciais.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total',         value: total,      color: 'text-white',     bg: 'bg-white/5'         },
            { label: 'Aprovadas',     value: approved,   color: 'text-green-400', bg: 'bg-green-400/5'    },
            { label: 'Recusadas',     value: rejected,   color: 'text-red-400',   bg: 'bg-red-400/5'      },
            { label: 'Taxa de Aprv.', value: `${rate}%`, color: 'text-[#0047FF]', bg: 'bg-[#0047FF]/5'    },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} border border-white/5 rounded-2xl p-5`}>
              <p className="text-slate-500 text-xs mb-2">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Proposals List */}
        <div className="bg-[#0F1014] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
            <FileText size={16} className="text-[#0047FF]" />
            <h2 className="text-white font-semibold text-sm">Histórico de Propostas</h2>
          </div>

          {list.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-slate-600" />
              </div>
              <p className="text-slate-500 mb-2">Nenhuma proposta gerada ainda.</p>
              <Link href="/painel/nova-proposta" className="text-[#0047FF] text-sm hover:underline">
                Criar primeira proposta →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {list.map(p => {
                const s = statusConfig[p.status]
                const Icon = s.icon
                const date = new Date(p.created_at).toLocaleDateString('pt-BR')
                return (
                  <div key={p.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{p.restaurant_name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {date} · {p.contract_duration} meses · {p.services?.length ?? 0} serviços
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[#0047FF] font-bold text-sm whitespace-nowrap">
                        {fmt(p.service_value + p.ad_value)}/mês
                      </span>
                      <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${s.color}`}>
                        <Icon size={12} /> {s.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`/proposta/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0047FF] bg-[#0047FF]/10 hover:bg-[#0047FF]/20 transition-colors text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap"
                        >
                          Só Proposta
                        </a>
                          <a
                            href={`/apresentacao/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 bg-white/5 hover:bg-white/10 transition-colors text-xs border border-white/10 px-3 py-1.5 rounded-lg whitespace-nowrap"
                          >
                            Apresentação
                          </a>
                          <form action={deleteProposal.bind(null, p.id)}>
                            <button
                              type="submit"
                              className="text-red-400 bg-red-400/10 hover:bg-red-400/20 transition-colors p-1.5 rounded-lg flex items-center justify-center"
                              title="Apagar Proposta"
                            >
                              <Trash2 size={16} />
                            </button>
                          </form>
                        </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
