import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/types";

const COLLECTION_ORDER = ["remind", "none", "vl-pt2", "ls-2-25"];

export function CollectionBanners({ collections }: { collections: Collection[] }) {
  const sorted = [...collections].sort(
    (a, b) => COLLECTION_ORDER.indexOf(a.slug) - COLLECTION_ORDER.indexOf(b.slug)
  );

  return (
    <section className="py-8 md:py-12">
      <div className="container-store">
        <h2 className="section-title mb-6">Коллекции</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sorted.map((col) => (
            <Link key={col.id} href={`/kolekcii/${col.slug}`} className="group relative aspect-[4/5] overflow-hidden bg-white">
              <Image
                src={col.coverImage}
                alt={col.title}
                fill
                sizes="25vw"
                className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-display text-xl md:text-2xl">{col.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
