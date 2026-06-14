"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/lib/cms";
import { ProductCard } from "@/components/store/ProductCard";
import { PRODUCT_GRID_SEARCH_CLASS } from "@/components/store/product-grid";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const products = getProducts();

  const results = query.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setQuery("");
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/katalog?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-white/95 backdrop-blur-sm overflow-y-auto"
        >
          <div className="container-store pt-8 pb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-sm uppercase tracking-widest">Поиск</h2>
              <button onClick={onClose} className="text-sm uppercase tracking-widest hover:text-muted">
                Закрыть
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Название, категория..."
                className="w-full border-b border-border bg-transparent py-4 text-2xl md:text-3xl focus:outline-none focus:border-text placeholder:text-muted/50"
              />
            </form>

            {results.length > 0 && (
              <div className={`mt-8 ${PRODUCT_GRID_SEARCH_CLASS}`}>
                {results.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} compact onNavigate={onClose} />
                ))}
              </div>
            )}

            {query.length > 1 && results.length === 0 && (
              <p className="mt-8 text-muted text-sm">Ничего не найдено</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
