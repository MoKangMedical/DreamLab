from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from datetime import datetime, timezone, timedelta
from ..models import Reflection, Insight, Dream, User
from ..schemas import (
    ReflectionCreate, ReflectionUpdate, ReflectionResponse,
    InsightCreate, InsightGenerateRequest, InsightResponse,
    ErrorResponse,
)
from ..database import get_db
from ..services import generate_insight as ai_generate_insight

router = APIRouter(prefix="/api/reflect", tags=["reflect"])


# ─── Reflections CRUD ────────────────────────────────────


@router.post("/", response_model=ReflectionResponse, status_code=201)
async def create_reflection(ref_data: ReflectionCreate, db: AsyncSession = Depends(get_db)):
    """Create a new reflection entry."""
    user = await db.get(User, ref_data.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    if ref_data.linked_dream_id:
        dream = await db.get(Dream, ref_data.linked_dream_id)
        if not dream:
            raise HTTPException(status_code=404, detail="关联的梦境不存在")

    reflection = Reflection(
        user_id=ref_data.user_id,
        title=ref_data.title,
        content=ref_data.content,
        mood_score=ref_data.mood_score,
        linked_dream_id=ref_data.linked_dream_id,
    )
    db.add(reflection)
    await db.commit()
    await db.refresh(reflection)
    return reflection


@router.get("/", response_model=list[ReflectionResponse])
async def list_reflections(user_id: int, limit: int = 20, offset: int = 0, db: AsyncSession = Depends(get_db)):
    """List reflections for a user, newest first."""
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    result = await db.execute(
        select(Reflection)
        .where(Reflection.user_id == user_id)
        .order_by(desc(Reflection.created_at))
        .offset(offset)
        .limit(limit)
    )
    return result.scalars().all()


@router.get("/{reflection_id}", response_model=ReflectionResponse, responses={404: {"model": ErrorResponse}})
async def get_reflection(reflection_id: int, db: AsyncSession = Depends(get_db)):
    """Get a reflection by ID."""
    result = await db.execute(select(Reflection).where(Reflection.id == reflection_id))
    reflection = result.scalar_one_or_none()
    if not reflection:
        raise HTTPException(status_code=404, detail="反思记录不存在")
    return reflection


@router.put("/{reflection_id}", response_model=ReflectionResponse, responses={404: {"model": ErrorResponse}})
async def update_reflection(reflection_id: int, ref_data: ReflectionUpdate, db: AsyncSession = Depends(get_db)):
    """Update a reflection."""
    result = await db.execute(select(Reflection).where(Reflection.id == reflection_id))
    reflection = result.scalar_one_or_none()
    if not reflection:
        raise HTTPException(status_code=404, detail="反思记录不存在")

    update_data = ref_data.model_dump(exclude_unset=True)
    if "linked_dream_id" in update_data and update_data["linked_dream_id"] is not None:
        dream = await db.get(Dream, update_data["linked_dream_id"])
        if not dream:
            raise HTTPException(status_code=404, detail="关联的梦境不存在")

    for key, value in update_data.items():
        setattr(reflection, key, value)

    await db.commit()
    await db.refresh(reflection)
    return reflection


@router.delete("/{reflection_id}", status_code=204, responses={404: {"model": ErrorResponse}})
async def delete_reflection(reflection_id: int, db: AsyncSession = Depends(get_db)):
    """Delete a reflection."""
    result = await db.execute(select(Reflection).where(Reflection.id == reflection_id))
    reflection = result.scalar_one_or_none()
    if not reflection:
        raise HTTPException(status_code=404, detail="反思记录不存在")
    await db.delete(reflection)
    await db.commit()


# ─── Insights ─────────────────────────────────────────────


@router.post("/insights", response_model=InsightResponse, status_code=201)
async def create_insight(insight_data: InsightCreate, db: AsyncSession = Depends(get_db)):
    """Create a manually written insight."""
    user = await db.get(User, insight_data.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    insight = Insight(
        user_id=insight_data.user_id,
        title=insight_data.title,
        content=insight_data.content,
        period=insight_data.period,
    )
    db.add(insight)
    await db.commit()
    await db.refresh(insight)
    return insight


@router.get("/insights", response_model=list[InsightResponse])
async def list_insights(user_id: int, period: str = None, db: AsyncSession = Depends(get_db)):
    """List insights for a user, optionally filtered by period."""
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    stmt = select(Insight).where(Insight.user_id == user_id).order_by(desc(Insight.created_at))
    if period:
        stmt = stmt.where(Insight.period == period)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.post("/insights/generate", response_model=InsightResponse, status_code=201)
async def generate_insight(req: InsightGenerateRequest, db: AsyncSession = Depends(get_db)):
    """Generate an AI-powered insight from recent reflections and dreams."""
    user = await db.get(User, req.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    # Determine time range based on period
    now = datetime.now(timezone.utc)
    if req.period == "weekly":
        since = now - timedelta(days=7)
    else:
        since = now - timedelta(days=30)

    # Fetch recent reflections
    ref_result = await db.execute(
        select(Reflection)
        .where(Reflection.user_id == req.user_id, Reflection.created_at >= since)
        .order_by(desc(Reflection.created_at))
    )
    reflections = ref_result.scalars().all()

    # Fetch recent dreams
    dream_result = await db.execute(
        select(Dream)
        .where(Dream.user_id == req.user_id, Dream.created_at >= since)
        .order_by(desc(Dream.created_at))
    )
    dreams = dream_result.scalars().all()

    if not reflections and not dreams:
        raise HTTPException(status_code=400, detail="该时间段内没有足够的记录来生成洞察报告")

    # Convert to dicts for AI
    ref_dicts = [
        {"title": r.title, "content": r.content, "mood_score": r.mood_score, "created_at": r.created_at.isoformat() if r.created_at else ""}
        for r in reflections
    ]
    dream_dicts = [
        {"title": d.title, "content": d.content, "emotions": d.emotions, "elements": d.elements, "created_at": d.created_at.isoformat() if d.created_at else ""}
        for d in dreams
    ]

    # Call AI to generate insight
    try:
        insight_content = await ai_generate_insight(ref_dicts, dream_dicts)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI 洞察生成失败：{str(e)}")

    period_label = "周度" if req.period == "weekly" else "月度"
    title = f"{period_label}心理洞察报告 - {now.strftime('%Y年%m月%d日')}"

    insight = Insight(
        user_id=req.user_id,
        title=title,
        content=insight_content,
        period=req.period,
    )
    db.add(insight)
    await db.commit()
    await db.refresh(insight)
    return insight


@router.delete("/insights/{insight_id}", status_code=204, responses={404: {"model": ErrorResponse}})
async def delete_insight(insight_id: int, db: AsyncSession = Depends(get_db)):
    """Delete an insight."""
    result = await db.execute(select(Insight).where(Insight.id == insight_id))
    insight = result.scalar_one_or_none()
    if not insight:
        raise HTTPException(status_code=404, detail="洞察报告不存在")
    await db.delete(insight)
    await db.commit()
