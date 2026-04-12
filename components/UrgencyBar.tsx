"use client";

import { motion } from "framer-motion";

export function UrgencyBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative z-40 overflow-hidden border-b border-white/5 bg-gradient-to-r from-crimson-600 via-[#c91828] to-crimson-600 py-2.5 text-center text-[13px] font-semibold text-white"
    >
      {/* subtle pulse */}
      <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <span className="relative inline-flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400 shadow-[0_0_10px_rgba(245,197,24,0.9)]" />
        <span>
          Apenas <strong className="text-gold-400">5 vagas</strong> esta semana —
          entrega garantida em até <strong className="text-gold-400">48h</strong>
        </span>
      </span>
    </motion.div>
  );
}
