
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const env = fs.readFileSync('.env.local', 'utf8')
const getEnv = (key: string) => env.split('\n').find(line => line.startsWith(key))?.split('=')[1]?.trim()

const supabase = createClient(
  getEnv('NEXT_PUBLIC_SUPABASE_URL')!,
  getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')!
)

async function checkProposals() {
  const { data, error } = await supabase
    .from('proposals')
    .select('id, slug, restaurant_name, logo_url, created_at')

  if (error) {
    console.error('Error fetching proposals:', error)
    return
  }

  console.log(JSON.stringify(data, null, 2))
}

checkProposals()
