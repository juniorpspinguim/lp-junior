import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import ProposalTrashButton from '@/components/ProposalTrashButton'
import { proposalReference } from '@/lib/proposal-reference'
export const dynamic = 'force-dynamic'
export default async function TrashPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data, error } = await supabase.from('proposals').select('*').eq('user_id', user.id).not('deleted_at', 'is', null).order('deleted_at', {ascending:false})
  return <main className="min-h-screen bg-[#0D0D12] px-6 py-12"><div className="max-w-4xl mx-auto">
    <Link href="/painel" className="text-sm text-blue-400">← Voltar ao painel</Link>
    <h1 className="text-4xl font-bold mt-8 flex items-center gap-3"><Trash2 className="text-blue-400"/>Lixeira</h1>
    <p className="text-slate-400 mt-3 mb-8">Propostas descartadas ficam aqui até você restaurá-las. Enquanto estiverem na lixeira, os links públicos ficam indisponíveis.</p>
    {error ? <p role="alert" className="rounded-xl border border-amber-500/20 p-6 text-amber-300">Não foi possível carregar a lixeira. Verifique se a atualização do banco foi aplicada.</p> : !data?.length ? <p className="rounded-2xl border border-white/10 p-12 text-center text-slate-400">Sua lixeira está vazia.</p> : <div className="divide-y divide-white/10 rounded-2xl border border-white/10">{data.map(p => <article key={p.id} className="p-6 flex flex-wrap gap-4 items-center justify-between"><div><p className="text-blue-400 text-xs mb-1">Proposta {proposalReference(p)}</p><h2 className="text-lg font-semibold">{p.restaurant_name}</h2><p className="text-xs text-slate-500 mt-2">Descartada em {new Date(p.deleted_at).toLocaleDateString('pt-BR', {timeZone:'America/Bahia'})}</p></div><ProposalTrashButton id={p.id} restore/></article>)}</div>}
    <p className="text-xs text-slate-500 mt-6">Restaurar mantém o número, os valores e os links originais. Propostas apagadas definitivamente antes da criação da lixeira não aparecem aqui.</p>
  </div></main>
}
