"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Collection } from "@/types";

interface FeaturedCollectionProps {
  collection: Collection;
}

export function FeaturedCollection({ collection }: FeaturedCollectionProps) {
  return (
    <section className="section-padding py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1"
        >
          <p className="editorial-subheading mb-4">Избранная коллекция</p>
          <h2 className="editorial-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            {collection.title}
          </h2>
          <p className="editorial-body mb-4">{collection.season} {collection.year}</p>
          <div className="line-accent mb-8" />
          <p className="editorial-body max-w-md mb-8 leading-relaxed">
            {collection.description}
          </p>
          <p className="font-display text-xl italic text-off-white/70 mb-10">
            {collection.statement}
          </p>
          <Link href={`/kolekcii/${collection.slug}`} className="btn-outline">
            Смотреть коллекцию
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-7 order-1 lg:order-2"
        >
          <Link href={`/kolekcii/${collection.slug}`} className="block relative aspect-[4/5] overflow-hidden group">
            <Image
              src={collection.coverImage}
              alt={collection.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
