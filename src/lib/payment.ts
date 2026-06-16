import type { PaymentOption } from "@/types";

export const paymentOptions: PaymentOption[] = [
  {
    id: "yukassa",
    name: "ЮKassa",
    description: "Оплата через платёжную систему ЮKassa",
  },
];

export interface YukassaIntegration {
  shopId: string;
  secretKey: string;
  apiUrl: string;
  createPayment: (params: {
    amount: number;
    orderId: string;
    description: string;
    returnUrl: string;
  }) => Promise<{ paymentId: string; confirmationUrl: string }>;
}

export interface SBPIntegration {
  merchantId: string;
  apiUrl: string;
  createQR: (params: { amount: number; orderId: string }) => Promise<{ qrUrl: string }>;
}

interface YukassaPaymentResponse {
  id: string;
  confirmation?: {
    confirmation_url?: string;
  };
}

export const yukassaIntegration: YukassaIntegration = {
  shopId: process.env.YUKASSA_SHOP_ID || "",
  secretKey: process.env.YUKASSA_SECRET_KEY || "",
  apiUrl: "https://api.yookassa.ru/v3",
  async createPayment({ amount, orderId, description, returnUrl }) {
    const { shopId, secretKey, apiUrl } = yukassaIntegration;

    if (!shopId || !secretKey) {
      throw new Error("YUKASSA_SHOP_ID and YUKASSA_SECRET_KEY must be configured");
    }

    const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64");

    const response = await fetch(`${apiUrl}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        "Idempotence-Key": orderId,
      },
      body: JSON.stringify({
        amount: {
          value: amount.toFixed(2),
          currency: "RUB",
        },
        capture: true,
        confirmation: {
          type: "redirect",
          return_url: returnUrl,
        },
        description,
        metadata: {
          order_id: orderId,
        },
      }),
    });

    const data: YukassaPaymentResponse = await response.json();

    if (!response.ok) {
      throw new Error(`YooKassa payment failed: ${JSON.stringify(data)}`);
    }

    const confirmationUrl = data.confirmation?.confirmation_url;
    if (!data.id || !confirmationUrl) {
      throw new Error(`YooKassa payment response is incomplete: ${JSON.stringify(data)}`);
    }

    return {
      paymentId: data.id,
      confirmationUrl,
    };
  },
};

export const sbpIntegration: SBPIntegration = {
  merchantId: process.env.SBP_MERCHANT_ID || "",
  apiUrl: process.env.SBP_API_URL || "",
  async createQR({ amount, orderId }) {
    return {
      qrUrl: `/api/payment/sbp?order=${orderId}&amount=${amount}`,
    };
  },
};

export function getPaymentOption(id: string): PaymentOption | undefined {
  return paymentOptions.find((p) => p.id === id);
}
