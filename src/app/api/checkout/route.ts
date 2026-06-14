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
🛒 Новый заказ
№ ${orderId}
👤 Имя: ${form.name}
📞 Телефон: ${form.phone}
📧 Email: ${form.email}
🚚 Доставка: ${form.deliveryMethod}
📍 Адрес: ${form.address || form.pickupPoint || "-"}
💳 Оплата: ${form.paymentMethod}
${itemsText}
💰 Итого: ${total} ₽
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
      { success: false, error: "Ошибка обработки заказа" },
      { status: 500 }
    );
  }
}