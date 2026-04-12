"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const faqs = [
  {
    q: "Como funciona a personalização na prática?",
    a: "Depois de escolher o plano, um formulário curto (2 minutos) pergunta o nome da criança, o herói escolhido, a ocasião e a mensagem especial. Nosso roteirista refina o texto e em até 48 horas o vídeo chega pronto no seu WhatsApp, em HD.",
  },
  {
    q: "Em quanto tempo recebo o vídeo?",
    a: "Prazo máximo de 48 horas úteis — mas na maioria dos pedidos entregamos em menos de 24h. Precisa para hoje? Temos opção relâmpago, fale com a gente.",
  },
  {
    q: "Funciona para datas específicas como aniversário?",
    a: "Sim, e é o uso mais comum. Basta informar a data no formulário. Para garantir a entrega exatamente no dia, recomendamos pedir com 3 dias de antecedência.",
  },
  {
    q: "O personagem realmente chama a criança pelo nome?",
    a: "Sim, de forma natural, como se a mensagem tivesse sido gravada exclusivamente para ela. Usamos tecnologia de personalização que ajusta voz, entonação e sincronia para cada pedido.",
  },
  {
    q: "E se eu não gostar do resultado?",
    a: "Garantia incondicional. Se o vídeo não atender suas expectativas, refazemos gratuitamente ou devolvemos 100% do valor. Sem burocracia, sem perguntas.",
  },
  {
    q: "No Plano Duplo posso pedir para crianças diferentes?",
    a: "Sim, totalmente. Cada vídeo é independente: heróis diferentes, nomes diferentes, ocasiões diferentes. Perfeito para famílias com dois filhos ou para presentear em datas próximas.",
  },
  {
    q: "Quais formas de pagamento aceitam?",
    a: "Pix (aprovação instantânea), cartão de crédito em até 12x e boleto bancário. O checkout é 100% seguro.",
  },
  {
    q: "O vídeo vem com marca d'água?",
    a: "Não. O vídeo é 100% limpo, em HD, pronto para compartilhar, postar ou guardar de lembrança para sempre.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <SectionLabel tone="cyan">Tire suas dúvidas</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-2xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Perguntas <span className="text-gradient-gold italic">frequentes</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 space-y-3">
          {faqs.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="group relative w-full overflow-hidden rounded-[7px] border border-white/10 bg-white/[0.03] p-5 text-left backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[15px] font-semibold text-white">
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pr-10 pt-4 text-[14px] leading-relaxed text-white/60">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
