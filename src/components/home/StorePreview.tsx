"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface StorePreviewProps {
  products: Product[];
}

export function StorePreview({ products }: StorePreviewProps) {
  const hero = products[0];
  if (!hero) return null;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] lg:aspect-auto lg:min-h-[600px] overflow-hidden group"
          >
            <Image
              src={hero.images[0]}
              alt={hero.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-700" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal border-l border-graphite flex flex-col justify-center p-8 md:p-16 lg:p-24"
          >
            <p className="editorial-subheading mb-4">Магазин</p>
            <h2 className="editorial-heading text-4xl md:text-5xl mb-6">
              {hero.name}
            </h2>
            <p className="editorial-body mb-4 max-w-sm">{hero.description}</p>
            <p className="text-2xl mb-10">{formatPrice(hero.price)}</p>
            <div className="btn-row max-w-sm">
              <Link href={`/katalog/${hero.slug}`} className="btn-row-item bg-text text-white hover:bg-black">
                Купить
              </Link>
              <Link href="/katalog" className="btn-row-item border border-text text-text hover:bg-text hover:text-white">
                Весь магазин
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
