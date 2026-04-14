import { NextRequest, NextResponse } from "next/server";

const INFINITEPAY_API = "https://api.infinitepay.io/invoices/public/checkout/links";

export async function POST(req: NextRequest) {
  try {
    const rawHandle = process.env.INFINITEPAY_HANDLE ?? "";
    const handle = rawHandle.trim().replace(/^\$/, "");

    if (!handle) {
      return NextResponse.json(
        { error: "INFINITEPAY_HANDLE não configurado" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { type, plan, customer } = body as {
      type: "upsell" | "downsell";
      plan: "essencial" | "duplo";
      customer?: { name: string; email: string; phone_number: string };
    };

    if (!type || !plan) {
      return NextResponse.json(
        { error: "Dados obrigatórios ausentes (type, plan)" },
        { status: 400 },
      );
    }

    let itens: { quantity: number; price: number; description: string }[];
    let redirectSuffix: string;

    if (type === "upsell") {
      if (plan === "essencial") {
        itens = [
          {
            quantity: 1,
            price: 5000,
            description: "Adicionar 2º Vídeo Personalizado",
          },
        ];
      } else {
        itens = [
          {
            quantity: 1,
            price: 4700,
            description: "Entrega VIP 24h + Pôster Cinematográfico",
          },
        ];
      }
      redirectSuffix = `plan=${plan}&upsell=ok`;
    } else {
      itens = [
        {
          quantity: 1,
          price: 1700,
          description: "Pôster Cinematográfico Digital",
        },
      ];
      redirectSuffix = `plan=${plan}&downsell=ok`;
    }

    const orderNsu = `${type}-${plan}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const origin = req.headers.get("origin") || req.headers.get("referer")?.replace(/\/$/, "") || "";
    const redirectUrl = `${origin}/obrigado?${redirectSuffix}&order_nsu=${orderNsu}`;
    const webhookUrl = `${origin}/api/webhook/infinitepay`;

    const payload: Record<string, unknown> = {
      handle,
      itens,
      order_nsu: orderNsu,
      redirect_url: redirectUrl,
      webhook_url: webhookUrl,
    };

    if (customer?.name && customer?.email && customer?.phone_number) {
      payload.customer = {
        name: customer.name,
        email: customer.email,
        phone_number: customer.phone_number,
      };
    }

    console.log("[InfinitePay] Criando checkout upsell/downsell:", JSON.stringify(payload, null, 2));

    const response = await fetch(INFINITEPAY_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[InfinitePay] Erro na API upsell:", response.status, errorText);
      return NextResponse.json(
        { error: "Erro ao criar checkout de upsell na InfinitePay", details: errorText },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log("[InfinitePay] Checkout upsell criado:", JSON.stringify(data, null, 2));

    return NextResponse.json({ url: data.url || data.checkout_url || data.link, orderNsu });
  } catch (error) {
    console.error("[InfinitePay] Erro interno upsell:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar checkout de upsell" },
      { status: 500 },
    );
  }
}
