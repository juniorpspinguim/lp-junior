import { unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import OperationsWorkspace from '@/components/OperationsWorkspace'
import { parseMonths, type Pilot } from '@/lib/operations'
export const dynamic = 'force-dynamic'
const readVillaSheet=unstable_cache(async()=>{
 const response=await fetch('https://docs.google.com/spreadsheets/d/1W9SPeyrA9NHn7qnLeB6Kmw7TsAmGqZqs7sf54CijmzU/export?format=csv&gid=0',{cache:'no-store',signal:AbortSignal.timeout(15000)})
 if(!response.ok)throw new Error('Fonte indisponível')
 return {months:parseMonths(await response.text()),loadedAt:new Date().toISOString()}
},['villa-operations-sheet'],{revalidate:60,tags:['villa-operations-sheet']})
export default async function OperationsPage() {
 const db=await createClient(); const {data:{user}}=await db.auth.getUser()
 if(!user)redirect('/login')
 // The pilot belongs to the owner of the existing commercial workspace.
 const {data:owner}=await db.from('proposals').select('id').eq('slug','7y3qope').eq('user_id',user.id).maybeSingle()
 let pilot:Pilot={months:[],loadedAt:'',error:'Este piloto não está disponível para sua conta.'}
 if(owner){try{
 pilot=await readVillaSheet()
 }catch{pilot={months:[],loadedAt:'',error:'Não foi possível ler a planilha do Villa. Tente atualizar novamente. Nenhum dado foi substituído por zero.'}}}
 return <OperationsWorkspace pilot={pilot}/>
}
