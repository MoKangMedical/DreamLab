#!/usr/bin/env python3
"""
DreamLab 新课内容生成脚本
- 通过 DeepSeek API 生成 5 门新心理学课程 (每门4章)
- 每章 1200-1800 字，案例+理论+反思 格式
- 自动入库 + 可选生成音频
"""
import sqlite3, json, os, sys, time, requests
from datetime import datetime, timezone

DB_PATH = '/root/.openclaw/workspace/dreamlab/data/dreamlab.db'
DEEPSEEK_API_KEY = 'sk-2989a4f388484aa9a6ab880f28012182'
DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

# 5 门新课定义
NEW_COURSES = [
    {
        "id": 11,
        "title": "进化心理学：人类心灵的远古根源",
        "category": "evolutionary",
        "difficulty": "intermediate",
        "description": "为什么我们会爱、会妒、会合作？进化心理学追溯人类心理机制的演化起源——从择偶策略到亲代投资，从群体合作到道德本能。理解这些远古程序，理解今天的自己。",
        "image_url": "/DreamLab/images/courses/evolutionary.jpg",
        "chapters": [
            {"title": "心灵不是白板：进化心理学的核心命题", "order": 1},
            {"title": "择偶心理学：爱的演化逻辑", "order": 2},
            {"title": "亲代投资与家庭动力学", "order": 3},
            {"title": "合作、利他与道德本能", "order": 4},
        ]
    },
    {
        "id": 12,
        "title": "发展心理学：一生的成长旅程",
        "category": "developmental",
        "difficulty": "beginner",
        "description": "从婴儿的第一声啼哭到暮年的人生回顾，发展心理学描绘人类心智在一生中的变化轨迹。皮亚杰、埃里克森、鲍尔比——理解我们如何成为今天的自己。",
        "image_url": "/DreamLab/images/courses/developmental.jpg",
        "chapters": [
            {"title": "依恋的起源：婴儿如何建立第一段关系", "order": 1},
            {"title": "认知发展：儿童如何理解世界", "order": 2},
            {"title": "身份认同：青春期的自我寻找", "order": 3},
            {"title": "终身发展：成年期的成长与智慧", "order": 4},
        ]
    },
    {
        "id": 13,
        "title": "社会心理学：他人如何塑造我们",
        "category": "social",
        "difficulty": "intermediate",
        "description": "我们以为自己独立地做决定，实际上每一刻都在被他人影响。社会心理学揭示从众、服从、偏见和利他行为背后的心理机制——看见无形的手，获得真正的自主。",
        "image_url": "/DreamLab/images/courses/social.jpg",
        "chapters": [
            {"title": "从众：为什么我们会随大流", "order": 1},
            {"title": "服从与权威：米尔格拉姆的震撼实验", "order": 2},
            {"title": "偏见与刻板印象：看不见的滤镜", "order": 3},
            {"title": "利他与共情：人性中的善", "order": 4},
        ]
    },
    {
        "id": 14,
        "title": "存在主义心理学：直面生命终极问题",
        "category": "existential",
        "difficulty": "advanced",
        "description": "死亡、自由、孤独、无意义——存在主义心理学不回避人生最深的困惑。欧文·亚隆将存在主义哲学转化为治疗实践，帮助我们在有限性中活出无限的意义。",
        "image_url": "/DreamLab/images/courses/existential.jpg",
        "chapters": [
            {"title": "死亡的觉知：有限性如何激发真正的活着", "order": 1},
            {"title": "自由的重量：选择与责任", "order": 2},
            {"title": "存在性孤独：我们是独自一人，但不孤单", "order": 3},
            {"title": "意义的追寻：在无意义的宇宙中创造意义", "order": 4},
        ]
    },
    {
        "id": 15,
        "title": "神经心理学：大脑如何创造心灵",
        "category": "neuro",
        "difficulty": "intermediate",
        "description": "大脑——这个1.4公斤的器官——如何产生意识、记忆和情感？神经心理学通过脑损伤案例、脑成像技术和认知实验，揭示心灵与大脑之间最深刻的连接。",
        "image_url": "/DreamLab/images/courses/neuro.jpg",
        "chapters": [
            {"title": "神经元与突触：心灵的物理基础", "order": 1},
            {"title": "记忆的神经机制：我们如何储存过去", "order": 2},
            {"title": "情绪的脑：杏仁核与前额叶的对话", "order": 3},
            {"title": "可塑性：大脑如何改变自己", "order": 4},
        ]
    },
]

def call_deepseek(prompt: str) -> str:
    """调用 DeepSeek API 生成内容"""
    headers = {
        'Authorization': f'Bearer {DEEPSEEK_API_KEY}',
        'Content-Type': 'application/json',
    }
    payload = {
        'model': 'deepseek-chat',
        'messages': [
            {'role': 'system', 'content': '你是一位资深的心理学教授和科普作家。你的写作风格兼具学术严谨性和文学感染力，擅长用生动的案例和比喻让复杂概念变得可感知。'},
            {'role': 'user', 'content': prompt}
        ],
        'temperature': 0.7,
        'max_tokens': 3000,
    }
    resp = requests.post(DEEPSEEK_API_URL, headers=headers, json=payload, timeout=90)
    resp.raise_for_status()
    data = resp.json()
    return data['choices'][0]['message']['content']

def generate_chapter(course_title: str, ch_title: str, ch_order: int) -> str:
    """为单个章节生成内容"""
    prompt = f"""请为心理学课程《{course_title}》撰写第{ch_order}章内容。

章节标题：{ch_title}

写作要求：
1. 字数 1200-1800 字
2. 采用「案例引入 → 理论讲解 → 生活反思」三段式结构
3. 开头用一个具体的心理学案例或实验故事引入
4. 中间用平实的语言讲解相关心理学理论和研究发现
5. 结尾引导读者结合自身生活进行反思
6. 适当引用经典研究者和具体研究（如年份、实验名称）
7. 语言温暖自然，像一位睿智的导师在娓娓道来，不要教科书腔
8. 可以融入与千与千寻或宫崎骏电影相关的比喻（可选）

请直接输出章节正文，不要包含标题。"""
    
    for attempt in range(3):
        try:
            content = call_deepseek(prompt)
            if len(content) > 300:
                return content
            print(f"  ⚠️ 内容太短({len(content)}字)，重试...")
        except Exception as e:
            print(f"  ⚠️ API错误(尝试{attempt+1}/3): {str(e)[:80]}")
            time.sleep(3)
    raise Exception(f"章节生成失败: {ch_title}")

def seed_course_to_db(course_data: dict, chapters_content: list):
    """将课程写入数据库"""
    db = sqlite3.connect(DB_PATH)
    
    content = [
        {"title": ch_data["title"], "body": ch_content, "order": ch_data["order"]}
        for ch_data, ch_content in zip(course_data["chapters"], chapters_content)
    ]
    
    now = datetime.now(timezone.utc).isoformat()
    db.execute(
        """INSERT INTO courses (id, title, description, category, difficulty, image_url, content, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET
           title=excluded.title, description=excluded.description,
           category=excluded.category, content=excluded.content""",
        (course_data["id"], course_data["title"], course_data["description"],
         course_data["category"], course_data["difficulty"], course_data["image_url"],
         json.dumps(content, ensure_ascii=False), now)
    )
    db.commit()
    db.close()
    print(f"  💾 已入库: {course_data['title']} ({len(content)}章)")

def main():
    print("🧬 DreamLab 新课内容生成器")
    print(f"   将生成 {len(NEW_COURSES)} 门新课，共 {sum(len(c['chapters']) for c in NEW_COURSES)} 章\n")
    
    for course in NEW_COURSES:
        cname = course['title']
        nch = len(course['chapters'])
        print(f"📖 课程{course['id']}: {cname} ({nch}章)")
        
        chapters_content = []
        for ch in course['chapters']:
            print(f"  ✍️ 生成 Ch{ch['order']}: {ch['title']}...")
            try:
                body = generate_chapter(cname, ch['title'], ch['order'])
                chapters_content.append(body)
                print(f"     ✅ {len(body)}字")
                time.sleep(1)  # API 限速
            except Exception as e:
                print(f"     ❌ 失败: {e}")
                chapters_content.append(f"[内容生成失败，请稍后重试]\n\n章节：{ch['title']}\n\n这是一个关于{ch['title']}的章节。我们正在完善内容，请稍后再来。")
        
        seed_course_to_db(course, chapters_content)
        print()
    
    print("🎉 所有课程生成完成！")

if __name__ == '__main__':
    main()
