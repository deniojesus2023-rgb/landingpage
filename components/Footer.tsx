"use client";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="HeroiVideo"
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-white/50">
              Transformamos o herói favorito do seu filho em um momento real,
              pessoal e inesquecível. Entregue no WhatsApp em até 48 horas, com
              garantia total.
            </p>
          </div>

          {[
            {
              title: "Produto",
              links: [
                ["Como funciona", "#como-funciona"],
                ["Personagens", "#personagens"],
                ["Planos", "#pedido"],
                ["Depoimentos", "#depoimentos"],
              ],
            },
            {
              title: "Ajuda",
              links: [
                ["FAQ", "#faq"],
                ["Contato", "mailto:contato@heroivideo.com.br"],
                ["WhatsApp", "https://wa.me/5511999999999"],
                ["Garantia", "#faq"],
              ],
            },
            {
              title: "Legal",
              links: [
                ["Política de Privacidade", "/privacidade"],
                ["Termos de Uso", "/termos"],
                ["Cookies", "/privacidade#cookies"],
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">
                {col.title}
              </div>
              <ul className="mt-5 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[13px] text-white/60 transition hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[12px] text-white/40 sm:flex-row">
          <p>© 2026 HeroiVídeo. Todos os direitos reservados.</p>
          <p>contato@heroivideo.com.br</p>
        </div>
      </div>
    </footer>
  );
}
