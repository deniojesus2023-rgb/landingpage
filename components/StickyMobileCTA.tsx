"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getCheckoutUrl } from "@/lib/checkout";
import { ShinyButton } from "@/components/ui/shiny-button";

/**
 * CTA fixa na parte de baixo da tela em mobile.
 * Aparece depois de 600px de scroll (depois do VideoDemo)
 * e some quando o usuário está dentro da seção #pedido,
 * evitando duplicar o CTA quando os planos já estão visíveis.
 */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (typeof window === "undefined") return;
      const scrolled = window.scrollY > 600;

      const pricing = document.getElementById("pedido");
      let insidePricing = false;
      if (pricing) {
        const rect = pricing.getBoundingClientRect();
        insidePricing = rect.top < window.innerHeight * 0.9 && rect.bottom > 120;
      }

      setVisible(scrolled && !insidePricing);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleClick = () => {
    window.open(getCheckoutUrl("duplo"), "_blank");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-40 md:hidden"
        >
          <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-ink-950/90 to-transparent" />
          <div className="relative border-t border-white/10 bg-ink-950/95 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-3 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-gold-400">
                  <Zap className="h-2.5 w-2.5" strokeWidth={2.5} />
                  Oferta termina em breve
                </div>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-[11px] text-white/35 line-through">
                    R$ 147
                  </span>
                  <span className="font-display text-2xl font-light leading-none text-white">
                    R$ 97
                  </span>
                  <span className="text-[10px] text-white/45">2 vídeos</span>
                </div>
              </div>
              <ShinyButton
                onClick={handleClick}
                className="inline-flex items-center gap-1.5 rounded-[7px] bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 px-5 py-3 text-[13px] font-bold leading-none text-white shadow-glow-blue"
                aria-label="Fazer pedido agora pelo WhatsApp"
              >
                <span>Quero agora</span>
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
              </ShinyButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
