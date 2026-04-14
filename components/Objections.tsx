"use client";

import {
  ShieldCheck,
  Sparkles,
  Zap,
  Heart,
  Star,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

type Objection = {
  Icon: LucideIcon;
  fear: string;
  reality: string;
  accent: string;
};

const objections: Objection[] = [
  {
    Icon: ShieldCheck,
    fear: "E se ficar ruim e meu filho não gostar?",
    reality:
      "Por isso existe a garantia de refações ilimitadas + 14 dias pra testar. Você só paga se amar. A gente reescreve, regrava, reedita até ficar perfeito. Mais de 500 vídeos entregues — nenhum reembolso pedido até hoje.",
    accent: "#1DB954",
  },
  {
    Icon: Sparkles,
    fear: "Meu filho é pequeno, ele vai acreditar mesmo que é o herói de verdade?",
    reality:
      "A reação das crianças surpreende até os pais mais céticos. O vídeo tem direção cinematográfica, efeitos sonoros profissionais e o herói chama pelo nome. Na dúvida, assiste o vídeo real da gravação do Pedro lá em cima 👆",
    accent: "#7C5CFF",
  },
  {
    Icon: Zap,
    fear: "Vai demorar muito? Eu preciso pra uma data específica.",
    reality:
      "Entrega garantida em 48h úteis no Essencial e 24h no Duplo (com o bônus VIP). Se precisar pra hoje ou amanhã, manda um WhatsApp que a gente vê o que dá pra fazer.",
    accent: "#1E9DF1",
  },
  {
    Icon: Heart,
    fear: "R$ 97 não é caro pra um vídeo de 60 segundos?",
    reality:
      "Você está pagando pela memória de uma vida inteira, não pelos 60 segundos. Roteirista, direção, voz profissional do herói, edição cinematográfica, trilha original. Um buquê de flores dura uma semana — esse vídeo ele mostra pros netos.",
    accent: "#E31B4D",
  },
  {
    Icon: Star,
    fear: "Não sei se vale a pena, como sei que funciona mesmo?",
    reality:
      "+500 pais já passaram pela mesma dúvida. Olha os vídeos reais de reação dos clientes na seção lá em cima, e os depoimentos logo abaixo. Se mesmo assim não der certo pra você, devolvemos 100% do valor, sem perguntas.",
    accent: "#FFB43A",
  },
];

export function Objections() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(227,27,77,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <div className="text-center">
          <SectionLabel tone="violet">Ainda na dúvida?</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Deixa a gente quebrar suas{" "}
              <span className="text-gradient-gold italic">
                últimas objeções
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-white/60">
              Sabemos que é um presente diferente. Antes de decidir, leia isso:
            </p>
          </Reveal>
        </div>

        {/* Grid of objection cards */}
        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {objections.map((o, i) => {
            const isLast = i === objections.length - 1;
            return (
              <Reveal
                key={o.fear}
                delay={0.1 * i}
                className={
                  isLast
                    ? "md:col-span-2 md:mx-auto md:w-full md:max-w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:max-w-none"
                    : ""
                }
              >
                <div className="group relative h-full">
                  {/* Hover halo */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-[7px] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${o.accent}40, transparent 70%)`,
                    }}
                  />

                  <div className="relative flex h-full flex-col overflow-hidden rounded-[7px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-7 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20">
                    {/* Corner icon */}
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl"
                      style={{ background: o.accent }}
                    />
                    <div
                      className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${o.accent}35, ${o.accent}08)`,
                        border: `1px solid ${o.accent}50`,
                        boxShadow: `0 8px 24px -10px ${o.accent}70`,
                      }}
                    >
                      <o.Icon
                        className="h-5 w-5"
                        strokeWidth={1.75}
                        style={{ color: o.accent }}
                      />
                    </div>

                    {/* Q label */}
                    <div className="relative inline-flex w-fit items-center rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                      Medo
                    </div>

                    {/* Fear quote */}
                    <p className="relative mt-4 max-w-[85%] font-display text-lg italic leading-snug text-white/50 sm:text-xl">
                      &ldquo;{o.fear}&rdquo;
                    </p>

                    {/* Divider */}
                    <div className="relative my-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                    {/* R label */}
                    <div className="relative inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
                      Realidade
                    </div>

                    {/* Answer */}
                    <p className="relative mt-4 flex-1 text-[14px] leading-relaxed text-white/80">
                      {o.reality}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Final CTA row */}
        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
            <p className="text-[15px] text-white/70 sm:text-[16px]">
              Ainda tá inseguro? A gente te ajuda.
            </p>
            <a
              href="https://wa.me/5511999999999?text=Oi!%20Tenho%20uma%20d%C3%BAvida%20antes%20de%20pedir%20o%20v%C3%ADdeo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-gold-400 underline decoration-gold-400/40 underline-offset-4 transition-colors hover:text-gold-300 hover:decoration-gold-300 sm:text-[16px]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              Fala com a gente direto no WhatsApp →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
