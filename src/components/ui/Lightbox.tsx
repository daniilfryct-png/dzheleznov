"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  images: string[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
  onChange: (index: number) => void;
  alt?: string;
}

export function Lightbox({ images, index, isOpen, onClose, onChange, alt = "" }: LightboxProps) {
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onChange(index - 1);
  }, [hasPrev, index, onChange]);

  const goNext = useCallback(() => {
    if (hasNext) onChange(index + 1);
  }, [hasNext, index, onChange]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && images[index] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white text-xs uppercase tracking-widest hover:text-white/70"
          >
            Закрыть
          </button>

          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 z-10 text-white text-2xl px-3 py-2 hover:text-white/70"
              aria-label="Предыдущее"
            >
              ‹
            </button>
          )}

          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 z-10 text-white text-2xl px-3 py-2 hover:text-white/70"
              aria-label="Следующее"
            >
              ›
            </button>
          )}

          <div
            className="relative w-full h-full max-w-[95vw] max-h-[90vh] m-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={`${alt} ${index + 1}`}
              fill
              className="object-contain"
              sizes="95vw"
              quality={95}
              priority
            />
          </div>

          {images.length > 1 && (
            <p className="absolute bottom-4 text-white/60 text-xs tracking-widest">
              {index + 1} / {images.length}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
