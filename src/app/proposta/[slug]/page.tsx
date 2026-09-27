import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import CommercialPresentation from '@/components/CommercialPresentation'

export const dynamic = 'force-dynamic'

export default async function PropostaPublicaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: proposal } = await supabase
    .from('proposals')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!proposal) notFound()

  return <CommercialPresentation proposal={proposal} />
}
