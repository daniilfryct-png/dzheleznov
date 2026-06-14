import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Коллекции",
  description: "Коллекции модного дома D.ZHELEZNOV.",
};

const COLLECTION_ORDER = ["remind", "none", "vl-pt2", "ls-2-25"];

export default function CollectionsPage() {
  const collections = getCollections().sort(
    (a, b) => COLLECTION_ORDER.indexOf(a.slug) - COLLECTION_ORDER.indexOf(b.slug)
  );

  return (
    <div className="py-8 md:py-12">
      <div className="container-store">
        <h1 className="text-2xl md:text-3xl font-display mb-2">Коллекции</h1>
        <p className="text-sm text-muted mb-8">Коллекции D.ZHELEZNOV</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {collections.map((col) => (
            <Link key={col.id} href={`/kolekcii/${col.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-white mb-4">
                <Image
                  src={col.coverImage}
                  alt={col.title}
                  fill
                  sizes="50vw"
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                  quality={90}
                />
              </div>
              <h2 className="font-display text-2xl mt-1 group-hover:text-muted transition-colors">{col.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
