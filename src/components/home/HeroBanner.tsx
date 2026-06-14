"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedCollection } from "@/lib/cms";

export function HeroBanner() {
  const collection = getFeaturedCollection();

  if (!collection) return null;

  return (
    <section className="relative">
      <Link href={`/kolekcii/${collection.slug}`} className="block relative aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-white">
        <Image
          src={collection.coverImage}
          alt={`D.ZHELEZNOV — ${collection.title}`}
          fill
          priority
          sizes="100vw"
          className="object-contain md:object-cover"
          quality={95}
        />
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-8 left-6 md:bottom-12 md:left-12 text-white"
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-3">{collection.season}</p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl tracking-wide mb-4">
            {collection.title}
          </h1>
          <span className="inline-block border border-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-text transition-colors">
            Смотреть коллекцию
          </span>
        </motion.div>
      </Link>
    </section>
  );
}
