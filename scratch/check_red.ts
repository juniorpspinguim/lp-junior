import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const env = fs.readFileSync('.env.local', 'utf8')
const getEnv = (key: string) => env.split('\n').find(line => line.startsWith(key))?.split('=')[1]?.trim()

const supabase = createClient(
  getEnv('NEXT_PUBLIC_SUPABASE_URL')!,
  getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')!
)

async function updateProposalLogo() {
  const { data, error } = await supabase
    .from('proposals')
    .update({ logo_url: 'Fundo de Logo 071 Burger Salvador Removido.png' })
    .eq('slug', 'm3kj9on')
    .select()

  if (error) {
    console.error('Error updating proposal:', error)
    return
  }

  console.log('Successfully updated proposal logo:', JSON.stringify(data, null, 2))
}

updateProposalLogo()
