#!/usr/bin/env python3
"""
Enhance DreamLab book course data with course-style audio_intro scripts.

This prepares book course JSON before audio generation. It uses DeepSeek when
DEEPSEEK_API_KEY is configured and falls back to the same local intro builder.
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

from generate_book_audio_neural import DATA_CANDIDATES, fake_chapter, fake_course, find_data_file  # noqa: E402
from generate_core_audio_neural import build_script  # noqa: E402


def enhance(book: dict[str, Any]) -> dict[str, Any]:
    next_book = dict(book)
    next_book["audio_intro"] = build_script(fake_course(book), fake_chapter(book))
    return next_book


def main() -> int:
    parser = argparse.ArgumentParser(description="Enhance book course JSON with DreamLab audio intros.")
    parser.add_argument("--input", type=Path)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--in-place", action="store_true")
    parser.add_argument("--limit", type=int)
    args = parser.parse_args()

    input_path = args.input or find_data_file()
    if not input_path:
        candidates = ", ".join(str(path.relative_to(ROOT)) for path in DATA_CANDIDATES)
        print(f"No book course data found. Expected one of: {candidates}")
        return 0

    raw = json.loads(input_path.read_text(encoding="utf-8"))
    key = None
    books = raw
    if isinstance(raw, dict):
        key = "items" if "items" in raw else "books" if "books" in raw else None
        books = raw.get(key, []) if key else []

    enhanced = []
    for index, book in enumerate(books):
        if args.limit and index >= args.limit:
            enhanced.extend(books[index:])
            break
        enhanced.append(enhance(book))

    output_data = dict(raw) if isinstance(raw, dict) else enhanced
    if isinstance(raw, dict) and key:
        output_data[key] = enhanced

    output_path = input_path if args.in_place else args.output or input_path.with_name(f"{input_path.stem}.enhanced{input_path.suffix}")
    output_path.write_text(json.dumps(output_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"enhanced_books={min(len(enhanced), len(books))}")
    print(f"output={output_path.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
