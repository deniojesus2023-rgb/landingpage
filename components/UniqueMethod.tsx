"use client";
import { motion } from "framer-motion";
import { Cpu, Mic2, Sparkles, Video } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const steps = [
  {
    icon: Mic2,
    title: "Síntese de Voz com IA",
    description:
      "Nossa tecnologia de síntese vocal clona a voz original do personagem com precisão fonética. O herói não apenas fala o nome da criança — ele articula cada sílaba com a entonação e emoção corretas, como se estivesse realmente ali.",
    badge: "Voz 100% natural",
    color: "from-violet-500/30 to-violet-500/5",
    border: "border-violet-500/30",
    badgeColor: "text-violet-400 border-violet-400/30 bg-violet-400/10",
  },
  {
    icon: Video,
    title: "Renderização Cinematográfica",
    description:
      "Cada vídeo é masterizado com color grading profissional, trilha sonora original e efeitos visuais que replicam a estética dos filmes e séries originais. O resultado parece uma cena real, não uma montagem amadora.",
    badge: "Qualidade de estúdio",
    color: "from-gold-400/20 to-gold-400/5",
    border: "border-gold-400/30",
    badgeColor: "text-gold-400 border-gold-400/30 bg-gold-400/10",
  },
  {
    icon: Cpu,
    title: "Roteiro Personalizado por Especialistas",
    description:
      "Cada roteiro é escrito por um roteirista humano especializado em narrativa infantil, usando as informações que você fornece: nome, idade, conquista ou mensagem especial. Nenhum vídeo é igual ao outro.",
    badge: "Feito à mão",
    color: "from-emerald-400/20 to-emerald-400/5",
    border: "border-emerald-400/30",
    badgeColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  },
  {
    icon: Sparkles,
    title: "Revisão de Qualidade em 3 Etapas",
    description:
      "Antes de chegar até você, cada vídeo passa por três revisões: técnica (áudio e vídeo), narrativa (coerência e emoção) e final (experiência da criança). Só aprovamos o que realmente emociona.",
    badge: "Aprovação tripla",
    color: "from-crimson-500/20 to-crimson-500/5",
    border: "border-crimson-500/30",
    badgeColor: "text-crimson-500 border-crimson-500/30 bg-crimson-500/10",
  },
];

export function UniqueMethod() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900/60 to-ink-950" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(124,92,255,0.12),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <div className="text-center">
          <SectionLabel tone="violet">Por que é diferente</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Não é uma montagem.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #a78bfa 0%, #7C5CFF 50%, #5EE7FF 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
                className="italic"
              >
                É tecnologia cinematográfica.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/60">
              Qualquer pessoa consegue colar o nome de uma criança num vídeo genérico. O que fazemos é diferente: combinamos síntese de voz com IA, roteiro humano e masterização cinematográfica para criar um momento que parece{" "}
              <strong className="font-semibold text-white">real</strong>.
            </p>
          </Reveal>
        </div>

        {/* Comparison Banner */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 backdrop-blur-xl">
            <div className="grid grid-cols-2">
              {/* Coluna: Outros */}
              <div className="border-r border-white/10 p-6 sm:p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-crimson-500/30 bg-crimson-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-crimson-500">
                  ✕ Outros serviços
                </div>
                <ul className="space-y-3 text-[13px] text-white/50">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-crimson-500">✕</span>
                    Voz robótica ou dublada
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-crimson-500">✕</span>
                    Template genérico para todos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-crimson-500">✕</span>
                    Qualidade de vídeo amadora
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-crimson-500">✕</span>
                    Sem revisão de qualidade
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-crimson-500">✕</span>
                    Criança percebe que é falso
                  </li>
                </ul>
              </div>
              {/* Coluna: HeroiVídeo */}
              <div className="p-6 sm:p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                  ✓ HeroiVídeo
                </div>
                <ul className="space-y-3 text-[13px] text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    Voz original com IA fonética
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    Roteiro único para cada criança
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    Masterização cinematográfica
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    Revisão tripla antes da entrega
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    Reação genuína e emocionante
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Steps */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={0.1 * i}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative overflow-hidden rounded-2xl border ${step.border} bg-gradient-to-br ${step.color} p-6 backdrop-blur-xl sm:p-8`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${step.border} bg-ink-900/60`}
                  >
                    <step.icon className="h-5 w-5 text-white/80" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[15px] font-semibold text-white">
                        {step.title}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${step.badgeColor}`}
                      >
                        {step.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
