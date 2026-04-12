import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

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
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-ink-950 font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
