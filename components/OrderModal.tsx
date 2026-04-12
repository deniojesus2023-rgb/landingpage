"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type Plan = "essencial" | "duplo";

type OrderModalProps = {
  open: boolean;
  plan: Plan;
  onClose: () => void;
};

const characters = [
  "Homem-Aranha",
  "Batman",
  "Homem de Ferro",
  "Elsa (Frozen)",
  "Hulk",
  "Mulher Maravilha",
  "Thor",
  "Capitão América",
  "Buzz Lightyear",
  "Moana",
  "Outro (informo na mensagem)",
];

const occasions = [
  "Aniversário",
  "Incentivo / conquista",
  "Motivação para comer / dormir",
  "Natal / Páscoa",
  "Só para alegrar o dia",
  "Outro",
];

function VideoFields({ index }: { index: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-400/20 text-[10px]">
          {index}
        </span>
        Vídeo {index}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nome da criança" placeholder="Ex: Lucas" required />
        <Field label="Idade" placeholder="Ex: 4" type="number" required />
        <Select label="Personagem" required options={characters} />
        <Select label="Ocasião" required options={occasions} />
      </div>
      <div className="mt-3">
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/60">
          Mensagem especial <span className="text-crimson-500">*</span>
        </label>
        <textarea
          rows={3}
          required
          placeholder="Ex: Lucas, o Homem-Aranha sabe que você é super corajoso. Continue sendo incrível!"
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:border-gold-400/60 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
        />
      </div>
      <div className="mt-3">
        <Field label="Data desejada para entrega (opcional)" type="date" />
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/60">
        {label} {required && <span className="text-crimson-500">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:border-gold-400/60 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
      />
    </div>
  );
}

function Select({
  label,
  options,
  required = false,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/60">
        {label} {required && <span className="text-crimson-500">*</span>}
      </label>
      <select
        required={required}
        defaultValue=""
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white focus:border-gold-400/60 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
      >
        <option value="" disabled className="bg-ink-900">
          Selecione…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink-900">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function OrderModal({ open, plan, onClose }: OrderModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const isDuplo = plan === "duplo";
  const price = isDuplo ? "147,00" : "97,00";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-950/80 px-4 py-10 backdrop-blur-xl"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-7 shadow-2xl sm:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,24,0.15),transparent_60%)]" />

            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            <div className="relative text-center">
              <div className="inline-block rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">
                Plano {isDuplo ? "Duplo" : "Essencial"}
              </div>
              <h2 className="mt-4 font-display text-3xl font-light leading-tight text-white">
                {isDuplo
                  ? "Personalize os 2 vídeos"
                  : "Personalize o vídeo"}
              </h2>
              <p className="mt-2 text-[13px] text-white/60">
                Preenchimento rápido — em {isDuplo ? "3" : "2"} minutos você finaliza.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "✅ Pedido recebido!\n\nRedirecionando para o checkout seguro...\n\n(Troque pela URL real de Hotmart/Kiwify/Pix)"
                );
              }}
              className="relative mt-8 space-y-5"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  📋 Seus dados
                </div>
                <div className="space-y-3">
                  <Field label="Seu nome" placeholder="Ex: Mariana Silva" required />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="WhatsApp"
                      placeholder="(11) 99999-9999"
                      type="tel"
                      required
                    />
                    <Field
                      label="E-mail"
                      placeholder="seu@email.com"
                      type="email"
                      required
                    />
                  </div>
                </div>
              </div>

              <VideoFields index={1} />
              {isDuplo && <VideoFields index={2} />}

              <button
                type="submit"
                className="btn-shimmer relative w-full overflow-hidden rounded-full bg-gradient-to-br from-crimson-500 via-crimson-600 to-[#b31520] py-5 text-[15px] font-bold text-white shadow-[0_10px_40px_rgba(255,59,71,0.5)] transition-transform hover:-translate-y-0.5"
              >
                <span className="relative flex items-center justify-center gap-2">
                  🔒 Finalizar pedido — R$ {price}
                </span>
              </button>

              <p className="text-center text-[11px] text-white/40">
                Pagamento 100% seguro · Garantia total de satisfação
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
