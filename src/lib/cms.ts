import productsData from "@/data/products.json";
import collectionsData from "@/data/collections.json";
import archiveData from "@/data/archive.json";
import articlesData from "@/data/articles.json";
import type { Product, Collection, ArchiveItem, Article } from "@/types";

type RawProduct = Omit<Product, "care" | "color" | "colors" | "isNew" | "inStock"> & {
  care?: string;
  color?: string;
  colors?: string[];
  isNew?: boolean;
  inStock?: boolean;
  oldPrice?: number;
};

function sanitizeImages(images: string[] | undefined): string[] {
  if (!images?.length) return [];
  return images.filter(
    (img) =>
      typeof img === "string" &&
      img.length > 0 &&
      !img.endsWith("/.PNG") &&
      !img.endsWith("/.") &&
      img.startsWith("/")
  );
}

function enrichProduct(raw: RawProduct): Product {
  return {
    ...raw,
    images: sanitizeImages(raw.images),
    care: raw.care ?? "Химчистка. Не отбеливать. Гладить на низкой температуре.",
    color: raw.color ?? "Чёрный",
    colors: raw.colors ?? [raw.color ?? "Чёрный"],
    isNew: false,
    inStock: raw.inStock ?? true,
  };
}

const products = (productsData as RawProduct[]).map(enrichProduct);

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getPopularProducts(): Product[] {
  return [...products].sort((a, b) => b.price - a.price).slice(0, 4);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .slice(0, limit);
}

export function getCollectionTitle(slug: string): string {
  return getCollectionBySlug(slug)?.title ?? slug;
}

export function getCollections(): Collection[] {
  return collectionsData as Collection[];
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return getCollections().find((c) => c.slug === slug);
}

export function getFeaturedCollection(): Collection | undefined {
  return getCollections().find((c) => c.featured);
}

export function getArchiveItems(): ArchiveItem[] {
  return archiveData as ArchiveItem[];
}

export function getArchiveByCategory(category: ArchiveItem["category"]): ArchiveItem[] {
  return getArchiveItems().filter((a) => a.category === category);
}

export function getArticles(): Article[] {
  return articlesData as Article[];
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}
