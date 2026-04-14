/**
 * ═════════════════════════════════════════════════════════════════
 *  CONFIGURAÇÃO DO CHECKOUT (InfinitePay)
 * ═════════════════════════════════════════════════════════════════
 *
 * Cole aqui as URLs dos checkouts que você criar no InfinitePay.
 * Enquanto estiverem vazias, os botões caem no fallback do WhatsApp.
 *
 * Como criar cada uma (resumo — ver instruções completas no README):
 *
 * 1. Entra no painel do InfinitePay → Links/Checkout
 * 2. Clica em "Criar checkout"
 * 3. Preenche os itens conforme cada plano abaixo
 * 4. Na aba "Depois do pagamento", configura o redirect para:
 *        https://seudominio.com/obrigado?plan=essencial
 *        (trocando o ?plan= conforme o checkout)
 * 5. Copia a URL final do checkout e cola aqui
 */

/* ════════════ CHECKOUTS PRINCIPAIS ════════════ */

/**
 * Checkout do plano ESSENCIAL (1 vídeo, R$ 47)
 * Item único: "Vídeo Personalizado — Plano Essencial" · R$ 47 · qtd 1
 * Depois do pagamento → /obrigado?plan=essencial
 */
export const CHECKOUT_ESSENCIAL = "https://checkout.infinitepay.io/denispixx/1H6krLUtoF";

/**
 * Checkout do plano DUPLO (2 vídeos, R$ 97)
 * Item único: "Kit 2 Vídeos Personalizados — Plano Duplo" · R$ 97 · qtd 1
 * Depois do pagamento → /obrigado?plan=duplo
 */
export const CHECKOUT_DUPLO = "https://checkout.infinitepay.io/denispixx/2YDX3QpmTR";

/* ════════════ UPSELLS ════════════ */

/**
 * UPSELL 1 (mostrado depois de comprar ESSENCIAL)
 * Item único: "Adicionar 2º Vídeo Personalizado" · R$ 50 · qtd 1
 * Copy: "Adiciona um segundo vídeo por apenas +R$ 50 (em vez de R$ 97)"
 * Depois do pagamento → /obrigado?plan=essencial&upsell=ok
 */
export const CHECKOUT_UPSELL_SEGUNDO_VIDEO = "https://checkout.infinitepay.io/denispixx/JmBxWfmIz";

/**
 * UPSELL 2 (mostrado depois de comprar DUPLO)
 * Item único: "Entrega VIP 24h + Pôster Cinematográfico" · R$ 47 · qtd 1
 * Depois do pagamento → /obrigado?plan=duplo&upsell=ok
 */
export const CHECKOUT_UPSELL_VIP_DUPLO = "https://checkout.infinitepay.io/denispixx/7eegOwqofr";

/* ════════════ DOWNSELL (order-bump barato) ════════════ */

/**
 * DOWNSELL (mostrado quando o cliente recusa o upsell, em qualquer plano)
 * Item único: "Pôster Cinematográfico Digital" · R$ 17 · qtd 1
 * Copy: "Pelo menos leva o pôster impressão-ready por R$ 17?"
 * Depois do pagamento → /obrigado?plan=X&downsell=ok
 */
export const CHECKOUT_DOWNSELL_POSTER = "https://checkout.infinitepay.io/denispixx/7eeibhiKL1";

/* ════════════ FALLBACK / HELPERS ════════════ */

const WHATSAPP_NUMBER = "5511911346396";

function whatsappFallback(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type PlanId = "essencial" | "duplo";

/**
 * Retorna a URL de checkout do plano selecionado.
 * Se o link do InfinitePay ainda não foi configurado, cai no WhatsApp.
 */
export function getCheckoutUrl(plan: PlanId): string {
  if (plan === "essencial") {
    if (CHECKOUT_ESSENCIAL) return CHECKOUT_ESSENCIAL;
    return whatsappFallback(
      `Ola! Quero o *Plano Essencial* (1 video por R$ 47). Podem me ajudar a finalizar o pedido?`,
    );
  }

  if (CHECKOUT_DUPLO) return CHECKOUT_DUPLO;
  return whatsappFallback(
    `Ola! Quero o *Plano Duplo* (2 videos por R$ 97). Podem me ajudar a finalizar o pedido?`,
  );
}

/**
 * URL para o upsell após a compra do plano base.
 */
export function getUpsellUrl(plan: PlanId): string {
  if (plan === "essencial") {
    if (CHECKOUT_UPSELL_SEGUNDO_VIDEO) return CHECKOUT_UPSELL_SEGUNDO_VIDEO;
    return whatsappFallback(
      `Ola! Acabei de comprar o Essencial e quero adicionar o *segundo video* por +R$ 50.`,
    );
  }
  if (CHECKOUT_UPSELL_VIP_DUPLO) return CHECKOUT_UPSELL_VIP_DUPLO;
  return whatsappFallback(
    `Ola! Acabei de comprar o Duplo e quero adicionar a *entrega VIP em 24h + poster cinematografico* por +R$ 47.`,
  );
}

/**
 * URL para o downsell (pôster a R$ 17), usado quando o cliente recusa o upsell.
 */
export function getDownsellUrl(plan: PlanId): string {
  if (CHECKOUT_DOWNSELL_POSTER) return CHECKOUT_DOWNSELL_POSTER;
  return whatsappFallback(
    `Ola! Acabei de comprar o ${plan === "essencial" ? "Essencial" : "Duplo"} e quero adicionar o *poster cinematografico* por R$ 17.`,
  );
}
