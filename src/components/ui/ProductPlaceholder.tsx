import { cn } from "@/lib/utils";

interface ProductPlaceholderProps {
  className?: string;
  label?: string;
}

export function ProductPlaceholder({ className, label }: ProductPlaceholderProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center bg-white border border-border",
        className
      )}
    >
      <span className="font-display text-xs tracking-[0.3em] uppercase text-muted/60">
        D.ZHELEZNOV
      </span>
      {label && (
        <span className="text-[10px] text-muted/40 mt-2 uppercase tracking-widest">{label}</span>
      )}
    </div>
  );
}
