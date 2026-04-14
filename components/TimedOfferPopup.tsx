"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, Gift, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getCheckoutUrl } from "@/lib/checkout";

const DELAY_MS = 1 * 60 * 1000; // 1 minuto
const STORAGE_KEY = "hv-timed-offer-dismissed";
const COUNTDOWN_SECONDS = 10 * 60; // 10 minutos para decidir

/**
 * Popup que aparece automaticamente depois de 3 minutos na página
 * oferecendo o Plano Duplo com a copy de urgência (R$147 por R$97).
 * Só aparece uma vez por sessão — guarda o dismiss no sessionStorage.
 */
export function TimedOfferPopup() {
  const [open, setOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  // Timer para abrir
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Countdown de urgência enquanto o popup está aberto
  useEffect(() => {
    if (!open) return;
    const i = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(i);
  }, [open]);

  // ESC fecha
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  };

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "1");
      window.open(getCheckoutUrl("duplo"), "_blank");
    }
    setOpen(false);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-ink-950/85 px-4 py-10 backdrop-blur-xl"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="timed-offer-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-[12px] border border-gold-400/40 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 shadow-[0_40px_120px_rgba(30,157,241,0.35)]"
          >
            {/* Glow BG */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gold-400/25 blur-3xl" />
              <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-crimson-500/20 blur-3xl" />
              <motion.div
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,157,241,0.25),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(124,92,255,0.22),transparent_55%)]"
                style={{ backgroundSize: "200% 200%" }}
              />
              <div className="absolute inset-0 bg-grid-pattern [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Fechar oferta"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>

            <div className="relative px-7 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12">
              {/* Badge topo */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400 backdrop-blur-xl"
                >
                  <Gift className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Oferta liberada pra você
                </motion.div>
              </div>

              {/* Headline */}
              <h2
                id="timed-offer-title"
                className="mt-6 text-balance text-center font-display text-3xl font-light leading-[1.05] text-white sm:text-4xl"
              >
                Vi que você tá{" "}
                <span className="text-gradient-gold italic">pensando com carinho</span>
                .
                <br className="hidden sm:block" /> Libera uma proposta pra você?
              </h2>

              {/* Copy persuasiva */}
              <p className="mx-auto mt-5 max-w-md text-center text-[15px] leading-relaxed text-white/70">
                Em vez de 1 vídeo, leva <strong className="text-white">o Duplo: 2 vídeos personalizados</strong> pelo
                preço de 1. É o plano que os pais mais pedem — e que emociona até os irmãos
                ao mesmo tempo.
              </p>

              {/* Preço */}
              <div className="mt-8 flex items-end justify-center gap-4">
                <div className="text-center">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    De
                  </div>
                  <div className="mt-1 font-display text-2xl font-light text-white/40 line-through">
                    R$ 147
                  </div>
                </div>
                <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="text-center">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
                    Por apenas
                  </div>
                  <div className="mt-1 flex items-baseline justify-center gap-1">
                    <span className="font-display text-2xl font-light text-white/70">
                      R$
                    </span>
                    <span className="font-display text-6xl font-light leading-none text-gradient-gold">
                      97
                    </span>
                  </div>
                  <div className="mt-1 text-[10px] text-white/45">pagamento único</div>
                </div>
              </div>

              {/* Countdown */}
              <div className="mt-6 flex items-center justify-center gap-2 rounded-full border border-crimson-500/30 bg-crimson-500/5 py-2 text-[12px] font-semibold text-crimson-500 backdrop-blur-xl">
                <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
                Essa oferta expira em{" "}
                <span className="font-display tabular-nums text-white">
                  {mm}:{ss}
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-col gap-3">
                <button
                  onClick={handleAccept}
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-[9px] bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-7 py-4 text-[15px] font-bold text-ink-950 shadow-[0_12px_40px_rgba(30,157,241,0.5)] transition active:scale-[0.98]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Sparkles className="relative h-4 w-4" strokeWidth={2} />
                  <span className="relative">
                    Sim! Quero os 2 vídeos por R$ 97
                  </span>
                </button>
                <button
                  onClick={handleClose}
                  className="text-center text-[12px] text-white/40 transition hover:text-white/60"
                >
                  Não, obrigado — vou perder essa oferta
                </button>
              </div>

              {/* Trust */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-white/40">
                <span>Pagamento seguro</span>
                <span>·</span>
                <span>Garantia de 14 dias</span>
                <span>·</span>
                <span>Entrega em 24h</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
