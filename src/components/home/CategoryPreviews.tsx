import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/cms";

const COLLECTION_ORDER = ["remind", "none", "vl-pt2", "ls-2-25"];

export function CategoryPreviews() {
  const collections = getCollections().sort(
    (a, b) => COLLECTION_ORDER.indexOf(a.slug) - COLLECTION_ORDER.indexOf(b.slug)
  );

  return (
    <section className="py-8 md:py-12 bg-surface">
      <div className="container-store">
        <h2 className="section-title mb-6">Коллекции</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/kolekcii/${col.slug}`}
              className="group relative aspect-[4/5] overflow-hidden bg-white"
            >
              <Image
                src={col.coverImage}
                alt={col.title}
                fill
                sizes="25vw"
                className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <span className="absolute bottom-4 left-4 text-white text-xs uppercase tracking-widest drop-shadow">
                {col.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
