"""
Mimo API async client for AI-powered dream analysis.
"""
import json
import asyncio
import os
import httpx
from typing import Optional


MIMO_ENDPOINT = "https://api.deepseek.com/v1"
MIMO_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")
MIMO_MODEL = "deepseek-v4-pro"
TIMEOUT_SECONDS = 60
MAX_RETRIES = 2

DREAM_ANALYSIS_SYSTEM_PROMPT = """你是一位资深梦境解析专家，精通弗洛伊德精神分析、荣格分析心理学、现代认知神经科学和东方传统解梦文化。

请对用户提供的梦境进行四个视角的深度解析，并以严格的JSON格式返回结果。

返回格式：
{
  "freud_perspective": "弗洛伊德视角分析...",
  "jung_perspective": "荣格视角分析...",
  "modern_perspective": "现代认知神经科学视角分析...",
  "eastern_perspective": "东方解梦文化视角分析...",
  "summary": "综合总结与建议..."
}

要求：
1. 弗洛伊德视角：关注潜意识冲动、童年经验、压抑的欲望、性象征和防御机制
2. 荣格视角：分析集体无意识原型、个人潜意识的补偿功能、象征的超越意义、自性化过程
3. 现代视角：结合睡眠科学、记忆巩固理论、情绪调节功能和神经可塑性研究
4. 东方视角：参考周公解梦传统、阴阳五行、中医情志理论、佛教唯识学
5. 每个视角的分析至少250字，内容深刻有见地
6. 综合总结应整合各视角的洞察，给出实用建议
7. 必须只返回JSON，不要包含任何markdown标记或额外说明"""


async def _call_mimo(messages: list, temperature: float = 0.7, max_tokens: int = 4096) -> str:
    """Call Mimo API with retry logic."""
    headers = {
        "Authorization": f"Bearer {MIMO_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": MIMO_MODEL,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    last_error: Optional[str] = None

    for attempt in range(MAX_RETRIES + 1):
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT_SECONDS) as client:
                response = await client.post(
                    f"{MIMO_ENDPOINT}/chat/completions",
                    headers=headers,
                    json=payload,
                )
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"]
        except httpx.TimeoutException:
            last_error = f"请求超时 (attempt {attempt + 1}/{MAX_RETRIES + 1})"
            if attempt < MAX_RETRIES:
                await asyncio.sleep(2 ** attempt)
        except httpx.HTTPStatusError as e:
            last_error = f"HTTP {e.response.status_code}: {e.response.text[:200]}"
            if attempt < MAX_RETRIES and e.response.status_code >= 500:
                await asyncio.sleep(2 ** attempt)
            else:
                raise
        except Exception as e:
            last_error = str(e)
            if attempt < MAX_RETRIES:
                await asyncio.sleep(2 ** attempt)

    raise Exception(f"Mimo API call failed after {MAX_RETRIES + 1} attempts: {last_error}")


async def dream_analysis(
    dream_content: str,
    emotions: list,
    elements: list,
) -> dict:
    """
    Analyze a dream from 4 perspectives using Mimo API.

    Returns a dict with keys:
    freud_perspective, jung_perspective, modern_perspective,
    eastern_perspective, summary
    """
    emotions_str = "、".join(emotions) if emotions else "未提供"
    elements_str = "、".join(elements) if elements else "未提供"
    dream_date_str = "未提供"

    user_prompt = f"""请分析以下梦境：

梦境内容：
{dream_content}

梦中情绪：{emotions_str}

梦中元素/符号：{elements_str}

请从四个视角进行深度解析，并严格按照JSON格式返回。"""

    messages = [
        {"role": "system", "content": DREAM_ANALYSIS_SYSTEM_PROMPT},
        {"role": "user", "content": user_prompt},
    ]

    result_text = await _call_mimo(messages, temperature=0.8, max_tokens=4096)

    # Parse JSON from response
    result_text = result_text.strip()
    if result_text.startswith("```"):
        # Remove markdown code fences
        lines = result_text.split("\n")
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        result_text = "\n".join(lines)

    try:
        result = json.loads(result_text)
    except json.JSONDecodeError:
        # Fallback: try to extract JSON object
        import re
        match = re.search(r"\{[\s\S]*\}", result_text)
        if match:
            result = json.loads(match.group())
        else:
            raise Exception(f"Failed to parse analysis result as JSON. Raw response: {result_text[:500]}")

    # Validate required keys
    required_keys = [
        "freud_perspective",
        "jung_perspective",
        "modern_perspective",
        "eastern_perspective",
        "summary",
    ]
    for key in required_keys:
        if key not in result:
            result[key] = f"（{key} 分析暂缺）"

    return result


async def generate_course_content(topic: str, category: str) -> dict:
    """
    Generate course chapter content using Mimo API.

    Returns a dict with a "chapters" key containing a list of
    {title, body, order} dicts.
    """
    category_names = {
        "freud": "弗洛伊德精神分析",
        "jung": "荣格分析心理学",
        "modern": "现代睡眠科学与认知神经科学",
        "eastern": "东方传统解梦文化",
    }
    category_name = category_names.get(category, category)

    system_prompt = """你是一位心理学课程设计专家，擅长编写引人入胜的学习内容。
请根据主题生成课程章节内容。每个章节应包含理论讲解、实际案例和思考题。
以严格的JSON格式返回，格式如下：
{
  "chapters": [
    {"title": "章节标题", "body": "详细的课程内容（至少500字，包含案例和思考题）", "order": 0},
    ...
  ]
}
必须只返回JSON，不要包含任何markdown标记。"""

    user_prompt = f"""请为以下课程主题编写3-5个章节的教学内容：

课程主题：{topic}
所属领域：{category_name}

要求：
1. 内容深入浅出，适合初学者
2. 每个章节包含理论讲解、实际案例分析和思考题
3. 语言生动有趣，避免枯燥
4. 章节之间存在逻辑递进关系
5. 每个章节正文至少500字"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    result_text = await _call_mimo(messages, temperature=0.7, max_tokens=4096)
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
        import re
        match = re.search(r"\{[\s\S]*\}", result_text)
        if match:
            result = json.loads(match.group())
        else:
            raise Exception(f"Failed to parse course content as JSON")

    if "chapters" not in result:
        result["chapters"] = []
    return result


async def generate_insight(reflections: list, dreams: list) -> str:
    """
    Generate a periodic insight summary from reflections and dreams.

    Args:
        reflections: list of dicts with keys [title, content, mood_score, created_at]
        dreams: list of dicts with keys [title, content, emotions, elements, created_at]

    Returns: str - the generated insight content
    """
    # Build reflection summaries
    reflection_texts = []
    for r in (reflections or []):
        reflection_texts.append(
            f"- {r.get('title', '')} (心情:{r.get('mood_score', 'N/A')}/10): {r.get('content', '')[:200]}"
        )
    reflection_summary = "\n".join(reflection_texts) if reflection_texts else "暂无记录"

    dream_texts = []
    for d in (dreams or []):
        dream_texts.append(
            f"- {d.get('title', '')}: {d.get('content', '')[:300]}"
        )
    dream_summary = "\n".join(dream_texts) if dream_texts else "暂无记录"

    system_prompt = """你是一位心理学导师，善于从个人记录中洞察深层模式。
请根据用户这段时间的梦境和反思记录，生成一份深度洞察报告。

要求：
1. 识别情绪模式和变化趋势
2. 发现梦境中反复出现的主题
3. 将反思与梦境内容联系起来
4. 提供建设性的成长建议
5. 语言温暖而有力量
6. 至少500字"""

    user_prompt = f"""请分析以下记录并生成洞察报告：

【近期反思】
{reflection_summary}

【近期梦境】
{dream_summary}

请生成深度心理洞察报告。"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    result_text = await _call_mimo(messages, temperature=0.8, max_tokens=4096)
    return result_text.strip()
