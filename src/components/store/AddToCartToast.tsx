"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AddToCartToastProps {
  visible: boolean;
  productName: string;
}

export function AddToCartToast({ visible, productName }: AddToCartToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] pointer-events-none"
        >
          <div className="flex items-center gap-4 px-6 py-4 bg-text text-white border border-text">
            <span className="w-1 h-4 bg-white" />
            <p className="text-xs uppercase tracking-[0.2em] whitespace-nowrap">
              {productName} — в корзине
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
