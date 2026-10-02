import Link from 'next/link'
import {listAuthorizedMetaAccounts} from '../meta-actions'
export const dynamic='force-dynamic'
export default async function MetaAccountsPage({searchParams}:{searchParams:Promise<{after?:string}>}){
 const {after}=await searchParams
 const result=await listAuthorizedMetaAccounts(after)
 return <main className="min-h-screen bg-[#090c13] p-8 text-white"><div className="mx-auto max-w-5xl"><Link href="/painel/operacional" className="text-blue-300">← Operacional</Link><h1 className="mt-8 text-3xl font-semibold">Contas autorizadas no Meta</h1><p className="my-5 text-slate-400">Consulta somente de identificação. Nenhuma métrica é importada e nenhuma campanha é alterada.</p><p role="status" className={result.ok?'text-blue-200':'text-amber-200'}>{result.message}</p><div className="mt-6 overflow-auto"><table className="w-full text-left"><thead><tr><th className="p-3">Cliente identificado</th><th className="p-3">Nome</th><th className="p-3">ID da conta</th><th className="p-3">Moeda</th></tr></thead><tbody>{result.accounts.map(a=><tr key={a.id} className="border-t border-white/10"><td className="p-3"><span className={a.client?'text-emerald-300':'text-slate-500'}>{a.client??'Não selecionada'}</span></td><td className="p-3">{a.name}</td><td className="p-3">{a.id}</td><td className="p-3">{a.currency}</td></tr>)}</tbody></table></div>{result.after&&<Link href={{pathname:'/painel/operacional/contas-meta',query:{after:result.after}}} className="mt-6 inline-block text-blue-300">Próxima página →</Link>}</div></main>
}
