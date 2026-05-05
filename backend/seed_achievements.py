# -*- coding: utf-8 -*-
"""
Seed achievements data.
Usage: cd /root/.openclaw/workspace/dreamlab && python backend/seed_achievements.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session
from config import SYNC_DATABASE_URL
from models import Base, Achievement, UserAchievement

engine = create_engine(SYNC_DATABASE_URL, echo=False)
Base.metadata.create_all(bind=engine)

ACHIEVEMENTS = [
    ("first_assessment", "镜子里的自己", "完成第一次心理测评", "🪞", "完成1次测评", 1),
    ("dream_keeper", "梦境守护者", "记录10个梦境", "🌙", "记录10个梦", 2),
    ("three_days", "三日的修行", "连续3天打卡", "🔥", "连续3天使用", 3),
    ("seven_days", "七日的试炼", "连续7天打卡", "✨", "连续7天使用", 4),
    ("scholar", "油屋的学者", "学完一门完整课程", "📜", "完成1门课程", 5),
    ("meditator", "河神的弟子", "完成10次冥想", "🧘", "冥想10次", 6),
    ("helper", "无脸男的馈赠", "在社区帮助他人10次", "👤", "发表10条评论", 7),
    ("five_scales", "汤婆婆的契约", "完成全部5个量表", "🎭", "完成5个量表", 8),
    ("explorer", "油屋探险家", "访问平台所有页面", "🏮", "探索全部区域", 9),
]

with Session(engine) as session:
    existing = session.execute(select(Achievement)).first()
    if existing:
        print(f"Achievements already seeded ({session.query(Achievement).count()} total) — skipping")
        sys.exit(0)

    for key, name, desc, icon, condition, order in ACHIEVEMENTS:
        session.add(Achievement(
            key=key, name=name, desc=desc, icon=icon,
            condition=condition, sort_order=order,
        ))

    session.commit()
    print(f"✅ Seeded {len(ACHIEVEMENTS)} achievements")
