'use server'
import { updateTag } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
export async function refreshVillaSheet(client="villa"){
 const db=await createClient()
 const {data:{user}}=await db.auth.getUser()
 if(!user)throw new Error('Entre novamente no painel.')
 const {data:owner}=await db.from('proposals').select('id').eq('slug','7y3qope').eq('user_id',user.id).maybeSingle()
 if(!owner)throw new Error('Sem acesso ao piloto.')
 if(!['villa','071'].includes(client))throw new Error('Cliente inválido')
 updateTag(client==='071'?'071-operations-sheet':'villa-operations-sheet')
}
