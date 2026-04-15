"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type CheckoutIframeProps = {
  checkoutUrl: string;
  onClose: () => void;
  onSuccess?: (params: Record<string, string>) => void;
  totalPriceStr: string;
  planLabel: string;
};

type PopupStatus = "opening" | "open" | "paid";

export function CheckoutIframe({
  checkoutUrl,
  onClose,
  onSuccess,
  totalPriceStr,
  planLabel,
}: CheckoutIframeProps) {
  const popupRef = useRef<Window | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const [status, setStatus] = useState<PopupStatus>("opening");

  // Abre o popup centralizado assim que o componente monta
  useEffect(() => {
    const w = 520;
    const h = 700;
    const left = Math.round(window.screenX + (window.outerWidth - w) / 2);
    const top = Math.round(window.screenY + (window.outerHeight - h) / 2);

    const popup = window.open(
      checkoutUrl,
      "infinitepay_checkout",
      `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no`
    );

    if (!popup) {
      // Bloqueador de popup ativo — abre em nova aba como fallback
      window.open(checkoutUrl, "_blank");
      onClose();
      return;
    }

    popupRef.current = popup;
    setStatus("open");

    // Polling para detectar quando o popup fecha ou redireciona para /obrigado
    pollRef.current = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(pollRef.current!);
          onClose();
          return;
        }
        // Tenta ler a URL do popup (só funciona se for same-origin após redirect)
        const url = popup.location.href;
        if (
          url.includes("/obrigado") ||
          url.includes("order_nsu") ||
          url.includes("transaction_nsu")
        ) {
          clearInterval(pollRef.current!);
          setStatus("paid");
          popup.close();
          setTimeout(() => {
            const urlObj = new URL(url);
            const params: Record<string, string> = {};
            urlObj.searchParams.forEach((value, key) => {
              params[key] = value;
            });
            onSuccess?.(params);
            window.location.href = url;
          }, 1800);
        }
      } catch {
        // Cross-origin: popup ainda está na InfinitePay — normal, continua polling
      }
    }, 800);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openInNewTab = useCallback(() => {
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    onClose();
  }, [checkoutUrl, onClose]);

  const focusPopup = useCallback(() => {
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus();
    } else {
      openInNewTab();
    }
  }, [openInNewTab]);

  return (
    <div className="flex flex-col" style={{ minHeight: "380px" }}>
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600">
            {status === "paid" ? (
              <CheckCircle2 className="h-4 w-4 text-white" strokeWidth={2.5} />
            ) : (
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-white">
                <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-1 11.41L5.59 10 7 8.59l2 2 4-4L14.41 8 9 13.41z" fill="currentColor" />
              </svg>
            )}
          </div>
          <div>
            <div className="text-[13px] font-semibold text-white">Pagamento Seguro</div>
            <div className="text-[11px] text-white/40">{planLabel} · R$ {totalPriceStr}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openInNewTab}
            title="Abrir em nova aba"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-white/20 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <button
            onClick={onClose}
            title="Fechar"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-white/20 hover:text-white"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Corpo principal */}
      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 bg-ink-900/30 px-8 py-10 text-center">
        <AnimatePresence mode="wait">
          {status === "paid" ? (
            <motion.div
              key="paid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_40px_rgba(52,211,153,0.4)]"
              >
                <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2} />
              </motion.div>
              <div>
                <h3 className="font-display text-2xl font-light text-white">Pagamento confirmado!</h3>
                <p className="mt-2 text-[13px] text-white/50">Redirecionando para a confirmação...</p>
              </div>
            </motion.div>
          ) : status === "opening" ? (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" strokeWidth={1.5} />
              <p className="text-[13px] text-white/50">Abrindo checkout seguro...</p>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-5"
            >
              {/* Ícone de janela popup */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10">
                <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-blue-400">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="6.5" cy="7" r="0.75" fill="currentColor" />
                  <circle cx="9" cy="7" r="0.75" fill="currentColor" />
                  <circle cx="11.5" cy="7" r="0.75" fill="currentColor" />
                </svg>
              </div>

              <div>
                <h3 className="font-display text-xl font-light text-white">
                  Janela de pagamento aberta
                </h3>
                <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-white/50">
                  Finalize o pagamento na janela que foi aberta. Esta tela aguarda a confirmação automaticamente.
                </p>
              </div>

              <button
                onClick={focusPopup}
                className="inline-flex items-center gap-2 rounded-[7px] border border-blue-400/30 bg-blue-400/10 px-5 py-2.5 text-[13px] font-semibold text-blue-300 transition hover:bg-blue-400/20"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                Trazer janela para frente
              </button>

              <p className="text-[11px] text-white/30">
                Janela bloqueada?{" "}
                <button
                  onClick={openInNewTab}
                  className="underline underline-offset-2 hover:text-white/60"
                >
                  Clique aqui para abrir em nova aba
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Security footer */}
      <div className="flex flex-shrink-0 items-center justify-center gap-4 border-t border-white/5 bg-ink-900/60 px-5 py-3">
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
            <path d="M8 1L2 4v4c0 3.31 2.69 6 6 6s6-2.69 6-6V4L8 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          SSL 256-bit
        </div>
        <div className="h-3 w-px bg-white/10" />
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
            <rect x="2" y="5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Dados criptografados
        </div>
        <div className="h-3 w-px bg-white/10" />
        <div className="text-[10px] text-white/30">Powered by InfinitePay</div>
      </div>
    </div>
  );
}
