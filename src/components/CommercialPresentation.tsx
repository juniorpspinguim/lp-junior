"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { InvestmentSlide, NextStepsSlide } from "@/components/ProposalCommercialSlides";
import type { CommercialProposal } from "@/lib/proposal-commercial";
import RevenueResults from "@/components/RevenueResults";
import DiscoverySlide from "@/components/DiscoverySlide";
import ProposalSectionCover from "@/components/ProposalSectionCover";
import MethodExample from "@/components/MethodExample";
import ProposalTestimonials from "@/components/ProposalTestimonials";
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
} from "lucide-react";

// ─── SLIDE DATA ────────────────────────────────────────────────────────────────
const slides = [
  { id: 1, type: "cover" },
  { id: 9, type: "agreement" },
  { id: 12, type: "understand-cover" },
  { id: 10, type: "discovery" },
  { id: 11, type: "impact" },
  { id: 13, type: "connect-cover" },
  { id: 2, type: "about" },
  { id: 3, type: "clients" },
  { id: 4, type: "method" },
  { id: 5, type: "results" },
  { id: 6, type: "deliverables" },
  { id: 7, type: "partners" },
  { id: 14, type: "decide-cover" },
  { id: 15, type: "investment" },
  { id: 16, type: "next-steps" },
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
// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function CommercialPresentation({ proposal }: { proposal?: CommercialProposal }) {
  const [example, setExample] = useState<number | null>(null);
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
      if (example !== null || document.querySelector("dialog[open]")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [next, prev, example]);

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
              {/* Símbolo da marca com o pinguim vazado, sem fundo. */}
              <div className="absolute left-0 top-0 bottom-0 w-1/2 md:w-[42%] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 300 340" className="absolute h-[90%] max-w-[90%] fill-[#0047FF]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" d="M0 10H139C229 10 292 58 292 139S232 267 139 267H94V335H0Z M92 116C92 94 119 64 151 64C174 64 194 82 208 99C216 106 230 110 237 117C238 120 216 131 210 139C201 150 203 162 179 173C169 177 161 179 152 179C140 184 132 192 130 203C129 208 127 210 123 210H101C95 210 93 206 93 200Z" />
                  <circle cx="154" cy="107" r="15" />
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
                {proposal && <div className="flex items-center gap-3 mb-6">{proposal.logo_url && <img src={proposal.logo_url} alt="Logo do restaurante" className="w-14 h-14 rounded-xl object-contain bg-white p-1" />}<p className="text-white text-lg font-semibold">{proposal.restaurant_name}</p></div>}
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

          {(slide.type === "agreement" || slide.type === "discovery" || slide.type === "impact") && (
            <DiscoverySlide type={slide.type} />
          )}

          {(slide.type === "understand-cover" || slide.type === "connect-cover" || slide.type === "decide-cover") && (
            <ProposalSectionCover type={slide.type} />
          )}

          {/* ── SLIDE 02: QUEM SOMOS ── */}
          {slide.type === "about" && (
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
              <motion.figure initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="w-full md:w-[95%] justify-self-center">
                <div className="relative bg-[#10121B] rounded-3xl overflow-hidden flex items-end justify-center h-72 md:h-[420px]">
                <Image
                  src="/foto-junior-proposta.jpeg"
                  alt="Junior, da Pinguim, falando ao microfone em um evento"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-[center_25%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C14]/95 via-[#0A0C14]/15 to-transparent" />
                <div className="relative z-10 text-center pb-6 px-6">
                  <p className="text-white/70 text-xs tracking-widest uppercase mb-1">Mais de</p>
                  <p className="text-4xl md:text-6xl font-black text-white">4 anos</p>
                  <p className="text-white/80 text-sm mt-1">100% foco no setor gastronômico</p>
                </div>
                </div>
                <figcaption className="mt-3 text-center text-xs text-slate-400">
                  Palestrante na Fispal 2026
                </figcaption>
              </motion.figure>
              <div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-[#0047FF] font-bold tracking-wider uppercase text-xs mb-3">
                  QUEM SOMOS?
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  Seu restaurante precisa de marketing que entenda o seu negócio.
                </motion.h2>
                <div className="space-y-4">
                  {[
                    "Há mais de 4 anos, a Pinguim trabalha exclusivamente com restaurantes e deliveries. Nosso trabalho começa entendendo sua operação, os desafios das vendas e os objetivos que você quer alcançar.",
                    "A partir desse diagnóstico, unimos estratégia, dados e comunicação para atrair clientes, estimular novos pedidos e incentivar a recompra, acompanhando os resultados para orientar cada próximo passo.",
                    "Também lideramos o Clube do Pinguim, uma comunidade de networking e capacitação para agências especializadas no setor gastronômico.",
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
            <ProposalTestimonials />
          )}

          {/* ── SLIDE 04: METODOLOGIA ── */}
          {slide.type === "method" && (
            <section className="w-full max-w-7xl max-h-full overflow-y-auto py-4" aria-label="Os cinco pilares do Método Pinguim">
              <div className="text-center mb-8 lg:mb-12">
                <p className="text-[#0047FF] font-bold tracking-[0.25em] uppercase text-xs mb-4">Estratégia em cinco pilares</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
                  Método <span className="text-[#0047FF]">Pinguim</span>
                </h2>
                <p className="text-slate-300 text-lg md:text-xl">Da primeira impressão ao próximo pedido.</p>
              </div>

              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
                {[
                  { icon: Wifi, title: "Comunicação", color: "#60A5FA", headline: "Deixar claro para vender melhor.", desc: "O que você oferece, seus diferenciais e como pedir ou visitar." },
                  { icon: Target, title: "Posicionamento", color: "#B69AFF", headline: "Atrair o público certo e gerar confiança.", desc: "Conteúdo alinhado ao seu público e reputação no Google e iFood." },
                  { icon: Users, title: "Aquisição", color: "#38D3D9", headline: "Trazer novos clientes.", desc: "Tráfego pago para atrair potenciais clientes ao restaurante e ao delivery." },
                  { icon: ShoppingCart, title: "Vendas", color: "#63D9A0", headline: "Transformar interesse em pedidos.", desc: "Cardápio, ofertas e atendimento que facilitam a decisão de compra." },
                  { icon: RefreshCw, title: "Recorrência", color: "#F2BA68", headline: "Fazer o cliente voltar.", desc: "Recuperação de clientes inativos, novas compras e fidelização." },
                ].map((pillar, i) => (
                  <motion.li key={pillar.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={stagger(i)}
                    className="relative flex flex-col rounded-2xl border p-5 xl:p-6"
                    style={{ borderColor: `${pillar.color}40`, background: `linear-gradient(155deg, ${pillar.color}24, #0D111C 75%)`, boxShadow: `inset 0 2px 0 ${pillar.color}99` }}>
                    <div className="flex items-center justify-between mb-7">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border" style={{ color: pillar.color, borderColor: `${pillar.color}50`, backgroundColor: `${pillar.color}20` }}>
                        <pillar.icon size={22} strokeWidth={1.5} aria-hidden="true" />
                      </div>
                      <span className="text-xs font-semibold tracking-widest" style={{ color: pillar.color }}>0{i + 1}</span>
                    </div>
                    <button type="button" onClick={() => setExample(i)} aria-label={`Ver exemplo fictício de ${pillar.title}`} className="absolute inset-0 z-20 rounded-2xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white hover:bg-white/[0.03]" />
                    <h3 className="text-base xl:text-lg font-bold text-white mb-3">{pillar.title}</h3>
                    <p className="text-sm font-medium leading-relaxed mb-4 lg:min-h-[66px]" style={{ color: pillar.color }}>{pillar.headline}</p>
                    <p className="text-sm leading-relaxed text-slate-400 border-t border-white/10 pt-4">{pillar.desc}</p>
                    <span className="mt-5 text-xs font-semibold" style={{ color: pillar.color }}>Ver exemplo ↗</span>
                    {i < 4 && <span className="hidden lg:flex absolute -right-3 top-10 z-10 h-6 w-6 rounded-full items-center justify-center bg-[#0A0C14] border border-[#0047FF]/30 text-[#5686FF]"><ChevronRight size={13} aria-hidden="true" /></span>}
                  </motion.li>
                ))}
              </ol>

              <div className="mt-8 lg:mt-10 flex items-center justify-center gap-3 text-center">
                <RefreshCw size={18} className="text-[#5686FF] shrink-0" aria-hidden="true" />
                <p className="text-sm md:text-base text-slate-300">Um trabalho integrado para <span className="text-white font-semibold">atrair, converter e fazer o cliente voltar.</span></p>
              </div>
            </section>
          )}

          {/* ── SLIDE 05: RESULTADOS ── */}
          {slide.type === "results" && <RevenueResults />}

          {/* ── SLIDE 06: ENTREGAS E SOLUÇÕES ── */}
          {slide.type === "deliverables" && (
            <section className="w-full max-w-6xl max-h-full overflow-y-auto py-3" aria-label="Entregas e soluções">
              <p className="text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-3">Do método à prática</p>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">O que fazemos pelo <span className="text-blue-400">seu restaurante.</span></h2>
              <p className="text-slate-400 text-sm mt-3 mb-6">Execução, orientação e soluções conforme o plano: clareza sobre como a Pinguim atua no seu negócio.</p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { number: "01", title: "O que executamos", subtitle: "Gestão e acompanhamento", color: "#64A7FF", icon: Target, items: [
                    { title: "Tráfego pago", text: "Gestão de campanhas no Meta Ads e Google Ads, com acompanhamento e otimizações." },
                    { title: "Presença no Google", text: "Otimização do Perfil da Empresa para facilitar que o cliente encontre seu restaurante." },
                    { title: "Análise de desempenho", text: "Leitura dos indicadores disponíveis para orientar ajustes na estratégia." },
                    { title: "Engenharia de cardápio", text: "Ajustes na organização, apresentação e destaque dos produtos, conforme a necessidade identificada e os recursos da plataforma." },
                  ] },
                  { number: "02", title: "O que orientamos", subtitle: "Direção para sua equipe", color: "#B89AFF", icon: MessageCircle, items: [
                    { title: "Comunicação e conteúdo", text: "Orientação sobre bio, destaques, chamadas e produção de conteúdo para o público desejado." },
                    { title: "Ofertas e calendário", text: "Sugestões de combos, promoções e ações sazonais para estimular pedidos e ticket médio." },
                    { title: "Indicadores e próximos passos", text: "Orientação sobre o que os números mostram e quais ações priorizar nas ofertas e nos canais de venda." },
                  ] },
                  { number: "03", title: "Conforme o plano", subtitle: "Escopo definido na proposta", color: "#63D9A0", icon: CheckCircle2, items: [
                    { title: "CRM e recorrência", text: "Gestão de campanhas segmentadas quando contratada e com ferramenta de CRM disponível." },
                    { title: "Marketplaces", text: "Acompanhamento e otimização de iFood e 99Food, conforme os canais contratados." },
                    { title: "Serviços adicionais", text: "Demandas específicas definidas de acordo com a necessidade do restaurante e o escopo escolhido." },
                  ] },
                ].map((block, i) => (
                  <motion.div key={block.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={stagger(i)} className="rounded-2xl border border-white/10 p-5 bg-[#101521]" style={{ backgroundImage: `radial-gradient(ellipse at top right, ${block.color}16, transparent 65%)` }}>
                    <div className="flex items-center justify-between mb-4"><block.icon size={23} style={{ color: block.color }} aria-hidden="true" /><span className="text-xs font-bold tracking-widest text-slate-500">{block.number}</span></div>
                    <h3 className="text-xl font-bold text-white">{block.title}</h3>
                    <p className="text-xs mt-1 mb-5" style={{ color: block.color }}>{block.subtitle}</p>
                    <div className="space-y-3">{block.items.map(item => <div key={item.title} className="border-t border-white/10 pt-2"><h4 className="text-sm font-semibold text-white">{item.title}</h4><p className="mt-1 text-xs leading-relaxed text-slate-400">{item.text}</p></div>)}</div>
                  </motion.div>
                ))}
              </div>
              <p className="mt-5 text-xs text-slate-400 border-l-2 border-blue-500 pl-3">O plano escolhido define os serviços inclusos. Nas frentes de orientação, a implementação é realizada pelo restaurante ou por sua equipe.</p>
            </section>
          )}

          {/* ── SLIDE 07: PARCEIROS ── */}
          {slide.type === "partners" && (
            <section className="w-full max-w-6xl max-h-full overflow-y-auto py-3" aria-label="Parceiros da Pinguim">
              <p className="text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-3">Rede de parceiros</p>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">Conexões que fortalecem <span className="text-blue-400">seu negócio.</span></h2>
              <p className="text-slate-400 text-sm mt-3 mb-6">Tecnologia, relacionamento e soluções que apoiam nossa atuação junto aos restaurantes.</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Cardápio Web", file: "cardapio-web", label: "E-commerce para restaurantes", description: "Facilita a gestão de pedidos e a operação do canal próprio de vendas do restaurante.", color: "#B89AFF" },
                  { name: "Falaê!", file: "falae", label: "Experiência do cliente", description: "Pesquisas de satisfação para ouvir o cliente e identificar oportunidades de melhoria.", color: "#38D3D9" },
                  { name: "Abrasel", file: "abrasel", label: "Bahia e Sergipe", description: "Relacionamento com o setor de bares e restaurantes nas duas regionais.", color: "#63D9A0" },
                  { name: "Hubnexxo", file: "hubnexxo", label: "Contabilidade especializada", description: "Contabilidade especializada em restaurantes, conectada a um hub de soluções para a gestão do setor.", color: "#F2BA68" },
                ].map((partner, i) => (
                  <motion.div key={partner.file} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={stagger(i)} className="overflow-hidden rounded-2xl border border-white/10 bg-[#101521]">
                    <div className="bg-white h-36 md:h-44 flex items-center justify-center p-5">
                      <Image src={`/parceiros-proposta/${partner.file}.png`} alt={`Logo ${partner.name}`} width={240} height={160} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: partner.color }}>{partner.label}</p><h3 className="text-xl font-bold text-white">{partner.name}</h3><p className="mt-3 text-xs leading-relaxed text-slate-400">{partner.description}</p></div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {slide.type === "investment" && <InvestmentSlide proposal={proposal} />}
          {slide.type === "next-steps" && <NextStepsSlide />}

          {/* ── SLIDE 08: FINAL / CTA ── */}
          {slide.type === "final" && (
            <section className="w-full max-w-5xl text-center px-4" aria-label="Encerramento da proposta">
              <svg viewBox="0 0 5312 1195" role="img" aria-label="Pinguim" className="mx-auto w-60 md:w-80 h-auto mb-12 md:mb-16">
                <defs><filter id="closing-white-logo" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1 0 1 0 0" /><feComposite in2="SourceGraphic" operator="in" /></filter></defs>
                <image href="/logo-pinguim.png" width="5312" height="1195" filter="url(#closing-white-logo)" />
              </svg>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
                O seu restaurante tem uma história.
                <span className="block mt-5 text-blue-400">Vamos construir o próximo<br className="hidden md:block" /> capítulo juntos.</span>
              </h2>
            </section>
          )}

        </motion.div>
      </AnimatePresence>

      {example !== null && <MethodExample index={example} onClose={() => setExample(null)} />}

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
          <button key={i} aria-label={`Ir para página ${i + 1}`} onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${i === currentSlide ? "w-5 h-1.5 bg-[#0047FF]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}
