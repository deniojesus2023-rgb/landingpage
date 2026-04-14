import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade · HeroiVídeo",
  description:
    "Como o HeroiVídeo coleta, usa e protege os seus dados pessoais de acordo com a LGPD.",
};

/**
 * Política de Privacidade — placeholder LGPD.
 * TODO: substituir os marcadores [CNPJ], [RAZÃO SOCIAL], [EMAIL DE CONTATO],
 * [ENDEREÇO] e [DPO] pelos dados oficiais da empresa antes do go-live.
 */
export default function PrivacidadePage() {
  return (
    <main className="relative mx-auto min-h-screen max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <Link
        href="/"
        className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-400 hover:text-white"
      >
        ← Voltar para o início
      </Link>

      <h1 className="mt-6 font-display text-4xl font-light leading-[1.05] sm:text-5xl">
        Política de Privacidade
      </h1>
      <p className="mt-3 text-[13px] text-white/50">
        Última atualização: <strong>14/04/2026</strong>
      </p>

      <div className="prose-invert mt-10 space-y-8 text-[15px] leading-relaxed text-white/75">
        <section>
          <h2 className="font-display text-2xl font-light text-white">
            1. Quem somos
          </h2>
          <p className="mt-3">
            Esta Política de Privacidade se aplica ao site HeroiVídeo, operado
            por <strong>[RAZÃO SOCIAL]</strong>, CNPJ <strong>[CNPJ]</strong>,
            com sede em <strong>[ENDEREÇO COMPLETO]</strong>. Somos uma empresa
            brasileira especializada em produção de vídeos personalizados para
            crianças e estamos comprometidos em proteger seus dados de acordo
            com a Lei Geral de Proteção de Dados (Lei 13.709/18 — LGPD).
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            2. Dados que coletamos
          </h2>
          <p className="mt-3">
            Ao fazer um pedido, coletamos apenas as informações estritamente
            necessárias para produzir e entregar o seu vídeo:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Seus dados:</strong> nome, e-mail e WhatsApp.
            </li>
            <li>
              <strong>Dados sobre a criança:</strong> nome, idade, apelido
              (opcional) e a mensagem personalizada que você escreve para o
              roteiro.
            </li>
            <li>
              <strong>Dados de pagamento:</strong> processados exclusivamente
              pela operadora do checkout. Nunca armazenamos número de cartão
              ou CVV em nossos servidores.
            </li>
            <li>
              <strong>Dados de navegação:</strong> cookies técnicos para fazer
              o site funcionar e cookies analíticos (quando você consente).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            3. Como usamos seus dados
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Para produzir o vídeo personalizado que você pediu.</li>
            <li>Para entregar o vídeo via WhatsApp e e-mail.</li>
            <li>Para dar suporte, responder dúvidas e cumprir a garantia.</li>
            <li>Para cumprir obrigações legais e fiscais.</li>
          </ul>
          <p className="mt-4">
            Não vendemos, alugamos ou compartilhamos seus dados com terceiros
            para fins comerciais.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            4. Dados de crianças
          </h2>
          <p className="mt-3">
            Os dados sobre a criança são fornecidos pelo responsável legal (você)
            com a finalidade única e exclusiva de personalizar o vídeo.
            Armazenamos apenas pelo tempo necessário à produção e à garantia de
            refações, e depois removemos os dados de forma segura. Nenhuma
            informação sobre a criança é usada para marketing, publicidade ou
            compartilhada com terceiros.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            5. Seus direitos (LGPD)
          </h2>
          <p className="mt-3">
            A qualquer momento, você pode exercer os seus direitos como titular
            dos dados:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Confirmar a existência de tratamento.</li>
            <li>Acessar, corrigir ou atualizar seus dados.</li>
            <li>Solicitar a exclusão dos dados.</li>
            <li>Revogar o consentimento a qualquer momento.</li>
            <li>Solicitar a portabilidade dos dados.</li>
          </ul>
          <p className="mt-4">
            Para exercer qualquer um desses direitos, envie um e-mail para{" "}
            <a
              href="mailto:[EMAIL DE CONTATO]"
              className="text-gold-400 underline"
            >
              [EMAIL DE CONTATO]
            </a>{" "}
            com o assunto &ldquo;LGPD&rdquo;. Respondemos em até 15 dias
            corridos.
          </p>
        </section>

        <section id="cookies">
          <h2 className="font-display text-2xl font-light text-white">
            6. Cookies
          </h2>
          <p className="mt-3">
            Usamos cookies técnicos essenciais para o funcionamento do site e
            cookies analíticos (Google Analytics) para entender como os
            visitantes usam a página. Você pode bloquear cookies nas
            configurações do seu navegador — o site continua funcionando, mas
            alguns recursos podem ser afetados.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            7. Segurança
          </h2>
          <p className="mt-3">
            Adotamos medidas técnicas e organizacionais razoáveis para proteger
            os dados contra acesso não autorizado, perda, alteração ou destruição.
            Nosso site opera sob HTTPS e os pagamentos são processados em
            ambiente certificado PCI-DSS pela operadora.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            8. Encarregado de dados (DPO) e contato
          </h2>
          <p className="mt-3">
            Encarregado de Proteção de Dados: <strong>[NOME DO DPO]</strong>
            <br />
            E-mail:{" "}
            <a
              href="mailto:[EMAIL DE CONTATO]"
              className="text-gold-400 underline"
            >
              [EMAIL DE CONTATO]
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            9. Alterações nesta política
          </h2>
          <p className="mt-3">
            Podemos atualizar esta política a qualquer momento. A versão mais
            recente estará sempre disponível nesta página, com a data da última
            atualização no topo.
          </p>
        </section>
      </div>
    </main>
  );
}
