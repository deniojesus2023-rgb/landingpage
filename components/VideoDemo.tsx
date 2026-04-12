"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

export function VideoDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 sm:py-36"
      id="demo"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-10 h-80 w-80 rounded-full bg-crimson-500/20 blur-3xl" />
        <div className="absolute right-1/3 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <SectionLabel tone="cyan">Veja o momento mágico</SectionLabel>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-4xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
            A reação dele ao ouvir o herói{" "}
            <span className="text-gradient-gold italic">
              chamar pelo próprio nome
            </span>{" "}
            você vai guardar para sempre.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-white/60">
            Assista a um vídeo real feito para o Lucas, 4 anos. Volume alto
            recomendado — e mantenha os lenços por perto.
          </p>
        </Reveal>

        <motion.div style={{ y, scale }} className="relative mx-auto mt-16 w-full max-w-4xl">
          <VideoPlayerMock />
        </motion.div>

        <p className="mt-6 text-[12px] text-white/40">
          👆 Substitua pelo embed real do seu vídeo demo (YouTube / Vimeo /
          tag &lt;video&gt;)
        </p>
      </div>
    </section>
  );
}

function VideoPlayerMock() {
  return (
    <div className="group relative">
      {/* Halo glow */}
      <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-crimson-500/30 via-violet-500/30 to-gold-500/30 opacity-60 blur-3xl transition group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-900 shadow-2xl">
        <div className="relative aspect-video">
          {/* Background image / poster */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1040] via-[#3a0e2e] to-[#501b0e]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,59,71,0.4),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(124,92,255,0.4),transparent_50%)]" />
            <div className="grain" />
          </div>

          {/* Scan lines */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.2) 2px, rgba(255,255,255,0.2) 3px)",
            }}
          />

          {/* Play button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center"
            onClick={() =>
              alert(
                "Cole aqui o embed do seu vídeo demo (YouTube iframe ou tag <video>)."
              )
            }
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(245,197,24,0.5)",
                    "0 0 0 32px rgba(245,197,24,0)",
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_0_80px_rgba(245,197,24,0.6)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-10 w-10 text-ink-950"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
              <div className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Assistir (0:58)
              </div>
            </div>
          </motion.button>

          {/* Corner labels */}
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-xl">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson-500" />
            EPISÓDIO REAL
          </div>
          <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[11px] font-medium text-white/70 backdrop-blur-xl">
            4K · HDR
          </div>

          {/* Bottom caption */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
                  Cliente real · Lucas, 4 anos
                </div>
                <div className="mt-1 font-display text-2xl font-light text-white sm:text-3xl">
                  &quot;Lucas, eu vi lá do topo do prédio você sendo corajoso.&quot;
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar mock */}
        <div className="flex items-center gap-3 border-t border-white/10 bg-ink-900/80 px-5 py-3 backdrop-blur">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-gold-400 to-gold-600" />
          </div>
          <div className="text-[10px] tabular-nums text-white/40">
            00:19 / 00:58
          </div>
        </div>
      </div>
    </div>
  );
}
