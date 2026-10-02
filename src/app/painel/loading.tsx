import Link from 'next/link'
export default function LoadingPanel(){
 return <main aria-busy="true" className="min-h-screen bg-[#090c13] p-8 text-white"><nav className="mb-10 flex gap-6 text-sm text-blue-300"><Link href="/painel">Painel</Link><Link href="/painel/comercial">Comercial</Link><Link href="/painel/operacional">Operacional</Link></nav><p role="status" className="mb-6 text-slate-400">Carregando seus dados…</p><div aria-hidden="true" className="grid gap-5 md:grid-cols-3">{[1,2,3].map(i=><div key={i} className="h-36 animate-pulse rounded-2xl border border-white/10 bg-white/5"/>)}</div></main>
}
