"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Maximize2,
  Users,
  Target,
  ShoppingCart,
  RefreshCw,
  Wifi,
  Star,
} from "lucide-react";

// ─── SLIDE DATA ────────────────────────────────────────────────────────────────
const slides = [
  { id: 1, type: "cover" },
  { id: 2, type: "about" },
  { id: 3, type: "clients" },
  { id: 4, type: "method" },
  { id: 5, type: "results" },
  { id: 6, type: "deliverables" },
  { id: 7, type: "partners" },
  { id: 8, type: "final" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const stagger = (i: number) => ({ delay: 0.1 + i * 0.09 });
const whatsappUrl = `https://wa.me/5571996623922?text=${encodeURIComponent(
  "Olá! Acabei de ver a proposta do Pinguim e quero saber mais sobre os próximos passos!"
)}`;

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function PropostaPage() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);

  const goTo = useCallback(
    (n: number) => {
      if (n < 0 || n >= slides.length) return;
      setSlide([n, n > currentSlide ? 1 : -1]);
    },
    [currentSlide]
  );

  const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);
  const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [next, prev]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-screen h-screen bg-[#0A0C14] overflow-hidden font-sans select-none">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,71,255,0.10)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,71,255,0.05)_0%,transparent_55%)] pointer-events-none" />

      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <Image src="/logo-pinguim.png" alt="Pinguim" width={100} height={28} className="object-contain" unoptimized />
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-xs font-medium tabular-nums">
            {currentSlide + 1} / {slides.length}
          </span>
          <button onClick={toggleFullscreen} className="text-slate-500 hover:text-white transition-colors" title="Tela Cheia">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* SLIDE AREA */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 flex items-center justify-center px-6 md:px-16 pt-14 pb-16"
        >

          {/* ── SLIDE 01: CAPA ── */}
          {slide.type === "cover" && (
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
              {/* Big blue P shape */}
              <div className="absolute left-0 top-0 bottom-0 w-1/2 md:w-[42%] bg-[#0047FF] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0047FF] to-[#003BCC]" />
                {/* Giant "P" shape via text */}
                <svg viewBox="0 0 240 300" className="absolute h-[90%] opacity-20 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 20 h130 a80 80 0 0 1 0 160 H100 v100 H20 Z M100 20 v160" />
                </svg>
              </div>
              {/* Right side content */}
              <div className="relative z-10 ml-auto w-1/2 md:w-[50%] pl-10 text-left">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <p className="text-[#0047FF] font-bold tracking-[0.25em] uppercase text-xs mb-4">PROPOSTA COMERCIAL</p>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1] mb-3">
                  PINGUIM
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="text-slate-300 text-xs md:text-sm tracking-[0.3em] uppercase mb-10">
                  Marketing para Restaurantes &amp; Delivery
                </motion.p>
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  onClick={next}
                  className="inline-flex items-center gap-2 bg-[#0047FF] hover:bg-[#003BCC] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-[0_0_25px_rgba(0,71,255,0.5)] hover:-translate-y-0.5"
                >
                  Ver a proposta <ChevronRight size={18} />
                </motion.button>
              </div>
            </div>
          )}

          {/* ── SLIDE 02: QUEM SOMOS ── */}
          {slide.type === "about" && (
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="relative bg-[#0047FF] rounded-3xl overflow-hidden flex items-end justify-center h-64 md:h-[380px]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0047FF] via-[#0047FF] to-[#0A0C14]/60" />
                <div className="relative z-10 text-center pb-6 px-6">
                  <p className="text-white/70 text-xs tracking-widest uppercase mb-1">Mais de</p>
                  <p className="text-4xl md:text-6xl font-black text-white">4 anos</p>
                  <p className="text-white/80 text-sm mt-1">100% foco no setor gastronômico</p>
                </div>
              </motion.div>
              <div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-[#0047FF] font-bold tracking-wider uppercase text-xs mb-3">
                  QUEM SOMOS?
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  A agência especializada em restaurantes
                </motion.h2>
                <div className="space-y-4">
                  {[
                    "A Pinguim é uma empresa de marketing especializada em restaurantes e deliveries, com mais de 4 anos de atuação e 100% de foco no setor gastronômico.",
                    "Nosso propósito é transformar dados e comunicação em resultados reais, ajudando restaurantes a vender mais todos os dias.",
                    "A Pinguim é também responsável pelo Clube do Pinguim — o maior grupo de networking e capacitação para agências de marketing de restaurantes do país.",
                    "Um ecossistema que conecta profissionais, compartilha estratégias e impulsiona a evolução do marketing gastronômico no Brasil.",
                  ].map((text, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={stagger(i)}
                      className="text-slate-300 text-sm leading-relaxed border-l-2 border-[#0047FF]/40 pl-4">
                      {text}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SLIDE 03: CLIENTES ── */}
          {slide.type === "clients" && (
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
              <div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-black text-white leading-tight mb-2">
                  Restaurantes e Deliveries
                </motion.h2>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                  className="text-4xl md:text-5xl font-black leading-tight mb-8">
                  que confiam na <span className="text-[#0047FF]">Pinguim</span>
                </motion.h2>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                  className="inline-flex items-center gap-2 bg-[#0047FF]/15 border border-[#0047FF]/30 px-4 py-2 rounded-full text-[#0047FF] text-sm font-semibold">
                  <Star size={14} className="fill-[#0047FF]" />
                  +100 restaurantes atendidos
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
                className="grid grid-cols-3 gap-3">
                {[
                  { src: "/Santa Feijuca.png", alt: "Santa Feijuca" },
                  { src: "/62d6c695ZL62Q0AOQQ_140327566206912.jpg", alt: "Smash Burger" },
                  { src: "/5d826a21PIZZA_BITES_LTDA1707785910997blob.png", alt: "Burger B" },
                  { src: "/Fundo de Logo FatGuys Salvador  png.png", alt: "Fat Guys" },
                  { src: "/logo-subway-256.png", alt: "Subway" },
                  { src: "/Logo Villa Bistro Curitiba.png", alt: "Villa Bistro" },
                  { src: "/592238295_122120029046993995_5886872904706956800_n.png", alt: "Noa Poke" },
                  { src: "/Fundo de Logo 071 Burger Salvador Removido.png", alt: "071 Burger" },
                  { src: "/Fundo de Grupo Gege Belo Horizonte Removido.png", alt: "Gegê Delivery" },
                ].map((logo, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={stagger(i)}
                    className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:scale-105 relative">
                    <Image src={logo.src} alt={logo.alt} fill className="object-cover" unoptimized />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* ── SLIDE 04: METODOLOGIA ── */}
          {slide.type === "method" && (
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-start">
              <div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="text-[#0047FF] font-bold tracking-wider uppercase text-xs mb-2">
                  METODOLOGIA
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
                  O Método <span className="text-[#0047FF]">Pinguim</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="text-slate-300 text-sm leading-relaxed mb-4">
                  O Método Pinguim é fruto da experiência prática em centenas de restaurantes reais e foi criado para garantir <strong className="text-white">previsibilidade e crescimento sustentável.</strong>
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
                  className="text-white font-semibold text-sm mb-6">
                  Ele é sustentado por 5 pilares fundamentais:
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="bg-[#0047FF]/10 border border-[#0047FF]/25 rounded-xl px-5 py-3 text-[#0047FF] text-xs font-semibold">
                  Esses pilares formam um ciclo contínuo de crescimento, com o centro representando resultado financeiro e expansão.
                </motion.div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Wifi, color: "#0047FF", title: "Comunicação", desc: "Conexão entre marca e público com propósito." },
                  { icon: Target, color: "#25D366", title: "Posicionamento", desc: "Construção de identidade e autoridade." },
                  { icon: Users, color: "#FFA500", title: "Aquisição", desc: "Geração de novos clientes de forma previsível." },
                  { icon: ShoppingCart, color: "#FF4757", title: "Vendas", desc: "Aumento do ticket médio e da conversão." },
                  { icon: RefreshCw, color: "#A855F7", title: "Recorrência", desc: "Estratégias para transformar clientes em fãs fiéis." },
                ].map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={stagger(i)}
                    className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 hover:border-white/20 transition-colors">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${p.color}20` }}>
                      <p.icon size={18} style={{ color: p.color }} />
                    </div>
                    <div>
                      <span className="text-white font-bold text-sm">{p.title}: </span>
                      <span className="text-slate-400 text-sm">{p.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── SLIDE 05: RESULTADOS ── */}
          {slide.type === "results" && (
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
              <div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                  Método Pinguim<span className="text-[#0047FF]"> = Resultado</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                  className="text-slate-400 text-sm leading-relaxed">
                  Dados reais de clientes ativos. Cada número representa mais um restaurante crescendo com previsibilidade e estratégia.
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { value: "5.098", label: "Conversões geradas", color: "#0047FF" },
                    { value: "R$ 327k", label: "Receita gerada", color: "#25D366" },
                    { value: "1.577", label: "Clientes recorrentes", color: "#FFA500" },
                    { value: "R$ 105k", label: "Receita de recorrência", color: "#A855F7" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                      <p className="font-black text-2xl md:text-3xl" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 overflow-hidden">
                {/* Mock score card */}
                <div className="text-center mb-6">
                  <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Pontuação Geral</p>
                  <p className="text-slate-500 text-xs mb-4">Desempenho do Negócio</p>
                  <div className="text-6xl font-black text-[#25D366]">100</div>
                  <span className="inline-block mt-2 bg-[#25D366]/20 text-[#25D366] text-xs font-bold px-3 py-1 rounded-full">BOM</span>
                </div>
                <div className="space-y-2">
                  {[
                    { pedidos: "885", receita: "R$ 50.987,49", tm: "R$ 57,61" },
                    { pedidos: "1.574", receita: "R$ 93.093,59", tm: "R$ 59,14" },
                    { pedidos: "4.681", receita: "R$ 231.208,08", tm: "R$ 49,39", highlight: true },
                    { pedidos: "4.963", receita: "R$ 276.098,16", tm: "R$ 55,63", highlight: true },
                  ].map((row, i) => (
                    <div key={i} className={`grid grid-cols-3 text-xs gap-2 px-3 py-2 rounded-lg ${row.highlight ? "bg-[#25D366]/10 border border-[#25D366]/20" : "bg-white/[0.02]"}`}>
                      <span className="text-slate-400">{row.pedidos}</span>
                      <span className={row.highlight ? "text-[#25D366] font-bold" : "text-slate-300"}>{row.receita}</span>
                      <span className="text-slate-400">{row.tm}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 text-[10px] text-slate-600 px-3 mt-2 gap-2">
                  <span>PEDIDOS</span><span>RECEITA</span><span>TM</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-slate-400 text-xs">
                  <TrendingUp size={14} className="text-[#25D366]" />
                  Dados reais de clientes Pinguim
                </div>
              </motion.div>
            </div>
          )}

          {/* ── SLIDE 06: ENTREGAS E SOLUÇÕES ── */}
          {slide.type === "deliverables" && (
            <div className="w-full max-w-6xl grid md:grid-cols-5 gap-10 items-start">
              <div className="md:col-span-2">
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
                  Entregas e Soluções
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="text-slate-400 text-sm leading-relaxed mb-4">
                  A Pinguim oferece um ecossistema completo de soluções de marketing e gestão criadas para aumentar vendas e performance de restaurantes.
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
                  className="text-white font-bold text-sm">
                  Nossas principais entregas incluem:
                </motion.p>
              </div>

              <div className="md:col-span-3 space-y-3">
                {[
                  "Tráfego Pago: gestão estratégica de campanhas no Meta Ads e Google Ads.",
                  "Google Meu Negócio: otimização para destaque e captação local.",
                  "Gestão de CRM e Fidelização: aumento da recorrência e relacionamento com clientes.",
                  "Engenharia de Cardápio: estruturação de cardápios digitais e físicos para conversão.",
                  "Análise de Ativos: diagnóstico de presença digital, branding e performance.",
                  "Gestão de Marketplaces: acompanhamento e otimização de desempenho em iFood e 99Food.",
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={stagger(i)}
                    className="flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:border-[#0047FF]/30 transition-colors">
                    <CheckCircle2 className="text-[#0047FF] mt-0.5 shrink-0" size={17} />
                    <span className="text-slate-200 text-sm leading-relaxed">{item}</span>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
                  className="bg-[#0047FF] rounded-xl px-5 py-3 text-white text-xs font-semibold text-center">
                  Cada entrega está conectada aos pilares do Método Pinguim, garantindo clareza estratégica, previsibilidade e resultado.
                </motion.div>
              </div>
            </div>
          )}

          {/* ── SLIDE 07: PARCEIROS ── */}
          {slide.type === "partners" && (
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
              <div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                  className="text-[#0047FF] font-bold tracking-wider uppercase text-xs mb-3">
                  REDE DE PARCEIROS
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  Parceiros
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="text-slate-400 text-sm leading-relaxed">
                  A Pinguim faz parte de um ecossistema forte, com parceiros estratégicos que ampliam as possibilidades e entregam mais valor para os restaurantes.
                </motion.p>
              </div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
                className="bg-[#0047FF]/10 border border-[#0047FF]/25 rounded-3xl p-6 grid grid-cols-2 gap-4">
                {[
                  { name: "repediu", color: "#E02020" },
                  { name: "abrasel", color: "#1A3B6E" },
                  { name: "Cardápio WEB", color: "#7B3FE4" },
                  { name: "Falaê!", color: "#FF6B00" },
                  { name: "anota AI", color: "#2E2E2E" },
                  { name: "Saipos", color: "#E05A00" },
                  { name: "hubnexxo", color: "#00A878" },
                ].map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={stagger(i)}
                    className="bg-white/[0.05] border border-white/10 rounded-xl p-4 flex items-center justify-center text-center hover:border-white/20 transition-colors">
                    <span className="text-white font-bold text-sm">{p.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* ── SLIDE 08: FINAL / CTA ── */}
          {slide.type === "final" && (
            <div className="text-center max-w-3xl mx-auto">
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: "spring" }}>
                <div className="w-20 h-20 bg-[#25D366]/20 border border-[#25D366]/40 rounded-full flex items-center justify-center mx-auto mb-8">
                  <MessageCircle className="text-[#25D366]" size={40} />
                </div>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-black text-white mb-6">
                Próximo passo?
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                É só me chamar no WhatsApp para conversarmos sobre os próximos passos e começar a transformar o marketing do seu restaurante em vendas reais.
              </motion.p>
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-12 py-5 rounded-full text-lg transition-all shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_60px_rgba(37,211,102,0.6)] hover:-translate-y-1">
                <MessageCircle size={24} />
                Falar com o Pinguim agora
              </motion.a>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="text-slate-600 text-xs mt-8">
                Pinguim Digital — Marketing especializado para restaurantes
              </motion.p>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* ← → */}
      {currentSlide > 0 && (
        <button onClick={prev} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all">
          <ChevronLeft size={20} />
        </button>
      )}
      {currentSlide < slides.length - 1 && (
        <button onClick={next} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-[#0047FF]/20 hover:bg-[#0047FF]/40 border border-[#0047FF]/30 rounded-full flex items-center justify-center text-white transition-all">
          <ChevronRight size={20} />
        </button>
      )}

      {/* Dot nav */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${i === currentSlide ? "w-5 h-1.5 bg-[#0047FF]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}
