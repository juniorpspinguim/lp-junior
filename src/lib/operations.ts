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
 const names=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']
 const months:Month[]=[]
 for(const row of rows.slice(5)){
  const match=row[0]?.trim().toLowerCase().match(/^([a-zç]+)\/(\d{2}|\d{4})$/)
  if(!match)continue
  const month=names.indexOf(match[1]);if(month<0)continue
  const year=match[2].length===2?2000+Number(match[2]):Number(match[2])
  const key=`${year}-${String(month+1).padStart(2,'0')}`
  if(months.some(m=>m.key===key))throw new Error('Período duplicado')
  months.push({key,label:`${names[month][0].toUpperCase()+names[month].slice(1)} de ${year}`,values:row.map(parseNumber)})
 }
 if(!months.length)throw new Error('Nenhum período encontrado')
 return months.sort((a,b)=>b.key.localeCompare(a.key))
}
export function formatValue(v:number|null|undefined,kind:Metric['kind']){if(v==null)return 'Não informado';return kind==='money'?v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}):v.toLocaleString('pt-BR',{maximumFractionDigits:2})+(kind==='percent'?'%':'')}
export function comparison(current:number|null|undefined,previous:number|null|undefined,kind:Metric['kind']){
 if(current==null||previous==null)return 'Sem comparação'
 if(kind==='percent'){const n=current-previous;return `${n>0?'+':''}${n.toLocaleString('pt-BR',{maximumFractionDigits:2})} p.p.`}
 if(previous===0)return current===0?'Sem variação':'Base anterior igual a zero'
 const n=(current-previous)/previous*100;return `${n>0?'+':''}${n.toLocaleString('pt-BR',{maximumFractionDigits:1})}%`
}

function escapeHtml(value:string) {
 return value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))
}
export function buildReportHtml(current:Month, previous:Month|undefined, version:string, notes:string, loadedAt:string, selected?:number[]) {
 const e=escapeHtml
 const marketing=version==='Marketing'
 const visible=groups.map(g=>({...g,metrics:g.metrics.filter(m=>(!marketing||!m.financial)&&(selected===undefined||selected.includes(m.index)))})).filter(g=>g.metrics.length)
 const highlights=(marketing?[groups[0].metrics[1],groups[0].metrics[3],groups[4].metrics[0],groups[4].metrics[4]]:[groups[5].metrics[4],groups[4].metrics[1],groups[4].metrics[0],groups[0].metrics[1]]).filter(m=>selected===undefined||selected.includes(m.index))
 const timestamp=loadedAt && Number.isFinite(Date.parse(loadedAt))?new Date(loadedAt).toLocaleString('pt-BR',{timeZone:'America/Bahia'}):'Não disponível'
 return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>Villa Bistrô — ${e(current.label)} — ${e(version)}</title><style>
*{box-sizing:border-box}body{margin:0;background:#090d17;color:#f4f7ff;font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif}main{max-width:1160px;margin:auto;padding:42px 24px}header{display:flex;justify-content:space-between;align-items:center;gap:20px;border-bottom:1px solid #263044;padding-bottom:22px}.brand{font-size:24px;font-weight:900;letter-spacing:2px}.muted{color:#9eaec6}.tag{font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#83b3ff}.hero{padding:52px 0 30px}h1{font-size:clamp(36px,7vw,64px);line-height:1.05;letter-spacing:-2px;margin:15px 0}h2{font-size:21px;margin:0 0 20px}p{margin:8px 0}.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:24px 0 32px}.card,.section{border:1px solid #283349;border-radius:20px;background:linear-gradient(135deg,#152039,#101622);padding:24px}.card p{font-size:13px;color:#aabbd5}.value{display:block;font-size:clamp(18px,2.7vw,27px);line-height:1.3;margin:14px 0;font-weight:700;overflow-wrap:anywhere}.delta{color:#9abfff;font-size:13px}.sections{display:grid;gap:22px}.section{background:#101724;min-width:0}.scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;text-align:left;font-size:14px}th{font-size:12px;color:#aabbd5;font-weight:500}th,td{padding:14px 12px;border-bottom:1px solid #253045}th:first-child,td:first-child{padding-left:0}td:last-child{color:#9abfff}tr:last-child td{border:0}.notice{padding:18px 22px;border:1px solid #615431;background:#242114;border-radius:14px;color:#e4d6ad;font-size:14px;margin-bottom:24px}.analysis{white-space:pre-wrap;overflow-wrap:anywhere;color:#d8e3f4}.section.analysis-section{margin-top:28px;border-top:3px solid #3975ff}footer{margin-top:32px;padding-top:22px;border-top:1px solid #263044;font-size:12px;color:#95a5bc}.period{color:#c4d5ee;font-size:18px}@media(max-width:700px){main{padding:24px 16px}.cards{grid-template-columns:repeat(2,minmax(0,1fr))}.card,.section{padding:18px}header{align-items:flex-start;flex-direction:column}.hero{padding-top:30px}table{min-width:570px}.value{font-size:21px}}@media(max-width:360px){.cards{grid-template-columns:1fr}}@media print{body{background:white;color:#111}.card,.section{background:white;color:#111;break-inside:avoid}.muted,.analysis,.period,footer{color:#333}}
</style></head><body><main>
<header><div class="brand">PINGUIM<span class="tag" style="display:block;font-size:9px;letter-spacing:1px">Marketing para restaurantes</span></div><span class="tag">Relatório ${marketing?'de marketing':'de resultados'}</span></header>
<section class="hero"><p class="tag">Acompanhamento mensal</p><h1>Villa Bistrô</h1><p class="period">${e(current.label)}</p><p class="muted">Comparativo com ${e(previous?.label??'período não selecionado')}</p></section>
${!marketing&&current.values[56]==null?'<div class="notice"><strong>Fechamento financeiro pendente.</strong> O faturamento total do restaurante não foi informado na fonte. Os resultados disponíveis abaixo não representam o total da operação.</div>':''}
<div class="cards">${highlights.map(m=>`<article class="card"><p>${e(m.label)}</p><strong class="value">${e(formatValue(current.values[m.index],m.kind))}</strong><span class="delta">${e(comparison(current.values[m.index],previous?.values[m.index],m.kind))}</span></article>`).join('')}</div>
<div class="sections">${visible.map(g=>`<section class="section"><h2>${e(g.title)}</h2><div class="scroll"><table><thead><tr><th scope="col">Indicador</th><th scope="col">${e(current.label)}</th><th scope="col">${e(previous?.label??'Comparativo')}</th><th scope="col">Variação</th></tr></thead><tbody>${g.metrics.map(m=>`<tr><th scope="row">${e(m.label)}</th><td>${e(formatValue(current.values[m.index],m.kind))}</td><td>${e(formatValue(previous?.values[m.index],m.kind))}</td><td>${e(comparison(current.values[m.index],previous?.values[m.index],m.kind))}</td></tr>`).join('')}</tbody></table></div></section>`).join('')}</div>
${notes.trim()?`<section class="section analysis-section"><p class="tag">Leitura do mês</p><h2>Análise e próximos passos</h2><div class="analysis">${e(notes.trim())}</div></section>`:''}
<footer><p>Fonte: planilha de acompanhamento do Villa · Dados consultados em ${e(timestamp)} (horário da Bahia).</p><p>Este arquivo preserva os dados do momento da exportação. Não é atualizado automaticamente.</p><p>Campos não informados não representam zero. Variações de taxas em pontos percentuais. Pedidos do cardápio não representam todos os pedidos do restaurante.</p></footer>
</main></body></html>`
}
