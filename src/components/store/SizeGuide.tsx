"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizeData = [
  { size: "XS", chest: "84", waist: "64", hips: "88" },
  { size: "S", chest: "88", waist: "68", hips: "92" },
  { size: "M", chest: "92", waist: "72", hips: "96" },
  { size: "L", chest: "96", waist: "76", hips: "100" },
  { size: "XL", chest: "100", waist: "80", hips: "104" },
];

export function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative bg-white border border-border max-w-md w-full p-8 z-10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-xs uppercase tracking-widest hover:text-muted">
              Закрыть
            </button>
            <h2 className="font-display text-2xl mb-2">Размерная сетка</h2>
            <p className="text-sm text-muted mb-6">Все измерения в сантиметрах</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-xs uppercase tracking-widest">Размер</th>
                  <th className="text-left py-2 text-xs uppercase tracking-widest">Грудь</th>
                  <th className="text-left py-2 text-xs uppercase tracking-widest">Талия</th>
                  <th className="text-left py-2 text-xs uppercase tracking-widest">Бёдра</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row) => (
                  <tr key={row.size} className="border-b border-border/50">
                    <td className="py-2 font-medium">{row.size}</td>
                    <td className="py-2 text-muted">{row.chest}</td>
                    <td className="py-2 text-muted">{row.waist}</td>
                    <td className="py-2 text-muted">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
