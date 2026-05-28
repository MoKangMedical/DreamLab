#!/usr/bin/env python3
"""
Generate DreamLab book course audio with the same neural TTS standard.

Expected optional input files:
- frontend/public/data/book-courses.json
- frontend/public/data/books.json
- frontend/public/data/book_courses.json

Output:
- frontend/public/audio/books/book{book_id}.mp3
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parents[0]
sys.path.insert(0, str(SCRIPT_DIR))

from generate_core_audio_neural import build_script, synthesize  # noqa: E402

DATA_CANDIDATES = [
    ROOT / "frontend/public/data/book-courses.json",
    ROOT / "frontend/public/data/books.json",
    ROOT / "frontend/public/data/book_courses.json",
]
OUTPUT_DIR = ROOT / "frontend/public/audio/books"


def find_data_file() -> Path | None:
    return next((path for path in DATA_CANDIDATES if path.exists()), None)


def book_id(book: dict[str, Any], index: int) -> int | str:
    return book.get("id") or book.get("book_id") or index + 1


def fake_course(book: dict[str, Any]) -> dict[str, Any]:
    return {
        "title": book.get("title") or book.get("name") or "DreamLab 书目课程",
        "description": book.get("summary") or book.get("description") or book.get("intro") or "",
    }


def fake_chapter(book: dict[str, Any]) -> dict[str, Any]:
    return {
        "title": book.get("lesson_title") or "书目导读",
        "body": book.get("content") or book.get("body") or book.get("notes") or "",
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate DreamLab book-course neural audio.")
    parser.add_argument("--limit", type=int)
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--bitrate", default="48k", choices=["48k", "64k"])
    args = parser.parse_args()

    data_file = find_data_file()
    if not data_file:
        print("No book course data found. Add book-courses.json/books.json to frontend/public/data first.")
        return 0

    books = json.loads(data_file.read_text(encoding="utf-8"))
    if isinstance(books, dict):
        books = books.get("items") or books.get("books") or []

    total = 0
    for index, book in enumerate(books):
        if args.limit and total >= args.limit:
            break
        bid = book_id(book, index)
        output = OUTPUT_DIR / f"book{bid}.mp3"
        if output.exists() and not args.force:
            continue
        script = build_script(fake_course(book), fake_chapter(book))
        total += 1
        print(f"[{total}] book{bid} script({len(script)}): {script}")
        if not args.dry_run:
            synthesize(script, output, args.bitrate)
            print(f"  ok: {output.relative_to(ROOT)}")

    print(f"book_audio_targets={total}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
