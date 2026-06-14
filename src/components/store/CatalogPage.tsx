"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, CatalogFilters, SortOption } from "@/types";
import { filterProducts, getCategories } from "@/lib/catalog";
import { getCollections } from "@/lib/cms";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import { PRODUCT_GRID_CLASS } from "./product-grid";

interface CatalogPageProps {
  products: Product[];
  title?: string;
  initialFilters?: CatalogFilters;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "По умолчанию" },
  { value: "price-asc", label: "Цена ↑" },
  { value: "price-desc", label: "Цена ↓" },
  { value: "name-asc", label: "А → Я" },
];

export function CatalogPage({ products, title = "Каталог", initialFilters = {} }: CatalogPageProps) {
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<CatalogFilters>({
    ...initialFilters,
    search: searchParams.get("q") ?? initialFilters.search,
  });

  useEffect(() => {
    const q = searchParams.get("q");
    const category = searchParams.get("category");
    setFilters((f) => ({
      ...f,
      ...(q ? { search: q } : {}),
      ...(category ? { category } : {}),
    }));
  }, [searchParams]);

  const categories = getCategories(products);
  const collections = getCollections();
  const filtered = useMemo(() => filterProducts(products, filters), [products, filters]);

  const update = (patch: Partial<CatalogFilters>) =>
    setFilters((f) => ({ ...f, ...patch }));

  const clearFilters = () => setFilters({ sort: filters.sort });

  const activeCount = [
    filters.category, filters.collection, filters.size,
    filters.priceMin, filters.priceMax, filters.inStockOnly,
  ].filter(Boolean).length;

  return (
    <div className="py-6 md:py-10">
      <div className="container-store">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 w-full">
          <div>
            <h1 className="text-2xl md:text-3xl font-display tracking-wide">{title}</h1>
            <p className="text-sm text-muted mt-1">{filtered.length} изделий</p>
          </div>
          <div className="btn-row-toolbar md:justify-end md:ml-auto">
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="btn-outline text-[10px] py-2 w-full sm:w-auto sm:flex-shrink-0"
            >
              Фильтры {activeCount > 0 && `(${activeCount})`}
            </button>
            <select
              value={filters.sort ?? "default"}
              onChange={(e) => update({ sort: e.target.value as SortOption })}
              className="input-field w-full sm:w-auto sm:min-w-[160px] text-[10px] py-2 pr-8"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12">
          <aside className={cn(
            "w-full lg:w-56 xl:w-64 flex-shrink-0 space-y-6",
            filtersOpen ? "block" : "hidden lg:block"
          )}>
            <div>
              <p className="text-xs uppercase tracking-widest mb-3">Категория</p>
              <div className="flex flex-col gap-1">
                <button type="button" onClick={() => update({ category: undefined })} className={cn("filter-chip text-left w-full", !filters.category && "filter-chip-active")}>Все</button>
                {categories.map((c) => (
                  <button type="button" key={c} onClick={() => update({ category: c })} className={cn("filter-chip text-left w-full", filters.category === c && "filter-chip-active")}>{c}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest mb-3">Коллекция</p>
              <div className="flex flex-col gap-1">
                <button type="button" onClick={() => update({ collection: undefined })} className={cn("filter-chip text-left w-full", !filters.collection && "filter-chip-active")}>Все</button>
                {collections.map((c) => (
                  <button type="button" key={c.slug} onClick={() => update({ collection: c.slug })} className={cn("filter-chip text-left w-full", filters.collection === c.slug && "filter-chip-active")}>{c.title}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest mb-3">Размер</p>
              <div className="grid grid-cols-5 gap-1">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button type="button" key={s} onClick={() => update({ size: filters.size === s ? undefined : s })} className={cn("filter-chip w-full px-0", filters.size === s && "filter-chip-active")}>{s}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest mb-3">Цена</p>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="От" value={filters.priceMin ?? ""} onChange={(e) => update({ priceMin: e.target.value ? Number(e.target.value) : undefined })} className="input-field text-xs py-2 w-full min-w-0" />
                <input type="number" placeholder="До" value={filters.priceMax ?? ""} onChange={(e) => update({ priceMax: e.target.value ? Number(e.target.value) : undefined })} className="input-field text-xs py-2 w-full min-w-0" />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={filters.inStockOnly ?? false} onChange={(e) => update({ inStockOnly: e.target.checked })} className="accent-text" />
              Только в наличии
            </label>

            {activeCount > 0 && (
              <button onClick={clearFilters} className="text-xs uppercase tracking-widest text-text hover:text-muted">
                Сбросить фильтры
              </button>
            )}
          </aside>

          <div className="flex-1 min-w-0 w-full">
            {filtered.length === 0 ? (
              <p className="text-muted text-center py-20">Ничего не найдено</p>
            ) : (
              <div className={PRODUCT_GRID_CLASS}>
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
