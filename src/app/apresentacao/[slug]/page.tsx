import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import PresentationViewer from '@/components/PresentationViewer'

export default async function ApresentacaoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: proposal } = await supabase
    .from('proposals')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!proposal) notFound()

  const services: { id: string; name: string; price: number }[] = proposal.services ?? []

  return <PresentationViewer proposal={proposal} services={services} />
}
