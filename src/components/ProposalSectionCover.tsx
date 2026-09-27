import { Search, Route, CheckCircle2, ArrowRight } from "lucide-react";

const sections = {
  "understand-cover": { index: 0, title: "Entender", subtitle: "Antes da estratégia, o seu restaurante.", description: "Vamos olhar para o seu momento, identificar os desafios e entender o que precisa mudar.", topics: ["Momento atual", "Desafios", "Impacto no negócio"], icon: Search },
  "connect-cover": { index: 1, title: "Conectar", subtitle: "Do seu desafio a um caminho possível.", description: "Conheça a Pinguim e veja como nosso método e nossas entregas se conectam ao que seu restaurante precisa.", topics: ["Quem somos", "Método e resultados", "Entregas e parceiros"], icon: Route },
  "decide-cover": { index: 2, title: "Definir", subtitle: "Clareza para dar o próximo passo.", description: "Vamos retomar suas prioridades, esclarecer o que falta e avaliar juntos se faz sentido avançar.", topics: ["Prioridades", "Dúvidas", "Próximos passos"], icon: CheckCircle2 },
};

export default function ProposalSectionCover({ type }: { type: keyof typeof sections }) {
  const section = sections[type];
  return (
    <section className="w-full max-w-6xl max-h-full overflow-y-auto py-6">
      <div className="flex items-center gap-3 md:gap-6 mb-10 md:mb-16" aria-label={`Etapa ${section.index + 1} de 3`}>
        {["Entender", "Conectar", "Definir"].map((title, index) => (
          <div key={title} className="flex items-center gap-3 md:gap-6">
            {index > 0 && <span className="h-px w-5 md:w-14 bg-white/15" />}
            <span aria-current={section.index === index ? "step" : undefined} className={`text-xs md:text-sm font-semibold ${section.index === index ? "text-[#79A0FF]" : "text-slate-500"}`}><span className="mr-2 opacity-60">0{index + 1}</span>{title}</span>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-[1fr_0.7fr] gap-10 items-center">
        <div>
          <p className="text-[#5686FF] uppercase tracking-[0.25em] text-xs font-bold mb-5">Etapa 0{section.index + 1}</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6">{section.title}<span className="text-[#0047FF]">.</span></h2>
          <p className="text-xl md:text-2xl text-[#B3C9FF] font-semibold leading-snug mb-5">{section.subtitle}</p>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl">{section.description}</p>
          <div className="flex flex-wrap gap-2 mt-8">{section.topics.map((topic) => <span key={topic} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-300"><ArrowRight size={12} className="text-[#5686FF]" />{topic}</span>)}</div>
        </div>
        <div className="hidden md:flex relative aspect-square items-center justify-center rounded-full border border-[#5686FF]/15 bg-[radial-gradient(circle,rgba(0,71,255,0.16),transparent_70%)]" aria-hidden="true">
          <div className="absolute inset-8 rounded-full border border-[#5686FF]/20" />
          <span className="absolute right-6 top-6 text-7xl font-black text-[#5686FF]/20">0{section.index + 1}</span>
          <section.icon size={110} strokeWidth={1} className="text-[#79A0FF]" />
        </div>
      </div>
    </section>
  );
}
