import { NextRequest, NextResponse } from "next/server";

const INFINITEPAY_API = "https://api.infinitepay.io/invoices/public/checkout/links";

export async function POST(req: NextRequest) {
  try {
    const handle = process.env.INFINITEPAY_HANDLE;
    if (!handle) {
      return NextResponse.json(
        { error: "INFINITEPAY_HANDLE não configurado" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { plan, customer, bumpPoster } = body as {
      plan: "essencial" | "duplo";
      customer: { name: string; email: string; phone_number: string };
      bumpPoster?: boolean;
    };

    if (!plan || !customer?.name || !customer?.email || !customer?.phone_number) {
      return NextResponse.json(
        { error: "Dados obrigatórios ausentes (plan, customer.name, customer.email, customer.phone_number)" },
        { status: 400 },
      );
    }

    const items: { quantity: number; price: number; description: string }[] = [];

    if (plan === "essencial") {
      items.push({
        quantity: 1,
        price: 9700,
        description: "Vídeo Personalizado — Plano Essencial",
      });
    } else {
      items.push({
        quantity: 1,
        price: 14700,
        description: "Kit 2 Vídeos Personalizados — Plano Duplo",
      });
    }

    if (bumpPoster && plan === "essencial") {
      items.push({
        quantity: 1,
        price: 1700,
        description: "Pôster Cinematográfico",
      });
    }

    const orderNsu = `${plan}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const origin = req.headers.get("origin") || req.headers.get("referer")?.replace(/\/$/, "") || "";
    const redirectUrl = `${origin}/obrigado?plan=${plan}&order_nsu=${orderNsu}`;
    const webhookUrl = `${origin}/api/webhook/infinitepay`;

    const payload = {
      handle,
      items,
      order_nsu: orderNsu,
      redirect_url: redirectUrl,
      webhook_url: webhookUrl,
      customer: {
        name: customer.name,
        email: customer.email,
        phone_number: customer.phone_number,
      },
    };

    console.log("[InfinitePay] Criando checkout:", JSON.stringify(payload, null, 2));

    const response = await fetch(INFINITEPAY_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[InfinitePay] Erro na API:", response.status, errorText);
      return NextResponse.json(
        { error: "Erro ao criar checkout na InfinitePay", details: errorText },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log("[InfinitePay] Checkout criado:", JSON.stringify(data, null, 2));

    return NextResponse.json({ url: data.url || data.checkout_url || data.link, orderNsu });
  } catch (error) {
    console.error("[InfinitePay] Erro interno:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar checkout" },
      { status: 500 },
    );
  }
}
