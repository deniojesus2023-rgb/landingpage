"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const steps = [
  {
    n: "01",
    title: "Escolha o herói",
    description:
      "Mais de 20 personagens licenciados: Homem-Aranha, Batman, Elsa, Buzz, Thor, Moana e muitos outros.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M12 2l2.39 4.84L20 7.77l-4 3.9.95 5.55L12 14.77 7.05 17.22 8 11.67 4 7.77l5.61-.93L12 2z"
          fill="currentColor"
        />
      </svg>
    ),
    gradient: "from-crimson-500 to-[#ff7a40]",
  },
  {
    n: "02",
    title: "Personalize a história",
    description:
      "Nome, idade, ocasião e a mensagem que vai arrepiar. Nosso roteirista ajusta cada palavra para a criança.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          fill="currentColor"
        />
      </svg>
    ),
    gradient: "from-violet-500 to-[#5ee7ff]",
  },
  {
    n: "03",
    title: "Receba em 48h",
    description:
      "Seu vídeo chega direto no WhatsApp em HD, pronto para surpreender. Em até 24h para pedidos relâmpago.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.41 1.24 4.85L2 22l5.25-1.23A9.92 9.92 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.5 14.3c-.19.53-1.1 1.01-1.53 1.07-.39.06-.88.08-1.43-.09-.33-.1-.76-.24-1.3-.48-2.27-.98-3.75-3.27-3.86-3.42-.11-.15-.93-1.24-.93-2.37s.59-1.68.8-1.91c.21-.23.46-.29.61-.29s.31.01.44.01c.14 0 .33-.05.51.39.19.44.64 1.57.7 1.69.06.11.1.24.02.39-.08.15-.12.24-.24.37-.12.13-.25.29-.35.39-.12.12-.24.25-.1.48.14.23.64 1.05 1.37 1.7.94.83 1.74 1.09 1.98 1.22.23.13.37.11.51-.07.14-.18.58-.68.74-.92.16-.23.31-.19.53-.11.22.08 1.38.65 1.62.77.24.12.4.18.46.28.06.1.06.58-.14 1.11z"
          fill="currentColor"
        />
      </svg>
    ),
    gradient: "from-gold-400 to-gold-600",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative overflow-hidden py-28 sm:py-36">
      {/* Gradient accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <SectionLabel tone="violet">Simples assim</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
              Três passos para um momento{" "}
              <span className="text-gradient-gold italic">inesquecível</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-white/60">
              Nada de burocracia. Nada de edições intermináveis. Você preenche,
              a gente entrega, seu filho se apaixona.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-20 grid gap-6 md:grid-cols-3">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl transition-colors duration-500 hover:border-white/20">
                {/* Hover sheen */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.08),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Number */}
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg`}
                  >
                    {step.icon}
                  </div>
                  <div className="font-display text-5xl font-light text-white/10 transition group-hover:text-white/25">
                    {step.n}
                  </div>
                </div>

                <h3 className="font-display text-2xl font-medium text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                  {step.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-[12px] font-medium text-white/40 transition group-hover:text-gold-400">
                  <span>Saiba mais</span>
                  <svg
                    className="h-3 w-3 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
