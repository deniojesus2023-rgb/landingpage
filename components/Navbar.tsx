"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
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
        <a href="#" className="group relative flex items-center">
          <Image
            src="/logo-hv.webp"
            alt="HeroiVídeo"
            width={180}
            height={48}
            priority
            className="h-10 w-auto sm:h-11"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gold-400/40 opacity-0 blur-2xl transition group-hover:opacity-60" />
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
