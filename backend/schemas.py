from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime


# ─── User ───────────────────────────────────────────────

class UserCreate(BaseModel):
    username: str = Field(..., min_length=1, max_length=50)
    email: str = Field(..., max_length=120)


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Course ──────────────────────────────────────────────

class ChapterSchema(BaseModel):
    title: str
    body: str = ""
    order: int = 0
    audio_intro: str = ""


class CourseCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str
    category: str = Field(..., pattern="^(freud|jung|modern|eastern|economics|positive|mindfulness|cbt|attachment|personality)$")
    difficulty: str = "beginner"
    image_url: str = ""
    content: List[ChapterSchema] = []


class CourseUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=200)
    description: Optional[str] = None
    category: Optional[str] = Field(None, pattern="^(freud|jung|modern|eastern|economics|positive|mindfulness|cbt|attachment|personality)?$")
    difficulty: Optional[str] = None
    image_url: Optional[str] = None
    content: Optional[List[ChapterSchema]] = None


class CourseResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    difficulty: str
    image_url: str
    content: list = []
    created_at: datetime

    model_config = {"from_attributes": True}


class CourseListItem(BaseModel):
    id: int
    title: str
    description: str
    category: str
    difficulty: str
    image_url: str
    chapter_count: int = 0
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── User Progress ───────────────────────────────────────

class ProgressUpdate(BaseModel):
    user_id: int
    course_id: int
    chapter_index: int = 0
    completed: bool = False


class ProgressResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    chapter_index: int
    completed: bool
    updated_at: datetime

    model_config = {"from_attributes": True}


# ─── Dream ───────────────────────────────────────────────

class DreamCreate(BaseModel):
    user_id: int
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1)
    emotions: List[str] = []
    elements: List[str] = []
    dream_date: Optional[datetime] = None


class DreamResponse(BaseModel):
    id: int
    user_id: int
    title: str
    content: str
    emotions: list = []
    elements: list = []
    dream_date: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class DreamWithAnalysis(DreamResponse):
    analysis: Optional["AnalysisResponse"] = None


# ─── Dream Analysis ──────────────────────────────────────

class AnalysisResponse(BaseModel):
    id: int
    dream_id: int
    freud_perspective: str
    jung_perspective: str
    modern_perspective: str
    eastern_perspective: str
    summary: str
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Reflection ──────────────────────────────────────────

class ReflectionCreate(BaseModel):
    user_id: int
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1)
    mood_score: int = Field(default=5, ge=1, le=10)
    linked_dream_id: Optional[int] = None


class ReflectionUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=200)
    content: Optional[str] = None
    mood_score: Optional[int] = Field(None, ge=1, le=10)
    linked_dream_id: Optional[int] = None


class ReflectionResponse(BaseModel):
    id: int
    user_id: int
    title: str
    content: str
    mood_score: int
    linked_dream_id: Optional[int] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Insight ─────────────────────────────────────────────

class InsightCreate(BaseModel):
    user_id: int
    title: str = Field(..., min_length=1, max_length=200)
    content: str
    period: str = Field(default="weekly", pattern="^(weekly|monthly)$")


class InsightResponse(BaseModel):
    id: int
    user_id: int
    title: str
    content: str
    period: str
    created_at: datetime

    model_config = {"from_attributes": True}


class InsightGenerateRequest(BaseModel):
    user_id: int
    period: str = Field(default="weekly", pattern="^(weekly|monthly)$")
    linked_dream_ids: List[int] = []


# ─── Generic / Error ─────────────────────────────────────

class ErrorResponse(BaseModel):
    detail: str


class StatusResponse(BaseModel):
    status: str
    message: str


# ─── Module 5: Community ──────────────────────────────────

class CommunityPostCreate(BaseModel):
    author: str = Field(..., min_length=1, max_length=50)
    title: str = Field(..., min_length=1, max_length=300)
    content: str = Field(..., min_length=1, max_length=5000)
    category: str = Field(..., pattern="^(mood|dream|growth|help)$")


class CommunityCommentCreate(BaseModel):
    author: str = Field(..., min_length=1, max_length=50)
    content: str = Field(..., min_length=1, max_length=2000)


class CommunityCommentResponse(BaseModel):
    id: int
    author: str
    content: str
    created_at: str

    model_config = {"from_attributes": True}


class CommunityPostResponse(BaseModel):
    id: int
    author: str
    title: str
    content: str
    category: str
    likes: int
    is_pinned: bool
    created_at: str
    comment_count: int = 0
    comments: List[CommunityCommentResponse] = []

    model_config = {"from_attributes": True}

