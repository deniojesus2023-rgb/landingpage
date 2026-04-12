"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const characters = [
  { name: "Homem-Aranha", color: "#FF3B47", emoji: "🕷️", universe: "Marvel" },
  { name: "Batman", color: "#1E1E1E", emoji: "🦇", universe: "DC" },
  { name: "Homem de Ferro", color: "#F5C518", emoji: "🤖", universe: "Marvel" },
  { name: "Elsa", color: "#8FD5FF", emoji: "❄️", universe: "Disney" },
  { name: "Hulk", color: "#1DB954", emoji: "💪", universe: "Marvel" },
  { name: "Mulher Maravilha", color: "#E0B84F", emoji: "⚔️", universe: "DC" },
  { name: "Capitão América", color: "#2F70D2", emoji: "🛡️", universe: "Marvel" },
  { name: "Thor", color: "#FFC857", emoji: "⚡", universe: "Marvel" },
  { name: "Buzz Lightyear", color: "#4A9EFF", emoji: "🚀", universe: "Pixar" },
  { name: "Moana", color: "#FF8A5B", emoji: "🌊", universe: "Disney" },
  { name: "Flash", color: "#FF3030", emoji: "⚡", universe: "DC" },
  { name: "Rapunzel", color: "#F7B5D3", emoji: "👑", universe: "Disney" },
];

export function Characters() {
  return (
    <section
      id="personagens"
      className="relative overflow-hidden bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,197,24,0.12),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <SectionLabel tone="gold">Elenco estelar</SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Mais de 20 heróis, princesas e vilões.
              <br />
              <span className="text-gradient-gold italic">Qual é o preferido dele?</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {characters.map((char, i) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:bg-white/[0.06]"
                style={{
                  boxShadow: `0 0 0 0 ${char.color}`,
                }}
              >
                {/* Color accent */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${char.color}40, transparent 60%)`,
                  }}
                />

                <div className="relative flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-xl"
                    style={{
                      background: `linear-gradient(135deg, ${char.color}40, ${char.color}20)`,
                      border: `1px solid ${char.color}60`,
                    }}
                  >
                    {char.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-white">
                      {char.name}
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                      {char.universe}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-white/50">
            Não encontrou o favorito?{" "}
            <a
              href="#pedido"
              className="font-semibold text-gold-400 underline decoration-gold-400/30 decoration-2 underline-offset-4 transition hover:decoration-gold-400"
            >
              Fale com a gente
            </a>{" "}
            — atendemos pedidos especiais.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
