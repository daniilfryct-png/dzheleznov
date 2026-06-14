import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductGrid } from "@/components/store/ProductGrid";
import { CollectionBanners } from "@/components/home/CollectionBanners";
import { ArchivePreview } from "@/components/home/ArchivePreview";
import { InstagramPreview } from "@/components/home/InstagramPreview";
import { Newsletter } from "@/components/home/Newsletter";
import {
  getFeaturedProducts,
  getPopularProducts,
  getCollections,
  getArchiveItems,
} from "@/lib/cms";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const popular = getPopularProducts();
  const collections = getCollections();
  const archive = getArchiveItems();

  return (
    <>
      <HeroBanner />
      <ProductGrid
        products={featured}
        title="Избранное"
        subtitle="Ключевые изделия сезона"
        linkHref="/katalog"
        linkLabel="Весь каталог"
      />
      <CollectionBanners collections={collections} />
      <ArchivePreview items={archive} />
      <ProductGrid
        products={popular}
        title="Популярное"
        linkHref="/katalog"
        linkLabel="Каталог"
      />
      <Newsletter />
      <InstagramPreview />
    </>
  );
}
