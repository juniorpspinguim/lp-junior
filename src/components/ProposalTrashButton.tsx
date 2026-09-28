'use client'
import { useState, useTransition } from 'react'
import { Trash2, RotateCcw } from 'lucide-react'
import { setProposalTrashed } from '@/app/painel/actions'
export default function ProposalTrashButton({id, restore = false}: { id: string; restore?: boolean }) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const label = restore ? 'Restaurar proposta' : 'Mover para a lixeira'
  return <div><button type="button" disabled={pending} title={label} aria-label={label} onClick={() => startTransition(async () => {
    setError('')
    try { const result = await setProposalTrashed(id, !restore); if (result.error) setError(result.error) }
    catch { setError('Falha na conexão. Tente novamente.') }
  })} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs disabled:opacity-50 ${restore ? 'text-blue-300 bg-blue-500/10' : 'text-red-400 bg-red-400/10'}`}>
    {restore ? <RotateCcw size={16}/> : <Trash2 size={16}/>} {pending ? 'Salvando…' : restore ? 'Restaurar' : null}
  </button>{error && <p role="alert" className="text-xs text-red-400 max-w-52 mt-2">{error}</p>}</div>
}
