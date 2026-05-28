#!/usr/bin/env python3
"""
Generate DreamLab core course audio with the standard neural TTS chain.

Pipeline:
1. Build a 150-230 Chinese character teaching intro script.
2. Prefer DeepSeek when DEEPSEEK_API_KEY is set; fallback to a local summary.
3. Synthesize with edge-tts / zh-CN-YunyangNeural.
4. Normalize with ffmpeg loudnorm and export MP3 24kHz mono 48kbps.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import tempfile
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
COURSES_JSON = ROOT / "frontend/public/data/courses.json"
AUDIO_DIR = ROOT / "frontend/public/audio/courses"

DEEPSEEK_URL = "https://api.deepseek.com/chat/completions"
DEEPSEEK_MODEL = "deepseek-chat"
VOICE = "zh-CN-YunyangNeural"
RATE = "-6%"
PITCH = "-2Hz"
LOUDNORM = "loudnorm=I=-16:TP=-1.5:LRA=9"


def clean_text(value: str) -> str:
    value = re.sub(r"```.*?```", "", value, flags=re.S)
    value = re.sub(r"^#+\s*", "", value, flags=re.M)
    value = re.sub(r"[*_>`#-]+", "", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def clamp_script(text: str, min_len: int = 150, max_len: int = 230) -> str:
    text = clean_text(text)
    text = re.sub(r"^(口播稿|导入稿|课程口播)[:：]\s*", "", text)
    if len(text) <= max_len:
      return text
    cut = text[:max_len]
    for mark in "。！？；，":
        pos = cut.rfind(mark)
        if pos >= min_len:
            return cut[: pos + 1]
    return cut.rstrip("，；、") + "。"


def fallback_script(course: dict[str, Any], chapter: dict[str, Any]) -> str:
    title = clean_text(course.get("title", ""))
    chapter_title = clean_text(chapter.get("title", ""))
    description = clean_text(course.get("description", ""))
    seed = clamp_script(description, 70, 120)
    script = (
        f"欢迎来到《{title}》的这一节：{chapter_title}。"
        f"接下来，我们会把这一章放进一个更容易理解的心理学框架里：{seed}"
        "我们会先抓住核心问题，再回到自己的生活经验里做一次观察。你不需要急着记住所有概念，只要留下一个今天可以练习的小动作。"
    )
    return clamp_script(script)


def deepseek_script(course: dict[str, Any], chapter: dict[str, Any]) -> str | None:
    api_key = os.environ.get("DEEPSEEK_API_KEY")
    if not api_key:
        return None

    body = clean_text(chapter.get("body") or chapter.get("content") or "")
    prompt = f"""
请为 DreamLab 心理学课程生成一段中文课程口播导入稿。

要求：
- 150-230 字。
- 像老师自然开场，不要像网页朗读。
- 温和、沉稳、清晰，有心理成长引导感。
- 不要使用项目符号、标题、Markdown。
- 不要承诺治疗效果，不替代专业诊断。

课程标题：{course.get("title", "")}
课程简介：{course.get("description", "")}
章节标题：{chapter.get("title", "")}
章节正文节选：{body[:1200]}
""".strip()

    payload = {
        "model": DEEPSEEK_MODEL,
        "messages": [
            {"role": "system", "content": "你是一位擅长心理学课程口播稿的中文课程编辑。"},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.6,
        "max_tokens": 420,
    }
    req = urllib.request.Request(
        DEEPSEEK_URL,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        content = data["choices"][0]["message"]["content"]
        return clamp_script(content)
    except (urllib.error.URLError, KeyError, IndexError, json.JSONDecodeError) as exc:
        print(f"  ! DeepSeek failed, using local fallback: {exc}")
        return None


def build_script(course: dict[str, Any], chapter: dict[str, Any]) -> str:
    return deepseek_script(course, chapter) or fallback_script(course, chapter)


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)


def synthesize(script: str, output: Path, bitrate: str) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="dreamlab-audio-") as tmpdir:
        raw = Path(tmpdir) / "raw.mp3"
        run([
            "edge-tts",
            "--voice", VOICE,
            f"--rate={RATE}",
            f"--pitch={PITCH}",
            "--text", script,
            "--write-media", str(raw),
        ])
        run([
            "ffmpeg",
            "-y",
            "-i", str(raw),
            "-af", LOUDNORM,
            "-ar", "24000",
            "-ac", "1",
            "-b:a", bitrate,
            str(output),
        ])


def iter_targets(args: argparse.Namespace) -> list[tuple[dict[str, Any], dict[str, Any], Path]]:
    courses = json.loads(COURSES_JSON.read_text(encoding="utf-8"))
    targets: list[tuple[dict[str, Any], dict[str, Any], Path]] = []
    for course in courses:
        if args.course_id and int(course["id"]) != args.course_id:
            continue
        for index, chapter in enumerate(course.get("content") or []):
            order = chapter.get("order", index + 1)
            output = AUDIO_DIR / f"course{course['id']}_ch{order}.mp3"
            if args.only_missing and output.exists() and not args.force:
                continue
            targets.append((course, chapter, output))
            if args.limit and len(targets) >= args.limit:
                return targets
    return targets


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate DreamLab core course neural audio.")
    parser.add_argument("--course-id", type=int, help="Only generate one course.")
    parser.add_argument("--limit", type=int, help="Limit number of chapter audios.")
    parser.add_argument("--only-missing", action="store_true", help="Skip existing MP3 files.")
    parser.add_argument("--force", action="store_true", help="Overwrite existing MP3 files.")
    parser.add_argument("--dry-run", action="store_true", help="Print scripts without generating audio.")
    parser.add_argument("--bitrate", default="48k", choices=["48k", "64k"], help="Final MP3 bitrate.")
    args = parser.parse_args()

    targets = iter_targets(args)
    if not targets:
        print("No audio targets found.")
        return

    print(f"DreamLab audio targets: {len(targets)}")
    print(f"voice={VOICE} rate={RATE} pitch={PITCH} loudnorm={LOUDNORM} bitrate={args.bitrate}")

    for idx, (course, chapter, output) in enumerate(targets, 1):
        order = chapter.get("order", "?")
        print(f"[{idx}/{len(targets)}] course{course['id']}_ch{order} {chapter.get('title', '')}")
        script = build_script(course, chapter)
        print(f"  script({len(script)}): {script}")
        if args.dry_run:
            continue
        try:
            synthesize(script, output, args.bitrate)
            print(f"  ok: {output.relative_to(ROOT)}")
        except subprocess.CalledProcessError as exc:
            stderr = (exc.stderr or "").strip()
            print(f"  failed: {stderr[:240]}")


if __name__ == "__main__":
    main()
