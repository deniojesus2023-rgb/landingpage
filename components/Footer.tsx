"use client";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-[#D68F00] shadow-glow">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-950" fill="currentColor">
                  <path d="M12 2l2.39 4.84L20 7.77l-4 3.9.95 5.55L12 14.77 7.05 17.22 8 11.67 4 7.77l5.61-.93L12 2z" />
                </svg>
              </div>
              <div className="text-lg font-extrabold tracking-tight text-white">
                Heroi<span className="text-gradient-gold">Vídeo</span>
              </div>
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
                ["Política de Privacidade", "#"],
                ["Termos de Uso", "#"],
                ["Cookies", "#"],
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
