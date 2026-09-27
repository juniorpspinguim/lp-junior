"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

const logos = [
  { src: "/clientes-proposta/la-vecchia-forneria.png", name: "La Vecchia Forneria" },
  { src: "/clientes-proposta/urbanus.png", name: "Urban’us Hamburgueria" },
  { src: "/clientes-proposta/artisan-burger.png", name: "Artisan Burger" },
  { src: "/clientes-proposta/da-talli.png", name: "Da Talli Padaria Artesanal" },
  { src: "/clientes-proposta/amalea.png", name: "Amaléa" },
  { src: "/clientes-proposta/jeanne-garcia.jpeg", name: "Jeanne Garcia" },
  { src: "/clientes-proposta/sabor-paulista.png", name: "Sabor Paulista" },
  { src: "/clientes-proposta/vk-steak-burger.png", name: "VK Steak & Burger" },
  { src: "/clientes-proposta/oriental-fastfood.png", name: "Oriental Fastfood" },
  { src: "/clientes-proposta/catule.png", name: "Catulé" },
  { src: "/clientes-proposta/primos-burger.png", name: "Primos Burger" },
  { src: "/clientes-proposta/paixao-burgers.png", name: "Paixão Burgers" },
  { src: "/clientes-proposta/mali-burger.png", name: "Mali Burger Beer" },
  { src: "/clientes-proposta/milmar.png", name: "Milmar" },
  { src: "/clientes-proposta/a-lasanharia.png", name: "A Lasanharia" },
  { src: "/clientes-proposta/hu-pastel.png", name: "Hu-Pastel" },

  { src: "/Santa Feijuca.png", name: "Santa Feijuca" },
  { src: "/62d6c695ZL62Q0AOQQ_140327566206912.jpg", name: "Smash Burger" },
  { src: "/5d826a21PIZZA_BITES_LTDA1707785910997blob.png", name: "Burger B" },
  { src: "/Fundo de Logo FatGuys Salvador  png.png", name: "Fat Guys" },
  { src: "/logo-subway-256.png", name: "Subway" },
  { src: "/Logo Villa Bistro Curitiba.png", name: "Villa Bistro" },
  { src: "/592238295_122120029046993995_5886872904706956800_n.png", name: "Noa Poke" },
  { src: "/Fundo de Logo 071 Burger Salvador Removido.png", name: "071 Burger" },
  { src: "/Fundo de Grupo Gege Belo Horizonte Removido.png", name: "Gegê Delivery" },
];

export default function ProposalTestimonials() {
  const [paused, setPaused] = useState(false);
  const rows = [logos.slice(0, 12), logos.slice(12)];

  return (
    <section className="w-full max-w-6xl max-h-full overflow-y-auto py-6" aria-label="Clientes da Pinguim">
      <div className="text-center mb-10 md:mb-14">
        <p className="text-[#0047FF] font-bold tracking-[0.2em] text-xs uppercase mb-4">Quem está com a gente</p>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          Restaurantes e deliveries<br />que confiam e fazem parte da história da <span className="text-[#0047FF]">Pinguim</span>
        </h2>
      </div>
      <div className="space-y-7 md:space-y-10">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="proposal-logo-marquee overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
            <div className="proposal-logo-track flex w-max" style={{ animationPlayState: paused ? "paused" : undefined, animationDirection: rowIndex === 1 ? "reverse" : "normal", animationDuration: "48s" }}>
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 gap-6 pr-6 md:gap-10 md:pr-10" aria-hidden={copy === 1 ? true : undefined}>
                  {row.map((logo) => (
                    <div key={logo.name} title={logo.name} className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-white/10 shrink-0 transition-colors hover:border-white/30">
                      <Image src={logo.src} alt={copy === 1 ? "" : logo.name} fill sizes="(min-width: 768px) 128px, 96px" className={logo.name === "Milmar" ? "object-contain scale-150" : "object-contain"} unoptimized />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-7">
        <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Retomar movimento das logos" : "Pausar movimento das logos"} aria-pressed={paused} className="flex items-center gap-2 p-2 text-xs text-slate-400 hover:text-white">
          {paused ? <Play size={14} /> : <Pause size={14} />}
          {paused ? "Retomar" : "Pausar"}
        </button>
      </div>
    </section>
  );
}
