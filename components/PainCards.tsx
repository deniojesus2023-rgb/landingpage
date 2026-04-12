"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { ShimmerButton } from "./ui/ShimmerButton";

type Card = {
  emoji: string;
  pain: string;
  hero: string;
  solution: string;
  accent: string;
};

const cards: Card[] = [
  {
    emoji: "🛁",
    pain: "Não quer tomar banho de jeito nenhum?",
    hero: "Homem-Aranha",
    solution:
      "Ele chama seu filho pelo nome e avisa: “sem banho, sem poder de aranha.” Em 10 segundos tá no chuveiro — sem grito, sem birra.",
    accent: "#E31B23",
  },
  {
    emoji: "💉",
    pain: "Tem pavor de médico e vacina?",
    hero: "Capitão América",
    solution:
      "Explica que até herói toma injeção pra ficar forte. Você mostra o vídeo no caminho do posto. A consulta vira missão — não tortura.",
    accent: "#2F70D2",
  },
  {
    emoji: "😴",
    pain: "Medo de dormir sozinho no quarto?",
    hero: "Batman",
    solution:
      "Conta, olhando nos olhos dele, que a coragem mora no escuro. Vira rotina de cama. Vira segurança. Vira noite inteira dormida.",
    accent: "#7C5CFF",
  },
  {
    emoji: "🥦",
    pain: "Recusa comida e faz manha no prato?",
    hero: "Thor",
    solution:
      "Revela o segredo: “foi o brócolis que deu força pro Mjölnir.” Parece bobo? É. Funciona? Pergunta pras 500+ famílias que já usaram.",
    accent: "#F5C518",
  },
  {
    emoji: "🎂",
    pain: "Aniversário chegando e sem ideia que emocione?",
    hero: "Elsa",
    solution:
      "Todo mundo reunido, você dá play, e ela canta parabéns pro nome dele. O silêncio da sala. A cara dele. A foto do porta-retrato.",
    accent: "#5EE7FF",
  },
  {
    emoji: "💔",
    pain: "Pais separados, saudade, mudança de casa?",
    hero: "Moana",
    solution:
      "Diz que oceano nenhum é maior que amor de família. É o abraço que você queria dar, embalado em 90 segundos que ele reassiste sozinho.",
    accent: "#FF8A5B",
  },
];

export function PainCards() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(124,92,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <SectionLabel tone="violet">Mais que um presente</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Não é só um vídeo bonito. É uma{" "}
              <span className="text-gradient-gold italic">
                ferramenta emocional
              </span>{" "}
              no seu bolso.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-white/60">
              Pais que testaram descobriram rápido: quando a palavra dos pais
              cansou, a voz do herói resolve em 90 segundos. Use na birra, no
              medo, na saudade, no aniversário — ou só pra lembrar ele de quem
              ele é.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.pain}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              {/* Glow halo on hover */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
                style={{
                  background: `linear-gradient(135deg, ${c.accent}50, transparent 70%)`,
                }}
              />

              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 backdrop-blur-xl transition-all duration-500 group-hover:border-white/25">
                {/* Accent corner gradient */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: c.accent }}
                />

                {/* Emoji badge */}
                <div
                  className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${c.accent}30, ${c.accent}08)`,
                    border: `1px solid ${c.accent}40`,
                    boxShadow: `0 8px 32px -12px ${c.accent}60`,
                  }}
                >
                  {c.emoji}
                </div>

                {/* Pain as a "question the parent asks" */}
                <div className="relative mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                  A dor
                </div>
                <h3 className="relative mt-2 font-display text-xl font-light leading-tight text-white sm:text-2xl">
                  {c.pain}
                </h3>

                {/* Divider */}
                <div className="relative my-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                {/* Hero solution */}
                <div
                  className="relative text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: c.accent }}
                >
                  A virada · {c.hero}
                </div>
                <p className="relative mt-2 flex-1 text-[14px] leading-relaxed text-white/70">
                  {c.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing micro-copy */}
        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-center gap-6 text-center">
            <p className="max-w-2xl text-balance text-[17px] leading-relaxed text-white/70 sm:text-[19px]">
              Não vendemos um vídeo. Vendemos{" "}
              <span className="text-white">
                a cena que ele vai lembrar quando tiver 30 anos.
              </span>{" "}
              E a paz que você compra pros{" "}
              <span className="text-gold-400">próximos 6 meses de birra.</span>
            </p>
            <ShimmerButton
              as="a"
              href="#pedido"
              variant="gold"
              size="lg"
              icon={<span className="text-base">🦸</span>}
            >
              Quero resolver isso hoje
            </ShimmerButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
