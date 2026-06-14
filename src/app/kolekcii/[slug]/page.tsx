import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionBySlug, getProductsByCollection, getCollections } from "@/lib/cms";
import { collectionMetadata } from "@/lib/seo";
import { ProductCard } from "@/components/store/ProductCard";
import { PRODUCT_GRID_CLASS } from "@/components/store/product-grid";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);
  if (!col) return {};
  return collectionMetadata(col);
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug);

  return (
    <div>
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1] min-h-[280px] md:min-h-[360px] lg:min-h-[420px] overflow-hidden bg-white">
        <Image
          src={collection.coverImage}
          alt={collection.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 text-white">
          <p className="text-xs uppercase tracking-widest mb-2">{collection.season} · {collection.year}</p>
          <h1 className="font-display text-3xl md:text-5xl">{collection.title}</h1>
        </div>
      </div>

      <div className="container-store py-10">
        <p className="text-sm text-muted max-w-2xl mb-10">{collection.description}</p>

        {products.length > 0 && (
          <>
            <h2 className="section-title mb-6">Изделия коллекции</h2>
            <div className={`${PRODUCT_GRID_CLASS} mb-12`}>
              {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </>
        )}

        <h2 className="section-title mb-6">Лукбук</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {collection.lookbook.map((src, i) => (
            <div key={i} className="relative aspect-[3/4] bg-white overflow-hidden">
              <Image src={src} alt={`${collection.title} ${i + 1}`} fill sizes="33vw" className="object-contain" quality={90} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/kolekcii" className="btn-outline">Все коллекции</Link>
        </div>
      </div>
    </div>
  );
}
