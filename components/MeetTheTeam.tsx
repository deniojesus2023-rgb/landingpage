"use client";

import { motion } from "framer-motion";
import {
  Clapperboard,
  Film,
  Headphones,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const team: {
  name: string;
  role: string;
  Icon: LucideIcon;
  color: string;
}[] = [
  {
    name: "Diretor criativo",
    role: "Ex-animador de estúdio",
    Icon: Clapperboard,
    color: "#FF3B47",
  },
  {
    name: "Editor de vídeo",
    role: "10+ anos em pós-produção",
    Icon: Film,
    color: "#7C5CFF",
  },
  {
    name: "Sound designer",
    role: "Mixagem e dublagem",
    Icon: Headphones,
    color: "#5EE7FF",
  },
  {
    name: "Atendimento",
    role: "Suporte humano no WhatsApp",
    Icon: MessageSquare,
    color: "#1DB954",
  },
];

export function MeetTheTeam() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-[800px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <SectionLabel tone="cyan">Quem faz a mágica</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Cada vídeo passa por um{" "}
              <span className="text-gradient-gold italic">
                roteirista de verdade.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-white/60">
              Aqui não tem IA solta escrevendo texto genérico. Cada mensagem é
              revisada por gente de carne e osso que trabalha há anos com
              conteúdo infantil e sabe exatamente o que emociona uma criança.
            </p>
          </Reveal>
        </div>

        {/* Featured writer card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="absolute -inset-4 rounded-[7px] bg-gradient-to-br from-gold-500/20 via-violet-500/15 to-crimson-500/20 opacity-60 blur-2xl" />

          <div className="relative overflow-hidden rounded-[7px] border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 backdrop-blur-xl">
            <div className="grid gap-0 md:grid-cols-[auto_1fr]">
              {/* Portrait */}
              <div className="relative aspect-square w-full overflow-hidden md:w-72">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 40%, #1E9DF1 0%, #7C5CFF 50%, #0a0b1a 100%)",
                  }}
                />
                <div className="grain" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-9xl font-light text-white/20">
                    GR
                  </div>
                </div>
                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Online
                </div>
              </div>

              {/* Info */}
              <div className="relative p-8 sm:p-10">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">
                  Roteirista chefe
                </div>
                <h3 className="mt-2 font-display text-3xl font-light leading-tight text-white sm:text-4xl">
                  Gabriel Rocha
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-white/70">
                  Ex-redator de desenhos animados infantis, pai de dois, e o
                  cara que transforma um formulário de 5 campos numa cena que
                  arranca lágrima até de tio folgado. Revisa pessoalmente cada
                  vídeo antes de virar produção.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { num: "500+", label: "Roteiros" },
                    { num: "12", label: "Anos no ramo" },
                    { num: "4.9★", label: "Avaliação" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-[7px] border border-white/10 bg-white/[0.03] p-3 text-center sm:p-4"
                    >
                      <div className="font-display text-2xl font-light text-gradient-gold sm:text-3xl">
                        {s.num}
                      </div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {["Disney", "Cartoon Network", "Gloob", "Discovery Kids"].map(
                    (logo) => (
                      <span
                        key={logo}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-wide text-white/60"
                      >
                        ex · {logo}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting team grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[7px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${m.color}20, transparent 70%)`,
                  }}
                />
                <div className="relative">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[7px]"
                    style={{
                      background: `linear-gradient(135deg, ${m.color}30, ${m.color}10)`,
                      border: `1px solid ${m.color}40`,
                    }}
                  >
                    <m.Icon
                      className="h-5 w-5"
                      strokeWidth={1.75}
                      style={{ color: m.color }}
                    />
                  </div>
                  <div className="mt-4 text-[13px] font-bold text-white">
                    {m.name}
                  </div>
                  <div className="mt-1 text-[11px] text-white/50">{m.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
