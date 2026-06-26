"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const hasImages = images.length > 0;

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-[3/4] overflow-hidden bg-white group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={hasImages ? activeIndex : "placeholder"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: isHovered && hasImages ? 1.03 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            {hasImages ? (
              <Image
                src={images[activeIndex]}
                alt={`${name} — фото ${activeIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <ProductPlaceholder />
            )}
          </motion.div>
        </AnimatePresence>
        {hasImages && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, index) => (
            <motion.button
              key={index}
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-16 h-20 overflow-hidden transition-all duration-300",
                activeIndex === index
                  ? "opacity-100 scale-105"
                  : "opacity-50 hover:opacity-80"
              )}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
