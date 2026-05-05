from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, DateTime, JSON, ForeignKey, Float
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime, timezone

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(120), unique=True, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    progress = relationship("UserProgress", back_populates="user", cascade="all, delete-orphan")
    dreams = relationship("Dream", back_populates="user", cascade="all, delete-orphan")
    reflections = relationship("Reflection", back_populates="user", cascade="all, delete-orphan")
    insights = relationship("Insight", back_populates="user", cascade="all, delete-orphan")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(20), nullable=False, index=True)  # freud, jung, modern, eastern
    difficulty = Column(String(20), default="beginner")
    image_url = Column(String(500), default="")
    content = Column(JSON, default=list)  # list of chapters: [{title, body, order}]
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    progress = relationship("UserProgress", back_populates="course", cascade="all, delete-orphan")


class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False, index=True)
    chapter_index = Column(Integer, default=0)
    completed = Column(Boolean, default=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="progress")
    course = relationship("Course", back_populates="progress")


class Dream(Base):
    __tablename__ = "dreams"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    emotions = Column(JSON, default=list)
    elements = Column(JSON, default=list)
    dream_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="dreams")
    analyses = relationship("DreamAnalysis", back_populates="dream", cascade="all, delete-orphan")
    reflections = relationship("Reflection", back_populates="linked_dream")


class DreamAnalysis(Base):
    __tablename__ = "dream_analyses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    dream_id = Column(Integer, ForeignKey("dreams.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    freud_perspective = Column(Text, default="")
    jung_perspective = Column(Text, default="")
    modern_perspective = Column(Text, default="")
    eastern_perspective = Column(Text, default="")
    summary = Column(Text, default="")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    dream = relationship("Dream", back_populates="analyses")


class Reflection(Base):
    __tablename__ = "reflections"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    mood_score = Column(Integer, default=5)  # 1-10
    linked_dream_id = Column(Integer, ForeignKey("dreams.id", ondelete="SET NULL"), nullable=True, index=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="reflections")
    linked_dream = relationship("Dream", back_populates="reflections")


class Insight(Base):
    __tablename__ = "insights"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    period = Column(String(20), default="weekly")  # weekly, monthly
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="insights")


# ===== 千与千寻游戏 =====
class SpiritedProgress(Base):
    """玩家在千寻游戏中的进度"""
    __tablename__ = "spirited_progress"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True, unique=True)
    current_floor = Column(Integer, default=1)  # 1-5F
    forget_name_count = Column(Integer, default=0)  # 忘记名字的次数
    shadows_met = Column(JSON, default=list)  # 遇到的阴影角色列表
    keys_collected = Column(JSON, default=list)  # 收集到的钥匙 [{floor, name, type}]
    title_earned = Column(String(50), default="")  # 获得的称号
    story_flags = Column(JSON, default=dict)  # 剧情开关 {flag_name: bool/value}
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class SpiritedDialogue(Base):
    """各层 NPC 对话树"""
    __tablename__ = "spirited_dialogues"

    id = Column(Integer, primary_key=True, autoincrement=True)
    floor = Column(Integer, nullable=False, index=True)  # 1-5
    npc_name = Column(String(50), nullable=False)  # 汤婆婆/无脸男/河神/白龙等
    dialogue_key = Column(String(50), nullable=False)  # 对话节点 key
    npc_text = Column(Text, nullable=False)  # NPC 台词
    player_choices = Column(JSON, default=list)  # [{text, next_key, flag_required, effect}]
    next_dialogue = Column(String(50), default="")  # 默认下一段
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


# ===== 专业心理测评 =====
class Assessment(Base):
    """心理量表定义"""
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)  # 量表名称
    category = Column(String(30), nullable=False, index=True)  # anxiety/depression/personality/sleep/resilience/symptom
    description = Column(Text, nullable=False)
    instructions = Column(Text, default="")  # 指导语
    questions = Column(JSON, nullable=False)  # [{id, text, options: [{score, label}], reversed}]
    scoring_rules = Column(JSON, nullable=False)  # {levels: [{range:[min,max], label, description, color}]}
    disclaimer = Column(Text, default="⚠️ 本测评仅为心理健康参考工具，不能替代专业诊断。如有需要请咨询心理医生。")
    icon = Column(String(10), default="🪞")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class AssessmentResult(Base):
    """用户测评结果"""
    __tablename__ = "assessment_results"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id", ondelete="CASCADE"), nullable=False, index=True)
    answers = Column(JSON, nullable=False)  # [{question_id, score}]
    raw_score = Column(Float, default=0)
    standard_score = Column(Float, default=0)
    level = Column(String(30), default="")  # normal/mild/moderate/severe
    interpretation = Column(Text, default="")  # AI-generated
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


# ===== AI心灵陪伴 =====
class CompanionSession(Base):
    """对话会话"""
    __tablename__ = "companion_sessions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(200), default="新的对话")
    mood = Column(String(30), default="")  # 当前情绪标签
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    messages = relationship("CompanionMessage", back_populates="session", cascade="all, delete-orphan")


class CompanionMessage(Base):
    """对话消息"""
    __tablename__ = "companion_messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(Integer, ForeignKey("companion_sessions.id", ondelete="CASCADE"), nullable=False, index=True)
    role = Column(String(20), nullable=False)  # user / assistant / system
    content = Column(Text, nullable=False)
    crisis_detected = Column(Boolean, default=False)  # 是否检测到危机关键词
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    session = relationship("CompanionSession", back_populates="messages")


# ===== 心智健康工具箱 =====
class WellnessLog(Base):
    """健康日志 — 感恩日记 / 情绪记录 / 睡眠日志"""
    __tablename__ = "wellness_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    log_type = Column(String(20), nullable=False, index=True)  # gratitude / mood / sleep / meditation
    title = Column(String(200), default="")
    content = Column(Text, default="")
    mood_score = Column(Integer, default=5)  # 1-10
    sleep_hours = Column(Float, default=0)
    sleep_quality = Column(Integer, default=3)  # 1-5
    tags = Column(JSON, default=list)  # ["感恩", "家庭"]
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


# ===== 模块4: 证据级知识库 =====
class KnowledgeCategory(Base):
    """知识库分类"""
    __tablename__ = "knowledge_categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)
    slug = Column(String(100), nullable=False, unique=True, index=True)
    description = Column(Text, default="")
    icon = Column(String(10), default="📚")
    color = Column(String(20), default="#e2b64f")
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    articles = relationship("KnowledgeArticle", back_populates="category_rel", cascade="all, delete-orphan")


class KnowledgeArticle(Base):
    """知识库文章 — 同行评审摘要与心理学百科"""
    __tablename__ = "knowledge_articles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    category_id = Column(Integer, ForeignKey("knowledge_categories.id", ondelete="SET NULL"), nullable=True, index=True)
    title = Column(String(300), nullable=False)
    slug = Column(String(300), nullable=False, unique=True, index=True)
    summary = Column(Text, default="")  # 摘要
    content = Column(Text, nullable=False)  # Markdown 正文
    key_concepts = Column(JSON, default=list)  # ["认知行为疗法", "自动化思维"]
    evidence_level = Column(String(30), default="中等")  # 强/中等/初步/理论
    source = Column(Text, default="")  # 参考文献
    reading_time = Column(Integer, default=5)  # 阅读时间（分钟）
    is_featured = Column(Boolean, default=False)
    quiz = Column(JSON, default=list)  # [{question, options: [str], answer: int, explanation: str}]
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    category_rel = relationship("KnowledgeCategory", back_populates="articles")


class QuizAttempt(Base):
    """用户测验记录"""
    __tablename__ = "quiz_attempts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    article_id = Column(Integer, ForeignKey("knowledge_articles.id", ondelete="CASCADE"), nullable=False, index=True)
    score = Column(Integer, default=0)
    total = Column(Integer, default=0)
    answers = Column(JSON, default=list)  # [{question_index, selected, correct}]
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


# ===== 模块5: 互助社区 =====
class CommunityPost(Base):
    """社区帖子"""
    __tablename__ = "community_posts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    author = Column(String(50), nullable=False)  # 匿名昵称
    title = Column(String(300), nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(20), nullable=False, index=True)  # mood/dream/growth/help
    likes = Column(Integer, default=0)
    is_pinned = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    comments = relationship("CommunityComment", back_populates="post", cascade="all, delete-orphan")


class CommunityComment(Base):
    """帖子评论"""
    __tablename__ = "community_comments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    post_id = Column(Integer, ForeignKey("community_posts.id", ondelete="CASCADE"), nullable=False, index=True)
    author = Column(String(50), nullable=False)  # 匿名昵称
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    post = relationship("CommunityPost", back_populates="comments")


# ===== 模块6: 白龙成长 =====
class Achievement(Base):
    """成就定义"""
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, autoincrement=True)
    key = Column(String(50), nullable=False, unique=True, index=True)  # first_assessment, dream_keeper...
    name = Column(String(100), nullable=False)
    desc = Column(Text, default="")
    icon = Column(String(10), default="🏆")
    condition = Column(String(200), default="")  # 解锁条件描述
    sort_order = Column(Integer, default=0)


class UserAchievement(Base):
    """用户已解锁的成就"""
    __tablename__ = "user_achievements"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    achievement_id = Column(Integer, ForeignKey("achievements.id", ondelete="CASCADE"), nullable=False)
    progress = Column(Integer, default=0)  # 0-100
    unlocked = Column(Boolean, default=False)
    unlocked_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

