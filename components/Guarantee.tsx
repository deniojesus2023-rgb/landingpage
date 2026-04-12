"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

export function Guarantee() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(29,185,84,0.12),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <SectionLabel tone="gold">Garantia incondicional</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Se ele não se emocionar,{" "}
              <span className="text-gradient-gold italic">você não paga.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[auto_1fr]">
          {/* Big seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mx-auto"
          >
            <SealSvg />
          </motion.div>

          {/* Details card */}
          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-[7px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(29,185,84,0.15),transparent_60%)]" />

              <div className="relative">
                <p className="text-[15px] leading-relaxed text-white/75 sm:text-[16px]">
                  Nossa garantia é radical porque nossa confiança é radical.
                  Você recebe o vídeo, mostra pro seu filho, e só aí decide.
                </p>

                <ul className="mt-8 space-y-5">
                  {[
                    {
                      title: "7 dias para testar",
                      desc: "Você tem uma semana inteira após receber o vídeo para decidir se ficou perfeito.",
                    },
                    {
                      title: "Refazemos de graça",
                      desc: "Se algo não atingiu suas expectativas, refazemos o vídeo quantas vezes precisar, sem cobrar nada.",
                    },
                    {
                      title: "Ou reembolso total",
                      desc: "Se mesmo assim você não estiver 100% satisfeito, devolvemos o valor integral. Sem burocracia. Sem perguntas.",
                    },
                    {
                      title: "Sem pegadinha, sem letra miúda",
                      desc: "Não tem asterisco, não tem fila, não tem formulário infinito. Um e-mail e está feito.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_20px_rgba(29,185,84,0.4)]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[15px] font-bold text-white">
                          {item.title}
                        </div>
                        <div className="mt-1 text-[13px] leading-relaxed text-white/60">
                          {item.desc}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-3 rounded-[7px] border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10">
                    <Heart
                      className="h-5 w-5 text-gold-400"
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-[12px] italic text-white/60">
                    &ldquo;Ainda não precisamos devolver o dinheiro de ninguém.
                    Mas a promessa existe — e é o que nos força a entregar o
                    nosso melhor sempre.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SealSvg() {
  return (
    <div className="relative h-72 w-72 sm:h-80 sm:w-80">
      {/* Glow behind */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(245,197,24,0.35),transparent_70%)] blur-2xl" />

      {/* Rotating rim text */}
      <motion.svg
        viewBox="0 0 320 320"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path
            id="seal-curve"
            d="M 160 160 m -132 0 a 132 132 0 1 1 264 0 a 132 132 0 1 1 -264 0"
            fill="none"
          />
        </defs>
        <text
          fontSize="17"
          fontWeight="800"
          letterSpacing="6"
          fill="#F5C518"
          fontFamily="var(--font-sans), sans-serif"
        >
          <textPath href="#seal-curve">
            GARANTIA INCONDICIONAL · 7 DIAS · 100% SATISFAÇÃO · GARANTIA INCONDICIONAL · 7 DIAS · 100% SATISFAÇÃO ·
          </textPath>
        </text>
      </motion.svg>

      {/* Static inner medal */}
      <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="seal-body" cx="50%" cy="45%">
            <stop offset="0%" stopColor="#1a1f3a" />
            <stop offset="100%" stopColor="#0a0b1a" />
          </radialGradient>
          <linearGradient id="seal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD65C" />
            <stop offset="50%" stopColor="#F5C518" />
            <stop offset="100%" stopColor="#E0AE00" />
          </linearGradient>
        </defs>

        {/* Outer thin ring */}
        <circle
          cx="160"
          cy="160"
          r="108"
          fill="none"
          stroke="url(#seal-gold)"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Dashed decorative ring */}
        <circle
          cx="160"
          cy="160"
          r="102"
          fill="none"
          stroke="url(#seal-gold)"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.4"
        />

        {/* Medal body */}
        <circle
          cx="160"
          cy="160"
          r="94"
          fill="url(#seal-body)"
          stroke="url(#seal-gold)"
          strokeWidth="2.5"
        />

        {/* Inner glow ring */}
        <circle
          cx="160"
          cy="160"
          r="82"
          fill="none"
          stroke="#F5C518"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Shield icon */}
        <g transform="translate(160,118)">
          <path
            d="M 0 -14 L 22 -6 L 22 12 C 22 26 12 36 0 40 C -12 36 -22 26 -22 12 L -22 -6 Z"
            fill="url(#seal-gold)"
            opacity="0.95"
          />
          <path
            d="M -10 8 L -2 16 L 12 0"
            fill="none"
            stroke="#0a0b1a"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 100% text */}
        <text
          x="160"
          y="198"
          textAnchor="middle"
          fontSize="36"
          fontWeight="900"
          fill="#FFFFFF"
          fontFamily="var(--font-sans), sans-serif"
          letterSpacing="-1"
        >
          100%
        </text>
        <text
          x="160"
          y="222"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#F5C518"
          fontFamily="var(--font-sans), sans-serif"
          letterSpacing="3"
        >
          REEMBOLSO OU REFEITO
        </text>

        {/* Ribbons/stars */}
        <g fill="#F5C518" opacity="0.85">
          <circle cx="100" cy="160" r="2" />
          <circle cx="220" cy="160" r="2" />
          <circle cx="160" cy="100" r="2" />
          <circle cx="160" cy="238" r="2" />
        </g>
      </svg>
    </div>
  );
}
