"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { ProductCard } from "@/components/store/ProductCard";

interface SelectedProductsProps {
  products: Product[];
}

export function SelectedProducts({ products }: SelectedProductsProps) {
  return (
    <section className="bg-graphite py-24 md:py-32">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <p className="editorial-subheading mb-4">Избранные изделия</p>
            <h2 className="editorial-heading text-4xl md:text-5xl">Выбор дома</h2>
          </div>
          <Link href="/katalog" className="btn-ghost hidden md:inline-flex">
            Все изделия →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/katalog" className="btn-outline w-full block text-center">
            Все изделия
          </Link>
        </div>
      </div>
    </section>
  );
}
