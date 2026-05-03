"""
心智健康工具箱 — 冥想/呼吸/情绪仪表盘/感恩日记/睡眠日志
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, desc, func
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timedelta

from ..database import get_db
from ..models import WellnessLog

router = APIRouter(prefix="/api/wellness", tags=["wellness"])


# ===== 引导冥想脚本 =====
MEDITATIONS = [
    {
        "id": 1,
        "title": "河神的净化",
        "icon": "🌊",
        "duration": 3,
        "description": "3分钟正念呼吸——想象河神洗去心灵的淤泥",
        "steps": [
            {"type": "breathe_in", "text": "吸气... 感受清凉的河水从头顶流过", "seconds": 4},
            {"type": "hold", "text": "屏息... 让河水停留，冲刷每一个紧绷的角落", "seconds": 4},
            {"type": "breathe_out", "text": "缓缓呼出... 所有的疲惫和焦虑随水流走", "seconds": 6},
            {"type": "breathe_in", "text": "再一次... 吸入宁静", "seconds": 4},
            {"type": "hold", "text": "停在这里... 感受身体的轻盈", "seconds": 4},
            {"type": "breathe_out", "text": "呼出... 淤泥已经远去", "seconds": 6},
            {"type": "breathe_in", "text": "最后一次... 深深的吸气，水变得清澈", "seconds": 4},
            {"type": "hold", "text": "你是一汪清泉", "seconds": 4},
            {"type": "breathe_out", "text": "慢慢呼出... 睁开眼，世界焕然一新", "seconds": 6},
        ],
    },
    {
        "id": 2,
        "title": "无脸男的安静陪伴",
        "icon": "👤",
        "duration": 5,
        "description": "5分钟身体扫描——无脸男陪你温柔地感知身体",
        "steps": [
            {"type": "body", "text": "闭上眼睛... 无脸男安静地坐在你身边", "part": "准备", "seconds": 10},
            {"type": "body", "text": "将注意力轻轻放在脚趾...感受那里的温度", "part": "脚", "seconds": 15},
            {"type": "body", "text": "慢慢向上...脚踝、小腿、膝盖...", "part": "腿", "seconds": 20},
            {"type": "body", "text": "来到腹部...感受呼吸的起伏", "part": "腹部", "seconds": 25},
            {"type": "body", "text": "胸部...心跳的节奏", "part": "胸部", "seconds": 20},
            {"type": "body", "text": "肩膀和脖子...让紧张融化", "part": "肩颈", "seconds": 25},
            {"type": "body", "text": "面部...放松眉头、嘴角、下巴", "part": "面部", "seconds": 20},
            {"type": "body", "text": "现在...感受整个身体像一片羽毛", "part": "全身", "seconds": 25},
            {"type": "body", "text": "慢慢睁开眼睛...无脸男还在，没关系", "part": "结束", "seconds": 10},
        ],
    },
    {
        "id": 3,
        "title": "白龙的飞行",
        "icon": "🐉",
        "duration": 3,
        "description": "3分钟可视化冥想——像白龙一样翱翔于夜空",
        "steps": [
            {"type": "visualize", "text": "闭上眼睛...你化身为白龙，腾空而起", "seconds": 8},
            {"type": "visualize", "text": "身下是油屋的灯火...越来越远", "seconds": 10},
            {"type": "visualize", "text": "穿过云层...星光洒在龙鳞上", "seconds": 12},
            {"type": "visualize", "text": "风从翅膀下流过...自由而轻盈", "seconds": 10},
            {"type": "visualize", "text": "你知道自己真正的名字...你记得回家的路", "seconds": 10},
            {"type": "visualize", "text": "缓缓降落...带着天空的宁静回到当下", "seconds": 10},
        ],
    },
]

# ===== 呼吸练习 =====
BREATHING_EXERCISES = [
    {
        "id": "box",
        "title": "盒式呼吸",
        "icon": "⬜",
        "description": "4-4-4-4 节奏，海军海豹突击队的镇定技法",
        "pattern": {"in": 4, "hold": 4, "out": 4, "hold_out": 4},
        "cycles": 5,
    },
    {
        "id": "478",
        "title": "4-7-8 放松呼吸",
        "icon": "🌙",
        "description": "吸气4秒、屏息7秒、呼气8秒——自然的镇静剂",
        "pattern": {"in": 4, "hold": 7, "out": 8, "hold_out": 0},
        "cycles": 4,
    },
    {
        "id": "calm",
        "title": "平静呼吸",
        "icon": "🕯️",
        "description": "吸气4秒、呼气6秒——最简单的放松节奏",
        "pattern": {"in": 4, "hold": 0, "out": 6, "hold_out": 0},
        "cycles": 8,
    },
]


# ===== Schemas =====

class WellnessLogCreate(BaseModel):
    user_id: int = 1
    log_type: str = Field(..., pattern="^(gratitude|mood|sleep|meditation)$")
    title: str = ""
    content: str = ""
    mood_score: int = Field(default=5, ge=1, le=10)
    sleep_hours: float = Field(default=0, ge=0, le=24)
    sleep_quality: int = Field(default=3, ge=1, le=5)
    tags: List[str] = []

class WellnessLogResponse(BaseModel):
    id: int
    log_type: str
    title: str
    content: str
    mood_score: int
    sleep_hours: float
    sleep_quality: int
    tags: list
    created_at: datetime
    model_config = {"from_attributes": True}


# ===== 端点 =====

@router.get("/meditations")
async def get_meditations():
    """获取引导冥想列表"""
    return MEDITATIONS

@router.get("/breathing")
async def get_breathing():
    """获取呼吸练习列表"""
    return BREATHING_EXERCISES

@router.get("/logs", response_model=List[WellnessLogResponse])
async def get_logs(
    user_id: int = 1,
    log_type: Optional[str] = None,
    days: int = Query(default=30, ge=1, le=365),
    db: AsyncSession = Depends(get_db),
):
    """获取健康日志"""
    since = datetime.utcnow() - timedelta(days=days)
    q = select(WellnessLog).where(
        WellnessLog.user_id == user_id,
        WellnessLog.created_at >= since,
    )
    if log_type:
        q = q.where(WellnessLog.log_type == log_type)
    q = q.order_by(desc(WellnessLog.created_at))
    result = await db.execute(q)
    return result.scalars().all()

@router.post("/logs", response_model=WellnessLogResponse)
async def create_log(req: WellnessLogCreate, db: AsyncSession = Depends(get_db)):
    """创建健康日志"""
    log = WellnessLog(
        user_id=req.user_id,
        log_type=req.log_type,
        title=req.title,
        content=req.content,
        mood_score=req.mood_score,
        sleep_hours=req.sleep_hours,
        sleep_quality=req.sleep_quality,
        tags=req.tags,
    )
    db.add(log)
    await db.commit()
    await db.refresh(log)
    return log

@router.get("/dashboard")
async def get_dashboard(user_id: int = 1, days: int = 14, db: AsyncSession = Depends(get_db)):
    """获取情绪仪表盘数据"""
    since = datetime.utcnow() - timedelta(days=days)

    # 情绪趋势
    mood_result = await db.execute(
        select(WellnessLog.created_at, WellnessLog.mood_score)
        .where(WellnessLog.user_id == user_id, WellnessLog.created_at >= since, WellnessLog.mood_score > 0)
        .order_by(WellnessLog.created_at.asc())
    )
    mood_trend = [{"date": r[0].strftime("%m-%d"), "score": r[1]} for r in mood_result.fetchall()]

    # 睡眠趋势
    sleep_result = await db.execute(
        select(WellnessLog.created_at, WellnessLog.sleep_hours, WellnessLog.sleep_quality)
        .where(WellnessLog.user_id == user_id, WellnessLog.created_at >= since, WellnessLog.sleep_hours > 0)
        .order_by(WellnessLog.created_at.asc())
    )
    sleep_trend = [{"date": r[0].strftime("%m-%d"), "hours": r[1], "quality": r[2]} for r in sleep_result.fetchall()]

    # 感恩日记数量
    gratitude_result = await db.execute(
        select(func.count(WellnessLog.id))
        .where(WellnessLog.user_id == user_id, WellnessLog.log_type == "gratitude", WellnessLog.created_at >= since)
    )
    gratitude_count = gratitude_result.scalar() or 0

    # 冥想次数
    meditation_result = await db.execute(
        select(func.count(WellnessLog.id))
        .where(WellnessLog.user_id == user_id, WellnessLog.log_type == "meditation", WellnessLog.created_at >= since)
    )
    meditation_count = meditation_result.scalar() or 0

    # 平均情绪
    avg_mood_result = await db.execute(
        select(func.avg(WellnessLog.mood_score))
        .where(WellnessLog.user_id == user_id, WellnessLog.created_at >= since, WellnessLog.mood_score > 0)
    )
    avg_mood = round(avg_mood_result.scalar() or 0, 1)

    return {
        "mood_trend": mood_trend,
        "sleep_trend": sleep_trend,
        "gratitude_count": gratitude_count,
        "meditation_count": meditation_count,
        "avg_mood": avg_mood,
        "days": days,
    }
