"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Gift,
  Heart,
  MessageCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  getDownsellUrl,
  getUpsellUrl,
  type PlanId,
} from "@/lib/checkout";

type Stage = "success" | "upsell" | "downsell" | "done";

function ObrigadoInner() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const plan: PlanId = planParam === "duplo" ? "duplo" : "essencial";

  // Se a URL já contém upsell=ok ou downsell=ok, pula direto pro estágio final
  const initialStage: Stage = (() => {
    if (searchParams.get("upsell") === "ok") return "done";
    if (searchParams.get("downsell") === "ok") return "done";
    return "success";
  })();

  const [stage, setStage] = useState<Stage>(initialStage);
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 min

  // Countdown só durante upsell / downsell
  useEffect(() => {
    if (stage !== "upsell" && stage !== "downsell") return;
    const i = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(i);
  }, [stage]);

  // Auto-advance do "success" pro upsell depois de 2s
  useEffect(() => {
    if (stage !== "success") return;
    const t = setTimeout(() => setStage("upsell"), 2500);
    return () => clearTimeout(t);
  }, [stage]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const handleAcceptUpsell = () => {
    window.location.href = getUpsellUrl(plan);
  };

  const handleRejectUpsell = () => {
    setStage("downsell");
    setSecondsLeft(600);
  };

  const handleAcceptDownsell = () => {
    window.location.href = getDownsellUrl(plan);
  };

  const handleRejectDownsell = () => {
    setStage("done");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950" />
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,157,241,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(124,92,255,0.15),transparent_55%)]"
          style={{ backgroundSize: "200% 200%" }}
        />
        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-5 py-16 sm:px-8">
        <AnimatePresence mode="wait">
          {stage === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_60px_rgba(29,185,84,0.5)]"
              >
                <CheckCircle2
                  className="h-12 w-12 text-white"
                  strokeWidth={2.5}
                />
              </motion.div>
              <h1 className="mt-8 font-display text-4xl font-light leading-[1.05] text-white sm:text-5xl">
                Pagamento <span className="text-gradient-gold italic">confirmado!</span>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
                Obrigado pela confiança. A gente já começou a preparar o vídeo do
                seu pequeno.
              </p>
              <div className="mt-8 text-[11px] text-white/40">
                Preparando uma proposta especial pra você...
              </div>
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
              />
            </motion.div>
          )}

          {stage === "upsell" && (
            <motion.div
              key="upsell"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full overflow-hidden rounded-[12px] border border-gold-400/40 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-7 shadow-[0_40px_120px_rgba(30,157,241,0.35)] sm:p-10"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />
                <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-crimson-500/15 blur-3xl" />
              </div>
              <div className="relative">
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">
                    <Gift className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Só aqui · só agora
                  </div>
                </div>
                <h2 className="mt-6 text-balance text-center font-display text-3xl font-light leading-[1.05] text-white sm:text-4xl">
                  Espera! Antes de sair,{" "}
                  <span className="text-gradient-gold italic">libera pra mim?</span>
                </h2>

                {plan === "essencial" ? (
                  <>
                    <p className="mx-auto mt-5 max-w-md text-center text-[15px] leading-relaxed text-white/75">
                      Já que você acabou de pedir o Essencial, posso te oferecer
                      algo que <strong className="text-white">só aparece agora</strong>:
                      adicionar um <strong className="text-white">segundo vídeo</strong>{" "}
                      (pra outro filho, pra outro momento, pra outra data) por
                      apenas <strong className="text-gold-400">+R$ 50</strong>.
                    </p>
                    <div className="mt-5 rounded-[9px] border border-white/10 bg-white/[0.03] p-4 text-[13px] text-white/65">
                      Pagando separado seria R$ 47 a mais — mas como você já é
                      cliente, a gente libera um desconto de fato. <strong className="text-white">Comprando agora, cada vídeo sai por menos da metade do preço do Essencial.</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mx-auto mt-5 max-w-md text-center text-[15px] leading-relaxed text-white/75">
                      Você pediu o Duplo — perfeito. Quer{" "}
                      <strong className="text-white">
                        receber os 2 vídeos em 24h
                      </strong>{" "}
                      (em vez de 48h) + o{" "}
                      <strong className="text-white">
                        Pôster Cinematográfico digital
                      </strong>
                      ? Tudo junto por apenas{" "}
                      <strong className="text-gold-400">+R$ 47</strong>.
                    </p>
                    <div className="mt-5 rounded-[9px] border border-white/10 bg-white/[0.03] p-4 text-[13px] text-white/65">
                      A entrega VIP 24h vale R$ 47 sozinha. O pôster vale R$ 50.
                      Hoje você leva os dois pelo preço de um.
                    </div>
                  </>
                )}

                {/* Countdown */}
                <div className="mt-6 flex items-center justify-center gap-2 rounded-full border border-crimson-500/30 bg-crimson-500/5 py-2 text-[12px] font-semibold text-crimson-500">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Oferta expira em{" "}
                  <span className="font-display tabular-nums text-white">
                    {mm}:{ss}
                  </span>
                </div>

                <div className="mt-7 flex flex-col gap-3">
                  <button
                    onClick={handleAcceptUpsell}
                    className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-[9px] bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-7 py-4 text-[15px] font-bold text-ink-950 shadow-[0_12px_40px_rgba(30,157,241,0.5)] transition active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <Sparkles className="relative h-4 w-4" strokeWidth={2} />
                    <span className="relative">
                      {plan === "essencial"
                        ? "Sim! Quero adicionar o 2º vídeo"
                        : "Sim! Quero entrega VIP + pôster"}
                    </span>
                  </button>
                  <button
                    onClick={handleRejectUpsell}
                    className="text-center text-[12px] text-white/40 transition hover:text-white/60"
                  >
                    Não, obrigado — seguir sem o extra
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "downsell" && (
            <motion.div
              key="downsell"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full overflow-hidden rounded-[12px] border border-white/15 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-7 shadow-2xl sm:p-10"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
              </div>
              <div className="relative">
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-violet-500">
                    Última chance
                  </div>
                </div>
                <h2 className="mt-6 text-balance text-center font-display text-3xl font-light leading-[1.05] text-white sm:text-4xl">
                  Entendi — e se fosse só{" "}
                  <span className="text-gradient-gold italic">R$ 17?</span>
                </h2>
                <p className="mx-auto mt-5 max-w-md text-center text-[15px] leading-relaxed text-white/75">
                  Sem problema em pular o extra. Mas ainda posso te oferecer só o{" "}
                  <strong className="text-white">
                    Pôster Cinematográfico digital
                  </strong>{" "}
                  (normalmente R$ 50) por apenas{" "}
                  <strong className="text-gold-400">R$ 17</strong>. É um cartaz
                  personalizado estilo filme com o nome e o herói da criança — pronto
                  pra imprimir ou usar de papel de parede do celular.
                </p>

                <div className="mt-6 flex items-center justify-center gap-2 rounded-full border border-crimson-500/30 bg-crimson-500/5 py-2 text-[12px] font-semibold text-crimson-500">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Última chance · expira em{" "}
                  <span className="font-display tabular-nums text-white">
                    {mm}:{ss}
                  </span>
                </div>

                <div className="mt-7 flex flex-col gap-3">
                  <button
                    onClick={handleAcceptDownsell}
                    className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-[9px] bg-gradient-to-br from-violet-500 to-[#5a3eff] px-7 py-4 text-[15px] font-bold text-white shadow-[0_12px_40px_rgba(124,92,255,0.5)] transition active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <Sparkles className="relative h-4 w-4" strokeWidth={2} />
                    <span className="relative">Ok, quero o pôster por R$ 17</span>
                  </button>
                  <button
                    onClick={handleRejectDownsell}
                    className="text-center text-[12px] text-white/40 transition hover:text-white/60"
                  >
                    Não, obrigado — finalizar pedido
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_0_60px_rgba(30,157,241,0.5)]"
              >
                <Heart className="h-12 w-12 text-ink-950" strokeWidth={2.5} />
              </motion.div>
              <h1 className="mt-8 font-display text-4xl font-light leading-[1.05] text-white sm:text-5xl">
                Tudo certo, <span className="text-gradient-gold italic">prontinho!</span>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
                Em alguns minutos você vai receber um WhatsApp da nossa equipe com
                os próximos passos: formulário com o nome da criança, herói
                escolhido e a mensagem. Depois é só aguardar a entrega.
              </p>

              <div className="mx-auto mt-10 grid max-w-md gap-3">
                <div className="flex items-start gap-3 rounded-[9px] border border-white/10 bg-white/[0.03] p-4 text-left">
                  <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" strokeWidth={2} />
                  <div className="text-[13px] text-white/70">
                    <strong className="text-white">Entrega em até 48h</strong>{" "}
                    após o formulário preenchido (24h no Duplo VIP).
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[9px] border border-white/10 bg-white/[0.03] p-4 text-left">
                  <Heart className="mt-0.5 h-4 w-4 flex-shrink-0 text-crimson-500" strokeWidth={2} />
                  <div className="text-[13px] text-white/70">
                    <strong className="text-white">Garantia de 14 dias</strong>{" "}
                    — refazemos ou devolvemos 100% sem perguntas.
                  </div>
                </div>
                <a
                  href="https://wa.me/5511911346396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-[9px] border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-[13px] font-semibold text-emerald-400 transition hover:bg-emerald-400/15"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2} />
                  Fale com a gente no WhatsApp
                </a>
              </div>

              <Link
                href="/"
                className="mt-10 inline-block text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40 transition hover:text-white"
              >
                ← Voltar pra página inicial
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-ink-950">
          <div className="text-[13px] text-white/40">Carregando…</div>
        </main>
      }
    >
      <ObrigadoInner />
    </Suspense>
  );
}
