"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Users, UtensilsCrossed, Smartphone, CheckCircle2, ChevronRight, Play, Motorbike, AlertTriangle, Frown, MessageSquare, Target, Rocket, RefreshCw, ChevronDown, Instagram, MessageCircle } from "lucide-react";

export default function Home() {
  // Form State
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [faturamento, setFaturamento] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carousel Refs
  const problemsCarouselRef = useRef<HTMLDivElement>(null);
  const methodCarouselRef = useRef<HTMLDivElement>(null);
  const testimonialsCarouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for carousels
  useEffect(() => {
    const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      const element = ref.current;
      const maxScrollLeft = element.scrollWidth - element.clientWidth;
      
      // If we are at the end, smoothly scroll back to start, otherwise scroll right by one item width
      if (element.scrollLeft >= maxScrollLeft - 10) {
        element.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Approximate width of one card + gap (85vw + gap)
        const scrollAmount = window.innerWidth * 0.85 + 24; 
        element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    const problemsInterval = setInterval(() => scrollCarousel(problemsCarouselRef), 5000);
    const methodInterval = setInterval(() => scrollCarousel(methodCarouselRef), 5000);
    const testimonialsInterval = setInterval(() => scrollCarousel(testimonialsCarouselRef), 5000);

    return () => {
      clearInterval(problemsInterval);
      clearInterval(methodInterval);
      clearInterval(testimonialsInterval);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Prepare data for Google Sheets (via Webhook)
      const formData = {
        nome,
        telefone,
        instagram,
        faturamento,
        data: new Date().toISOString()
      };

      // TODO: Replace this URL with the actual Make/Zapier Webhook URL
      const webhookUrl = "SUA_URL_DO_WEBHOOK_AQUI";

      // Try to send to webhook, but don't block the WhatsApp redirect if it fails
      if (webhookUrl !== "SUA_URL_DO_WEBHOOK_AQUI") {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }).catch(err => console.error("Webhook error:", err));
      }

      // 2. Prepare WhatsApp Redirection
      // TODO: Replace with the actual WhatsApp number (only numbers, include country code 55)
      const whatsappNumber = "5571996623922";

      const faturamentoMap: Record<string, string> = {
        "1": "Até R$ 80 mil",
        "2": "De R$ 80 a 100 mil",
        "3": "De R$ 100 mil a 300 mil",
        "4": "Acima de R$ 300 mil"
      };

      const message = `Olá, tudo bem? Tenho um restaurante e quero vender mais!\n\n*Dados do formulário:*\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Instagram:* ${instagram}\n*Faturamento:* ${faturamentoMap[faturamento] || 'Não informado'}`;
      const encodedMessage = encodeURIComponent(message);

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Reset form
      setNome("");
      setTelefone("");
      setInstagram("");
      setFaturamento("");

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Ocorreu um erro ao enviar. Por favor, tente novamente ou chame direto no botão do WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0D12] overflow-hidden">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#0D0D12]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center">
            <Image
              src="/logo-pinguim.png"
              alt="Pinguim Marketing"
              width={150}
              height={42}
              className="object-contain"
              priority
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#inicio" className="relative overflow-hidden px-6 py-2.5 rounded-full bg-[#25D366]/90 backdrop-blur-md border border-white/20 text-white font-semibold shadow-[0_8px_32px_rgba(37,211,102,0.3)] transition-all duration-500 hover:bg-[#25D366] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:-translate-y-1 active:translate-y-0 before:absolute before:inset-0 before:-translate-x-[150%] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:skew-x-12 before:transition-transform before:duration-700 hover:before:translate-x-[150%]">
              Falar com o Pinguim
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFA500]/10 via-[#0D0D12]/0 to-[#0D0D12] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-center md:text-left text-3xl md:text-5xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 tracking-tight text-white mt-12">
              Marketing para restaurantes que transforma <span className="text-[#0047FF]">comunicação em vendas.</span>
            </h1>
            <p className="text-center md:text-left mx-auto md:mx-0 text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
              Do cardápio ao tráfego pago: chega de agências genéricas. Mais de 100 restaurantes já validaram nosso método focado em gerar <strong className="text-[#0047FF] font-semibold">pedidos</strong>, aumentar <strong className="text-[#0047FF] font-semibold">ticket médio</strong> e transformar dados em <strong className="text-[#0047FF] font-semibold">lucro</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col items-center sm:items-start gap-4">
                <a href="#inicio" className="w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-2 bg-[#25D366]/90 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg shadow-[0_8px_32px_rgba(37,211,102,0.4)] transition-all duration-500 hover:bg-[#25D366] hover:shadow-[0_0_40px_rgba(37,211,102,0.8)] hover:-translate-y-1 active:translate-y-0 before:absolute before:inset-0 before:-translate-x-[150%] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:skew-x-12 before:transition-transform before:duration-700 hover:before:translate-x-[150%]">
                  <span className="relative z-10 tracking-wide">QUERO CONTRATAR O PINGUIM</span>
                  <ArrowRight size={20} className="relative z-10" />
                </a>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-sm text-slate-300 font-medium bg-black/20 backdrop-blur-sm border border-white/5 py-2.5 px-5 rounded-full shadow-inner">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#25D366]" />
                    Foco em vendas
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#25D366]" />
                    Execução completa
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#25D366]" />
                    Resultados reais
                  </span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* LEAD CAPTURE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative lg:h-[650px] flex items-center justify-center my-10 lg:my-0 group perspective-1000"
          >
            {/* Animated HTML Effect: Border Glow and Sweep on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0047FF]/0 via-[#0047FF]/0 to-[#003BCC]/0 group-hover:from-[#0047FF]/40 group-hover:via-transparent group-hover:to-[#002B99]/30 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl z-0 rounded-3xl"></div>

            {/* Form Container */}
            <div className="relative w-full max-w-lg bg-[#0F1014]/95 backdrop-blur-xl border border-white/10 group-hover:border-[#0047FF]/40 transition-colors duration-500 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,71,255,0.05)] overflow-hidden z-10 p-8 md:p-10">

              {/* HTML/CSS Sweep Light Effect inside the form edge */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#0047FF]/20 to-transparent skew-x-[-45deg] group-hover:left-[200%] transition-all duration-1000 ease-out z-0 pointer-events-none"></div>



              <h2 className="relative z-10 text-center md:text-left text-3xl md:text-4xl font-heading font-bold text-white mb-8 leading-tight">
                Faça sua <span className="text-[#0047FF]">aplicação</span> <br /> agora mesmo
              </h2>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                <div>
                  <h4 className="text-[#0047FF] font-bold text-sm tracking-wider mb-2">PASSO 1</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Preencha seus dados para entendermos o momento do seu restaurante.
                  </p>
                </div>
                <div>
                  <h4 className="text-[#0047FF] font-bold text-sm tracking-wider mb-2">PASSO 2</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Entrarei em contato com você o mais breve possível.
                  </p>
                </div>
              </div>

              <form className="relative z-10 space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label className="text-sm text-slate-300 font-medium">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-[#1A1A24]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#0047FF]/60 focus:bg-[#1A1A24] focus:ring-1 focus:ring-[#0047FF]/50 transition-all shadow-inner"
                    placeholder="Seu nome completo"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-slate-300 font-medium">Telefone</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-4 flex items-center gap-2 pointer-events-none">
                      <span className="text-lg">🇧🇷</span>
                      <span className="text-slate-400 text-sm">+55</span>
                    </div>
                    <input
                      type="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className="w-full bg-[#1A1A24]/60 border border-white/10 rounded-xl pl-24 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#0047FF]/60 focus:bg-[#1A1A24] focus:ring-1 focus:ring-[#0047FF]/50 transition-all shadow-inner"
                      placeholder="(11) 99999-9999"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-slate-300 font-medium">Instagram</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-[#1A1A24]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#0047FF]/60 focus:bg-[#1A1A24] focus:ring-1 focus:ring-[#0047FF]/50 transition-all shadow-inner"
                    placeholder="seurestaurante"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-slate-300 font-medium">Faturamento Mensal</label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#1A1A24]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#0047FF]/60 focus:bg-[#1A1A24] focus:ring-1 focus:ring-[#0047FF]/50 transition-all shadow-inner appearance-none cursor-pointer"
                      required
                      value={faturamento}
                      onChange={(e) => setFaturamento(e.target.value)}
                      disabled={isSubmitting}
                    >
                      <option value="" disabled className="text-slate-500 bg-[#0F1014]">Faturamento mensal?</option>
                      <option value="1" className="bg-[#1A1A24]">Até R$ 80 mil</option>
                      <option value="2" className="bg-[#1A1A24]">De R$ 80 a 100 mil</option>
                      <option value="3" className="bg-[#1A1A24]">De R$ 100 mil a 300 mil</option>
                      <option value="4" className="bg-[#1A1A24]">Acima de R$ 300 mil</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#0047FF]">
                      <ChevronRight size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#1DA851] hover:to-[#128C7E] disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] active:scale-[0.98] group/btn overflow-hidden relative"
                >
                  {/* Sweep inside button */}
                  <span className="absolute inset-0 w-full h-full -ml-10 bg-white/20 skew-x-[-45deg] group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] z-0 pointer-events-none"></span>
                  <span className="relative z-10">{isSubmitting ? "Redirecionando..." : "Receber mais informações"}</span>
                </button>

                <p className="text-center text-xs text-slate-500 mt-4 leading-relaxed">
                  Ao enviar, você concorda em receber contato da <strong className="text-white">Pinguim Digital</strong>.
                </p>
              </form>
            </div>

            {/* Glowing orb behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0047FF]/20 to-[#FFA500]/10 rounded-full blur-[120px] opacity-40 -z-10 animate-pulse"></div>
          </motion.div>
        </div>
      </section>
      {/* MARCAS ATENDIDAS (NOVA SESSÃO) */}
      <section className="py-16 md:py-20 bg-[#0F111A] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Restaurantes que confiaram em nosso <span className="text-[#0047FF]">método</span>
          </h2>
          <p className="text-slate-400 mt-4 text-lg">
            Alguns dos parceiros que decidiram ir para o próximo nível com a gente!
          </p>
        </div>

        {/* Infinite Marquee Container */}
        <div className="w-full relative flex items-center h-28 md:h-48 my-8 md:my-12 overflow-hidden">
          {/* Subtle gradients to hide edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#0F111A] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#0F111A] to-transparent z-10 pointer-events-none"></div>

          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
            className="flex gap-12 md:gap-24 items-center whitespace-nowrap min-w-max px-6 md:px-12"
          >
            {[
              { src: "/5d826a21PIZZA_BITES_LTDA1707785910997blob.png", alt: "Burger B" },
              { src: "/62d6c695ZL62Q0AOQQ_140327566206912.jpg", alt: "Smash Burger" },
              { src: "/Jeanne Garcia.png", alt: "VK Steak & Burger" },
              { src: "/Fundo de Grupo Gege Belo Horizonte Removido.png", alt: "Gegê Delivery" },
              { src: "/Fundo de Logo 071 Burger Salvador Removido.png", alt: "071 Burger" },
              { src: "/Fundo de Logo FatGuys Salvador  png.png", alt: "Fat Guys" },
              { src: "/Logo Villa Bistro Curitiba.png", alt: "Villa Bistro" },
              { src: "/592238295_122120029046993995_5886872904706956800_n.png", alt: "Noa" },
              { src: "/Santa Feijuca.png", alt: "Santa Feijuca" },
              { src: "/logo-subway-256.png", alt: "Subway" },
              // Duplicate the list for seamless loop
              { src: "/5d826a21PIZZA_BITES_LTDA1707785910997blob.png", alt: "Burger B" },
              { src: "/62d6c695ZL62Q0AOQQ_140327566206912.jpg", alt: "Smash Burger" },
              { src: "/Jeanne Garcia.png", alt: "VK Steak & Burger" },
              { src: "/Fundo de Grupo Gege Belo Horizonte Removido.png", alt: "Gegê Delivery" },
              { src: "/Fundo de Logo 071 Burger Salvador Removido.png", alt: "071 Burger" },
              { src: "/Fundo de Logo FatGuys Salvador  png.png", alt: "Fat Guys" },
              { src: "/Logo Villa Bistro Curitiba.png", alt: "Villa Bistro" },
              { src: "/592238295_122120029046993995_5886872904706956800_n.png", alt: "Noa" },
              { src: "/Santa Feijuca.png", alt: "Santa Feijuca" },
              { src: "/logo-subway-256.png", alt: "Subway" },
              // Triplicate to ensure no empty space on ultra-wide monitors
              { src: "/5d826a21PIZZA_BITES_LTDA1707785910997blob.png", alt: "Burger B" },
              { src: "/62d6c695ZL62Q0AOQQ_140327566206912.jpg", alt: "Smash Burger" },
              { src: "/Jeanne Garcia.png", alt: "VK Steak & Burger" },
              { src: "/Fundo de Grupo Gege Belo Horizonte Removido.png", alt: "Gegê Delivery" },
              { src: "/Fundo de Logo 071 Burger Salvador Removido.png", alt: "071 Burger" },
              { src: "/Fundo de Logo FatGuys Salvador  png.png", alt: "Fat Guys" },
              { src: "/Logo Villa Bistro Curitiba.png", alt: "Villa Bistro" },
              { src: "/592238295_122120029046993995_5886872904706956800_n.png", alt: "Noa" },
              { src: "/Santa Feijuca.png", alt: "Santa Feijuca" },
              { src: "/logo-subway-256.png", alt: "Subway" },
              // Quadruplicate to make it long enough to do a full 50% loop smoothly
              { src: "/5d826a21PIZZA_BITES_LTDA1707785910997blob.png", alt: "Burger B" },
              { src: "/62d6c695ZL62Q0AOQQ_140327566206912.jpg", alt: "Smash Burger" },
              { src: "/Jeanne Garcia.png", alt: "VK Steak & Burger" },
              { src: "/Fundo de Grupo Gege Belo Horizonte Removido.png", alt: "Gegê Delivery" },
              { src: "/Fundo de Logo 071 Burger Salvador Removido.png", alt: "071 Burger" },
              { src: "/Fundo de Logo FatGuys Salvador  png.png", alt: "Fat Guys" },
              { src: "/Logo Villa Bistro Curitiba.png", alt: "Villa Bistro" },
              { src: "/NOA.png", alt: "Noa" },
              { src: "/Santa Feijuca.png", alt: "Santa Feijuca" },
              { src: "/Subway Sao Paulo.png", alt: "Subway" },
            ].map((marca, i) => (
              <div key={i} className="flex items-center justify-center transition-all duration-300 w-24 h-24 md:w-32 md:h-32 shrink-0 relative hover:scale-105 hover:-translate-y-1 group rounded-full overflow-hidden border border-white/5 shadow-lg">
                <div className="relative w-full h-full">
                  <Image src={marca.src} alt={marca.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]" unoptimized />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mt-4 px-6 md:px-0">
          <a href="#inicio" className="w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#1DA851] border border-white/10 text-white px-6 md:px-12 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-lg shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] hover:-translate-y-1 active:translate-y-0 group/btn">
            <span className="absolute inset-0 w-full h-full -ml-10 bg-white/20 skew-x-[-45deg] group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] z-0 pointer-events-none"></span>
            <span className="relative z-10 tracking-wide uppercase">QUERO CONTRATAR O PINGUIM</span>
          </a>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="py-16 md:py-24 bg-[#1A1A24] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Sua agência atual só entrega <br className="hidden md:block" />
              <span className="text-[#0047FF]">
                posts bonitos e likes?
              </span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Muitos restaurantes contratam agências genéricas e recebem posts bonitos e métricas de vaidade. Enquanto isso, os pedidos continuam baixos e o marketing <span className="relative inline-block px-2 mx-1"><span className="absolute inset-y-0 left-0 w-full bg-[#0047FF] -skew-x-12 rounded-sm z-0"></span><span className="relative z-10 text-white font-bold">não gera crescimento real.</span></span>
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connecting Line (desktop only) */}
            <div className="hidden md:block absolute top-[104px] left-[16.66%] w-[66.66%] h-[2px] border-t-2 border-dashed border-red-500/20 z-0"></div>

            <div ref={problemsCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 md:gap-8 relative z-10 pb-8 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar scroll-smooth">
              {[
                { title: "Cliques que não viram pedidos", desc: "Campanhas que geram curtidas e visualizações, mas não trazem clientes reais para o restaurante nem aumentam pedidos no delivery.", icon: Motorbike },
                { title: "Comunicação bagunçada nos canais de venda", desc: "Instagram, cardápio digital, Google e marketplaces falando coisas diferentes, confundindo o cliente e prejudicando a conversão.", icon: AlertTriangle },
                { title: "Clientes compram uma vez e nunca mais voltam", desc: "Restaurantes gastam para atrair novos clientes todos os dias, mas não coletam dados nem criam estratégias para gerar recorrência.", icon: Frown }
              ].map((err, i) => (
                <div key={i} className="group relative bg-[#13131A] rounded-[24px] p-1 overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-default flex-none w-[85vw] sm:w-[320px] md:w-auto snap-center">
                  {/* Glowing Background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-transparent to-[#FFA500]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
                  {/* Static subtle background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent"></div>

                  {/* 🌟 HTML/CSS Sweep Light Effect 🌟 */}
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-45deg] group-hover:left-[200%] transition-all duration-1000 ease-out z-20 pointer-events-none"></div>

                  {/* Card Content wrapper (Centered) */}
                  <div className="relative h-full bg-[#1A1A24]/90 backdrop-blur-xl p-8 border border-white/5 rounded-[20px] flex flex-col items-center text-center z-10 transition-colors group-hover:bg-[#1A1A24]/80 group-hover:border-red-500/30">
                    {/* Icon Container */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#13131A] to-[#1A1A24] border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(239,68,68,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] group-hover:text-red-400 transition-all duration-300 relative z-10">
                      <err.icon size={28} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-4 group-hover:text-red-400 transition-colors">{err.title}</h3>

                    <p className="text-slate-400 text-base md:text-lg leading-relaxed">{err.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile Swipe Indicator */}
            <div className="md:hidden flex items-center justify-center gap-2 mt-2 pb-6 text-slate-500 text-sm font-medium animate-pulse">
              <span>Deslize para ver mais</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* METHOD SECTION */}
      <section id="metodo" className="py-16 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="text-[#0047FF] font-bold tracking-wider uppercase text-sm mb-3 text-center md:text-left">COMO VAMOS FAZER O SEU RESTAURANTE VENDER MAIS:</div>
              <h2 className="text-center md:text-left text-3xl md:text-5xl font-heading font-bold text-white relative z-10 pt-2">
                O <span className="relative inline-block px-2">
                  <span className="relative z-10">Método Pinguim</span>
                  {/* Animated Blue Highlighter */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
                    className="absolute bottom-1 left-0 w-full h-4 bg-[#0047FF]/80 -skew-x-12 z-0 origin-left rounded-sm"
                  />
                </span>
              </h2>
              <p className="text-center md:text-left text-lg text-slate-400 mt-6 leading-relaxed">Nosso método único foi criado e testado em dezenas de restaurantes para garantir um marketing previsível que foca em aumento de faturamento.</p>
            </div>
          </div>

          <div ref={methodCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar scroll-smooth">
            {[
              { icon: MessageSquare, title: "Comunicação", desc: "Alinhamos a comunicação em Instagram, cardápio digital, Google e marketplaces para aumentar a conversão." },
              { icon: Target, title: "Posicionamento", desc: "Destacamos os diferenciais do restaurante através da engenharia de cardápio e da comunicação." },
              { icon: Rocket, title: "Vendas", desc: "Campanhas estratégicas em Meta Ads e Google Ads focadas em gerar pedidos." },
              { icon: RefreshCw, title: "Recorrência", desc: "Estratégias de dados e relacionamento para fazer o cliente voltar a comprar." }
            ].map((met, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative bg-[#13131A] rounded-[24px] p-1 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,71,255,0.25)] flex-none w-[85vw] sm:w-[320px] md:w-auto snap-center"
              >
                {/* Animated Border Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0047FF]/0 via-transparent to-[#0047FF]/0 group-hover:from-[#0047FF]/60 group-hover:via-transparent group-hover:to-[#FFA500]/40 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent z-0"></div>

                {/* 🌟 Sweep Light Effect 🌟 */}
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#0047FF]/20 to-transparent skew-x-[-45deg] group-hover:left-[200%] transition-all duration-1000 ease-out z-20 pointer-events-none"></div>

                {/* Inner Card content */}
                <div className="relative h-full bg-[#1A1A24]/95 backdrop-blur-xl p-8 rounded-[20px] flex flex-col items-center text-center z-10 border border-white/5 group-hover:border-[#0047FF]/30 transition-colors duration-500 overflow-hidden">

                  {/* Huge Background Number */}
                  <div className="absolute -bottom-4 -right-2 text-9xl font-black text-white/[0.02] group-hover:text-[#0047FF]/[0.05] group-hover:-translate-y-2 transition-all duration-500 font-heading pointer-events-none select-none">
                    0{i + 1}
                  </div>

                  <div className="w-16 h-16 bg-[#13131A] border border-white/10 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-[#0047FF]/10 group-hover:text-[#0047FF] group-hover:border-[#0047FF]/30 transition-all duration-300 shadow-lg relative z-10">
                    <met.icon strokeWidth={1.5} size={28} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[#0047FF] transition-colors relative z-10">{met.title}</h3>
                  <p className="text-slate-400 text-base leading-relaxed relative z-10">{met.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Swipe Indicator */}
          <div className="md:hidden flex items-center justify-center gap-2 mt-0 pb-6 text-slate-500 text-sm font-medium animate-pulse">
            <span>Deslize para ver mais</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mt-8 md:mt-12 mb-4 px-6 md:px-0">
          <a href="#inicio" className="w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#1DA851] border border-white/10 text-white px-6 md:px-12 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-lg shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] hover:-translate-y-1 active:translate-y-0 group/btn">
            <span className="absolute inset-0 w-full h-full -ml-10 bg-white/20 skew-x-[-45deg] group-hover/btn:animate-[sweep_1.5s_infinite_ease-in-out] z-0 pointer-events-none"></span>
            <span className="relative z-10 tracking-wide uppercase">QUERO CONTRATAR O PINGUIM</span>
          </a>
        </div>
      </section>

      {/* TESTIMONIALS / SOCIAL PROOF */}
      <section className="py-16 md:py-24 bg-[#0B0B0F] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0047FF]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#0047FF]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white max-w-3xl mx-auto leading-tight">
              O que dizem os donos de restaurantes que <span className="text-[#0047FF]">escalaram com a gente.</span>
            </h2>
          </div>

          <div ref={testimonialsCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl md:mx-auto pb-8 -mx-6 px-6 md:px-0 hide-scrollbar scroll-smooth">
            {/* Testimonial 1 */}
            <div className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#0047FF]/40 rounded-3xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(0,71,255,0.15)] hover:bg-white/[0.04] transition-all duration-300 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none rounded-3xl"></div>
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/vv4_icfb6Zo"
                  title="YouTube video player 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full z-10"
                ></iframe>
              </div>
              <a href="https://instagram.com/santafeijucasalvador" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors group/insta">
                <div className="bg-gradient-to-bl from-purple-500 via-pink-500 to-orange-500 p-1.5 rounded-full">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-sm group-hover/insta:underline">@santafeijucasalvador</span>
              </a>
            </div>

            {/* Testimonial 2 */}
            <div className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#0047FF]/40 rounded-3xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(0,71,255,0.15)] hover:bg-white/[0.04] transition-all duration-300 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none rounded-3xl"></div>
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/h0FU2JHoiwM"
                  title="YouTube video player 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full z-10"
                ></iframe>
              </div>
              <a href="https://instagram.com/dframrestaurante" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors group/insta">
                <div className="bg-gradient-to-bl from-purple-500 via-pink-500 to-orange-500 p-1.5 rounded-full">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-sm group-hover/insta:underline">@dframrestaurante</span>
              </a>
            </div>

            {/* Testimonial 3 */}
            <div className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#0047FF]/40 rounded-3xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(0,71,255,0.15)] hover:bg-white/[0.04] transition-all duration-300 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none rounded-3xl"></div>
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/6A7GexQw7cw"
                  title="YouTube video player 3"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full z-10"
                ></iframe>
              </div>
              <a href="https://instagram.com/071burger" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors group/insta">
                <div className="bg-gradient-to-bl from-purple-500 via-pink-500 to-orange-500 p-1.5 rounded-full">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-sm group-hover/insta:underline">@071burger</span>
              </a>
            </div>

            {/* Testimonial 4 */}
            <div className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#0047FF]/40 rounded-3xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(0,71,255,0.15)] hover:bg-white/[0.04] transition-all duration-300 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none rounded-3xl"></div>
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/vUODu_JjEsQ"
                  title="YouTube video player 4"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full z-10"
                ></iframe>
              </div>
              <a href="https://instagram.com/smashcaruaru" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors group/insta">
                <div className="bg-gradient-to-bl from-purple-500 via-pink-500 to-orange-500 p-1.5 rounded-full">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-sm group-hover/insta:underline">@smashcaruaru</span>
              </a>
            </div>
          </div>

          {/* Mobile Swipe Indicator */}
          <div className="flex justify-center -mt-2 mb-8 md:hidden relative z-10">
            <div className="flex items-center gap-2 text-white/60 text-xs font-semibold bg-white/5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 animate-pulse">
              <span>Arraste para ver mais vídeos</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 md:mt-16 flex justify-center max-w-md mx-auto relative z-10 px-6">
            <a href="#inicio" className="w-full bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#1DA851] hover:to-[#128C7E] text-white font-bold py-3.5 md:py-4 px-6 rounded-xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] active:scale-[0.98] group/btn overflow-hidden relative">
              <span className="relative z-10 tracking-wide uppercase">
                QUERO CONTRATAR O PINGUIM
              </span>
              {/* Sweep effect */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-45deg] group-hover/btn:left-[200%] transition-all duration-1000 ease-out z-0"></div>
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT JUNIOR PS */}
      <section id="sobre" className="py-16 md:py-24 bg-[#1A1A24] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          <div className="relative max-w-md mx-auto md:mx-0 w-full">
            {/* The Image Container */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-800 shadow-2xl border border-white/5">
              <Image src="/foto-junior.png.jpeg" alt="Junior PS" fill className="object-cover object-center" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A24] via-[#1A1A24]/10 to-transparent"></div>
            </div>

            {/* Floating Name Tag */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-white/[0.03] backdrop-blur-xl px-4 py-3 md:px-10 md:py-5 rounded-2xl flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 z-20 shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,71,255,0.15)] border border-white/10 hover:scale-105 hover:border-[#0047FF]/40 transition-all duration-300 w-[90%] max-w-[280px] md:max-w-none md:w-max text-center">
              <span className="font-heading font-bold text-base md:text-xl text-white uppercase tracking-wider">JUNIOR PS</span>
              <span className="text-[#0047FF] font-semibold text-xs md:text-sm uppercase tracking-widest drop-shadow-[0_0_8px_rgba(0,71,255,0.2)]">CEO Pinguim Digital</span>
            </div>

          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 text-center">
              Da engenharia de torres de telecomunicações ao marketing especializado para restaurantes
            </h2>
            <div className="space-y-5 text-slate-400 text-lg leading-relaxed">
              <p>Sou o <strong className="text-white">Junior PS</strong>. Minha jornada começou na área de engenharia, trabalhando com projetos de torres de telecomunicações e infraestrutura de redes.</p>
              <p>Foi nesse ambiente que desenvolvi uma visão muito forte de processos, estrutura e análise de dados.</p>
              <p>Quando migrei para o marketing, percebi que muitos restaurantes investiam em divulgação sem estratégia clara, sem dados e sem foco real em vendas.</p>
              <p>Foi dessa percepção que nasceu o <strong className="text-white">Clube do Pinguim</strong>, um grupo que conecta especialistas focados no crescimento de restaurantes.</p>
              <p>Hoje, meu trabalho vai além de subir campanhas. Atuo como parceiro estratégico para estruturar comunicação, tráfego pago e canais de venda que realmente gerem crescimento.</p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-md py-3 px-5 rounded-xl border border-white/10 shadow-lg">
                <CheckCircle2 className="text-[#0047FF]" size={20} />
                <span className="text-white text-sm font-medium">Fundador Clube do Pinguim</span>
              </div>
              <div className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-md py-3 px-5 rounded-xl border border-white/10 shadow-lg">
                <CheckCircle2 className="text-[#0047FF]" size={20} />
                <span className="text-white text-sm font-medium">Especialista em Marketing para Restaurantes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGH CONVERSION CTA PRE-FAQ */}
      <section className="py-16 md:py-24 bg-[#08080A] relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-8 leading-tight tracking-tight">
            Pronto para vender <span className="text-[#0047FF]">muito<br className="hidden md:block" /> mais?</span>
          </h2>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
            Vagas limitadas para garantir um acompanhamento exclusivo.<br className="hidden md:block" />
            Garanta a sua e descubra o que o Pinguim pode fazer pelo<br className="hidden md:block" />
            seu restaurante.
          </p>
          <div className="flex justify-center px-6 md:px-0">
            <a href="#inicio" className="w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#1DA851] border border-white/10 text-white px-6 md:px-12 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-lg shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] hover:-translate-y-1 active:translate-y-0 group/btn">
              <span className="absolute inset-0 w-full h-full -ml-10 bg-white/20 skew-x-[-45deg] group-hover/btn:animate-[sweep_1.5s_infinite_ease-in-out] z-0 pointer-events-none"></span>
              <span className="relative z-10 tracking-wide uppercase">QUERO CONTRATAR O PINGUIM</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 md:py-24 bg-[#0B0B0F] relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0047FF]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Perguntas <span className="text-[#0047FF]">Frequentes</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Tire suas dúvidas sobre como nossa assessoria de marketing atua para escalar as vendas do seu restaurante.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="group bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#0047FF]/40 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white text-lg">
                O que acontece depois que eu preencher o formulário?
                <span className="text-[#0047FF] transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown size={24} />
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/10 pt-4 mt-2 space-y-4">
                <p>Após o envio do formulário, analisamos algumas informações do seu restaurante para entender se ele se encaixa no Método Pinguim.</p>
                <p>Se fizer sentido, nossa equipe entra em contato para agendar uma reunião e os próximos passos</p>
              </div>
            </details>

            {/* FAQ Item 2 */}
            <details className="group bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#0047FF]/40 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white text-lg">
                Vocês também cuidam do meu cardápio no iFood?
                <span className="text-[#0047FF] transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown size={24} />
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/10 pt-4 mt-2 space-y-4">
                <p>Sim. Dentro do Método Pinguim analisamos e otimizamos o cardápio nos principais canais de venda, incluindo iFood, 99, cardápio digital e marketplaces.</p>
                <p>A ideia é melhorar organização, destaque dos produtos e conversão para gerar mais pedidos e aumentar o ticket médio.</p>
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details className="group bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#0047FF]/40 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white text-lg">
                Preciso ter uma equipe interna de marketing?
                <span className="text-[#0047FF] transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown size={24} />
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/10 pt-4 mt-2 space-y-4">
                <p>Não necessariamente.</p>
                <p>Porém, como um dos pilares do Método Pinguim é o posicionamento, ele está diretamente ligado à produção de conteúdo.</p>
                <p>Isso significa que, independentemente de ter um social media, uma equipe interna ou o próprio dono produzindo os conteúdos, é importante manter constância nas publicações e uma comunicação clara com o cliente ideal.</p>
                <p>Nosso papel é orientar essa comunicação para que o conteúdo também contribua para gerar vendas, e não apenas presença nas redes sociais.</p>
              </div>
            </details>

            {/* FAQ Item 4 */}
            <details className="group bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#0047FF]/40 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white text-lg">
                Vocês trabalham com contratos longos?
                <span className="text-[#0047FF] transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown size={24} />
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/10 pt-4 mt-2 space-y-4">
                <p>Nosso objetivo é construir parcerias de longo prazo, já que o marketing de um restaurante precisa de tempo para coleta de dados, ajustes de campanhas e otimização dos canais de venda.</p>
                <p>Por isso iniciamos com um contrato de 3 meses, período suficiente para analisar a operação, implementar melhorias e começar a gerar resultados.</p>
                <p>Vale lembrar que esse processo funciona melhor quando há alinhamento entre estratégia de marketing e a operação do restaurante.</p>
                <p>Após esse período inicial, avaliamos os resultados juntos e, caso faça sentido, podemos estruturar uma parceria mais longa para continuar evoluindo e colhendo os resultados.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#05050A] border-t border-white/10 pt-16 md:pt-20 pb-8 md:pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="mb-6 flex flex-col items-start gap-4">
                <Image src="/logo-pinguim.png" alt="Pinguim Marketing" width={160} height={45} className="object-contain" />
                <p className="text-slate-400 text-sm">Agência para restaurantes em Salvador - Bahia</p>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Assessoria de marketing especializada em aumentar o faturamento, lucro e a previsibilidade de vendas para restaurantes e delivery em todo o Brasil.
              </p>
            </div>

            <div className="hidden md:block">
              <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm border-b border-[#0047FF]/30 pb-2 inline-block">Navegação</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#inicio" className="hover:text-white transition-colors cursor-pointer">Início</a></li>
                <li><a href="#metodo" className="hover:text-white transition-colors cursor-pointer">Como Funciona</a></li>
                <li><a href="#sobre" className="hover:text-white transition-colors cursor-pointer">Sobre o Pinguim</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors cursor-pointer">Dúvidas Frequentes</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm border-b border-[#0047FF]/30 pb-2 inline-block">Contato</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-full bg-[#1A1A24] border border-white/5 flex items-center justify-center transition-colors group-hover:border-[#25D366]/40 shadow-sm">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="#25D366" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1 transition-transform group-hover:scale-110"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </span>
                  <a href="https://wa.me/5571996623922" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">Falar com o Especialista</a>
                </li>
                <li className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-full bg-[#1A1A24] flex items-center justify-center text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-colors">
                    <Instagram size={16} />
                  </span>
                  <a href="https://www.instagram.com/juniorps/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs text-center md:text-left">
              © {new Date().getFullYear()} Pinguim Digital. Assessoria de Marketing para Restaurantes. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-xs text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </main >
  );
}
