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

export const yukassaIntegration: YukassaIntegration = {
  shopId: process.env.YUKASSA_SHOP_ID || "",
  secretKey: process.env.YUKASSA_SECRET_KEY || "",
  apiUrl: "https://api.yookassa.ru/v3",
  async createPayment({ amount, orderId, description, returnUrl }) {
    return {
      paymentId: `yk_${orderId}`,
      confirmationUrl: `${returnUrl}?payment=pending&order=${orderId}&amount=${amount}&desc=${encodeURIComponent(description)}`,
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
