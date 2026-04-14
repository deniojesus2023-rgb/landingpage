/**
 * ═════════════════════════════════════════════════════════════════
 *  CONFIGURAÇÃO DO CHECKOUT (InfinitePay)
 * ═════════════════════════════════════════════════════════════════
 *
 * Integração dinâmica via API. Gera links de checkout em tempo real
 * com dados do cliente pré-preenchidos. Mantém fallback via WhatsApp
 * caso a API falhe.
 */

export type PlanId = "essencial" | "duplo";

export type CustomerData = {
  name: string;
  email: string;
  phone_number: string;
};

/* ════════════ FALLBACK / HELPERS ════════════ */

const WHATSAPP_NUMBER = "5511911346396";

function whatsappFallback(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Formata telefone brasileiro para +55DDDNUMERO.
 * Aceita: (11) 99999-9999, 11999999999, +5511999999999, etc.
 */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length >= 12) {
    return `+${digits}`;
  }
  if (digits.length >= 10) {
    return `+55${digits}`;
  }
  return `+55${digits}`;
}

/* ════════════ API: CHECKOUT PRINCIPAL ════════════ */

/**
 * Cria um checkout dinâmico na InfinitePay via API route.
 * Retorna a URL do checkout para redirecionar o cliente.
 * Em caso de erro, retorna URL de fallback via WhatsApp.
 */
export async function createCheckout(data: {
  plan: PlanId;
  customer: CustomerData;
  bumpPoster?: boolean;
}): Promise<string> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: data.plan,
        customer: {
          name: data.customer.name,
          email: data.customer.email,
          phone_number: data.customer.phone_number,
        },
        bumpPoster: data.bumpPoster,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[Checkout] Erro:", err);
      throw new Error(err.error || "Erro ao criar checkout");
    }

    const result = await res.json();
    if (result.url) return result.url;

    throw new Error("URL de checkout não retornada");
  } catch (error) {
    console.error("[Checkout] Fallback para WhatsApp:", error);
    const planLabel = data.plan === "essencial" ? "Essencial" : "Duplo";
    const price = data.plan === "essencial" ? "97" : "147";
    return whatsappFallback(
      `Ola! Sou ${data.customer.name}. Quero o *Plano ${planLabel}* (R$ ${price}). Podem me ajudar a finalizar o pedido?`,
    );
  }
}

/* ════════════ API: UPSELL / DOWNSELL ════════════ */

/**
 * Cria um checkout de upsell ou downsell na InfinitePay.
 * Em caso de erro, retorna URL de fallback via WhatsApp.
 */
export async function createUpsellCheckout(data: {
  type: "upsell" | "downsell";
  plan: PlanId;
  customer?: CustomerData;
}): Promise<string> {
  try {
    const res = await fetch("/api/checkout/upsell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: data.type,
        plan: data.plan,
        customer: data.customer,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[Upsell] Erro:", err);
      throw new Error(err.error || "Erro ao criar checkout de upsell");
    }

    const result = await res.json();
    if (result.url) return result.url;

    throw new Error("URL de upsell não retornada");
  } catch (error) {
    console.error("[Upsell] Fallback para WhatsApp:", error);

    if (data.type === "downsell") {
      return whatsappFallback(
        `Ola! Quero adicionar o *poster cinematografico* por R$ 17.`,
      );
    }

    if (data.plan === "essencial") {
      return whatsappFallback(
        `Ola! Acabei de comprar o Essencial e quero adicionar o *segundo video* por +R$ 50.`,
      );
    }

    return whatsappFallback(
      `Ola! Acabei de comprar o Duplo e quero adicionar a *entrega VIP em 24h + poster cinematografico* por +R$ 47.`,
    );
  }
}

/* ════════════ FUNÇÕES LEGADAS (compatibilidade) ════════════ */

/** @deprecated Use createCheckout() em vez disso */
export function getCheckoutUrl(plan: PlanId): string {
  return whatsappFallback(
    `Ola! Quero o *Plano ${plan === "essencial" ? "Essencial" : "Duplo"}*. Podem me ajudar?`,
  );
}

/** @deprecated Use createUpsellCheckout() em vez disso */
export function getUpsellUrl(plan: PlanId): string {
  if (plan === "essencial") {
    return whatsappFallback(
      `Ola! Acabei de comprar o Essencial e quero adicionar o *segundo video* por +R$ 50.`,
    );
  }
  return whatsappFallback(
    `Ola! Acabei de comprar o Duplo e quero adicionar a *entrega VIP em 24h + poster cinematografico* por +R$ 47.`,
  );
}

/** @deprecated Use createUpsellCheckout() em vez disso */
export function getDownsellUrl(plan: PlanId): string {
  return whatsappFallback(
    `Ola! Quero adicionar o *poster cinematografico* por R$ 17.`,
  );
}
