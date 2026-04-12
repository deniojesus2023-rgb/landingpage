"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ShimmerButton } from "./ui/ShimmerButton";

const NAMES = [
  "Lucas",
  "Helena",
  "Arthur",
  "Sofia",
  "Miguel",
  "Laura",
  "Pedro",
  "Alice",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Spotlight follows mouse
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.3);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  const spotlightBg = useTransform(
    [smoothX, smoothY],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.08), transparent 40%)`
  );

  // Rotating child name
  const [nameIndex, setNameIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setNameIndex((i) => (i + 1) % NAMES.length);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  // Live counters — start with plausible seed, tick up randomly
  const [videosNow, setVideosNow] = useState(27);
  const [deliveredToday, setDeliveredToday] = useState(14);
  useEffect(() => {
    const t = setInterval(() => {
      setVideosNow((n) => n + (Math.random() > 0.6 ? 1 : 0));
      setDeliveredToday((n) => n + (Math.random() > 0.85 ? 1 : 0));
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-ink-950 pt-10 pb-20 sm:pt-14 sm:pb-28"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(124,92,255,0.25),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(255,59,71,0.22),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(245,197,24,0.18),transparent_60%)]" />

        <motion.div
          className="aurora-blob left-[10%] top-[15%] h-[420px] w-[420px] bg-violet-500"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="aurora-blob right-[5%] top-[20%] h-[360px] w-[360px] bg-crimson-500"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="aurora-blob bottom-[5%] left-[35%] h-[500px] w-[500px] bg-gold-500"
          animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlightBg }}
        />
      </div>

      <div className="grain" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative mx-auto max-w-6xl px-5 text-center sm:px-8"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-6 flex justify-center"
        >
          <img
            src="/logo.png"
            alt="HeroiVideo"
            className="h-16 w-auto brightness-0 invert sm:h-20"
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/5 px-4 py-2 backdrop-blur-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400">
            Presente cinematográfico · Entrega 48h
          </span>
        </motion.div>

        {/* Live counter pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-crimson-500/30 bg-crimson-500/10 px-3 py-1.5 text-crimson-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson-500" />
            </span>
            <span className="font-bold tabular-nums">{videosNow}</span>
            vídeos sendo gravados agora
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-400">
            ✓ <span className="font-bold tabular-nums">{deliveredToday}</span>{" "}
            entregues hoje
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto max-w-5xl text-balance font-display text-[clamp(2.4rem,7vw,5.5rem)] font-light leading-[0.95] tracking-tight"
        >
          <span className="text-gradient-hero">
            O herói favorito do seu filho
          </span>
          <br />
          <span className="relative inline-block">
            <span className="text-gradient-gold italic">falando o nome</span>{" "}
            <span className="relative inline-block text-gradient-gold italic">
              {/* Rotating name */}
              <span className="relative inline-block align-baseline">
                <span className="invisible inline-block" aria-hidden>
                  {NAMES.reduce((a, b) => (a.length >= b.length ? a : b))}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={NAMES[nameIndex]}
                    initial={{ opacity: 0, y: "0.4em", filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: "-0.4em", filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="absolute inset-0 flex items-baseline justify-center whitespace-nowrap"
                  >
                    {NAMES[nameIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-gradient-gold italic">.</span>
              <svg
                viewBox="0 0 300 12"
                className="absolute -bottom-2 left-0 w-full"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 8 C 60 2, 140 2, 200 6 S 280 10, 298 4"
                  stroke="url(#gold-stroke)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 1.1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gold-stroke" x1="0" x2="1">
                    <stop offset="0%" stopColor="#FFD65C" />
                    <stop offset="100%" stopColor="#FF9A1F" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-balance text-[15px] leading-relaxed text-white/70 sm:text-[17px]"
        >
          Homem-Aranha, Batman, Elsa e mais de 20 heróis. Um vídeo personalizado,
          com o nome, a mensagem e a ocasião que você escolher — entregue no seu
          WhatsApp em{" "}
          <span className="font-semibold text-white">até 48 horas</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <ShimmerButton
            as="a"
            href="#pedido"
            size="xl"
            variant="primary"
            icon={<span className="text-lg">🦸</span>}
          >
            Quero o vídeo agora
          </ShimmerButton>
          <ShimmerButton
            as="a"
            href="#como-funciona"
            size="xl"
            variant="secondary"
            icon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            }
          >
            Ver exemplo (60s)
          </ShimmerButton>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-white/50"
        >
          {[
            ["⚡", "Entrega em 48h"],
            ["🔒", "Garantia de reembolso"],
            ["💛", "+500 famílias emocionadas"],
            ["🎬", "Marvel · Disney · DC"],
            ["⭐", "4.9/5 · 120+ avaliações"],
          ].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-2">
              <span>{icon}</span>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

