export const metaMetrics = [
 {key:'spend',label:'Investimento'}, {key:'reach',label:'Alcance'},
 {key:'impressions',label:'Impressões'}, {key:'frequency',label:'Frequência'},
 {key:'clicks',label:'Cliques totais'}, {key:'cpc',label:'CPC'},
 {key:'cpm',label:'CPM'}, {key:'ctr',label:'CTR'},
 {key:'landing_page_view',label:'Visualizações da página de destino'},
 {key:'purchases',label:'Compras'}, {key:'cost_per_purchase',label:'Custo por compra'},
 {key:'roas',label:'ROAS'},
] as const
export type MetaQuery = {since:string;until:string;metrics:string[]}
export function validateMetaQuery(input:MetaQuery){
 const validDate=(value:string)=> typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,10)===value
 if(!input||!validDate(input.since)||!validDate(input.until))return 'Escolha datas válidas.'
 if(input.since>input.until)return 'A data inicial deve vir antes da data final.'
 if(!Array.isArray(input.metrics)||!input.metrics.length||input.metrics.length>metaMetrics.length||input.metrics.some(key=>!metaMetrics.some(m=>m.key===key)))return 'Selecione pelo menos uma das métricas disponíveis.'
 return null
}


const actionFields:Record<string,string>={landing_page_view:'actions',purchases:'actions',cost_per_purchase:'cost_per_action_type',roas:'purchase_roas'}
export function metaFields(keys:string[]){return [...new Set(['account_id',...keys.map(key=>actionFields[key]||key)])].join(',')}
export function metaValue(row:Record<string,unknown>,key:string):number|null{
 let value:unknown=row[key]
 if(actionFields[key]){
  const list=row[actionFields[key]]
  if(!Array.isArray(list))return null
  // Aggregate purchase events overlap with website/app events: never sum them.
  const type=key==='landing_page_view'?'landing_page_view':'omni_purchase'
  value=list.find(item=>item.action_type===type)?.value
 }
 if(value===null||value===undefined||value==='')return null
 const n=Number(value)
 return Number.isFinite(n)?n:null
}
