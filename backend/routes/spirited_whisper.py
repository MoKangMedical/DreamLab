"""
萤火虫密语 API — AI 生成宫崎骏风格心理箴言

POST /api/spirited/whisper
  Body: { "element": "firefly" | "cloud" | "kanji" | "soot" | "dandelion" }
  Returns: { "message": "...", "haiku": "...", "element_type": "..." }

每次请求消耗 ~100-200 DeepSeek token
"""
from fastapi import APIRouter, Request
from ..services.mimo_client import _call_mimo

router = APIRouter(prefix="/api/whisper", tags=["whisper"])

WHISPER_SYSTEM_PROMPT = """你是宫崎骏电影世界里的一个精灵，住在油屋的角落。
你说话的语调像《千与千寻》里的白龙、《龙猫》里的多多洛、《幽灵公主》里的树精——
温柔、神秘、治愈，带着大自然的智慧。

请根据用户选中的元素类型，生成一段极短的箴言。

必须返回严格的JSON（不要markdown标记）：
{
  "haiku": "三行俳句风格的短诗，日语美学",
  "message": "一句温暖治愈的话，20-40字，有心理学深度",
  "feeling": "一个情绪词：安心/勇气/释然/希望/力量/平静/温暖"
}

规则：
1. haiku 必须恰好三行，每行不超过12个字
2. message 必须有宫崎骏式的治愈感，同时带一些心理学洞察
3. 不要用任何引号包裹JSON——直接返回纯JSON
4. 每次随机选择一种情绪基调"""

ELEMENT_CONTEXTS = {
    "firefly": "一只萤火虫停在你指尖。在千与千寻的世界里，萤火虫是迷失灵魂的向导。请对它说些什么。",
    "cloud": "一片软云从你头顶飘过。在龙猫的世界里，云朵会载着梦飞行。请对着这片云说些什么。",
    "kanji": "一个古老的汉字在你眼前浮现——夢（ゆめ）。请解读这个字的心灵含义。",
    "soot": "一只灰尘精灵（ススワタリ）在你的掌心蹦跳。它是被遗忘的心事变成的小精灵。请它说句话。",
    "dandelion": "一株蒲公英的种子正要随风飞走。在哈尔的移动城堡里，每一颗种子都承载着一个愿望。请对飞走的种子说些什么。",
}


@router.post("/whisper")
async def spirited_whisper(request: Request):
    """萤火虫/云/灰尘精灵 互动 — 每次消耗 ~120 token"""
    body = await request.json()
    element = body.get("element", "firefly")
    context = ELEMENT_CONTEXTS.get(element, ELEMENT_CONTEXTS["firefly"])

    import random
    mood_seed = random.choice(["安心", "勇气", "释然", "希望", "力量", "平静", "温暖", "感恩"])

    user_prompt = f"此刻，你是{mood_seed}的精灵。\n\n{context}"

    messages = [
        {"role": "system", "content": WHISPER_SYSTEM_PROMPT},
        {"role": "user", "content": user_prompt},
    ]

    result_text = await _call_mimo(messages, temperature=0.95, max_tokens=256)

    # Parse JSON
    import json, re
    result_text = result_text.strip()
    if result_text.startswith("```"):
        lines = result_text.split("\n")
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        result_text = "\n".join(lines)

    try:
        result = json.loads(result_text)
    except json.JSONDecodeError:
        match = re.search(r"\{[\s\S]*\}", result_text)
        if match:
            result = json.loads(match.group())
        else:
            result = {
                "haiku": "风が吹く\n心の森に\n光ひとつ",
                "message": "风穿过心的森林，你比自己想象的更勇敢。",
                "feeling": "勇气",
            }

    result["element_type"] = element
    return result
