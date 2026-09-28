'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { isCrmStage, validateContact, validDate } from '@/lib/crm'
const uuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
async function session() {
  const db = await createClient()
  const {data:{user}} = await db.auth.getUser()
  if (!user) throw new Error('Entre novamente no painel.')
  return {db,user}
}
type Result = {error?: string; id?: string}
async function run(fn: () => Promise<Result>): Promise<Result> {
  try { const result = await fn(); if (!result.error) revalidatePath('/painel/comercial'); return result }
  catch { return {error:'Não foi possível salvar. Verifique sua conexão e se está conectado ao painel.'} }
}
export async function saveContact(id: string | null, form: FormData): Promise<Result> {
  return run(async () => {
    const {db,user} = await session()
    const text = (key: string) => String(form.get(key) ?? '').trim()
    const input = {restaurant_name:text('restaurant_name'),contact_name:text('contact_name'),phone:text('phone'),email:text('email'),city:text('city'),niche:text('niche'),source:text('source'),stage:text('stage'),estimated_value:Number(text('estimated_value') || 0),proposal_slug:text('proposal_slug') || null}
    const validation = validateContact(input)
    if (validation) return {error:validation}
    if (id && !uuid(id)) return {error:'Contato inválido.'}
    if (input.proposal_slug) {
      const {data} = await db.from('proposals').select('id').eq('slug',input.proposal_slug).eq('user_id',user.id).is('deleted_at',null).maybeSingle()
      if (!data) return {error:'Selecione uma proposta ativa do seu painel.'}
    }
    const query = id ? db.from('crm_contacts').update(input).eq('id',id).eq('user_id',user.id) : db.from('crm_contacts').insert({...input,user_id:user.id})
    const {data,error} = await query.select('id').single()
    return error ? {error:'Não foi possível salvar o contato. Tente novamente.'} : {id:data.id}
  })
}
export async function changeStage(id: string, stage: string): Promise<Result> {
  return run(async () => {
    if (!uuid(id) || !isCrmStage(stage)) return {error:'Etapa ou contato inválido.'}
    const {db,user} = await session()
    const {error} = await db.from('crm_contacts').update({stage}).eq('id',id).eq('user_id',user.id).select('id').single()
    return error ? {error:'Não foi possível mudar a etapa.'} : {}
  })
}
export async function addCrmNote(contactId: string, kind: string, body: string): Promise<Result> {
  return run(async () => {
    if (!uuid(contactId) || !['nota','reuniao','ligacao','whatsapp'].includes(kind) || !body.trim() || body.length > 4000) return {error:'Escreva um registro de até 4.000 caracteres.'}
    const {db,user} = await session()
    const {error} = await db.from('crm_events').insert({contact_id:contactId,user_id:user.id,kind,body:body.trim()})
    return error ? {error:'Não foi possível registrar a atividade.'} : {}
  })
}
export async function addCrmTask(contactId: string, title: string, dueDate: string): Promise<Result> {
  return run(async () => {
    if (!uuid(contactId) || !title.trim() || title.length > 200 || !validDate(dueDate)) return {error:'Informe a próxima ação e uma data válida.'}
    const {db,user} = await session()
    const {error} = await db.from('crm_tasks').insert({contact_id:contactId,user_id:user.id,title:title.trim(),due_date:dueDate})
    return error ? {error:'Não foi possível agendar o retorno.'} : {}
  })
}
export async function completeCrmTask(id: string, completed: boolean): Promise<Result> {
  return run(async () => {
    if (!uuid(id) || typeof completed !== 'boolean') return {error:'Tarefa inválida.'}
    const {db,user} = await session()
    const {error} = await db.from('crm_tasks').update({completed_at:completed ? new Date().toISOString() : null}).eq('id',id).eq('user_id',user.id).select('id').single()
    return error ? {error:'Não foi possível atualizar a tarefa.'} : {}
  })
}
