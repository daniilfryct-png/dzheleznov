"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getOrderedSizes } from "@/lib/catalog";
import { useCart } from "@/contexts/CartContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getCollectionTitle } from "@/lib/cms";
import { SizeSelector } from "@/components/store/SizeSelector";
import { QuantitySelector } from "@/components/store/QuantitySelector";
import { SizeGuide } from "@/components/store/SizeGuide";
import { ProductCard } from "@/components/store/ProductCard";
import { PRODUCT_GRID_CLASS } from "@/components/store/product-grid";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  related: Product[];
}

export function ProductPageClient({ product, related }: Props) {
  const router = useRouter();
  const sizes = getOrderedSizes(product);
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem } = useCart();
  const { addViewed, items: recent } = useRecentlyViewed();
  const { isFavorite, toggleFavorite } = useFavorites();
  const hasImages = product.images.length > 0;
  const collectionTitle = getCollectionTitle(product.collection);

  useEffect(() => {
    addViewed(product);
  }, [product, addViewed]);

  useEffect(() => {
    setSelectedSize(getOrderedSizes(product)[0] ?? "");
    setQuantity(1);
    setActiveImage(0);
  }, [product.id]);

  const canAdd = Boolean(selectedSize) && product.inStock;

  const handleAdd = () => {
    if (!canAdd) return;
    addItem(product, selectedSize, quantity);
  };
  const handleBuyNow = () => {
    if (!canAdd) return;
    addItem(product, selectedSize, quantity);
    router.push("/oplata");
  };

  const recentFiltered = recent.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="container-store py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <button
              type="button"
              className={cn(
                "relative aspect-[3/4] bg-white overflow-hidden w-full block",
                hasImages && "cursor-zoom-in"
              )}
              onClick={() => hasImages && setLightboxOpen(true)}
            >
              {hasImages ? (
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  quality={95}
                  priority
                />
              ) : (
                <ProductPlaceholder />
              )}
            </button>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative w-16 h-20 flex-shrink-0 border bg-white",
                      activeImage === i ? "border-text" : "border-border opacity-60"
                    )}
                  >
                    <Image src={img} alt="" fill className="object-contain" sizes="64px" quality={80} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:py-4">
            <Link
              href={`/kolekcii/${product.collection}`}
              className="text-xs uppercase tracking-widest text-muted hover:text-text transition-colors"
            >
              {collectionTitle}
            </Link>
            <div className="flex justify-between items-start gap-4 mt-2">
              <h1 className="font-display text-3xl md:text-4xl">{product.name}</h1>
              <button onClick={() => toggleFavorite(product.id)} className="p-2 flex-shrink-0" aria-label="Избранное">
                <svg width="22" height="22" viewBox="0 0 24 24" fill={isFavorite(product.id) ? "#111111" : "none"} stroke="#111111" strokeWidth="1.5">
                  <path d="M12 20.5l-1.1-1C5.4 14.9 2 11.6 2 7.5 2 4.4 4.4 2 7.5 2c1.7 0 3.4.8 4.5 2.1C13.1 2.8 14.8 2 16.5 2 19.6 2 22 4.4 22 7.5c0 4.1-3.4 7.4-8.9 11.9L12 20.5z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3 mt-3 mb-6">
              <p className="text-2xl font-medium tabular-nums">{formatPrice(product.price)}</p>
              {product.oldPrice && product.oldPrice > 0 && (
                <p className="text-muted line-through tabular-nums">{formatPrice(product.oldPrice)}</p>
              )}
            </div>

            <p className="text-sm text-muted leading-relaxed mb-8 whitespace-pre-line">{product.description}</p>

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1 mb-3">
                  <p className="text-xs uppercase tracking-widest">Размер</p>
                  {product.hasSizeGuide && (
                    <button
                      type="button"
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-xs text-muted hover:text-text underline flex-shrink-0"
                    >
                      Размерная сетка
                    </button>
                  )}
                </div>
                <SizeSelector sizes={sizes} selected={selectedSize} onSelect={setSelectedSize} label="" />
              </div>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            <div className="space-y-3 sticky bottom-0 bg-white py-4 border-t border-border lg:border-0 lg:static lg:py-0">
              <button type="button" onClick={handleAdd} disabled={!canAdd} className="btn-primary w-full disabled:opacity-40">Добавить в корзину</button>
              <button type="button" onClick={handleBuyNow} disabled={!canAdd} className="btn-outline w-full disabled:opacity-40">
                Купить сейчас
              </button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-surface py-10">
          <div className="container-store">
            <h2 className="section-title mb-6">Из этой коллекции</h2>
            <div className={PRODUCT_GRID_CLASS}>
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {recentFiltered.length > 0 && (
        <section className="py-10">
          <div className="container-store">
            <h2 className="section-title mb-6">Недавно просмотренные</h2>
            <div className={PRODUCT_GRID_CLASS}>
              {recentFiltered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <SizeGuide isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      <Lightbox
        images={product.images}
        index={activeImage}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onChange={setActiveImage}
        alt={product.name}
      />
    </>
  );
}
