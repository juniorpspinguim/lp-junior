import test from 'node:test'
import assert from 'node:assert/strict'
import {validateMetaQuery} from '../src/lib/meta-query.ts'
test('Meta accepts custom inclusive ranges and rejects malformed dates and fields',()=>{
 const q={since:'2026-08-01',until:'2026-08-31',metrics:['spend','reach']}
 assert.equal(validateMetaQuery(q),null)
 assert.equal(validateMetaQuery({...q,until:q.since}),null)
 for(const change of [{since:'2026-02-30'},{until:'2026-07-31'},{metrics:[]},{metrics:['access_token']},{since:''}])assert.ok(validateMetaQuery({...q,...change}))
})

test('Conversions use the aggregate once, preserve zero, and do not invent missing values', async()=>{
 const {metaFields,metaValue}=await import('../src/lib/meta-query.ts')
 assert.equal(metaFields(['purchases','landing_page_view','roas','cost_per_purchase']),'account_id,actions,purchase_roas,cost_per_action_type')
 const row={actions:[{action_type:'omni_purchase',value:'10'},{action_type:'offsite_conversion.fb_pixel_purchase',value:'8'},{action_type:'landing_page_view',value:'0'}],purchase_roas:[{action_type:'omni_purchase',value:'3.4'}],cost_per_action_type:[{action_type:'omni_purchase',value:'12.5'}]}
 assert.equal(metaValue(row,'purchases'),10)
 assert.equal(metaValue(row,'landing_page_view'),0)
 assert.equal(metaValue(row,'roas'),3.4)
 assert.equal(metaValue(row,'cost_per_purchase'),12.5)
 assert.equal(metaValue({},'purchases'),null)
})
