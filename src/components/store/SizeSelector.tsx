"use client";

import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
  label?: string;
}

export function SizeSelector({ sizes, selected, onSelect, label = "Размер" }: SizeSelectorProps) {
  return (
    <div>
      {label && <p className="text-xs uppercase tracking-widest mb-3">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={cn("size-pill", selected === size && "size-pill-active")}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
