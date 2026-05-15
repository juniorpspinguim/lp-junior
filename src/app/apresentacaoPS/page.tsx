'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Target, Rocket, DollarSign, RefreshCw, BarChart3, Users, Crosshair, Brain, MessageSquare, AlertTriangle, TrendingDown, TrendingUp, CheckCircle2, Check, Square, X, Barcode } from 'lucide-react'

const slides = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, content: `slide${i + 1}` }))

// SLIDE 1
function Slide1() {
  return (
    <div className="flex flex-col items-start justify-center h-full px-8 md:px-20 relative w-full max-w-7xl mx-auto pt-16 text-left z-10 font-[family-name:var(--font-outfit)]">

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-medium tracking-[0.2em] text-[10px] md:text-xs uppercase font-[family-name:var(--font-inter)] shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-md rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF] animate-pulse" />
          Agência Referência na Bahia
        </span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} 
        className="text-[12vw] md:text-8xl lg:text-[110px] font-black leading-[0.95] tracking-tight text-white uppercase mb-16 max-w-6xl drop-shadow-2xl">
        A diferença <br />
        <span className="text-slate-300">entre crescer</span> <br />
        <span className="text-slate-300">e estagnar</span> <br />
        <span className="text-[#0047FF]">é simples.</span>
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
      }, 2500 + i * 1800)
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
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12">
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
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 150, damping: 20 }}>
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="px-6 py-4 bg-[#0047FF]/10 border border-[#0047FF]/30 rounded-xl inline-block text-[#0047FF] font-medium text-xl w-fit relative z-10">
        Se você marcou pelo menos uma, esse papo é pra você.
      </motion.div>

      {/* Efeito Feno Rolando (Tumbleweed) */}
      <AnimatePresence>
        {marked.includes(dores.length - 1) && (
          <motion.div
            initial={{ x: "20vw", rotate: 0, y: 0, opacity: 0 }}
            animate={{ 
              x: "-120vw", 
              rotate: -1440,
              y: [0, -100, 0, -70, 0, -40, 0, -20, 0, -10, 0],
              opacity: [0, 0.4, 0.4, 0.4, 0]
            }}
            transition={{ 
              duration: 8, 
              ease: "linear",
              delay: 0.5
            }}
            className="absolute bottom-10 right-0 z-0 pointer-events-none drop-shadow-2xl"
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
  const tableData = [
    { dor: 'Tráfego sem cardápio otimizado = visita que não converte', salao: false, delivery: true },
    { dor: 'Ticket baixo = trabalha mais, ganha igual', salao: true, delivery: true },
    { dor: 'Falta de comunicação = cliente não sabe o que você vende', salao: true, delivery: true },
    { dor: 'Pedido sem retenção = cliente compra uma vez e some', salao: false, delivery: true },
    { dor: 'Mesa vazia = potencial desperdiçado todo dia', salao: true, delivery: false },
    { dor: 'Cliente entra, consome pouco e não volta', salao: true, delivery: false },
    { dor: 'Visibilidade zero = ninguém fora do bairro te conhece', salao: true, delivery: true },
    { dor: 'Promoção sem estratégia = desconto que come sua margem', salao: true, delivery: true }
  ]

  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-6xl mx-auto w-full">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
        O problema não é <br/>falta de dinheiro investido.
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-slate-400 font-light mb-8">
        Uma engrenagem travada não importa o quanto você force <strong className="text-white">ela não move.</strong>
      </motion.p>
      
      <div className="w-full mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/20 border-b border-white/10">
              <th className="py-4 px-6 font-bold text-slate-400 text-xs md:text-sm uppercase tracking-widest">Dores que você enfrenta no dia a dia</th>
              <th className="py-4 px-6 font-bold text-slate-400 text-xs md:text-sm uppercase tracking-widest text-center w-24 md:w-32">Salão</th>
              <th className="py-4 px-6 font-bold text-slate-400 text-xs md:text-sm uppercase tracking-widest text-center w-24 md:w-32">Delivery</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <motion.tr key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i*0.05) }} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="py-3 px-6 text-slate-400 font-light text-sm md:text-lg group-hover:text-white transition-colors">{row.dor}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex justify-center">
                    {row.salao ? <Check className="w-5 h-5 text-[#25D366]" strokeWidth={3} /> : <X className="w-5 h-5 text-red-500" strokeWidth={2} />}
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex justify-center">
                    {row.delivery ? <Check className="w-5 h-5 text-[#25D366]" strokeWidth={3} /> : <X className="w-5 h-5 text-red-500" strokeWidth={2} />}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-xl md:text-2xl text-white font-light border-l-4 border-[#0047FF] pl-6">
        E enquanto isso seu concorrente com metade da sua estrutura está <strong className="text-[#0047FF] font-bold">faturando mais.</strong>
      </motion.div>
    </div>
  )
}

// SLIDE 4
function Slide4() {
  const [showBoleto, setShowBoleto] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowBoleto(true), 6000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        {!showBoleto ? (
          <motion.div 
            key="text1"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }} 
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight"
          >
            O restaurante que não tem um <span className="text-[#0047FF]">método</span> validado, depende da sorte.
          </motion.div>
        ) : (
          <motion.div 
            key="text2"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }} 
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
            transition={{ duration: 0.8, type: 'spring' }} 
            className="flex flex-col items-center justify-center w-full"
          >
            <div className="text-5xl md:text-6xl lg:text-8xl font-black text-red-500 uppercase tracking-tighter leading-tight">
              E sorte não paga boleto.
            </div>
            <div className="flex items-center justify-center gap-1 md:gap-[6px] mt-10 h-20 md:h-28">
              {[1, 3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2, 1].map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
                  className="bg-white rounded-[2px] h-full origin-top"
                  style={{ width: `${w * 4}px` }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}



// SLIDE 6
function Slide6() {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-6xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-12">
        A Pinguim não é <br/><span className="text-slate-500">agência de marketing.</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl text-[#0047FF] font-medium mb-12">
        A Pinguim é uma estrutura de crescimento para restaurantes.
      </motion.p>
      
      <div className="flex flex-col gap-6 mb-16">
        {[
          '+4 anos atuando 100% no setor gastronômico',
          'Operamos com restaurantes e deliveries, com presença em 20 estados do Brasil',
          'Responsáveis pelo maior grupo de networking para agências de restaurantes do país: Clube do Pinguim'
        ].map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i*0.1) }} className="flex items-start gap-4 text-xl md:text-2xl text-slate-300 font-light">
            <div className="w-2 h-2 mt-3 bg-[#0047FF] rounded-full shrink-0" /> <p>{t}</p>
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
  const logos = [
    { src: "/5d826a21PIZZA_BITES_LTDA1707785910997blob.png", alt: "Burger B" },
    { src: "/Jeanne Garcia.png", alt: "VK Steak & Burger" },
    { src: "/Fundo de Grupo Gege Belo Horizonte Removido.png", alt: "Gegê Delivery" },
    { src: "/Fundo de Logo 071 Burger Salvador Removido.png", alt: "071 Burger" },
    { src: "/Fundo de Logo FatGuys Salvador  png.png", alt: "Fat Guys" },
    { src: "/Logo Villa Bistro Curitiba.png", alt: "Villa Bistro" },
    { src: "/592238295_122120029046993995_5886872904706956800_n.png", alt: "Noa" },
    { src: "/Santa Feijuca.png", alt: "Santa Feijuca" },
    { src: "/logo-subway-256.png", alt: "Subway" }
  ];

  const row1Base = logos.slice(0, 5);
  const row2Base = logos.slice(4);

  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-8 md:px-0 max-w-full mx-auto overflow-hidden">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 px-8">
        Quem já implementou <br/><span className="text-[#0047FF]">o método?</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-slate-400 mb-12 px-8">
        De delivery a bistrô. De burger a comida italiana. <br/>O método funciona independente do segmento.
      </motion.p>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="w-full overflow-hidden flex flex-col gap-4 md:gap-6 relative mb-16">
        <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[#0D0D12] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[#0D0D12] to-transparent z-10 pointer-events-none" />
        
        {/* ROW 1: Scrolling Left */}
        <motion.div
          className="flex gap-4 md:gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        >
          {[...row1Base, ...row1Base, ...row1Base, ...row1Base].map((l, i) => (
            <div key={i} className="w-[160px] md:w-[220px] h-[90px] md:h-[120px] shrink-0 bg-[#13131A] border border-white/5 rounded-xl flex items-center justify-center hover:border-[#0047FF]/50 transition-all hover:scale-105 hover:bg-[#1A1A24] cursor-default shadow-lg p-6">
              <img src={l.src} alt={l.alt} className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
            </div>
          ))}
        </motion.div>

        {/* ROW 2: Scrolling Right */}
        <motion.div
          className="flex gap-4 md:gap-6 w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        >
          {[...row2Base, ...row2Base, ...row2Base, ...row2Base].map((l, i) => (
            <div key={i} className="w-[160px] md:w-[220px] h-[90px] md:h-[120px] shrink-0 bg-[#13131A] border border-white/5 rounded-xl flex items-center justify-center hover:border-[#0047FF]/50 transition-all hover:scale-105 hover:bg-[#1A1A24] cursor-default shadow-lg p-6">
              <img src={l.src} alt={l.alt} className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-2xl text-white font-light px-8">
        O que eles têm em comum? <br/>
        <strong className="text-[#0047FF]">Deixaram de depender de sorte. Passaram a operar com previsibilidade.</strong>
      </motion.div>
    </div>
  )
}

// SLIDE 8
function Slide8() {
  const monthsData = [
    { label: 'D/24', value: 67, rev: 'R$ 321.784' },
    { label: 'J/25', value: 75, rev: 'R$ 362.095' },
    { label: 'F/25', value: 71, rev: 'R$ 340.749' },
    { label: 'M/25', value: 80, rev: 'R$ 383.172' },
    { label: 'A/25', value: 68, rev: 'R$ 325.491' },
    { label: 'M/25', value: 92, rev: 'R$ 439.956' },
    { label: 'J/25', value: 84, rev: 'R$ 404.925' },
    { label: 'J/25', value: 100, rev: 'R$ 479.216' },
    { label: 'A/25', value: 89, rev: 'R$ 426.546' },
    { label: 'S/25', value: 84, rev: 'R$ 403.804' },
    { label: 'O/25', value: 90, rev: 'R$ 432.102' },
    { label: 'N/25', value: 92, rev: 'R$ 441.011' },
    { label: 'D/25', value: 73, rev: 'R$ 352.662' },
    { label: 'J/26', value: 87, rev: 'R$ 416.331' },
    { label: 'F/26', value: 88, rev: 'R$ 420.478' },
    { label: 'M/26', value: 92, rev: 'R$ 442.163' }
  ]

  const stats = [
    { v: 'R$ 14,2K', l: 'Receita Diária Média (Mar/26)' },
    { v: 'R$ 102K+', l: 'Receita Delivery (Mar/26)' },
    { v: 'R$ 339K+', l: 'Receita Salão (Mar/26)' }
  ]

  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-6xl mx-auto w-full">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
        Método Pinguim
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-slate-400 font-light mb-8 max-w-4xl">
        Método pinguim entrega dados com base no seu faturamento. E não apenas uma sopa de letrinhas (CPC, CPM, CTR).
      </motion.p>
      
      {/* DASHBOARD CONTAINER */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full bg-[#0D0D12] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-10">
        
        {/* Glow effect */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#25D366]/10 blur-3xl rounded-full pointer-events-none" />

        {/* CHART AREA */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="mb-8">
            <h3 className="text-white text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              Evolução de Receita
            </h3>
            <p className="text-slate-500 text-sm">Histórico de 16 meses rastreados (Dez/24 a Mar/26)</p>
          </div>

          <div className="h-48 md:h-56 w-full flex items-end justify-between gap-1 md:gap-2 pt-4 relative">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 md:pb-8">
               <div className="w-full border-t border-white/5"></div>
               <div className="w-full border-t border-white/5"></div>
               <div className="w-full border-t border-white/5"></div>
               <div className="w-full border-t border-white/5"></div>
            </div>

            {monthsData.map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1 z-10 group h-full">
                <div className="w-full relative flex justify-center items-end flex-1 group-hover:brightness-125 transition-all">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${d.value}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                    className="w-full max-w-[12px] md:max-w-[24px] bg-gradient-to-t from-[#25D366]/20 to-[#25D366] rounded-t-sm relative cursor-pointer"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-white font-bold text-[10px] md:text-xs whitespace-nowrap bg-[#13131A] px-2 py-1 rounded border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                      {d.rev}
                    </div>
                  </motion.div>
                </div>
                {/* Labels: hide some on mobile to avoid overlap */}
                <span className={`text-slate-500 text-[8px] md:text-[10px] mt-2 md:mt-3 font-semibold uppercase tracking-wider ${i % 2 !== 0 ? 'hidden md:block' : 'block'}`}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* KPIs AREA */}
        <div className="w-full md:w-64 flex flex-col gap-3 justify-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + (i*0.1) }} className="bg-[#13131A] border border-white/5 rounded-xl p-4 flex flex-col hover:border-white/10 transition-colors">
              <span className="text-slate-500 text-[10px] md:text-[11px] uppercase tracking-widest font-semibold mb-1">{s.l}</span>
              <span className="text-xl md:text-2xl font-black text-white">{s.v}</span>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }} className="bg-gradient-to-br from-[#0047FF]/20 to-[#0047FF]/5 border border-[#0047FF]/30 rounded-xl p-4 flex flex-col">
            <span className="text-[#0047FF] text-[10px] md:text-[11px] uppercase tracking-widest font-semibold mb-1">Receita Total</span>
            <span className="text-2xl md:text-3xl font-black text-white">R$ 6,38M+</span>
          </motion.div>
        </div>

      </motion.div>
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
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
        O Método Pinguim
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-slate-400 font-light mb-12">
        Construído dentro de centenas de restaurantes reais. Não em teoria.<br/>
        Sustentado por 5 pilares que formam um ciclo contínuo:
      </motion.p>
      
      <div className="flex flex-col gap-4 mb-12 relative">
        {/* Animated vertical connecting line */}
        <div className="absolute left-[39px] md:left-[43px] top-[40px] md:top-[44px] bottom-[40px] md:bottom-[44px] w-[2px] bg-white/5 z-0">
          <motion.div 
            initial={{ height: 0 }} 
            animate={{ height: '100%' }} 
            transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }} 
            className="w-full bg-[#0047FF] shadow-[0_0_15px_rgba(0,71,255,0.8)]"
          />
        </div>

        {pilares.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i*0.25) }} className="flex items-center gap-6 p-4 md:p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl hover:bg-white/10 hover:border-white/20 transition-all relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#0047FF] text-white flex items-center justify-center font-black text-xl shrink-0 shadow-[0_0_15px_rgba(0,71,255,0.5)] relative z-10">{p.num}</div>
            <div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight">{p.title}</h3>
              <p className="text-slate-400">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center text-2xl text-[#0047FF] font-black uppercase tracking-widest drop-shadow-[0_0_15px_rgba(0,71,255,0.5)]">
        Elogio de adulto é pix.
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
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-12 leading-tight">
        Como vamos te ajudar a <br/><span className="text-[#0047FF]">aumentar o faturamento</span>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
        {entregas.map((e, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 + (i*0.1) }} 
            className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* HTML/CSS Effects */}
            {/* 1. Sweep gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0047FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            {/* 2. Left progressive border */}
            <div className="absolute top-0 left-0 w-1 h-0 bg-[#25D366] group-hover:h-full transition-all duration-300 ease-out" />
            
            <div className="flex gap-5 relative z-10">
              {/* Animated Icon Box */}
              <div className="w-12 h-12 rounded-xl bg-[#0047FF]/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#0047FF] transition-all duration-300 shadow-[0_0_10px_rgba(0,71,255,0.2)] group-hover:shadow-[0_0_20px_rgba(0,71,255,0.6)]">
                <Target className="text-[#0047FF] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#25D366] transition-colors">{e.t}</h3>
                <p className="text-slate-400 font-light leading-relaxed">{e.d}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}

// SLIDE 11
function Slide11() {
  const parceiros = ['Repediu', 'Abrasel', 'Cardápio Web', 'Falaê', 'Hubnexxo']
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
        Você não contrata só uma equipe.<br/>
        <span className="text-[#0047FF]">Você entra em um ecossistema.</span>
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

// SLIDE 14
function Slide14() {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl md:text-5xl text-slate-500 font-light italic mb-8 border-l-4 border-slate-700 pl-6">
        "Preciso pensar."
      </motion.div>
      
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl font-light text-white mb-10 leading-tight">
        Tudo bem. Mas deixa eu te fazer uma pergunta honesta:<br/>
        <strong className="font-black text-[#0047FF]">Enquanto você pensa, quantos clientes vão entrar no seu restaurante essa semana e não voltar nunca mais?</strong>
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
  const plan1 = [
    'Gestão de Meta Ads & Google Ads',
    'Otimização de Google Meu Negócio',
    'Engenharia de Cardápio',
    'Análise completa de ativos digitais',
    'Relatórios de faturamento real',
    'Suporte direto via WhatsApp'
  ]
  
  const plan2 = [
    'Gestão estratégica de marketplace',
    'Otimização agressiva de cupons',
    'Análise de área de entrega e frete',
    'Estratégias de fidelização no app'
  ]

  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-6xl mx-auto py-10">
      
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 text-center">
        Escolha o seu nível de <span className="text-[#0047FF]">tração</span>
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-8 w-full mb-8 items-stretch">
        
        {/* PLANO 1 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex-1 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:bg-white/[0.04] transition-colors">
          <div>
            <h3 className="text-2xl font-bold text-slate-300 uppercase mb-2 tracking-widest">Plano Performance</h3>
            <p className="text-sm text-slate-400 mb-6">O ecossistema essencial para atrair clientes de forma independente.</p>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-white font-bold mb-1">
                <CheckCircle2 className="text-[#0047FF] w-5 h-5" /> Método Pinguim Completo
              </div>
              {plan1.map((it, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                  <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Check className="text-white/70 w-3 h-3" />
                  </div>
                  {it}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              R$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-xl font-light text-slate-500 tracking-normal">/mês</span>
            </p>
            <p className="text-slate-500 mt-2 text-xs uppercase tracking-widest font-bold">
              + Verba de anúncios
            </p>
            <p className="text-slate-500/70 mt-4 text-[10px] leading-snug">
              * Valor válido para a gestão de 1 unidade. Converse conosco para consultar a opção para mais de uma unidade.
            </p>
          </div>
        </motion.div>

        {/* PLANO 2 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex-[1.1] bg-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-[#0047FF]/50 shadow-[0_0_50px_rgba(0,71,255,0.15)] flex flex-col justify-between relative overflow-hidden group hover:border-[#0047FF] transition-all duration-500 transform md:-translate-y-4">
          <div className="absolute top-0 right-0 bg-[#0047FF] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl z-10">
            Plano Dominância 360º
          </div>
          
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0047FF]/20 blur-3xl rounded-full pointer-events-none group-hover:bg-[#0047FF]/30 transition-colors" />

          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white uppercase mb-2 tracking-tighter text-[#0047FF]">Plano Dominância</h3>
            <p className="text-sm text-slate-300 mb-6">Para quem quer dominar a cidade no tráfego próprio e nos apps.</p>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-white font-bold mb-1 pb-3 border-b border-white/10">
                <CheckCircle2 className="text-[#0047FF] w-5 h-5" /> Tudo do Performance, mais:
              </div>
              {plan2.map((it, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-100 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#0047FF]/20 flex items-center justify-center shrink-0 border border-[#0047FF]/50">
                    <CheckCircle2 className="text-[#0047FF] w-3 h-3" />
                  </div>
                  {it}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
            <p className="text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-xl">
              R$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-2xl font-light text-slate-500 tracking-normal">/mês</span>
            </p>
            <p className="text-[#0047FF] mt-2 text-xs uppercase tracking-widest font-bold">
              + Verba de anúncios
            </p>
            <p className="text-slate-400 mt-4 text-[10px] leading-snug">
              * Valor válido para a gestão de 1 marketplace ou unidade. Converse conosco para consultar a opção para mais de uma plataforma ou unidade.
            </p>
          </div>
        </motion.div>
      </div>

      {/* CONTRATO */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full bg-[#25D366]/5 backdrop-blur-md rounded-2xl p-6 border border-[#25D366]/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group hover:border-[#25D366]/60 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 blur-2xl rounded-full pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <Check className="text-[#25D366] w-10 h-10 shrink-0" />
          <div>
            <h3 className="text-white font-black text-lg uppercase tracking-wide">Contrato mínimo: 3 meses.</h3>
            <p className="text-slate-400 text-sm">Tempo suficiente para o sistema maturar e gerar resultados sólidos.</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm md:text-right relative z-10">
          Renovação automática após o período.<br/> <strong className="text-white">Quem vê resultado real não quer parar.</strong>
        </p>
      </motion.div>

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
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">
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
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-12">
        Você tem duas opções agora:
      </motion.h2>
      
      <div className="flex flex-col md:flex-row gap-6 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex-1 p-8 rounded-2xl border border-white/5 bg-[#111116] opacity-50">
          <h3 className="text-2xl font-bold text-slate-400 mb-4">Opção 1</h3>
          <p className="text-slate-500">Continuar fazendo o que sempre fez. Investir sem sistema, torcer para funcionar, ver o concorrente crescer.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex-1 p-8 rounded-2xl border border-[#0047FF]/50 bg-[#0047FF]/10 shadow-[0_0_30px_rgba(0,71,255,0.15)] relative overflow-hidden group">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[sweep_2s_infinite]" />
          <h3 className="text-2xl font-bold text-[#0047FF] mb-4">Opção 2</h3>
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
    <div className="flex flex-col items-center justify-center text-center h-full px-8 w-full relative max-w-6xl mx-auto">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0047FF]/10 blur-[120px] pointer-events-none" />
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative z-10 w-full">
        
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-slate-300 text-xs md:text-sm font-bold uppercase tracking-widest">Vagas limitadas para novos clientes este mês</span>
        </div>

        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
          Pronto para transformar <br/> o seu negócio em uma <br/> <span className="text-[#0047FF] drop-shadow-[0_0_30px_rgba(0,71,255,0.4)]">Máquina de Vendas?</span>
        </h2>
        
        <p className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-16">
          Enquanto você pensa, o seu concorrente já está implementando essas estratégias. <br/><strong className="text-white mt-4 inline-block">Qual plano vamos rodar hoje?</strong>
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl mx-auto">
          {/* Card Resumo Plano 1 */}
          <div className="flex-1 w-full bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 group">
            <h3 className="text-slate-500 text-sm uppercase tracking-widest font-bold mb-2">Plano 1</h3>
            <p className="text-white text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Performance</p>
            <div className="h-[2px] w-12 bg-white/10 mb-4 group-hover:w-24 transition-all duration-300" />
            <p className="text-slate-300 font-medium">Tráfego & Engenharia de Cardápio</p>
          </div>

          {/* Card Resumo Plano 2 */}
          <div className="flex-1 w-full bg-[#0047FF]/10 border border-[#0047FF]/40 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden shadow-[0_0_40px_rgba(0,71,255,0.15)] group hover:border-[#0047FF]/80 transition-all duration-300 transform md:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0047FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-[#0047FF] text-sm uppercase tracking-widest font-bold mb-2 relative z-10">Plano 2 (Recomendado)</h3>
            <p className="text-white text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 relative z-10 drop-shadow-lg">Dominância</p>
            <div className="h-[2px] w-12 bg-[#0047FF]/50 mb-4 group-hover:w-24 transition-all duration-300 relative z-10" />
            <p className="text-white font-medium relative z-10">Tudo do Performance + <span className="text-[#0047FF] font-black">iFood/99</span></p>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

function renderSlide(id: number) {
  switch (id) {
    case 1: return <Slide1 />
    case 2: return <Slide6 />
    case 3: return <Slide2 />
    case 4: return <Slide3 />
    case 5: return <Slide4 />
    case 6: return <Slide7 />
    case 7: return <Slide8 />
    case 8: return <Slide9 />
    case 9: return <Slide10 />
    case 10: return <Slide11 />
    case 11: return <Slide15 />
    case 12: return <Slide18 />
    default: return null
  }
}

export default function ApresentacaoPS() {
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
    <div className="h-screen w-screen bg-[#0D0D12] text-white font-sans overflow-hidden flex flex-col select-none relative">
      <div className="absolute top-0 left-0 right-0 px-8 py-8 z-20 flex justify-between items-center opacity-30 pointer-events-none">
        <div className="w-6 h-6 rounded bg-[#0047FF]" />
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
              <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-[#0047FF]' : 'w-1.5 bg-white/10'}`} />
            ))}
          </div>
          <button onClick={goNext} disabled={current === slides.length - 1} className="w-12 h-12 rounded-full border border-white/5 bg-[#1A1A24]/50 flex items-center justify-center hover:bg-[#1A1A24] hover:text-[#0047FF] disabled:opacity-0 transition-all text-slate-400"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  )
}
