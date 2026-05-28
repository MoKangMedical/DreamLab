#!/usr/bin/env python3
"""
Audit DreamLab course audio against the Lesson1 A-grade benchmark.

Checks:
- MP3 can be probed by ffprobe.
- sample_rate = 24000Hz.
- mono channel.
- bitrate near 48kbps or 64kbps.
- practical course intro duration.
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIO_DIR = ROOT / "frontend/public/audio/courses"


def ffprobe(path: Path) -> dict:
    result = subprocess.run(
        [
            "ffprobe",
            "-v", "error",
            "-print_format", "json",
            "-show_streams",
            "-show_format",
            str(path),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def audit_file(path: Path) -> tuple[str, list[str]]:
    issues: list[str] = []
    try:
        data = ffprobe(path)
        stream = next((item for item in data.get("streams", []) if item.get("codec_type") == "audio"), {})
        fmt = data.get("format", {})
        sample_rate = int(stream.get("sample_rate") or 0)
        channels = int(stream.get("channels") or 0)
        duration = float(fmt.get("duration") or stream.get("duration") or 0)
        bit_rate = int(fmt.get("bit_rate") or stream.get("bit_rate") or 0)

        if sample_rate != 24000:
            issues.append(f"sample_rate={sample_rate}")
        if channels != 1:
            issues.append(f"channels={channels}")
        if not (43000 <= bit_rate <= 70000):
            issues.append(f"bit_rate={bit_rate}")
        if not (20 <= duration <= 90):
            issues.append(f"duration={duration:.2f}s")
    except Exception as exc:
        issues.append(f"probe_failed={exc}")

    return ("A" if not issues else "B", issues)


def main() -> int:
    files = sorted(AUDIO_DIR.glob("*.mp3"))
    if not files:
        print(f"No MP3 files found in {AUDIO_DIR}")
        return 1

    grades = {"A": 0, "B": 0}
    issue_rows: list[str] = []
    for path in files:
        grade, issues = audit_file(path)
        grades[grade] += 1
        if issues:
            issue_rows.append(f"{path.name}: {', '.join(issues)}")

    print(f"total_audio={len(files)}")
    print(f"A={grades['A']} B={grades['B']}")
    if issue_rows:
        print("issues:")
        for row in issue_rows:
            print(f"- {row}")
        return 1

    print("issues=none")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
