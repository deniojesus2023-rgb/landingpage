/**
 * Utilitário central de WhatsApp para o HeroiVídeo.
 * Todas as mensagens e o número de contato são gerenciados aqui.
 */

const WHATSAPP_NUMBER = "5511911346396"; // +55 11 91134-6396

const MESSAGES = {
  essencial: `Olá! Vi o HeroiVídeo e quero encomendar o *Plano Essencial* 🦸

Tenho interesse em 1 vídeo personalizado (R$ 47).

Pode me ajudar a fazer o pedido?`,

  duplo: `Olá! Vi o HeroiVídeo e quero encomendar o *Plano Duplo* 🦸🦸

Tenho interesse em 2 vídeos personalizados + bônus (R$ 97).

Pode me ajudar a fazer o pedido?`,

  geral: `Olá! Vi o HeroiVídeo e quero criar um vídeo personalizado para meu filho 🦸

Pode me ajudar a escolher o melhor plano?`,
};

export type WhatsAppPlan = keyof typeof MESSAGES;

/**
 * Retorna a URL do WhatsApp com mensagem pré-preenchida.
 */
export function getWhatsAppUrl(plan: WhatsAppPlan = "geral"): string {
  const message = encodeURIComponent(MESSAGES[plan]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

/**
 * Abre o WhatsApp diretamente (para uso em onClick).
 */
export function openWhatsApp(plan: WhatsAppPlan = "geral"): void {
  window.open(getWhatsAppUrl(plan), "_blank", "noopener,noreferrer");
}
