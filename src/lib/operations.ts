import { reportBrand } from './report-brand.js'
export type Metric = {label:string; index:number; kind:'number'|'money'|'percent'; financial?:boolean}
export type Month = {key:string; label:string; values:(number|null)[]}
export type Pilot = {months:Month[]; loadedAt:string; error?:string; clientName?:string; source?:string; warnings?:Record<string,string>; defaultPeriod?:string; sourceMode?:'snapshot'}
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
export function buildReportHtml(current:Month, previous:Month|undefined, version:string, notes:string, loadedAt:string, selected?:number[], clientName="Villa Bistrô") {
 const e=escapeHtml
 const [year,month]=current.key.split('-').map(Number)
 const nextDate=new Date(Date.UTC(year,month,1))
 const nextLabel=nextDate.toLocaleDateString('pt-BR',{month:'long',year:'numeric',timeZone:'UTC'})
 const monthName=current.label.split(' de ')[0]
 const nextMonthName=nextDate.toLocaleDateString('pt-BR',{month:'long',timeZone:'UTC'})
 const suggestions=nextDate.getUTCMonth()===8?[['07/09 · Independência','Preparar um combo para compartilhar e comunicar horários e reservas com antecedência.'],['15/09 · Dia do Cliente','Testar um benefício no canal próprio para quem já comprou, com prazo e regras claros.'],['Durante setembro · Oferta e retorno','Revisar combos e adicionais, validar a margem e acompanhar pedidos, ticket médio e recompra.']]:[['Calendário local','Selecionar datas e eventos relevantes para o público do restaurante antes de definir a campanha.'],['Oferta do mês','Escolher um combo ou adicional, validar margem e estoque e alinhar divulgação e atendimento.'],['Retorno do cliente','Planejar um novo contato ou benefício de recompra e acompanhar os resultados.']]
 const marketing=version==='Marketing'
 const visible=groups.map(g=>({...g,metrics:g.metrics.filter(m=>(!marketing||!m.financial)&&(selected===undefined||selected.includes(m.index)))})).filter(g=>g.metrics.length)
 const highlights=(marketing?[groups[0].metrics[1],groups[0].metrics[3],groups[4].metrics[0],groups[4].metrics[4]]:[groups[5].metrics[4],groups[4].metrics[1],groups[4].metrics[0],groups[0].metrics[1]]).filter(m=>selected===undefined||selected.includes(m.index))
 const timestamp=loadedAt && Number.isFinite(Date.parse(loadedAt))?new Date(loadedAt).toLocaleString('pt-BR',{timeZone:'America/Bahia'}):'Não disponível'
 const restaurantArt=`<svg viewBox="0 0 500 440" role="img" aria-label="Ilustração de um restaurante conectado aos seus canais digitais"><defs><linearGradient id="art-glow" x2="1" y2="1"><stop stop-color="#3b82f6"/><stop offset="1" stop-color="#27d3c2"/></linearGradient></defs><circle cx="250" cy="220" r="182" fill="#163764" opacity=".4"/><circle cx="250" cy="220" r="150" fill="none" stroke="#548af6" stroke-dasharray="4 10" opacity=".5"/><path d="M120 205L155 133H345L380 205Z" fill="url(#art-glow)"/><path d="M140 212V350H360V212" fill="#12253d" stroke="#6b9cdd" stroke-width="2"/><path d="M120 205Q146 243 172 205Q198 243 224 205Q250 243 276 205Q302 243 328 205Q354 243 380 205" fill="#498bf9"/><rect x="170" y="255" width="80" height="65" rx="5" fill="#82cfff" opacity=".35"/><rect x="276" y="253" width="50" height="97" rx="6" fill="#2d527b"/><circle cx="316" cy="303" r="3" fill="#cae8ff"/><path d="M100 351H400" stroke="#78a9ef" stroke-width="3"/><rect x="194" y="86" width="112" height="35" rx="17" fill="#2464c5"/><text x="250" y="109" text-anchor="middle" fill="white" font-size="12" font-family="sans-serif" letter-spacing="3">RESTAURANTE</text><g fill="#132743" stroke="#548bf5" stroke-width="2"><rect x="28" y="123" width="67" height="67" rx="20"/><rect x="396" y="89" width="67" height="67" rx="20"/><rect x="391" y="279" width="67" height="67" rx="20"/></g><g fill="none" stroke="#96c7ff" stroke-width="3"><path d="M48 164V151M61 164V140M74 164V132"/><path d="M411 116H448V139H411ZM416 111H443"/><circle cx="425" cy="306" r="9"/><path d="M411 332Q425 313 439 332"/></g><path d="M95 157L128 174M395 129L365 161M390 311L364 301" stroke="#5d96ee" stroke-width="2" stroke-dasharray="5 5"/></svg>`
 const card=(m:Metric)=>`<article class="card"><p class="muted">${e(m.index===29?'Receita do cardápio':m.index===27?'Pedidos do cardápio':m.label)}</p><strong class="value">${e(formatValue(current.values[m.index],m.kind))}</strong>${previous?`<span class="delta">${e(comparison(current.values[m.index],previous.values[m.index],m.kind))}</span><small>em relação ao período comparado</small>`:""}</article>`
 const block=(g:typeof groups[number])=>{
  const preferred=g.title==='Outros canais e total'?[56,49]:g.title==='Meta Ads'?[15,16]:g.title==='Google Ads'?[20,18]:g.title==='Instagram'?[4,7]:g.title==='Cardápio digital'?[27,33]:[21,25]
  const chart=preferred.map(index=>g.metrics.find(m=>m.index===index)).filter((m):m is Metric=>!!m).map(m=>{
   const a=previous?.values[m.index],b=current.values[m.index]
   const max=Math.max(a??0,b??0,1)
   return `<div class="chart"><div class="chart-heading"><p class="tag">${e(m.label)}</p>${previous?`<span class="delta">${e(comparison(b,a,m.kind))}</span>`:""}</div>${[...(previous?[{label:previous.label,value:a}]:[]),{label:current.label,value:b}].map((v,i)=>`<div class="bar-label"><span>${e(v.label)}</span><strong>${e(formatValue(v.value,m.kind))}</strong></div><div class="track"><div class="bar ${!previous||i?'now':''}" style="width:${v.value==null?0:Math.max(0,v.value)/max*100}%"></div></div>`).join('')}</div>`
  }).join('')
  return `<article class="panel"><h2>${e(g.title)}</h2>${chart}<details class="metric-details"><summary>Explorar todos os indicadores</summary><div class="scroll"><table><thead><tr><th>Indicador</th>${previous?`<th>${e(previous.label)}</th>`:""}<th>${e(current.label)}</th>${previous?"<th>Variação</th>":""}</tr></thead><tbody>${g.metrics.map(m=>`<tr><th scope="row">${e(m.label)}</th>${previous?`<td>${e(formatValue(previous.values[m.index],m.kind))}</td>`:""}<td>${e(formatValue(current.values[m.index],m.kind))}</td>${previous?`<td class="delta">${e(comparison(current.values[m.index],previous.values[m.index],m.kind))}</td>`:""}</tr>`).join('')}</tbody></table></div></details></article>`
 }
 const chapters=[
 {id:'presenca',label:'Presença',title:'Ser visto. Ser lembrado.',subtitle:'Como o restaurante apareceu e despertou interesse.',names:['Instagram','Google Meu Negócio']},
 {id:'aquisicao',label:'Aquisição',title:'A atenção que chega até você.',subtitle:'Investimento, alcance e cliques dos canais de mídia.',names:['Meta Ads','Google Ads']},
 {id:'vendas',label:'Vendas',title:marketing?'Do interesse ao pedido.':'Os resultados da operação.',subtitle:'O desempenho do cardápio e dos canais de venda.',names:['Cardápio digital','Outros canais e total']}
 ].map(c=>({...c,items:visible.filter(g=>c.names.includes(g.title))})).filter(c=>c.items.length)
 const pages=[{id:'capa',label:'Capa'},{id:'resumo',label:'Resumo'},...chapters.map(c=>({id:c.id,label:c.label})),{id:'direcao',label:'Próximos passos'}]
 const foot=(i:number)=>`<div class="page-foot"><span>${e(clientName)} · ${e(current.label)}</span><span>${String(i).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')}</span></div>`
 return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>${e(clientName)} — ${e(current.label)} — ${e(version)}</title><style>
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:76px}body{margin:0;background:#090c13;color:#f7f9ff;font:15px/1.6 system-ui,-apple-system,Segoe UI,sans-serif}a{color:inherit;text-decoration:none}nav{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:17px 4vw;border-bottom:1px solid #ffffff16;background:#090c13ed;backdrop-filter:blur(18px)}nav .links{display:flex;gap:22px;overflow-x:auto;white-space:nowrap;font-size:12px;color:#bfcae0}nav a:hover,nav a:focus-visible{color:#68a3ff}main{max-width:1280px;margin:auto;padding:0 5vw}.page{position:relative;padding:30px 0 20px;display:flex;flex-direction:column;justify-content:center;border-bottom:1px solid #ffffff16;scroll-margin-top:0}.cover{background:radial-gradient(ellipse at 95% 35%,#1354df24,transparent 60%);justify-content:space-between}.brand{width:260px;max-width:65%}.brand svg{display:block;width:100%;height:auto}.tag{color:#77aaff;text-transform:uppercase;font-size:11px;letter-spacing:.2em}.muted,small{color:#99abc5}h1{font-size:clamp(42px,6.8vw,84px);line-height:1.04;letter-spacing:-.055em;font-weight:750;margin:25px 0}h1 span{color:#71a6ff}h2{font-size:22px;letter-spacing:-.025em;margin:0 0 15px}.heading{font-size:clamp(30px,4vw,48px);line-height:1.1;letter-spacing:-.04em;margin:12px 0 18px}.intro{max-width:620px;color:#9cacc4;margin-bottom:28px}.cover-copy{padding:24px 0}.client{border-left:2px solid #337cff;padding-left:20px;margin-top:35px}.client strong{font-size:24px}.client p{margin:4px 0}.page-foot{display:flex;justify-content:space-between;gap:20px;font-size:11px;color:#72839e;border-top:1px solid #ffffff12;padding-top:18px;margin-top:auto}.page> .page-foot{margin-top:22px}.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.card,.panel{border:1px solid #ffffff18;border-radius:22px;background:linear-gradient(145deg,#1d315347,#ffffff05);box-shadow:inset 0 1px 0 #ffffff0d;padding:24px;min-width:0}.card p{font-size:12px;margin:0}.value{font-size:clamp(21px,2.5vw,32px);display:block;line-height:1.2;margin:22px 0 16px;overflow-wrap:anywhere;letter-spacing:-.04em}.delta{color:#9abfff}.card small{display:block;font-size:10px;margin-top:6px}.split{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.chart{margin:18px 0 24px}.bar-label{display:flex;justify-content:space-between;gap:12px;font-size:11px;margin-top:12px;color:#a9b9d0}.bar-label strong{color:#eef3ff}.track{height:9px;background:#ffffff07;border-radius:8px;margin-top:6px;overflow:hidden}.bar{height:100%;background:#536581;border-radius:8px}.bar.now{background:linear-gradient(90deg,#155bff,#67abff)}.scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;text-align:left;font-size:12px}th,td{padding:11px 8px;border-bottom:1px solid #ffffff0b}thead th{font-weight:400;color:#8499b8;font-size:10px}tbody th{font-weight:400;color:#bbcae0}td{white-space:nowrap}tr:last-child td,tr:last-child th{border:0}.notice{border-left:2px solid #e4b554;padding:16px 20px;background:#e4b5540c;color:#dfcdab;margin:20px 0}.context{font-size:12px;color:#91a3be;margin:24px 0}.analysis{white-space:pre-wrap;overflow-wrap:anywhere;font-size:17px;line-height:1.9}.closing{max-width:800px;font-size:clamp(30px,4vw,50px);letter-spacing:-.04em;line-height:1.2;margin:30px 0}.source{font-size:11px;color:#71839f;max-width:850px;margin-top:30px}.button{display:inline-block;padding:12px 20px;border:1px solid #70a4ff45;border-radius:30px;color:#9cbfff;font-size:13px;margin-top:24px}
.planning{grid-template-columns:repeat(3,minmax(0,1fr));margin-bottom:24px}.planning h3{font-size:16px}.hero-layout{display:grid;grid-template-columns:1.2fr 1fr;align-items:center;gap:16px}.hero-layout h1{font-size:clamp(42px,5vw,66px)}.restaurant-art svg{width:100%;height:auto;filter:drop-shadow(0 25px 65px #2065df28)}.restaurant-art p{text-align:center;font-size:11px;letter-spacing:.2em;color:#7e9bc7}.chart-heading{display:flex;justify-content:space-between;align-items:center;gap:10px}.chart-heading .delta{background:#3778f018;padding:5px 10px;border-radius:20px;font-size:12px}.track{height:18px}.chart{padding:10px 0 20px;border-bottom:1px solid #ffffff0a}.bar.now{background:linear-gradient(90deg,#3679fa,#47d5ca)}.metric-details summary{cursor:pointer;color:#8eb9ff;font-size:12px;padding:10px 0}.card:nth-child(2){background:linear-gradient(145deg,#0c82762c,#ffffff05)}.card:nth-child(3){background:linear-gradient(145deg,#7b52c22c,#ffffff05)}.card:nth-child(4){background:linear-gradient(145deg,#b77d2826,#ffffff05)}.editorial{display:grid;grid-template-columns:180px 1fr;gap:24px}.analysis-mark{font-size:100px;line-height:1;color:#6da6ff}.analysis-mark p{font-size:20px;line-height:1.4}.analysis{min-height:220px}
@media(max-width:950px){.hero-layout{grid-template-columns:1fr}.restaurant-art{max-width:300px;margin:auto}.planning{grid-template-columns:1fr}.editorial{grid-template-columns:1fr}.analysis-mark{display:none}}
@media(min-width:1500px){main{padding:0 40px}}
@media(max-width:950px){.split{grid-template-columns:1fr}.cards{grid-template-columns:repeat(2,minmax(0,1fr))}.page{min-height:auto;padding-top:28px;padding-bottom:20px}.cover{min-height:0}.split table{min-width:440px}nav>.tag{display:none}.brand{width:220px}.panel{padding:20px}}
@media(max-width:480px){main{padding:0 20px}.cards{gap:10px}.card{padding:16px}.value{font-size:23px}.page-foot{font-size:10px}nav{padding:14px 20px}.cover-copy{padding:30px 0}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
@media print{nav{display:none}.page{break-after:page;min-height:0}.panel,.card{break-inside:avoid}body{print-color-adjust:exact}.scroll{overflow:visible}}
</style></head><body><nav aria-label="Páginas do relatório"><span class="tag">Pinguim / Resultados</span><div class="links">${pages.map((p,i)=>`<a href="#${p.id}">${String(i+1).padStart(2,'0')} ${p.label}</a>`).join('')}</div></nav><main>
<section id="capa" class="page cover"><div class="brand">${reportBrand}</div><div class="hero-layout"><div class="cover-copy"><p class="tag">Relatório ${marketing?'de marketing':'de resultados'} · ${e(current.label)}</p><h1>Resultados de ${e(monthName.toLowerCase())}.<br><span>Direção para ${e(nextMonthName)}.</span></h1><div class="client"><p class="tag">Preparado para</p><strong>${e(clientName)}</strong><p class="muted">${e(current.label)}${previous?` · Comparativo com ${e(previous.label)}`:""}</p></div><a class="button" href="#resumo">Explorar os resultados ↓</a></div><div class="restaurant-art">${restaurantArt}<p>Presença · Aquisição · Vendas</p></div></div>${foot(1)}</section>
<section id="resumo" class="page"><p class="tag">Visão do mês</p><h2 class="heading">${e(monthName)} em perspectiva.</h2><p class="intro">Os principais indicadores de ${e(current.label.toLowerCase())}${previous?`, comparados com ${e(previous.label.toLowerCase())}`:""}.</p>
${!marketing&&current.values[56]==null?'<div class="notice"><strong>Fechamento financeiro pendente.</strong> O total do restaurante não foi informado. Os canais disponíveis não representam toda a operação.</div>':''}
<div class="cards">${highlights.map(card).join('')}</div>${previous?`<p class="context">As variações mostram a diferença entre os períodos, sem atribuir o resultado a uma ação isolada. Uma alta ou queda deve ser interpretada no contexto de cada indicador.</p>`:""}${foot(2)}</section>
${chapters.map((c,i)=>`<section id="${c.id}" class="page"><p class="tag">${e(c.label)} / ${e(current.label)}</p><h2 class="heading">${e(c.title)}</h2><p class="intro">${e(c.subtitle)}</p><div class="split">${c.items.map(block).join('')}</div><p class="context">${c.id==='aquisicao'?'Dados mensais da planilha. As consultas avulsas à Meta não são incorporadas automaticamente a este relatório.':c.id==='vendas'?'Pedidos do cardápio não representam todos os pedidos do restaurante. Os valores são os registrados na fonte.':'Alcances de plataformas diferentes não devem ser somados: uma mesma pessoa pode aparecer em mais de um canal.'}</p>${foot(i+3)}</section>`).join('')}
<section id="direcao" class="page"><p class="tag">Planejamento / ${e(nextLabel)}</p><h2 class="heading">Ações para ${e(nextMonthName)}.</h2><p class="intro">Sugestões para avaliação — não são ações já executadas ou aprovadas. Ajuste as ofertas à margem e à operação do restaurante.</p><div class="cards planning">${suggestions.map(([title,text])=>`<article class="card"><h3>${e(title)}</h3><p>${e(text)}</p></article>`).join('')}</div>${notes.trim()?`<h2 class="heading">Análise e próximos passos</h2><div class="editorial"><div class="analysis-mark">“<p>A visão da<br>Pinguim.</p></div><div class="panel analysis">${e(notes.trim())}</div></div>`:`<div class="brand">${reportBrand}</div><p class="closing">O seu restaurante tem uma história.<br><span class="muted">Vamos construir o próximo capítulo juntos.</span></p>`}
<div class="source"><p>Fonte: planilha de acompanhamento de ${e(clientName)} · Dados consultados em ${e(timestamp)} (horário da Bahia).</p><p>Este arquivo preserva os dados do momento da exportação. Não é atualizado automaticamente. Campos não informados não representam zero. Variações de taxas em pontos percentuais.</p></div>${foot(pages.length)}</section></main></body></html>`
}


// Map the source columns to the dashboard schema. Never reuse the Villa offsets.
export function parse071Months(csv:string):Month[]{
 const rows=parseCsv(csv)
 if(rows[4]?.[61]!=='RECEITA'||rows[0]?.[45]!=='99'||rows[0]?.[52]!=='SALÃO'||rows[4]?.[59]!=='PEDIDOS')throw new Error('Formato da planilha 071 alterado')
 const mapped=rows.map(row=>{
  const out=Array<string>(57).fill('')
  for(let i=0;i<=33;i++)out[i]=row[i]??''
  for(const [target,source] of [[42,47],[44,42],[49,52],[54,59],[56,61]])out[target]=row[source]??''
  return out
 })
 mapped[0][52]='RESULTADO TOTAL'
 return parseMonths(mapped.map(row=>row.map(cell=>'"'+cell.replaceAll('"','""')+'"').join(',')).join('\n'))
}

export function parse071Gviz(csv:string):Month[]{
 const rows=parseCsv(csv)
 if(rows[0]?.[45]!=='99'||rows[0]?.[57]!=='RESULTADO TOTAL'||rows[0]?.length<65)throw new Error('Formato alternativo da 071 alterado')
 const headings=Array<string>(65).fill('');headings[0]='PERIODO';headings[29]='RECEITA';headings[59]='PEDIDOS';headings[61]='RECEITA'
 const channels=[...rows[0]];channels[27]='CARDÁPIO DIGITAL';channels[52]='SALÃO'
 const data=rows.slice(1).filter(row=>/^[a-zç]+\/\d{2,4}$/i.test(row[0]??''))
 return parse071Months([channels,[],[],[],headings,...data].map(row=>row.map(cell=>'"'+cell.replaceAll('"','""')+'"').join(',')).join('\n'))
}
