import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateOrderId } from "@/lib/utils";
import { yukassaIntegration, sbpIntegration } from "@/lib/payment";
import type { CartItem, CheckoutForm } from "@/types";
interface CheckoutRequest {
  items: CartItem[];
  form: CheckoutForm;
  total: number;
}
export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { items, form, total } = body;
    if (!items?.length || !form?.name || !form?.email || !form?.phone) {
      return NextResponse.json(
        { success: false, error: "Неполные данные заказа" },
        { status: 400 }
      );
    }
    const orderId = generateOrderId();
    await prisma.order.create({
      data: {
        id: orderId,
        name: form.name,
        phone: form.phone,
        email: form.email,
        city: form.city || null,
        pickupPoint: form.pickupPoint || null,
        amount: total,
        paymentStatus: "pending",
      }, 
    });
    let paymentUrl: string | undefined;
    if (form.paymentMethod === "yukassa" || form.paymentMethod === "card") {
      const payment = await yukassaIntegration.createPayment({
        amount: total,
        orderId,
        description: `Заказ D.ZHELEZNOV ${orderId}`,
        returnUrl: `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/oplata/uspeh?order=${orderId}`,
      });
      paymentUrl = payment.confirmationUrl;
    } else if (form.paymentMethod === "sbp") {
      const qr = await sbpIntegration.createQR({
        amount: total,
        orderId,
      });
      paymentUrl = qr.qrUrl;
    }
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    console.log("BOT TOKEN:", !!botToken);
    console.log("CHAT ID:", chatId);
    if (botToken && chatId) {
      const itemsText = items
        .map(
          (item) =>
            `• ${item.product.name} | Размер: ${item.size} | Кол-во: ${item.quantity}`
        )
        .join("\n");
      const text = `
🛒 НОВЫЙ ЗАКАЗ

🟡 СТАТУС: ОЖИДАЕТ ОПЛАТЫ

🆔 Заказ: ${orderId}
👤 Имя: ${form.name}
📞 Телефон: ${form.phone}
📧 Email: ${form.email}
🏙 Город: ${form.city || "-"}
🚚 Способ доставки: ${form.deliveryMethod}
📦 ПВЗ СДЭК:
${form.pickupPoint || "-"}
📍 Адрес:
${form.address || "-"}
💳 Способ оплаты:
${form.paymentMethod}
━━━━━━━━━━━━━━━
${itemsText}
━━━━━━━━━━━━━━━
💰 ИТОГО: ${total} ₽
`;
      await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text,
          }),
        }
      );
    }
    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl,
      message: "Заказ успешно создан",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { 
        success: false, 
        error: String(error),
      },
      { status: 500 }
    );
  }
}