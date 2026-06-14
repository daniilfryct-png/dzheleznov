import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";

interface ProductCardImageProps {
  src?: string;
  secondarySrc?: string;
  alt: string;
  showSecondary?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

function isLocalImageSrc(src: string): boolean {
  return src.startsWith("/") && !src.startsWith("//");
}

/**
 * Square 1:1 product image — single source of truth for all product imagery in cards and previews.
 */
export function ProductCardImage({
  src,
  secondarySrc,
  alt,
  showSecondary = false,
  className,
  imageClassName,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  priority = false,
  quality = 90,
}: ProductCardImageProps) {
  const hasImage = Boolean(src && isLocalImageSrc(src));
  const hasSecondary = Boolean(secondarySrc && isLocalImageSrc(secondarySrc));

  return (
    <div
      className={cn(
        "relative aspect-square w-full bg-white overflow-hidden",
        className
      )}
    >
      {hasImage ? (
        <>
          <Image
            src={src!}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            className={cn(
              "object-contain object-center p-3 md:p-4 transition-opacity duration-500",
              showSecondary && hasSecondary ? "opacity-0" : "opacity-100",
              imageClassName
            )}
          />
          {hasSecondary && (
            <Image
              src={secondarySrc!}
              alt={`${alt} — вид 2`}
              fill
              sizes={sizes}
              quality={quality}
              className={cn(
                "object-contain object-center p-3 md:p-4 transition-opacity duration-500",
                showSecondary ? "opacity-100" : "opacity-0",
                imageClassName
              )}
            />
          )}
        </>
      ) : (
        <ProductPlaceholder />
      )}
    </div>
  );
}
