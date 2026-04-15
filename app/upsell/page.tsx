"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Lock, Sparkles, X, Zap } from "lucide-react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUpsellCheckout } from "@/lib/checkout";
import type { PlanId } from "@/lib/checkout";

/* ─────────────────────── INNER ─────────────────────── */
function UpsellInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = (searchParams.get("plan") as PlanId) ?? "essencial";
  const orderNsu = searchParams.get("order_nsu") ?? "";

  const [loading, setLoading] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [seconds, setSeconds] = useState(10 * 60); // 10 min countdown

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
      const url = await createUpsellCheckout({ type: "upsell", plan });
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  }, [plan]);

  const handleDecline = useCallback(() => {
    setDeclined(true);
    // Redireciona para downsell após 1s
    setTimeout(() => {
      router.push(`/downsell?plan=${plan}&order_nsu=${orderNsu}`);
    }, 1000);
  }, [router, plan, orderNsu]);

  const isEssencial = plan === "essencial";

  const upsellTitle = isEssencial
    ? "Adicione um 2º vídeo por apenas +R$ 50"
    : "Entrega VIP em 24h + Pôster por apenas +R$ 47";

  const upsellDescription = isEssencial
    ? "Você acabou de garantir 1 vídeo incrível. Mas e se a criança tiver um segundo herói favorito? Ou se você quiser guardar um para uma data futura? Adicione agora com desconto exclusivo — essa oferta some quando você sair desta página."
    : "Seus 2 vídeos já estão garantidos! Agora você pode turbinar a experiência: receba em 24h com prioridade máxima e ainda ganhe um pôster cinematográfico personalizado. Essa oferta é exclusiva para quem acabou de comprar.";

  const upsellItems = isEssencial
    ? [
        "2º vídeo personalizado completo em HD",
        "Herói e mensagem totalmente independentes",
        "Ideal para 2 filhos ou 2 ocasiões diferentes",
        "Entregue junto com o 1º vídeo em até 48h",
      ]
    : [
        "Entrega VIP com prioridade máxima de produção",
        "Vídeos prontos no dia seguinte (24h)",
        "Pôster cinematográfico digital personalizado",
        "Cartaz estilo filme com o nome da criança",
      ];

  const upsellPrice = isEssencial ? "R$ 50" : "R$ 47";
  const upsellOldPrice = isEssencial ? "R$ 97" : "R$ 97";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060F]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(30,157,241,0.18),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400">
            <CheckCircle2 className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <div className="h-px w-8 bg-white/20" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gold-400 bg-gold-400/20 text-[11px] font-bold text-gold-400">
            2
          </div>
          <div className="h-px w-8 bg-white/10" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[11px] text-white/30">
            3
          </div>
        </div>

        {/* Confirmation badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[12px] font-semibold text-emerald-400"
        >
          <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
          Pedido confirmado! Confira esta oferta exclusiva antes de continuar.
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center justify-center gap-2 rounded-full border border-crimson-500/30 bg-crimson-500/5 px-4 py-2 text-[12px] font-semibold text-crimson-500"
        >
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          Esta oferta expira em{" "}
          <span className="tabular-nums">
            {mm}:{ss}
          </span>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-gold-400/30 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800"
        >
          {/* Card header */}
          <div className="border-b border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(30,157,241,0.18),transparent_65%)] p-8 text-center sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-400">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              Oferta exclusiva · Só aparece aqui
            </div>
            <h1 className="mx-auto mt-5 max-w-md font-display text-3xl font-light leading-tight text-white sm:text-4xl">
              {upsellTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
              {upsellDescription}
            </p>
          </div>

          {/* Items */}
          <div className="border-b border-white/10 p-8 sm:p-10">
            <ul className="space-y-3.5">
              {upsellItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px]">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600">
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
                  {upsellOldPrice}
                </div>
              </div>
              <div className="text-3xl text-white/20">→</div>
              <div className="text-center">
                <div className="text-[12px] text-emerald-400">
                  Adicionar agora
                </div>
                <div className="font-display text-4xl font-light text-white">
                  {upsellPrice}
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
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 px-8 py-4 text-[16px] font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] transition hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] disabled:opacity-70"
                  >
                    <span className="relative flex items-center justify-center gap-2">
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
                          Sim! Adicionar com 1 clique
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
                    Não, obrigado. Quero continuar sem esta oferta.
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="declined"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[14px] text-white/50"
                >
                  Tudo bem! Redirecionando...
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
export default function UpsellPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#05060F]">
          <div className="text-[13px] text-white/40">Carregando...</div>
        </main>
      }
    >
      <UpsellInner />
    </Suspense>
  );
}
