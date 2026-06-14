"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-end">
      <Image
        src="public/content/archive/IMG_9341.JPG"
        alt="D.ZHELEZNOV — кампания"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="image-overlay" />

      <div className="relative z-10 section-padding w-full pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="editorial-subheading mb-6">Независимый модный дом</p>
          <h1 className="editorial-heading text-6xl md:text-8xl lg:text-9xl tracking-[0.15em] uppercase mb-6">
            D.ZHELEZNOV
          </h1>
          <div className="line-accent mb-6" />
          <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light italic text-off-white/80">
            Форма создаёт состояние.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 right-8 md:right-16 hidden md:block"
        >
          <p className="editorial-subheading [writing-mode:vertical-lr] rotate-180">
            Осень / Зима 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}
