from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from ..models import Course, UserProgress, User
from ..schemas import (
    CourseCreate, CourseUpdate, CourseResponse, CourseListItem,
    ProgressUpdate, ProgressResponse, ErrorResponse,
)
from ..database import get_db

router = APIRouter(prefix="/api/courses", tags=["courses"])


from datetime import datetime, timezone

def _course_to_listitem(course: Course) -> CourseListItem:
    return CourseListItem(
        id=course.id,
        title=course.title,
        description=course.description,
        category=course.category,
        difficulty=course.difficulty,
        image_url=course.image_url,
        chapter_count=len(course.content) if course.content else 0,
        created_at=course.created_at or datetime.now(timezone.utc),
    )


# ─── Courses CRUD ────────────────────────────────────────


@router.post("/", response_model=CourseResponse, status_code=201)
async def create_course(course_data: CourseCreate, db: AsyncSession = Depends(get_db)):
    """Create a new course."""
    course = Course(
        title=course_data.title,
        description=course_data.description,
        category=course_data.category,
        difficulty=course_data.difficulty,
        image_url=course_data.image_url,
        content=[c.model_dump() for c in course_data.content],
    )
    db.add(course)
    await db.commit()
    await db.refresh(course)
    return course


@router.get("/", response_model=list[CourseListItem])
async def list_courses(
    category: Optional[str] = Query(None, pattern="^(freud|jung|modern|eastern|economics|positive|mindfulness|cbt|attachment|personality)?$"),
    db: AsyncSession = Depends(get_db),
):
    """List all courses, optionally filtered by category."""
    stmt = select(Course).order_by(Course.id)
    if category:
        stmt = stmt.where(Course.category == category)
    result = await db.execute(stmt)
    courses = result.scalars().all()
    return [_course_to_listitem(c) for c in courses]


@router.get("/{course_id}", response_model=CourseResponse, responses={404: {"model": ErrorResponse}})
async def get_course(course_id: int, db: AsyncSession = Depends(get_db)):
    """Get a course by ID with full content."""
    result = await db.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")
    return course


@router.put("/{course_id}", response_model=CourseResponse, responses={404: {"model": ErrorResponse}})
async def update_course(course_id: int, course_data: CourseUpdate, db: AsyncSession = Depends(get_db)):
    """Update a course."""
    result = await db.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")

    update_data = course_data.model_dump(exclude_unset=True)
    if "content" in update_data and update_data["content"] is not None:
        update_data["content"] = [
            c.model_dump() if hasattr(c, "model_dump") else c
            for c in update_data["content"]
        ]

    for key, value in update_data.items():
        setattr(course, key, value)

    await db.commit()
    await db.refresh(course)
    return course


@router.delete("/{course_id}", status_code=204, responses={404: {"model": ErrorResponse}})
async def delete_course(course_id: int, db: AsyncSession = Depends(get_db)):
    """Delete a course."""
    result = await db.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")
    await db.delete(course)
    await db.commit()


# ─── User Progress ───────────────────────────────────────


@router.post("/progress", response_model=ProgressResponse, status_code=201)
async def upsert_progress(progress_data: ProgressUpdate, db: AsyncSession = Depends(get_db)):
    """Create or update user progress for a course."""
    # Check user and course exist
    user = await db.get(User, progress_data.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    course = await db.get(Course, progress_data.course_id)
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")

    # Check if progress already exists
    result = await db.execute(
        select(UserProgress).where(
            UserProgress.user_id == progress_data.user_id,
            UserProgress.course_id == progress_data.course_id,
        )
    )
    progress = result.scalar_one_or_none()

    if progress:
        progress.chapter_index = progress_data.chapter_index
        progress.completed = progress_data.completed
    else:
        progress = UserProgress(
            user_id=progress_data.user_id,
            course_id=progress_data.course_id,
            chapter_index=progress_data.chapter_index,
            completed=progress_data.completed,
        )
        db.add(progress)

    await db.commit()
    await db.refresh(progress)
    return progress


@router.get("/user/{user_id}/progress", response_model=list[ProgressResponse])
async def get_user_progress(user_id: int, db: AsyncSession = Depends(get_db)):
    """Get all progress records for a user."""
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    result = await db.execute(
        select(UserProgress)
        .where(UserProgress.user_id == user_id)
        .order_by(UserProgress.course_id)
    )
    return result.scalars().all()
