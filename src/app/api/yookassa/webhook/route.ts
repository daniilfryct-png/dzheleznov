import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    webhook: "yookassa",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(
      "YOOKASSA WEBHOOK:",
      JSON.stringify(body, null, 2)
    );

    const event = body.event;
    const payment = body.object;

    if (event === "payment.succeeded") {
      const orderId = payment.metadata?.order_id;
      if (orderId) {
        await prisma.order.update({
          where: {
            id: orderId,
          },
          data: {
            paymentStatus: "paid",
          },
        });
      }
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: `🟢 ЗАКАЗ ОПЛАЧЕН

№ ${orderId}

💰 Сумма: ${payment.amount.value} ₽

🧾 Payment ID:
${payment.id}`,
            }),
          }
        );
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);

    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}