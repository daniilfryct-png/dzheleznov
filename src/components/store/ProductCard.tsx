"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getOrderedSizes } from "@/lib/catalog";
import { ProductCardImage } from "./ProductCardImage";
import { QuickView } from "./QuickView";

interface ProductCardProps {
  product: Product;
  index?: number;
  /** Hide hover action bar (e.g. compact search grid). */
  compact?: boolean;
  /** Called when navigating to product page. */
  onNavigate?: () => void;
}

export function ProductCard({ product, index = 0, compact = false, onNavigate }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const sizes = getOrderedSizes(product);
  const hasImages = product.images.length > 0;
  const hasSecond = product.images.length > 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (sizes.length === 1) {
      addItem(product, sizes[0]);
    } else {
      setQuickOpen(true);
    }
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group flex h-full flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative mb-4 border border-border/60 overflow-hidden">
          <Link href={`/katalog/${product.slug}`} className="block" onClick={() => onNavigate?.()}>
            <ProductCardImage
              src={hasImages ? product.images[0] : undefined}
              secondarySrc={hasSecond ? product.images[1] : undefined}
              alt={product.name}
              showSecondary={hasSecond && hovered}
            />
          </Link>

          {!product.inStock && (
            <span className="absolute inset-0 bg-white/60 flex items-center justify-center text-xs uppercase tracking-widest">
              Нет в наличии
            </span>
          )}

          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
            className={cn(
              "absolute top-3 right-3 p-1.5 bg-white/90 border border-border/50 transition-opacity z-10",
              compact ? "opacity-100" : hovered ? "opacity-100" : "opacity-0 md:opacity-0"
            )}
            aria-label="Избранное"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite(product.id) ? "#111111" : "none"} stroke={isFavorite(product.id) ? "#111111" : "currentColor"} strokeWidth="1.5">
              <path d="M12 20.5l-1.1-1C5.4 14.9 2 11.6 2 7.5 2 4.4 4.4 2 7.5 2c1.7 0 3.4.8 4.5 2.1C13.1 2.8 14.8 2 16.5 2 19.6 2 22 4.4 22 7.5c0 4.1-3.4 7.4-8.9 11.9L12 20.5z" />
            </svg>
          </button>

          {!compact && (
            <div
              className={cn(
                "absolute bottom-0 inset-x-0 p-1.5 sm:p-2 btn-row transition-all duration-300 z-10",
                "opacity-100 translate-y-0",
                "md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
              )}
            >
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickOpen(true); }}
                className="btn-row-item bg-white hover:bg-surface border border-border"
              >
                <span className="lg:hidden">Просмотр</span>
                <span className="hidden lg:inline">Быстрый просмотр</span>
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn-row-item bg-text text-white hover:bg-black disabled:opacity-40"
              >
                В корзину
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col min-h-[3.5rem]">
          <Link href={`/katalog/${product.slug}`} className="block flex-1" onClick={() => onNavigate?.()}>
            <h3 className="text-sm leading-snug group-hover:text-muted transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm font-medium tabular-nums">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p className="text-xs text-muted line-through tabular-nums">{formatPrice(product.oldPrice)}</p>
            )}
          </div>
        </div>
      </motion.article>

      <QuickView product={product} isOpen={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}
