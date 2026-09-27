import { ArrowLeft, Phone, Video, MoreVertical, CheckCheck, Smile, Paperclip, Mic, Flame } from "lucide-react";

export default function RetentionExample() {
  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-2xl border border-white/15 bg-[#0B141A]" aria-label="Conversa fictícia no WhatsApp com cupom de reativação">
        <div className="flex items-center gap-2 bg-[#202C33] px-3 py-3">
          <ArrowLeft size={17} aria-hidden="true" /><span className="p-2 rounded-full bg-orange-950"><Flame size={18} className="text-orange-300" /></span>
          <div className="flex-1"><h3 className="text-sm font-semibold">Brasa da Vila</h3><p className="text-[10px] text-slate-400">Conta comercial</p></div>
          <Video size={16} aria-hidden="true" /><Phone size={15} aria-hidden="true" /><MoreVertical size={16} aria-hidden="true" />
        </div>
        <div className="p-4 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]">
          <p className="mx-auto w-fit rounded-md bg-[#202C33] text-[10px] text-slate-300 px-3 py-1 mb-4">HOJE · CONVERSA FICTÍCIA</p>
          <div className="max-w-[95%] rounded-xl rounded-tl-none bg-[#202C33] p-3 text-[13px] leading-relaxed shadow-md">
            <p>Oi, Ana! Bateu saudade de você por aqui! 🍔</p>
            <p className="mt-3">Seu artesanal favorito está te esperando no Brasa da Vila.</p>
            <p className="mt-3">🎟️ Use <strong className="text-[#63D9A0]">SAUDADE15</strong> e ganhe <strong>15% de desconto</strong> no seu próximo pedido pelo nosso cardápio digital.</p>
            <p className="mt-3 text-[#8AC9ED]">Confira o cardápio e escolha seu favorito ↓</p>
            <p className="mt-3 text-[11px] text-slate-400">Se preferir não receber novidades, é só avisar.</p>
            <div className="flex justify-end items-center gap-1 mt-2 text-[9px] text-slate-400">18:30 <CheckCheck size={13} className="text-sky-400" /></div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 pb-3 text-slate-400" aria-hidden="true"><div className="flex flex-1 items-center gap-2 rounded-full bg-[#202C33] p-2"><Smile size={17} /><span className="flex-1 text-xs">Mensagem</span><Paperclip size={16} /></div><span className="rounded-full bg-[#00A884] p-2 text-white"><Mic size={17} /></span></div>
        <p className="text-[9px] text-slate-500 px-4 pb-3">Oferta ilustrativa para reativação de clientes.</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-[#F7F9FC] p-4 text-slate-800" aria-label="Painel ilustrativo de satisfação e recuperação de clientes">
        <div className="flex items-center justify-between gap-2 mb-4"><div><p className="text-[10px] uppercase tracking-wide text-violet-600 font-bold">Satisfação & retorno</p><h3 className="font-bold text-base mt-1">Ouvir para reconquistar</h3></div><span className="text-[9px] text-slate-400">SIMULAÇÃO</span></div>
        <div className="grid grid-cols-2 gap-2 mb-4"><div className="rounded-xl bg-white border p-3"><p className="text-[10px] text-slate-500">NPS</p><p className="text-2xl font-bold text-green-700">72</p></div><div className="rounded-xl bg-white border p-3"><p className="text-[10px] text-slate-500">Respostas</p><p className="text-2xl font-bold">100</p></div></div>
        <div className="flex h-2 rounded-full overflow-hidden" aria-hidden="true"><div className="w-[80%] bg-emerald-500" /><div className="w-[12%] bg-amber-400" /><div className="w-[8%] bg-rose-400" /></div>
        <div className="flex justify-between text-[9px] text-slate-500 mt-2"><span>80 promotores</span><span>12 neutros</span><span>8 detratores</span></div>
        <div className="mt-4 border-t pt-3 space-y-2 text-[11px]">
          <p><strong>Satisfeitos:</strong> incentivar novas compras e indicações.</p>
          <p><strong>Inativos:</strong> campanhas segmentadas de reativação.</p>
          <p><strong>Insatisfeitos:</strong> contato individual para entender e resolver o problema antes de oferecer uma nova compra.</p>
        </div>
        <p className="text-[9px] text-slate-400 mt-4">Dados fictícios. Painel conceitual de NPS, não uma captura do Fala Aí.</p>
      </section>
    </div>
  );
}
