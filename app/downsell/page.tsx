"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Lock, X, Zap } from "lucide-react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUpsellCheckout } from "@/lib/checkout";
import type { PlanId } from "@/lib/checkout";

/* ─────────────────────── INNER ─────────────────────── */
function DownsellInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = (searchParams.get("plan") as PlanId) ?? "essencial";
  const orderNsu = searchParams.get("order_nsu") ?? "";

  const [loading, setLoading] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [seconds, setSeconds] = useState(5 * 60); // 5 min countdown

  useEffect(() => {
    const t = setInterval(
      () => setSeconds((s) => (s > 0 ? s - 1 : 0)),
      1000,
    );
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const handleAccept = useCallback(async () => {
    setLoading(true);
    try {
      const url = await createUpsellCheckout({ type: "downsell", plan });
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  }, [plan]);

  const handleDecline = useCallback(() => {
    setDeclined(true);
    setTimeout(() => {
      router.push(`/obrigado?plan=${plan}&order_nsu=${orderNsu}`);
    }, 800);
  }, [router, plan, orderNsu]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060F]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(124,92,255,0.15),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400">
            <CheckCircle2 className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <div className="h-px w-8 bg-white/20" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[11px] text-white/30">
            <X className="h-3 w-3" strokeWidth={2} />
          </div>
          <div className="h-px w-8 bg-white/10" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-violet-500 bg-violet-500/20 text-[11px] font-bold text-violet-400">
            3
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-[12px] font-semibold text-violet-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
            Espera! Temos uma última oferta para você.
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center justify-center gap-2 rounded-full border border-crimson-500/30 bg-crimson-500/5 px-4 py-2 text-[12px] font-semibold text-crimson-500"
        >
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          Oferta expira em{" "}
          <span className="tabular-nums">
            {mm}:{ss}
          </span>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800"
        >
          {/* Card header */}
          <div className="border-b border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.15),transparent_65%)] p-8 text-center sm:p-10">
            <div className="text-4xl">🖼️</div>
            <h1 className="mx-auto mt-4 max-w-sm font-display text-3xl font-light leading-tight text-white">
              Pôster Cinematográfico por apenas{" "}
              <span className="text-violet-400">R$ 17</span>
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-white/60">
              Já que você não quis a oferta anterior, aqui vai uma última
              chance: adicione o pôster digital personalizado com o nome e o
              herói da criança por apenas R$ 17. Entregue junto com o vídeo.
            </p>
          </div>

          {/* What's included */}
          <div className="border-b border-white/10 p-8 sm:p-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
              O que está incluído
            </div>
            <ul className="mt-4 space-y-3">
              {[
                "Cartaz digital estilo pôster de filme",
                "Nome da criança em destaque",
                "Personagem favorito na arte",
                "Resolução 4K para impressão",
                "Entregue junto com o vídeo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px]">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-violet-600">
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      className="h-3 w-3 text-white"
                    >
                      <path
                        d="M2 6l3 3 5-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-[12px] text-white/40">Preço normal</div>
                <div className="font-display text-2xl font-light text-white/30 line-through">
                  R$ 50
                </div>
              </div>
              <div className="text-3xl text-white/20">→</div>
              <div className="text-center">
                <div className="text-[12px] text-violet-400">Só agora</div>
                <div className="font-display text-4xl font-light text-white">
                  R$ 17
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {!declined ? (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <button
                    onClick={handleAccept}
                    disabled={loading}
                    className="w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-8 py-4 text-[16px] font-bold text-white shadow-[0_0_30px_rgba(124,92,255,0.4)] transition hover:shadow-[0_0_50px_rgba(124,92,255,0.6)] disabled:opacity-70"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Processando...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4" strokeWidth={2.5} />
                          Sim! Quero o pôster por R$ 17
                        </>
                      )}
                    </span>
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-white/30">
                    <Lock className="h-3 w-3" strokeWidth={1.75} />
                    Pagamento seguro · Sem reentrada de dados
                  </p>
                  <button
                    onClick={handleDecline}
                    className="w-full text-center text-[12px] text-white/30 underline underline-offset-2 transition hover:text-white/50"
                  >
                    Não, obrigado. Ir para a confirmação do pedido.
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="declined"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[14px] text-white/50"
                >
                  Redirecionando para a confirmação...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

/* ─────────────────────── PAGE ─────────────────────── */
export default function DownsellPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#05060F]">
          <div className="text-[13px] text-white/40">Carregando...</div>
        </main>
      }
    >
      <DownsellInner />
    </Suspense>
  );
}
