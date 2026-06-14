import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dzheleznov.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getProducts();
  const staticPages = ["/", "/katalog", "/kolekcii", "/arkhiv", "/o-brende", "/kontakty"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const productPages = products.map((p) => ({
    url: `${SITE_URL}/katalog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages];
}
