import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createCdekOrder,
  getCdekOrder,
} from "@/lib/cdek";
import {
  sendOrderEmail,
  sendTrackingEmail,
} from "@/lib/mail";
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

        const order = await prisma.order.findUnique({
          where: {
            id: orderId,
          },
        });

        if (order?.email) {
          try {
            await sendOrderEmail(
              order.email,
              order.id
            );

            console.log(
              "EMAIL SENT:",
              order.email
            );
          } catch (emailError) {
            console.error(
              "EMAIL ERROR:",
              emailError
            );
          }
        }

        if (order && order.pickupPoint) {
          try {
            const cdekResult = await createCdekOrder({
              id: order.id,
              name: order.name,
              phone: order.phone,
              pickupPoint: order.pickupPoint,
            });

            if (cdekResult?.entity?.uuid) {
              const cdekOrder = await getCdekOrder(
                cdekResult.entity.uuid
              );
              console.log(
                "CDEK ORDER FULL:",
                JSON.stringify(cdekOrder, null, 2)
              );

              await prisma.order.update({
                where: {
                  id: order.id,
                },
                data: {
                  cdekOrderId: cdekResult.entity.uuid,
                  trackingNumber:
                    cdekOrder?.entity?.cdek_number || null,
                },
              });
              if (
                order.email &&
                cdekOrder?.entity?.cdek_number
              ) {
                await sendTrackingEmail(
                  order.email,
                  order.id,
                  cdekOrder.entity.cdek_number
                );
              }
            }

          } catch (cdekError) {
            console.error(
              "CDEK CREATE ERROR:",
              cdekError
            );
          }
        }
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
      {
        error: "Webhook error",
      },
      {
        status: 500,
      }
    );
  }
}