'use client'
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import WhitePinguimLogo from '@/components/WhitePinguimLogo';
export default function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError('');
    try {
      const { error } = await createClient().auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/auth/recuperacao` });
      if (error) {
        const code = error.code;
        if (code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit' || error.status === 429) {
          setError('O serviço atingiu o limite de solicitações ou de envio de e-mails. Aguarde antes de tentar novamente; se persistir, é necessário verificar o limite de e-mails no Supabase.');
        } else if (code === 'email_address_not_authorized') {
          setError('O serviço de e-mail do Supabase não está autorizado a enviar para este endereço. É necessário configurar o envio de e-mails (SMTP) no projeto.');
        } else if (code === 'email_address_invalid') {
          setError('O serviço recusou o formato do e-mail. Confira o endereço informado.');
        } else if (error.status === 500 || code === 'unexpected_failure') {
          setError('O servidor não conseguiu concluir a recuperação. É necessário verificar os registros de autenticação e a configuração de envio de e-mails no Supabase.');
        } else {
          setError(`O serviço recusou a solicitação. Referência para diagnóstico: ${code ?? error.status ?? 'indisponível'}.`);
        }
      }
      else setSent(true);
    } catch { setError('Falha de conexão. Tente novamente.'); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-[#0D0D12] flex items-center justify-center p-6 text-white"><div className="w-full max-w-md"><div className="flex justify-center mb-10"><WhitePinguimLogo /></div><section className="bg-white/[0.03] border border-white/10 rounded-3xl p-8"><h1 className="text-2xl font-bold">Recuperar senha</h1>{sent ? <p role="status" className="mt-5 text-slate-300">Se houver uma conta com esse e-mail, você receberá um link para definir uma nova senha. Confira também o spam e abra o link neste mesmo navegador.</p> : <form onSubmit={submit} className="space-y-5 mt-5"><p className="text-sm text-slate-400">Informe o e-mail cadastrado no painel.</p><label className="block text-sm">E-mail<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} disabled={busy} className="block w-full mt-2 bg-white/5 border border-white/15 rounded-xl p-3" /></label>{error && <p role="alert" className="text-sm text-red-400">{error}</p>}<button disabled={busy} className="w-full rounded-xl bg-[#0047FF] p-3 font-bold disabled:opacity-50">{busy ? 'Enviando…' : 'Enviar link de recuperação'}</button></form>}<Link href="/login" className="block mt-6 text-sm text-blue-300">Voltar ao login</Link></section></div></main>;
}
