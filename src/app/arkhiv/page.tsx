"use client";

import { useState, useMemo } from "react";
import { getArchiveItems } from "@/lib/cms";
import { MasonryGrid } from "@/components/ui/MasonryGrid";
import { cn } from "@/lib/utils";

type ArchiveFilter = "all" | "collections";

export default function ArchivePage() {
  const items = getArchiveItems();
  const [filter, setFilter] = useState<ArchiveFilter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? items
        : items.filter((i) => i.category === "collections"),
    [items, filter]
  );

  return (
    <div className="py-8 md:py-12">
      <div className="container-store">
        <h1 className="text-2xl md:text-3xl font-display mb-2">Архив</h1>
        <p className="text-sm text-muted mb-8">Визуальный архив D.ZHELEZNOV</p>

        <div className="flex gap-2 mb-10">
          {(["all", "collections"] as const).map((id) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={cn("filter-chip", filter === id && "filter-chip-active")}
            >
              {id === "all" ? "Все" : "Коллекции"}
            </button>
          ))}
        </div>

        <MasonryGrid items={filtered} />
      </div>
    </div>
  );
}
