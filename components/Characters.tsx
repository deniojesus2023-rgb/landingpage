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
  /** arquivo em /public/characters/{slug}.jpg */
  image?: string;
  /** fallback caso a imagem não exista ainda */
  emoji: string;
  featured?: boolean;
};

const characters: Character[] = [
  {
    name: "Homem-Aranha",
    slug: "spider-man",
    universe: "Marvel",
    color: "#E31B23",
    tagline: "O amigão da vizinhança",
    image: "/characters/spider-man.jpg",
    emoji: "🕷️",
    featured: true,
  },
  {
    name: "Batman",
    slug: "batman",
    universe: "DC",
    color: "#2B2B2B",
    tagline: "O cavaleiro das trevas",
    image: "/characters/batman.jpg",
    emoji: "🦇",
    featured: true,
  },
  {
    name: "Superman",
    slug: "superman",
    universe: "DC",
    color: "#0A74DA",
    tagline: "O herói do planeta",
    image: "/characters/superman.jpg",
    emoji: "🦸",
  },
  {
    name: "Flash",
    slug: "flash",
    universe: "DC",
    color: "#D32F2F",
    tagline: "O homem mais rápido",
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
    tagline: "O gênio bilionário",
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
    name: "Capitão América",
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
    tagline: "O deus do trovão",
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
    name: "Buzz Lightyear",
    slug: "buzz",
    universe: "Pixar",
    color: "#4A9EFF",
    tagline: "Ao infinito e além",
    image: "/characters/buzz.jpg",
    emoji: "🚀",
  },
];

export function Characters() {
  const featured = characters.filter((c) => c.featured);
  const rest = characters.filter((c) => !c.featured);

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

        {/* Featured cards (2 grandes) */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {featured.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <FeaturedCharacterCard character={c} />
            </motion.div>
          ))}
        </div>

        {/* Rest grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {rest.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <CharacterCard character={c} />
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-center gap-3">
            <p className="text-center text-white/50">
              Não encontrou o favorito?{" "}
              <a
                href="#pedido"
                className="font-semibold text-gold-400 underline decoration-gold-400/30 decoration-2 underline-offset-4 transition hover:decoration-gold-400"
              >
                Fale com a gente
              </a>{" "}
              — atendemos pedidos especiais.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-white/40">
              <span>+ Homem de Ferro</span>
              <span>·</span>
              <span>Hulk</span>
              <span>·</span>
              <span>Thor</span>
              <span>·</span>
              <span>Rapunzel</span>
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

function FeaturedCharacterCard({ character }: { character: Character }) {
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 group-hover:border-white/30"
      style={{
        boxShadow: `0 20px 60px -20px ${character.color}40`,
      }}
    >
      {/* Image */}
      <CharacterImage character={character} />

      {/* Color wash + dark vignette */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-60 transition-opacity duration-700 group-hover:opacity-40"
        style={{
          background: `linear-gradient(135deg, ${character.color}80, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

      {/* Glow accent on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${character.color}50, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-7">
        <div className="flex items-start justify-between">
          <div
            className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur-xl"
            style={{
              borderColor: `${character.color}60`,
              background: `${character.color}20`,
              color: character.color,
            }}
          >
            {character.universe}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[13px] backdrop-blur-xl">
            {character.emoji}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
            {character.tagline}
          </div>
          <div className="mt-2 font-display text-4xl font-light leading-none text-white sm:text-5xl">
            {character.name}
          </div>
          <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold text-white/60 transition group-hover:text-gold-400">
            <span>Escolher este herói</span>
            <svg
              className="h-3 w-3 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function CharacterCard({ character }: { character: Character }) {
  return (
    <a
      href="#pedido"
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:border-white/25"
      style={{ boxShadow: `0 0 0 0 ${character.color}` }}
    >
      <CharacterImage character={character} />

      {/* Color wash */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50 transition-opacity duration-500 group-hover:opacity-25"
        style={{
          background: `linear-gradient(180deg, ${character.color}30, transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

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

/**
 * Renderiza a imagem local (public/characters/*.jpg) se existir.
 * Se o arquivo não tiver sido adicionado ainda, mostra um fundo com gradient
 * colorido e o emoji em destaque — a página nunca quebra.
 */
function CharacterImage({ character }: { character: Character }) {
  if (!character.image) {
    return <CharacterFallback character={character} />;
  }
  return (
    <>
      {/* Fallback sempre no fundo, pra nunca ver buraco se a imagem falhar */}
      <div className="absolute inset-0">
        <CharacterFallback character={character} />
      </div>
      <Image
        src={character.image}
        alt={character.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        // Em dev/local, caso o arquivo não exista, next/image dá 404 e o fallback abaixo fica visível
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
