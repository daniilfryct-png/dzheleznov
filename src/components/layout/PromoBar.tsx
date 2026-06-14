"use client";

import { motion } from "framer-motion";

export function PromoBar() {
  const message = "Бесплатная доставка при заказе от 15 000 ₽ · Новая коллекция «Форма · Состояние» уже в каталоге";

  return (
    <div className="bg-surface border-b border-border overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap py-2.5"
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="px-8 text-[11px] uppercase tracking-[0.2em] text-muted">
            {message}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
