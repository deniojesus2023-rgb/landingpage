"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { ShimmerButton } from "./ui/ShimmerButton";

type Plan = "essencial" | "duplo";

const plans = [
  {
    id: "essencial" as const,
    name: "Essencial",
    tagline: "1 vídeo personalizado",
    oldPrice: "147",
    price: "97",
    cents: "00",
    note: "pagamento único",
    features: [
      "1 vídeo em HD (até 60 segundos)",
      "O herói chama a criança pelo nome",
      "Mensagem personalizada pelo roteirista",
      "Entrega via WhatsApp em até 48h",
      "Acesso a +20 personagens",
      "Garantia total de satisfação",
    ],
    cta: "Quero o vídeo",
    variant: "primary" as const,
    featured: false,
  },
  {
    id: "duplo" as const,
    name: "Duplo",
    tagline: "2 vídeos + economia de R$ 47",
    oldPrice: "220",
    price: "147",
    cents: "00",
    note: "pagamento único · mais pedido",
    features: [
      "2 vídeos em HD (até 60s cada)",
      "Heróis e mensagens totalmente independentes",
      "Ideal para 2 filhos ou 2 datas diferentes",
      "Entrega via WhatsApp em até 48h",
      "Roteiro premium + revisão cinematográfica",
      "Garantia total de satisfação",
      "Economia de R$ 47 vs. 2× Essencial",
    ],
    cta: "Quero os 2 vídeos",
    variant: "gold" as const,
    featured: true,
  },
];

function useCountdown(initial: number) {
  const [seconds, setSeconds] = useState(initial);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return { h, m, s };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="relative flex min-w-[72px] flex-col items-center">
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-ink-800 to-ink-900 px-5 py-3 backdrop-blur-xl">
        <div className="font-display text-4xl font-light tabular-nums text-gradient-gold">
          {String(value).padStart(2, "0")}
        </div>
      </div>
      <div className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
        {label}
      </div>
    </div>
  );
}

export function Pricing({ onSelect }: { onSelect: (plan: Plan) => void }) {
  const { h, m, s } = useCountdown(5 * 3600 + 47 * 60 + 30);

  return (
    <section
      id="pedido"
      className="relative overflow-hidden bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[800px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,197,24,0.15),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <SectionLabel tone="gold">Escolha seu plano</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Garanta o momento <span className="text-gradient-gold italic">agora mesmo</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-white/60">
              Pagamento único, sem mensalidade. Garantia total: se não amar, a gente
              refaz ou devolve 100%.
            </p>
          </Reveal>

          {/* Countdown */}
          <Reveal delay={0.3}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-crimson-500/30 bg-crimson-500/5 px-4 py-2 text-[12px] font-semibold text-crimson-500 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson-500" />
              Preço promocional termina em
            </div>
            <div className="mt-6 flex items-end justify-center gap-3">
              <Digit value={h} label="horas" />
              <span className="pb-10 font-display text-3xl text-white/30">:</span>
              <Digit value={m} label="minutos" />
              <span className="pb-10 font-display text-3xl text-white/30">:</span>
              <Digit value={s} label="segundos" />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative ${plan.featured ? "md:-mt-4" : ""}`}
            >
              {plan.featured && (
                <div className="glow-border rounded-[28px]">
                  <PlanCard plan={plan} onSelect={onSelect} />
                </div>
              )}
              {!plan.featured && <PlanCard plan={plan} onSelect={onSelect} />}
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-white/50">
            {[
              ["🔒", "Pagamento 100% seguro"],
              ["💳", "Pix, boleto ou cartão"],
              ["↩️", "Satisfação garantida"],
              ["⚡", "Entrega em até 48h"],
            ].map(([i, l]) => (
              <div key={l} className="flex items-center gap-2">
                <span>{i}</span>
                <span className="font-medium">{l}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  onSelect,
}: {
  plan: (typeof plans)[number];
  onSelect: (p: Plan) => void;
}) {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-[28px] border p-8 backdrop-blur-xl sm:p-10 ${
        plan.featured
          ? "border-gold-400/40 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800"
          : "border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02]"
      }`}
    >
      {plan.featured && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,24,0.25),transparent_60%)]" />
          <div className="absolute -top-px left-1/2 -translate-x-1/2">
            <div className="relative -translate-y-1/2 rounded-full border border-gold-400/40 bg-gradient-to-br from-gold-400 to-gold-600 px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-950 shadow-[0_8px_32px_rgba(245,197,24,0.5)]">
              🔥 Mais escolhido
            </div>
          </div>
        </>
      )}

      <div className="relative">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">
              Plano {plan.name}
            </div>
            <div className="mt-1 text-[13px] text-white/60">{plan.tagline}</div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3">
            <span className="text-[15px] text-white/40 line-through">
              R$ {plan.oldPrice}
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              -{Math.round(
                ((parseInt(plan.oldPrice) - parseInt(plan.price)) /
                  parseInt(plan.oldPrice)) *
                  100
              )}
              %
            </span>
          </div>
          <div className="mt-1 flex items-start gap-1">
            <span className="mt-4 font-display text-2xl font-light text-white/70">
              R$
            </span>
            <span className="font-display text-7xl font-light leading-none text-white">
              {plan.price}
            </span>
            <span className="mt-3 font-display text-xl text-white/50">
              ,{plan.cents}
            </span>
          </div>
          <div className="mt-2 text-[12px] text-white/50">{plan.note}</div>
        </div>

        <ul className="mt-8 space-y-3.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[14px]">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600">
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="h-3 w-3 text-white"
                >
                  <path
                    d="M2 6l3 3 5-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-white/80">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <ShimmerButton
            variant={plan.variant}
            size="xl"
            className="w-full"
            onClick={() => onSelect(plan.id)}
            icon={<span className="text-lg">🦸</span>}
          >
            {plan.cta}
          </ShimmerButton>
          <p className="mt-4 text-center text-[11px] text-white/40">
            🔒 Checkout seguro · Garantia incondicional
          </p>
        </div>
      </div>
    </div>
  );
}
