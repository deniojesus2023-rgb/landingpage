"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

/* ── Cole aqui a URL do video (YouTube, Vimeo ou link direto .mp4) ── */
const VIDEO_URL = "";
/* Se for YouTube, cole o ID do video. Ex: "dQw4w9WgXcQ" */
const YOUTUBE_ID = "knNjhO9awzc";
/* Se for Vimeo, cole o ID. Ex: "123456789" */
const VIMEO_ID = "";

export function VideoDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
      id="demo"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-10 h-80 w-80 rounded-full bg-crimson-500/20 blur-3xl" />
        <div className="absolute right-1/3 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-5 text-center sm:mt-24 sm:px-8">
        <div className="mt-0">
          <SectionLabel tone="cyan">Veja o momento mágico</SectionLabel>
        </div>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-4xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
            A reação dele ao ouvir o herói{" "}
            <span className="text-gradient-gold italic">
              chamar pelo próprio nome
            </span>{" "}
            você vai guardar para sempre.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-white/60">
            Assista a um vídeo real feito para o Pedro. Volume alto
            recomendado — e mantenha os lenços por perto.
          </p>
        </Reveal>

        <motion.div style={{ y, scale }} className="relative mx-auto mt-16 w-full max-w-4xl">
          <VideoPlayer />
        </motion.div>
      </div>
    </section>
  );
}

function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handlePlay = useCallback(() => {
    /* YouTube embed */
    if (YOUTUBE_ID) {
      setIsPlaying(true);
      return;
    }
    /* Vimeo embed */
    if (VIMEO_ID) {
      setIsPlaying(true);
      return;
    }
    /* Direct video file */
    if (VIDEO_URL) {
      setIsPlaying(true);
      setTimeout(() => {
        videoRef.current?.play();
      }, 100);
      return;
    }
    /* Fallback: nenhum video configurado */
    setIsPlaying(true);
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((curr / dur) * 100);
    setCurrentTime(formatTime(curr));
    setDuration(formatTime(dur));
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("00:00");
  };

  return (
    <div className="group relative">
      {/* Halo glow */}
      <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-crimson-500/30 via-violet-500/30 to-gold-500/30 opacity-60 blur-3xl transition group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-[7px] border border-white/10 bg-ink-900 shadow-2xl">
        <div className="relative aspect-video">
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div
                key="poster"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Background poster */}
                <div className="absolute inset-0">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4d17e57f-fa4f-4e5e-b7aa-dcad2b9daf34-Unknown.jpeg.jpeg"
                    alt="Homem-Aranha - capa do video"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  {/* Overlay sutil para contraste do botão */}
                  <div className="absolute inset-0 bg-black/25" />
                </div>

                {/* Play button - centralizado e limpo */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={handlePlay}
                  aria-label="Reproduzir video"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(255,255,255,0.4)",
                        "0 0 0 20px rgba(255,255,255,0)",
                      ],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl sm:h-20 sm:w-20"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 h-6 w-6 text-ink-950 sm:h-8 sm:w-8"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* YouTube */}
                {YOUTUBE_ID && (
                  <iframe
                    src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="h-full w-full"
                    title="Video do cliente"
                  />
                )}

                {/* Vimeo */}
                {VIMEO_ID && !YOUTUBE_ID && (
                  <iframe
                    src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="h-full w-full"
                    title="Video do cliente"
                  />
                )}

                {/* Direct MP4 */}
                {VIDEO_URL && !YOUTUBE_ID && !VIMEO_ID && (
                  <video
                    ref={videoRef}
                    src={VIDEO_URL}
                    className="h-full w-full object-cover"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnd}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        setDuration(formatTime(videoRef.current.duration));
                      }
                    }}
                    controls
                    playsInline
                  />
                )}

                {/* Nenhum video configurado - mensagem */}
                {!YOUTUBE_ID && !VIMEO_ID && !VIDEO_URL && (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-ink-950 p-8">
                    <div className="rounded-[7px] border border-white/10 bg-white/5 px-6 py-4 text-center">
                      <p className="text-lg font-medium text-white">Configure o video</p>
                      <p className="mt-2 text-sm text-white/60">
                        Abra o arquivo <code className="rounded bg-white/10 px-1.5 py-0.5 text-gold-400">components/VideoDemo.tsx</code> e preencha uma das variaveis:
                      </p>
                      <div className="mt-4 space-y-2 text-left text-xs text-white/50">
                        <p><code className="text-gold-400">VIDEO_URL</code> - Link direto para .mp4</p>
                        <p><code className="text-gold-400">YOUTUBE_ID</code> - ID do video no YouTube</p>
                        <p><code className="text-gold-400">VIMEO_ID</code> - ID do video no Vimeo</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="text-sm text-white/40 underline underline-offset-2 hover:text-white/60"
                    >
                      Voltar
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
