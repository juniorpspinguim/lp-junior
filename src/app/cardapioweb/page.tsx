"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Check,
  MessageCircle,
  Maximize2,
  Users,
  Globe,
  Mic,
  MapPin,
  TrendingUp,
  Star,
  Handshake,
  FileText,
  Zap,
  Shield,
  Mail,
  Building2,
  ArrowRight,
  Rocket,
  Video,
  Target,
  LayoutGrid,
  BarChart3,
  PlayCircle
} from "lucide-react";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
const slides = [
  { id: 1, type: "cover" },
  { id: 2, type: "about_junior" },
  { id: 3, type: "about_clube" },
  { id: 4, type: "opportunity" },
  { id: 5, type: "activations" },
  { id: 6, type: "exclusivity" },
  { id: 7, type: "leads" },
  { id: 8, type: "branding" },
  { id: 9, type: "partnership" },
  { id: 10, type: "final" },
];

const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
    rotateX: direction > 0 ? 5 : -5,
  }),
  center: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.98,
    rotateX: direction > 0 ? -5 : 5,
  }),
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const PURPLE = "#7B3FE4";
const PURPLE_LIGHT = "#9D64FF";

const whatsappUrl = `https://wa.me/5571996623922?text=${encodeURIComponent(
  "Olá! Acabei de ver a proposta de parceria Júnior + Cardápio Web. Vamos alinhar?"
)}`;

// ─── COMPONENTS ────────────────────────────────────────────────────────────────
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

// ─── PAGE ──────────────────────────────────────────────────────────────────────
// --- SUBCOMPONENT: Brazil Map with progressive CSS injection ---
const BrazilMapComponent = () => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch('/brazil-map.svg?v=7')
      .then(res => res.text())
      .then(text => {
        // Remove blocos de animate inline para não conflitar com com a nossa injeção JS potente
        const cleaned = text.replace(/<animate[^>]*>/g, '');
        setSvgContent(cleaned);
      });
  }, []);

  useEffect(() => {
    if (!svgContent) return;

    const activeStates = [
      'br-am', 'br-ce', 'br-pi', 'br-pb',
      'br-pe', 'br-al', 'br-se', 'br-ba',
      'br-go', 'br-df', 'br-mg', 'br-es',
      'br-rj', 'br-sp', 'br-pr', 'br-sc',
      'br-rs'
    ];

    const timers = activeStates.map((stateId, idx) => {
      return setTimeout(() => {
        const group = document.getElementById(stateId);
        if (group) {
          const paths = group.tagName.toLowerCase() === 'path' ? [group] : group.querySelectorAll('path');
          paths.forEach((p: any) => {
            p.style.transition = 'all 1s ease-in-out';
            p.style.fill = 'rgba(157, 100, 255, 0.7)';
            p.style.filter = 'drop-shadow(0px 0px 8px rgba(157, 100, 255, 0.8)) hue-rotate(-10deg) brightness(1.2)';
            
            // Adicional para garantir preenchimento sobrepondo inline attributes
            p.setAttribute('fill', 'rgba(157, 100, 255, 0.7)');
          });
        }
      }, 300 + idx * 100);
    });

    return () => timers.forEach(clearTimeout);
  }, [svgContent]);

  if (!svgContent) return null;

  return (
    <div 
      className="w-full h-full flex items-center justify-center pointer-events-none [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full" 
      style={{ filter: 'drop-shadow(0px 0px 10px rgba(255,255,255,0.8)) drop-shadow(0px 0px 2px rgba(255,255,255,1))' }}
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};

export default function ApresentacaoCardapioWebPage() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);

  const goTo = useCallback((n: number) => {
    if (n < 0 || n >= slides.length) return;
    setSlide([n, n > currentSlide ? 1 : -1]);
  }, [currentSlide]);

  const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);
  const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.code === "Space") next();
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
    <div className="relative w-screen h-screen bg-[#030305] overflow-hidden font-sans select-none text-white perspective-[1000px]">
      {/* ── BACKGROUNDS ── */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      {/* Dynamic Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#7B3FE4]/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />

      {/* ── HEADER ── */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-end px-6 md:px-10 py-6">
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-6">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-6 bg-[#7B3FE4] shadow-[0_0_10px_rgba(123,63,228,0.5)]' : 'w-1.5 bg-white/20'}`} />
            ))}
          </div>
          <span className="text-white/40 text-xs font-medium tabular-nums font-mono">{String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          <button onClick={toggleFullscreen} className="text-white/40 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"><Maximize2 size={18} /></button>
        </motion.div>
      </header>

      {/* ── SLIDE CONTENT ── */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} /* Premium easing */
          className="absolute inset-0 flex items-center justify-center px-6 md:px-16 pt-20 pb-16 transform-gpu"
        >

          {/* ════ SLIDE 1: CAPA ════ */}
          {slide.type === "cover" && (
            <div className="w-full max-w-5xl text-center flex flex-col items-center">


              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
                className="text-5xl md:text-8xl font-black leading-[1.05] mb-8 tracking-tighter">
                Proposta de <br />
                <motion.span 
                  animate={{ backgroundPosition: ["-200% center", "200% center"] }}
                  transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
                  className="inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#9D64FF_35%,#ffffff_50%,#9D64FF_65%)] bg-[length:200%_auto] drop-shadow-[0_0_20px_rgba(123,63,228,0.7)] py-1">
                  Parceria Estratégica
                </motion.span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
                Uma aliança de alto impacto para ampliar a presença e as vendas do Cardápio Web no mercado gastronômico da Bahia.
              </motion.p>

              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                onClick={next}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-[1.05] overflow-hidden drop-shadow-2xl">
                <span className="absolute inset-0 rounded-full bg-[#9D64FF]/20 backdrop-blur-md border border-white/10 shadow-[inner_0_0_20px_rgba(255,255,255,0.05)] transition-opacity group-hover:bg-[#9D64FF]/30" />
                
                {/* Efeito HTML de Varredura/Shine */}
                <motion.div 
                   animate={{ x: ["-200%", "300%"] }} 
                   transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1 }}
                   className="absolute inset-0 z-0 w-2/3 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                />

                <span className="relative z-10 flex items-center gap-2 uppercase tracking-wide text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Acessar Proposta Exclusiva <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </span>
              </motion.button>
            </div>
          )}

          {/* ════ SLIDE 2: SOBRE JÚNIOR ════ */}
          {slide.type === "about_junior" && (
            <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-5 relative">
                <motion.div initial={{ opacity: 0, scale: 0.9, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.7 }}
                  className="aspect-[4/5] rounded-[2.5rem] bg-[#0A0A0F] border border-white/10 p-8 flex flex-col justify-end relative overflow-hidden group">
                  
                  <img src="/nova-foto-junior.png" alt="Júnior PS" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent bg-[length:100%_60%] bg-bottom bg-no-repeat pointer-events-none z-10" />


                  <div className="relative z-20 space-y-4">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] rounded-2xl py-3 px-4 drop-shadow-2xl inline-block">
                      <h3 className="text-2xl font-black text-white">Júnior PS</h3>
                      <p className="text-[#B488FF] text-sm font-medium tracking-wide mt-0.5">CEO • Pinguim Digital</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                      {[
                        { icon: MapPin, text: "Salvador, BA" },
                        { icon: TrendingUp, text: "+100 Restaurantes" },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-1 bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10 text-sm shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
                          <item.icon size={16} className="text-[#9D64FF]" />
                          <span className="font-medium text-white/90">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-7">
                <Badge text="Parceiro Estratégico" icon={Star} />
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
                  Especialista em marketing <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">para restaurantes.</span>
                </motion.h2>
                
                <div className="space-y-6 mt-8">
                  {[
                    "Referência em Salvador e região no marketing gastronômico, com acesso direto a donos de restaurantes e parceiros como: Membro da Abrasel Bahia, parceria com contabilidades, empresas de treinamentos e demais prestadores envolvidos no nicho.",
                    "Especialista em crescimento e performance: do tráfego pago à análise de dados, entrega estratégias que convertem em vendas reais.",
                    "Relacionamento próximo com o mercado: construído ao longo de anos de atuação intensa e resultados documentados.",
                    "Capaz de gerar demanda qualificada para o Cardápio Web, tanto na aquisição direta quanto na influência de ferramentas."
                  ].map((text, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                      className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#7B3FE4]/20 border border-[#7B3FE4]/40 flex items-center justify-center shadow-[0_0_10px_rgba(123,63,228,0.2)]">
                        <Check size={12} strokeWidth={3} className="text-[#9D64FF]" />
                      </div>
                      <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">{text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ SLIDE 3: CLUBE DO PINGUIM ════ */}
          {slide.type === "about_clube" && (
            <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-5xl font-black mb-8 leading-[1.1] tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">Clube do Pinguim,</span> <br />
                  uma comunidade que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">move o mercado.</span>
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Alcance Nacional", desc: "Maior grupo de networking e capacitação para agências de marketing de restaurantes do Brasil." },
                    { title: "Decisão em Escala", desc: "Membros tomam decisões sobre ferramentas para centenas de restaurantes simultaneamente." },
                    { title: "Peso de Validação", desc: "Uma recomendação no Clube não é um anúncio, é validação prática de mercado e autoridade." },
                    { title: "Posicionamento Forte", desc: "Ambiente ideal para o Cardápio Web ser a escolha natural das melhores agências." },
                  ].map((item, i) => (
                    <GlassCard key={i} delay={0.2 + i * 0.1} className="p-5">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-[#9D64FF]" /> {item.title}
                      </h4>
                      <p className="text-slate-400 text-sm font-light leading-relaxed">{item.desc}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
                  className="relative aspect-square flex items-center justify-center">
                  {/* Legenda do Mapa (Movida para o topo) */}
                  <div className="absolute -top-6 md:-top-10 text-center w-full z-10 flex flex-col items-center">
                    <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(123,63,228,0.15)]">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4] shadow-[0_0_8px_rgba(157,100,255,0.8)] animate-pulse" />
                      <span className="text-white/80 text-xs md:text-sm font-semibold tracking-wide uppercase">
                        Estados onde o Clube do Pinguim está presente
                      </span>
                    </div>
                  </div>

                  {/* Mapa deslocado para baixo para caber a legenda */}
                  <div className="absolute inset-0 opacity-100 scale-110 z-0 translate-y-12 md:translate-y-16">
                    <BrazilMapComponent />
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* ════ SLIDE 4: OPORTUNIDADE ════ */}
          {slide.type === "opportunity" && (
            <div className="w-full max-w-6xl">
              <div className="text-center mb-6">
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                  O que o Cardápio Web <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">ganha nessa parceria</span>
                </motion.h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-4 md:gap-8 text-left mt-4">
                
                {/* ── COLUNA 1: JÚNIOR PS ── */}
                <div className="flex flex-col gap-3">
                  {/* Cabeçalho da Tabela 1 */}
                  <div className="flex items-center justify-center md:justify-start lg:justify-center gap-4 mb-4 p-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none" />
                    <div className="w-16 h-16 md:w-14 md:h-14 rounded-full overflow-hidden border border-[#9D64FF]/30 shrink-0 relative z-10 shadow-[0_0_15px_rgba(157,100,255,0.2)]">
                      <img src="/nova-foto-junior.png" alt="Júnior PS" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 text-left md:text-left lg:text-center shrink-0">
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Júnior PS</h3>
                      <p className="text-[#9D64FF] text-xs font-bold tracking-widest uppercase mt-0.5">CEO Pinguim Digital</p>
                    </div>
                  </div>
                  
                  {/* Cards Júnior PS */}
                  {[
                    {
                      icon: MapPin, 
                      title: "Posicionamento Regional na Bahia",
                      desc: "Presença forte e qualificada em Salvador e interior, um dos maiores mercados gastronômicos do Nordeste."
                    },
                    {
                      icon: Handshake, 
                      title: "Acesso direto a Donos de Restaurante",
                      desc: "Relacionamento de confiança com decisores reais, gerando indicações quentes que convertem agressivamente."
                    },
                    {
                      icon: Target, 
                      title: "Geração de Cases de Sucesso",
                      desc: "Implementação avançada em contas-chave da Pinguim Digital para gerar cases inquestionáveis de alto faturamento."
                    },
                    {
                      icon: Video, 
                      title: "Conteúdo com autoridade (não publicidade)",
                      desc: "Reels com uso real da ferramenta. Demonstração prática no dia a dia. Prova social através de clientes."
                    }
                  ].map((item, i) => (
                    <GlassCard key={`junior-${i}`} delay={0.2 + i * 0.1} className="!p-3.5 flex gap-3 xl:gap-4 group cursor-default">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#7B3FE4]/20 to-transparent border border-[#7B3FE4]/30 group-hover:scale-110 transition-transform duration-500">
                        <item.icon size={18} className="text-[#9D64FF]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold mb-0.5 group-hover:text-[#9D64FF] transition-colors">{item.title}</h4>
                        <p className="text-slate-400 text-[13px] md:text-sm font-light leading-snug">{item.desc}</p>
                      </div>
                    </GlassCard>
                  ))}
                </div>

                {/* ── COLUNA 2: CLUBE DO PINGUIM ── */}
                <div className="flex flex-col gap-3">
                  {/* Cabeçalho da Tabela 2 */}
                  <div className="flex items-center justify-center md:justify-start lg:justify-center gap-4 mb-4 p-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none" />
                    <div className="w-16 h-16 md:w-14 md:h-14 rounded-full border border-[#9D64FF]/30 shrink-0 relative z-10 flex items-center justify-center bg-black/60 shadow-[0_0_15px_rgba(157,100,255,0.2)]">
                      <img src="/logo-pinguim.png" alt="Clube do Pinguim" className="w-8 object-contain" />
                    </div>
                    <div className="relative z-10 text-left md:text-left lg:text-center shrink-0">
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Clube do Pinguim</h3>
                      <p className="text-[#9D64FF] text-xs font-bold tracking-widest uppercase mt-0.5">Ecossistema Nacional</p>
                    </div>
                  </div>

                  {/* Cards Clube do Pinguim */}
                  {[
                    {
                      icon: Globe, 
                      title: "Influência sobre Agências Nacionais",
                      desc: "Ser a recomendação padrão de centenas de agências de performance do grupo para suas dezenas de restaurantes clientes."
                    },
                    {
                      icon: MessageCircle, 
                      title: "Suporte diferenciado para membros do Clube",
                      desc: "Atendimento mais próximo e direcionado para as agências da comunidade. Maior agilidade e melhor experiência para o cliente final."
                    },
                    {
                      icon: Users, 
                      title: "Adoção em Bloco (Efeito Manada)",
                      desc: "Quando o ecossistema valida oficialmente a ferramenta como parceira, dezenas de agências passam a usá-la simultaneamente."
                    },
                    {
                      icon: Building2, 
                      title: "Possibilidade de Ativações Internas",
                      desc: "Participação em encontros com donos. Conteúdos exclusivos e interação direta recorrente com o portfólio de agências."
                    }
                  ].map((item, i) => (
                    <GlassCard key={`clube-${i}`} delay={0.4 + i * 0.1} className="!p-3.5 flex gap-3 xl:gap-4 group cursor-default">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#7B3FE4]/20 to-transparent border border-[#7B3FE4]/30 group-hover:scale-110 transition-transform duration-500">
                        <item.icon size={18} className="text-[#9D64FF]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold mb-0.5 group-hover:text-[#9D64FF] transition-colors">{item.title}</h4>
                        <p className="text-slate-400 text-[13px] md:text-sm font-light leading-snug">{item.desc}</p>
                      </div>
                    </GlassCard>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* ════ SLIDE 5: ESTRUTURA DA PARCERIA ════ */}
          {slide.type === "partnership" && (
            <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-5 flex flex-col justify-center">
                <Badge text="Modelo Proposto" icon={LayoutGrid} />
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
                  Estrutura da <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">Parceria.</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="text-slate-400 text-lg mb-10 font-light">
                  Um modelo claro, com entregas concretas e investimento mensal definido para garantir previsibilidade e escala.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="relative p-[1px] rounded-3xl bg-gradient-to-br from-[#7B3FE4] to-transparent overflow-hidden">
                  <div className="bg-white/10 backdrop-blur-2xl shadow-[inset_0_1px_20px_rgba(255,255,255,0.05)] p-8 rounded-3xl flex items-center justify-between">
                    <div>
                      <p className="text-[#9D64FF] text-xs font-bold tracking-widest uppercase mb-1">Formato</p>
                      <p className="text-2xl font-bold text-white/50 mb-1">Investimento Mensal</p>
                      <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4a4ff]">R$ 3.000,00</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#7B3FE4]/20 flex items-center justify-center border border-[#7B3FE4]/30">
                      <Zap size={20} className="text-[#9D64FF]" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {[
                  { icon: Video, title: "4 Reels Mensais", desc: "Conteúdo estratégico focado em conversão e collab no Instagram." },
                  { icon: Star, title: "Autoridade em Anúncios", desc: "Uso da imagem do Júnior em tráfego pago focado na região Salvador e Bahia." },
                  { icon: Mic, title: "Participação no CW Cast", desc: "05 episódios dedicados ao Cardápio Web com participação de empresários do setor gastronômico local e um co-host do Cardápio Web." },
                  { icon: Target, title: "Patrocínio de Podcast", desc: "Logo e inserções fixas nos episódios como parceiro oficial e patrocinador (após os 5 episódios do CW cast)." },
                ].map((item, i) => (
                  <GlassCard key={i} delay={0.3 + i * 0.1} className="!p-5 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-[#9D64FF]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1 text-white/90">{item.title}</h4>
                      <p className="text-sm font-light text-slate-400">{item.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* ════ SLIDE 6: ATIVAÇÕES E EXPANSÃO ════ */}
          {slide.type === "activations" && (
            <div className="w-full max-w-6xl">
              <div className="text-center mb-16">
                <Badge text="Além do Digital" icon={Building2} />
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
                  Ativações e <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">Expansão</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                  Pontos de contato físicos que fortalecem a marca no mercado e geram conversas de alto valor com diretores e CEOs de restaurantes.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Eventos Setoriais",
                    desc: "Presença em eventos relevantes do setor gastronômico, promovendo networking qualificado e identificação de oportunidades de mercado, com conexão natural entre as demandas do público e as soluções da parceria.",
                    highlight: "Presença Ativa"
                  },
                  {
                    title: "Logística Integrada",
                    desc: "Apoio estrutural com ingressos, deslocamentos e hospedagem para garantir a cobertura dos eventos mais estratégicos do cenário anual.",
                    highlight: "Infraestrutura"
                  },
                  {
                    title: "Apoio a Eventos Próprios",
                    desc: "Possibilidade de co-patrocínio para eventos locais da Pinguim Digital ou do Clube, tendo o Cardápio Web como ferramenta oficial.",
                    highlight: "Co-Branding"
                  }
                ].map((item, i) => (
                  <GlassCard key={i} delay={0.2 + i * 0.1} className="flex flex-col h-full relative group">
                    <div className="absolute top-0 right-8 w-px h-16 bg-gradient-to-b from-[#7B3FE4]/50 to-transparent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#9D64FF] mb-4 inline-block">{item.highlight}</span>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-slate-400 font-light leading-relaxed mt-auto text-sm md:text-base">{item.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* ════ SLIDE 7: EXCLUSIVIDADE ════ */}
          {slide.type === "exclusivity" && (
            <div className="w-full max-w-4xl text-center flex flex-col items-center">
              <Badge text="Regras Claras" icon={Shield} />
              
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8">
                Exclusividade <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">Estratégica</span>
              </motion.h2>
              
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                A parceria garante que <strong className="text-white font-bold bg-white/10 px-2 py-1 rounded">nenhum concorrente direto</strong> do Cardápio Web será promovido neste ecossistema.
              </motion.p>

              <div className="w-full grid md:grid-cols-2 gap-6 relative">
                {/* vs badge in middle */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1A1A24] border border-white/10 items-center justify-center z-10 font-black text-slate-500 text-sm">
                  VS
                </div>

                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                  className="rounded-[2rem] bg-gradient-to-b from-[#7B3FE4]/20 to-transparent border border-[#7B3FE4]/30 p-8 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B3FE4]/30 blur-[40px] rounded-full" />
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-[#7B3FE4]/20 flex items-center justify-center">
                      <Shield size={20} className="text-[#9D64FF]" />
                    </div>
                    <h3 className="text-xl font-bold">Bloqueado</h3>
                  </div>
                  <p className="text-slate-300 font-light">Todas as plataformas de <strong className="text-white">cardápio digital</strong>. Concorrência blindada.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                  className="rounded-[2rem] bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/20 p-8 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[40px] rounded-full" />
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold">Permitido</h3>
                  </div>
                  <p className="text-slate-300 font-light">Sistemas complementares que empilham valor: <strong className="text-white">CRM, Automação, ERPs e NPS.</strong></p>
                </motion.div>
              </div>
            </div>
          )}

          {/* ════ SLIDE 8: GERAÇÃO DE LEADS ════ */}
          {slide.type === "leads" && (
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <Badge text="Performance" icon={BarChart3} />
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
                  Máquina de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">Leads</span>
                </motion.h2>
                
                <div className="space-y-6">
                  {[
                    "Criação de páginas de captura dedicadas otimizadas.",
                    "Integração estratégica nas campanhas do Júnior.",
                    "Disparo para a base quente do Clube do Pinguim."
                  ].map((text, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                      <div className="w-8 h-8 rounded-full bg-[#7B3FE4]/20 flex items-center justify-center shrink-0 border border-[#7B3FE4]/30">
                        <CheckCircle2 size={14} className="text-[#9D64FF]" />
                      </div>
                      <p className="text-slate-300 font-light">{text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[inset_0_1px_30px_rgba(255,255,255,0.02),0_20px_40px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#7B3FE4]/20 blur-[60px]" />
                  
                  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B3FE4] to-[#9D64FF] flex items-center justify-center shadow-lg">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Funil Exclusivo</h3>
                      <p className="text-[#9D64FF] text-sm">Design & Conversão</p>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10">
                    {[
                      { step: "01", label: "Autoridade e Educação", desc: "Endosso oficial do Clube e Reels focados em nível de consciência." },
                      { step: "02", label: "Captura de Alta Intenção", desc: "Landing Pages desenhadas estritamente para conversão B2B." },
                      { step: "03", label: "Qualificação Ativa", desc: "Triagem imediata de curiosos, entregando apenas decisores prontos." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-[#9D64FF] transition-colors group-hover:bg-[#7B3FE4]/20 group-hover:border-[#7B3FE4]/40 shrink-0">
                            {item.step}
                          </div>
                          {i !== 2 && <div className="w-px h-full min-h-[1.5rem] bg-white/10 my-1 group-hover:bg-[#7B3FE4]/50 transition-colors" />}
                        </div>
                        <div className="pt-0.5 w-full pb-2">
                          <div className="flex flex-col justify-center bg-white/10 backdrop-blur-lg border border-white/10 shadow-[inset_0_1px_10px_rgba(255,255,255,0.05)] rounded-xl px-4 py-3 group-hover:border-[#9D64FF]/50 group-hover:bg-white/[0.15] transition-all">
                            <span className="font-bold text-white/90 text-[15px] mb-0.5">{item.label}</span>
                            <span className="text-xs text-slate-400 font-light leading-relaxed">{item.desc}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* ════ SLIDE 9: PRESENÇA DE MARCA ════ */}
          {slide.type === "branding" && (
            <div className="w-full max-w-5xl">
              <div className="text-center mb-16">
                <Badge text="Visibilidade 360" icon={PlayCircle} />
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
                  Presença de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">Marca</span>
                </motion.h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Building2,
                    title: "Ambiente de Trabalho",
                    desc: "Inserção cirúrgica da sua marca no espaço físico e digital, gerando exposição passiva diária inestimável.",
                    items: [
                      "Fundo de tela padrão (backdrop) nas reuniões online da equipe",
                      "Exposição contínua da marca para todos os clientes B2B em calls",
                      "Elementos do Cardápio Web nos bastidores diários e stories"
                    ]
                  },
                  {
                    icon: Users,
                    title: "Comunidade Clube do Pinguim",
                    desc: "Posicionamento do Cardápio Web dentro da maior comunidade de food marketing do Brasil.",
                    items: [
                      "Citações orgânicas em encontros do Clube do Pinguim (uma vez por semana)",
                      "Suporte prioritário aumentando a retenção e indicação das agências ao CW",
                      "Visibilidade massiva em todo o fluxo de aprendizado dos donos"
                    ]
                  }
                ].map((item, i) => (
                  <GlassCard key={i} delay={0.2 + i * 0.1} className="flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-[#7B3FE4]/10 border border-[#7B3FE4]/20 flex items-center justify-center mb-6">
                      <item.icon size={26} className="text-[#9D64FF]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-400 font-light mb-8 text-sm md:text-base">{item.desc}</p>
                    
                    <div className="mt-auto space-y-3">
                      {item.items.map((li, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#9D64FF]" />
                          <span className="text-sm font-light text-slate-300">{li}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* ════ SLIDE 10: FINAL ════ */}
          {slide.type === "final" && (
            <div className="text-center max-w-4xl mx-auto flex flex-col items-center justify-center h-[80%] pt-10">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full">
                
                {/* Subtle Background Glow */}
                <div className="absolute inset-0 bg-[#7B3FE4]/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 space-y-12">
                  <div className="flex justify-center items-center gap-6 mb-8">
                    <img src="/nova-foto-junior.png" alt="Júnior PS" className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-md shadow-[#9D64FF]/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <img src="/logo-pinguim.png" alt="Clube do Pinguim" className="w-10 object-contain drop-shadow-[0_0_10px_rgba(157,100,255,0.3)]" />
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug max-w-3xl mx-auto">
                    O Cardápio Web está a um passo de se juntar ao ecossistema que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D64FF] to-[#7B3FE4]">mais cresce no nicho.</span>
                  </h2>

                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#9D64FF]/50 to-transparent mx-auto rounded-full" />

                  <div className="max-w-2xl mx-auto mt-8">
                    <p className="text-xl md:text-2xl text-slate-300 font-light italic leading-relaxed">
                      <span className="relative inline-block px-3 py-1">
                        <motion.span 
                          initial={{ scaleX: 0 }} 
                          animate={{ scaleX: 1 }} 
                          transition={{ duration: 2.5, delay: 1.2, ease: "easeInOut" }}
                          className="absolute inset-0 bg-[#9D64FF]/30 rounded-md origin-left z-0"
                        />
                        <span className="relative z-10 font-medium text-white drop-shadow-md">
                          "Nenhum de nós é tão bom quanto todos nós juntos."
                        </span>
                      </span>
                    </p>
                    <p className="text-[11px] md:text-xs text-[#9D64FF] mt-6 font-bold tracking-widest uppercase">
                      — Ray Kroc (Pioneiro, Império McDonald's)
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="absolute bottom-12 text-[10px] md:text-xs font-mono text-slate-600 tracking-widest uppercase">
                Júnior PS • Clube do Pinguim • Cardápio Web
              </motion.p>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* ── LATERAL NAVIGATION CONTROLS ── */}
      {currentSlide > 0 && (
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:scale-110 transition-all">
          <ChevronLeft size={24} />
        </button>
      )}
      {currentSlide < slides.length - 1 && (
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#7B3FE4]/20 backdrop-blur-md border border-[#7B3FE4]/30 text-white hover:bg-[#7B3FE4]/40 hover:scale-110 transition-all shadow-[0_0_20px_rgba(123,63,228,0.2)]">
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}
