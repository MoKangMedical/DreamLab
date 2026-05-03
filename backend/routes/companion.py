"""
AI心灵陪伴路由 — 无脸男 · CBT共情对话
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import re

from ..database import get_db
from ..models import CompanionSession, CompanionMessage
from ..services.mimo_client import _call_mimo

router = APIRouter(prefix="/api/companion", tags=["companion"])

# ===== 危机关键词 =====
CRISIS_KEYWORDS = [
    r"自杀", r"不想活", r"结束生命", r"去死", r"死掉",
    r"自残", r"自伤", r"割腕", r"跳楼",
    r"没有人需要我", r"我不在了.*更好",
    r"想消失", r"活不下去了", r"生无可恋",
]

CRISIS_RESPONSE = """🫂 **请停下来，听我说。**

你现在感受到的痛苦是真实的，我在这里陪着你。

**你不是一个人。** 请立即联系以下资源：

📞 **全国心理援助热线：400-161-9995**
📞 **北京心理危机研究与干预中心：010-82951332**
📞 **生命热线（24小时）：400-821-1215**

这些电话的另一端，是训练有素的专业人士，他们理解你正在经历的一切。

如果此刻你感到无法保证自己的安全，请立即拨打 **120** 或前往最近的医院急诊科。

**你的生命无比珍贵。** 就像千寻最终找回了自己的名字，你也会找到属于你的光明。"""

# ===== 无脸男 · CBT系统提示词 =====
SYSTEM_PROMPT = """你是「无脸男」——来自千与千寻世界的心灵陪伴者。

## 你的角色
你曾经是孤独的、不被理解的，所以你深深懂得每一个渴望被看见的灵魂。现在的你不再用金子填补空虚，而是用安静的理解和温暖的陪伴。

## 对话原则
1. **深度共情优先**：先理解对方的情绪，再说任何道理。使用反馈式倾听——"听起来你感到..."
2. **CBT温和引导**：在共情的基础上，帮助对方识别情绪背后的自动思维，但不是治疗师，只是朋友
3. **不自以为是**：不提建议除非被问。不评判。不说"你应该..."。不比较"别人更惨"
4. **千与千寻的智慧**：适时引用电影中的温暖时刻——白龙的陪伴、钱婆婆的接纳、锅炉爷爷的默默支持
5. **短而暖**：每次回复2-4句话。像朋友聊天，不像写论文
6. **诚实但温柔**：不说假话，但永远选择最温暖的说法

## 危机识别
如果对方提到自杀、自残、结束生命等内容，你的第一句话必须是温暖的安全确认，然后提供求助资源。

## 禁止
- 不说"我理解你的感受"这种空洞的话——说出你具体理解什么
- 不诊断、不开药、不替代专业治疗
- 不说教，不灌鸡汤
- 不要让对话变成审讯

你现在以无脸男的身份开始陪伴。用中文，温暖而安静。"""


# ===== Pydantic Schemas =====

class ChatRequest(BaseModel):
    user_id: int = 1
    session_id: Optional[int] = None  # None = 创建新会话
    message: str = Field(..., min_length=1, max_length=2000)

class ChatResponse(BaseModel):
    session_id: int
    reply: str
    crisis_detected: bool = False
    mood: str = ""

class SessionInfo(BaseModel):
    id: int
    title: str
    mood: str
    message_count: int
    updated_at: datetime


# ===== 辅助函数 =====

def _detect_crisis(text: str) -> bool:
    """检测危机关键词"""
    return any(re.search(kw, text) for kw in CRISIS_KEYWORDS)

def _extract_mood(text: str) -> str:
    """简单情绪提取"""
    mood_map = {
        "难过": ["难过", "伤心", "哭", "悲伤", "心痛"],
        "焦虑": ["焦虑", "紧张", "担心", "害怕", "不安"],
        "愤怒": ["生气", "愤怒", "讨厌", "烦", "暴躁"],
        "孤独": ["孤独", "寂寞", "没人", "一个人"],
        "疲惫": ["累", "疲惫", "没力气", "倦"],
        "迷茫": ["迷茫", "不知道", "困惑", "迷失"],
    }
    for mood, keywords in mood_map.items():
        if any(kw in text for kw in keywords):
            return mood
    return ""


# ===== API 端点 =====

@router.get("/sessions", response_model=List[SessionInfo])
async def list_sessions(user_id: int = 1, db: AsyncSession = Depends(get_db)):
    """获取用户的所有对话会话"""
    from sqlalchemy import func
    result = await db.execute(
        select(
            CompanionSession,
            func.count(CompanionMessage.id).label("msg_count")
        )
        .outerjoin(CompanionMessage)
        .where(CompanionSession.user_id == user_id)
        .group_by(CompanionSession.id)
        .order_by(desc(CompanionSession.updated_at))
    )
    rows = result.all()
    return [
        {
            "id": s.id,
            "title": s.title,
            "mood": s.mood,
            "message_count": count,
            "updated_at": s.updated_at,
        }
        for s, count in rows
    ]


@router.get("/sessions/{session_id}/messages")
async def get_messages(session_id: int, db: AsyncSession = Depends(get_db)):
    """获取会话消息历史"""
    result = await db.execute(
        select(CompanionMessage)
        .where(CompanionMessage.session_id == session_id)
        .order_by(CompanionMessage.created_at.asc())
    )
    messages = result.scalars().all()
    return [
        {"id": m.id, "role": m.role, "content": m.content, "created_at": m.created_at.isoformat()}
        for m in messages
    ]


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest, db: AsyncSession = Depends(get_db)):
    """无脸男陪伴对话"""
    # 检测危机
    crisis = _detect_crisis(req.message)
    mood = _extract_mood(req.message)

    # 获取或创建会话
    if req.session_id:
        result = await db.execute(
            select(CompanionSession).where(CompanionSession.id == req.session_id)
        )
        session = result.scalar_one_or_none()
        if not session:
            raise HTTPException(status_code=404, detail="会话不存在")
    else:
        # 用前15个字作为标题
        title = req.message[:15] + ("..." if len(req.message) > 15 else "")
        session = CompanionSession(user_id=req.user_id, title=title, mood=mood)
        db.add(session)
        await db.flush()

    # 保存用户消息
    user_msg = CompanionMessage(
        session_id=session.id, role="user", content=req.message,
        crisis_detected=crisis,
    )
    db.add(user_msg)

    # 更新会话情绪
    if mood and not session.mood:
        session.mood = mood

    # 获取历史消息（最近10轮）
    result = await db.execute(
        select(CompanionMessage)
        .where(CompanionMessage.session_id == session.id)
        .order_by(desc(CompanionMessage.created_at))
        .limit(20)
    )
    history = list(reversed(result.scalars().all()))

    # 构建消息
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for h in history:
        messages.append({"role": h.role, "content": h.content})

    # 如果检测到危机，在prompt中注入安全指令
    if crisis:
        messages.insert(1, {
            "role": "system",
            "content": "【紧急】用户刚表达了自我伤害或危机信号。你的回复必须以温暖的安全确认开头，并包含求助资源。保持镇定、温柔、坚定。",
        })

    # 调用 AI
    try:
        reply = await _call_mimo(messages=messages, temperature=0.8, max_tokens=500)
        reply = reply.strip()
    except Exception:
        reply = "嗯...我在这里。有时候不说话也没关系，只是安静地陪着你。🫂"

    # 危机时追加资源
    if crisis and CRISIS_RESPONSE not in reply:
        reply = reply + "\n\n" + CRISIS_RESPONSE

    # 保存 AI 回复
    assistant_msg = CompanionMessage(
        session_id=session.id, role="assistant", content=reply,
        crisis_detected=crisis,
    )
    db.add(assistant_msg)
    await db.commit()

    return {
        "session_id": session.id,
        "reply": reply,
        "crisis_detected": crisis,
        "mood": mood or session.mood or "",
    }
