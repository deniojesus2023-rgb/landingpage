"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  MessageCircle,
  Zap,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  getDownsellUrl,
  getUpsellUrl,
  type PlanId,
} from "@/lib/checkout";
import { ShinyButton } from "@/components/ui/shiny-button";

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
  const isUrgent = secondsLeft <= 60;

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
    <main className="relative min-h-screen overflow-hidden bg-[#05060F]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05060F] via-[#0A0B1A] to-[#05060F]" />
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,157,241,0.12),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(79,181,247,0.08),transparent_55%)]"
          style={{ backgroundSize: "200% 200%" }}
        />
        <div className="grain" />
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
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_60px_rgba(52,211,153,0.4)]"
              >
                <CheckCircle2
                  className="h-12 w-12 text-white"
                  strokeWidth={2.5}
                />
              </motion.div>
              <h1 className="font-display mt-8 text-4xl font-medium leading-[1.05] text-white sm:text-5xl">
                Pagamento <span className="text-gradient-gold">confirmado!</span>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
                Obrigado pela confiança. A gente já começou a preparar o vídeo do
                seu pequeno.
              </p>
              <div className="mt-8 text-[11px] text-white/40">
                Preparando uma proposta especial pra você...
              </div>
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#1E9DF1] to-[#4FB5F7]"
              />
            </motion.div>
          )}

          {stage === "upsell" && (
            <motion.div
              key="upsell"
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full max-w-[440px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0F1128] to-[#0A0B1A] shadow-2xl shadow-black/50"
            >
              {/* Glow effect top */}
              <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-60 -translate-x-1/2 rounded-full bg-[#1E9DF1]/20 blur-[80px]" />
              
              {/* Grain overlay */}
              <div className="grain" />

              <div className="relative px-7 pb-7 pt-9 sm:px-7">
                {/* Badge topo */}
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1E9DF1]/30 bg-[#1E9DF1]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-[#4FB5F7]"
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4FB5F7]" />
                    Só aqui · só agora
                  </motion.div>
                </div>

                {/* Headline */}
                <h2 className="font-display mt-5 text-balance text-center text-[22px] font-medium leading-[1.35] text-white">
                  Espera! Antes de sair,{" "}
                  <span className="text-gradient-gold">libera pra mim?</span>
                </h2>

                {plan === "essencial" ? (
                  <>
                    <p className="mx-auto mt-3 max-w-md text-center text-[15px] leading-[1.75] text-white/60">
                      Já que você acabou de pedir o Essencial, posso te oferecer
                      algo que <strong className="font-medium text-white">só aparece agora</strong>:
                      adicionar um <strong className="font-medium text-white">segundo vídeo</strong>{" "}
                      (pra outro filho, pra outro momento, pra outra data) por
                      apenas <strong className="font-medium text-[#4FB5F7]">+R$ 50</strong>.
                    </p>
                    <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-[13px] leading-[1.6] text-white/60">
                      Pagando separado seria R$ 47 a mais — mas como você já é
                      cliente, a gente libera um desconto de fato. <strong className="font-medium text-white">Comprando agora, cada vídeo sai por menos da metade do preço do Essencial.</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mx-auto mt-3 max-w-md text-center text-[15px] leading-[1.75] text-white/60">
                      Você pediu o Duplo — perfeito. Quer{" "}
                      <strong className="font-medium text-white">
                        receber os 2 vídeos em 24h
                      </strong>{" "}
                      (em vez de 48h) + o{" "}
                      <strong className="font-medium text-white">
                        Pôster Cinematográfico digital
                      </strong>
                      ? Tudo junto por apenas{" "}
                      <strong className="font-medium text-[#4FB5F7]">+R$ 47</strong>.
                    </p>
                    <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-[13px] leading-[1.6] text-white/60">
                      A entrega VIP 24h vale R$ 47 sozinha. O pôster vale R$ 50.
                      Hoje você leva os dois pelo preço de um.
                    </div>
                  </>
                )}

                {/* Countdown */}
                <div className="mt-5 flex items-center justify-center gap-2 rounded-[10px] border border-white/10 bg-white/5 px-4 py-2.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="9" r="5.5" stroke={isUrgent ? "#F87171" : "#1E9DF1"} strokeWidth="1.2"/>
                    <path d="M8 6.5V9l1.5 1.5" stroke={isUrgent ? "#F87171" : "#1E9DF1"} strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M6 2.5h4M8 2.5V4" stroke={isUrgent ? "#F87171" : "#1E9DF1"} strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[13px] text-white/60">
                    Oferta expira em
                  </span>
                  <span className={`min-w-[44px] text-[16px] font-medium tabular-nums ${isUrgent ? "text-red-400" : "text-white"}`}>
                    {mm}:{ss}
                  </span>
                </div>

                {/* CTAs */}
                <div className="mt-5 flex flex-col gap-2.5">
                  <ShinyButton
                    onClick={handleAcceptUpsell}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[7px] bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 px-4 py-4 text-[16px] font-bold leading-none text-white shadow-glow-blue"
                  >
                    {plan === "essencial"
                      ? "Sim! Quero adicionar o 2º vídeo"
                      : "Sim! Quero entrega VIP + pôster"}
                    <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
                  </ShinyButton>
                  <button
                    onClick={handleRejectUpsell}
                    className="w-full bg-transparent px-4 py-2.5 text-center text-[13px] text-white/40 underline underline-offset-[3px] transition hover:text-white/60"
                  >
                    Não, obrigado — seguir sem o extra
                  </button>
                </div>

                {/* Trust */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-4">
                  <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1.5C4.3 3 1.5 3.5 1.5 3.5S1 9 6.5 11.5C12 9 11.5 3.5 11.5 3.5S8.7 3 6.5 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                      <path d="M4 6.5l1.8 1.8 3-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Pagamento seguro
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1.5l1.2 3.2H11l-2.6 1.9.9 3.1L6.5 7.8 3.7 9.7l.9-3.1L2 4.7h3.3L6.5 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                    </svg>
                    Garantia de 14 dias
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1.5" y="4" width="10" height="7.5" rx="1.2" stroke="currentColor" strokeWidth="1.1"/>
                      <path d="M4.5 4V3a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.1"/>
                      <circle cx="6.5" cy="7.5" r=".8" fill="currentColor"/>
                    </svg>
                    Entrega em 24h
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "downsell" && (
            <motion.div
              key="downsell"
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full max-w-[440px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0F1128] to-[#0A0B1A] shadow-2xl shadow-black/50"
            >
              {/* Glow effect top - violet for downsell */}
              <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-60 -translate-x-1/2 rounded-full bg-violet-500/15 blur-[80px]" />
              
              {/* Grain overlay */}
              <div className="grain" />

              <div className="relative px-7 pb-7 pt-9 sm:px-7">
                {/* Badge topo */}
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-violet-400"
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                    Última chance
                  </motion.div>
                </div>

                {/* Headline */}
                <h2 className="font-display mt-5 text-balance text-center text-[22px] font-medium leading-[1.35] text-white">
                  Entendi — e se fosse só{" "}
                  <span className="text-gradient-gold">R$ 17?</span>
                </h2>

                <p className="mx-auto mt-3 max-w-md text-center text-[15px] leading-[1.75] text-white/60">
                  Sem problema em pular o extra. Mas ainda posso te oferecer só o{" "}
                  <strong className="font-medium text-white">
                    Pôster Cinematográfico digital
                  </strong>{" "}
                  (normalmente R$ 50) por apenas{" "}
                  <strong className="font-medium text-[#4FB5F7]">R$ 17</strong>. É um cartaz
                  personalizado estilo filme com o nome e o herói da criança — pronto
                  pra imprimir ou usar de papel de parede do celular.
                </p>

                {/* Countdown */}
                <div className="mt-5 flex items-center justify-center gap-2 rounded-[10px] border border-white/10 bg-white/5 px-4 py-2.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="9" r="5.5" stroke={isUrgent ? "#F87171" : "#1E9DF1"} strokeWidth="1.2"/>
                    <path d="M8 6.5V9l1.5 1.5" stroke={isUrgent ? "#F87171" : "#1E9DF1"} strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M6 2.5h4M8 2.5V4" stroke={isUrgent ? "#F87171" : "#1E9DF1"} strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[13px] text-white/60">
                    Última chance · expira em
                  </span>
                  <span className={`min-w-[44px] text-[16px] font-medium tabular-nums ${isUrgent ? "text-red-400" : "text-white"}`}>
                    {mm}:{ss}
                  </span>
                </div>

                {/* CTAs */}
                <div className="mt-5 flex flex-col gap-2.5">
                  <ShinyButton
                    onClick={handleAcceptDownsell}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[7px] bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 px-4 py-4 text-[16px] font-bold leading-none text-white shadow-glow-blue"
                  >
                    Ok, quero o pôster por R$ 17
                    <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
                  </ShinyButton>
                  <button
                    onClick={handleRejectDownsell}
                    className="w-full bg-transparent px-4 py-2.5 text-center text-[13px] text-white/40 underline underline-offset-[3px] transition hover:text-white/60"
                  >
                    Não, obrigado — finalizar pedido
                  </button>
                </div>

                {/* Trust */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-4">
                  <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1.5C4.3 3 1.5 3.5 1.5 3.5S1 9 6.5 11.5C12 9 11.5 3.5 11.5 3.5S8.7 3 6.5 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                      <path d="M4 6.5l1.8 1.8 3-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Pagamento seguro
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1.5l1.2 3.2H11l-2.6 1.9.9 3.1L6.5 7.8 3.7 9.7l.9-3.1L2 4.7h3.3L6.5 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                    </svg>
                    Garantia de 14 dias
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1.5" y="4" width="10" height="7.5" rx="1.2" stroke="currentColor" strokeWidth="1.1"/>
                      <path d="M4.5 4V3a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.1"/>
                      <circle cx="6.5" cy="7.5" r=".8" fill="currentColor"/>
                    </svg>
                    Entrega em 24h
                  </span>
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
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#1E9DF1] to-[#4FB5F7] shadow-[0_0_60px_rgba(30,157,241,0.4)]"
              >
                <Heart className="h-12 w-12 text-white" strokeWidth={2.5} />
              </motion.div>
              <h1 className="font-display mt-8 text-4xl font-medium leading-[1.05] text-white sm:text-5xl">
                Tudo certo, <span className="text-gradient-gold">prontinho!</span>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
                Em alguns minutos você vai receber um WhatsApp da nossa equipe com
                os próximos passos: formulário com o nome da criança, herói
                escolhido e a mensagem. Depois é só aguardar a entrega.
              </p>

              <div className="mx-auto mt-10 grid max-w-md gap-3">
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left">
                  <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#4FB5F7]" strokeWidth={2} />
                  <div className="text-[13px] text-white/60">
                    <strong className="font-medium text-white">Entrega em até 48h</strong>{" "}
                    após o formulário preenchido (24h no Duplo VIP).
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left">
                  <Heart className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" strokeWidth={2} />
                  <div className="text-[13px] text-white/60">
                    <strong className="font-medium text-white">Garantia de 14 dias</strong>{" "}
                    — refazemos ou devolvemos 100% sem perguntas.
                  </div>
                </div>
                <a
                  href="https://wa.me/5511911346396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-[13px] font-semibold text-emerald-400 transition hover:bg-emerald-400/15"
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
        <main className="flex min-h-screen items-center justify-center bg-[#05060F]">
          <div className="text-[13px] text-white/40">Carregando...</div>
        </main>
      }
    >
      <ObrigadoInner />
    </Suspense>
  );
}
