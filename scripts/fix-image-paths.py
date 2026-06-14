#!/usr/bin/env python3
"""Align products.json and collections.json image paths with files on disk."""

from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import quote

PUBLIC = Path(__file__).resolve().parent.parent / "public"
DATA = Path(__file__).resolve().parent.parent / "src" / "data"
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".heif"}


def image_sort_key(name: str) -> tuple:
    match = re.match(r"^(\d+)", name)
    if match:
        return (0, int(match.group(1)), name.lower())
    match = re.search(r"img_(\d+)", name, re.I)
    if match:
        return (1, int(match.group(1)), name.lower())
    return (2, 0, name.lower())


def list_images(folder: Path) -> list[Path]:
    files = [
        p
        for p in folder.iterdir()
        if p.is_file() and p.suffix.lower() in IMAGE_EXT and not p.name.startswith(".")
    ]
    return sorted(files, key=lambda p: image_sort_key(p.name))


def public_url(path: Path) -> str:
    rel = path.relative_to(PUBLIC).as_posix()
    return "/" + "/".join(quote(part) for part in rel.split("/"))


def get_product_images(collection_slug: str, product_slug: str) -> list[str]:
    folder = PUBLIC / "content" / "collections" / collection_slug / product_slug
    if not folder.is_dir():
        return []
    return [public_url(p) for p in list_images(folder)]


def main() -> None:
    products_path = DATA / "products.json"
    collections_path = DATA / "collections.json"

    products = json.loads(products_path.read_text(encoding="utf-8"))
    collections = json.loads(collections_path.read_text(encoding="utf-8"))

    updated_products = 0
    for product in products:
        disk_images = get_product_images(product["collection"], product["slug"])
        if disk_images and disk_images != product["images"]:
            product["images"] = disk_images
            updated_products += 1

    updated_collections = 0
    for collection in collections:
        slug = collection["slug"]
        collection_products = [p for p in products if p["collection"] == slug and p["images"]]

        if not collection_products:
            continue

        new_cover = collection_products[0]["images"][0]
        new_campaign = [p["images"][0] for p in collection_products if p["images"]]
        new_lookbook = new_campaign

        changed = False
        if collection["coverImage"] != new_cover:
            collection["coverImage"] = new_cover
            changed = True
        if collection["campaignImages"] != new_campaign:
            collection["campaignImages"] = new_campaign
            changed = True
        if collection["lookbook"] != new_lookbook:
            collection["lookbook"] = new_lookbook
            changed = True
        if changed:
            updated_collections += 1

    products_path.write_text(
        json.dumps(products, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    collections_path.write_text(
        json.dumps(collections, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Updated products: {updated_products}")
    print(f"Updated collections: {updated_collections}")


if __name__ == "__main__":
    main()
