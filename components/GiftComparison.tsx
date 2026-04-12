"use client";

import { motion } from "framer-motion";
import {
  Check,
  Gift,
  PartyPopper,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { ShimmerButton } from "./ui/ShimmerButton";

type Row = {
  label: string;
  toy: { value: string; good: boolean };
  party: { value: string; good: boolean };
  hero: { value: string; good: boolean };
};

const rows: Row[] = [
  {
    label: "Preço médio",
    toy: { value: "R$ 200–400", good: false },
    party: { value: "R$ 1.500+", good: false },
    hero: { value: "A partir de R$ 97", good: true },
  },
  {
    label: "Tempo de preparo",
    toy: { value: "1 ida ao shopping", good: true },
    party: { value: "Semanas de logística", good: false },
    hero: { value: "2 minutos no celular", good: true },
  },
  {
    label: "Personalização",
    toy: { value: "Nenhuma", good: false },
    party: { value: "Tema padrão", good: false },
    hero: { value: "Nome, idade, mensagem", good: true },
  },
  {
    label: "Reação da criança",
    toy: { value: "Sorriso de 5 min", good: false },
    party: { value: "Caos e cansaço", good: false },
    hero: { value: "Lágrimas e abraços", good: true },
  },
  {
    label: "Duração",
    toy: { value: "2 semanas", good: false },
    party: { value: "1 tarde", good: false },
    hero: { value: "Para sempre", good: true },
  },
  {
    label: "Compartilhável",
    toy: { value: "Não", good: false },
    party: { value: "Só quem estava lá", good: false },
    hero: { value: "Manda pra família inteira", good: true },
  },
  {
    label: "Pode reassistir",
    toy: { value: "—", good: false },
    party: { value: "Só nas fotos", good: false },
    hero: { value: "Quantas vezes quiser", good: true },
  },
  {
    label: "Memória emocional",
    toy: { value: "Baixa", good: false },
    party: { value: "Média", good: false },
    hero: { value: "Inesquecível", good: true },
  },
];

export function GiftComparison() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,197,24,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <SectionLabel tone="gold">A comparação honesta</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Compare com qualquer presente{" "}
              <span className="text-gradient-gold italic">que você já deu.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-white/60">
              Não estamos tentando te vender um vídeo. Estamos tentando te
              lembrar do que realmente importa pra ele.
            </p>
          </Reveal>
        </div>

        {/* Desktop table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative mt-16 hidden md:block"
        >
          {/* Highlight the HeroiVídeo column */}
          <div className="pointer-events-none absolute bottom-0 left-[68%] top-0 z-0 w-[32%] rounded-[7px] bg-gradient-to-b from-gold-400/15 via-gold-500/10 to-transparent blur-sm" />

          <div className="relative overflow-hidden rounded-[7px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl">
            {/* Header */}
            <div className="grid grid-cols-[1.3fr_1fr_1fr_1.2fr] border-b border-white/10">
              <div className="p-5" />
              <div className="p-5 text-center">
                <Gift
                  className="mx-auto h-6 w-6 text-white/60"
                  strokeWidth={1.5}
                />
                <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                  Brinquedo comum
                </div>
              </div>
              <div className="p-5 text-center">
                <PartyPopper
                  className="mx-auto h-6 w-6 text-white/60"
                  strokeWidth={1.5}
                />
                <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                  Festa temática
                </div>
              </div>
              <div className="relative overflow-hidden border-x border-gold-400/40 bg-gradient-to-b from-gold-400/20 via-gold-500/10 to-transparent p-5 text-center">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                <Sparkles
                  className="mx-auto h-6 w-6 text-gold-400"
                  strokeWidth={1.5}
                />
                <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">
                  HeroiVídeo
                </div>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.3fr_1fr_1fr_1.2fr] ${
                  i !== rows.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="flex items-center p-5 text-[13px] font-semibold text-white/70">
                  {row.label}
                </div>
                <Cell data={row.toy} />
                <Cell data={row.party} />
                <Cell data={row.hero} highlight />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile: stacked cards */}
        <div className="mt-12 grid gap-4 md:hidden">
          <MobileCard
            Icon={Gift}
            title="Brinquedo comum"
            rows={rows.map((r) => ({ label: r.label, ...r.toy }))}
          />
          <MobileCard
            Icon={PartyPopper}
            title="Festa temática"
            rows={rows.map((r) => ({ label: r.label, ...r.party }))}
          />
          <MobileCard
            Icon={Sparkles}
            title="HeroiVídeo"
            highlight
            rows={rows.map((r) => ({ label: r.label, ...r.hero }))}
          />
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="max-w-xl text-white/60">
              O preço de <span className="text-white">um brinquedo esquecido</span>,
              com o impacto de <span className="text-gold-400">uma memória eterna</span>.
            </p>
            <ShimmerButton
              as="a"
              href="#pedido"
              variant="gold"
              size="lg"
              icon={<Sparkles className="h-4 w-4" strokeWidth={1.75} />}
            >
              Quero o momento, não o brinquedo
            </ShimmerButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Cell({
  data,
  highlight = false,
}: {
  data: { value: string; good: boolean };
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 p-5 text-[13px] ${
        highlight
          ? "border-x border-gold-400/40 bg-gold-400/[0.04] font-semibold text-white"
          : "text-white/60"
      }`}
    >
      <div
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
          data.good
            ? highlight
              ? "bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950"
              : "bg-emerald-500/20 text-emerald-400"
            : "bg-white/5 text-white/30"
        }`}
      >
        {data.good ? (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <polyline points="2,6 5,9 10,3" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="h-3 w-3"
          >
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        )}
      </div>
      <span>{data.value}</span>
    </div>
  );
}

function MobileCard({
  Icon,
  title,
  rows,
  highlight = false,
}: {
  Icon: LucideIcon;
  title: string;
  highlight?: boolean;
  rows: { label: string; value: string; good: boolean }[];
}) {
  return (
    <div
      className={`overflow-hidden rounded-[7px] border backdrop-blur-xl ${
        highlight
          ? "border-gold-400/40 bg-gradient-to-br from-gold-400/15 via-gold-500/5 to-transparent"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center gap-3 border-b border-white/5 p-5">
        <Icon
          className={`h-6 w-6 ${highlight ? "text-gold-400" : "text-white/60"}`}
          strokeWidth={1.5}
        />
        <div
          className={`text-[12px] font-bold uppercase tracking-widest ${
            highlight ? "text-gold-400" : "text-white/60"
          }`}
        >
          {title}
        </div>
      </div>
      <ul className="divide-y divide-white/5">
        {rows.map((r) => (
          <li
            key={r.label}
            className="flex items-start justify-between gap-3 p-4 text-[13px]"
          >
            <span className="text-white/50">{r.label}</span>
            <span
              className={`flex items-center gap-2 text-right ${
                highlight ? "font-semibold text-white" : "text-white/70"
              }`}
            >
              {r.good ? (
                <Check
                  className="h-3.5 w-3.5 text-emerald-400"
                  strokeWidth={2.5}
                />
              ) : (
                <X className="h-3.5 w-3.5 text-white/30" strokeWidth={2.5} />
              )}
              {r.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
