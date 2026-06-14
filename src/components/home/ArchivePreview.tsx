import Image from "next/image";
import Link from "next/link";
import type { ArchiveItem } from "@/types";

export function ArchivePreview({ items }: { items: ArchiveItem[] }) {
  return (
    <section className="py-8 md:py-12 bg-surface">
      <div className="container-store">
        <div className="flex justify-between items-end mb-6">
          <h2 className="section-title">Архив</h2>
          <Link href="/arkhiv" className="text-xs uppercase tracking-widest hover:text-text transition-colors">
            Весь архив →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.slice(0, 4).map((item) => (
            <Link key={item.id} href="/arkhiv" className="group relative aspect-[3/4] overflow-hidden bg-white">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="25vw"
                className="object-contain group-hover:opacity-90 transition-opacity duration-500"
                quality={85}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
