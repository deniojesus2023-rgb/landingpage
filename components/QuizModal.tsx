"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { PlanId } from "@/lib/checkout";
import { openWhatsApp } from "@/lib/whatsapp";

/* ─────────────────────── TYPES ─────────────────────── */
type QuizAnswer = {
  step1_age?: string;
  step2_character?: string;
  step3_occasion?: string;
  step4_who?: string;
};

/* ─────────────────────── QUIZ DATA ─────────────────────── */
const STEPS = [
  {
    id: "step1_age",
    question: "Qual a idade da criança?",
    emoji: "🎂",
    subtitle: "Isso nos ajuda a personalizar o roteiro com a linguagem certa.",
    options: [
      { label: "2 a 4 anos", value: "2-4" },
      { label: "5 a 7 anos", value: "5-7" },
      { label: "8 a 10 anos", value: "8-10" },
      { label: "11 anos ou mais", value: "11+" },
    ],
  },
  {
    id: "step2_character",
    question: "Qual o personagem favorito?",
    emoji: "🦸",
    subtitle: "Temos mais de 20 heróis e personagens disponíveis.",
    options: [
      { label: "Spider-Man", value: "spider-man" },
      { label: "Frozen / Elsa", value: "elsa" },
      { label: "Batman / Superman", value: "dc" },
      { label: "Moana / Disney", value: "disney" },
      { label: "Hulk / Vingadores", value: "marvel" },
      { label: "Outro personagem", value: "outro" },
    ],
  },
  {
    id: "step3_occasion",
    question: "Qual é o motivo do presente?",
    emoji: "🎁",
    subtitle: "Vamos adaptar a mensagem para o momento especial.",
    options: [
      { label: "Aniversário", value: "aniversario" },
      { label: "Natal / Ano Novo", value: "natal" },
      { label: "Dia das Crianças", value: "dia-criancas" },
      { label: "Conquista / Incentivo", value: "conquista" },
      { label: "Só porque amo muito", value: "amor" },
      { label: "Outro motivo", value: "outro" },
    ],
  },
  {
    id: "step4_who",
    question: "Quem vai receber o vídeo?",
    emoji: "💛",
    subtitle: "Para finalizarmos a personalização do roteiro.",
    options: [
      { label: "Meu filho(a)", value: "filho" },
      { label: "Meu neto(a)", value: "neto" },
      { label: "Meu sobrinho(a)", value: "sobrinho" },
      { label: "Filho(a) de amigo(a)", value: "amigo" },
    ],
  },
];

/* ─────────────────────── COMPONENT ─────────────────────── */
export function QuizModal({
  open,
  plan,
  onClose,
}: {
  open: boolean;
  plan: PlanId;
  onClose: () => void;
}) {

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  // Reset ao abrir
  useEffect(() => {
    if (open) {
      setStep(0);
      setAnswers({});
      setSelected(null);
    }
  }, [open]);

  // Fechar com ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const currentStep = STEPS[step];
  const totalSteps = STEPS.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleSelect = useCallback(
    (value: string) => {
      setSelected(value);
      const updatedAnswers = {
        ...answers,
        [currentStep.id]: value,
      } as QuizAnswer;
      setAnswers(updatedAnswers);

      setTimeout(() => {
        if (step < totalSteps - 1) {
          setDirection(1);
          setStep((s) => s + 1);
          setSelected(null);
        } else {
          // Último passo: redireciona para o WhatsApp com mensagem do plano
          onClose();
          setTimeout(() => {
            openWhatsApp(plan);
          }, 200);
        }
      }, 350);
    },
    [answers, currentStep.id, step, totalSteps, onClose, plan],
  );

  const handleBack = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
      setSelected(null);
    }
  }, [step]);

  const planLabel = plan === "duplo" ? "Plano Duplo" : "Plano Essencial";
  const planPrice = plan === "duplo" ? "R$ 97" : "R$ 47";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="quiz-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink-950/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="quiz-modal"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-x-4 bottom-0 top-0 z-[70] mx-auto my-auto flex max-h-[90vh] max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/20 hover:text-white"
                    aria-label="Voltar"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                  </button>
                )}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">
                    {planLabel} · {planPrice}
                  </div>
                  <div className="text-[12px] text-white/40">
                    Passo {step + 1} de {totalSteps}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/20 hover:text-white"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-gold-400"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* Question */}
                  <div className="text-center">
                    <div className="text-4xl">{currentStep.emoji}</div>
                    <h2 className="mt-4 font-display text-2xl font-light text-white sm:text-3xl">
                      {currentStep.question}
                    </h2>
                    <p className="mt-2 text-[13px] text-white/50">
                      {currentStep.subtitle}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {currentStep.options.map((opt) => {
                      const isSelected = selected === opt.value;
                      return (
                        <motion.button
                          key={opt.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelect(opt.value)}
                          className={`relative flex items-center justify-between gap-2 overflow-hidden rounded-xl border px-4 py-3.5 text-left text-[14px] font-medium transition-all ${
                            isSelected
                              ? "border-blue-500/60 bg-blue-500/15 text-white"
                              : "border-white/10 bg-white/[0.04] text-white/80 hover:border-white/20 hover:bg-white/[0.07]"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500"
                            >
                              <ArrowRight
                                className="h-3 w-3 text-white"
                                strokeWidth={2.5}
                              />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 px-6 py-4">
              <p className="text-center text-[11px] text-white/30">
                Suas respostas ajudam a personalizar o roteiro do vídeo.
                <br />
                Não compartilhamos seus dados.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
