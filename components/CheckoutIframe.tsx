"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────── TYPES ─────────────────────── */
type CheckoutIframeProps = {
  checkoutUrl: string;
  onClose: () => void;
  onSuccess?: (params: Record<string, string>) => void;
  totalPriceStr: string;
  planLabel: string;
};

type IframeStatus = "loading" | "ready" | "paid" | "error";

/* ─────────────────────── COMPONENT ─────────────────────── */
export function CheckoutIframe({
  checkoutUrl,
  onClose,
  onSuccess,
  totalPriceStr,
  planLabel,
}: CheckoutIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<IframeStatus>("loading");
  const [errorMsg, setErrorMsg] = useState("");

  // Detecta quando o iframe navega para a redirect_url (domínio próprio)
  // A InfinitePay redireciona para /obrigado após o pagamento
  const handleIframeLoad = useCallback(() => {
    try {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeWindow) return;

      // Tenta ler a URL atual do iframe
      const currentUrl = iframeWindow.location.href;

      // Se voltou para o nosso domínio (obrigado), pagamento foi concluído
      if (
        currentUrl.includes("/obrigado") ||
        currentUrl.includes("order_nsu") ||
        currentUrl.includes("transaction_nsu")
      ) {
        const url = new URL(currentUrl);
        const params: Record<string, string> = {};
        url.searchParams.forEach((value, key) => {
          params[key] = value;
        });
        setStatus("paid");
        setTimeout(() => {
          onSuccess?.(params);
          // Redireciona a janela principal para a página de obrigado
          window.location.href = currentUrl;
        }, 1500);
        return;
      }

      setStatus("ready");
    } catch {
      // Cross-origin: iframe ainda está no domínio da InfinitePay — normal
      setStatus("ready");
    }
  }, [onSuccess]);

  // Polling para detectar redirecionamento pós-pagamento
  useEffect(() => {
    if (status === "paid") return;

    const interval = setInterval(() => {
      try {
        const iframeWindow = iframeRef.current?.contentWindow;
        if (!iframeWindow) return;
        const currentUrl = iframeWindow.location.href;

        if (
          currentUrl.includes("/obrigado") ||
          currentUrl.includes("order_nsu") ||
          currentUrl.includes("transaction_nsu")
        ) {
          clearInterval(interval);
          const url = new URL(currentUrl);
          const params: Record<string, string> = {};
          url.searchParams.forEach((value, key) => {
            params[key] = value;
          });
          setStatus("paid");
          setTimeout(() => {
            onSuccess?.(params);
            window.location.href = currentUrl;
          }, 1500);
        }
      } catch {
        // Cross-origin — ainda no domínio da InfinitePay, tudo certo
      }
    }, 800);

    return () => clearInterval(interval);
  }, [status, onSuccess]);

  // Fallback: abrir em nova aba se o iframe falhar
  const openInNewTab = useCallback(() => {
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    onClose();
  }, [checkoutUrl, onClose]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600">
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-white">
              <path
                d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-1 11.41L5.59 10 7 8.59l2 2 4-4L14.41 8 9 13.41z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-white">
              Pagamento Seguro
            </div>
            <div className="text-[11px] text-white/40">
              {planLabel} · R$ {totalPriceStr}
            </div>
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

      {/* iFrame area */}
      <div className="relative flex-1 overflow-hidden bg-white">
        {/* Loading overlay */}
        <AnimatePresence>
          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#05060F]"
            >
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" strokeWidth={1.5} />
              <p className="text-[13px] text-white/50">
                Carregando pagamento seguro...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success overlay */}
        <AnimatePresence>
          {status === "paid" && (
            <motion.div
              key="paid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#05060F]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_40px_rgba(52,211,153,0.5)]"
              >
                <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2} />
              </motion.div>
              <div className="text-center">
                <h3 className="font-display text-2xl font-light text-white">
                  Pagamento confirmado!
                </h3>
                <p className="mt-2 text-[13px] text-white/50">
                  Redirecionando...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The actual iframe */}
        <iframe
          ref={iframeRef}
          src={checkoutUrl}
          onLoad={handleIframeLoad}
          onError={() => setErrorMsg("Não foi possível carregar o checkout.")}
          title="Checkout seguro InfinitePay"
          allow="payment"
          className="h-full w-full border-0"
          style={{ minHeight: "520px" }}
        />
      </div>

      {/* Security footer */}
      <div className="flex flex-shrink-0 items-center justify-center gap-4 border-t border-white/5 bg-ink-900/60 px-5 py-3">
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
            <path
              d="M8 1L2 4v4c0 3.31 2.69 6 6 6s6-2.69 6-6V4L8 1z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M5.5 8l2 2 3-3"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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

      {/* Error fallback */}
      {errorMsg && (
        <div className="flex-shrink-0 bg-crimson-500/10 px-5 py-3 text-center text-[12px] text-crimson-400">
          {errorMsg}{" "}
          <button
            onClick={openInNewTab}
            className="underline underline-offset-2"
          >
            Abrir em nova aba
          </button>
        </div>
      )}
    </div>
  );
}
