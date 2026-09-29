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
