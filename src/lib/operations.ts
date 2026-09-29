export type Metric = {label:string; index:number; kind:'number'|'money'|'percent'; financial?:boolean}
export type Month = {key:string; label:string; values:(number|null)[]}
export type Pilot = {months:Month[]; loadedAt:string; error?:string}
export const sourceUrl = 'https://docs.google.com/spreadsheets/d/1W9SPeyrA9NHn7qnLeB6Kmw7TsAmGqZqs7sf54CijmzU/edit?gid=0'
export const groups:{title:string; metrics:Metric[]}[] = [
{title:'Instagram',metrics:[{label:'Seguidores',index:3,kind:'number'},{label:'Seguidores ganhos',index:4,kind:'number'},{label:'Alcance',index:5,kind:'number'},{label:'Visitas ao perfil',index:7,kind:'number'}]},
{title:'Meta Ads',metrics:[{label:'Investimento',index:10,kind:'money',financial:true},{label:'Alcance',index:11,kind:'number'},{label:'Impressões',index:12,kind:'number'},{label:'Cliques totais',index:15,kind:'number'},{label:'CPC total',index:16,kind:'money',financial:true},{label:'CTR',index:17,kind:'percent'}]},
{title:'Google Ads',metrics:[{label:'Investimento',index:18,kind:'money',financial:true},{label:'Impressões',index:19,kind:'number'},{label:'Cliques',index:20,kind:'number'}]},
{title:'Google Meu Negócio',metrics:[{label:'Interações',index:21,kind:'number'},{label:'Visualizações',index:22,kind:'number'},{label:'Pesquisas',index:23,kind:'number'},{label:'Chamadas',index:24,kind:'number'},{label:'Rotas',index:25,kind:'number'},{label:'Site / cardápio',index:26,kind:'number'}]},
{title:'Cardápio digital',metrics:[{label:'Pedidos',index:27,kind:'number'},{label:'Faturamento',index:29,kind:'money',financial:true},{label:'Ticket médio',index:30,kind:'money',financial:true},{label:'Visitas',index:31,kind:'number'},{label:'Conversão',index:33,kind:'percent'}]},
{title:'Outros canais e total',metrics:[{label:'Faturamento 99Food',index:42,kind:'money',financial:true},{label:'Faturamento iFood',index:44,kind:'money',financial:true},{label:'Faturamento salão',index:49,kind:'money',financial:true},{label:'Pedidos totais',index:54,kind:'number'},{label:'Faturamento total',index:56,kind:'money',financial:true}]}
]
export function parseCsv(text:string):string[][] {
 const rows:string[][]=[]; let row:string[]=[]; let cell=''; let quoted=false
 for(let i=0;i<text.length;i++){const c=text[i]; if(c==='"'){if(quoted && text[i+1]==='"'){cell+='"';i++}else quoted=!quoted} else if(c===','&&!quoted){row.push(cell);cell=''}else if(c==='\n'&&!quoted){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell=''}else cell+=c}
 if(cell||row.length){row.push(cell.replace(/\r$/,''));rows.push(row)} return rows
}
export function parseNumber(value:string|undefined):number|null {
 if(!value?.trim() || value.trim()==='-') return null
 const clean=value.replace(/R\$|%|\s/g,'').replace(/\./g,'').replace(',','.')
 if(!/^-?\d+(\.\d+)?$/.test(clean)) return null
 const n=Number(clean); return Number.isFinite(n)?n:null
}
export function parseMonths(csv:string):Month[]{
 const rows=parseCsv(csv)
 if(rows[4]?.[0]!=='PERIODO'||rows[4]?.[29]!=='RECEITA'||rows[4]?.[56]!=='RECEITA'||rows[0]?.[27]!=='CARDÁPIO DIGITAL'||rows[0]?.[52]!=='RESULTADO TOTAL') throw new Error('Formato da planilha alterado')
 return [{key:'2026-08',label:'Agosto de 2026',source:'agosto/26'},{key:'2026-07',label:'Julho de 2026',source:'julho/26'},{key:'2025-08',label:'Agosto de 2025',source:'agosto/25'}].map(p=>{const matches=rows.filter(r=>r[0]===p.source);if(matches.length!==1)throw new Error('Período ausente ou duplicado');return {key:p.key,label:p.label,values:matches[0].map(parseNumber)}})
}
export function formatValue(v:number|null|undefined,kind:Metric['kind']){if(v==null)return 'Não informado';return kind==='money'?v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}):v.toLocaleString('pt-BR',{maximumFractionDigits:2})+(kind==='percent'?'%':'')}
export function comparison(current:number|null|undefined,previous:number|null|undefined,kind:Metric['kind']){
 if(current==null||previous==null)return 'Sem comparação'
 if(kind==='percent'){const n=current-previous;return `${n>0?'+':''}${n.toLocaleString('pt-BR',{maximumFractionDigits:2})} p.p.`}
 if(previous===0)return current===0?'Sem variação':'Base anterior igual a zero'
 const n=(current-previous)/previous*100;return `${n>0?'+':''}${n.toLocaleString('pt-BR',{maximumFractionDigits:1})}%`
}
