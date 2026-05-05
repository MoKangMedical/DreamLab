"""
白龙成长 API — 成就系统 + 用户统计

Routes:
  GET  /api/milestones/stats/{user_id}     — 用户综合统计
  GET  /api/milestones/achievements         — 全部成就定义
  GET  /api/milestones/achievements/{user_id} — 用户成就进度
  POST /api/milestones/achievements/unlock  — 解锁成就
"""
from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from ..database import get_db
from ..models import (
    Achievement, UserAchievement,
    AssessmentResult, Dream, WellnessLog, CompanionMessage, CommunityComment,
    UserProgress,
)

router = APIRouter(prefix="/api/milestones", tags=["milestones"])


@router.get("/stats/{user_id}")
async def get_user_stats(user_id: int, db: AsyncSession = Depends(get_db)):
    """聚合用户在各模块的活动统计"""
    # 测评次数
    r = await db.execute(
        select(func.count()).select_from(AssessmentResult).where(AssessmentResult.user_id == user_id)
    )
    assessment_count = r.scalar() or 0

    # 梦境记录数
    r = await db.execute(
        select(func.count()).select_from(Dream).where(Dream.user_id == user_id)
    )
    dream_count = r.scalar() or 0

    # 冥想次数
    r = await db.execute(
        select(func.count()).select_from(WellnessLog)
        .where(WellnessLog.user_id == user_id, WellnessLog.log_type == "meditation")
    )
    meditation_count = r.scalar() or 0

    # 社区发言数
    r = await db.execute(
        select(func.count()).select_from(CommunityComment).where(CommunityComment.author != "")
    )
    community_count = r.scalar() or 0

    # 课程进度
    r = await db.execute(
        select(func.count()).select_from(UserProgress).where(UserProgress.user_id == user_id)
    )
    course_chapters = r.scalar() or 0

    # 陪伴对话数
    r = await db.execute(
        select(func.count()).select_from(CompanionMessage).where(CompanionMessage.role == "user")
    )
    companion_count = r.scalar() or 0

    return {
        "user_id": user_id,
        "stats": [
            {"label": "梦境记录", "value": dream_count, "icon": "🌙", "color": "#d4a853"},
            {"label": "测评完成", "value": assessment_count, "icon": "🪞", "color": "#c4554d"},
            {"label": "课程章节", "value": course_chapters, "icon": "📜", "color": "#5a7d9a"},
            {"label": "冥想次数", "value": meditation_count, "icon": "🧘", "color": "#3b8b7a"},
            {"label": "社区发言", "value": community_count, "icon": "💬", "color": "#6b5b8a"},
            {"label": "陪伴对话", "value": companion_count, "icon": "💝", "color": "#d4a853"},
        ],
    }


@router.get("/achievements")
async def list_achievements(db: AsyncSession = Depends(get_db)):
    """列出所有成就定义"""
    result = await db.execute(
        select(Achievement).order_by(Achievement.sort_order)
    )
    achievements = result.scalars().all()
    return [
        {
            "id": a.id,
            "key": a.key,
            "name": a.name,
            "desc": a.desc,
            "icon": a.icon,
            "condition": a.condition,
        }
        for a in achievements
    ]


@router.get("/achievements/{user_id}")
async def get_user_achievements(user_id: int, db: AsyncSession = Depends(get_db)):
    """获取用户成就进度（含解锁状态）"""
    # 全部成就定义
    r = await db.execute(select(Achievement).order_by(Achievement.sort_order))
    all_achievements = r.scalars().all()

    # 用户已解锁的
    r = await db.execute(
        select(UserAchievement).where(UserAchievement.user_id == user_id)
    )
    user_achs = {ua.achievement_id: ua for ua in r.scalars().all()}

    # 聚合触发数据
    r = await db.execute(select(func.count()).select_from(AssessmentResult).where(AssessmentResult.user_id == user_id))
    assessment_count = r.scalar() or 0
    r = await db.execute(select(func.count()).select_from(Dream).where(Dream.user_id == user_id))
    dream_count = r.scalar() or 0
    r = await db.execute(select(func.count()).select_from(WellnessLog).where(WellnessLog.user_id == user_id, WellnessLog.log_type == "meditation"))
    meditation_count = r.scalar() or 0
    r = await db.execute(select(func.count()).select_from(CommunityComment))
    comment_count = r.scalar() or 0
    r = await db.execute(select(func.count()).select_from(UserProgress).where(UserProgress.user_id == user_id))
    course_count = r.scalar() or 0

    triggers = {
        "first_assessment": assessment_count,
        "dream_keeper": dream_count,
        "three_days": 1 if assessment_count > 0 else 0,  # simplified
        "seven_days": 1 if assessment_count > 1 else 0,
        "scholar": course_count,
        "meditator": meditation_count,
        "helper": comment_count,
        "five_scales": assessment_count,
        "explorer": 1,  # simplified
    }

    progress_map = {
        "first_assessment": lambda n: 100 if n >= 1 else 0,
        "dream_keeper": lambda n: min(100, n * 10),
        "three_days": lambda n: 100 if n >= 1 else 50,
        "seven_days": lambda n: min(100, n * 50),
        "scholar": lambda n: min(100, n * 10),
        "meditator": lambda n: min(100, n * 10),
        "helper": lambda n: min(100, n * 10),
        "five_scales": lambda n: min(100, n * 20),
        "explorer": lambda n: 80,  # always nearly there
    }

    result_list = []
    for a in all_achievements:
        ua = user_achs.get(a.id)
        trigger_val = triggers.get(a.key, 0)
        calc_progress = progress_map.get(a.key, lambda n: 0)
        progress = calc_progress(trigger_val)

        is_unlocked = ua.unlocked if ua else (progress >= 100)
        result_list.append({
            "id": a.id,
            "key": a.key,
            "name": a.name,
            "desc": a.desc,
            "icon": a.icon,
            "condition": a.condition,
            "unlocked": is_unlocked,
            "progress": progress if not is_unlocked else 100,
        })

    return {
        "user_id": user_id,
        "unlocked_count": sum(1 for a in result_list if a["unlocked"]),
        "total_count": len(result_list),
        "achievements": result_list,
    }


@router.post("/achievements/unlock")
async def unlock_achievement(data: dict, db: AsyncSession = Depends(get_db)):
    """解锁/更新成就进度"""
    user_id = data.get("user_id", 1)
    achievement_key = data.get("achievement_key")
    progress = data.get("progress", 100)

    # 查找成就定义
    r = await db.execute(select(Achievement).where(Achievement.key == achievement_key))
    ach = r.scalar_one_or_none()
    if not ach:
        return {"error": "Achievement not found"}

    # 查找或创建用户成就记录
    r = await db.execute(
        select(UserAchievement).where(
            UserAchievement.user_id == user_id,
            UserAchievement.achievement_id == ach.id,
        )
    )
    ua = r.scalar_one_or_none()

    if not ua:
        ua = UserAchievement(
            user_id=user_id,
            achievement_id=ach.id,
            progress=progress,
            unlocked=progress >= 100,
            unlocked_at=datetime.now(timezone.utc) if progress >= 100 else None,
        )
        db.add(ua)
    else:
        ua.progress = max(ua.progress, progress)
        if ua.progress >= 100 and not ua.unlocked:
            ua.unlocked = True
            ua.unlocked_at = datetime.now(timezone.utc)

    await db.commit()
    return {
        "achievement_key": achievement_key,
        "progress": ua.progress if not isinstance(ua, dict) else progress,
        "unlocked": ua.unlocked if not isinstance(ua, dict) else progress >= 100,
    }
