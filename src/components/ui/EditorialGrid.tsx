"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GridImage {
  src: string;
  alt: string;
  span?: string;
}

interface EditorialGridProps {
  images: GridImage[];
  className?: string;
}

export function EditorialGrid({ images, className }: EditorialGridProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3", className)}>
      {images.map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className={cn(
            "relative overflow-hidden aspect-[3/4]",
            img.span || (index === 0 ? "col-span-2 row-span-2 aspect-[3/5]" : "")
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      ))}
    </div>
  );
}
