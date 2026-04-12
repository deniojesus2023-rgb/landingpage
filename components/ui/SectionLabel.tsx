"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function SectionLabel({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "violet" | "cyan";
}) {
  const colors = {
    gold: "from-gold-400/80 via-gold-500 to-gold-400/80 text-gold-400 border-gold-400/30",
    violet: "from-violet-500/80 via-violet-500 to-violet-500/80 text-violet-500 border-violet-500/30",
    cyan: "from-cyan-400/80 via-cyan-400 to-cyan-400/80 text-cyan-400 border-cyan-400/30",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center gap-3"
    >
      <div className={`h-px w-10 bg-gradient-to-r ${colors[tone]}`} />
      <span
        className={`rounded-full border ${colors[tone]} bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur`}
      >
        {children}
      </span>
      <div className={`h-px w-10 bg-gradient-to-l ${colors[tone]}`} />
    </motion.div>
  );
}
