'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function setProposalTrashed(id: string, trashed: boolean): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Entre novamente no painel.' }
  const { data, error } = await supabase.from('proposals')
    .update({ deleted_at: trashed ? new Date().toISOString() : null })
    .eq('id', id).eq('user_id', user.id).select('slug').single()
  if (error || !data) return { error: 'Não foi possível atualizar a proposta. Tente novamente.' }
  revalidatePath('/painel')
  revalidatePath('/painel/lixeira')
  revalidatePath(`/proposta/${data.slug}`)
  revalidatePath(`/apresentacao/${data.slug}`)
  return {}
}
