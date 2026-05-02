"""
Seed database with initial courses and a default user.
Run: python -m backend.seed
"""
import asyncio
import json
import sys
import os

# Add parent to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import engine, async_session
from backend.models import Base


COURSES = [
    {
        "title": "弗洛伊德：梦的解析入门",
        "description": "从弗洛伊德经典理论出发，理解潜意识、欲望压抑与梦境形成的核心机制。适合零基础入门。",
        "category": "freud",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {
                "title": "第一章：弗洛伊德与精神分析的诞生",
                "description": "了解弗洛伊德的生平、时代背景以及精神分析理论的起源。",
                "content": (
                    "# 弗洛伊德与精神分析的诞生\n\n"
                    "## 时代背景\n西格蒙德·弗洛伊德（Sigmund Freud，1856-1939）出生于奥匈帝国时期的摩拉维亚，"
                    "是精神分析学派的创始人。19世纪末的维也纳正处于科学与文化的重要转型期，"
                    "达尔文的进化论、物理学的新发现都在重塑人们对世界的理解。\n\n"
                    "## 从神经学到心理学\n"
                    "弗洛伊德最初是一名神经学家，他在巴黎跟随夏尔科（Charcot）学习催眠疗法时，"
                    "开始对癔症患者产生浓厚兴趣。他逐渐发现，许多身体症状的背后隐藏着心理因素。\n\n"
                    "## 《梦的解析》的诞生\n"
                    "1900年，弗洛伊德出版了他最重要的著作《梦的解析》（Die Traumdeutung），"
                    "这本书标志着精神分析的正式诞生。他在书中提出：梦不是随机的，而是有意义的心理现象。\n\n"
                    "💭 **思考题**：你认为为什么弗洛伊德将1900年作为《梦的解析》的出版年份？"
                )
            },
            {
                "title": "第二章：意识层次模型",
                "description": "深入理解弗洛伊德的冰山理论——意识、前意识和潜意识。",
                "content": (
                    "# 意识层次模型\n\n"
                    "## 冰山理论\n"
                    "弗洛伊德将人的心理活动比作一座冰山：\n\n"
                    "- **意识**（conscious）：冰山露出水面的部分，我们此刻能意识到的内容\n"
                    "- **前意识**（preconscious）：冰山水面附近的部分，通过努力可以回忆起来\n"
                    "- **潜意识**（unconscious）：冰山的水下主体，包含了被压抑的冲动、欲望和创伤记忆\n\n"
                    "## 潜意识如何影响梦\n"
                    "在睡眠状态下，意识的审查机制放松，被压抑的潜意识内容就有了浮现的机会。"
                    "但这些内容不会直接呈现——它们会经过「梦的工作」进行伪装。\n\n"
                    "💭 **思考题**：回忆一个你最近的梦，尝试找出其中可能隐藏的「水下冰山」。"
                )
            },
            {
                "title": "第三章：梦的工作机制",
                "description": "学习梦如何通过凝缩、移置、象征化等手段伪装潜意识欲望。",
                "content": (
                    "# 梦的工作机制\n\n"
                    "弗洛伊德提出了四种主要的「梦的工作」机制：\n\n"
                    "## 1. 凝缩（Condensation）\n"
                    "将多个潜意识的愿望、人物或事件合并为梦境中的单一元素。例如，梦中一个人可能同时具有你母亲和老师的特征。\n\n"
                    "## 2. 移置（Displacement）\n"
                    "将情感从真正重要的对象转移到无关紧要的对象上。比如，对老板的愤怒在梦中表现为对一只猫发火。\n\n"
                    "## 3. 象征化（Symbolization）\n"
                    "潜意识冲动通过象征符号来表达。长形物体可能象征男性，容器类物体可能象征女性。\n\n"
                    "## 4. 二次润饰（Secondary Revision）\n"
                    "在醒来时，意识会对梦进行逻辑化整理，使得原本荒诞的梦看起来更连贯。\n\n"
                    "💭 **思考题**：在你的梦中，有没有觉得「这个人既像A又像B」的体验？这就是凝缩。"
                )
            },
            {
                "title": "第四章：日常生活中的梦",
                "description": "将弗洛伊德理论应用到日常梦境分析中，学习基础解梦技巧。",
                "content": (
                    "# 日常生活中的梦\n\n"
                    "## 为什么我们记不住梦\n"
                    "弗洛伊德认为，遗忘梦本身就是一种防御机制——梦的内容太具威胁性，所以意识「天亮了就忘了」。"
                    "研究表明，在REM睡眠结束后5分钟内醒来，80%的人能回忆起梦境；10分钟后只有10%。\n\n"
                    "## 日间残余\n"
                    "弗洛伊德发现，梦境中经常出现白天的「残余」——那些被忽略或未处理的事件。"
                    "这些日间经历成为梦的「素材」，但梦的真正动力则来自更深层的潜意识欲望。\n\n"
                    "## 实践技巧\n"
                    "1. 床边放笔记本，醒来即刻记录\n"
                    "2. 先记录情节，再补充情绪感受\n"
                    "3. 不要试图让梦变得合理\n"
                    "4. 关注第一印象和自由联想\n\n"
                    "💭 **实践题**：今晚尝试记录你的梦，明早立即写下所有记得的内容。"
                )
            },
            {
                "title": "第五章：批判与传承",
                "description": "了解弗洛伊德理论的局限性及对后世心理学的影响。",
                "content": (
                    "# 批判与传承\n\n"
                    "## 批评的声音\n"
                    "- **泛性论**：弗洛伊德过于强调性的作用，忽略了文化和社会因素\n"
                    "- **样本偏差**：他的理论主要基于维也纳中产阶级女性患者\n"
                    "- **不可证伪性**：卡尔·波普尔批评精神分析理论缺乏可证伪性\n\n"
                    "## 真正的贡献\n"
                    "尽管受到批评，弗洛伊德的贡献是开创性的：\n"
                    "1. 首次系统性地将梦作为心理学研究对象\n"
                    "2. 提出了潜意识的概念（现代认知科学已确认其存在）\n"
                    "3. 开创了谈话疗法和自由联想技术\n"
                    "4. 深刻影响了文学、艺术、电影等文化领域\n\n"
                    "💭 **思考题**：在AI时代，GPT能「解梦」吗？这与弗洛伊德式解梦有什么根本不同？"
                )
            }
        ]
    },
    {
        "title": "荣格分析心理学与梦",
        "description": "探索荣格对弗洛伊德的超越——集体无意识、原型理论和梦的补偿功能。",
        "category": "jung",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {
                "title": "第一章：荣格与弗洛伊德的分歧",
                "description": "了解弗洛伊德与荣格从师生到决裂的历史。",
                "content": "# 荣格与弗洛伊德的分歧\n\n卡尔·荣格曾是弗洛伊德最得意的学生，被称为精神分析的「皇太子」。但两人在核心理论上产生了根本分歧。\n\n## 核心分歧\n\n荣格不认同弗洛伊德将所有心理动力还原为性本能（力比多）。他认为力比多是一种更广泛的「生命能量」，而性只是其中一部分。\n\n荣格还认为，潜意识不仅仅是个人的，还有一个更深层的「集体无意识」层——这是全人类共有的心理遗产。\n\n💭 **思考题**：荣格的「集体无意识」概念，在网络时代的「模因」现象中是否有所体现？"
            },
            {
                "title": "第二章：集体无意识与原型",
                "description": "理解荣格最核心的概念——原型，以及它们在梦中的表现。",
                "content": "# 集体无意识与原型\n\n集体无意识是人类进化过程中积累的共同心理经验，不依赖于个人经历。它通过「原型」来表现——这些是人类共有的心理模式或形象。\n\n常见的原型包括：\n- **人格面具**：我们展示给社会的「面具」\n- **阴影**：被压抑的黑暗面\n- **阿尼玛/阿尼姆斯**：男性心中的女性形象，女性心中的男性形象\n- **智慧老人**：导师形象\n- **大母神**：养育与吞噬的双重形象\n\n💭 **思考题**：你梦中的「反派」或令人不安的人物，是否可能是你的「阴影」原型？"
            },
            {
                "title": "第三章：梦的补偿理论",
                "description": "荣格认为梦最重要的功能是心理补偿——平衡意识态度。",
                "content": "# 梦的补偿理论\n\n荣格认为，梦的基本功能不是「实现愿望」而是「心理补偿」。\n\n当你的意识态度过于片面时，潜意识会通过梦来补偿。例如：\n- 一个过度理性的人，可能梦见狂野的情感场景\n- 一个过度谨慎的人，可能梦见冒险和自由\n- 一个过度自信的人，可能梦见失败和羞耻\n\n梦在试图让你恢复心理平衡。\n\n💭 **思考题**：你最近的梦是否在补偿你白天过度强调的某种态度？"
            },
        ]
    },
    {
        "title": "现代睡眠科学与梦境研究",
        "description": "从神经科学角度理解睡眠周期、REM机制与梦的认知功能。",
        "category": "modern",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {
                "title": "第一章：睡眠的奥秘",
                "description": "理解睡眠周期、REM与非REM的生理基础。",
                "content": "# 睡眠的奥秘\n\n## 睡眠周期\n\n一个完整的睡眠周期约90分钟，包含：\n- **N1**：浅睡期（入睡阶段，约5-10分钟）\n- **N2**：中度睡眠（约50%，体温下降，心率减缓）\n- **N3**：深度睡眠/慢波睡眠（身体修复，记忆巩固）\n- **REM**：快速眼动睡眠（最生动的梦境发生期）\n\n每个晚上我们经历4-6个这样的周期。\n\n## REM与梦\n\nREM睡眠时，大脑活动几乎与清醒时一样活跃，但身体肌肉完全放松（快速眼动除外）。\n这就是为什么我们在梦中能跑能跳，醒来却全身没动。\n\n💭 **思考题**：为什么清晨醒来时最容易回忆起梦？（提示：考虑睡眠周期的结构）"
            },
            {
                "title": "第二章：激活-合成假说",
                "description": "Hobson和McCarley的经典假说——梦是大脑对随机神经信号的解读。",
                "content": "# 激活-合成假说\n\n1977年，哈佛的Hobson和McCarley提出了激活-合成假说：\n\n1. REM睡眠时，脑干随机产生神经信号（PGO波）\n2. 前脑皮层试图理解这些随机信号\n3. 皮层从记忆库中调取信息来「合成」一个连贯的故事\n\n这意味着梦可能没有深层含义——它只是大脑在脑干随机激活后努力「编故事」的结果。\n\n当然，这一假说也受到了批评。现代研究显示，梦的内容并非完全随机，它的确与我们的情绪状态和日常经历高度相关。\n\n💭 **思考题**：如果你的梦只是大脑对随机信号的「编故事」，你还会觉得梦有意义吗？"
            },
            {
                "title": "第三章：记忆巩固与情绪调节",
                "description": "现代研究发现，梦对记忆巩固和情绪处理有重要功能。",
                "content": "# 记忆巩固与情绪调节\n\n## 记忆的夜间加工\n\n睡眠期间，大脑会将白天的经历从海马体（短期存储）转移到皮层（长期存储）。这个过程被称为「记忆巩固」。\n\n有趣的发现：\n- 学习新技能后睡觉，表现会提高（不需要额外练习）\n- REM睡眠特别有助于程序性记忆（如何做事）\n- N3深度睡眠特别有助于陈述性记忆（事实知识）\n\n## 夜间情绪治疗\n\nMatthew Walker（《我们为什么要睡觉》作者）提出，REM睡眠就像一个「夜间情绪治疗师」：\n- 将痛苦的记忆从情绪中剥离\n- 保留信息的「要点」，去除情绪的「刺痛」\n- 这就是为什么「睡一觉感觉好多了」\n\n💭 **实践题**：当你心情不好时，试试睡一觉。记录睡前和醒后的情绪变化。"
            },
        ]
    },
    {
        "title": "东方解梦文化探秘",
        "description": "从周公解梦到中医情志理论，探索东方文化中独特的梦境智慧。",
        "category": "eastern",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {
                "title": "第一章：周公解梦的智慧",
                "description": "中国传统中最著名的梦境解读文献及其思维方式。",
                "content": "# 周公解梦的智慧\n\n《周公解梦》是中国最著名的梦书，相传为周公旦所作。它采用「象征对应」的方式，为各种梦境元素提供解释。\n\n中国文化中的常见梦象：\n- **梦见水**：水象征财富，流水预示着财运的流动\n- **梦见鱼**：「鱼」与「余」同音，象征富足有余\n- **梦见掉牙**：传统上象征亲人健康问题\n- **梦见蛇**：有多重含义，可能象征智慧，也可能象征小人\n\n东方解梦的特点是注重象征的固定对应关系，以及梦的预兆功能。\n\n💭 **思考题**：中西方解梦的根本差异是什么？一个是象征对应，一个是心理分析。你更倾向于哪种？"
            },
            {
                "title": "第二章：中医情志与梦",
                "description": "中医的五行理论与梦境之间的关联。",
                "content": "# 中医情志与梦\n\n中医认为梦与五脏六腑的状态密切相关。《黄帝内经》中就有大量关于梦的论述。\n\n## 五脏与梦\n\n- **心**（火）：心气盛则梦笑，心气虚则梦烟火\n- **肝**（木）：肝气盛则梦怒，肝气虚则梦草木\n- **脾**（土）：脾气盛则梦歌乐，脾气虚则梦饮食不足\n- **肺**（金）：肺气盛则梦哭，肺气虚则梦白物\n- **肾**（水）：肾气盛则梦恐惧，肾气虚则梦溺水\n\n## 情志理论\n\n七情（喜、怒、忧、思、悲、恐、惊）过度会影响五脏功能，进而反映在梦境中。\n\n💭 **思考题**：你梦中的情绪强度是否反映了白天的某种情志失衡？"
            },
            {
                "title": "第三章：庄子梦蝶与东方哲学",
                "description": "从哲学层面解读梦——儒释道对梦的不同理解。",
                "content": "# 庄子梦蝶与东方哲学\n\n## 庄周梦蝶\n\n「昔者庄周梦为蝴蝶，栩栩然蝴蝶也。俄然觉，则蘧蘧然周也。不知周之梦为蝴蝶与？蝴蝶之梦为周与？」\n\n庄子的这一问，挑战了我们对现实与梦境的根本区分。我们如何确定此刻不是在做梦？\n\n## 佛教视角\n\n佛教认为，不仅梦是虚幻的，我们所谓的「现实」也如梦幻泡影。\n《金刚经》云：「一切有为法，如梦幻泡影，如露亦如电，应作如是观。」\n\n## 现代回响\n\n有趣的是，庄子和佛教的洞见与当代的「模拟假说」有惊人的相似之处。\n\n💭 **最终思考**：如果「人生如梦」，那么我们解读梦境的意义又是什么？"
            },
        ]
    },
]


async def seed(echo=True):
    """Seed database with initial data."""
    from backend.models import User
    
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    if echo:
        print("✅ Tables created")
    
    async with async_session() as session:
        # Check if already seeded
        from sqlalchemy import select
        result = await session.execute(select(User).where(User.username == "dreamer"))
        existing = result.scalar_one_or_none()
        
        if existing:
            if echo:
                print("⚠️  Database already seeded. Skipping.")
            return
        
        # Create default user
        user = User(username="dreamer", email="dreamer@dreamlab.com")
        session.add(user)
        await session.flush()
        if echo:
            print(f"✅ Created user: dreamer (id={user.id})")
        
        # Create courses
        from backend.models import Course
        for course_data in COURSES:
            course = Course(
                title=course_data["title"],
                description=course_data["description"],
                category=course_data["category"],
                difficulty=course_data["difficulty"],
                image_url=course_data.get("image_url", ""),
                content=course_data["content"],
            )
            session.add(course)
        await session.commit()
        if echo:
            print(f"✅ Created {len(COURSES)} courses")
        
        if echo:
            print("\n🎉 Seed complete! Courses ready:\n")
            for c in COURSES:
                chapters = len(c["content"])
                print(f"  📚 {c['title']} ({c['difficulty']}) - {chapters} chapters")


if __name__ == "__main__":
    asyncio.run(seed())
