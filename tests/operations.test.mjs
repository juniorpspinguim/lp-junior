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
