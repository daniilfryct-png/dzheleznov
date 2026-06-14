#!/usr/bin/env python3
"""Sync D.ZHELEZNOV catalog from uploaded photo archive."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path
from urllib.parse import quote

ARCHIVE_ROOT = Path("/Users/daniilzeleznov/Desktop/сайт фото")
SITE_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_ROOT = SITE_ROOT / "public" / "content"
DATA_DIR = SITE_ROOT / "src" / "data"

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".heif"}

COLLECTION_MAP = {
    'COLLECTION "REMIND"': {"title": "REMIND", "slug": "remind"},
    'COLLECTION "V.L.pt2"': {"title": "V.L.pt2", "slug": "vl-pt2"},
    'COLLECTION"L.S.2.25"': {"title": "L.S.2.25", "slug": "ls-2-25"},
    'COLLECTION"NONE"': {"title": "NONE", "slug": "none"},
}


def clean_name(name: str) -> str:
    name = name.strip()
    name = re.sub(r'^"([^"]+)"\s*', r"\1 ", name)
    return name.replace('"', "").strip()


def slugify(value: str) -> str:
    value = clean_name(value).lower()
    value = value.replace("'", "")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


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
        if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS and not p.name.startswith(".")
    ]
    return sorted(files, key=lambda p: image_sort_key(p.name))


def convert_heic(source: Path, dest: Path) -> Path:
    dest = dest.with_suffix(".jpg")
    subprocess.run(
        ["sips", "-s", "format", "jpeg", str(source), "--out", str(dest)],
        check=True,
        capture_output=True,
    )
    return dest


def copy_image(source: Path, dest: Path) -> Path:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if source.suffix.lower() in {".heic", ".heif"}:
        return convert_heic(source, dest)
    shutil.copy2(source, dest)
    return dest


def public_url(path: Path) -> str:
    rel = path.relative_to(SITE_ROOT / "public").as_posix()
    parts = rel.split("/")
    return "/" + "/".join(quote(part) for part in parts)


def detect_aspect(path: Path) -> str:
    try:
        from PIL import Image

        with Image.open(path) as img:
            w, h = img.size
            ratio = w / h
            if ratio > 1.2:
                return "landscape"
            if ratio < 0.85:
                return "portrait"
            return "square"
    except Exception:
        return "portrait"


def main() -> None:
    if PUBLIC_ROOT.exists():
        shutil.rmtree(PUBLIC_ROOT)
    PUBLIC_ROOT.mkdir(parents=True, exist_ok=True)

    products: list[dict] = []
    collections: list[dict] = []
    product_counter = 1
    collection_counter = 1

    collection_order = ["remind", "none", "vl-pt2", "ls-2-25"]
    collection_dirs = [
        p for p in ARCHIVE_ROOT.iterdir() if p.is_dir() and p.name in COLLECTION_MAP
    ]
    collection_dirs.sort(
        key=lambda p: collection_order.index(COLLECTION_MAP[p.name]["slug"])
    )

    for collection_dir in collection_dirs:
        meta = COLLECTION_MAP[collection_dir.name]
        collection_slug = meta["slug"]
        collection_title = meta["title"]
        collection_products: list[dict] = []

        product_dirs = sorted(
            [p for p in collection_dir.iterdir() if p.is_dir()],
            key=lambda p: clean_name(p.name).lower(),
        )

        for product_dir in product_dirs:
            product_name = clean_name(product_dir.name)
            product_slug = slugify(product_name)
            images = list_images(product_dir)
            if not images:
                continue

            copied_urls: list[str] = []
            dest_dir = PUBLIC_ROOT / "collections" / collection_slug / product_slug

            for image in images:
                dest = dest_dir / image.name
                copied = copy_image(image, dest)
                copied_urls.append(public_url(copied))

            product = {
                "id": f"prod-{product_counter:03d}",
                "slug": product_slug,
                "name": product_name,
                "price": 0,
                "currency": "₽",
                "description": "Описание будет добавлено.",
                "fabric": "",
                "construction": "",
                "sizes": ["XS", "S", "M", "L"],
                "images": copied_urls,
                "collection": collection_slug,
                "featured": product_counter <= 4,
                "category": "одежда",
            }
            products.append(product)
            collection_products.append(product)
            product_counter += 1

        cover_image = collection_products[0]["images"][0] if collection_products else ""
        lookbook = [p["images"][0] for p in collection_products if p["images"]]
        campaign_images = lookbook[:6]

        collections.append(
            {
                "id": f"col-{collection_counter:03d}",
                "slug": collection_slug,
                "title": collection_title,
                "year": 2025,
                "season": "Коллекция",
                "description": f"Коллекция {collection_title} D.ZHELEZNOV.",
                "statement": "",
                "coverImage": cover_image,
                "campaignImages": campaign_images,
                "lookbook": lookbook,
                "designNotes": [],
                "behindTheScenes": [],
                "featured": collection_counter == 1,
            }
        )
        collection_counter += 1

    archive_items: list[dict] = []
    archive_dir = ARCHIVE_ROOT / "arhive"
    archive_dest = PUBLIC_ROOT / "archive"
    archive_images = list_images(archive_dir)

    for index, image in enumerate(archive_images, start=1):
        dest = archive_dest / image.name
        copied = copy_image(image, dest)
        archive_items.append(
            {
                "id": f"arch-{index:03d}",
                "title": clean_name(image.stem),
                "category": "collections",
                "year": 2025,
                "image": public_url(copied),
                "description": "",
                "aspectRatio": detect_aspect(copied),
            }
        )

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (DATA_DIR / "products.json").write_text(
        json.dumps(products, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (DATA_DIR / "collections.json").write_text(
        json.dumps(collections, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (DATA_DIR / "archive.json").write_text(
        json.dumps(archive_items, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Collections: {len(collections)}")
    print(f"Products: {len(products)}")
    print(f"Archive images: {len(archive_items)}")


if __name__ == "__main__":
    main()
