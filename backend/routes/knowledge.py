"""
知识库 API — 心理学百科与同行评审摘要

Routes:
  GET   /api/knowledge           — 文章列表（可筛选/搜索）
  GET   /api/knowledge/featured  — 精选文章
  GET   /api/knowledge/{slug}    — 文章详情
  GET   /api/knowledge/categories      — 分类列表
  POST  /api/knowledge/quiz/submit     — 提交测验
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from ..database import get_db
from ..models import KnowledgeArticle, KnowledgeCategory, QuizAttempt

router = APIRouter(prefix="/api/knowledge", tags=["knowledge"])


@router.get("/categories")
async def list_categories(db: AsyncSession = Depends(get_db)):
    """获取所有分类"""
    result = await db.execute(
        select(KnowledgeCategory).order_by(KnowledgeCategory.sort_order)
    )
    cats = result.scalars().all()
    return [
        {
            "id": c.id,
            "name": c.name,
            "slug": c.slug,
            "description": c.description,
            "icon": c.icon,
            "color": c.color,
        }
        for c in cats
    ]


@router.get("")
async def list_articles(
    category: str = Query(None),
    search: str = Query(None),
    featured: bool = Query(False),
    limit: int = Query(20, ge=1, le=50),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    q = select(KnowledgeArticle)
    if category:
        q = q.join(KnowledgeCategory).where(KnowledgeCategory.slug == category)
    if search:
        q = q.where(
            (KnowledgeArticle.title.contains(search))
            | (KnowledgeArticle.summary.contains(search))
        )
    if featured:
        q = q.where(KnowledgeArticle.is_featured == True)

    count_q = select(func.count()).select_from(q.subquery())
    total_result = await db.execute(count_q)
    total = total_result.scalar() or 0

    q = q.order_by(KnowledgeArticle.is_featured.desc(), KnowledgeArticle.created_at.desc())
    q = q.offset(offset).limit(limit)
    result = await db.execute(q)
    articles = result.scalars().all()

    return {
        "total": total,
        "items": [
            {
                "id": a.id,
                "title": a.title,
                "slug": a.slug,
                "summary": a.summary,
                "key_concepts": a.key_concepts,
                "evidence_level": a.evidence_level,
                "reading_time": a.reading_time,
                "is_featured": a.is_featured,
                "category": (
                    {
                        "name": a.category_rel.name,
                        "slug": a.category_rel.slug,
                        "icon": a.category_rel.icon,
                        "color": a.category_rel.color,
                    }
                    if a.category_rel
                    else None
                ),
                "created_at": str(a.created_at),
            }
            for a in articles
        ],
    }


@router.get("/featured")
async def list_featured(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(KnowledgeArticle)
        .where(KnowledgeArticle.is_featured == True)
        .order_by(KnowledgeArticle.created_at.desc())
        .limit(6)
    )
    articles = result.scalars().all()
    return [
        {
            "id": a.id,
            "title": a.title,
            "slug": a.slug,
            "summary": a.summary,
            "evidence_level": a.evidence_level,
            "reading_time": a.reading_time,
            "key_concepts": a.key_concepts,
            "category": (
                {
                    "name": a.category_rel.name,
                    "icon": a.category_rel.icon,
                    "color": a.category_rel.color,
                }
                if a.category_rel
                else None
            ),
            "created_at": str(a.created_at),
        }
        for a in articles
    ]


@router.get("/{slug}")
async def get_article(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(KnowledgeArticle).where(KnowledgeArticle.slug == slug)
    )
    article = result.scalar_one_or_none()
    if not article:
        return {"error": "Article not found"}

    return {
        "id": article.id,
        "title": article.title,
        "slug": article.slug,
        "summary": article.summary,
        "content": article.content,
        "key_concepts": article.key_concepts,
        "evidence_level": article.evidence_level,
        "source": article.source,
        "reading_time": article.reading_time,
        "quiz": article.quiz,
        "category": (
            {
                "name": article.category_rel.name,
                "slug": article.category_rel.slug,
                "icon": article.category_rel.icon,
                "color": article.category_rel.color,
            }
            if article.category_rel
            else None
        ),
        "created_at": str(article.created_at),
    }


@router.post("/quiz/submit")
async def submit_quiz(data: dict, db: AsyncSession = Depends(get_db)):
    article_id = data.get("article_id")
    user_id = data.get("user_id", 1)
    answers = data.get("answers", [])

    result = await db.execute(
        select(KnowledgeArticle).where(KnowledgeArticle.id == article_id)
    )
    article = result.scalar_one_or_none()
    if not article or not article.quiz:
        return {"error": "Article or quiz not found"}

    quiz = article.quiz
    score = 0
    total = len(quiz)
    detailed = []

    for a in answers:
        idx = a.get("question_index", 0)
        selected = a.get("selected", -1)
        correct = quiz[idx].get("answer", 0) if idx < total else 0
        is_correct = selected == correct
        if is_correct:
            score += 1
        detailed.append({
            "question_index": idx,
            "selected": selected,
            "correct": correct,
            "is_correct": is_correct,
        })

    attempt = QuizAttempt(
        user_id=user_id,
        article_id=article_id,
        score=score,
        total=total,
        answers=detailed,
    )
    db.add(attempt)
    await db.commit()

    return {
        "score": score,
        "total": total,
        "percentage": round(score / total * 100, 1) if total > 0 else 0,
        "details": detailed,
    }
