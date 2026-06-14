"use client";

import { motion } from "framer-motion";

export function DesignerStatement() {
  return (
    <section className="section-padding py-24 md:py-40">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="editorial-subheading mb-8"
        >
          Заявление дизайнера
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-balance mb-12"
        >
          «Одежда — это не украшение тела. Это архитектура присутствия.
          Каждый силуэт, который я создаю, — это разговор о том, как мы
          существуем в пространстве и времени.»
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="line-accent mx-auto mb-6" />
          <p className="editorial-subheading">Даниил Железнов</p>
          <p className="editorial-body mt-2">Основатель и креативный директор</p>
        </motion.div>
      </div>
    </section>
  );
}
