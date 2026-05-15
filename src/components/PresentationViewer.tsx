"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight, Search, Target, UtensilsCrossed, Zap, TrendingUp, Users, Award, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

interface Proposal {
  slug: string;
  restaurant_name: string;
  logo_url: string | null;
  service_value: number;
  ad_value: number;
  contract_duration: number;
  units?: number;
  services?: { id: string; name: string; price: number }[];
}

interface PresentationViewerProps {
  proposal: Proposal;
  services: { id: string; name: string; price: number }[];
}

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

export default function PresentationViewer({ proposal, services }: PresentationViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1) // 1 para baixo (next), -1 para cima (prev)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const totalSlides = 7
  const whatsapp = `https://wa.me/5571996623922?text=${encodeURIComponent('Olá! Acabei de ver a apresentação comercial e a proposta. Quero fechar negócio!')}`

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1)
      setCurrentSlide(prev => prev + 1)
      setIsNavVisible(false)
    }
  }, [currentSlide, totalSlides])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(prev => prev - 1)
      setIsNavVisible(true)
    }
  }, [currentSlide])

  // Lógica para esconder a navbar após inatividade
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isNavVisible) {
      timeout = setTimeout(() => {
        setIsNavVisible(false)
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [isNavVisible, currentSlide])

  // Suporte a teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        nextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  // Suporte a wheel (mouse/trackpad)
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null
    const handleWheel = (e: WheelEvent) => {
      if (wheelTimeout) return
      
      setIsNavVisible(true)

      // Suporta scroll horizontal (trackpad) e vertical (mouse)
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      
      if (delta > 50) {
        nextSlide()
        wheelTimeout = setTimeout(() => wheelTimeout = null, 800)
      } else if (delta < -50) {
        prevSlide()
        wheelTimeout = setTimeout(() => wheelTimeout = null, 800)
      }
    }
    
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [nextSlide, prevSlide])

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5 }
    })
  }

  // Handle Drag para Touch Devices
  const handleDragEnd = (e: any, { offset }: any) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      nextSlide()
    } else if (offset.x > swipeThreshold) {
      prevSlide()
    }
    setIsNavVisible(true)
  }

  return (
    <div 
      className="h-screen w-full bg-[#0D0D12] text-white overflow-hidden relative font-sans"
      onMouseMove={() => setIsNavVisible(true)}
      onTouchStart={() => setIsNavVisible(true)}
    >
      {/* Background Glow Fixo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#D4AF37]/3 rounded-full blur-[100px]" />
      </div>

      <AnimatePresence>
        {isNavVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0D0D12]/80 backdrop-blur-md border-b border-white/5"
          >
            <Image src="/logo-pinguim.png" alt="Pinguim" width={100} height={30} className="object-contain brightness-0 invert" />
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex gap-1 text-xs font-medium text-slate-400">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <div key={i} className={`h-1 w-6 rounded-full transition-colors ${currentSlide === i ? 'bg-[#D4AF37]' : 'bg-white/10'}`} />
                ))}
              </div>
              <button 
                onClick={() => setCurrentSlide(totalSlides - 1)}
                className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20 rounded-full transition-colors"
              >
                Ver Proposta
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Slide Area */}
      <div className="relative w-full h-full z-10 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 cursor-grab active:cursor-grabbing overflow-y-auto overflow-x-hidden no-scrollbar"
            style={{ touchAction: "pan-y" }}
          >
            {/* O conteúdo do slide previne a propagação do evento touch se tiver scroll interno longo,
                mas para essa apresentação "single-page" vamos deixar centralizado e responsivo. */}
            <div className="w-full max-w-5xl my-auto">
              {currentSlide === 0 && <SlideCapa proposal={proposal} />}
              {currentSlide === 1 && <SlideAutoridade />}
              {currentSlide === 2 && <SlideParceiros />}
              {currentSlide === 3 && <SlideVisao />}
              {currentSlide === 4 && <SlideProblema />}
              {currentSlide === 5 && <SlideMetodo />}
              {currentSlide === 6 && <SlideProposta proposal={proposal} services={services} whatsapp={whatsapp} />}
            </div>

            {/* Hint de navegação */}
            {currentSlide < totalSlides - 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 right-8 flex items-center text-slate-500 animate-bounce pointer-events-none"
              >
                <span className="text-[10px] font-medium mr-1 uppercase tracking-widest">Deslize</span>
                <ChevronRight size={20} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// SLIDE 1
function SlideCapa({ proposal }: { proposal: Proposal }) {
  const getLogoUrl = (url: string | null) => {
    if (!url) return null
    if (url.startsWith('http') || url.startsWith('/')) return url
    return `/${url}`
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold px-4 py-2 rounded-full tracking-widest uppercase mb-12 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
        Apresentação Estratégica
      </div>

      <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
          Marketing sem dados<br/>é apenas opinião.
        </span>
      </h1>
      
      <div className="w-24 h-1 bg-[#D4AF37] mb-12 rounded-full" />

      <div className="flex flex-col md:flex-row items-center gap-6 bg-white/[0.03] border border-white/10 px-8 py-6 rounded-[2rem] backdrop-blur-xl shadow-2xl">
        {proposal.logo_url && (
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-xl shadow-black/20">
            <img src={getLogoUrl(proposal.logo_url) || ''} alt={proposal.restaurant_name} className="w-full h-full object-contain p-2" />
          </div>
        )}
        <div className="text-center md:text-left">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] mb-1 font-bold">Exclusivo para</p>
          <p className="text-white font-black text-2xl md:text-3xl">{proposal.restaurant_name}</p>
        </div>
      </div>
    </div>
  )
}

// SLIDE 2: Autoridade
function SlideAutoridade() {
  const stats = [
    { icon: <Users size={20} />, label: 'Especialistas', value: 'Time focado 100% em Food Service' },
    { icon: <ShieldCheck size={20} />, label: 'Metodologia', value: 'Processos validados em +200 restaurantes' },
    { icon: <Award size={20} />, label: 'Resultado', value: 'Foco total em ROI e escala de vendas' },
  ]

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Sobre a Pinguim</p>
      <h2 className="text-4xl md:text-6xl font-black mb-12 text-center leading-[1.1]">
        Sua operação merece um<br/>
        <span className="text-white">marketing de alto nível.</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-5xl">
        <div className="space-y-8">
          <p className="text-slate-400 text-lg leading-relaxed">
            A Pinguim não é apenas uma agência. Somos o seu **braço direito estratégico**. 
            Entendemos as dores de quem opera no "fogo cruzado" entre salão e delivery.
          </p>
          <div className="space-y-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-all text-[#D4AF37] group-hover:scale-110">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-base">{stat.label}</p>
                  <p className="text-slate-500 text-sm">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#D4AF37] blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="relative bg-[#0F1014] border border-white/10 rounded-[3rem] p-1 overflow-hidden shadow-2xl transition-all duration-700">
             <div className="bg-gradient-to-br from-white/[0.05] to-transparent p-10 rounded-[2.9rem]">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-[#D4AF37]/20">
                  <Zap size={32} className="text-black" />
                </div>
                <p className="text-white text-2xl font-black leading-tight mb-6 italic">
                  "Nascemos para tirar o dono do operacional e colocá-lo no controle do crescimento."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Time Pinguim</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE 3: Parceiros (NOVO)
function SlideParceiros() {
  const partners = [
    { src: "/Santa Feijuca.png", alt: "Santa Feijuca" },
    { src: "/62d6c695ZL62Q0AOQQ_140327566206912.jpg", alt: "Smash Burger" },
    { src: "/5d826a21PIZZA_BITES_LTDA1707785910997blob.png", alt: "Burger B" },
    { src: "/Fundo de Logo FatGuys Salvador  png.png", alt: "Fat Guys" },
    { src: "/logo-subway-256.png", alt: "Subway" },
    { src: "/Logo Villa Bistro Curitiba.png", alt: "Villa Bistro" },
    { src: "/592238295_122120029046993995_5886872904706956800_n.png", alt: "Noa Poke" },
    { src: "/Fundo de Logo 071 Burger Salvador Removido.png", alt: "071 Burger" },
    { src: "/Fundo de Grupo Gege Belo Horizonte Removido.png", alt: "Gegê Delivery" },
  ]

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">Portfólio</p>
      <h2 className="text-4xl md:text-6xl font-black mb-12 text-center leading-tight">
        Quem já confia na nossa<br/><span className="text-white">estratégia de escala.</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">
        {partners.slice(0, 10).map((partner, i) => (
          <div key={i} className="aspect-square bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex items-center justify-center group hover:bg-white/[0.08] hover:border-[#D4AF37]/30 transition-all duration-500">
            <img src={partner.src} alt={partner.alt} className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-40 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-105" />
          </div>
        ))}
        <div className="aspect-square bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center group">
          <p className="text-[#D4AF37] font-black text-2xl mb-1">+200</p>
          <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Restaurantes Atendidos</p>
        </div>
      </div>
    </div>
  )
}

// SLIDE 4: Visao (NOVO)
function SlideVisao() {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">Visão Estratégica</p>
      <h2 className="text-4xl md:text-6xl font-black mb-16 text-center leading-tight">
        O ecossistema perfeito de<br/><span className="text-white">vendas recorrentes.</span>
      </h2>

      <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
        {/* Core circle */}
        <div className="absolute w-48 h-48 bg-[#D4AF37] rounded-full flex flex-col items-center justify-center text-black shadow-[0_0_60px_rgba(212,175,55,0.4)] z-20">
          <p className="font-black text-xl leading-tight">MÉTODO</p>
          <p className="font-black text-xl leading-tight">PINGUIM</p>
        </div>

        {/* Orbit items */}
        {[
          { label: 'GOOGLE MEU NEGÓCIO', pos: 'top-0' },
          { label: 'TRÁFEGO PAGO (META)', pos: 'bottom-0' },
          { label: 'ENGENHARIA DE CARDÁPIO', pos: 'left-0' },
          { label: 'GESTÃO DE DELIVERY', pos: 'right-0' }
        ].map((item, i) => (
          <div key={i} className={`absolute ${item.pos === 'top-0' ? '-top-4' : item.pos === 'bottom-0' ? '-bottom-4' : ''} ${item.pos === 'left-0' ? '-left-4' : item.pos === 'right-0' ? '-right-4' : ''} bg-white/[0.05] border border-white/10 px-8 py-4 rounded-2xl backdrop-blur-xl z-10 hover:border-[#D4AF37]/50 transition-colors`}>
            <p className="text-white font-bold text-xs tracking-widest">{item.label}</p>
          </div>
        ))}

        {/* Connecting lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <line x1="50%" y1="50%" x2="50%" y2="0%" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="50%" y1="50%" x2="0%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
        </svg>
      </div>
    </div>
  )
}

// SLIDE 5: Problema
function SlideProblema() {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">O Diagnóstico</p>
      <h2 className="text-4xl md:text-6xl font-black mb-6 text-center leading-tight">
        O que trava o seu<br/><span className="text-white">crescimento hoje?</span>
      </h2>
      <p className="text-slate-400 text-lg mb-12 text-center max-w-2xl">A maioria dos restaurantes enfrenta os mesmos 3 bloqueios fundamentais.</p>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
        {[
          { icon: <Target size={28} />, title: 'Refém dos Apps', desc: 'Depender do iFood para existir é ceder o controle da sua operação para um algoritmo.' },
          { icon: <Search size={28} />, title: 'Invisível no Google', desc: 'Clientes buscam e não te encontram. Isso é dinheiro que vai direto para o seu vizinho.' },
          { icon: <UtensilsCrossed size={28} />, title: 'Sem Estratégia', desc: 'Um cardápio sem engenharia é apenas uma lista de preços. Não gera desejo nem lucro.' }
        ].map((item, i) => (
          <div key={i} className="group bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all duration-500">
            <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 6: Metodo
function SlideMetodo() {
  const items = [
    { title: 'Tráfego Pago Cirúrgico', desc: 'Anúncios que impactam quem está com fome, na sua região, agora.' },
    { title: 'Dominância no Google', desc: 'Seu restaurante na primeira posição quando o cliente buscar.' },
    { title: 'Engenharia de Cardápio', desc: 'Estratégia de apresentação para aumentar o ticket médio.' },
    { title: 'Decisões com Dados', desc: 'Relatórios que mostram o que funciona e onde investir mais.' },
  ]
  return (
    <div className="flex flex-col md:flex-row items-center gap-16 w-full max-w-5xl">
      <div className="flex-1">
        <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">A Solução</p>
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
          Não fazemos posts.<br/>
          <span className="text-white">Construímos máquinas.</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-10">
          O Método Pinguim une tráfego, presença local e inteligência de dados em um ecossistema único de vendas.
        </p>
        <div className="space-y-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-5 group">
              <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#D4AF37]/20 transition-all">
                <CheckCircle2 size={18} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white font-bold text-base">{item.title}</p>
                <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 w-full max-w-sm">
        <div className="bg-[#D4AF37] rounded-[3rem] p-12 relative overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.2)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full -mr-16 -mt-16" />
          <Zap size={64} className="text-black mb-8" />
          <h3 className="text-3xl font-black text-black mb-4 leading-tight">Resultados<br/>Reais.</h3>
          <p className="text-black/70 font-bold text-sm leading-relaxed">
            Nossa meta é uma só: aumentar o seu lucro e dar previsibilidade para o seu negócio.
          </p>
        </div>
      </div>
    </div>
  )
}

// SLIDE 7: Proposta
function SlideProposta({ proposal, services, whatsapp }: { proposal: Proposal, services: PresentationViewerProps['services'], whatsapp: string }) {
  return (
    <div className="flex flex-col items-center w-full pb-12">
      <div className="text-center mb-12">
        <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-3">Investimento</p>
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Plano de Escala</h2>
        <p className="text-slate-500 text-lg">Tudo pronto para você dominar sua região.</p>
      </div>

      <div className="bg-[#0F1014]/90 backdrop-blur-2xl border border-[#D4AF37]/20 rounded-[3rem] p-10 md:p-14 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden w-full max-w-4xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Header Proposta */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-10 border-b border-white/5 mb-10 relative z-10 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-black text-white mb-2 tracking-tight">{proposal.restaurant_name}</h3>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{services.length} Entregas Estratégicas</p>
            </div>
          </div>
          {proposal.logo_url && (
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl shrink-0 border-4 border-white/10">
              <img src={proposal.logo_url} alt="Logo" className="w-full h-full object-contain p-2" />
            </div>
          )}
        </div>

        {/* Listagem de Serviços */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mb-12 relative z-10">
          {services.map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-6 h-6 bg-[#D4AF37]/10 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={14} className="text-[#D4AF37]" />
              </div>
              <span className="text-slate-300 font-medium text-sm md:text-base">{s.name}</span>
            </div>
          ))}
        </div>

        {/* Valores */}
        <div className="space-y-6 relative z-10">
          <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent border border-[#D4AF37]/20 rounded-[2rem] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-md">
            <div>
              <p className="text-white font-black text-xl mb-1 uppercase tracking-tight">Honorários Mensais</p>
              <p className="text-slate-500 text-sm font-medium">Gestão e Estratégia completa Pinguim</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-white font-black text-5xl md:text-6xl tracking-tighter">{fmt(proposal.service_value)}</span>
              <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mt-2">por mês</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 text-center">
              <p className="text-slate-500 text-[10px] mb-2 uppercase tracking-[0.2em] font-bold">Prazo</p>
              <p className="text-white font-black text-2xl">{proposal.contract_duration} meses</p>
            </div>
            {proposal.ad_value > 0 && (
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 text-center">
                <p className="text-slate-500 text-[10px] mb-2 uppercase tracking-[0.2em] font-bold">Verba ADS</p>
                <p className="text-white font-black text-2xl">{fmt(proposal.ad_value)}</p>
              </div>
            )}
            {proposal.units && proposal.units > 1 && (
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 text-center">
                <p className="text-slate-500 text-[10px] mb-2 uppercase tracking-[0.2em] font-bold">Unidades</p>
                <p className="text-white font-black text-2xl">{proposal.units}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 text-center z-20">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-white text-black font-black px-12 py-6 rounded-full text-xl transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_70px_rgba(255,255,255,0.4)] hover:-translate-y-2 group"
        >
          FECHAR NEGÓCIO <TrendingUp size={24} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <p className="text-slate-500 text-xs mt-6 uppercase tracking-[0.4em] font-bold">Fale agora com um especialista</p>
      </div>
    </div>
  )
}
