"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type ToastData = {
  id: number;
  name: string;
  city: string;
  character: string;
  action: string;
  minutesAgo: number;
  color: string;
  initials: string;
};

const NAMES = [
  "Mariana",
  "Juliana",
  "Camila",
  "Patrícia",
  "Fernanda",
  "Amanda",
  "Beatriz",
  "Rafael",
  "Thiago",
  "Bruno",
  "Gustavo",
  "Carolina",
  "Letícia",
  "Priscila",
  "Renata",
  "Vanessa",
  "Diego",
  "Leonardo",
  "Aline",
  "Débora",
];

const LAST_NAMES = ["S.", "C.", "M.", "R.", "L.", "P.", "O.", "A.", "N.", "B."];

const CITIES = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Porto Alegre",
  "Salvador",
  "Fortaleza",
  "Brasília",
  "Recife",
  "Campinas",
  "Florianópolis",
  "Goiânia",
  "Manaus",
  "Vitória",
  "Natal",
];

const CHARACTERS = [
  "Homem-Aranha",
  "Batman",
  "Elsa",
  "Hulk",
  "Thor",
  "Capitão América",
  "Moana",
  "Superman",
  "Mulher Maravilha",
  "Homem de Ferro",
  "Rapunzel",
  "Flash",
  "Buzz Lightyear",
];

const ACTIONS = [
  { text: "acabou de pedir um vídeo do", weight: 3 },
  { text: "finalizou o pedido do", weight: 2 },
  { text: "escolheu o plano Duplo com o", weight: 1 },
  { text: "recebeu o vídeo do", weight: 1, rating: true },
];

const AVATAR_COLORS = [
  "#FF3B47",
  "#7C5CFF",
  "#5EE7FF",
  "#F5C518",
  "#1DB954",
  "#FF8A5B",
  "#E0477B",
  "#4A9EFF",
];

function weighted<T extends { weight: number }>(arr: T[]): T {
  const total = arr.reduce((s, x) => s + x.weight, 0);
  let r = Math.random() * total;
  for (const item of arr) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return arr[0];
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateToast(id: number): ToastData {
  const name = pick(NAMES);
  const last = pick(LAST_NAMES);
  const fullName = `${name} ${last}`;
  return {
    id,
    name: fullName,
    city: pick(CITIES),
    character: pick(CHARACTERS),
    action: weighted(ACTIONS).text,
    minutesAgo: Math.floor(Math.random() * 14) + 1,
    color: pick(AVATAR_COLORS),
    initials: `${name[0]}${last[0]}`,
  };
}

const STORAGE_KEY = "heroivideo-toasts-dismissed";
const INITIAL_DELAY_MS = 12000; // 12s depois do load
const TOAST_VISIBLE_MS = 6500; // 6.5s na tela
const GAP_BETWEEN_MS = 9000; // 9s de intervalo

export function SocialProofToasts() {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [counter, setCounter] = useState(0);

  const isRating = useMemo(
    () => toast?.action.includes("recebeu"),
    [toast?.action]
  );

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setDismissed(true);
  }, []);

  // Main loop
  useEffect(() => {
    if (dismissed) return;

    let showTimeout: ReturnType<typeof setTimeout>;
    let hideTimeout: ReturnType<typeof setTimeout>;
    let nextTimeout: ReturnType<typeof setTimeout>;

    const scheduleNext = (delay: number) => {
      showTimeout = setTimeout(() => {
        // Pause if tab is hidden
        if (document.hidden) {
          scheduleNext(3000);
          return;
        }
        setCounter((c) => c + 1);
        setToast(generateToast(Date.now()));
        hideTimeout = setTimeout(() => {
          setToast(null);
          nextTimeout = setTimeout(() => scheduleNext(0), GAP_BETWEEN_MS);
        }, TOAST_VISIBLE_MS);
      }, delay);
    };

    // First toast delay
    scheduleNext(counter === 0 ? INITIAL_DELAY_MS : GAP_BETWEEN_MS);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed]);

  const handleDismiss = () => {
    setToast(null);
    setDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  if (dismissed) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-4 z-[90] sm:bottom-8 sm:left-6">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -60, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-auto relative flex max-w-[320px] items-center gap-3 overflow-hidden rounded-[7px] border border-white/10 bg-ink-900/90 p-3 pr-9 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            {/* Accent edge */}
            <div
              className="absolute left-0 top-0 h-full w-[3px]"
              style={{ background: toast.color }}
            />

            {/* Avatar */}
            <div
              className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${toast.color}, ${toast.color}aa)`,
              }}
            >
              {toast.initials}
              {/* Online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-ink-900 bg-emerald-400" />
              </span>
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-semibold text-white">
                {toast.name}{" "}
                <span className="font-normal text-white/50">
                  de {toast.city}
                </span>
              </div>
              <div className="mt-0.5 text-[11px] leading-snug text-white/70">
                {toast.action}{" "}
                <span className="font-semibold text-white">
                  {toast.character}
                </span>
                {isRating && (
                  <span className="ml-1 text-gold-400">⭐⭐⭐⭐⭐</span>
                )}
              </div>
              <div className="mt-1 text-[10px] font-medium text-white/40">
                há {toast.minutesAgo}{" "}
                {toast.minutesAgo === 1 ? "minuto" : "minutos"}
              </div>
            </div>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              aria-label="Não quero mais ver"
              className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-white/30 transition hover:bg-white/10 hover:text-white/80"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="h-3 w-3"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
