import Image from "next/image";
import { Pin, Star, Flame, MapPin, Search, MoreHorizontal } from "lucide-react";

export default function PositioningExample() {
  return (
    <div className="space-y-4" aria-label="Simulações fictícias de Instagram, Google e iFood">
      <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#080808]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <span className="rounded-full bg-orange-950 p-2"><Flame size={16} className="text-orange-300" /></span>
          <span className="text-xs font-semibold flex-1">brasadavila</span><MoreHorizontal size={18} />
        </div>
        <p className="text-xs text-neutral-400 px-4 py-3">Instagram • 3 posts fixados</p>
        <div className="grid grid-cols-3 gap-0.5">
          {[
            { title: "Seu domingo em família", subtitle: "Tempo para estar junto", image: "familia", alt: "Família compartilhando hambúrgueres em um restaurante fictício" },
            { title: "Pertinho de você", subtitle: "Conheça nossa localização", image: "localizacao", alt: "Fachada acolhedora de uma hamburgueria fictícia" },
            { title: "A brasa vai até você", subtitle: "Peça no nosso delivery", image: "delivery", alt: "Hambúrguer e batatas em embalagem de delivery" },
          ].map((post) => (
            <div key={post.title} className="relative isolate min-h-60 flex flex-col justify-end overflow-hidden p-3">
              <Image src={`/exemplos-metodo/${post.image}.png`} alt={post.alt} fill sizes="160px" className="object-cover -z-20" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/95 via-black/15 to-transparent" />
              <Pin size={12} className="absolute right-2 top-2 text-white" aria-label="Post fixado" />
              <p className="text-[8px] uppercase tracking-wider text-orange-200 mb-2">Brasa da Vila</p>
              <h3 className="text-xs font-bold leading-snug text-[#FFF1DD]">{post.title}</h3>
              <p className="text-[9px] text-orange-100/70 mt-2">{post.subtitle}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-neutral-500 p-3">Posts ilustrativos • família, localização e delivery</p>
      </div>

      <div className="rounded-2xl bg-white text-[#202124] p-4 border border-slate-200" aria-label="Perfil fictício no Google com nota 4,9">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3"><Search size={15} className="text-[#4285F4]" /><span className="text-xs text-slate-500">Google • perfil da empresa</span><span className="ml-auto text-[9px] text-slate-400">SIMULAÇÃO</span></div>
        <h3 className="text-lg font-semibold">Brasa da Vila</h3>
        <div className="flex items-center gap-2 mt-1"><strong className="text-sm">4,9</strong><span className="flex text-[#F9AB00]" aria-label="Estrelas de avaliação">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={12} fill="currentColor" />)}</span><span className="text-xs text-slate-500">Avaliações fictícias</span></div>
        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><MapPin size={12} />Hamburgueria · [cidade]</p>
        <p className="text-xs leading-relaxed mt-3 text-slate-600">“Fomos com a família e adoramos o ambiente acolhedor e os pratos para compartilhar.”</p>
        <p className="text-[9px] text-slate-400 mt-2">Comentário ilustrativo</p>
      </div>

      <div className="rounded-2xl bg-white text-[#3E3E3E] p-4 border border-slate-200" aria-label="Restaurante fictício no iFood com nota 4,8">
        <div className="flex justify-between items-center mb-3"><span className="text-[#EA1D2C] italic text-lg font-black">iFood</span><span className="text-[9px] text-slate-400">SIMULAÇÃO</span></div>
        <div className="flex items-center gap-3"><span className="p-3 rounded-xl bg-orange-950 text-orange-200"><Flame size={24} /></span><div><h3 className="text-base font-bold">Brasa da Vila</h3><p className="text-xs text-slate-500 mt-1">Hambúrguer · Delivery</p></div></div>
        <p className="flex items-center gap-1 text-sm text-[#9B6500] font-semibold mt-3"><Star size={14} fill="currentColor" />4,8 <span className="text-xs text-slate-400 font-normal ml-2">Avaliação fictícia</span></p>
        <p className="text-xs text-slate-600 mt-2">“Nosso pedido em família chegou bem embalado. Todos gostaram!”</p>
        <p className="text-[9px] text-slate-400 mt-2">Comentário ilustrativo</p>
      </div>
    </div>
  );
}
