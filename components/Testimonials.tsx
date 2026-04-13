"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const reviews = [
  {
    name: "Mariana Silva",
    meta: "Mãe do Lucas, 5 anos",
    initials: "MS",
    color: "#7C5CFF",
    rating: 5,
    text: "O Batman falou o nome do meu filho e ele ficou pulando pela sala! Nunca vi uma reação assim. Já pedi de novo para o aniversário dele.",
    highlight: "Nunca vi uma reação assim",
  },
  {
    name: "Carlos Ferreira",
    meta: "Pai da Júlia, 4 anos",
    initials: "CF",
    color: "#FF3B47",
    rating: 5,
    text: "Minha filha assistiu 10 vezes seguidas. A Elsa falou exatamente o que eu pedi. Melhor presente que já dei na vida — e olha que eu tento sempre surpreender.",
    highlight: "Melhor presente que já dei na vida",
  },
  {
    name: "Ana Teixeira",
    meta: "Mãe do Pedro, 3 anos",
    initials: "AT",
    color: "#1E9DF1",
    rating: 5,
    text: "Meu filho tinha medo de dormir. O Homem-Aranha mandou uma mensagem pra ele e desde então vai pra cama sem choro. Mudou nossa rotina inteira. Incrível!",
    highlight: "Mudou nossa rotina inteira",
  },
  {
    name: "Rafael Moraes",
    meta: "Pai do Heitor, 6 anos",
    initials: "RM",
    color: "#5EE7FF",
    rating: 5,
    text: "Pedi o Homem de Ferro para o aniversário de 6 anos. Foi a cereja do bolo. Meus parentes ainda falam da cara dele até hoje. Valeu cada centavo.",
    highlight: "Valeu cada centavo",
  },
];

function Counter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute right-0 bottom-1/3 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <SectionLabel tone="violet">Histórias reais</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Mães e pais que viram seus filhos{" "}
              <span className="text-gradient-gold italic">se apaixonarem</span>.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-[7px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
                {/* Glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${r.color}30, transparent 60%)`,
                  }}
                />

                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <svg
                      key={idx}
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-gold-400"
                      fill="currentColor"
                    >
                      <path d="M12 2l2.39 4.84L20 7.77l-4 3.9.95 5.55L12 14.77 7.05 17.22 8 11.67 4 7.77l5.61-.93L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="relative flex-1 text-[14px] leading-relaxed text-white/80">
                  &ldquo;{r.text}&rdquo;
                </p>

                <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-gold-400/80">
                  « {r.highlight} »
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${r.color}, ${r.color}80)`,
                    }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white">
                      {r.name}
                    </div>
                    <div className="text-[11px] text-white/50">{r.meta}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 overflow-hidden rounded-[7px] border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-10 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(30,157,241,0.12),transparent_60%),radial-gradient(circle_at_80%_50%,rgba(124,92,255,0.12),transparent_60%)]" />
          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: 500, suffix: "+", label: "Vídeos entregues" },
              { value: 49, suffix: "★", label: "Avaliação (de 50)" },
              { value: 48, suffix: "h", label: "Prazo máximo" },
              { value: 100, suffix: "%", label: "Satisfação ou reembolso" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-5xl font-light text-gradient-gold md:text-6xl">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
