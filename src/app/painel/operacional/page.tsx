import {confirmedMetaClients} from '@/lib/confirmed-meta-clients'
import { unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import OperationsPortfolio, { type OperationsClient } from '@/components/OperationsPortfolio'
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
 const [contacts,proposals]=await Promise.all([
  db.from('crm_contacts').select('id,restaurant_name,proposal_slug').eq('user_id',user.id).eq('stage','ganho'),
  db.from('proposals').select('slug,restaurant_name').eq('user_id',user.id).eq('status','approved').is('deleted_at',null)
 ])
 const clients:OperationsClient[]=owner?Object.entries(confirmedMetaClients).map(([accountId,name])=>accountId==='901463374171335'?{id:'villa',name,pilot}:{id:`meta-${accountId}`,name}):[]
 const names=new Set(clients.map(c=>c.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()))
 for(const row of [...(proposals.data??[]).map(p=>({id:p.slug,name:p.restaurant_name,slug:p.slug})),...(contacts.data??[]).map(c=>({id:c.id,name:c.restaurant_name,slug:c.proposal_slug}))]){
  const name=row.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()
  if(row.slug==='7y3qope'&&owner||names.has(name))continue
  names.add(name);clients.push({id:row.id,name:row.name})
 }
 return <OperationsPortfolio clients={clients} error={contacts.error||proposals.error?'Não foi possível carregar toda a carteira. Tente atualizar a página.':undefined}/>
}
