'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Lock, Mail, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.')
      setLoading(false)
    } else {
      router.push('/painel')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D12] flex items-center justify-center p-4 relative overflow-hidden font-sans">

      {/* Background radial glow - top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#0047FF]/10 rounded-full blur-[120px] pointer-events-none" />
      {/* Background radial glow - bottom */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#0047FF]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link href="/">
            <Image
              src="/logo-pinguim.png"
              alt="Pinguim Marketing"
              width={220}
              height={62}
              className="object-contain hover:opacity-80 transition-opacity brightness-0 invert"
              priority
            />
          </Link>
        </div>

        {/* Card */}
        <div className="relative bg-[#0F1014]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(0,71,255,0.05)] overflow-hidden">

          {/* Top blue accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#0047FF] to-transparent" />

          {/* Sweep light effect */}
          <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#0047FF]/10 to-transparent skew-x-[-45deg] animate-[sweep_4s_ease-in-out_infinite] pointer-events-none z-0" />

          <div className="p-8 md:p-10 relative z-10">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#0047FF]/10 border border-[#0047FF]/20 rounded-2xl mb-5 shadow-[0_0_20px_rgba(0,71,255,0.15)]">
                <Lock className="w-6 h-6 text-[#0047FF]" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                Acesso Restrito
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Entre com suas credenciais para acessar o painel
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300" htmlFor="email">
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A1A24]/60 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#0047FF]/60 focus:bg-[#1A1A24] focus:ring-1 focus:ring-[#0047FF]/50 transition-all shadow-inner text-sm"
                    placeholder="seu@email.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300" htmlFor="password">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1A1A24]/60 border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#0047FF]/60 focus:bg-[#1A1A24] focus:ring-1 focus:ring-[#0047FF]/50 transition-all shadow-inner text-sm"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 relative overflow-hidden flex items-center justify-center gap-2 bg-[#0047FF] hover:bg-[#003BCC] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,71,255,0.3)] hover:shadow-[0_0_40px_rgba(0,71,255,0.6)] hover:-translate-y-0.5 active:translate-y-0 group"
              >
                {/* Sweep inside button */}
                <span className="absolute inset-0 w-full h-full -ml-10 bg-white/10 skew-x-[-45deg] -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10">Entrar no Painel</span>
                    <ArrowRight className="h-4 w-4 relative z-10" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-8">
          Área restrita. Acesso exclusivo para equipe{' '}
          <span className="text-[#0047FF]">Pinguim Digital</span>.
        </p>

        {/* Back to LP */}
        <div className="flex justify-center mt-4">
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-300 text-xs transition-colors flex items-center gap-1 hover:underline"
          >
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  )
}
