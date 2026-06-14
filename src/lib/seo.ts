import type { Metadata } from "next";
import type { Product, Collection } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dzheleznov.com";
const DEFAULT_OG_IMAGE = "/content/collections/remind/remind-cowboy-jeans/1.PNG";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "D.ZHELEZNOV — Модный дом", template: "%s | D.ZHELEZNOV" },
  description: "D.ZHELEZNOV — Дизайнерская одежда, коллекции, онлайн-магазин.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "D.ZHELEZNOV",
    title: "D.ZHELEZNOV — Дизайнер",
    description: "Дизайнерская одежда.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export function productMetadata(product: Product): Metadata {
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, images: product.images.map((img) => ({ url: img })) },
  };
}

export function collectionMetadata(collection: Collection): Metadata {
  return {
    title: collection.title,
    description: collection.description,
    openGraph: { title: collection.title, images: [{ url: collection.coverImage }] },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "D.ZHELEZNOV",
    url: SITE_URL,
    description: "D.ZHELEZNOV",
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: "D.ZHELEZNOV" },
    offers: { "@type": "Offer", price: product.price, priceCurrency: "RUB", availability: "https://schema.org/InStock" },
  };
}
