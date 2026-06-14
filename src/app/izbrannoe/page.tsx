"use client";

import { getProducts } from "@/lib/cms";
import { useFavorites } from "@/contexts/FavoritesContext";
import { ProductCard } from "@/components/store/ProductCard";
import { PRODUCT_GRID_CLASS } from "@/components/store/product-grid";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const products = getProducts().filter((p) => favorites.includes(p.id));

  return (
    <div className="container-store py-10">
      <h1 className="text-2xl md:text-3xl font-display mb-2">Избранное</h1>
      <p className="text-sm text-muted mb-8">{products.length} изделий</p>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted mb-6">Список избранного пуст</p>
          <Link href="/katalog" className="btn-primary">Перейти в каталог</Link>
        </div>
      ) : (
        <div className={PRODUCT_GRID_CLASS}>
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
