"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { OrderModal } from "@/components/OrderModal";
import type { PlanId } from "@/lib/checkout";

type OrderModalContextType = {
  isOpen: boolean;
  openOrderModal: (plan: PlanId) => void;
  closeOrderModal: () => void;
};

const OrderModalContext = createContext<OrderModalContextType | null>(null);

export function useOrderModal() {
  const ctx = useContext(OrderModalContext);
  if (!ctx) {
    throw new Error("useOrderModal must be used within OrderModalProvider");
  }
  return ctx;
}

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("duplo");

  const openOrderModal = useCallback((plan: PlanId) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  }, []);

  const closeOrderModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <OrderModalContext.Provider value={{ isOpen, openOrderModal, closeOrderModal }}>
      {children}
      <OrderModal open={isOpen} plan={selectedPlan} onClose={closeOrderModal} />
    </OrderModalContext.Provider>
  );
}
