"use client";

import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (q: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 10,
  label = "Количество",
}: QuantitySelectorProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest mb-3">{label}</p>
      <div className="inline-flex items-center border border-border">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, quantity - 1))}
          disabled={quantity <= min}
          className={cn("w-10 h-10 text-sm", quantity <= min ? "text-muted" : "hover:bg-surface")}
        >
          −
        </button>
        <span className="w-10 text-center text-sm tabular-nums">{quantity}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, quantity + 1))}
          disabled={quantity >= max}
          className={cn("w-10 h-10 text-sm", quantity >= max ? "text-muted" : "hover:bg-surface")}
        >
          +
        </button>
      </div>
    </div>
  );
}
