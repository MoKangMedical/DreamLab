"""
AI 心理预测模块 — 人格趋势/风险评估/模式预测

Routes:
  POST /api/predict/personality    — 基于测评数据预测人格发展趋势
  POST /api/predict/trend          — 心理健康趋势预测
  POST /api/predict/compatibility  — 人际兼容性分析
  POST /api/predict/dream-pattern  — 梦境模式预测
"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from ..database import get_db
from ..models import AssessmentResult, Dream, WellnessLog
from ..services.mimo_client import chat_completion

router = APIRouter(prefix="/api/predict", tags=["predict"])


async def _call_ai(prompt: str) -> str:
    """Call DeepSeek for psychological prediction."""
    messages = [
        {
            "role": "system",
            "content": (
                "你是一位资深的心理学AI助手，擅长基于数据提供个性化的心理预测和分析。"
                "你的回答应该温暖、专业、科学。用宫崎骏千与千寻的油屋比喻来增加温暖感。"
                "每次回答控制在300-500字。使用中文。"
            ),
        },
        {"role": "user", "content": prompt},
    ]
    return await chat_completion(messages)


@router.post("/personality")
async def predict_personality(data: dict, db: AsyncSession = Depends(get_db)):
    """基于测评结果预测人格发展趋势"""
    user_id = data.get("user_id", 1)

    # 拉取历史测评
    r = await db.execute(
        select(AssessmentResult)
        .where(AssessmentResult.user_id == user_id)
        .order_by(AssessmentResult.created_at.desc())
        .limit(10)
    )
    results = r.scalars().all()

    if not results:
        return {
            "prediction": "还没有足够的测评数据来生成预测。至少完成一次测评后，我就能为你分析啦。",
            "type": "personality",
            "data_points": 0,
        }

    # 汇总最近的测评数据
    history = []
    for res in results:
        history.append({
            "level": res.level,
            "standard_score": res.standard_score,
            "assessment_id": res.assessment_id,
            "created_at": str(res.created_at),
        })

    # 拉取梦境和健康数据
    r = await db.execute(select(func.count()).select_from(Dream).where(Dream.user_id == user_id))
    dream_count = r.scalar() or 0

    r = await db.execute(
        select(func.count()).select_from(WellnessLog)
        .where(WellnessLog.user_id == user_id)
    )
    wellness_count = r.scalar() or 0

    prompt = f"""用户的历史测评数据：{history}

补充信息：该用户记录了{dream_count}个梦境，进行了{wellness_count}次健康记录。

请基于以上数据，从以下角度给出预测和分析（300-500字）：
1. 该用户的人格发展趋势（趋势向好/稳定/波动）
2. 潜在的心理优势领域
3. 可能需要关注的方面
4. 个性化的成长建议（用油屋比喻）

请温暖、专业但不过度诊断。"""
    
    prediction = await _call_ai(prompt)

    return {
        "prediction": prediction,
        "type": "personality",
        "data_points": len(results),
        "history": history,
        "dream_count": dream_count,
        "wellness_count": wellness_count,
    }


@router.post("/trend")
async def predict_trend(data: dict, db: AsyncSession = Depends(get_db)):
    """心理健康趋势预测"""
    user_id = data.get("user_id", 1)
    concern = data.get("concern", "")  # 用户主动输入的关切
    period = data.get("period", "monthly")  # weekly/monthly

    # 拉取近期健康日志
    r = await db.execute(
        select(WellnessLog)
        .where(WellnessLog.user_id == user_id)
        .order_by(WellnessLog.created_at.desc())
        .limit(30)
    )
    logs = r.scalars().all()

    # 汇总数据
    moods = [l.mood_score for l in logs if l.mood_score]
    sleep_data = [l.sleep_hours for l in logs if l.sleep_hours]
    log_types = {}
    for l in logs:
        log_types[l.log_type] = log_types.get(l.log_type, 0) + 1

    avg_mood = round(sum(moods) / len(moods), 1) if moods else None
    avg_sleep = round(sum(sleep_data) / len(sleep_data), 1) if sleep_data else None

    prompt = f"""用户最近30条健康日志分析：
- 平均情绪评分：{avg_mood}/10
- 平均睡眠时长：{avg_sleep}小时
- 活动分布：{log_types}
- 用户关切：{concern if concern else '无特别提及'}
- 预测周期：{period}

请基于以上数据，给出以下分析（300-500字）：
1. 心理健康趋势预测
2. 睡眠-情绪关联分析
3. 未来{period}内的建议关注点
4. 实用改善建议（像锅炉爷爷给建议那样温暖实用）

注意：这是趋势参考，不是临床诊断。"""
    
    prediction = await _call_ai(prompt)

    return {
        "prediction": prediction,
        "type": "trend",
        "avg_mood": avg_mood,
        "avg_sleep": avg_sleep,
        "log_types": log_types,
        "data_points": len(logs),
    }


@router.post("/compatibility")
async def predict_compatibility(data: dict, db: AsyncSession = Depends(get_db)):
    """人际兼容性分析 — 基于人格特质"""
    user_id = data.get("user_id", 1)
    relationship = data.get("relationship", "")  # 关系类型描述
    target_traits = data.get("target_traits", "")  # 对方的人格特质描述

    # 拉取用户的测评结果
    r = await db.execute(
        select(AssessmentResult)
        .where(AssessmentResult.user_id == user_id)
        .order_by(AssessmentResult.created_at.desc())
        .limit(5)
    )
    results = r.scalars().all()

    user_profile = []
    for res in results:
        user_profile.append({
            "level": res.level,
            "standard_score": res.standard_score,
        })

    prompt = f"""用户的人格测评概况：{user_profile}
关系类型：{relationship}
对方特质描述：{target_traits if target_traits else '未提供，请基于用户特质给出一般性建议'}

请给出以下分析（300-500字）：
1. 该用户的交往风格特长
2. 在这种关系类型中可能出现的互动模式
3. 沟通和理解的建议
4. 需要注意的潜在摩擦点

用温暖、不评判的方式表达。可以用千与千寻角色关系作比喻。"""
    
    prediction = await _call_ai(prompt)

    return {
        "prediction": prediction,
        "type": "compatibility",
        "user_profile": user_profile,
    }


@router.post("/dream-pattern")
async def predict_dream_pattern(data: dict, db: AsyncSession = Depends(get_db)):
    """梦境模式预测与解析"""
    user_id = data.get("user_id", 1)
    recent_dream = data.get("recent_dream", "")  # 最近的梦境描述

    # 拉取历史梦境
    r = await db.execute(
        select(Dream)
        .where(Dream.user_id == user_id)
        .order_by(Dream.created_at.desc())
        .limit(20)
    )
    dreams = r.scalars().all()

    dream_titles = [d.title for d in dreams]
    dream_emotions = []
    for d in dreams:
        if d.emotions:
            dream_emotions.extend(d.emotions)

    # 统计常见情绪
    emotion_counts = {}
    for e in dream_emotions:
        emotion_counts[e] = emotion_counts.get(e, 0) + 1

    prompt = f"""用户历史梦境标题：{dream_titles}
常见梦境情绪：{emotion_counts}
梦境总数：{len(dreams)}
最近梦境描述：{recent_dream if recent_dream else '未提供'}

请给出以下分析（300-500字）：
1. 梦境主题模式识别
2. 反复出现的情绪/象征分析
3. 可能的无意识关注点
4. 建设性的自我探索建议（用千与千寻梦境意象）

像荣格学派分析师那样深入，但像朋友那样温暖。"""
    
    prediction = await _call_ai(prompt)

    return {
        "prediction": prediction,
        "type": "dream_pattern",
        "dream_count": len(dreams),
        "common_emotions": dict(
            sorted(emotion_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        ),
    }
