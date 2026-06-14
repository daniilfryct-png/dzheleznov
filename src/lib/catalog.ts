import type { Product, CatalogFilters, SortOption } from "@/types";

export const STANDARD_SIZES = ["XS", "S", "M", "L", "XL"] as const;

export function getCategories(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.category))].sort();
}

export function getCollectionsFromProducts(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.collection))].sort();
}

export function filterProducts(products: Product[], filters: CatalogFilters): Product[] {
  let result = [...products];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.collection) {
    result = result.filter((p) => p.collection === filters.collection);
  }

  if (filters.size) {
    result = result.filter((p) => p.sizes.includes(filters.size!));
  }

  if (filters.priceMin != null) {
    result = result.filter((p) => p.price >= filters.priceMin!);
  }

  if (filters.priceMax != null) {
    result = result.filter((p) => p.price <= filters.priceMax!);
  }

  if (filters.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  return sortProducts(result, filters.sort ?? "default");
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    default:
      return sorted;
  }
}

export function getOrderedSizes(product: Product): string[] {
  const ordered = STANDARD_SIZES.filter((s) => product.sizes.includes(s));
  return ordered.length > 0 ? ordered : [...product.sizes];
}
