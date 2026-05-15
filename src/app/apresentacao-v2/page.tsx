'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Target, Rocket, DollarSign, RefreshCw, BarChart3, Users, Crosshair, Brain, MessageSquare, AlertTriangle, TrendingDown, TrendingUp, CheckCircle2, Square, X } from 'lucide-react'

const slides = Array.from({ length: 18 }, (_, i) => ({ id: i + 1, content: `slide${i + 1}` }))


function Badge({ text, icon: Icon }: { text: string; icon?: any }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[#7B3FE4]/30 bg-gradient-to-r from-[#7B3FE4]/20 to-transparent backdrop-blur-md shadow-[0_0_15px_rgba(123,63,228,0.15)]">
      {Icon && <Icon size={14} className="text-[#9D64FF]" />}
      <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/90">
        {text}
      </span>
    </div>
  );
}

function GlassCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`relative group rounded-3xl border border-t-white/20 border-l-white/20 border-b-white/5 border-r-white/5 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-3xl p-6 md:p-8 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.5)] hover:bg-white/[0.12] transition-all duration-500 hover:border-[#7B3FE4]/50 hover:shadow-[0_0_30px_rgba(123,63,228,0.2)] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B3FE4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// SLIDE 1
function Slide1() {
  return (
    <div className="flex flex-col items-start justify-center h-full px-8 md:px-20 relative w-full max-w-7xl mx-auto pt-16 text-left z-10 font-[family-name:var(--font-outfit)]">

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-medium tracking-[0.2em] text-[10px] md:text-xs uppercase font-[family-name:var(--font-inter)] shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-md rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9D64FF] animate-pulse" />
          Agência Referência na Bahia
        </span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} 
        className="text-[12vw] md:text-8xl lg:text-[110px] font-black leading-[0.95] tracking-tight text-white uppercase mb-16 max-w-6xl drop-shadow-2xl">
        A diferença <br />
        <span className="text-slate-300">entre crescer</span> <br />
        <span className="text-slate-300">e estagnar</span> <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">é simples.</span>
      </motion.h1>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} 
        className="relative text-2xl md:text-4xl text-slate-400 font-light max-w-4xl pl-8 py-2 leading-tight">
        {/* Linha com Efeito Contínuo de Fluxo */}
        <motion.div 
          animate={{ backgroundPosition: ["0% 0%", "0% 200%"] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 top-0 bottom-0 w-[4px] rounded-full z-10"
          style={{
            background: "linear-gradient(180deg, rgba(0,71,255,0.1) 0%, rgba(0,71,255,1) 50%, rgba(0,71,255,0.1) 100%)",
            backgroundSize: "100% 200%"
          }}
        />
        
        Quem cresce usa dados. <br />
        O resto vive de <strong className="text-white font-bold tracking-tight">achismo.</strong>
      </motion.div>
      
      <div className="absolute bottom-24 left-0 right-0 flex justify-center items-center w-full pointer-events-none">
        <motion.span 
          animate={{ 
            textShadow: [
              "0px 0px 0px rgba(0,71,255,0)", 
              "0px 0px 15px rgba(0,71,255,0.8)", 
              "0px 0px 0px rgba(0,71,255,0)"
            ] 
          }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-white font-black text-xl tracking-[0.4em] font-[family-name:var(--font-inter)] uppercase"
        >
          PINGUIM
        </motion.span>
      </div>
    </div>
  )
}

// SLIDE 2
function Slide2() {
  const [marked, setMarked] = useState<number[]>([])

  const dores = [
    'Impulsionou post, gastou, não viu pedido nenhum chegar.',
    'Contratou agência, recebeu relatório bonito, faturamento igual.',
    'Colocou dinheiro no iFood, a plataforma ficou com a margem toda.',
    'Tentou fazer sozinho, virou uma bagunça.',
    'Tem um espaço cheio de potencial, mas as mesas continuam vazias.'
  ]

  useEffect(() => {
    const timeouts = dores.map((_, i) => {
      return setTimeout(() => {
        setMarked(prev => prev.includes(i) ? prev : [...prev, i])
      }, 1500 + i * 800)
    })
    return () => timeouts.forEach(clearTimeout)
  }, [])

  const toggleMark = (index: number) => {
    if (marked.includes(index)) {
      setMarked(marked.filter(i => i !== index))
    } else {
      setMarked([...marked, index])
    }
  }
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-12">
        Você já viveu alguma <span className="text-red-500">dessas situações?</span>
      </motion.h2>
      <div className="flex flex-col gap-6 mb-12">
        {dores.map((d, i) => {
          const isMarked = marked.includes(i);
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} 
              onClick={() => toggleMark(i)}
              className="flex items-center gap-5 cursor-pointer group">
              <div className={`relative flex items-center justify-center w-8 h-8 border-2 rounded-md transition-colors duration-300 shrink-0 ${isMarked ? 'border-red-500 bg-red-500/10' : 'border-slate-600 group-hover:border-slate-400'}`}>
                <AnimatePresence>
                  {isMarked && (
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                      <X className="w-6 h-6 text-red-500" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p className={`text-xl md:text-2xl transition-colors duration-300 ${isMarked ? 'text-white' : 'text-slate-400 font-light group-hover:text-slate-300'}`}>{d}</p>
            </motion.div>
          );
        })}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="px-6 py-4 bg-[#9D64FF]/10 border border-[#9D64FF]/30 rounded-xl inline-block text-[#9D64FF] font-medium text-xl w-fit relative z-10">
        Se você marcou pelo menos uma — esse papo é pra você.
      </motion.div>

      {/* Efeito Feno Rolando (Tumbleweed) */}
      <AnimatePresence>
        {marked.includes(dores.length - 1) && (
          <motion.div
            initial={{ x: "80vw", rotate: 0, y: 0 }}
            animate={{ 
              x: "-80vw", 
              rotate: -1080,
              y: [0, -100, 0, -70, 0, -40, 0, -20, 0, -10, 0] 
            }}
            transition={{ 
              duration: 9, 
              ease: "linear",
              delay: 0.5
            }}
            className="absolute bottom-10 right-0 z-0 opacity-40 pointer-events-none drop-shadow-2xl"
          >
            <svg viewBox="0 0 100 100" width="120" height="120" xmlns="http://www.w3.org/2000/svg" className="text-[#a67c52]">
              <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 10 A 40 40 0 1 1 49 10" />
                <path d="M15 50 C 30 10, 70 10, 85 50 C 70 90, 30 90, 15 50" />
                <path d="M50 15 C 90 30, 90 70, 50 85 C 10 70, 10 30, 50 15" />
                <path d="M25 25 Q 75 75 75 25 T 25 25" />
                <path d="M75 25 Q 25 75 25 25 T 75 25" />
                <path d="M30 10 Q 70 90 80 50 T 20 50 T 30 10" />
                <path d="M10 30 Q 90 70 50 80 T 50 20 T 10 30" />
                <path d="M40 5 Q 80 80 60 95 T 20 20 T 40 5" />
                <path d="M50 20 C 80 10 90 80 50 80 C 10 80 20 10 50 20" />
                <path d="M20 40 Q 80 20 80 60 T 20 40" />
                <path d="M40 20 Q 20 80 60 80 T 40 20" />
                <line x1="10" y1="50" x2="2" y2="45" />
                <line x1="90" y1="50" x2="98" y2="55" />
                <line x1="50" y1="10" x2="45" y2="2" />
                <line x1="50" y1="90" x2="55" y2="98" />
                <line x1="20" y1="20" x2="12" y2="12" />
                <line x1="80" y1="80" x2="88" y2="88" />
                <line x1="80" y1="20" x2="88" y2="12" />
                <line x1="20" y1="80" x2="12" y2="88" />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// SLIDE 3
function Slide3() {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-6xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
        O problema não é <br/>falta de dinheiro investido.
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl md:text-3xl text-slate-400 font-light mb-12">
        O problema é que você tem peças soltas — <strong className="text-white">sem sistema.</strong>
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { t: 'Tráfego sem cardápio otimizado', r: 'Visita que não converte.' },
          { t: 'Cardápio sem oferta estratégica', r: 'Pedido de ticket baixo.' },
          { t: 'Pedido sem retenção', r: 'Cliente compra 1x e some.' }
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i*0.1) }} className="relative group rounded-3xl border border-t-white/20 border-l-white/20 border-b-white/5 border-r-white/5 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-3xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.5)] hover:bg-white/[0.12] transition-all duration-500 hover:border-[#7B3FE4]/50">
            <p className="text-slate-400 mb-4 font-medium">{item.t}</p>
            <p className="text-2xl text-white font-bold flex items-center gap-2"><TrendingDown className="text-red-500"/> {item.r}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-2xl text-white font-light border-l-4 border-[#9D64FF] pl-6">
        Resultado: você paga para trazer o cliente e ele não volta. <br/>
        <strong className="text-[#9D64FF] font-bold">Isso não é azar. É falta de estrutura.</strong>
      </motion.div>
    </div>
  )
}

// SLIDE 4
function Slide4() {
  const probs = [
    'Seu concorrente está estruturando um sistema de vendas recorrentes.',
    'O iFood está aumentando a comissão e comendo sua margem.',
    'Seus clientes estão esquecendo que você existe.',
    'Cada mês sem previsibilidade é um mês operando no sufoco.'
  ]
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-light text-slate-400 mb-10">
        Enquanto você fica testando uma coisa aqui, outra ali…
      </motion.h2>
      <div className="flex flex-col gap-5 mb-16">
        {probs.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 text-xl md:text-2xl text-slate-300">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold shrink-0">X</div>
            <p>{p}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
        O restaurante que não tem sistema de crescimento, depende da sorte. <br/>
        <span className="text-red-500">E sorte não paga boleto.</span>
      </motion.div>
    </div>
  )
}

// SLIDE 5
function Slide5() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
        E se ao invés de "tentar marketing"… <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">você tivesse um sistema que trabalha por você todos os dias?</span>
      </motion.h2>
      <div className="flex flex-col gap-6 my-12 text-left">
        {['Atrai o cliente certo, no momento certo', 'Converte dentro do cardápio com mais valor', 'Faz esse cliente voltar sem você precisar pedir'].map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i*0.1) }} className="flex items-center gap-4 text-2xl text-slate-300">
            <CheckCircle2 className="text-[#25D366] w-8 h-8 shrink-0" /> {t}
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-2xl text-slate-400 font-light">
        Não é promessa. <strong className="text-white">É estrutura.</strong><br/>
        E é exatamente o que a Pinguim implementa.
      </motion.div>
    </div>
  )
}

// SLIDE 6
function Slide6() {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-6xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-12">
        A Pinguim não é <br/><span className="text-slate-500">agência de marketing.</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl text-[#9D64FF] font-medium mb-12">
        A Pinguim é uma estrutura de crescimento para restaurantes.
      </motion.p>
      
      <div className="flex flex-col gap-6 mb-16">
        {[
          '+4 anos atuando 100% no setor gastronômico',
          'Operamos com restaurantes e deliveries em todo o Brasil',
          'Responsáveis pelo maior grupo de networking para agências de restaurantes do país: Clube do Pinguim'
        ].map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i*0.1) }} className="flex items-start gap-4 text-xl md:text-2xl text-slate-300 font-light">
            <div className="w-2 h-2 mt-3 bg-[#9D64FF] rounded-full shrink-0" /> <p>{t}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-2xl text-white font-bold p-6 bg-[#1A1A24] border-l-4 border-[#25D366] rounded-r-xl">
        Aqui, dados e comunicação se transformam em faturamento real.<br/>
        <span className="text-slate-500 font-light">Não em relatório bonito.</span>
      </motion.div>
    </div>
  )
}

// SLIDE 7
function Slide7() {
  const logos = ['Catulé', 'Santa Feijuca', 'Smash Burger', 'Formaggio', 'Pizza Supreme', 'Villa Bistrô', 'Noa Poke', '071 Burger', 'Oriental Fast Food']
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-8 md:px-20 max-w-6xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
        Quem já implementou <br/><span className="text-[#9D64FF]">o sistema?</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-slate-400 mb-12">
        De delivery a bistrô. De burger a comida italiana. <br/>O sistema funciona independente do segmento.
      </motion.p>
      
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 w-full mb-16">
        {logos.map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + (i*0.05) }} className="aspect-video bg-[#13131A] border border-white/5 rounded-xl flex items-center justify-center text-slate-500 font-bold text-sm uppercase tracking-widest hover:border-[#9D64FF]/30 transition-colors">
            {l}
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-2xl text-white font-light">
        O que eles têm em comum? <br/>
        <strong className="text-[#25D366]">Deixaram de depender de sorte. Passaram a operar com previsibilidade.</strong>
      </motion.div>
    </div>
  )
}

// SLIDE 8
function Slide8() {
  const stats = [
    { v: 'R$ 276K', l: 'Em um único mês (saindo do zero rastreado)' },
    { v: 'R$ 49+', l: 'Ticket médio mantido consistentemente' },
    { v: '5.000+', l: 'Conversões geradas' },
    { v: 'R$ 327K', l: 'Receita rastreada direto dos anúncios' },
    { v: '1.054', l: 'Clientes recuperados' },
    { v: '1.577', l: 'Clientes recorrentes' }
  ]
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-6xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-4">
        Método Pinguim = <span className="text-[#25D366]">Resultado.</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl text-slate-400 font-light mb-12">
        Esses não são casos isolados. São frutos do sistema funcionando.
      </motion.p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i*0.1) }} className="relative group rounded-3xl border border-t-white/20 border-l-white/20 border-b-white/5 border-r-white/5 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-3xl p-6 flex flex-col justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#7B3FE4]/50 hover:shadow-[0_0_30px_rgba(123,63,228,0.2)] transition-all duration-500">
            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">{s.v}</span>
            <span className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-semibold">{s.l}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 9
function Slide9() {
  const pilares = [
    { num: '1', title: 'Comunicação', desc: 'Sua marca fala com quem precisa ouvir' },
    { num: '2', title: 'Posicionamento', desc: 'Você para de competir por preço' },
    { num: '3', title: 'Aquisição', desc: 'Novos clientes chegando de forma previsível' },
    { num: '4', title: 'Vendas', desc: 'Ticket médio maior, conversão melhor' },
    { num: '5', title: 'Recorrência', desc: 'O cliente volta sem você precisar pedir' },
  ]
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-6xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
        O Método Pinguim
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-slate-400 font-light mb-12">
        Construído dentro de centenas de restaurantes reais. Não em teoria.<br/>
        Sustentado por 5 pilares que formam um ciclo contínuo:
      </motion.p>
      
      <div className="flex flex-col gap-4 mb-12">
        {pilares.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i*0.1) }} className="flex items-center gap-6 p-4 rounded-xl bg-[#1A1A24] border border-white/5">
            <div className="w-12 h-12 rounded-full bg-[#9D64FF] text-white flex items-center justify-center font-black text-xl shrink-0">{p.num}</div>
            <div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight">{p.title}</h3>
              <p className="text-slate-400">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center text-2xl text-[#25D366] font-bold uppercase tracking-widest">
        No centro de tudo: resultado financeiro e expansão.
      </motion.div>
    </div>
  )
}

// SLIDE 10
function Slide10() {
  const entregas = [
    { t: 'Tráfego Pago (Meta/Google)', d: 'Campanhas estratégicas que geram demanda qualificada, não apenas alcance.' },
    { t: 'Google Meu Negócio', d: 'Seu restaurante aparece na frente de quem está procurando agora.' },
    { t: 'Engenharia de Cardápio', d: 'Estruturamos seu cardápio para converter mais e aumentar o ticket médio.' },
    { t: 'CRM e Fidelização', d: 'Estratégias para fazer o cliente voltar e comprar com frequência.' },
    { t: 'Gestão de Marketplace', d: 'iFood e 99Food otimizados para vender mais e perder menos margem.' },
    { t: 'Relatórios de Faturamento', d: 'Você acompanha o impacto em caixa real, não em métrica vazia.' }
  ]
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-7xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-12">
        As Entregas <br/><span className="text-slate-500 text-3xl md:text-4xl">(O que você recebe)</span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {entregas.map((e, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i*0.1) }} className="flex gap-4">
            <Target className="text-[#9D64FF] shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-bold text-xl mb-1">{e.t}</h3>
              <p className="text-slate-400 font-light">{e.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-2xl text-white font-black uppercase tracking-widest border-l-4 border-[#25D366] pl-6 py-2">
        Tudo conectado. Tudo com propósito. Tudo orientado a resultado.
      </motion.div>
    </div>
  )
}

// SLIDE 11
function Slide11() {
  const parceiros = ['Repediu', 'Abrasel', 'Cardápio Web', 'Falaê', 'Anota AI', 'Saipos', 'Hubnexxo']
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
        Você não contrata só uma equipe.<br/>
        <span className="text-[#9D64FF]">Você entra em um ecossistema.</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-slate-400 font-light mb-16">
        A Pinguim opera integrada com as maiores plataformas e referências do setor gastronômico:
      </motion.p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {parceiros.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + (i*0.1) }} className="px-6 py-3 bg-[#1A1A24] border border-white/10 rounded-full text-xl text-white font-bold">
            {p}
          </motion.div>
        ))}
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-2xl text-slate-300 font-light">
        Isso significa mais tecnologia, mais inteligência e <strong className="text-white">mais resultado para o seu negócio.</strong>
      </motion.div>
    </div>
  )
}

// SLIDE 12
function Slide12() {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl md:text-5xl text-slate-500 font-light italic mb-8 border-l-4 border-slate-700 pl-6">
        "Já gastei com marketing antes e não funcionou."
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-2xl text-white mb-10">
        Entendo. E faz todo sentido você desconfiar.<br/> Mas aqui vai a pergunta certa: <strong className="text-[#9D64FF]">O que você contratou antes era tráfego isolado — ou um sistema completo?</strong>
      </motion.p>
      
      <div className="flex flex-col gap-4 mb-12">
        {['Tráfego sem cardápio otimizado não converte.', 'Anúncio sem oferta estratégica não vende.', 'Cliente novo sem retenção não volta.'].map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + (i*0.1) }} className="text-xl text-slate-400 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full" /> {t}
          </motion.div>
        ))}
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-3xl font-bold text-white">
        O problema nunca foi marketing. <span className="text-[#25D366]">Foi a falta de sistema.</span><br/>
        <span className="text-xl font-light text-slate-400">É exatamente isso que a Pinguim resolve.</span>
      </motion.div>
    </div>
  )
}

// SLIDE 13
function Slide13() {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl md:text-5xl text-slate-500 font-light italic mb-8 border-l-4 border-slate-700 pl-6">
        "É caro."
      </motion.div>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-4xl font-black text-white mb-8">Vamos fazer uma conta rápida.</motion.h2>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-8 bg-[#1A1A24] border border-white/10 rounded-2xl mb-10">
        <p className="text-xl text-slate-300 mb-6">
          Se o seu ticket médio é R$ 60 e o sistema trouxer 30 clientes novos por mês que voltam 2x…<br/>
          <strong className="text-2xl text-[#25D366]">São R$ 3.600 em receita recorrente gerada.</strong>
        </p>
        <p className="text-xl text-slate-300">
          E se além disso o ticket médio subir R$ 10 em média?<br/>
          Em 300 pedidos por mês, isso é <strong className="text-2xl text-[#25D366]">R$ 3.000 a mais todo mês.</strong>
        </p>
      </motion.div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-3xl text-white font-light">
        O sistema não é um custo. É o investimento que financia ele mesmo.<br/>
        <strong className="font-black mt-2 inline-block">A pergunta certa não é "quanto custa". É "quanto estou deixando de ganhar sem isso".</strong>
      </motion.div>
    </div>
  )
}

// SLIDE 14
function Slide14() {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl md:text-5xl text-slate-500 font-light italic mb-8 border-l-4 border-slate-700 pl-6">
        "Preciso pensar."
      </motion.div>
      
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl font-light text-white mb-10 leading-tight">
        Tudo bem. Mas deixa eu te fazer uma pergunta honesta:<br/>
        <strong className="font-black text-[#9D64FF]">Enquanto você pensa, quantos clientes vão entrar no seu restaurante essa semana e não voltar nunca mais?</strong>
      </motion.h2>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-2xl text-slate-400 space-y-4">
        <p>Não é pressão. É realidade.</p>
        <p>Cada semana sem sistema é uma semana de receita previsível que ficou na mesa.</p>
        <p className="text-white font-bold text-3xl mt-8">A decisão de pensar também tem um preço.</p>
      </motion.div>
    </div>
  )
}

// SLIDE 15
function Slide15() {
  const items = [
    'Método Pinguim completo',
    'Gestão estratégica de Meta Ads',
    'Otimização de Google Meu Negócio',
    'Engenharia de Cardápio',
    'Análise completa dos seus ativos digitais',
    'Relatórios mensais de faturamento real',
    'Suporte direto via WhatsApp'
  ]
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-12 max-w-7xl mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8 items-stretch h-full w-full">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 bg-[#1A1A24] rounded-3xl p-8 border border-[#9D64FF]/30 shadow-[0_0_30px_rgba(0,71,255,0.1)] flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-black text-white uppercase mb-6">O que você recebe hoje:</h2>
            <div className="flex flex-col gap-4">
              {items.map((it, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-[#25D366] shrink-0 w-5 h-5"/> {it}</div>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Investimento na Gestão</p>
            <p className="text-5xl font-black text-white">R$ 2.000<span className="text-xl font-light text-slate-500">/mês</span></p>
            <p className="text-slate-500 mt-2 text-sm">+ Investimento em anúncio a partir de R$ 1.500/mês</p>
          </div>
        </motion.div>

        <div className="w-full md:w-[40%] flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-[#111116] rounded-3xl p-8 border border-white/5 flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Quer gestão de iFood/99Food?</h3>
            <p className="text-3xl font-black text-[#9D64FF] my-4">+ R$ 1.000<span className="text-sm font-light text-slate-500">/mês por plataforma</span></p>
            <p className="text-sm text-slate-400">Cardápio estruturado, cupons otimizados e análise de frete.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-[#111116] rounded-3xl p-8 border border-white/5 flex-1 flex flex-col justify-center">
            <h3 className="text-white font-bold text-lg mb-2">Contrato mínimo de 3 meses.</h3>
            <p className="text-slate-400 text-sm">Tempo suficiente para o sistema começar a trabalhar por você.<br/><br/>Após os 3 meses, renovação automática — porque quem vê resultado não quer parar.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// SLIDE 16
function Slide16() {
  return (
    <div className="flex flex-col justify-center items-center text-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-24 h-24 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mb-10">
        <Target className="w-10 h-10 text-[#25D366]" />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
        Você não está comprando <br/>uma promessa.
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl leading-relaxed mb-12">
        Você está entrando em um sistema com histórico comprovado. Não trabalhamos com contrato longo de entrada porque acreditamos no nosso método. 3 meses é o tempo que o sistema precisa para mostrar resultado. Se você aplicar o processo, os números vão falar por si mesmos.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-2xl font-bold text-white border-b-2 border-[#25D366] pb-2 inline-block">
        Nosso compromisso: Seriedade, transparência e reais na sua conta.
      </motion.div>
    </div>
  )
}

// SLIDE 17
function Slide17() {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-6xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-12">
        Você tem duas opções agora:
      </motion.h2>
      
      <div className="flex flex-col md:flex-row gap-6 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex-1 p-8 rounded-2xl border border-white/5 bg-[#111116] opacity-50">
          <h3 className="text-2xl font-bold text-slate-400 mb-4">Opção 1</h3>
          <p className="text-slate-500">Continuar fazendo o que sempre fez. Investir sem sistema, torcer para funcionar, ver o concorrente crescer.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex-1 p-8 rounded-2xl border border-[#9D64FF]/50 bg-[#9D64FF]/10 shadow-[0_0_30px_rgba(0,71,255,0.15)] relative overflow-hidden group">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[sweep_2s_infinite]" />
          <h3 className="text-2xl font-bold text-[#9D64FF] mb-4">Opção 2</h3>
          <p className="text-white text-lg">Implementar o sistema que transforma seu restaurante em uma máquina de vendas previsíveis.</p>
        </motion.div>
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-2xl text-slate-300 font-light text-center max-w-3xl mx-auto">
        A Pinguim não trabalha com qualquer restaurante. Trabalhamos com quem está comprometido com crescimento real.<br/><br/>
        <strong className="text-4xl text-white font-black block mt-6">Vamos estruturar o seu sistema?</strong>
      </motion.div>
    </div>
  )
}

// SLIDE 18
function Slide18() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-8 w-full relative">
      <div className="absolute inset-0 bg-[#9D64FF]/5 blur-3xl pointer-events-none" />
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-light text-slate-400 mb-8">
        A Pinguim existe para uma coisa:
      </motion.h2>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="py-8 px-12 bg-[#9D64FF] rounded-3xl shadow-[0_0_40px_rgba(0,71,255,0.4)] mb-12">
        <span className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none block">
          Fazer seu restaurante
        </span>
        <span className="text-white text-4xl md:text-6xl font-medium uppercase tracking-widest leading-none block mt-4 opacity-90">
          Vender mais todo dia.
        </span>
      </motion.div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-slate-400 mb-12">
        Não somos uma agência comum. Somos o braço estratégico do seu negócio.
      </motion.div>
      
      <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="px-10 py-5 bg-[#25D366] hover:bg-[#1DA851] rounded-xl text-white font-bold uppercase tracking-wide text-xl flex items-center gap-3 shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all"
        onClick={() => window.open('https://wa.me/55', '_blank')}>
        Falar com o Júnior PS <ChevronRight />
      </motion.button>
      
      <div className="absolute bottom-10 font-mono text-xs text-slate-600 tracking-widest uppercase flex flex-col items-center gap-2">
        <span>📲 @juniorps</span>
        <span>Pinguim — Marketing para Restaurantes & Delivery</span>
      </div>
    </div>
  )
}

function renderSlide(id: number) {
  switch (id) {
    case 1: return <Slide1 />
    case 2: return <Slide2 />
    case 3: return <Slide3 />
    case 4: return <Slide4 />
    case 5: return <Slide5 />
    case 6: return <Slide6 />
    case 7: return <Slide7 />
    case 8: return <Slide8 />
    case 9: return <Slide9 />
    case 10: return <Slide10 />
    case 11: return <Slide11 />
    case 12: return <Slide12 />
    case 13: return <Slide13 />
    case 14: return <Slide14 />
    case 15: return <Slide15 />
    case 16: return <Slide16 />
    case 17: return <Slide17 />
    case 18: return <Slide18 />
    default: return null
  }
}

export default function ApresentacaoV2() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = useCallback(() => {
    if (current < slides.length - 1) { setDirection(1); setCurrent(c => c + 1) }
  }, [current])

  const goPrev = useCallback(() => {
    if (current > 0) { setDirection(-1); setCurrent(c => c - 1) }
  }, [current])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  const slide = slides[current]

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir < 0 ? 50 : -50 }),
  }

  return (
    <div className="h-screen w-screen bg-[#030305] text-white font-sans overflow-hidden flex flex-col select-none relative">
      {/* ── BACKGROUNDS ── */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#7B3FE4]/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3 z-0" />

      <div className="absolute top-0 left-0 right-0 px-8 py-8 z-20 flex justify-between items-center opacity-30 pointer-events-none">
        <div className="w-6 h-6 rounded bg-[#9D64FF]" />
        <div className="font-mono text-xs tracking-widest text-slate-400">{String(current + 1).padStart(2, '0')} / {slides.length}</div>
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col z-10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="absolute inset-0 flex items-center justify-center">
            {renderSlide(slide.id)}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-8 z-20 flex justify-center items-center pointer-events-none">
        <div className="flex gap-4 pointer-events-auto">
          <button onClick={goPrev} disabled={current === 0} className="w-12 h-12 rounded-full border border-white/5 bg-[#1A1A24]/50 flex items-center justify-center hover:bg-[#1A1A24] disabled:opacity-0 transition-all text-slate-400"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex gap-1 items-center px-4">
            {slides.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-[#9D64FF]' : 'w-1.5 bg-white/10'}`} />
            ))}
          </div>
          <button onClick={goNext} disabled={current === slides.length - 1} className="w-12 h-12 rounded-full border border-white/5 bg-[#1A1A24]/50 flex items-center justify-center hover:bg-[#1A1A24] hover:text-[#9D64FF] disabled:opacity-0 transition-all text-slate-400"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  )
}
