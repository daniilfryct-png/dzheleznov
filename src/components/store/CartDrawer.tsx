"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { ProductCardImage } from "@/components/store/ProductCardImage";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80]">
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white flex flex-col shadow-xl"
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-border">
              <h2 className="text-sm uppercase tracking-widest">Корзина</h2>
              <button onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-widest hover:text-muted">
                Закрыть
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted text-sm mb-6">Корзина пуста</p>
                  <Link href="/katalog" onClick={() => setIsOpen(false)} className="btn-outline">
                    Перейти в каталог
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <div className="w-20 flex-shrink-0 border border-border/60">
                        <ProductCardImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          sizes="80px"
                          quality={80}
                          imageClassName="p-1.5"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm truncate">{item.product.name}</h3>
                        <p className="text-xs text-muted mt-1">Размер: {item.size}</p>
                        <p className="text-sm mt-2 tabular-nums">{formatPrice(item.product.price)}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                          <div className="inline-flex items-center border border-border flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="w-8 h-8 text-xs hover:bg-surface"
                            >−</button>
                            <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="w-8 h-8 text-xs hover:bg-surface"
                            >+</button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="text-xs text-muted hover:text-text sm:ml-auto"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border">
                <div className="flex justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest">Итого</span>
                  <span className="text-lg font-medium tabular-nums">{formatPrice(total)}</span>
                </div>
                <Link href="/oplata" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center block">
                  Оформить заказ
                </Link>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
