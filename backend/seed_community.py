# -*- coding: utf-8 -*-
"""
Seed community data — standalone script.
Usage: cd /root/.openclaw/workspace/dreamlab && python backend/seed_community.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from datetime import datetime, timezone
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session
from config import SYNC_DATABASE_URL
from models import Base, CommunityPost, CommunityComment

engine = create_engine(SYNC_DATABASE_URL, echo=False)
Base.metadata.create_all(bind=engine)

now = datetime.now(timezone.utc)

with Session(engine) as session:
    existing = session.execute(select(CommunityPost)).first()
    if existing:
        count = session.query(CommunityPost).count()
        print(f"Community already has {count} posts — skipping seed")
        sys.exit(0)

    def add_post(author, title, content, category, likes, comments):
        post = CommunityPost(
            author=author, title=title, content=content,
            category=category, likes=likes, created_at=now,
        )
        session.add(post)
        session.flush()
        for cauthor, ccontent in comments:
            session.add(CommunityComment(
                post_id=post.id, author=cauthor, content=ccontent, created_at=now,
            ))

    add_post(
        "小玲", "做完SAS测评，发现自己比想象中更焦虑",
        '一直以为自己只是\u201c想太多\u201d，做完量表才发现标准分到了58。看到\u201c轻度焦虑\u201d的结果反而松了口气——原来这不是我的错。',
        "mood", 12, [
            ("锅炉爷爷", "焦虑不是缺陷，是身体在提醒你。锅炉房的火大一些没关系。"),
            ("无脸男", "......嗯。（默默递给你一杯热茶）"),
        ],
    )

    add_post(
        "千寻", "连续7天记录梦境，发现了惊人的模式",
        '反复出现\u201c被追赶\u201d和\u201c找不到路\u201d的主题。弗洛伊德说这些可能和安全感的缺失有关。',
        "dream", 8, [
            ("白龙", "被追赶的梦往往与现实中逃避的问题有关。转过身，看看追赶你的是什么。"),
        ],
    )

    add_post(
        "坊宝宝", "学到荣格\u201c阴影\u201d概念，整个人都不好了——但是好的那种",
        "之前不能接受自己会嫉妒朋友的成功。荣格说阴影不是敌人，承认之后反而轻松了。",
        "growth", 15, [
            ("钱婆婆", "能承认阴影的人，已经比大多数人勇敢了。"),
        ],
    )

    add_post(
        "煤煤虫", "失眠三周，4-7-8呼吸法让我昨晚睡了6小时",
        "之前觉得呼吸法太简单不可能有用，但昨晚真的在第三轮就睡着了。建议大家都试试。",
        "help", 20, [
            ("锅炉爷爷", "睡前泡个热水澡。最好的安眠药就是热水。"),
            ("小玲", "我也是！试了三天，第一天没用，第二天只睡了4小时，第三天突然就睡着了。坚持很重要。"),
        ],
    )

    add_post(
        "白龙", "关于\u201c正念\u201d这件事，我有个秘密想分享",
        "以前觉得正念冥想是玄学。但连续两周每天10分钟身体扫描后，注意力的改善是实实在在的。",
        "growth", 18, [
            ("千寻", "能分享一下你用的引导音频吗？"),
            ("白龙", "油屋知识库里有一篇讲正念神经科学的文章，里面有引导音频链接。"),
        ],
    )

    add_post(
        "河神", "分享一个对抗负面自我对话的技巧",
        "每次脑子里出现\u201c我什么都做不好\u201d的时候，我问自己：如果最好的朋友对我说这句话，我会怎么回应？然后把这个回应写给自己。",
        "mood", 25, [
            ("钱婆婆", "这个方法在CBT里叫\u201c苏格拉底式提问\u201d。能自己发明出来，你很了不起。"),
            ("坊宝宝", "试了一下，眼泪出来了。但也确实有用。"),
            ("锅炉爷爷", "好方法。记住，你不只是那个说狠话的人，你也是那个会安慰朋友的人。"),
        ],
    )

    add_post(
        "小玲", "昨晚梦到自己在油屋打工，醒来后想明白了工作上的焦虑",
        "梦里的汤婆婆一直在给我加工作。醒来后意识到现实中我给自己加了太多不必要的压力。",
        "dream", 14, [
            ("无脸男", "......（在纸上写了一个\u201c减\u201d字）"),
        ],
    )

    session.commit()
    print("✅ Seeded 7 community posts with comments")
