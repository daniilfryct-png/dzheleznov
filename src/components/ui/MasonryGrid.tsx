"use client";

import { useState } from "react";
import Image from "next/image";
import type { ArchiveItem } from "@/types";
import { Lightbox } from "./Lightbox";

interface MasonryGridProps {
  items: ArchiveItem[];
}

export function MasonryGrid({ items }: MasonryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = items.map((item) => item.image);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="block w-full break-inside-avoid relative group cursor-zoom-in"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={1000}
              className="w-full h-auto object-contain bg-white transition-opacity duration-300 group-hover:opacity-90"
              quality={90}
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  );
}
