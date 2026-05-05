"""
互助社区 API — 匿名发帖/评论/点赞

Routes:
  GET    /api/community/posts          — 帖子列表（分页/分类筛选）
  GET    /api/community/posts/{id}     — 帖子详情（含评论）
  POST   /api/community/posts          — 发帖
  POST   /api/community/posts/{id}/like   — 点赞
  POST   /api/community/posts/{id}/comments — 评论
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update
from sqlalchemy.orm import selectinload
from ..database import get_db
from ..models import CommunityPost, CommunityComment
from ..schemas import CommunityPostCreate, CommunityCommentCreate

router = APIRouter(prefix="/api/community", tags=["community"])


@router.get("/posts")
async def list_posts(
    category: str = Query(None),
    limit: int = Query(20, ge=1, le=50),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    """获取帖子列表，支持分类筛选和分页"""
    q = select(CommunityPost).options(selectinload(CommunityPost.comments))
    if category:
        q = q.where(CommunityPost.category == category)

    # 总数
    count_q = select(func.count()).select_from(q.subquery())
    total_result = await db.execute(count_q)
    total = total_result.scalar() or 0

    q = q.order_by(CommunityPost.is_pinned.desc(), CommunityPost.created_at.desc())
    q = q.offset(offset).limit(limit)
    result = await db.execute(q)
    posts = result.scalars().all()

    return {
        "total": total,
        "items": [
            {
                "id": p.id,
                "author": p.author,
                "title": p.title,
                "content": p.content,
                "category": p.category,
                "likes": p.likes,
                "is_pinned": p.is_pinned,
                "created_at": str(p.created_at),
                "comment_count": len(p.comments),
                "comments": [
                    {
                        "id": c.id,
                        "author": c.author,
                        "content": c.content,
                        "created_at": str(c.created_at),
                    }
                    for c in p.comments
                ],
            }
            for p in posts
        ],
    }


@router.get("/posts/{post_id}")
async def get_post(post_id: int, db: AsyncSession = Depends(get_db)):
    """获取单个帖子（含全部评论）"""
    result = await db.execute(
        select(CommunityPost)
        .options(selectinload(CommunityPost.comments))
        .where(CommunityPost.id == post_id)
    )
    post = result.scalar_one_or_none()
    if not post:
        return {"error": "Post not found"}

    return {
        "id": post.id,
        "author": post.author,
        "title": post.title,
        "content": post.content,
        "category": post.category,
        "likes": post.likes,
        "is_pinned": post.is_pinned,
        "created_at": str(post.created_at),
        "comment_count": len(post.comments),
        "comments": [
            {
                "id": c.id,
                "author": c.author,
                "content": c.content,
                "created_at": str(c.created_at),
            }
            for c in post.comments
        ],
    }


@router.post("/posts")
async def create_post(post_data: CommunityPostCreate, db: AsyncSession = Depends(get_db)):
    """发布新帖子"""
    post = CommunityPost(
        author=post_data.author,
        title=post_data.title,
        content=post_data.content,
        category=post_data.category,
    )
    db.add(post)
    await db.commit()
    await db.refresh(post)

    return {
        "id": post.id,
        "author": post.author,
        "title": post.title,
        "content": post.content,
        "category": post.category,
        "likes": post.likes,
        "created_at": str(post.created_at),
        "comment_count": 0,
        "comments": [],
    }


@router.post("/posts/{post_id}/like")
async def like_post(post_id: int, db: AsyncSession = Depends(get_db)):
    """点赞帖子，返回更新后的点赞数"""
    await db.execute(
        update(CommunityPost)
        .where(CommunityPost.id == post_id)
        .values(likes=CommunityPost.likes + 1)
    )
    await db.commit()

    result = await db.execute(select(CommunityPost.likes).where(CommunityPost.id == post_id))
    likes = result.scalar_one_or_none()
    return {"post_id": post_id, "likes": likes or 0}


@router.post("/posts/{post_id}/comments")
async def add_comment(post_id: int, comment_data: CommunityCommentCreate, db: AsyncSession = Depends(get_db)):
    """给帖子添加评论"""
    # 确认帖子存在
    result = await db.execute(select(CommunityPost).where(CommunityPost.id == post_id))
    post = result.scalar_one_or_none()
    if not post:
        return {"error": "Post not found"}

    comment = CommunityComment(
        post_id=post_id,
        author=comment_data.author,
        content=comment_data.content,
    )
    db.add(comment)
    await db.commit()
    await db.refresh(comment)

    return {
        "id": comment.id,
        "post_id": post_id,
        "author": comment.author,
        "content": comment.content,
        "created_at": str(comment.created_at),
    }
