import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import CrmWorkspace from '@/components/CrmWorkspace'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export default async function CommercialPage() {
  const db = await createClient()
  const {data:{user}} = await db.auth.getUser()
  if (!user) redirect('/login')
  const [contacts,tasks,events,proposals] = await Promise.all([
    db.from('crm_contacts').select('*').eq('user_id',user.id).order('updated_at',{ascending:false}),
    db.from('crm_tasks').select('*').eq('user_id',user.id).order('due_date'),
    db.from('crm_events').select('*').eq('user_id',user.id).order('created_at',{ascending:false}),
    db.from('proposals').select('slug,restaurant_name,proposal_number,proposal_year,deleted_at').eq('user_id',user.id).order('created_at',{ascending:false})
  ])
  if (contacts.error || tasks.error || events.error || proposals.error) return <main className="min-h-screen bg-[#090c13] p-10"><Link href="/painel" className="text-blue-400">← Painel</Link><h1 className="text-3xl mt-8">Comercial</h1><p role="alert" className="mt-4 text-amber-300">Não foi possível carregar o CRM. Tente novamente em instantes.</p></main>
  return <CrmWorkspace contacts={contacts.data ?? []} tasks={tasks.data ?? []} events={events.data ?? []} proposals={proposals.data ?? []}/>
}
