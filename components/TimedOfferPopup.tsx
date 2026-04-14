"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, Shield, Star, Package, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getCheckoutUrl } from "@/lib/checkout";

const DELAY_MS = 1 * 60 * 1000; // 1 minuto
const STORAGE_KEY = "hv-timed-offer-dismissed";
const COUNTDOWN_SECONDS = 10 * 60; // 10 minutos para decidir

/**
 * Popup que aparece automaticamente depois de 1 minuto na página
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
  const isUrgent = secondsLeft <= 60;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-[#1a1a18]/60 px-4 py-10 backdrop-blur-sm"
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
            className="relative w-full max-w-[440px] overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Fechar oferta"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#5a5a56] transition hover:bg-[#F1EFE8] hover:text-[#1a1a18]"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="relative px-7 pb-7 pt-9 sm:px-7">
              {/* Badge topo */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-block rounded-full bg-[#FAC775] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-[#633806]"
                >
                  Oferta liberada pra você
                </motion.div>
              </div>

              {/* Headline */}
              <h2
                id="timed-offer-title"
                className="mt-4 text-balance text-center text-[22px] font-medium leading-[1.35] text-[#1a1a18]"
              >
                Espera — antes de ir, temos algo especial pra você
              </h2>

              {/* Copy persuasiva */}
              <p className="mx-auto mt-3 max-w-md text-center text-[15px] leading-[1.75] text-[#5a5a56]">
                Que tal levar <strong className="font-medium text-[#1a1a18]">2 vídeos personalizados</strong> pelo
                preço de 1? É o plano mais pedido pelos pais — e que emociona os irmãos ao mesmo tempo.
              </p>

              {/* Duo Box */}
              <div className="mt-5 flex items-center gap-3.5 rounded-xl border border-black/[0.08] bg-[#F1EFE8] px-4 py-3.5">
                <div className="flex-shrink-0 text-[30px] font-medium leading-none text-[#0F6E56]">
                  ×2
                </div>
                <div className="text-[13px] leading-[1.55] text-[#5a5a56]">
                  <strong className="font-medium text-[#1a1a18]">Plano Duplo:</strong> dois vídeos únicos, cada um com nome, história e carinho — entregues em até 24h.
                </div>
              </div>

              {/* Preço */}
              <div className="mt-5 text-center">
                <div className="flex items-baseline justify-center gap-2.5">
                  <span className="text-[15px] text-[#aaa] line-through">
                    De R$ 147
                  </span>
                  <span className="text-[34px] font-medium text-[#0F6E56]">
                    R$ 97
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-[#888]">
                  pagamento único · sem mensalidade
                </p>
              </div>

              {/* Countdown */}
              <div className="mt-5 flex items-center justify-center gap-2 rounded-[10px] border border-black/[0.08] bg-[#F1EFE8] px-4 py-2.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="9" r="5.5" stroke="#D85A30" strokeWidth="1.2"/>
                  <path d="M8 6.5V9l1.5 1.5" stroke="#D85A30" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M6 2.5h4M8 2.5V4" stroke="#D85A30" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="text-[13px] text-[#5a5a56]">
                  Essa oferta expira em
                </span>
                <span className={`min-w-[44px] text-[16px] font-medium tabular-nums ${isUrgent ? "text-[#E24B4A]" : "text-[#1a1a18]"}`}>
                  {mm}:{ss}
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-5 flex flex-col gap-2.5">
                <button
                  onClick={handleAccept}
                  className="w-full rounded-[14px] bg-[#0F6E56] px-4 py-4 text-center text-[16px] font-medium text-[#E1F5EE] transition hover:bg-[#085041] active:scale-[0.98]"
                >
                  Sim! Quero os 2 vídeos por R$ 97
                </button>
                <button
                  onClick={handleClose}
                  className="w-full bg-transparent px-4 py-2.5 text-center text-[13px] text-[#aaa] underline underline-offset-[3px] transition hover:text-[#777]"
                >
                  Não, obrigado — vou perder essa oferta
                </button>
              </div>

              {/* Trust */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-black/[0.08] pt-4">
                <span className="flex items-center gap-1.5 text-[12px] text-[#888]">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1.5C4.3 3 1.5 3.5 1.5 3.5S1 9 6.5 11.5C12 9 11.5 3.5 11.5 3.5S8.7 3 6.5 1.5Z" stroke="#888" strokeWidth="1.1" strokeLinejoin="round"/>
                    <path d="M4 6.5l1.8 1.8 3-3" stroke="#888" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Pagamento seguro
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-[#888]">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1.5l1.2 3.2H11l-2.6 1.9.9 3.1L6.5 7.8 3.7 9.7l.9-3.1L2 4.7h3.3L6.5 1.5Z" stroke="#888" strokeWidth="1.1" strokeLinejoin="round"/>
                  </svg>
                  Garantia de 14 dias
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-[#888]">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <rect x="1.5" y="4" width="10" height="7.5" rx="1.2" stroke="#888" strokeWidth="1.1"/>
                    <path d="M4.5 4V3a2 2 0 014 0v1" stroke="#888" strokeWidth="1.1"/>
                    <circle cx="6.5" cy="7.5" r=".8" fill="#888"/>
                  </svg>
                  Entrega em 24h
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
