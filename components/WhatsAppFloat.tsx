"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const PHONE_NUMBER = "5511999999999";
const PREFILLED_MESSAGE =
  "Oi! Vim pela landing page e queria entender melhor como funciona o vídeo personalizado pro meu filho. Pode me ajudar?";
const WHATSAPP_HREF = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
  PREFILLED_MESSAGE,
)}`;

export function WhatsAppFloat() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem("wa-tooltip-dismissed");
    if (dismissed === "1") return;

    const openTimer = window.setTimeout(() => {
      setTooltipOpen(true);
      const typingTimer = window.setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      return () => window.clearTimeout(typingTimer);
    }, 8000);

    return () => window.clearTimeout(openTimer);
  }, []);

  const dismissTooltip = () => {
    setTooltipOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("wa-tooltip-dismissed", "1");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {tooltipOpen && (
          <motion.div
            role="dialog"
            aria-label="Mensagem do atendimento"
            initial={{ opacity: 0, scale: 0.85, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="absolute bottom-0 right-full mr-4 w-[280px] max-w-[280px] rounded-[16px] border border-white/10 bg-ink-900/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={dismissTooltip}
              aria-label="Fechar mensagem"
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X size={14} />
            </button>

            <div className="flex items-center gap-3 pr-6">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-blue-600 text-sm font-bold text-white shadow-md">
                A
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  Ana · Atendimento
                </p>
                <p className="text-[11px] font-medium text-emerald-400">
                  online agora
                </p>
              </div>
            </div>

            <div className="mt-3 min-h-[52px] text-[13px] leading-relaxed text-white/85">
              {isTyping ? (
                <div className="flex items-center gap-1 pt-2">
                  <span className="text-white/60">Digitando</span>
                  <span className="flex items-center gap-1">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-white/60"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: 0,
                      }}
                    />
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-white/60"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                    />
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-white/60"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                    />
                  </span>
                </div>
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Oi! Vi que você tá interessado nos vídeos 👀 Tem alguma
                  dúvida que posso te ajudar?
                </motion.p>
              )}
            </div>

            <div className="absolute bottom-4 right-[-6px] h-3 w-3 rotate-45 border-b border-r border-white/10 bg-ink-900/95" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(37, 211, 102, 0.55)",
              "0 0 0 18px rgba(37, 211, 102, 0)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        <motion.a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 1.2,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_40px_rgba(37,211,102,0.5)]"
        >
          <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 blur-xl transition group-hover:opacity-60" />
          <svg
            width="26"
            height="26"
            viewBox="0 0 30 30"
            fill="none"
            className="relative"
          >
            <path
              d="M15 2C7.82 2 2 7.82 2 15c0 2.26.6 4.38 1.64 6.22L2 28l6.95-1.6A12.94 12.94 0 0015 28c7.18 0 13-5.82 13-13S22.18 2 15 2z"
              fill="white"
            />
            <path
              d="M21.5 18.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.06 3.15 4.99 4.41.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
              fill="#25D366"
            />
          </svg>

          <span
            aria-label="1 mensagem não lida"
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink-950 bg-crimson-500 text-[10px] font-bold text-white"
          >
            1
          </span>
        </motion.a>
      </div>
    </div>
  );
}
