'use server'
import {confirmedMetaClients} from '@/lib/confirmed-meta-clients'
import { metaFields, metaValue, metaMetrics, validateMetaQuery, type MetaQuery } from '@/lib/meta-query'
import { createClient } from '@/utils/supabase/server'

export type MetaCheck = {ok:boolean; message:string; checkedAt?:string; account?:string; currency?:string; timezone?:string; metrics?:{label:string; value:string}[]}
export async function checkVillaMeta(input:MetaQuery, accountId="901463374171335"):Promise<MetaCheck>{
 const db=await createClient();const {data:{user}}=await db.auth.getUser()
 if(!user)return {ok:false,message:'Entre novamente no painel.'}
 const {data:owner}=await db.from('proposals').select('id').eq('slug','7y3qope').eq('user_id',user.id).maybeSingle()
 if(!owner)return {ok:false,message:'Você não tem acesso a este piloto.'}
 if(!Object.prototype.hasOwnProperty.call(confirmedMetaClients,accountId))return {ok:false,message:'Conta não aprovada para consulta.'}
 const validation=validateMetaQuery(input)
 if(validation)return {ok:false,message:validation}
 const token=process.env.META_ADS_ACCESS_TOKEN?.trim()
 if(!token)return {ok:false,message:'Token não configurado nesta publicação. Confira a variável de produção na Vercel e publique novamente.'}
 const base=`https://graph.facebook.com/v25.0/act_${accountId}`
 const checkedAt=new Date().toISOString()
 async function read(url:string){
  const response=await fetch(url,{headers:{Authorization:`Bearer ${token}`},cache:'no-store',signal:AbortSignal.timeout(20000)})
  const body=await response.json()
  if(!response.ok||body.error){const code=Number(body.error?.code);throw new Error(code===190?'TOKEN':code===10||code===200?'PERMISSION':code===100?'ACCOUNT':code===4||code===17||code===32||code===613?'RATE':'META')}
  return body
 }
 try{
  const account=await read(`${base}?fields=account_id,name,currency,timezone_name`)
  if(account.account_id!==accountId)throw new Error('ACCOUNT')
  const query=new URLSearchParams({fields:metaFields(input.metrics),level:'account',time_range:JSON.stringify({since:input.since,until:input.until}),limit:'1'})
  const insights=await read(`${base}/insights?${query}`)
  const row=insights.data?.[0]
  if(row&&row.account_id!==accountId)throw new Error('ACCOUNT')
  const definitions=metaMetrics.filter(m=>input.metrics.includes(m.key))
  const metrics=row?definitions.map(({key,label})=>{const n=metaValue(row,key);return {label,value:n!==null?n.toLocaleString('pt-BR',{maximumFractionDigits:2})+(['spend','cpc','cpm','cost_per_purchase'].includes(key)?` ${account.currency}`:key==='ctr'?'%':key==='roas'?'×':''):'Não informado'}}):[]
  return {ok:true,message:row?'Leitura confirmada para o período selecionado. Os dados da planilha permanecem separados.':'Conta acessível, mas sem resultados retornados para o período selecionado.',checkedAt,account:String(account.name),currency:String(account.currency),timezone:String(account.timezone_name),metrics}
 }catch(error){
  const code=error instanceof Error?error.message:''
  const messages:Record<string,string>={TOKEN:'A Meta recusou o token: pode estar expirado, revogado ou inválido. Será necessário renovar a autorização.',PERMISSION:'A Meta negou a permissão de leitura. Precisamos conferir ads_read, o acesso do seu usuário à conta e o nível de acesso do aplicativo.',ACCOUNT:'A Meta não disponibilizou a conta esperada. Confira se este token pertence ao usuário com acesso à conta selecionada.',RATE:'A Meta limitou temporariamente as consultas. Aguarde antes de testar novamente.'}
  return {ok:false,checkedAt,message:messages[code]||'Não foi possível concluir a leitura na Meta. Nenhuma campanha ou dado da planilha foi alterado.'}
 }
}

export type MetaAccountList={ok:boolean;message:string;accounts:{id:string;name:string;currency:string;status:number;client:string|null}[];after?:string}
export async function listAuthorizedMetaAccounts(after?:string):Promise<MetaAccountList>{
 const empty={accounts:[]}
 const db=await createClient();const {data:{user}}=await db.auth.getUser()
 if(!user)return {...empty,ok:false,message:'Entre novamente no painel.'}
 const {data:owner}=await db.from('proposals').select('id').eq('slug','7y3qope').eq('user_id',user.id).maybeSingle()
 if(!owner)return {...empty,ok:false,message:'Você não tem acesso a esta autorização.'}
 const token=process.env.META_ADS_ACCESS_TOKEN?.trim()
 if(!token)return {...empty,ok:false,message:'A autorização do Meta não está configurada nesta publicação.'}
 if(after&&(typeof after!=='string'||after.length>4096))return {...empty,ok:false,message:'Paginação inválida.'}
 const query=new URLSearchParams({fields:'account_id,name,currency,account_status',limit:'100'})
 if(after)query.set('after',after)
 try{
 const response=await fetch(`https://graph.facebook.com/v25.0/me/adaccounts?${query}`,{headers:{Authorization:`Bearer ${token}`},cache:'no-store',signal:AbortSignal.timeout(20000)})
 const body=await response.json()
 if(!response.ok||body.error){const code=Number(body.error?.code);return {...empty,ok:false,message:code===190?'A autorização expirou ou foi revogada. Renove o token no servidor para consultar as contas.':code===10||code===200?'A Meta negou a consulta. Confira a permissão ads_read e os acessos do usuário.':'Não foi possível consultar as contas na Meta. Tente novamente.'}}
 const accounts=(Array.isArray(body.data)?body.data:[]).filter((a:{account_id?:string})=>/^\d+$/.test(a.account_id??'')).map((a:{account_id:string;name:string;currency:string;account_status:number})=>({id:a.account_id,name:String(a.name??''),currency:String(a.currency??''),status:Number(a.account_status),client:confirmedMetaClients[a.account_id]??null}))
 return {ok:true,message:accounts.length?'Contas visíveis para a autorização atual. Nenhuma métrica foi importada.':'Nenhuma conta retornada por esta autorização.',accounts,after:body.paging?.next?body.paging?.cursors?.after:undefined}
 }catch{return {...empty,ok:false,message:'A consulta não respondeu. Tente novamente. Nenhum dado foi importado.'}}
}
