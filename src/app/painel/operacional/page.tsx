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
const source071='https://docs.google.com/spreadsheets/d/1M1v_M3Paorlk2UP1kwcrcdv4o5a5H6GzBd_xcEMyT8o/edit'
function read071History():Pilot {
 const raw=process.env.OPERATIONS_071_HISTORY
 if(!raw)throw new Error('Histórico não configurado')
 const data=JSON.parse(raw) as Pilot
 if(!Array.isArray(data.months)||!data.months.length||typeof data.loadedAt!=='string'||!Number.isFinite(Date.parse(data.loadedAt)))throw new Error('Histórico inválido')
 const seen=new Set<string>()
 for(const month of data.months){
  if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month.key)||seen.has(month.key)||typeof month.label!=='string'||!Array.isArray(month.values)||month.values.length!==57||month.values.some(value=>value!==null&&(typeof value!=='number'||!Number.isFinite(value))))throw new Error('Mês inválido')
  seen.add(month.key)
 }
 return {months:data.months,loadedAt:data.loadedAt,sourceMode:'snapshot'}
}
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
 if(owner){
  const client=clients.find(c=>c.id==='meta-269412715465914')
  if(client){
   const context={clientName:'071 Burger',source:source071,defaultPeriod:'2026-09'}
   try{client.pilot={...read071History(),...context}}catch{client.pilot={months:[],loadedAt:'',...context,error:'O histórico importado da 071 não está disponível. Verifique a configuração no servidor.'}}
  }
 }
 const names=new Set(clients.map(c=>c.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()))
 for(const row of [...(proposals.data??[]).map(p=>({id:p.slug,name:p.restaurant_name,slug:p.slug})),...(contacts.data??[]).map(c=>({id:c.id,name:c.restaurant_name,slug:c.proposal_slug}))]){
  const name=row.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()
  if(row.slug==='7y3qope'&&owner||names.has(name))continue
  names.add(name);clients.push({id:row.id,name:row.name})
 }
 return <OperationsPortfolio clients={clients} error={contacts.error||proposals.error?'Não foi possível carregar toda a carteira. Tente atualizar a página.':undefined}/>
}
