'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteProposal(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('proposals')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Failed to delete proposal:', error)
    throw new Error('Failed to delete proposal')
  }

  revalidatePath('/painel')
}
