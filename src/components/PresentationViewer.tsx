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

const getLogoUrl = (url: string | null, restaurantName?: string) => {
  if (url) {
    if (url.startsWith('http') || url.startsWith('/')) return url
    return `/${url}`
  }
  
  if (restaurantName) {
    const name = restaurantName.toLowerCase()
    if (name.includes('071') || name.includes('burger')) return '/Fundo de Logo 071 Burger Salvador Removido.png'
    if (name.includes('villa') || name.includes('bistro')) return '/Logo Villa Bistro Curitiba.png'
    if (name.includes('fat') || name.includes('guys')) return '/Fundo de Logo FatGuys Salvador  png.png'
    if (name.includes('feijuca') || name.includes('santa')) return '/Santa Feijuca.png'
    if (name.includes('subway')) return '/logo-subway-256.png'
    if (name.includes('noa') || name.includes('poke')) return '/592238295_122120029046993995_5886872904706956800_n.png'
    if (name.includes('gege') || name.includes('delivery')) return '/Fundo de Grupo Gege Belo Horizonte Removido.png'
  }
  
  return null
}

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#0047FF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#0047FF]/8 rounded-full blur-[100px]" />
      </div>

      <AnimatePresence>
        {isNavVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-md border-b border-white/10"
          >
            <div className="flex items-center gap-3">
              <Image src="/logo-pinguim.png" alt="Pinguim" width={90} height={26} className="object-contain brightness-0 invert" />
              {(() => {
                const resolvedLogo = getLogoUrl(proposal.logo_url, proposal.restaurant_name);
                return resolvedLogo ? (
                  <>
                    <span className="text-white/30 text-base font-light select-none">+</span>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 pl-1.5 pr-3 py-1 rounded-full backdrop-blur-sm">
                      <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center overflow-hidden p-0.5 shrink-0">
                        <img 
                          src={resolvedLogo} 
                          alt={proposal.restaurant_name} 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="text-white font-bold text-xs tracking-tight shrink-0">{proposal.restaurant_name}</span>
                    </div>
                  </>
                ) : null;
              })()}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex gap-1 text-xs font-medium text-slate-400">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${currentSlide === i ? 'bg-[#0047FF]' : 'bg-white/20'}`} />
                ))}
              </div>
              <button 
                onClick={() => setCurrentSlide(totalSlides - 1)}
                className="text-xs font-bold px-4 py-2 bg-[#0047FF] hover:bg-[#003BCC] text-white rounded-full transition-colors"
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
  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src="/logo-pinguim.png"
        alt="Pinguim Marketing"
        width={280}
        height={78}
        className="object-contain brightness-0 invert mb-12"
      />

      <h1 className="text-5xl md:text-7xl font-black mb-5 leading-[1.05] tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
          Marketing sem dados<br/>é opinião.
        </span>
      </h1>
      <p className="text-white font-bold text-base md:text-lg mb-3 inline-block relative">
        <span
          className="relative inline-block px-1"
          style={{
            backgroundImage: 'linear-gradient(90deg, #0047FF 0%, #5B8FFF 100%)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '0% 2px',
            backgroundPosition: '0 100%',
            animation: 'highlight-sweep 0.8s ease-out 0.6s forwards',
          }}
        >
          Crescimento vem de estrat&eacute;gia.
        </span>
        <style>{`
          @keyframes highlight-sweep {
            to { background-size: 100% 2px; }
          }
        `}</style>
      </p>

      <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl leading-relaxed">
        Uma estrutura pensada para integrar salão, delivery e canais digitais em uma operação mais previsível e lucrativa.
      </p>

      <div className="flex items-center gap-4 bg-white/[0.04] border border-[#D4AF37]/40 px-6 py-4 rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.1)]">
        {(() => {
          const resolvedLogo = getLogoUrl(proposal.logo_url, proposal.restaurant_name);
          return resolvedLogo ? (
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shrink-0">
              <img src={resolvedLogo} alt={proposal.restaurant_name} className="w-full h-full object-contain p-1" />
            </div>
          ) : null;
        })()}
        <div className="text-left">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-0.5">Apresentação exclusiva para</p>
          <p className="text-white font-bold text-lg md:text-xl">{proposal.restaurant_name}</p>
        </div>
      </div>
    </div>
  )
}

// SLIDE 2: Autoridade
function SlideAutoridade() {
  const points = [
    {
      icon: <UtensilsCrossed size={20} className="text-[#0047FF]" />,
      title: 'Foco 100% Gastronômico',
      text: 'Especialistas em marketing para restaurantes e deliveries, com mais de 4 anos de atuação exclusiva no setor.'
    },
    {
      icon: <TrendingUp size={20} className="text-[#0047FF]" />,
      title: 'Decisões Guiadas por Dados',
      text: 'Nosso propósito é transformar dados e comunicação em resultados reais, gerando vendas previsíveis e diárias.'
    },
    {
      icon: <Users size={20} className="text-[#0047FF]" />,
      title: 'Clube do Pinguim',
      text: 'Responsáveis pelo maior ecossistema de networking, estratégias e capacitação para agências de food service do Brasil.'
    }
  ]

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold mb-3">Quem Somos</p>
        <h2 className="text-3xl md:text-5xl font-black leading-tight text-white">
          Sua operação merece um<br/>
          <span className="text-[#0047FF]">marketing de alto nível.</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="space-y-4 md:space-y-6">
            {points.map((pt, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[#0047FF]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0047FF]/20 transition-colors">
                  {pt.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-base md:text-lg group-hover:text-[#0047FF] transition-colors">{pt.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{pt.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Photo Space */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] lg:min-h-[420px] w-full">
          <div className="absolute inset-0 bg-[#0047FF]/10 blur-[100px] rounded-full pointer-events-none" />
          
          {/* Stacked Photos Layout */}
          <div className="relative w-full max-w-[280px] aspect-[4/5] mx-auto">
            {/* Background card 1 (Mockup - Back) */}
            <div className="absolute -left-12 -bottom-6 w-full h-full rounded-3xl overflow-hidden border border-white/5 shadow-xl opacity-20 scale-90 translate-y-6 -rotate-6 transition-all duration-500">
              <img 
                src="/mockup.png" 
                alt="Mockup do Sistema" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Background card 2 (Stage Photo - Middle) */}
            <div className="absolute -left-6 -bottom-3 w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl opacity-60 scale-95 translate-y-3 -rotate-3 bg-[#0F1014] transition-all duration-500 hover:opacity-85">
              <div className="w-full h-full relative">
                <img 
                  src="/foto-junior-palco.jpg" 
                  alt="Junior Pinguim - Palestrando" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
            
            {/* Foreground card (Junior Photo - Front) */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all duration-500 bg-[#0F1014]">
              <div className="w-full h-full relative">
                <img 
                  src="/nova-foto-junior.png" 
                  alt="Junior Pinguim - Fundador" 
                  className="w-full h-full object-cover object-top"
                />
                {/* Visual overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                  <p className="text-white font-black text-sm tracking-wide">Junior Pinguim</p>
                  <p className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest mt-0.5">Fundador & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE 3: Parceiros
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
      <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-center">Nossos Parceiros</p>
      <h2 className="text-3xl md:text-5xl font-black mb-8 text-center leading-tight">
        Quem já confia na nossa<br/><span className="text-[#0047FF]">estratégia de escala.</span>
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-5xl">
        {partners.map((partner, i) => (
          <div key={i} className="aspect-square bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center justify-center group hover:bg-[#0047FF]/5 hover:border-[#0047FF]/30 transition-all duration-300">
            <img src={partner.src} alt={partner.alt} className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-40 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 4: Visao
function SlideVisao() {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-center">Visão Estratégica</p>
      <h2 className="text-3xl md:text-5xl font-black mb-12 text-center leading-tight">
        O ecossistema perfeito de<br/><span className="text-[#0047FF]">vendas recorrentes.</span>
      </h2>

      <div className="relative w-full max-w-3xl h-[300px] flex items-center justify-center">
        <div className="absolute w-40 h-40 bg-[#0047FF] rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_50px_rgba(0,71,255,0.3)] z-20">
          <p className="font-black text-sm leading-tight">MÉTODO</p>
          <p className="font-black text-sm leading-tight">PINGUIM</p>
        </div>

        {[
          { label: 'GOOGLE MEU NEGÓCIO', pos: 'top-0' },
          { label: 'TRÁFEGO PAGO (META)', pos: 'bottom-0' },
          { label: 'ENGENHARIA DE CARDÁPIO', pos: 'left-0' },
          { label: 'GESTÃO DE DELIVERY', pos: 'right-0' }
        ].map((item, i) => (
          <div key={i} className={`absolute ${item.pos === 'top-0' ? '-top-4' : item.pos === 'bottom-0' ? '-bottom-4' : ''} ${item.pos === 'left-0' ? '-left-4' : item.pos === 'right-0' ? '-right-4' : ''} bg-white/[0.05] border border-white/10 px-6 py-3 rounded-xl backdrop-blur-md z-10`}>
            <p className="text-white font-bold text-[10px] tracking-widest">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 5: Problema
function SlideProblema() {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-center">O Diagnóstico</p>
      <h2 className="text-3xl md:text-5xl font-black mb-4 text-center leading-tight">
        O que está travando o crescimento do seu delivery?
      </h2>
      <p className="text-slate-400 text-base mb-12 text-center max-w-xl">A maioria dos restaurantes enfrenta os mesmos 3 bloqueios fundamentais.</p>

      <div className="grid md:grid-cols-3 gap-5 w-full">
        {[
          { icon: <Target size={24} />, color: 'red', title: 'Refém dos Apps', desc: 'Depender do iFood para existir é ceder o controle das suas vendas para um algoritmo.' },
          { icon: <Search size={24} />, color: 'yellow', title: 'Invisível no Google', desc: 'Clientes buscam e não te encontram. Isso é dinheiro que vai direto para o vizinho.' },
          { icon: <UtensilsCrossed size={24} />, color: 'blue', title: 'Cardápio sem Estratégia', desc: 'Um cardápio sem engenharia é apenas uma lista de preços. Não gera desejo nem lucro.' }
        ].map((item, i) => (
          <div key={i} className="group bg-[#0F1014]/80 backdrop-blur-sm border border-white/10 p-7 rounded-3xl hover:border-[#0047FF]/30 hover:bg-[#0047FF]/5 transition-all duration-300">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${item.color === 'red' ? 'bg-red-500/10 text-red-400' : item.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-[#0047FF]/10 text-[#0047FF]'}`}>
              {item.icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
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
    <div className="flex flex-col md:flex-row items-center gap-10 w-full">
      <div className="flex-1">
        <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-center">Nossa Abordagem</p>
        <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight">
          Não fazemos posts.<br/>
          <span className="text-[#0047FF]">Construímos máquinas de venda.</span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed mb-8">
          O Método Pinguim une tráfego pago, presença local e engenharia de cardápio num único ecossistema. Resultado: previsibilidade de clientes, todos os dias.
        </p>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 group">
              <div className="w-8 h-8 bg-[#0047FF]/10 border border-[#0047FF]/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0047FF]/20 transition-colors">
                <CheckCircle2 size={15} className="text-[#0047FF]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{item.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 w-full max-w-xs mt-8 md:mt-0">
        <div className="bg-gradient-to-br from-[#0047FF]/10 to-[#0F1014] border border-[#0047FF]/20 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#0047FF] blur-[90px] opacity-30 pointer-events-none" />
          <div className="w-16 h-16 bg-[#0047FF]/15 rounded-2xl flex items-center justify-center mb-6 border border-[#0047FF]/30">
            <Zap size={32} className="text-[#0047FF]" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Método Pinguim</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Uma metodologia focada em resultado real: mais pedidos, mais clientes recorrentes e mais controle sobre o seu negócio.
          </p>
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-[#0047FF] text-xs font-bold uppercase tracking-wider">Você cuida da operação.</p>
            <p className="text-white text-xs font-semibold mt-1">A gente cuida de trazer os clientes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE 7: Proposta
function SlideProposta({ proposal, services, whatsapp }: { proposal: Proposal, services: PresentationViewerProps['services'], whatsapp: string }) {
  return (
    <div className="flex flex-col items-center w-full pb-8">
      <div className="text-center mb-8">
        <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-semibold mb-3">A Proposta</p>
        <h2 className="text-3xl md:text-4xl font-black mb-2">O que está incluído</h2>
        <p className="text-slate-400 text-sm">Tudo pronto para você dominar sua região e vender mais, todo dia.</p>
      </div>

      <div className="bg-[#0F1014]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden w-full max-w-3xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0047FF]/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Header Proposta */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6 relative z-10">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{proposal.restaurant_name}</h3>
            <p className="text-slate-400 text-sm">{services.length} serviços inclusos neste plano</p>
          </div>
          {(() => {
            const resolvedLogo = getLogoUrl(proposal.logo_url, proposal.restaurant_name);
            return resolvedLogo ? (
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-lg shrink-0">
                <img src={resolvedLogo} alt="Logo" className="w-full h-full object-contain p-1" />
              </div>
            ) : null;
          })()}
        </div>

        {/* Listagem de Serviços */}
        <div className="space-y-3 mb-8 relative z-10 max-h-[30vh] overflow-y-auto no-scrollbar pr-2">
          {services.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={14} className="text-[#0047FF]" />
              </div>
              <span className="text-slate-200 font-medium text-sm md:text-base">{s.name}</span>
            </div>
          ))}
        </div>

        {/* Valores */}
        <div className="space-y-4 relative z-10">
          <div className="bg-gradient-to-r from-[#0047FF]/20 to-transparent border border-[#0047FF]/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-sm shadow-[0_0_30px_rgba(0,71,255,0.1)]">
            <div>
              <p className="text-white font-bold text-base">Honorários mensais</p>
              <p className="text-slate-400 text-xs mt-1">Gestão, estratégia e execução Pinguim</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[#0047FF] font-black text-3xl md:text-4xl">{fmt(proposal.service_value)}</span>
              <p className="text-[#0047FF]/60 text-[10px] font-bold uppercase tracking-wider mt-1">por mês</p>
            </div>
          </div>

          {proposal.ad_value > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-sm">Verba de Anúncios recomendada</p>
                <p className="text-slate-400 text-xs mt-1">Para investir diretamente nas plataformas (Google/Meta)</p>
              </div>
              <span className="text-white font-bold text-xl">{fmt(proposal.ad_value)}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-slate-400 text-[10px] mb-1 uppercase tracking-widest">Prazo</p>
              <p className="text-white font-bold text-lg">{proposal.contract_duration} meses</p>
            </div>
            {proposal.units && proposal.units > 1 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-slate-400 text-[10px] mb-1 uppercase tracking-widest">Lojas</p>
                <p className="text-white font-bold text-lg">{proposal.units} unidades</p>
              </div>
            )}
          </div>
        </div>
        
      </div>

      <div className="mt-8 text-center z-20">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#0047FF] hover:bg-[#003BCC] text-white font-bold px-8 py-4 rounded-full text-base transition-all shadow-[0_0_30px_rgba(0,71,255,0.4)] hover:shadow-[0_0_50px_rgba(0,71,255,0.6)] hover:-translate-y-1"
        >
          Aprovar Proposta <TrendingUp size={20} />
        </a>
      </div>
    </div>
  )
}
