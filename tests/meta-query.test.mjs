import test from 'node:test'
import assert from 'node:assert/strict'
import {validateMetaQuery} from '../src/lib/meta-query.ts'
test('Meta accepts custom inclusive ranges and rejects malformed dates and fields',()=>{
 const q={since:'2026-08-01',until:'2026-08-31',metrics:['spend','reach']}
 assert.equal(validateMetaQuery(q),null)
 assert.equal(validateMetaQuery({...q,until:q.since}),null)
 for(const change of [{since:'2026-02-30'},{until:'2026-07-31'},{metrics:[]},{metrics:['access_token']},{since:''}])assert.ok(validateMetaQuery({...q,...change}))
})
