"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { QuizModal } from "@/components/QuizModal";
import type { PlanId } from "@/lib/checkout";

type QuizModalContextType = {
  openQuizModal: (plan: PlanId) => void;
  closeQuizModal: () => void;
};

const QuizModalContext = createContext<QuizModalContextType | null>(null);

export function useQuizModal() {
  const ctx = useContext(QuizModalContext);
  if (!ctx) {
    throw new Error("useQuizModal must be used within QuizModalProvider");
  }
  return ctx;
}

export function QuizModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("duplo");

  const openQuizModal = useCallback((plan: PlanId) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  }, []);

  const closeQuizModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <QuizModalContext.Provider value={{ openQuizModal, closeQuizModal }}>
      {children}
      <QuizModal open={isOpen} plan={selectedPlan} onClose={closeQuizModal} />
    </QuizModalContext.Provider>
  );
}
