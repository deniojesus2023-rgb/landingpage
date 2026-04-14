import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso · HeroiVídeo",
  description:
    "Termos e condições de uso do serviço HeroiVídeo para vídeos personalizados com personagens.",
};

/**
 * Termos de Uso — placeholder.
 * TODO: substituir [RAZÃO SOCIAL], [CNPJ], [ENDEREÇO], [EMAIL DE CONTATO],
 * [FORO] pelos dados oficiais antes do go-live.
 */
export default function TermosPage() {
  return (
    <main className="relative mx-auto min-h-screen max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <Link
        href="/"
        className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-400 hover:text-white"
      >
        ← Voltar para o início
      </Link>

      <h1 className="mt-6 font-display text-4xl font-light leading-[1.05] sm:text-5xl">
        Termos de Uso
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
            Estes Termos regulam o uso do site HeroiVídeo, de propriedade de{" "}
            <strong>[RAZÃO SOCIAL]</strong>, CNPJ <strong>[CNPJ]</strong>, com
            sede em <strong>[ENDEREÇO COMPLETO]</strong>. Ao fazer um pedido,
            você declara que leu, entendeu e concorda integralmente com estes
            Termos.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            2. O serviço
          </h2>
          <p className="mt-3">
            O HeroiVídeo produz vídeos curtos personalizados (até 60 segundos)
            em que um personagem interpretado pelos nossos atores e editores
            menciona pelo nome a criança indicada pelo cliente, com mensagem,
            contexto e motivo personalizados. O vídeo tem uso exclusivamente
            pessoal e familiar — não pode ser usado para fins comerciais.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            3. Pedido e pagamento
          </h2>
          <p className="mt-3">
            Ao confirmar o pedido, você faz o pagamento integral do plano
            escolhido (Essencial ou Duplo) via Pix, boleto ou cartão de crédito
            através do checkout do nosso provedor de pagamento. Depois de
            confirmado, iniciamos a produção. Não há assinatura, cobrança
            recorrente ou valores ocultos.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            4. Prazo de entrega
          </h2>
          <p className="mt-3">
            O prazo padrão de entrega é de até <strong>48 horas úteis</strong>{" "}
            após a confirmação do pagamento e o envio das informações completas
            da criança. Para o plano Duplo com o bônus VIP, o prazo é de{" "}
            <strong>24 horas úteis</strong>. Atrasos excepcionais serão
            comunicados via WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            5. Garantia e reembolso
          </h2>
          <p className="mt-3">
            Oferecemos garantia incondicional de <strong>14 dias</strong> a
            partir da entrega do vídeo:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Refações ilimitadas:</strong> se o vídeo não atender
              às suas expectativas, refazemos quantas vezes forem necessárias
              sem custo adicional.
            </li>
            <li>
              <strong>Reembolso total:</strong> se mesmo após as refações você
              não estiver satisfeito, devolvemos 100% do valor pago via Pix,
              em até 2 dias úteis.
            </li>
          </ul>
          <p className="mt-4">
            Para exercer a garantia, basta enviar um e-mail para{" "}
            <a
              href="mailto:[EMAIL DE CONTATO]"
              className="text-gold-400 underline"
            >
              [EMAIL DE CONTATO]
            </a>{" "}
            relatando o motivo. Sem burocracia.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            6. Direitos autorais e uso do vídeo
          </h2>
          <p className="mt-3">
            O vídeo entregue é de uso pessoal e familiar. Você pode assistir,
            compartilhar em grupos familiares privados e guardar como
            lembrança. <strong>Não é permitido</strong>: revender, usar para
            fins publicitários, veicular em mídia paga, distribuir publicamente
            ou reutilizar elementos do vídeo (voz, trilha, edição) em outras
            produções.
          </p>
          <p className="mt-3">
            Personagens mencionados são referências culturais interpretadas por
            atores. O HeroiVídeo não é afiliado, endossado ou patrocinado por
            nenhum detentor de marca, estúdio ou editora original.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            7. Responsabilidades do cliente
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Fornecer informações verdadeiras e completas sobre a criança e
              a mensagem desejada.
            </li>
            <li>
              Confirmar, como responsável legal, que tem autorização para usar
              os dados da criança na produção do vídeo.
            </li>
            <li>
              Usar o vídeo apenas para fins pessoais e familiares.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            8. Limitação de responsabilidade
          </h2>
          <p className="mt-3">
            Faremos o máximo para entregar um vídeo emocionante e de qualidade
            cinematográfica, mas reações individuais das crianças não podem ser
            garantidas. Nossa responsabilidade se limita ao valor efetivamente
            pago pelo serviço.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            9. Foro e legislação aplicável
          </h2>
          <p className="mt-3">
            Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro
            da Comarca de <strong>[FORO]</strong> para dirimir quaisquer
            questões oriundas deste contrato, com renúncia expressa a qualquer
            outro, por mais privilegiado que seja.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-white">
            10. Contato
          </h2>
          <p className="mt-3">
            Dúvidas ou solicitações:{" "}
            <a
              href="mailto:[EMAIL DE CONTATO]"
              className="text-gold-400 underline"
            >
              [EMAIL DE CONTATO]
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
