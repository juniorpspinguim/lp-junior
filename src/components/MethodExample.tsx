"use client";

import { useEffect, useRef } from "react";
import PositioningExample from "./PositioningExample";
import AcquisitionExample from "./AcquisitionExample";
import RetentionExample from "./RetentionExample";
import { X, ChevronLeft, MoreHorizontal, Flame, Grid3X3, Clapperboard, Contact, Link as LinkIcon, Bike, MapPin, Clock } from "lucide-react";

const examples = [
  { title: "Comunicação", color: "#60A5FA", problem: "O cliente visita o perfil, mas não entende o que a casa serve nem como fazer um pedido.", action: "Orientamos sobre a melhor forma de apresentar a bio, os destaques e as chamadas para deixar oferta, horário e canal de compra claros.", label: "Exemplo de bio", sample: "Brasa da Vila | Hamburgueria em [cidade]\nTerça a domingo, das 18h às 23h\n🎟️ brasa10 — 10% OFF no primeiro pedido\nLocalização e delivery ↓", goal: "Facilitar a passagem do interesse para o pedido." },
  { title: "Posicionamento", color: "#B69AFF", problem: "A casa quer atrair famílias, mas publica apenas descontos e não responde às avaliações.", action: "Orientamos o cliente sobre a produção de conteúdo e a importância das avaliações, de acordo com o público que deseja atrair e a experiência que quer transmitir. Neste exemplo, o foco é a experiência em família: momentos à mesa, pratos para compartilhar e um ambiente acolhedor. Também orientamos como solicitar avaliações e responder aos clientes no Google e no iFood.", label: "Exemplo de conteúdo", sample: "Seu domingo tem lugar à mesa.\nPratos para compartilhar, espaço para as crianças e tempo para estar junto.\nConheça o almoço em família do Brasa da Vila.", goal: "Conectar a imagem do restaurante ao público desejado e construir confiança." },
  { title: "Aquisição", color: "#38D3D9", problem: "Ter uma boa comida é essencial, mas não basta se as pessoas da sua região ainda não conhecem seu restaurante. Quem é mais lembrado pode conquistar o pedido antes de quem tem o melhor produto.", action: "Trabalhamos com um funil de tráfego pago para atrair novos públicos, despertar interesse e estimular pedidos. Alinhamos os anúncios às ofertas do seu cardápio digital próprio, para manter um fluxo de potenciais clientes chegando aos seus canais de venda.", label: "Exemplo de anúncio • patrocinado", sample: "Seu próximo hambúrguer favorito pode estar aqui perto.\nConheça o artesanal na brasa do Brasa da Vila.\nVeja as opções e consulte a entrega para seu endereço.\n[Ver cardápio]", goal: "Levar pessoas com potencial de compra ao cardápio ou ao restaurante." },
  { title: "Vendas", color: "#63D9A0", problem: "Curtidas e cliques, sozinhos, não pagam as contas. O marketing precisa contribuir para o que importa no seu restaurante: mais pedidos e mais faturamento.", action: "Organizamos seus canais de venda e orientamos a escolha de ofertas, ações em datas sazonais e estratégias para estimular mais pedidos e aumentar o ticket médio.", label: "Exemplo de item no cardápio", sample: "Combo Brasa da Vila\nHambúrguer de 160 g, queijo e molho da casa.\nAcompanha batata individual e refrigerante de 350 ml.\nR$ 39,90 • valor fictício\n[Adicionar ao pedido]", goal: "Estimular o volume de pedidos e aumentar o valor médio de cada compra." },
  { title: "Recorrência", color: "#F2BA68", problem: "Seu restaurante não precisa começar do zero a cada venda. Quem já comprou precisa de um motivo para voltar: uma boa experiência, uma oferta ou um novo contato. E quem não gostou precisa ser ouvido, ter seu problema tratado e ter um motivo para dar uma nova chance ao restaurante.", action: "Criamos campanhas de remarketing e sugerimos ferramentas de NPS para entender a experiência dos clientes. Quando o restaurante já conta com um CRM, também fazemos a gestão de campanhas segmentadas para estimular o retorno, com abordagens diferentes para clientes satisfeitos, inativos e insatisfeitos.", label: "Exemplo de mensagem de reativação", sample: "Oi, Ana! Faz um tempo que não nos vemos no Brasa da Vila.\nSeu artesanal favorito está te esperando!\nQuer conferir o cardápio de hoje?\nSe preferir não receber novidades, é só avisar.", goal: "Estimular uma nova compra e fortalecer o relacionamento." },
];

export default function MethodExample({ index, onClose }: { index: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const example = examples[index];

  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement as HTMLElement | null;
    element?.showModal();
    return () => {
      element?.close();
      trigger?.focus();
    };
  }, []);

  return (
    <dialog ref={dialog} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="method-example-title" className="m-auto w-[calc(100%-2rem)] max-w-4xl max-h-[85dvh] overflow-y-auto rounded-3xl border border-white/15 bg-[#101521] p-0 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm">
      <div className="p-6 md:p-9">
        <div className="flex justify-between gap-4 items-start mb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: example.color }}>Exemplo fictício • Brasa da Vila</p>
            <h2 id="method-example-title" className="text-3xl font-black">{example.title} na prática</h2>
          </div>
          <button type="button" onClick={onClose} autoFocus aria-label="Fechar exemplo" className="rounded-full p-2 bg-white/5 hover:bg-white/10 focus-visible:outline-white"><X size={22} /></button>
        </div>
        <div className="grid md:grid-cols-2 gap-7">
          <div className="space-y-6">
            <div><h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">O desafio</h3><p className="leading-relaxed text-slate-200">{example.problem}</p></div>
            <div><h3 className="text-xs uppercase tracking-wider mb-2" style={{ color: example.color }}>Como trabalhamos</h3><p className="leading-relaxed text-slate-200">{example.action}</p></div>
          </div>
          {index === 0 ? (
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#080808] text-white" aria-label="Simulação fictícia de perfil do Instagram">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <ChevronLeft size={20} aria-hidden="true" /><span className="text-sm font-semibold">brasadavila</span><MoreHorizontal size={20} aria-hidden="true" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="shrink-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px]">
                    <div className="h-16 w-16 rounded-full border-[3px] border-[#080808] bg-[#341B12] flex flex-col items-center justify-center"><Flame size={25} className="text-orange-400" /><span className="text-[8px] font-bold tracking-wider">BRASA</span></div>
                  </div>
                  <div className="flex flex-1 justify-around gap-2 text-center text-[10px] sm:text-xs">
                    {[["128", "publicações"], ["4,2 mil", "seguidores"], ["386", "seguindo"]].map(([value, label]) => <div key={label}><p className="text-sm font-bold">{value}</p><p className="mt-1">{label}</p></div>)}
                  </div>
                </div>
                <div className="text-[13px] leading-relaxed">
                  <p className="font-semibold">{example.sample.split("\n")[0]}</p>
                  <p className="whitespace-pre-line">{example.sample.split("\n").slice(1).join("\n")}</p>
                  <div className="flex items-center gap-1 text-[#B5D8F8] mt-1"><LinkIcon size={12} aria-hidden="true" /><span>Árvore de links</span></div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-center text-xs font-semibold" aria-hidden="true"><span className="rounded-lg bg-[#0095F6] py-2">Seguir</span><span className="rounded-lg bg-[#262626] py-2">Mensagem</span></div>
                <div className="flex gap-5 mt-5">
                  {[{ label: "Delivery", icon: Bike }, { label: "Localização", icon: MapPin }, { label: "Horários", icon: Clock }].map((item) => <div key={item.label} className="text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-neutral-600 bg-[#1B1B1B]"><item.icon size={18} className="text-orange-200" aria-hidden="true" /></div><p className="text-[10px] mt-2">{item.label}</p></div>)}
                </div>
              </div>
              <div className="flex justify-around border-t border-white/10 py-3 text-neutral-500" aria-hidden="true"><Grid3X3 size={18} className="text-white" /><Clapperboard size={18} /><Contact size={18} /></div>
              <p className="px-4 pb-3 text-[10px] text-neutral-500">Perfil e números fictícios • exemplo de bio</p>
            </div>
          ) : index === 1 ? <PositioningExample /> : index === 2 ? <AcquisitionExample /> : index === 4 ? <RetentionExample /> : index === 3 ? (
            <div className="rounded-2xl border border-white/10 bg-[#201B17] p-5 md:p-7">
              <div className="bg-[#FCF9F0] text-[#292723] shadow-xl p-5 font-mono text-xs rotate-[-2deg]">
                <div className="text-center border-b border-dashed border-neutral-400 pb-4">
                  <h3 className="text-lg font-bold">BRASA DA VILA</h3>
                  <p className="mt-1">COMANDA 042</p>
                  <p className="mt-2 text-[10px]">EXEMPLO FICTÍCIO</p>
                </div>
                <div className="space-y-4 py-5">
                  {[['2 Combo Brasa', 'R$ 79,80'], ['1 Batata extra', 'R$ 12,00'], ['1 Sobremesa', 'R$ 16,00']].map(([item, price]) => <div key={item} className="flex justify-between gap-3"><span>{item}</span><span className="whitespace-nowrap">{price}</span></div>)}
                </div>
                <div className="flex justify-between border-y border-dashed border-neutral-400 py-4 text-base font-bold"><span>TOTAL</span><span>R$ 107,80</span></div>
                <p className="text-center mt-5">Obrigado pela preferência!</p>
                <p className="text-center mt-2 text-[10px]">SEM VALOR FISCAL</p>
              </div>
              <p className="text-xs text-slate-400 mt-6 text-center">Combo + adicionais: exemplo de composição do pedido.</p>
            </div>
          ) : (
            <div className="rounded-2xl p-6 border" style={{ borderColor: `${example.color}40`, background: `linear-gradient(145deg, ${example.color}18, transparent)` }}>
              <p className="text-xs uppercase tracking-wider mb-5" style={{ color: example.color }}>{example.label}</p>
              <p className="whitespace-pre-line text-base leading-relaxed">{example.sample}</p>
            </div>
          )}
        </div>
        <p className="mt-7 pt-5 border-t border-white/10 text-sm text-slate-300"><strong style={{ color: example.color }}>Objetivo: </strong>{example.goal}</p>
        <p className="text-xs text-slate-500 mt-3">Situação ilustrativa. Não representa um cliente ou resultado real.</p>
      </div>
    </dialog>
  );
}
