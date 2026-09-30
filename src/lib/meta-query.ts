export const metaMetrics = [
 {key:'spend',label:'Investimento'}, {key:'reach',label:'Alcance'},
 {key:'impressions',label:'Impressões'}, {key:'frequency',label:'Frequência'},
 {key:'clicks',label:'Cliques totais'}, {key:'cpc',label:'CPC'},
 {key:'cpm',label:'CPM'}, {key:'ctr',label:'CTR'},
] as const
export type MetaQuery = {since:string;until:string;metrics:string[]}
export function validateMetaQuery(input:MetaQuery){
 const validDate=(value:string)=> typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,10)===value
 if(!input||!validDate(input.since)||!validDate(input.until))return 'Escolha datas válidas.'
 if(input.since>input.until)return 'A data inicial deve vir antes da data final.'
 if(!Array.isArray(input.metrics)||!input.metrics.length||input.metrics.length>metaMetrics.length||input.metrics.some(key=>!metaMetrics.some(m=>m.key===key)))return 'Selecione pelo menos uma das métricas disponíveis.'
 return null
}
