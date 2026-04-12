"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

export function BeforeAfter() {
  const [position, setPosition] = useState(55);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(4, Math.min(96, pct)));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.touches[0].clientX);
  };

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-crimson-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <SectionLabel tone="violet">Antes vs Depois</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              A diferença entre um presente comum{" "}
              <span className="text-gradient-gold italic">
                e um momento eterno.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-white/60">
              Arraste a barra para baixo e veja a transformação com os próprios
              olhos. É a mesma criança, no mesmo aniversário. A única diferença
              é o que ela acabou de ganhar.
            </p>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto mt-16 w-full max-w-4xl"
        >
          {/* Glow halo */}
          <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-white/10 via-gold-500/20 to-crimson-500/20 opacity-60 blur-2xl" />

          <div
            ref={containerRef}
            className="relative aspect-[16/10] cursor-ew-resize overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-2xl select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* AFTER (full background) */}
            <AfterPanel />

            {/* BEFORE (clipped by slider position) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <BeforePanel />
            </div>

            {/* Slider handle */}
            <div
              className="pointer-events-none absolute inset-y-0 z-10"
              style={{ left: `${position}%` }}
            >
              <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255,255,255,0.4)",
                      "0 0 0 16px rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-xl"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M8 7l-4 5 4 5" />
                    <path d="M16 7l4 5-4 5" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Hint */}
          <p className="mt-5 text-center text-[12px] text-white/40">
            👆 Arraste a bolinha para comparar
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function BeforePanel() {
  return (
    <div className="relative h-full w-full">
      {/* Background — grayish gloomy */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c20] via-[#15151a] to-[#0e0e12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(80,80,100,0.15),transparent_60%)]" />

      {/* Noise */}
      <div className="grain opacity-[0.5]" />

      {/* Label top */}
      <div className="absolute left-6 top-6">
        <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 backdrop-blur-xl">
          Antes · presente comum
        </div>
      </div>

      {/* Center illustration — gift box grayscale */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="text-[140px] opacity-20 grayscale">🎁</div>
        </div>
      </div>

      {/* Bottom copy */}
      <div className="absolute inset-x-0 bottom-0 p-7">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
          Dura 2 semanas
        </div>
        <div className="mt-2 font-display text-2xl font-light leading-tight text-white/70 sm:text-3xl">
          Abriu, brincou,
          <br />
          esqueceu na gaveta.
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Sem emoção",
            "Sem personalização",
            "Sem memória",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium text-white/50"
            >
              × {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AfterPanel() {
  return (
    <div className="relative h-full w-full">
      {/* Background — vivid cinematic */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a3a] via-[#3a0e2e] to-[#501b0e]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,59,71,0.35),transparent_55%),radial-gradient(circle_at_30%_70%,rgba(124,92,255,0.35),transparent_55%),radial-gradient(circle_at_50%_50%,rgba(245,197,24,0.2),transparent_60%)]" />

      {/* Scan lines for cinematic feel */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
        }}
      />
      <div className="grain" />

      {/* Label top */}
      <div className="absolute right-6 top-6">
        <div className="rounded-full border border-gold-400/40 bg-gold-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400 backdrop-blur-xl">
          Depois · HeroiVídeo
        </div>
      </div>

      {/* Center — emoji + rays */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-10"
          >
            <div className="h-48 w-48 rounded-full bg-[conic-gradient(from_0deg,rgba(245,197,24,0.4),transparent_30%,rgba(255,59,71,0.4),transparent_60%,rgba(124,92,255,0.4),transparent_90%)]" />
          </motion.div>
          <div className="relative text-[120px]">🤩</div>
        </div>
      </div>

      {/* Bottom copy */}
      <div className="absolute inset-x-0 bottom-0 p-7">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400">
          Dura a vida toda
        </div>
        <div className="mt-2 font-display text-2xl font-light leading-tight text-white sm:text-3xl">
          Assistiu 27 vezes,
          <br />
          chorou, abraçou a mãe.
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Lágrimas reais", "Nome próprio", "Memória eterna"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-[10px] font-semibold text-gold-400"
            >
              ✓ {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
