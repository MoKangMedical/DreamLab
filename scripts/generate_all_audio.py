#!/usr/bin/env python3
"""
DreamLab 音频全量生成脚本
- 为所有缺失章节生成 TTS 音频 (edge-tts, zh-CN-XiaoxiaoNeural)
- 并行生成，5并发
- 输出到 /opt/eterna-niannian/frontend-new/public/audio/courses/
"""
import sqlite3, json, os, sys, asyncio, subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

DB_PATH = '/root/.openclaw/workspace/dreamlab/data/dreamlab.db'
AUDIO_DIR = '/opt/eterna-niannian/frontend-new/public/audio/courses'
VOICE = 'zh-CN-XiaoxiaoNeural'
CONCURRENCY = 5

os.makedirs(AUDIO_DIR, exist_ok=True)

def get_missing():
    """找出所有缺失音频的章节"""
    db = sqlite3.connect(DB_PATH)
    rows = db.execute('SELECT id, title, content FROM courses ORDER BY id').fetchall()
    db.close()
    
    missing = []
    for cid, title, content_json in rows:
        chapters = json.loads(content_json) if content_json else []
        for ch in chapters:
            order = ch['order']
            filename = f"course{cid}_ch{order}.mp3"
            filepath = os.path.join(AUDIO_DIR, filename)
            if not os.path.exists(filepath):
                # 生成 TTS 文本：课程名 + 章标题（作为语音介绍）
                intro_text = f"{title}。第{order}章：{ch['title']}。"
                missing.append({
                    'course_id': cid,
                    'course_title': title,
                    'order': order,
                    'chapter_title': ch['title'],
                    'filename': filename,
                    'filepath': filepath,
                    'text': intro_text
                })
    return missing

def generate_audio(item):
    """用 edge-tts 生成单个音频"""
    try:
        # edge-tts --voice zh-CN-XiaoxiaoNeural --text "..." --write-media output.mp3
        result = subprocess.run([
            'edge-tts', '--voice', VOICE,
            '--text', item['text'],
            '--write-media', item['filepath'],
        ], capture_output=True, text=True, timeout=60)
        if result.returncode == 0 and os.path.exists(item['filepath']):
            size = os.path.getsize(item['filepath'])
            return f"✅ course{item['course_id']}_ch{item['order']} ({size//1024}KB)"
        else:
            return f"❌ course{item['course_id']}_ch{item['order']}: {result.stderr[:80]}"
    except Exception as e:
        return f"❌ course{item['course_id']}_ch{item['order']}: {str(e)[:80]}"

def main():
    missing = get_missing()
    if not missing:
        print("✅ 所有音频已存在！")
        return
    
    total = len(missing)
    print(f"🔊 发现 {total} 个缺失音频，开始生成 (并发={CONCURRENCY})...")
    
    done, failed = 0, 0
    with ThreadPoolExecutor(max_workers=CONCURRENCY) as pool:
        futures = {pool.submit(generate_audio, item): item for item in missing}
        for future in as_completed(futures):
            result = future.result()
            print(f"  [{done+1}/{total}] {result}")
            if result.startswith('✅'):
                done += 1
            else:
                failed += 1
    
    print(f"\n🎉 完成! 成功={done} 失败={failed} 总计={total}")

if __name__ == '__main__':
    main()
