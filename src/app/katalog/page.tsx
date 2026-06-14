import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogPage } from "@/components/store/CatalogPage";
import { getProducts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Каталог",
  description: "Каталог D.ZHELEZNOV — дизайнерская одежда, фильтры по размеру, категории и цене.",
};

export default function KatalogPage() {
  return (
    <Suspense fallback={<div className="container-store py-20 text-center text-muted">Загрузка...</div>}>
      <CatalogPage products={getProducts()} />
    </Suspense>
  );
}
