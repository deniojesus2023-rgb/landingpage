"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Backpack,
  Bath,
  Cake,
  HeartCrack,
  Lock,
  Moon,
  Salad,
  Sparkles,
  Syringe,
  Trophy,
  X as XIcon,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ShinyButton } from "./ui/shiny-button";

type Plan = "essencial" | "duplo";

type OrderModalProps = {
  open: boolean;
  plan: Plan;
  onClose: () => void;
};

type VideoData = {
  childName: string;
  childAge: string;
  childNickname: string;
  character: string;
  otherCharacter: string;
  reason: string;
  message: string;
  insideJoke: string;
  deliveryDate: string;
};

type FormData = {
  parentName: string;
  whatsapp: string;
  email: string;
  videos: VideoData[];
  bumpPoster: boolean;
  consent: boolean;
};

const BUMP_POSTER_PRICE = 17;

const characters: { name: string }[] = [
  { name: "Homem-Aranha" },
  { name: "Batman" },
  { name: "Superman" },
  { name: "Homem de Ferro" },
  { name: "Hulk" },
  { name: "Capitão América" },
  { name: "Thor" },
  { name: "Mulher Maravilha" },
  { name: "Flash" },
  { name: "Elsa (Frozen)" },
  { name: "Moana" },
  { name: "Rapunzel" },
  { name: "Branca de Neve" },
  { name: "Buzz Lightyear" },
  { name: "Outro" },
];

const reasons: { key: string; Icon: LucideIcon; label: string }[] = [
  { key: "banho", Icon: Bath, label: "Não quer tomar banho" },
  { key: "medico", Icon: Syringe, label: "Medo de médico / vacina" },
  { key: "dormir", Icon: Moon, label: "Medo de dormir sozinho" },
  { key: "comida", Icon: Salad, label: "Não come direito" },
  { key: "aniversario", Icon: Cake, label: "Aniversário" },
  { key: "saudade", Icon: HeartCrack, label: "Saudade / mudança" },
  { key: "escola", Icon: Backpack, label: "Primeiro dia de escola" },
  { key: "incentivo", Icon: Trophy, label: "Conquista / incentivo" },
  { key: "alegrar", Icon: Sparkles, label: "Só pra alegrar o dia" },
  { key: "outro", Icon: Sparkles, label: "Outro motivo" },
];

const emptyVideo: VideoData = {
  childName: "",
  childAge: "",
  childNickname: "",
  character: "",
  otherCharacter: "",
  reason: "",
  message: "",
  insideJoke: "",
  deliveryDate: "",
};

export function OrderModal({ open, plan, onClose }: OrderModalProps) {
  const isDuplo = plan === "duplo";
  const basePrice = isDuplo ? 147 : 97;
  const price = isDuplo ? "147,00" : "97,00";
  const videoCount = isDuplo ? 2 : 1;

  // Steps: 0 = parent info, 1..videoCount = each video, videoCount+1 = review
  const totalSteps = videoCount + 2;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    parentName: "",
    whatsapp: "",
    email: "",
    videos: Array.from({ length: videoCount }, () => ({ ...emptyVideo })),
    bumpPoster: false,
    consent: false,
  });

  // Reset when plan changes or modal opens
  useEffect(() => {
    if (open) {
      setStep(0);
      setForm({
        parentName: "",
        whatsapp: "",
        email: "",
        videos: Array.from({ length: videoCount }, () => ({ ...emptyVideo })),
        bumpPoster: false,
        consent: false,
      });
    }
  }, [open, videoCount]);

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

  const progress = ((step + 1) / totalSteps) * 100;

  const totalPrice = basePrice + (form.bumpPoster && !isDuplo ? BUMP_POSTER_PRICE : 0);
  const totalPriceStr = `${totalPrice},00`;

  const toggleBump = () =>
    setForm((f) => ({ ...f, bumpPoster: !f.bumpPoster }));

  const updateVideo = (idx: number, patch: Partial<VideoData>) => {
    setForm((f) => ({
      ...f,
      videos: f.videos.map((v, i) => (i === idx ? { ...v, ...patch } : v)),
    }));
  };

  const stepValid = useMemo(() => {
    if (step === 0) {
      return (
        form.parentName.trim().length > 1 &&
        form.whatsapp.trim().length > 7 &&
        /\S+@\S+\.\S+/.test(form.email) &&
        form.consent
      );
    }
    if (step >= 1 && step <= videoCount) {
      const v = form.videos[step - 1];
      if (!v) return false;
      const hasCharacter =
        v.character && (v.character !== "Outro" || v.otherCharacter.trim());
      return (
        v.childName.trim().length > 1 &&
        v.childAge.trim().length > 0 &&
        hasCharacter &&
        v.reason.length > 0 &&
        v.message.trim().length > 10
      );
    }
    return true;
  }, [step, form, videoCount]);

  const stepTitle = (() => {
    if (step === 0) return "Primeiro, quem é você?";
    if (step >= 1 && step <= videoCount) {
      return videoCount === 1
        ? "Agora, conta sobre seu pequeno"
        : `Vídeo ${step} de ${videoCount} — conta sobre ele`;
    }
    return "Tudo certo. Conferimos?";
  })();

  const stepSubtitle = (() => {
    if (step === 0) return "Vamos usar isso pra mandar o vídeo pronto no seu WhatsApp.";
    if (step >= 1 && step <= videoCount)
      return "Quanto mais pessoal, mais emocionante. O roteirista lê tudo.";
    return "Última olhada antes de finalizar. Você pode voltar pra ajustar.";
  })();

  const handleSubmit = () => {
    alert(
      "Pedido recebido!\n\nRedirecionando para o checkout seguro...\n\n(Troque pela URL real de Hotmart/Kiwify/Pix)"
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-950/85 px-4 py-6 backdrop-blur-xl sm:py-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[7px] border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 shadow-2xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,157,241,0.12),transparent_60%)]" />

            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <XIcon className="h-4 w-4" strokeWidth={2.5} />
            </button>

            {/* Progress + plan header */}
            <div className="relative border-b border-white/5 px-7 pt-7 sm:px-10">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                  Plano {isDuplo ? "Duplo" : "Essencial"} · R$ {totalPriceStr}
                </div>
                <div className="text-[11px] font-semibold text-white/50">
                  Etapa {step + 1} de {totalSteps}
                </div>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-crimson-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                />
              </div>

              <div className="mt-6 pb-6">
                <h2 className="font-display text-2xl font-light leading-tight text-white sm:text-3xl">
                  {stepTitle}
                </h2>
                <p className="mt-2 text-[13px] text-white/60">{stepSubtitle}</p>
              </div>
            </div>

            {/* Step content */}
            <div className="relative px-7 py-7 sm:px-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 0 && (
                    <ParentStep form={form} setForm={setForm} />
                  )}
                  {step >= 1 && step <= videoCount && (
                    <VideoStep
                      video={form.videos[step - 1]}
                      onChange={(patch) => updateVideo(step - 1, patch)}
                    />
                  )}
                  {step === videoCount + 1 && (
                    <ReviewStep
                      form={form}
                      plan={plan}
                      totalPriceStr={totalPriceStr}
                      onToggleBump={toggleBump}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="relative flex items-center justify-between gap-3 border-t border-white/5 bg-ink-900/40 px-7 py-5 sm:px-10">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-2 rounded-[7px] px-4 py-2 text-[13px] font-semibold text-white/60 transition hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                Voltar
              </button>

              {step < totalSteps - 1 ? (
                <button
                  onClick={() => stepValid && setStep((s) => s + 1)}
                  disabled={!stepValid}
                  className="group flex items-center gap-2 rounded-[7px] bg-white px-6 py-3 text-[13px] font-bold text-ink-950 transition hover:bg-gold-400 disabled:pointer-events-none disabled:bg-white/10 disabled:text-white/40"
                >
                  Continuar
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </button>
              ) : (
                <ShinyButton
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 rounded-[7px] bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 px-7 py-3.5 text-[14px] font-bold leading-none text-white shadow-glow-blue"
                >
                  Pagar com segurança · R$ {totalPriceStr}
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
                </ShinyButton>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────── STEPS ─────────────────────────── */

function ParentStep({
  form,
  setForm,
}: {
  form: FormData;
  setForm: (f: FormData) => void;
}) {
  return (
    <div className="space-y-4">
      <Field
        label="Seu nome"
        placeholder="Ex: Mariana Silva"
        value={form.parentName}
        onChange={(v) => setForm({ ...form, parentName: v })}
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="WhatsApp"
          placeholder="(11) 99999-9999"
          type="tel"
          value={form.whatsapp}
          onChange={(v) => setForm({ ...form, whatsapp: v })}
          required
          help="Vamos entregar o vídeo aqui."
        />
        <Field
          label="E-mail"
          placeholder="voce@email.com"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          required
          help="Confirmação do pedido."
        />
      </div>
      <div className="flex items-start gap-2 rounded-[7px] border border-cyan-400/20 bg-cyan-400/5 p-4 text-[12px] text-white/70">
        <Lock
          className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cyan-400"
          strokeWidth={1.75}
        />
        <span>
          Seus dados são usados apenas para produzir e entregar seu vídeo. Nunca
          compartilhamos com terceiros.
        </span>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-[7px] border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-gold-400"
          aria-label="Aceitar termos e política de privacidade"
        />
        <span className="text-[12px] leading-relaxed text-white/70">
          Li e aceito a{" "}
          <a
            href="/privacidade"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 underline underline-offset-2 hover:text-white"
          >
            Política de Privacidade
          </a>{" "}
          e os{" "}
          <a
            href="/termos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 underline underline-offset-2 hover:text-white"
          >
            Termos de Uso
          </a>
          . Autorizo o uso dos dados da criança apenas para produção do vídeo.
        </span>
      </label>
    </div>
  );
}

function VideoStep({
  video,
  onChange,
}: {
  video: VideoData;
  onChange: (patch: Partial<VideoData>) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Child */}
      <div>
        <StepLabel>1 · Sobre a criança</StepLabel>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <Field
            label="Nome da criança"
            placeholder="Ex: Lucas"
            value={video.childName}
            onChange={(v) => onChange({ childName: v })}
            required
          />
          <Field
            label="Idade"
            placeholder="4"
            type="number"
            value={video.childAge}
            onChange={(v) => onChange({ childAge: v })}
            required
          />
          <Field
            label="Apelido (opcional)"
            placeholder="Lulu, Bebê…"
            value={video.childNickname}
            onChange={(v) => onChange({ childNickname: v })}
          />
        </div>
      </div>

      {/* Character picker */}
      <div>
        <StepLabel>2 · Qual é o herói favorito dele?</StepLabel>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {characters.map((c) => {
            const active = video.character === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onChange({ character: c.name })}
                className={`group relative flex flex-col items-center gap-1.5 rounded-[7px] border px-2 py-3 text-center transition ${
                  active
                    ? "border-gold-400 bg-gold-400/10 shadow-[0_0_20px_rgba(30,157,241,0.25)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.06]"
                }`}
              >
                <Sparkles
                  className={`h-4 w-4 ${active ? "text-gold-400" : "text-white/40"}`}
                  strokeWidth={1.75}
                />
                <span
                  className={`text-[10px] font-semibold leading-tight ${
                    active ? "text-white" : "text-white/60"
                  }`}
                >
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
        {video.character === "Outro" && (
          <div className="mt-3">
            <Field
              label="Qual herói?"
              placeholder="Ex: Patrulha Canina, Bela, Dragon Ball…"
              value={video.otherCharacter}
              onChange={(v) => onChange({ otherCharacter: v })}
              required
            />
          </div>
        )}
      </div>

      {/* Reason picker */}
      <div>
        <StepLabel>3 · Por que esse vídeo? Qual dor ele resolve?</StepLabel>
        <div className="mt-3 flex flex-wrap gap-2">
          {reasons.map((r) => {
            const active = video.reason === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => onChange({ reason: r.key })}
                className={`flex items-center gap-2 rounded-[7px] border px-3.5 py-2 text-[12px] font-semibold transition ${
                  active
                    ? "border-crimson-500 bg-crimson-500/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
                }`}
              >
                <r.Icon className="h-4 w-4" strokeWidth={1.75} />
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <div>
        <StepLabel>4 · A mensagem que só você saberia escrever</StepLabel>
        <p className="mt-1 text-[12px] text-white/45">
          Quanto mais específico, mais arrepio. Conte conquistas, desafios,
          coisas que ele fala…
        </p>
        <textarea
          rows={4}
          required
          value={video.message}
          onChange={(e) => onChange({ message: e.target.value })}
          placeholder="Ex: O Lucas tem 4 anos, acabou de aprender a andar de bicicleta sem rodinhas e está com medo da primeira semana de escola nova. Ele adora dizer 'sou forte igual você, pai'."
          className="mt-3 w-full rounded-[7px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:border-gold-400/60 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
        />
      </div>

      {/* Optional extras */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Alguma piada interna? (opcional)"
          placeholder="Ex: chama ele de 'Lulu Cabeção'"
          value={video.insideJoke}
          onChange={(v) => onChange({ insideJoke: v })}
        />
        <Field
          label="Data desejada (opcional)"
          type="date"
          value={video.deliveryDate}
          onChange={(v) => onChange({ deliveryDate: v })}
          help="Entregamos em até 48h."
        />
      </div>
    </div>
  );
}

function ReviewStep({
  form,
  plan,
  totalPriceStr,
  onToggleBump,
}: {
  form: FormData;
  plan: Plan;
  totalPriceStr: string;
  onToggleBump: () => void;
}) {
  const isDuplo = plan === "duplo";

  return (
    <div className="space-y-5">
      <div className="rounded-[7px] border border-white/10 bg-white/[0.03] p-5">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
          Contato
        </div>
        <div className="mt-3 space-y-1.5 text-[13px] text-white/80">
          <div>
            <span className="text-white/40">Nome:</span> {form.parentName}
          </div>
          <div>
            <span className="text-white/40">WhatsApp:</span> {form.whatsapp}
          </div>
          <div>
            <span className="text-white/40">E-mail:</span> {form.email}
          </div>
        </div>
      </div>

      {form.videos.map((v, i) => (
        <div
          key={i}
          className="rounded-[7px] border border-gold-400/20 bg-gradient-to-br from-gold-400/[0.06] to-transparent p-5"
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
            Vídeo {i + 1}
          </div>
          <div className="mt-3 space-y-1.5 text-[13px] text-white/80">
            <div>
              <span className="text-white/40">Para:</span> {v.childName} (
              {v.childAge} anos{v.childNickname ? ` · "${v.childNickname}"` : ""})
            </div>
            <div>
              <span className="text-white/40">Herói:</span>{" "}
              {v.character === "Outro" ? v.otherCharacter : v.character}
            </div>
            <div>
              <span className="text-white/40">Motivo:</span>{" "}
              {reasons.find((r) => r.key === v.reason)?.label || "—"}
            </div>
            <div className="pt-2">
              <span className="text-white/40">Mensagem:</span>
              <p className="mt-1 italic text-white/70">&ldquo;{v.message}&rdquo;</p>
            </div>
            {v.insideJoke && (
              <div>
                <span className="text-white/40">Piada interna:</span>{" "}
                {v.insideJoke}
              </div>
            )}
            {v.deliveryDate && (
              <div>
                <span className="text-white/40">Data desejada:</span>{" "}
                {v.deliveryDate}
              </div>
            )}
          </div>
        </div>
      ))}

      {!isDuplo && (
        <button
          type="button"
          onClick={onToggleBump}
          className={`group relative w-full overflow-hidden rounded-[7px] border p-5 text-left transition ${
            form.bumpPoster
              ? "border-gold-400/60 bg-gradient-to-br from-gold-400/[0.12] to-gold-400/[0.04] shadow-[0_0_30px_rgba(30,157,241,0.2)]"
              : "border-dashed border-gold-400/40 bg-gold-400/[0.04] hover:border-gold-400/60 hover:bg-gold-400/[0.08]"
          }`}
          aria-pressed={form.bumpPoster}
        >
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold-400/20 blur-2xl" />
          <div className="relative flex items-start gap-4">
            <div
              className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[5px] border-2 transition ${
                form.bumpPoster
                  ? "border-gold-400 bg-gold-400"
                  : "border-white/30 bg-transparent"
              }`}
            >
              {form.bumpPoster && (
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="h-3.5 w-3.5 text-ink-950"
                >
                  <path
                    d="M2 6l3 3 5-6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-crimson-500">
                  ● Só aparece aqui · só agora
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-display text-lg font-light text-white">
                  Adicionar Pôster Cinematográfico
                </span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                  -66%
                </span>
              </div>
              <p className="mt-1 text-[12px] leading-snug text-white/60">
                Cartaz digital estilo filme com o nome e o herói da criança,
                pronto pra imprimir ou usar de papel de parede. Entregue junto
                com o vídeo.
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[12px] text-white/40 line-through">
                  R$ 50
                </span>
                <span className="font-display text-xl font-light text-gold-400">
                  + R$ 17
                </span>
                <span className="text-[10px] text-white/40">uma vez só</span>
              </div>
            </div>
          </div>
        </button>
      )}

      <div className="flex items-center justify-between rounded-[7px] border border-white/10 bg-white/[0.04] p-5">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-white/50">
            Total
          </div>
          <div className="mt-1 font-display text-3xl font-light text-white">
            R$ {totalPriceStr}
          </div>
          {form.bumpPoster && !isDuplo && (
            <div className="mt-1 text-[10px] text-white/45">
              Inclui pôster cinematográfico
            </div>
          )}
        </div>
        <div className="space-y-1 text-right text-[11px] text-white/50">
          <div className="flex items-center justify-end gap-1.5">
            <Zap className="h-3 w-3" strokeWidth={1.75} />
            Entrega em até 48h
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <Lock className="h-3 w-3" strokeWidth={1.75} />
            Garantia total ou reembolso
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── PRIMITIVES ─────────────────────── */

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
      {children}
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required = false,
  value,
  onChange,
  help,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  help?: string;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[7px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:border-gold-400/60 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
      />
      {help && <div className="mt-1.5 text-[11px] text-white/35">{help}</div>}
    </div>
  );
}
