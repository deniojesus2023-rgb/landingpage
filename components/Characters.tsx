"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

type Character = {
  name: string;
  slug: string;
  universe: string;
  color: string;
  tagline: string;
  image?: string;
  emoji: string;
};

const characters: Character[] = [
  {
    name: "Homem-Aranha",
    slug: "spider-man",
    universe: "Marvel",
    color: "#E31B23",
    tagline: "O amigao da vizinhanca",
    image: "/characters/spider-man.jpg",
    emoji: "🕷️",
  },
  {
    name: "Batman",
    slug: "batman",
    universe: "DC",
    color: "#2B2B2B",
    tagline: "O cavaleiro das trevas",
    image: "/characters/batman.jpg",
    emoji: "🦇",
  },
  {
    name: "Superman",
    slug: "superman",
    universe: "DC",
    color: "#0A74DA",
    tagline: "O heroi do planeta",
    image: "/characters/superman.jpg",
    emoji: "🦸",
  },
  {
    name: "Flash",
    slug: "flash",
    universe: "DC",
    color: "#D32F2F",
    tagline: "O homem mais rapido",
    image: "/characters/flash.jpg",
    emoji: "⚡",
  },
  {
    name: "Moana",
    slug: "moana",
    universe: "Disney",
    color: "#FF8A5B",
    tagline: "A aventureira do mar",
    image: "/characters/moana.jpg",
    emoji: "🌊",
  },
  {
    name: "Elsa",
    slug: "elsa",
    universe: "Disney",
    color: "#7DC9FF",
    tagline: "A rainha do gelo",
    image: "/characters/elsa.jpg",
    emoji: "❄️",
  },
  {
    name: "Homem de Ferro",
    slug: "iron-man",
    universe: "Marvel",
    color: "#F5C518",
    tagline: "O genio bilionario",
    image: "/characters/iron-man.jpg",
    emoji: "🤖",
  },
  {
    name: "Hulk",
    slug: "hulk",
    universe: "Marvel",
    color: "#1DB954",
    tagline: "O mais forte de todos",
    image: "/characters/hulk.jpg",
    emoji: "💪",
  },
  {
    name: "Capitao America",
    slug: "captain-america",
    universe: "Marvel",
    color: "#2F70D2",
    tagline: "O primeiro vingador",
    image: "/characters/captain-america.jpg",
    emoji: "🛡️",
  },
  {
    name: "Thor",
    slug: "thor",
    universe: "Marvel",
    color: "#FFC857",
    tagline: "O deus do trovao",
    image: "/characters/thor.jpg",
    emoji: "⚡",
  },
  {
    name: "Mulher Maravilha",
    slug: "wonder-woman",
    universe: "DC",
    color: "#E0B84F",
    tagline: "A princesa amazona",
    image: "/characters/wonder-woman.jpg",
    emoji: "⚔️",
  },
  {
    name: "Branca de Neve",
    slug: "snow-white",
    universe: "Disney",
    color: "#E8C50A",
    tagline: "A mais bela de todas",
    image: "/characters/snow-white.jpg",
    emoji: "🍎",
  },
  {
    name: "Buzz Lightyear",
    slug: "buzz",
    universe: "Pixar",
    color: "#4A9EFF",
    tagline: "Ao infinito e alem",
    image: "/characters/buzz.jpg",
    emoji: "🚀",
  },
  {
    name: "Branca de Neve",
    slug: "snow-white",
    universe: "Disney",
    color: "#E0477B",
    tagline: "A princesa dos sete anões",
    image: "/characters/snow-white.jpg",
    emoji: "🍎",
  },
  {
    name: "Rapunzel",
    slug: "rapunzel",
    universe: "Disney",
    color: "#F7B5D3",
    tagline: "A princesa dos cabelos dourados",
    image: "/characters/rapunzel.jpg",
    emoji: "👑",
  },
];

/* ──────────────────────────────────────────── */
/*  Carousel row – pure CSS infinite loop       */
/* ──────────────────────────────────────────── */

function CarouselRow({
  items,
  direction = "left",
  duration = 40,
}: {
  items: Character[];
  direction?: "left" | "right";
  duration?: number;
}) {
  // Duplicate items enough times to fill the viewport and loop seamlessly
  const repeated = [...items, ...items, ...items, ...items];

  const animationName =
    direction === "left" ? "scroll-left" : "scroll-right";

  return (
    <div
      className="group/row relative overflow-hidden"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-ink-950 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-ink-950 to-transparent sm:w-24" />

      <div
        className="flex gap-6 will-change-transform group-hover/row:[animation-play-state:paused]"
        style={{
          width: "max-content",
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      >
        {repeated.map((c, i) => (
          <CarouselCard key={`${c.slug}-${i}`} character={c} />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────── */
/*  Individual carousel card                    */
/* ──────────────────────────────────────────── */

function CarouselCard({ character }: { character: Character }) {
  return (
    <a
      href="#pedido"
      className="group relative block h-[280px] w-[200px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:border-white/25 sm:h-[340px] sm:w-[240px]"
      style={{ boxShadow: `0 8px 32px -8px ${character.color}30` }}
    >
      <CharacterImage character={character} />

      {/* Color wash */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50 transition-opacity duration-500 group-hover:opacity-25"
        style={{
          background: `linear-gradient(180deg, ${character.color}30, transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${character.color}60, transparent 70%)`,
        }}
      />

      {/* Universe chip */}
      <div className="absolute left-3 top-3">
        <div
          className="rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest backdrop-blur-xl"
          style={{
            borderColor: `${character.color}60`,
            background: `${character.color}20`,
            color: character.color,
          }}
        >
          {character.universe}
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="font-display text-lg font-light leading-tight text-white">
          {character.name}
        </div>
        <div className="mt-0.5 text-[10px] font-medium text-white/50">
          {character.tagline}
        </div>
      </div>
    </a>
  );
}

/* ──────────────────────────────────────────── */
/*  Main section                                */
/* ──────────────────────────────────────────── */

export function Characters() {
  const midpoint = Math.ceil(characters.length / 2);
  const row1 = characters.slice(0, midpoint);
  const row2 = characters.slice(midpoint);

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
              <span className="text-gradient-gold italic">
                Qual é o preferido dele?
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-white/60">
              Marvel, DC, Disney, Pixar, Dreamworks e muito mais. Toda vez que
              surge um novo favorito, a gente adiciona. Se ele ama, a gente
              entrega.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Carousel rows */}
      <div className="relative mt-16 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <CarouselRow items={row1} direction="left" duration={35} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <CarouselRow items={row2} direction="right" duration={45} />
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-center gap-3">
            <p className="text-center text-white/50">
              {"Não encontrou o favorito? "}
              <a
                href="#pedido"
                className="font-semibold text-gold-400 underline decoration-gold-400/30 decoration-2 underline-offset-4 transition hover:decoration-gold-400"
              >
                Fale com a gente
              </a>
              {" — atendemos pedidos especiais."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-white/40">
              <span>+ Rapunzel</span>
              <span>·</span>
              <span>Bela</span>
              <span>·</span>
              <span>Cinderela</span>
              <span>·</span>
              <span>Patrulha Canina</span>
              <span>·</span>
              <span>muito mais…</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────── */
/*  Image with fallback                         */
/* ──────────────────────────────────────────── */

function CharacterImage({ character }: { character: Character }) {
  if (!character.image) {
    return <CharacterFallback character={character} />;
  }
  return (
    <>
      <div className="absolute inset-0">
        <CharacterFallback character={character} />
      </div>
      <Image
        src={character.image}
        alt={character.name}
        fill
        sizes="240px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
      />
    </>
  );
}

function CharacterFallback({ character }: { character: Character }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background: `radial-gradient(circle at 50% 40%, ${character.color}, ${character.color}20 60%, #05060F 100%)`,
      }}
    >
      <div className="text-6xl opacity-40 grayscale">{character.emoji}</div>
    </div>
  );
}
