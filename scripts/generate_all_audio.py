#!/usr/bin/env python3
"""
Compatibility wrapper for the DreamLab course audio pipeline.

The old script used direct TTS with zh-CN-XiaoxiaoNeural. New course audio must
go through generate_core_audio_neural.py so every file uses:
DeepSeek/local口播稿 -> zh-CN-YunyangNeural -> ffmpeg loudnorm 24kHz mono MP3.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts/generate_core_audio_neural.py"


def main() -> int:
    args = sys.argv[1:] or ["--only-missing"]
    return subprocess.call([sys.executable, str(SCRIPT), *args])


if __name__ == "__main__":
    raise SystemExit(main())
