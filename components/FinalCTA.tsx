"use client";

import { motion } from "framer-motion";
import { Heart, Lock, Sparkles, Zap } from "lucide-react";
import { HoverBorderGradient } from "./ui/HoverBorderGradient";
import { Reveal } from "./ui/Reveal";
import { ShinyButton } from "./ui/shiny-button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-600/30 via-violet-500/25 to-gold-500/30" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,59,71,0.4),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(30,157,241,0.4),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(124,92,255,0.4),transparent_50%)]"
          style={{ backgroundSize: "200% 200%" }}
        />
        <div className="absolute inset-0 bg-ink-950/60" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
            Última chance do preço promocional
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-3xl text-balance font-display text-5xl font-light leading-[0.95] sm:text-6xl md:text-7xl">
            Um momento que ele vai{" "}
            <span className="text-gradient-gold italic">
              lembrar a vida toda.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-white/70">
            Não é só um vídeo. É a expressão no rostinho dele. É o brilho nos
            olhos. É a primeira memória que ele vai contar aos netos.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <HoverBorderGradient>
              <a href="#pedido">
                <ShinyButton className="flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-8 py-4 text-[15px] font-bold text-ink-950 shadow-[0_8px_28px_rgba(30,157,241,0.45)]">
                  <Sparkles className="h-4 w-4" strokeWidth={1.75} />
                  Criar o vídeo do meu filho agora
                </ShinyButton>
              </a>
            </HoverBorderGradient>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-white/50">
            <span className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.75} />
              Pagamento seguro
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5" strokeWidth={1.75} />
              Entrega em até 48h
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Heart className="h-3.5 w-3.5" strokeWidth={1.75} />
              100% de garantia
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
