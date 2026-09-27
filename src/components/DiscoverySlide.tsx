import { Search, Route, CheckCircle2, ShoppingCart, MessageCircle, RefreshCw, ArrowRight } from "lucide-react";

export default function DiscoverySlide({ type }: { type: "agreement" | "discovery" | "impact" }) {
  if (type === "impact") return (
    <section className="w-full max-w-5xl max-h-full overflow-y-auto py-6 text-center">
      <p className="text-[#5686FF] text-xs font-bold tracking-[0.25em] uppercase mb-6">O impacto no seu negócio</p>
      <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">O que acontece se<br /><span className="text-[#5686FF]">esse cenário continuar?</span></h2>
      <p className="mt-7 text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">Como isso afeta seu faturamento e os planos que você tem para o restaurante?</p>
      <div className="mt-10 md:mt-14 grid sm:grid-cols-3 gap-4 text-left">
        {[
          ["01", "No resultado", "O que fica mais difícil no dia a dia?"],
          ["02", "Nos seus planos", "O que você acaba adiando?"],
          ["03", "Na prioridade", "Qual mudança faria mais diferença agora?"],
        ].map(([number, title, question]) => <div key={number} className="p-5 border-t border-[#5686FF]/35"><span className="text-xs text-[#5686FF]">{number}</span><h3 className="text-white font-bold mt-3 mb-2">{title}</h3><p className="text-sm text-slate-400 leading-relaxed">{question}</p></div>)}
      </div>
    </section>
  );

  const agreement = type === "agreement";
  const cards = agreement ? [
    { icon: Search, title: "Entender", subtitle: "Seu restaurante primeiro.", items: ["Conhecer seu momento, seus desafios e os objetivos que você quer alcançar."] },
    { icon: Route, title: "Conectar", subtitle: "Uma solução com sentido.", items: ["Mostrar como a Pinguim pode ajudar, se houver encaixe com o que você precisa."] },
    { icon: CheckCircle2, title: "Definir", subtitle: "Clareza para o próximo passo.", items: ["Sair com clareza sobre avançar, não avançar ou o que ainda falta para decidir."] },
  ] : [
    { icon: ShoppingCart, title: "Vendas hoje", subtitle: "De onde vem o movimento", items: ["De onde vêm os pedidos?", "Quais dias precisam de mais movimento?"] },
    { icon: MessageCircle, title: "Caminho do pedido", subtitle: "Do interesse até a compra", items: ["Como funciona o cardápio próprio e o atendimento?", "Onde você percebe que perde vendas?"] },
    { icon: RefreshCw, title: "Retorno do cliente", subtitle: "O que acontece depois", items: ["Você sabe quem compra novamente?", "O que faz para recuperar quem parou de comprar?"] },
  ];

  return (
    <section className="w-full max-w-6xl max-h-full overflow-y-auto py-5">
      <div className="text-center mb-9 md:mb-12">
        <p className="text-[#5686FF] text-xs font-bold tracking-[0.25em] uppercase mb-4">{agreement ? "Nossa conversa de hoje" : "Seu ponto de partida"}</p>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">{agreement ? <>Vamos fazer um <span className="text-[#5686FF]">combinado?</span></> : <>Como está seu<br /><span className="text-[#5686FF]">restaurante hoje?</span></>}</h2>
        {agreement && <p className="text-slate-400 text-base md:text-lg mt-5">Uma conversa para entender, conectar e decidir com clareza.</p>}
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {cards.map((card, index) => <div key={card.title} className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#16223B] to-[#0D111C] p-6 md:p-7">
          <div className="flex items-center justify-between mb-7"><span className="rounded-xl border border-[#5686FF]/30 bg-[#0047FF]/10 p-3 text-[#79A0FF]"><card.icon size={23} strokeWidth={1.5} /></span><span className="text-sm text-slate-500 font-medium">0{index + 1}</span></div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{card.title}</h3>
          <p className="text-xs text-[#9DB9FF] mb-5">{card.subtitle}</p>
          <div className="space-y-4 border-t border-white/10 pt-5">{card.items.map((item) => <p key={item} className="text-sm text-slate-300 leading-relaxed">{item}</p>)}</div>
        </div>)}
      </div>
      {!agreement && <div className="mt-8 rounded-xl border border-[#5686FF]/25 bg-[#0047FF]/[0.07] px-6 py-5 flex items-center justify-center gap-3"><ArrowRight size={20} className="text-[#5686FF] shrink-0" /><p className="text-white text-base md:text-lg font-semibold">Qual desses desafios mais atrapalha seu resultado hoje?</p></div>}
    </section>
  );
}
