import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { PRODUCT_GRID_CLASS } from "./product-grid";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  linkHref?: string;
  linkLabel?: string;
}

export function ProductGrid({ products, title, subtitle, linkHref, linkLabel }: ProductGridProps) {
  if (!products.length) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="container-store">
        {(title || linkHref) && (
          <div className="flex justify-between items-end mb-6 md:mb-8">
            <div>
              {title && <h2 className="section-title">{title}</h2>}
              {subtitle && <p className="section-subtitle mt-1">{subtitle}</p>}
            </div>
            {linkHref && linkLabel && (
              <a href={linkHref} className="text-xs uppercase tracking-widest hover:text-text transition-colors hidden md:block">
                {linkLabel} →
              </a>
            )}
          </div>
        )}
        <div className={PRODUCT_GRID_CLASS}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
