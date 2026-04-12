import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeroiVídeo — O herói favorito do seu filho fala o nome dele",
  description:
    "Vídeos personalizados com Homem-Aranha, Batman, Elsa e mais. O herói chama seu filho pelo nome, entrega em 48h no WhatsApp. Mais de 500 famílias emocionadas.",
  openGraph: {
    title: "HeroiVídeo — O herói favorito do seu filho fala o nome dele",
    description:
      "Presente inesquecível: o herói chama seu filho pelo nome num vídeo cinematográfico. Entrega em 48h.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-950 text-white antialiased">{children}</body>
    </html>
  );
}
