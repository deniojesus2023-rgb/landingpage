"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Clapperboard } from "lucide-react";
import { ShimmerButton } from "./ui/ShimmerButton";

export function Navbar() {
  const { scrollY } = useScroll();
  const bgAlpha = useTransform(scrollY, [0, 120], [0, 0.85]);
  const blurPx = useTransform(scrollY, [0, 120], [0, 18]);
  const borderAlpha = useTransform(scrollY, [0, 120], [0, 0.08]);

  const background = useMotionTemplate`rgba(10, 11, 26, ${bgAlpha})`;
  const backdropFilter = useMotionTemplate`blur(${blurPx}px)`;
  const borderBottom = useMotionTemplate`1px solid rgba(255,255,255,${borderAlpha})`;

  const links = [
    ["Como funciona", "#como-funciona"],
    ["Personagens", "#personagens"],
    ["Depoimentos", "#depoimentos"],
    ["Planos", "#pedido"],
    ["FAQ", "#faq"],
  ] as const;

  return (
    <nav className="sticky top-0 z-50 w-full">
      <motion.div
        className="absolute inset-0"
        style={{ background, backdropFilter, borderBottom }}
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="group flex items-center gap-2.5">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-[7px] bg-gradient-to-br from-gold-400 via-gold-500 to-[#D68F00] shadow-glow">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-ink-950"
                fill="currentColor"
              >
                <path d="M12 2l2.39 4.84L20 7.77l-4 3.9.95 5.55L12 14.77 7.05 17.22 8 11.67 4 7.77l5.61-.93L12 2z" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-[7px] bg-gold-400/50 opacity-0 blur-xl transition group-hover:opacity-70" />
          </div>
          <div className="text-lg font-extrabold tracking-tight text-white">
            Heroi<span className="text-gradient-gold">Vídeo</span>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative text-[13px] font-medium text-white/70 transition hover:text-white"
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-gold-400 to-transparent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <ShimmerButton
          as="a"
          href="#pedido"
          size="md"
          variant="gold"
          icon={<Clapperboard className="h-4 w-4" strokeWidth={1.75} />}
        >
          Pedir agora
        </ShimmerButton>
      </div>
    </nav>
  );
}
