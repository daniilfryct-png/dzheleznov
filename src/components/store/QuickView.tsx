"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getOrderedSizes } from "@/lib/catalog";
import { useCart } from "@/contexts/CartContext";
import { getCollectionTitle } from "@/lib/cms";
import { ProductCardImage } from "@/components/store/ProductCardImage";
import { Lightbox } from "@/components/ui/Lightbox";
import { SizeSelector } from "./SizeSelector";
import { QuantitySelector } from "./QuantitySelector";

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const router = useRouter();
  const sizes = useMemo(() => getOrderedSizes(product), [product.id]);
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { addItem } = useCart();
  const hasImages = product.images.length > 0;
  const collectionTitle = getCollectionTitle(product.collection);

  useEffect(() => {
    if (isOpen) {
      setSelectedSize(getOrderedSizes(product)[0] ?? "");
      setQuantity(1);
      setActiveImage(0);
      setLightboxOpen(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, product.id]);

  const canAdd = Boolean(selectedSize) && product.inStock;

  const handleAdd = () => {
    if (!canAdd) return;
    addItem(product, selectedSize, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    if (!canAdd) return;
    addItem(product, selectedSize, quantity);
    onClose();
    router.push("/oplata");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] flex items-end md:items-center justify-center md:p-6"
          >
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative bg-white w-full max-w-5xl max-h-[92vh] overflow-y-auto z-10"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 text-xs uppercase tracking-widest hover:text-muted"
              >
                Закрыть
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-white p-4 md:p-6 border-b md:border-b-0 md:border-r border-border">
                  <button
                    type="button"
                    className="w-full block cursor-zoom-in border border-border/60"
                    onClick={() => hasImages && setLightboxOpen(true)}
                  >
                    <ProductCardImage
                      src={hasImages ? product.images[activeImage] : undefined}
                      alt={product.name}
                      sizes="50vw"
                      priority
                      imageClassName="p-4 md:p-6"
                    />
                  </button>
                  {product.images.length > 1 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`relative w-16 h-16 flex-shrink-0 border border-border/60 ${activeImage === i ? "ring-1 ring-text" : "opacity-60"}`}
                        >
                          <ProductCardImage
                            src={img}
                            alt=""
                            sizes="64px"
                            quality={80}
                            imageClassName="p-1"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-10 flex flex-col">
                  <p className="text-xs uppercase tracking-widest text-muted mb-2">{collectionTitle}</p>
                  <h2 className="font-display text-2xl md:text-3xl mb-2">{product.name}</h2>
                  <p className="text-xl font-medium tabular-nums mb-4">{formatPrice(product.price)}</p>
                  <p className="text-sm text-muted leading-relaxed mb-6 whitespace-pre-line">{product.description}</p>

                  <div className="space-y-5 mb-8">
                    <SizeSelector sizes={sizes} selected={selectedSize} onSelect={setSelectedSize} />
                    <QuantitySelector quantity={quantity} onChange={setQuantity} />
                  </div>

                  <div className="mt-auto space-y-3 w-full">
                    <button type="button" onClick={handleAdd} disabled={!canAdd} className="btn-primary w-full disabled:opacity-40">
                      Добавить в корзину
                    </button>
                    <button type="button" onClick={handleBuyNow} disabled={!canAdd} className="btn-outline w-full disabled:opacity-40">
                      Купить сейчас
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
