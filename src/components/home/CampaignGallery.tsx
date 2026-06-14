"use client";

import { motion } from "framer-motion";
import { EditorialGrid } from "@/components/ui/EditorialGrid";

interface CampaignGalleryProps {
  images: string[];
  title: string;
}

export function CampaignGallery({ images, title }: CampaignGalleryProps) {
  const gridImages = images.map((src, i) => ({
    src,
    alt: `${title} — кампания ${i + 1}`,
    span: i === 0 ? "col-span-2 row-span-2 aspect-[3/5]" : undefined,
  }));

  return (
    <section className="section-padding py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="editorial-subheading mb-4">Кампания</p>
        <h2 className="editorial-heading text-4xl md:text-5xl">{title}</h2>
        <div className="line-accent mt-6" />
      </motion.div>

      <EditorialGrid images={gridImages} />
    </section>
  );
}
