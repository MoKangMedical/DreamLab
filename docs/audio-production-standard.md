# DreamLab 课程音频生产标准

本文档定义 DreamLab 后续课程录音的统一流程。目标是让网页端和小程序端的课程音频听起来像老师在做自然导入，而不是机器逐字朗读正文。

## 标准链路

1. 课程口播稿
   - 不直接朗读整篇正文。
   - 先把课程或章节压缩成 150-230 字左右的自然导入稿。
   - 语气要求：老师讲课、温和、清晰、有引导感。
   - 首选 DeepSeek 生成口播稿；没有 API Key 时可以使用本地摘要兜底稿。

2. 神经 TTS
   - 引擎：`edge-tts`
   - 默认声音：`zh-CN-YunyangNeural`
   - 语速：`-6%`，必要时可降至 `-8%`
   - 音调：`-2Hz`

3. ffmpeg 后期统一
   - 响度：`loudnorm=I=-16:TP=-1.5:LRA=9`
   - 采样率：`24000Hz`
   - 声道：单声道
   - 格式：MP3
   - 码率：`48kbps`，重要音频可用 `64kbps`

4. 文件命名
   - 核心课程章节：`frontend/public/audio/courses/course{course_id}_ch{chapter_order}.mp3`
   - 示例：`course1_ch1.mp3`
   - 网页访问路径：`/DreamLab/audio/courses/course1_ch1.mp3`
   - 小程序远程路径：`https://MoKangMedical.github.io/DreamLab/audio/courses/course1_ch1.mp3`

## 质量标准

A级音频必须满足：

- 能正常解码。
- 时长通常在 20-90 秒。
- 采样率为 `24000Hz`。
- 单声道。
- MP3 码率在 `48kbps` 或 `64kbps` 附近。
- 听感音量稳定，无明显爆音、断裂、过快或机械感。

## 常用命令

生成缺失核心课程音频：

```bash
python3 scripts/generate_core_audio_neural.py --only-missing
```

生成指定课程：

```bash
python3 scripts/generate_core_audio_neural.py --course-id 1 --force
```

生成书目课程音频：

```bash
python3 scripts/generate_book_audio_neural.py --force
```

增强书目课程正文和口播稿：

```bash
python3 scripts/enhance_book_courses_deepseek.py
```

只预览口播稿，不生成音频：

```bash
python3 scripts/generate_core_audio_neural.py --course-id 1 --dry-run
```

审计音频规格：

```bash
python3 scripts/audit_lesson1_benchmark.py
```

如需使用 DeepSeek 生成口播稿，先配置：

```bash
export DEEPSEEK_API_KEY="你的 key"
```

没有 `DEEPSEEK_API_KEY` 时，脚本会使用本地摘要兜底，不会中断流程。
