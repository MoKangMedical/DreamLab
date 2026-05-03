"""
专业心理测评路由 — 6大标准量表 + AI解读
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import os

from ..database import get_db
from ..models import Assessment, AssessmentResult
from ..services.mimo_client import _call_mimo

router = APIRouter(prefix="/api/assessments", tags=["assessments"])


# ===== Pydantic Schemas =====

class QuestionOption(BaseModel):
    score: int
    label: str

class AssessmentQuestion(BaseModel):
    id: int
    text: str
    options: List[QuestionOption] = []
    reversed: bool = False

class AssessmentResponse(BaseModel):
    id: int
    name: str
    category: str
    description: str
    instructions: str
    question_count: int
    icon: str
    disclaimer: str
    model_config = {"from_attributes": True}

class AssessmentDetailResponse(BaseModel):
    id: int
    name: str
    category: str
    description: str
    instructions: str
    questions: list
    icon: str
    disclaimer: str
    model_config = {"from_attributes": True}

class AnswerItem(BaseModel):
    question_id: int
    score: int = Field(ge=1, le=4)

class SubmitRequest(BaseModel):
    user_id: int
    answers: List[AnswerItem]

class LevelInfo(BaseModel):
    label: str
    description: str
    color: str

class SubmitResponse(BaseModel):
    id: int
    raw_score: float
    standard_score: float
    level: str
    level_info: Optional[dict] = None
    interpretation: str
    created_at: datetime
    model_config = {"from_attributes": True}

class TrendPoint(BaseModel):
    date: str
    standard_score: float
    level: str

class TrendResponse(BaseModel):
    assessment_name: str
    points: List[TrendPoint]


# ===== 辅助函数 =====

def _score_assessment(assessment: dict, answers: List[dict]) -> dict:
    """根据量表规则计算分数和等级"""
    q_map = {q["id"]: q for q in assessment["questions"]}
    raw = 0.0
    max_possible = 0

    for a in answers:
        q = q_map.get(a["question_id"])
        if q is None:
            continue
        score = a["score"]
        max_possible += max(opt["score"] for opt in q.get("options", [{"score": 4}]))
        if q.get("reversed"):
            # 反向计分: 选项分数越高 → 真实得分越低
            max_opt = max(opt["score"] for opt in q.get("options", [{"score": 4}]))
            score = max_opt + 1 - score
        raw += score

    # 应用评分规则
    rules = assessment.get("scoring_rules", {})
    standard = raw
    if rules.get("multiplier"):
        standard = raw * rules["multiplier"]
    if rules.get("divisor"):
        standard = raw / rules["divisor"]

    # 确定等级
    level = "normal"
    level_info = None
    levels = rules.get("levels", [])
    for lv in levels:
        r = lv["range"]
        if r[0] <= standard <= r[1]:
            level = lv["label"]
            level_info = lv
            break

    return {
        "raw_score": round(raw, 1),
        "standard_score": round(standard, 1),
        "level": level,
        "level_info": level_info,
    }


async def _ai_interpretation(assessment_name: str, answers_summary: str, level: str, level_desc: str) -> str:
    """使用AI生成个性化解读"""
    if not os.getenv("DEEPSEEK_API_KEY"):
        return f"📊 测评完成！您的{assessment_name}结果为：**{level}**。{level_desc}"

    prompt = f"""你是专业心理咨询师。用户完成了「{assessment_name}」测评。

用户回答摘要：{answers_summary}
测评等级：{level}
等级说明：{level_desc}

请用中文给出个性化解读（150字以内），包含：
1. 对用户当前状态的理解
2. 一条温暖的鼓励
3. 一个可操作的建议

语气要温暖专业，像千与千寻中的白龙引导千寻一样——既诚实又充满希望。"""

    try:
        resp = await _call_mimo(
            messages=[
                {"role": "system", "content": "你是专业心理咨询师，用温暖专业的中文进行解读。语气像千与千寻中的白龙——诚实而充满希望。"},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=300,
        )
        return resp.strip()
    except Exception:
        return f"📊 测评完成！您的{assessment_name}结果为：**{level}**。{level_desc}"


# ===== API 端点 =====

@router.get("")
async def list_assessments(db: AsyncSession = Depends(get_db)):
    """获取所有量表列表"""
    result = await db.execute(select(Assessment).order_by(Assessment.id))
    assessments = result.scalars().all()
    return [
        {
            "id": a.id,
            "name": a.name,
            "category": a.category,
            "description": a.description,
            "instructions": a.instructions,
            "question_count": len(a.questions),
            "icon": a.icon,
            "disclaimer": a.disclaimer,
        }
        for a in assessments
    ]


@router.get("/{assessment_id}")
async def get_assessment(assessment_id: int, db: AsyncSession = Depends(get_db)):
    """获取量表详情（含题目）"""
    result = await db.execute(select(Assessment).where(Assessment.id == assessment_id))
    assessment = result.scalar_one_or_none()
    if not assessment:
        raise HTTPException(status_code=404, detail="量表不存在")
    return {
        "id": assessment.id,
        "name": assessment.name,
        "category": assessment.category,
        "description": assessment.description,
        "instructions": assessment.instructions,
        "questions": assessment.questions,
        "icon": assessment.icon,
        "disclaimer": assessment.disclaimer,
    }


@router.post("/{assessment_id}/submit", response_model=SubmitResponse)
async def submit_assessment(
    assessment_id: int,
    req: SubmitRequest,
    db: AsyncSession = Depends(get_db),
):
    """提交测评答案，返回分数+AI解读"""
    # 获取量表
    result = await db.execute(select(Assessment).where(Assessment.id == assessment_id))
    assessment = result.scalar_one_or_none()
    if not assessment:
        raise HTTPException(status_code=404, detail="量表不存在")

    # 构建答案字典列表
    answers = [{"question_id": a.question_id, "score": a.score} for a in req.answers]

    # 计分
    scoring = _score_assessment(
        {
            "questions": assessment.questions,
            "scoring_rules": assessment.scoring_rules,
        },
        answers,
    )

    # AI解读
    answers_text = ", ".join(
        f"Q{a.question_id}={a.score}" for a in req.answers[:5]
    ) + ("..." if len(req.answers) > 5 else "")
    level_desc = scoring["level_info"]["description"] if scoring["level_info"] else ""
    interpretation = await _ai_interpretation(
        assessment.name, answers_text, scoring["level"], level_desc
    )

    # 保存结果
    db_result = AssessmentResult(
        user_id=req.user_id,
        assessment_id=assessment_id,
        answers=answers,
        raw_score=scoring["raw_score"],
        standard_score=scoring["standard_score"],
        level=scoring["level"],
        interpretation=interpretation,
    )
    db.add(db_result)
    await db.commit()
    await db.refresh(db_result)

    return {
        "id": db_result.id,
        "raw_score": db_result.raw_score,
        "standard_score": db_result.standard_score,
        "level": db_result.level,
        "level_info": scoring["level_info"],
        "interpretation": db_result.interpretation,
        "created_at": db_result.created_at,
    }


@router.get("/results/{user_id}", response_model=List[TrendResponse])
async def get_trends(user_id: int, db: AsyncSession = Depends(get_db)):
    """获取用户各量表趋势数据"""
    # 获取所有测评结果，按量表分组
    result = await db.execute(
        select(AssessmentResult)
        .where(AssessmentResult.user_id == user_id)
        .order_by(AssessmentResult.created_at.asc())
    )
    results = result.scalars().all()

    if not results:
        return []

    # 获取量表名称映射
    assessment_ids = list(set(r.assessment_id for r in results))
    name_result = await db.execute(
        select(Assessment.id, Assessment.name).where(Assessment.id.in_(assessment_ids))
    )
    name_map = {row[0]: row[1] for row in name_result.fetchall()}

    # 按量表分组构建趋势
    by_assessment = {}
    for r in results:
        name = name_map.get(r.assessment_id, f"量表{r.assessment_id}")
        if name not in by_assessment:
            by_assessment[name] = []
        by_assessment[name].append({
            "date": r.created_at.strftime("%Y-%m-%d"),
            "standard_score": r.standard_score,
            "level": r.level,
        })

    return [
        {"assessment_name": name, "points": points}
        for name, points in by_assessment.items()
    ]
