import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import OperationsWorkspace from '@/components/OperationsWorkspace'

export const dynamic = 'force-dynamic'

export default async function OperationsPage() {
  const db = await createClient()
  const { data: { user } } = await db.auth.getUser()
  if (!user) redirect('/login')
  return <OperationsWorkspace />
}
