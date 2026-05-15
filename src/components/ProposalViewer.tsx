"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronDown, MessageCircle, Clock } from 'lucide-react'
import Image from 'next/image'

interface Proposal {
  slug: string;
  restaurant_name: string;
  logo_url: string | null;
  service_value: number;
  ad_value: number;
  contract_duration: number;
  units?: number;
}

interface ProposalViewerProps {
  proposal: Proposal;
  services: { id: string; name: string; price?: number }[];
  whatsapp: string;
}

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

export default function ProposalViewer({ proposal, services, whatsapp }: ProposalViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const totalSlides = 4

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

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isNavVisible) {
      timeout = setTimeout(() => {
        setIsNavVisible(false)
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [isNavVisible, currentSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        nextSlide()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        prevSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null
    const handleWheel = (e: WheelEvent) => {
      if (wheelTimeout) return
      
      setIsNavVisible(true)
      
      if (e.deltaY > 50) {
        nextSlide()
        wheelTimeout = setTimeout(() => wheelTimeout = null, 800)
      } else if (e.deltaY < -50) {
        prevSlide()
        wheelTimeout = setTimeout(() => wheelTimeout = null, 800)
      }
    }
    
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [nextSlide, prevSlide])

  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    },
    exit: (dir: number) => ({
      zIndex: 0,
      y: dir < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6 }
    })
  }

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipeThreshold = 50;
    if (offset.y < -swipeThreshold) {
      nextSlide()
    } else if (offset.y > swipeThreshold) {
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
            <Image src="/logo-pinguim.png" alt="Pinguim" width={100} height={30} className="object-contain brightness-0 invert" />
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex gap-1 text-xs font-medium text-slate-400">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${currentSlide === i ? 'bg-[#0047FF]' : 'bg-white/20'}`} />
                ))}
              </div>
              <button 
                onClick={() => setCurrentSlide(totalSlides - 1)}
                className="text-xs font-bold px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                Próximos Passos
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="relative w-full h-full z-10 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 cursor-grab active:cursor-grabbing overflow-y-auto overflow-x-hidden no-scrollbar"
            style={{ touchAction: "none" }}
          >
            <div className="w-full max-w-3xl my-auto">
              {currentSlide === 0 && <SlideCapa proposal={proposal} />}
              {currentSlide === 1 && <SlideServicos services={services} />}
              {currentSlide === 2 && <SlideInvestimento proposal={proposal} />}
              {currentSlide === 3 && <SlideCTA whatsapp={whatsapp} />}
            </div>

            {currentSlide < totalSlides - 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 animate-bounce pointer-events-none"
              >
                <span className="text-[10px] font-medium mb-1 uppercase tracking-widest">Deslize</span>
                <ChevronDown size={20} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function SlideCapa({ proposal }: { proposal: Proposal }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 bg-[#0047FF]/10 border border-[#0047FF]/20 text-[#0047FF] text-xs font-bold px-4 py-2 rounded-full tracking-wider uppercase mb-8 shadow-[0_0_15px_rgba(0,71,255,0.2)]">
        Proposta Comercial
      </div>
      
      <div className="relative bg-gradient-to-br from-[#0047FF] to-[#003BCC] rounded-[2.5rem] p-10 md:p-14 mb-6 overflow-hidden w-full shadow-2xl border border-white/10">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-left">
          {proposal.logo_url && (
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
              <img src={proposal.logo_url} alt={proposal.restaurant_name} className="w-full h-full object-contain p-2 md:p-3" />
            </div>
          )}
          <div className="text-center md:text-left">
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2">Proposta exclusiva para</p>
            <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight text-white">{proposal.restaurant_name}</h1>
            <p className="text-white/80 text-base">Marketing especializado para o seu delivery</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideServicos({ services }: { services: ProposalViewerProps['services'] }) {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Serviços Incluídos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {services.map((s, i) => (
          <div key={i} className="flex items-center gap-4 p-5 bg-[#0F1014]/80 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-[#15161C] transition-colors shadow-lg">
            <div className="w-12 h-12 bg-[#0047FF]/10 border border-[#0047FF]/20 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 size={24} className="text-[#0047FF]" />
            </div>
            <span className="text-slate-200 text-base md:text-lg font-medium">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideInvestimento({ proposal }: { proposal: Proposal }) {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Investimento & Contrato</h2>
      
      <div className="bg-[#0F1014]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl w-full">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gradient-to-r from-[#0047FF]/10 to-transparent rounded-2xl border border-[#0047FF]/30">
            <div>
              <p className="text-white font-bold text-lg">Honorários Mensais</p>
              <p className="text-slate-400 text-sm mt-1">Gestão, estratégia e execução Pinguim</p>
            </div>
            <span className="text-[#0047FF] font-black text-4xl mt-4 md:mt-0">{fmt(proposal.service_value)}</span>
          </div>

          {proposal.ad_value > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white/[0.03] rounded-2xl border border-white/5">
              <div>
                <p className="text-white font-semibold text-base">Verba de Anúncios</p>
                <p className="text-slate-400 text-sm mt-1">Recomendado para investimento nas plataformas</p>
              </div>
              <span className="text-slate-300 font-bold text-2xl mt-4 md:mt-0">{fmt(proposal.ad_value)}</span>
            </div>
          )}

          <div className="flex items-center gap-4 p-6 bg-white/[0.03] rounded-2xl border border-white/5">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
              <Clock size={24} className="text-[#0047FF]" />
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest">Duração do Contrato</p>
              <p className="text-white font-bold text-2xl">{proposal.contract_duration} meses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideCTA({ whatsapp }: { whatsapp: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(37,211,102,0.2)]">
        <MessageCircle size={48} className="text-[#25D366]" />
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Próximos Passos</h2>
      <p className="text-slate-400 text-lg mb-12 max-w-lg leading-relaxed">
        Ficou com alguma dúvida ou quer avançar com a parceria? Fale diretamente com o nosso time pelo WhatsApp para iniciarmos o seu projeto.
      </p>
      
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-4 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-12 py-5 rounded-full text-xl transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] hover:-translate-y-1"
      >
        <MessageCircle size={24} /> Falar com o Pinguim
      </a>
    </div>
  )
}
