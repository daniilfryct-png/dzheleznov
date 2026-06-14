import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, currency = "₽"): string {
  if (price <= 0) return "Цена по запросу";
  return new Intl.NumberFormat("ru-RU").format(price) + " " + currency;
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DZ-${timestamp}-${random}`;
}
