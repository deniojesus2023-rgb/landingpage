import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("═══════════════════════════════════════════════════════");
    console.log("[InfinitePay Webhook] Pagamento recebido!");
    console.log("═══════════════════════════════════════════════════════");
    console.log("[InfinitePay Webhook] Order NSU:", body.order_nsu);
    console.log("[InfinitePay Webhook] Valor:", body.amount ? `R$ ${(body.amount / 100).toFixed(2)}` : "N/A");
    console.log("[InfinitePay Webhook] Valor pago:", body.paid_amount ? `R$ ${(body.paid_amount / 100).toFixed(2)}` : "N/A");
    console.log("[InfinitePay Webhook] Parcelas:", body.installments);
    console.log("[InfinitePay Webhook] Metodo:", body.capture_method);
    console.log("[InfinitePay Webhook] Transaction NSU:", body.transaction_nsu);
    console.log("[InfinitePay Webhook] Invoice Slug:", body.invoice_slug);
    console.log("[InfinitePay Webhook] Comprovante:", body.receipt_url);
    console.log("[InfinitePay Webhook] Itens:", JSON.stringify(body.items, null, 2));
    console.log("═══════════════════════════════════════════════════════");

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[InfinitePay Webhook] Erro ao processar:", error);
    return NextResponse.json({ error: "Erro ao processar webhook" }, { status: 400 });
  }
}
