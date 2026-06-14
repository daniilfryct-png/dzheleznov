import type { Metadata } from "next";
import Image from "next/image";
import { getArchiveItems, getFeaturedCollection } from "@/lib/cms";

export const metadata: Metadata = {
  title: "О бренде",
  description: "D.ZHELEZNOV — Философия бренда, дизайнер, ателье.",
};

function getAboutImages() {
  const archive = getArchiveItems();
  const collection = getFeaturedCollection();

  const hero =
    archive.find((item) => item.image)?.image ??
    collection?.coverImage ??
    "";

  const portrait =
    archive.find((item, i) => i > 0 && item.image)?.image ??
    hero;

  return { hero, portrait };
}

export default function AboutPage() {
  const { hero, portrait } = getAboutImages();

  return (
    <div className="py-8 md:py-12">
      <div className="container-store max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-display mb-8">О бренде</h1>

        <div className="relative aspect-[16/9] mb-10 bg-white overflow-hidden">
          {hero ? (
            <Image
              src="/content/archive/IMG_9341.JPG"
              alt="Ателье D.ZHELEZNOV"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
              quality={90}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-widest text-muted">
              D.ZHELEZNOV
            </div>
          )}
        </div>

        <div className="prose prose-sm max-w-none space-y-6 text-muted leading-relaxed">
          <p className="text-xl text-text font-display">
            D.ZHELEZNOV исследует связь между силуэтом, формой и личным состоянием.
          </p>
          <p>
            Бренд объединяет портновское мастерство, эксперимент и влияния кутюра.
            Каждое изделие создаётся в ателье с вниманием к конструкции и посадке.
          </p>
          <p>
            Некоторые вещи ощущаются раньше, чем понимаются.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-[3/4] bg-white overflow-hidden">
            {portrait ? (
              <Image
                src="/content/archive/IMG_9718.WEBP"
                alt="Даниил Железнов"
                fill
                className="object-contain"
                sizes="400px"
                quality={90}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-widest text-muted">
                D.ZHELEZNOV
              </div>
            )}
          </div>
          <div>
            <h2 className="font-display text-2xl mb-4">Даниил Железнов</h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Основатель и креативный директор D.ZHELEZNOV. Создаёт одежду
              как архитектуру тела — с вниманием к конструкции и форме.
            </p>
            <blockquote className="text-sm italic border-l-2 border-text pl-4 text-muted">
              «Большинство вещей просто надеты.Некоторые — становятся частью человека.»
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
