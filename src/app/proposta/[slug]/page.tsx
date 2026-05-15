import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ProposalViewer from '@/components/ProposalViewer'

const whatsapp = `https://wa.me/5571996623922?text=${encodeURIComponent('Olá! Acabei de ver a proposta e quero saber mais sobre os próximos passos!')}`

export default async function PropostaPublicaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: proposal } = await supabase
    .from('proposals')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!proposal) notFound()

  const services: { id: string; name: string; price: number }[] = proposal.services ?? []

  return <ProposalViewer proposal={proposal} services={services} whatsapp={whatsapp} />
}
