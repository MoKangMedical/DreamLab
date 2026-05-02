from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from ..models import Dream, DreamAnalysis, User
from ..schemas import DreamCreate, DreamResponse, DreamWithAnalysis, AnalysisResponse, ErrorResponse
from ..database import get_db
from ..services import dream_analysis as ai_dream_analysis
from ..config import DATABASE_URL

router = APIRouter(prefix="/api/dreams", tags=["dreams"])


async def _run_dream_analysis(dream_id: int, dream_content: str, emotions: list, elements: list):
    """Background task: run AI analysis and store result."""
    from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession as AS
    from sqlalchemy.orm import sessionmaker

    engine = create_async_engine(DATABASE_URL)
    async_session = sessionmaker(engine, class_=AS, expire_on_commit=False)

    try:
        result = await ai_dream_analysis(dream_content, emotions, elements)
        async with async_session() as session:
            analysis = DreamAnalysis(
                dream_id=dream_id,
                freud_perspective=result.get("freud_perspective", ""),
                jung_perspective=result.get("jung_perspective", ""),
                modern_perspective=result.get("modern_perspective", ""),
                eastern_perspective=result.get("eastern_perspective", ""),
                summary=result.get("summary", ""),
            )
            session.add(analysis)
            await session.commit()
    except Exception as e:
        async with async_session() as session:
            analysis = DreamAnalysis(
                dream_id=dream_id,
                freud_perspective="",
                jung_perspective="",
                modern_perspective="",
                eastern_perspective="",
                summary=f"AI 分析失败：{str(e)}。请稍后重试或编辑梦境后重新触发分析。",
            )
            session.add(analysis)
            await session.commit()
    finally:
        await engine.dispose()


@router.post("/", response_model=DreamResponse, status_code=201)
async def create_dream(dream_data: DreamCreate, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    """Create a new dream entry. AI analysis runs in the background."""
    user = await db.get(User, dream_data.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    dream = Dream(
        user_id=dream_data.user_id,
        title=dream_data.title,
        content=dream_data.content,
        emotions=dream_data.emotions,
        elements=dream_data.elements,
        dream_date=dream_data.dream_date,
    )
    db.add(dream)
    await db.commit()
    await db.refresh(dream)

    # Trigger AI analysis in background
    background_tasks.add_task(
        _run_dream_analysis,
        dream.id,
        dream.content,
        dream.emotions or [],
        dream.elements or [],
    )

    return dream


@router.get("/", response_model=list[DreamResponse])
async def list_dreams(
    user_id: int,
    limit: int = 20,
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
):
    """List dreams for a user, newest first."""
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    result = await db.execute(
        select(Dream)
        .where(Dream.user_id == user_id)
        .order_by(desc(Dream.created_at))
        .offset(offset)
        .limit(limit)
    )
    return result.scalars().all()


@router.get("/{dream_id}", response_model=DreamWithAnalysis, responses={404: {"model": ErrorResponse}})
async def get_dream(dream_id: int, db: AsyncSession = Depends(get_db)):
    """Get a dream with its analysis (if ready)."""
    result = await db.execute(select(Dream).where(Dream.id == dream_id))
    dream = result.scalar_one_or_none()
    if not dream:
        raise HTTPException(status_code=404, detail="梦境记录不存在")

    # Check if analysis exists
    analysis_result = await db.execute(
        select(DreamAnalysis).where(DreamAnalysis.dream_id == dream_id)
    )
    analysis = analysis_result.scalar_one_or_none()

    response = DreamWithAnalysis.model_validate(dream)
    if analysis:
        response.analysis = AnalysisResponse.model_validate(analysis)
    return response


@router.delete("/{dream_id}", status_code=204, responses={404: {"model": ErrorResponse}})
async def delete_dream(dream_id: int, db: AsyncSession = Depends(get_db)):
    """Delete a dream and its analysis."""
    result = await db.execute(select(Dream).where(Dream.id == dream_id))
    dream = result.scalar_one_or_none()
    if not dream:
        raise HTTPException(status_code=404, detail="梦境记录不存在")
    await db.delete(dream)
    await db.commit()


@router.post("/{dream_id}/analyze", response_model=AnalysisResponse, status_code=202)
async def retrigger_analysis(dream_id: int, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    """Re-trigger AI analysis for a dream. Returns existing analysis immediately if ready."""
    result = await db.execute(select(Dream).where(Dream.id == dream_id))
    dream = result.scalar_one_or_none()
    if not dream:
        raise HTTPException(status_code=404, detail="梦境记录不存在")

    # Check existing analysis
    existing = await db.execute(select(DreamAnalysis).where(DreamAnalysis.dream_id == dream_id))
    analysis = existing.scalar_one_or_none()

    if analysis and analysis.freud_perspective:
        return AnalysisResponse.model_validate(analysis)

    # Trigger analysis in background
    background_tasks.add_task(
        _run_dream_analysis,
        dream.id,
        dream.content,
        dream.emotions or [],
        dream.elements or [],
    )

    # Return a pending response
    return AnalysisResponse(
        id=0,
        dream_id=dream_id,
        freud_perspective="分析中...",
        jung_perspective="分析中...",
        modern_perspective="分析中...",
        eastern_perspective="分析中...",
        summary="AI 正在分析您的梦境，请稍后刷新查看结果。",
        created_at=dream.created_at,
    )


@router.get("/{dream_id}/analysis", response_model=AnalysisResponse, responses={404: {"model": ErrorResponse}})
async def get_analysis(dream_id: int, db: AsyncSession = Depends(get_db)):
    """Get the analysis for a dream."""
    result = await db.execute(select(DreamAnalysis).where(DreamAnalysis.dream_id == dream_id))
    analysis = result.scalar_one_or_none()
    if not analysis:
        raise HTTPException(status_code=404, detail="该梦境尚未完成分析，请稍后再试")
    return AnalysisResponse.model_validate(analysis)
