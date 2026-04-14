"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  Gift,
  Lock,
  RefreshCw,
  Sparkles,
  StarIcon,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCheckoutUrl } from "@/lib/checkout";
import { HoverBorderGradient } from "./ui/HoverBorderGradient";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { ShinyButton } from "./ui/shiny-button";

type Plan = "essencial" | "duplo";

function goToCheckout(plan: PlanConfig) {
  const url = getCheckoutUrl(plan.id);
  window.open(url, "_blank");
}

type PlanBonus = {
  title: string;
  description: string;
  value: string;
};

type PlanConfig = {
  id: Plan;
  name: string;
  tagline: string;
  oldPrice: string;
  price: string;
  cents: string;
  note: string;
  features: string[];
  bonuses?: PlanBonus[];
  cta: string;
  variant: "primary" | "gold";
  featured: boolean;
};

const plans: PlanConfig[] = [
  {
    id: "essencial",
    name: "Essencial",
    tagline: "1 vídeo personalizado",
    oldPrice: "97",
    price: "47",
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
    cta: "Quero emocionar meu filho",
    variant: "primary",
    featured: false,
  },
  {
    id: "duplo",
    name: "Duplo",
    tagline: "2 vídeos pelo preço de 1",
    oldPrice: "147",
    price: "97",
    cents: "00",
    note: "pagamento único · mais pedido",
    features: [
      "2 vídeos em HD (até 60s cada)",
      "Heróis e mensagens totalmente independentes",
      "Ideal para 2 filhos ou 2 datas diferentes",
      "Roteiro premium + revisão cinematográfica",
      "Garantia total de satisfação",
      "Economia de R$ 50 vs. comprar separado",
    ],
    bonuses: [
      {
        title: "Entrega VIP em 24h",
        description:
          "Seus vídeos prontos no dia seguinte — sem fila, com prioridade máxima.",
        value: "R$ 47",
      },
      {
        title: "Pôster cinematográfico digital",
        description:
          "Cartaz personalizado estilo filme com o nome da criança, pronto pra imprimir ou usar de wallpaper.",
        value: "R$ 50",
      },
    ],
    cta: "Quero os 2 momentos mágicos",
    variant: "gold",
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
      <div className="relative overflow-hidden rounded-[7px] border border-white/15 bg-gradient-to-br from-ink-800 to-ink-900 px-5 py-3 backdrop-blur-xl">
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

export function Pricing() {
  const { h, m, s } = useCountdown(5 * 3600 + 47 * 60 + 30);

  return (
    <section
      id="pedido"
      className="relative overflow-hidden bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[800px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(30,157,241,0.15),transparent_60%)] blur-2xl" />
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
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-white/50">
            {[
              { Icon: Lock, label: "Pagamento 100% seguro" },
              { Icon: CreditCard, label: "Pix, boleto ou cartão" },
              { Icon: RefreshCw, label: "Satisfação garantida" },
              { Icon: Zap, label: "Entrega em até 48h" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span className="font-medium">{label}</span>
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
}: {
  plan: PlanConfig;
}) {
  const bonusTotal = plan.bonuses?.reduce(
    (acc, b) => acc + parseInt(b.value.replace(/\D/g, ""), 10),
    0,
  );
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[7px] border backdrop-blur-xl ${
        plan.featured
          ? "border-gold-400/40 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800"
          : "border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02]"
      }`}
    >
      {plan.featured && <BorderTrail size={120} />}

      {/* Top-right badges */}
      {plan.featured && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-[7px] border border-gold-400/40 bg-ink-950/80 px-2 py-1 text-[11px] font-semibold text-gold-400 backdrop-blur">
            <StarIcon className="h-3 w-3 fill-current" strokeWidth={2} />
            Popular
          </div>
        </div>
      )}

      {/* Section 1: Header with price */}
      <div
        className={`relative border-b border-white/10 p-8 sm:p-10 ${
          plan.featured
            ? "bg-[radial-gradient(circle_at_50%_0%,rgba(30,157,241,0.22),transparent_65%)]"
            : ""
        }`}
      >
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">
          Plano {plan.name}
        </div>
        <div className="mt-1 text-[13px] text-white/60">{plan.tagline}</div>

        <div className="mt-7">
          <div className="flex items-center gap-3">
            <span className="text-[15px] text-white/40 line-through">
              R$ {plan.oldPrice}
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              -
              {Math.round(
                ((parseInt(plan.oldPrice) - parseInt(plan.price)) /
                  parseInt(plan.oldPrice)) *
                  100,
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
          {bonusTotal ? (
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-gold-400/10 px-3 py-1 text-[11px] font-semibold text-gold-400">
              <Gift className="h-3 w-3" strokeWidth={2} />
              + R$ {bonusTotal} em bônus grátis
            </div>
          ) : null}
        </div>
      </div>

      {/* Section 2: Features */}
      <div className="relative flex-1 border-b border-white/10 p-8 sm:p-10">
        <ul className="space-y-3.5">
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

        {plan.bonuses && plan.bonuses.length > 0 && (
          <div className="mt-8 rounded-[7px] border border-gold-400/30 bg-gradient-to-br from-gold-400/[0.08] via-gold-400/[0.04] to-transparent p-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">
              <Gift className="h-3.5 w-3.5" strokeWidth={2} />
              Bônus exclusivos Duplo
            </div>
            <ul className="mt-4 space-y-4">
              {plan.bonuses.map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_0_18px_rgba(30,157,241,0.35)]">
                    <Sparkles
                      className="h-3 w-3 text-ink-950"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-[14px] font-semibold text-white">
                        {b.title}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-white/30 line-through">
                        {b.value}
                      </div>
                      <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                        Grátis
                      </div>
                    </div>
                    <div className="mt-1 text-[12px] leading-snug text-white/60">
                      {b.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Section 3: Footer with CTA */}
      <div
        className={`relative p-8 sm:p-10 ${
          plan.featured ? "bg-ink-900/50" : ""
        }`}
      >
        <HoverBorderGradient containerClassName="w-full">
          <ShinyButton
            className="flex w-full items-center justify-center gap-2 rounded-[7px] bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-600 px-8 py-4 text-[16px] font-bold text-white shadow-glow-green"
            onClick={() => goToCheckout(plan)}
          >
            {plan.cta}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </ShinyButton>
        </HoverBorderGradient>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/40">
          <Lock className="h-3 w-3" strokeWidth={1.75} />
          Pagamento único · Entrega em 48h · Se não amar, refazemos
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────── */
/*  BorderTrail — orbiting glow around featured */
/* ──────────────────────────────────────────── */

function BorderTrail({ size = 100 }: { size?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[7px]">
      <motion.div
        className="absolute aspect-square rounded-full"
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background:
            "radial-gradient(circle, rgba(79,181,247,0.9), rgba(30,157,241,0.4) 40%, transparent 70%)",
          boxShadow:
            "0 0 60px 20px rgba(30,157,241,0.35), 0 0 120px 40px rgba(30,157,241,0.2)",
          filter: "blur(8px)",
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
