import type { DeliveryOption } from "@/types";

export const deliveryOptions: DeliveryOption[] = [
  {
    id: "sdek",
    name: "СДЭК",
    description: "Доставка до пункта выдачи или курьером",
    price: 450,
    estimatedDays: "3–7 дней",
  },
];

export const pickupPoints = [
  { id: "msk-001", name: "Шоурум D.ZHELEZNOV", address: "ул. Пятницкая, 2/38, стр. 3, Москва" },
  { id: "msk-002", name: "СДЭК — Пункт выдачи", address: "ул. Ордынка, 17, Москва" },
  { id: "msk-003", name: "СДЭК — Пункт выдачи", address: "Кузнецкий мост, 7, Москва" },
];

export interface SDEKIntegration {
  apiUrl: string;
  apiKey: string;
  calculateDelivery: (params: { city: string; weight: number }) => Promise<number>;
  getPickupPoints: (city: string) => Promise<typeof pickupPoints>;
}

export interface PochtaIntegration {
  apiUrl: string;
  token: string;
  calculateDelivery: (params: { index: string; weight: number }) => Promise<number>;
}

export const sdekIntegration: SDEKIntegration = {
  apiUrl: process.env.SDEK_API_URL || "https://api.cdek.ru/v2",
  apiKey: process.env.SDEK_API_KEY || "",
  async calculateDelivery() {
    return 450;
  },
  async getPickupPoints() {
    return pickupPoints;
  },
};

export const pochtaIntegration: PochtaIntegration = {
  apiUrl: process.env.POCHTA_API_URL || "https://otpravka-api.pochta.ru",
  token: process.env.POCHTA_API_TOKEN || "",
  async calculateDelivery() {
    return 350;
  },
};

export function getDeliveryOption(id: string): DeliveryOption | undefined {
  return deliveryOptions.find((d) => d.id === id);
}
