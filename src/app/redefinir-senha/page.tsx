'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import WhitePinguimLogo from '@/components/WhitePinguimLogo';
export default function ResetPassword() {
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    async function check() {
      try {
        if (new URLSearchParams(window.location.search).has('erro')) return;
        const { data, error } = await createClient().auth.getUser();
        if (active) setReady(!error && !!data.user);
      } finally { if (active) setChecking(false); }
    }
    check().catch(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError('');
    if (password !== confirmation) return setError('As senhas não coincidem.');
    if (password.length < 8) return setError('Use pelo menos 8 caracteres.');
    setBusy(true);
    try {
      const { error } = await createClient().auth.updateUser({ password });
      if (error) setError('Não foi possível salvar. Use uma senha diferente, com letras, números e símbolos. Se o link expirou, solicite outro.');
      else { setPassword(''); setConfirmation(''); setDone(true); await createClient().auth.signOut(); }
    } catch { setError('Falha de conexão. Tente novamente.'); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-[#0D0D12] flex items-center justify-center p-6 text-white"><div className="w-full max-w-md"><div className="flex justify-center mb-10"><WhitePinguimLogo /></div><section className="bg-white/[0.03] border border-white/10 rounded-3xl p-8"><h1 className="text-2xl font-bold">Definir nova senha</h1>{checking ? <p className="mt-5">Verificando o link…</p> : done ? <div role="status" className="mt-5"><p>Senha atualizada. Entre com sua nova senha.</p><Link href="/login" className="block text-blue-300 mt-4">Ir para o login</Link></div> : !ready ? <div className="mt-5"><p>Este link está inválido ou expirou.</p><Link href="/recuperar-senha" className="block text-blue-300 mt-4">Solicitar novo link</Link></div> : <form onSubmit={submit} className="space-y-5 mt-5"><p className="text-sm text-slate-400">Use pelo menos 8 caracteres, combinando letras, números e símbolos.</p><label className="block text-sm">Nova senha<input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} disabled={busy} className="block w-full mt-2 bg-white/5 border border-white/15 rounded-xl p-3" /></label><label className="block text-sm">Confirme a nova senha<input type="password" required minLength={8} autoComplete="new-password" value={confirmation} onChange={e => setConfirmation(e.target.value)} disabled={busy} className="block w-full mt-2 bg-white/5 border border-white/15 rounded-xl p-3" /></label>{error && <p role="alert" className="text-sm text-red-400">{error}</p>}<button disabled={busy} className="w-full rounded-xl bg-[#0047FF] p-3 font-bold disabled:opacity-50">{busy ? 'Salvando…' : 'Salvar nova senha'}</button></form>}</section></div></main>;
}
