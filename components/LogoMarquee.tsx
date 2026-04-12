"use client";

const brands = [
  "MARVEL",
  "DISNEY",
  "PIXAR",
  "DC COMICS",
  "WARNER",
  "NICKELODEON",
  "DREAMWORKS",
  "CARTOON NETWORK",
];

export function LogoMarquee() {
  return (
    <section className="relative border-y border-white/5 bg-ink-900/50 py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent" />

      <div className="mb-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
          Personagens licenciados e reconhecidos mundialmente
        </p>
      </div>

      <div className="flex overflow-hidden">
        <div className="flex min-w-max animate-marquee items-center gap-16 pr-16">
          {[...brands, ...brands].map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="whitespace-nowrap font-display text-2xl font-light tracking-widest text-white/30 transition hover:text-white/80"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
