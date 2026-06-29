import Image from "next/image";
import { getArchiveItems } from "@/lib/cms";

export function InstagramPreview() {
  const posts = getArchiveItems().slice(0, 6);

  return (
    <section className="py-8 md:py-12">
      <div className="container-store">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="section-title">Instagram</h2>
            <p className="section-subtitle mt-1">@d.zheleznov_</p>
          </div>
          <a href="https://instagram.com/d.zheleznov_" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest hover:text-text transition-colors">
            Подписаться →
          </a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {posts.map((item) => (
            <a key={item.id} href="https://instagram.com/d.zheleznov_" target="_blank" rel="noopener noreferrer" className="relative aspect-square overflow-hidden bg-white group">
              <Image src={item.image} alt={item.title} fill sizes="16vw" className="object-contain group-hover:scale-[1.02] transition-transform duration-500" quality={85} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
