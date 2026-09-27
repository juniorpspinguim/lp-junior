import Image from "next/image";
import { Search, ShoppingBag, ChevronDown, SlidersHorizontal, Flame } from "lucide-react";

export default function AcquisitionExample() {
  return (
    <div className="space-y-4 text-[#263238]" aria-label="Simulações fictícias de cardápio digital, Meta Ads e Google Ads">
      <section className="rounded-2xl overflow-hidden bg-white border border-slate-200">
        <div className="flex justify-between items-center px-4 py-2 bg-slate-50 border-b text-[10px] text-slate-500"><span>Cardápio digital • Brasa da Vila</span><span>SIMULAÇÃO</span></div>
        <div className="relative h-24">
          <Image src="/exemplos-metodo/delivery.png" alt="Hambúrguer do cardápio fictício" fill sizes="500px" className="object-cover object-[center_40%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/10" />
          <div className="absolute inset-0 p-4 flex flex-col justify-center text-white"><h3 className="font-bold text-lg">Brasa da Vila</h3><p className="text-xs mt-1">Hambúrguer artesanal • Delivery</p></div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between text-[10px] mb-3"><span className="text-green-700 font-semibold">Aberto · entrega em 35–50 min</span><ShoppingBag size={15} /></div>
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-2 text-xs text-slate-500"><Search size={13} />O que você quer pedir hoje?</div>
          <div className="flex gap-4 text-[11px] font-semibold my-3"><span className="text-orange-700 border-b-2 border-orange-600 pb-1">Mais pedidos</span><span>Hambúrgueres</span><span>Combos</span></div>
          <div className="flex gap-3 border border-slate-200 rounded-xl p-3">
            <div className="flex-1"><h4 className="text-sm font-bold">Combo Brasa</h4><p className="text-[11px] text-slate-500 my-1">Artesanal de 160 g, queijo, batata e bebida.</p><p className="text-sm font-bold">R$ 39,90</p></div>
            <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden"><Image src="/exemplos-metodo/delivery.png" alt="Combo ilustrativo de hambúrguer e batatas" fill sizes="80px" className="object-cover" /></div>
          </div>
          <p className="text-[9px] text-slate-400 mt-3">Cardápio, preço e prazo ilustrativos.</p>
        </div>
      </section>

      <section className="rounded-2xl overflow-hidden bg-white border border-slate-200" aria-label="Simulação do Gerenciador de Anúncios da Meta">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-50"><div><span className="text-blue-600 font-bold text-sm">Meta</span><h3 className="text-xs font-semibold mt-1">Gerenciador de Anúncios</h3></div><span className="text-[9px] text-slate-400">SIMULAÇÃO</span></div>
        <div className="px-3 py-2 flex justify-between items-center text-[10px]"><span className="font-semibold">Brasa da Vila <ChevronDown size={10} className="inline" /></span><span className="text-slate-500">Campanhas</span></div>
        <div className="px-3 pb-3">
          <div className="flex gap-2 mb-3 text-[10px]"><span className="bg-green-700 text-white rounded px-2 py-1">+ Criar</span><span className="border rounded px-2 py-1 flex gap-1 items-center"><SlidersHorizontal size={11} />Filtros</span></div>
          <table className="w-full text-left text-[10px]"><thead className="bg-slate-100 text-slate-500"><tr><th className="p-2">Campanha</th><th className="p-2">Veiculação</th><th className="p-2">Foco</th></tr></thead><tbody>
            {[['Aquisição', 'Novos públicos'], ['Aquecimento', 'Engajamento'], ['Vendas', 'Pedidos']].map(([name, focus]) => <tr key={name} className="border-b border-slate-100"><td className="py-3 px-2 text-blue-700 font-semibold">{name}</td><td className="p-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600 mr-1" />Ativa</td><td className="p-2">{focus}</td></tr>)}
          </tbody></table>
          <p className="text-[9px] text-slate-400 mt-2">Estrutura ilustrativa, sem dados de campanhas reais.</p>
        </div>
      </section>

      <section className="rounded-2xl overflow-hidden bg-white border border-slate-200" aria-label="Simulação de campanha de pesquisa no Google Ads">
        <div className="flex items-center justify-between px-4 py-3 border-b"><h3 className="text-sm font-semibold"><span className="text-[#4285F4]">Google</span> Ads</h3><span className="text-[9px] text-slate-400">SIMULAÇÃO</span></div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs font-semibold"><Search size={15} className="text-blue-600" />Pesquisa | Hamburgueria local</div>
          <p className="text-[10px] text-slate-500 mt-2">Rede de pesquisa · <span className="text-green-700">Ativa</span></p>
          <p className="text-[10px] uppercase tracking-wide text-slate-500 mt-4 mb-2">Palavra-chave</p>
          <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 py-2 text-xs text-blue-800">“hamburgueria próximo de mim”</div>
          <div className="mt-3 border rounded-xl p-3"><p className="text-[9px] font-semibold mb-2">Patrocinado · prévia ilustrativa</p><p className="text-[10px] flex gap-1 items-center"><Flame size={12} />Brasa da Vila</p><p className="text-sm text-[#1A0DAB] mt-1">Hambúrguer artesanal perto de você</p><p className="text-[11px] text-slate-600 mt-1">Conheça o Brasa da Vila. Consulte nossa localização ou peça no cardápio digital.</p></div>
        </div>
      </section>
    </div>
  );
}
