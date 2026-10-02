import test from 'node:test'
import assert from 'node:assert/strict'
import {parseCsv,parseNumber,comparison,parseMonths} from '../src/lib/operations.ts'
test('CSV and Brazilian values preserve missing data and zero',()=>{
 assert.deepEqual(parseCsv('a,"R$ 22.994,90","a""b"\r\n'),[['a','R$ 22.994,90','a"b']])
 assert.equal(parseNumber('R$ 22.994,90'),22994.9)
 assert.equal(parseNumber('79.679'),79679)
 assert.equal(parseNumber(''),null);assert.equal(parseNumber('-'),null);assert.equal(parseNumber('0'),0)
})
test('Comparisons distinguish missing, zero base, and percentage points',()=>{
 assert.equal(comparison(null,566949.07,'money'),'Sem comparação')
 assert.equal(comparison(218,190,'number'),'+14,7%')
 assert.equal(comparison(5.49,4.95,'percent'),'+0,54 p.p.')
 assert.equal(comparison(1,0,'number'),'Base anterior igual a zero')
 assert.throws(()=>parseMonths('<html>Login</html>'))
})

test('HTML export is standalone, escapes notes and excludes financial data in marketing',async()=>{
 const {buildReportHtml}=await import('../src/lib/operations.ts')
 const values=Array(60).fill(null);values[29]=22994.90;values[27]=218;values[3]=79679
 const month={key:'2026-08',label:'Agosto de 2026',values}
 const full=buildReportHtml(month,undefined,'Completo','<script>alert(1)</script>\nAção: revisar ofertas.','2026-09-29T10:00:00Z')
 assert.ok(full.startsWith('<!doctype html>'));assert.ok(full.includes('22.994,90'))
 assert.ok(full.includes('&lt;script&gt;'));assert.ok(!full.includes('<script>'))
 assert.ok(full.includes('Fechamento financeiro pendente'))
 assert.ok(!/(?:src|href)="https?:/.test(full))
 const marketing=buildReportHtml(month,undefined,'Marketing','','')
 assert.ok(!marketing.includes('22.994,90'));assert.ok(!marketing.includes('Faturamento'))
 assert.ok(!marketing.includes('R$'));assert.ok(marketing.includes('79.679'))
 assert.ok(!marketing.includes('Análise e próximos passos'))
})
test('Selected metrics apply to HTML including highlights',async()=>{
 const {buildReportHtml}=await import('../src/lib/operations.ts')
 const values=Array(60).fill(null);values[29]=22994.9;values[3]=79679
 const html=buildReportHtml({key:'2026-08',label:'Agosto de 2026',values},undefined,'Completo','','',[3])
 assert.ok(html.includes('79.679'));assert.ok(!html.includes('22.994,90'))
 assert.ok(!html.includes('<h2>Meta Ads</h2>'));assert.ok(html.includes('<h2>Instagram</h2>'))
})
test('Available months are parsed dynamically and duplicate months rejected',()=>{
 const rows=Array.from({length:7},()=>Array(60).fill(''))
 rows[0][27]='CARDÁPIO DIGITAL';rows[0][52]='RESULTADO TOTAL'
 rows[4][0]='PERIODO';rows[4][29]='RECEITA';rows[4][56]='RECEITA'
 rows[5][0]='setembro/26';rows[5][10]='3668';rows[6][0]='outubro/26'
 const csv=()=>rows.map(r=>r.join(',')).join('\n')
 const months=parseMonths(csv());assert.deepEqual(months.map(m=>m.key),['2026-10','2026-09'])
 assert.equal(months[1].values[10],3668);assert.equal(months[0].values[10],null)
 rows[6][0]='setembro/26';assert.throws(()=>parseMonths(csv()),/duplicado/)
})
test('Planning follows the reporting month including year rollover',async()=>{
 const {buildReportHtml}=await import('../src/lib/operations.ts')
 const values=Array(60).fill(null)
 const august=buildReportHtml({key:'2026-08',label:'Agosto de 2026',values},undefined,'Completo','','')
 assert.ok(august.includes('Ações para setembro.'))
 assert.ok(august.includes('15/09 · Dia do Cliente'))
 const december=buildReportHtml({key:'2026-12',label:'Dezembro de 2026',values},undefined,'Completo','','')
 assert.ok(december.includes('janeiro de 2027'))
 assert.ok(!december.includes('15/09'))
})
test('Single-month HTML omits comparison columns, changes and prior-period labels',async()=>{
 const {buildReportHtml}=await import('../src/lib/operations.ts')
 const values=Array(60).fill(10)
 const html=buildReportHtml({key:'2026-08',label:'Agosto de 2026',values},undefined,'Completo','','')
 assert.ok(!html.includes('Comparativo com'))
 assert.ok(!html.includes('<th>Variação</th>'))
 assert.ok(!html.includes('Sem comparação'))
 assert.ok(!html.includes('em relação ao período comparado'))
 assert.ok(html.includes('Agosto de 2026'))
})
