import type { Product } from "@/types";

export type BuyAction = "add-to-cart" | "product-page";

export const STANDARD_SIZES = ["XS", "S", "M", "L", "XL"] as const;

/** Один размер — сразу в корзину; несколько — страница изделия */
export function getBuyAction(product: Product): BuyAction {
  return product.sizes.length === 1 ? "add-to-cart" : "product-page";
}

export function canQuickAdd(product: Product): boolean {
  return getBuyAction(product) === "add-to-cart";
}

export function getProductUrl(product: Product): string {
  return `/magazin/${product.slug}`;
}

export function getOrderedSizes(product: Product): string[] {
  return STANDARD_SIZES.filter((s) => product.sizes.includes(s));
}
