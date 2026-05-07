"""
Seed database with 30 courses, assessments, and a default user.
Run: python -m backend.seed
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.database import engine, async_session
from backend.models import Base

COURSES = [
    # ═══════════ 梦学基石 (4门) ═══════════
    {
        "title": "弗洛伊德：梦的解析入门",
        "description": "从弗洛伊德经典理论出发，理解潜意识、欲望压抑与梦境形成的核心机制。适合零基础入门。",
        "category": "freud",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：弗洛伊德与精神分析的诞生", "description": "了解弗洛伊德的生平、时代背景以及精神分析理论的起源。",
             "content": "# 弗洛伊德与精神分析的诞生\n\n## 时代背景\n西格蒙德·弗洛伊德（Sigmund Freud，1856-1939）出生于奥匈帝国时期的摩拉维亚，是精神分析学派的创始人。19世纪末的维也纳正处于科学与文化的重要转型期。\n\n## 从神经学到心理学\n弗洛伊德最初是一名神经学家，在巴黎跟随夏尔科学习催眠疗法时，开始对癔症患者产生浓厚兴趣。他逐渐发现，许多身体症状的背后隐藏着心理因素。\n\n## 《梦的解析》的诞生\n1900年，弗洛伊德出版了他最重要的著作《梦的解析》，标志着精神分析的正式诞生。他提出：梦不是随机的，而是有意义的心理现象。\n\n💭 **思考题**：你认为为什么弗洛伊德将1900年作为《梦的解析》的出版年份？"},
            {"title": "第二章：意识层次模型", "description": "深入理解弗洛伊德的冰山理论——意识、前意识和潜意识。",
             "content": "# 意识层次模型\n\n## 冰山理论\n弗洛伊德将人的心理活动比作一座冰山：\n- **意识**：冰山露出水面的部分\n- **前意识**：通过努力可以回忆起来\n- **潜意识**：冰山的水下主体，包含被压抑的冲动、欲望和创伤记忆\n\n## 潜意识如何影响梦\n在睡眠状态下，意识的审查机制放松，被压抑的潜意识内容就有了浮现的机会。但这些内容会经过「梦的工作」进行伪装。\n\n💭 **思考题**：回忆一个你最近的梦，尝试找出其中可能隐藏的「水下冰山」。"},
            {"title": "第三章：梦的工作机制", "description": "学习梦如何通过凝缩、移置、象征化等手段伪装潜意识欲望。",
             "content": "# 梦的工作机制\n\n弗洛伊德提出了四种主要的「梦的工作」机制：\n\n## 1. 凝缩（Condensation）\n将多个潜意识的愿望、人物或事件合并为梦境中的单一元素。\n\n## 2. 移置（Displacement）\n将情感从真正重要的对象转移到无关紧要的对象上。\n\n## 3. 象征化（Symbolization）\n潜意识冲动通过象征符号来表达。\n\n## 4. 二次润饰（Secondary Revision）\n醒来时，意识会对梦进行逻辑化整理。\n\n💭 **思考题**：在你的梦中，有没有觉得「这个人既像A又像B」的体验？这就是凝缩。"},
            {"title": "第四章：日常生活中的梦", "description": "将弗洛伊德理论应用到日常梦境分析中。",
             "content": "# 日常生活中的梦\n\n## 为什么我们记不住梦\n弗洛伊德认为，遗忘梦本身就是一种防御机制。研究表明，在REM睡眠结束后5分钟内醒来，80%的人能回忆起梦境；10分钟后只有10%。\n\n## 日间残余\n梦境中经常出现白天的「残余」——那些被忽略或未处理的事件。\n\n💭 **实践题**：今晚尝试记录你的梦，明早立即写下所有记得的内容。"},
        ]
    },
    {
        "title": "荣格分析心理学与梦",
        "description": "探索荣格对弗洛伊德的超越——集体无意识、原型理论和梦的补偿功能。",
        "category": "jung",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {"title": "第一章：荣格与弗洛伊德的分歧", "description": "了解弗洛伊德与荣格从师生到决裂的历史。",
             "content": "# 荣格与弗洛伊德的分歧\n\n卡尔·荣格曾是弗洛伊德最得意的学生，被称为精神分析的「皇太子」。但两人在核心理论上产生了根本分歧。\n\n## 核心分歧\n荣格不认同弗洛伊德将所有心理动力还原为性本能。他认为力比多是一种更广泛的「生命能量」。荣格还认为，潜意识不仅仅是个人的，还有一个更深层的「集体无意识」层。\n\n💭 **思考题**：荣格的「集体无意识」概念，在网络时代的「模因」现象中是否有所体现？"},
            {"title": "第二章：集体无意识与原型", "description": "理解荣格最核心的概念——原型。",
             "content": "# 集体无意识与原型\n\n集体无意识是人类进化过程中积累的共同心理经验。它通过「原型」来表现。\n\n常见的原型包括：\n- **人格面具**：我们展示给社会的「面具」\n- **阴影**：被压抑的黑暗面\n- **阿尼玛/阿尼姆斯**：内心中的异性形象\n- **智慧老人**：导师形象\n\n💭 **思考题**：你梦中的「反派」是否可能是你的「阴影」原型？"},
            {"title": "第三章：梦的补偿理论", "description": "荣格认为梦最重要的功能是心理补偿。",
             "content": "# 梦的补偿理论\n\n荣格认为，梦的基本功能不是「实现愿望」而是「心理补偿」。\n\n当你的意识态度过于片面时，潜意识会通过梦来补偿。例如：\n- 一个过度理性的人，可能梦见狂野的情感场景\n- 一个过度谨慎的人，可能梦见冒险和自由\n\n💭 **思考题**：你最近的梦是否在补偿你白天过度强调的某种态度？"},
        ]
    },
    {
        "title": "现代睡眠科学与梦境研究",
        "description": "从神经科学角度理解睡眠周期、REM机制与梦的认知功能。",
        "category": "modern",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {"title": "第一章：睡眠的奥秘", "description": "理解睡眠周期、REM与非REM的生理基础。",
             "content": "# 睡眠的奥秘\n\n一个完整的睡眠周期约90分钟，包含：\n- **N1**：浅睡期（约5-10分钟）\n- **N2**：中度睡眠（约50%）\n- **N3**：深度睡眠（身体修复，记忆巩固）\n- **REM**：快速眼动睡眠（最生动的梦境发生期）\n\n💭 **思考题**：为什么清晨醒来时最容易回忆起梦？"},
            {"title": "第二章：激活-合成假说", "description": "Hobson和McCarley的经典假说。",
             "content": "# 激活-合成假说\n\n1977年，哈佛的Hobson和McCarley提出了激活-合成假说：\n1. REM睡眠时，脑干随机产生神经信号（PGO波）\n2. 前脑皮层试图理解这些随机信号\n3. 皮层从记忆库中调取信息来「合成」一个连贯的故事\n\n💭 **思考题**：如果你的梦只是大脑对随机信号的「编故事」，你还会觉得梦有意义吗？"},
            {"title": "第三章：记忆巩固与情绪调节", "description": "现代研究发现，梦对记忆巩固和情绪处理有重要功能。",
             "content": "# 记忆巩固与情绪调节\n\n## 记忆的夜间加工\n睡眠期间，大脑会将白天的经历从海马体转移到皮层。这个过程被称为「记忆巩固」。\n\n## 夜间情绪治疗\nMatthew Walker提出，REM睡眠就像一个「夜间情绪治疗师」：将痛苦的记忆从情绪中剥离，保留信息的「要点」，去除情绪的「刺痛」。\n\n💭 **实践题**：当你心情不好时，试试睡一觉。记录睡前和醒后的情绪变化。"},
        ]
    },
    {
        "title": "东方解梦文化探秘",
        "description": "从周公解梦到中医情志理论，探索东方文化中独特的梦境智慧。",
        "category": "eastern",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：周公解梦的智慧", "description": "中国传统中最著名的梦境解读文献。",
             "content": "# 周公解梦的智慧\n\n《周公解梦》是中国最著名的梦书，相传为周公旦所作。它采用「象征对应」的方式为各种梦境元素提供解释。\n\n💭 **思考题**：中西方解梦的根本差异是什么？一个是象征对应，一个是心理分析。"},
            {"title": "第二章：中医情志与梦", "description": "中医的五行理论与梦境之间的关联。",
             "content": "# 中医情志与梦\n\n中医认为梦与五脏六腑的状态密切相关。七情过度会影响五脏功能，进而反映在梦境中。\n\n💭 **思考题**：你梦中的情绪强度是否反映了白天的某种情志失衡？"},
            {"title": "第三章：庄子梦蝶与东方哲学", "description": "儒释道对梦的不同理解。",
             "content": "# 庄子梦蝶与东方哲学\n\n「不知周之梦为蝴蝶与？蝴蝶之梦为周与？」庄子的这一问，挑战了我们对现实与梦境的根本区分。\n\n💭 **最终思考**：如果「人生如梦」，那么我们解读梦境的意义又是什么？"},
        ]
    },

    # ═══════════ 系统理论 (8门) ═══════════
    {
        "title": "康波周期与人类意识演化",
        "description": "50-60年长波周期如何塑造集体意识？从工业革命到AI时代，技术浪潮与人类心理的共振。",
        "category": "economics",
        "difficulty": "advanced",
        "image_url": "",
        "content": [
            {"title": "第一章：什么是康波周期", "description": "康德拉季耶夫长波理论的基本框架。",
             "content": "# 什么是康波周期\n\n康波周期是由苏联经济学家康德拉季耶夫在1920年代提出的长波理论。每个周期约50-60年，包括上升期和下降期。历史上已经历五次康波，现在正处于第六次康波的上升期——AI、清洁能源、生物技术的时代。\n\n💭 **思考题**：你出生在哪个康波阶段？这如何影响了你这一代人的心理特征？"},
            {"title": "第二章：集体意识的浪潮", "description": "经济周期如何影响人类的集体心理。",
             "content": "# 集体意识的浪潮\n\n在康波的繁荣期，乐观主义盛行；在衰退期，保守主义抬头。社会心理学家发现，一代人的核心价值观很大程度上是由他们成长期的经济环境塑造的。\n\n💭 **思考题**：2008金融危机后，你观察到身边人的价值观发生了怎样的变化？"},
        ]
    },
    {
        "title": "人格心理学：认识你自己",
        "description": "从大五模型到MBTI，从特质论到叙事认同。系统理解人格理论的各大流派与自我认知工具。",
        "category": "personality",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：大五人格（OCEAN）", "description": "科学界最认可的人格模型。",
             "content": "# 大五人格（OCEAN）\n\n大五人格模型是经过几十年跨文化研究反复验证的人格理论：\n- O - 开放性（Openness）\n- C - 尽责性（Conscientiousness）\n- E - 外向性（Extraversion）\n- A - 宜人性（Agreeableness）\n- N - 神经质（Neuroticism）\n\n💭 **思考题**：你在哪个维度上得分最高？最低？这如何影响了你的生活选择？"},
            {"title": "第二章：MBTI与流行心理学", "description": "MBTI为什么流行但科学界不认可？",
             "content": "# MBTI与流行心理学\n\nMBTI每年在全球被数百万人使用，但在学术界几乎没有受到认可。问题是：类型vs维度、信度问题、缺乏预测效度。但它为什么这么流行？因为它给了人们一个「身份标签」——一个归属感和自我理解的叙事。\n\n💭 **思考题**：人格可以改变吗？如果可以，你最想改变哪个方面？"},
        ]
    },
    {
        "title": "进化心理学：心灵的远古根源",
        "description": "从达尔文到现代进化心理学。理解人类心理机制如何被百万年的自然选择和性选择所塑造。",
        "category": "evolutionary",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {"title": "第一章：进化论与心理学", "description": "达尔文革命如何重塑对心灵的理解。",
             "content": "# 进化论与心理学\n\n进化心理学认为，人类的心智不是一张白纸，而是一个由自然选择和性选择雕刻的工具箱。每种心理机制——从恐惧到嫉妒到爱——都曾经帮助我们的祖先在特定环境中生存和繁衍。\n\n💭 **思考题**：为什么我们害怕蛇和蜘蛛，却不怕汽车和插座？进化心理学如何解释？"},
            {"title": "第二章：择偶心理的进化逻辑", "description": "男性和女性择偶偏好的进化根源。",
             "content": "# 择偶心理的进化逻辑\n\nDavid Buss的跨文化研究发现，男性普遍偏好年轻和外表吸引力（生育力指标），女性普遍偏好资源和地位（抚养能力指标）。这不是性别歧视，而是进化塑造的普遍心理倾向。\n\n💭 **思考题**：在今天的城市环境中，这些择偶偏好还有适应性吗？"},
        ]
    },
    {
        "title": "发展心理学：一生的成长旅程",
        "description": "从婴儿到老年，人类心理发展的完整旅程。皮亚杰、维果茨基、埃里克森的发展阶段理论。",
        "category": "developmental",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：皮亚杰的认知发展理论", "description": "儿童如何一步步学会思考。",
             "content": "# 皮亚杰的认知发展理论\n\n让·皮亚杰通过观察自己的孩子，提出了认知发展四阶段：感知运动期（0-2岁）、前运算期（2-7岁）、具体运算期（7-11岁）、形式运算期（11岁+）。\n\n💭 **思考题**：回忆你的童年，你能对应上哪个阶段的特征？"},
            {"title": "第二章：埃里克森的心理社会阶段", "description": "一生的八个发展阶段。",
             "content": "# 埃里克森的心理社会阶段\n\n埃里克森提出人一生经历八个心理社会阶段，每个阶段都有一个核心冲突需要解决：信任vs不信任（0-1岁）、自主vs羞耻（1-3岁）、主动vs内疚（3-6岁）……直到老年期的自我整合vs绝望。\n\n💭 **思考题**：你当前处于哪个心理社会阶段？你在这个阶段的核心挑战是什么？"},
        ]
    },
    {
        "title": "社会心理学：情境的力量",
        "description": "从众、服从、归因、刻板印象。理解社会情境如何塑造个体行为——有时比性格更强大。",
        "category": "social",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {"title": "第一章：从众与服从", "description": "Asch实验和Milgram实验的震撼发现。",
             "content": "# 从众与服从\n\nSolomon Asch的线段判断实验发现，即使答案明显错误，37%的参与者也会从众。Stanley Milgram的电击实验更令人震惊——65%的普通人愿意服从权威，对他人施加他们认为致命的电击。\n\n💭 **思考题**：在日常生活中，你什么时候发现自己「从众」了？这是好还是坏？"},
            {"title": "第二章：归因偏差", "description": "我们如何解释他人和自己的行为。",
             "content": "# 归因偏差\n\n基本归因错误：我们倾向于将他人的行为归因于性格，将自己的行为归因于情境。自利偏差：成功归因于自己，失败归因于外部。这些偏差每天都在影响我们的判断。\n\n💭 **思考题**：回想一次你批评他人的经历，你真的了解他们当时的情境吗？"},
        ]
    },
    {
        "title": "行为主义心理学：从条件反射到行为改变",
        "description": "巴甫洛夫的狗、斯金纳的鸽子、华生的小艾伯特。经典条件反射和操作性条件反射如何解释和改变行为。",
        "category": "behaviorism",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：经典条件反射", "description": "巴甫洛夫的狗和学习的底层机制。",
             "content": "# 经典条件反射\n\n巴甫洛夫发现，狗不仅在看到食物时分泌唾液，在听到实验助手的脚步声时也会分泌唾液。这个发现揭示了学习的基本机制——两个刺激之间的联结。华生后来将这一原理应用于人类情绪（小艾伯特实验）。\n\n💭 **思考题**：你有什么「条件反射」式的情绪反应？比如听到某个声音、闻到某种气味就会引发某种情绪？"},
            {"title": "第二章：操作性条件反射", "description": "斯金纳的强化理论。",
             "content": "# 操作性条件反射\n\n斯金纳发现，行为的结果决定了它是否会重复。正强化增加行为频率，惩罚减少行为频率。他发明了「斯金纳箱」来精确研究这些原理。这些发现被广泛应用于教育、管理和行为治疗。\n\n💭 **思考题**：你最近养成的习惯，背后有没有操作性条件反射的影子？"},
        ]
    },
    {
        "title": "格式塔心理学：整体大于部分之和",
        "description": "知觉组织的科学——我们如何将碎片整合为整体？从视觉错觉到问题解决的顿悟。",
        "category": "gestalt",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {"title": "第一章：格式塔的诞生与知觉原则", "description": "整体大于部分之和的革命性发现。",
             "content": "# 格式塔的诞生与知觉原则\n\n格式塔心理学的核心洞察：我们不是先看到特征再组合成物体——我们直接感知到整体。格式塔原则包括：接近性、相似性、连续性、闭合性、共同命运。这些原则揭示了大脑组织感觉信息的基本规律。\n\n💭 **思考题**：为什么你可以在不完整的圆中「看到」完整的圆？这就是闭合原则。"},
            {"title": "第二章：顿悟与问题解决", "description": "Köhler的黑猩猩实验。",
             "content": "# 顿悟与问题解决\n\nWolfgang Köhler研究黑猩猩解决问题时发现了一种特殊的学习——「顿悟」。黑猩猩不是在试错，而是在「突然看懂了」问题结构。这种理解性的学习与行为主义的机械学习形成鲜明对比。\n\n💭 **思考题**：你是否有过「顿悟」的经历？某个问题突然就「通了」？"},
        ]
    },
    {
        "title": "存在主义心理学：自由、意义与死亡",
        "description": "弗兰克尔、罗洛·梅、欧文·亚隆。面对生命的基本焦虑——死亡、自由、孤独、无意义——如何活出真实的人生？",
        "category": "existential",
        "difficulty": "advanced",
        "image_url": "",
        "content": [
            {"title": "第一章：弗兰克尔与意义治疗", "description": "集中营中的意义发现。",
             "content": "# 弗兰克尔与意义治疗\n\n维克多·弗兰克尔在纳粹集中营中观察到：那些能找到意义的人更可能活下来。他的《活出生命的意义》提出了核心洞见：人生的主要动力不是追求快乐（弗洛伊德）或追求权力（阿德勒），而是追求意义。\n\n💭 **思考题**：如果你知道自己的生命还剩一年，你会做什么不同的事？"},
            {"title": "第二章：亚隆的四大终极关怀", "description": "死亡、自由、孤独、无意义。",
             "content": "# 亚隆的四大终极关怀\n\n欧文·亚隆提出人类面临四个不可逃避的存在问题：死亡（我们终将死去）、自由（我们必须为自己的人生负责）、孤独（我们最终是独自存在的）、无意义（宇宙没有给我们预设的意义）。\n\n💭 **思考题**：这四个问题中，哪个最让你感到不安？为什么？"},
        ]
    },

    # ═══════════ 临床与应用 (8门) ═══════════
    {
        "title": "认知行为疗法：重塑思维模式",
        "description": "全世界研究最多的心理疗法。识别认知扭曲、挑战自动思维、重塑核心信念。终身受用的心理工具。",
        "category": "cbt",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {"title": "第一章：CBT的核心洞见", "description": "想法决定感受——ABC模型。",
             "content": "# CBT的核心洞见\n\n认知行为疗法的ABC模型：A（事件）→B（信念）→C（情绪和行为后果）。同样的A，不同的B，完全不同的C。CBT的目标是改变B——你对事件的解读方式。\n\n💭 **思考题**：回忆最近一次情绪波动。当时的触发事件（A）和你的解读（B）分别是什么？"},
            {"title": "第二章：认知扭曲", "description": "思维的常见「bug」。",
             "content": "# 认知扭曲\n\n常见的认知扭曲：全有或全无思维、灾难化、心理过滤、读心术、情绪推理、\"应该\"陈述。识别这些扭曲是改变的第一步。\n\n💭 **思考题**：你最常用哪种认知扭曲？给自己三天时间观察你的自动思维。"},
            {"title": "第三章：思维记录技术", "description": "核心技术工具。",
             "content": "# 思维记录技术\n\n思维记录是CBT最核心的实操工具：情境→情绪→自动思维→支持的证据→反对的证据→平衡的思维→重新评估情绪。这不是「假装积极」——而是训练大脑更准确地评估现实。\n\n💭 **实践题**：今晚找一个让你困扰的情境，填写一份思维记录。"},
        ]
    },
    {
        "title": "积极心理学：幸福科学入门",
        "description": "不研究疾病，而是研究幸福。PERMA模型、心流体验、感恩实践、韧性培养——用科学方法构建丰盈人生。",
        "category": "positive",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：PERMA模型", "description": "幸福的五个科学支柱。",
             "content": "# PERMA模型\n\n塞利格曼的PERMA模型：P-积极情绪、E-投入（心流）、R-关系、M-意义、A-成就。真正的幸福来自五个维度的平衡。\n\n💭 **思考题**：在你的生活中，PERMA五个维度哪个最强？哪个最需要加强？"},
            {"title": "第二章：感恩的科学", "description": "最小付出，最大收益。",
             "content": "# 感恩的科学\n\n研究表明，每周写下3-5件你感恩的事情，持续6周，可以显著提升幸福感、减少抑郁症状。效果可持续6个月以上。感恩激活了大脑的奖励回路，释放多巴胺和血清素。\n\n💭 **实践题**：今晚写下3件你今天感恩的事，无论多小。"},
            {"title": "第三章：心流体验", "description": "最优体验的心理学。",
             "content": "# 心流体验\n\n心流是指完全沉浸在一件事中，忘记时间、自我和外部世界。契克森米哈伊发现，心流体验的质量是人类最高的主观体验之一。条件是：挑战与技能之间的平衡。\n\n💭 **实践题**：什么活动让你最容易进入心流？这周多安排一些这样的活动。"},
        ]
    },
    {
        "title": "正念冥想：觉知的艺术",
        "description": "从东方禅修到fMRI验证的大脑训练术。MBSR八周课程改变前额叶-杏仁核连接。",
        "category": "mindfulness",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：什么是正念", "description": "不只是放松——是觉知的训练。",
             "content": "# 什么是正念\n\nJon Kabat-Zinn的定义：正念是「有目的地、在当下、不加评判地注意」。它不是宗教，是一种可训练的心理能力。MRI研究发现，8周正念训练就能改变大脑结构。\n\n💭 **实践题**：现在，花2分钟专注于你的呼吸。感受空气进入和离开鼻腔的感觉。"},
            {"title": "第二章：呼吸与身体扫描", "description": "两个基础练习。",
             "content": "# 呼吸与身体扫描\n\n呼吸是正念中最常用的「锚」——它是自动的但也可被控制，总是在当下发生，随情绪变化而变化。身体扫描是从头到脚将注意力扫过身体每个部位。\n\n💭 **实践题**：今晚睡前做一次5分钟的身体扫描。从脚趾开始，慢慢向上。"},
            {"title": "第三章：不评判的态度", "description": "最难的、最重要的一课。",
             "content": "# 不评判的态度\n\n正念的核心态度：观察你的体验，不加评判。当负面情绪出现时，与其说「我不应该感到焦虑」，不如说「我现在感到焦虑，让我好奇地看着这种感觉」。不是对抗，而是共处。\n\n💭 **思考题**：你对自己最常做出的评判是什么？试着换一种观察的态度。"},
        ]
    },
    {
        "title": "依恋理论：亲密关系中的自我",
        "description": "童年依恋模式如何影响一生的亲密关系？安全型、焦虑型、回避型——认识你的依恋风格。",
        "category": "attachment",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {"title": "第一章：陌生情境实验", "description": "Ainsworth的经典实验与四种依恋类型。",
             "content": "# 陌生情境实验\n\nMary Ainsworth设计了「陌生情境实验」来评估婴幼儿的依恋模式。她发现了四种依恋类型：安全型（约60%）、焦虑型（约20%）、回避型（约15%）、混乱型（约5%）。\n\n💭 **思考题**：回顾你的童年，你与主要照料者的关系最接近哪种依恋类型？"},
            {"title": "第二章：成人依恋", "description": "依恋如何影响成年亲密关系。",
             "content": "# 成人依恋\n\nHazan和Shaver将依恋理论扩展到成人浪漫关系：焦虑型的人容易「过度激活」依恋系统——不断寻求确认；回避型的人倾向于「去激活」——贬低亲密关系的重要性；安全型的人能在亲密和自主之间找到平衡。\n\n💭 **思考题**：在你的亲密关系中，你倾向于表现出哪种依恋模式？"},
        ]
    },
    {
        "title": "人本主义心理学：成为一个人的旅程",
        "description": "马斯洛的需求金字塔、罗杰斯的无条件积极关注。心理学不只是修复缺陷，更是释放潜能。",
        "category": "humanistic",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：马斯洛的需求层次", "description": "从生存到自我实现。",
             "content": "# 马斯洛的需求层次\n\n马斯洛提出人类需求分为五个层次：生理需求→安全需求→爱与归属→尊重→自我实现。只有低级需求满足后，高级需求才会成为动机。后来他又补充了「自我超越」作为最高层次。\n\n💭 **思考题**：你目前主要被哪个层次的需求驱动？"},
            {"title": "第二章：罗杰斯的来访者中心疗法", "description": "无条件积极关注的力量。",
             "content": "# 罗杰斯的来访者中心疗法\n\n卡尔·罗杰斯认为，每个人都有自我实现的潜能。治疗师的工作不是「诊断」或「指导」，而是提供三个核心条件：无条件积极关注、共情理解、真诚一致。\n\n💭 **思考题**：在你的生活中，有一个人让你感到「被无条件地接纳」吗？那种感觉是什么样的？"},
        ]
    },
    {
        "title": "异常心理学：理解心理障碍",
        "description": "DSM-5诊断框架、心境障碍、焦虑障碍、精神分裂症谱系。减少偏见，科学理解心理疾病。",
        "category": "abnormal",
        "difficulty": "advanced",
        "image_url": "",
        "content": [
            {"title": "第一章：DSM-5诊断框架", "description": "心理健康诊断的标准体系。",
             "content": "# DSM-5诊断框架\n\nDSM-5（精神障碍诊断与统计手册第五版）是心理健康领域最权威的诊断工具。它提供了每种心理障碍的诊断标准、鉴别诊断和共病信息。但它的分类体系也受到批评——心理疾病真的是清晰的「类别」还是连续的「维度」？\n\n💭 **思考题**：将心理疾病分类的优点和风险分别是什么？"},
            {"title": "第二章：心境障碍与焦虑障碍", "description": "抑郁症、双相障碍、焦虑障碍的临床表现。",
             "content": "# 心境障碍与焦虑障碍\n\n抑郁症是全球致残的首要原因，核心症状包括持续的情绪低落、兴趣丧失、精力减退。双相障碍则在抑郁和躁狂之间波动。焦虑障碍是最常见的心理障碍，包括广泛性焦虑、恐慌障碍、社交焦虑等。\n\n💭 **思考题**：如何区分「正常的悲伤」和「抑郁症」？这个问题对诊断和治疗至关重要。"},
            {"title": "第三章：去污名化", "description": "心理疾病的社会认知。",
             "content": "# 去污名化\n\n心理疾病的最大障碍往往不是症状本身，而是社会的偏见和歧视。很多人因为害怕被贴上「精神病」的标签而不敢求助。实际上，心理健康是一个连续的谱系——我们每个人都在某个点上。\n\n💭 **思考题**：你对心理疾病有过偏见吗？这些偏见来自哪里？"},
        ]
    },
    {
        "title": "创伤与修复心理学",
        "description": "PTSD、童年创伤、代际创伤。创伤如何改变大脑和身体？科学证明的修复路径。",
        "category": "trauma",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {"title": "第一章：创伤的神经生物学", "description": "「身体从未忘记」。",
             "content": "# 创伤的神经生物学\n\nBessel van der Kolk的研究揭示：创伤不仅存在于记忆中，还被编码在身体和神经系统里。创伤幸存者的杏仁核持续高度激活，前额叶功能下降，导致过度警觉和情绪失调。\n\n💭 **思考题**：你有没有经历过某种「触发」——一个声音、气味或场景突然引发强烈的情绪反应？"},
            {"title": "第二章：创伤治疗的循证方法", "description": "EMDR、体感疗法、叙事暴露疗法。",
             "content": "# 创伤治疗的循证方法\n\n创伤治疗的核心原则：创伤必须在安全的环境中重新加工，而不是被回避。有效的治疗方法包括：EMDR（眼动脱敏与再加工）、体感疗法（Somatic Experiencing）、叙事暴露疗法（NET）、TF-CBT等。\n\n💭 **思考题**：为什么「说出来」对创伤修复如此重要？"},
            {"title": "第三章：创伤后成长", "description": "创伤的另一面——成长的可能。",
             "content": "# 创伤后成长\n\n创伤后成长是指人们在经历重大逆境后报告的正向心理变化：更深的人际关系、更强的个人力量、更高的生命意义感、新的可能性感。这不是美化苦难——而是承认人类惊人的成长能力。\n\n💭 **思考题**：你在困难经历中学到了什么？如果可以选择，你会消除那段经历吗？"},
        ]
    },
    {
        "title": "健康心理学：身心连接的科学",
        "description": "心理神经免疫学、应激-疾病连接、行为改变模型。你的信念和情绪如何影响身体健康？",
        "category": "health",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：心理神经免疫学", "description": "信念如何改变身体。",
             "content": "# 心理神经免疫学\n\n心理神经免疫学揭示了心理状态如何通过神经内分泌系统影响免疫功能。长期压力增加皮质醇水平、抑制免疫反应、增加炎症标记物。乐观和积极情绪则与更好的免疫功能相关。\n\n💭 **思考题**：你是否注意到压力大的时候更容易生病？这背后有明确的生物学机制。"},
            {"title": "第二章：行为改变的心理学", "description": "为什么改变这么难？怎么才能做到？",
             "content": "# 行为改变的心理学\n\nProchaska的行为改变阶段模型：前意向期→意向期→准备期→行动期→维持期。每改变一个健康行为（运动、饮食、戒烟），你都在经历这些阶段。关键不是「意志力」，而是理解自己在哪个阶段。\n\n💭 **实践题**：选一个你想改变的健康行为。你现在处于哪个阶段？下一步是什么？"},
        ]
    },

    # ═══════════ 神经科学与专项 (10门) ═══════════
    {
        "title": "神经心理学：大脑如何创造心灵",
        "description": "前额叶与人格、海马体与记忆、杏仁核与情绪。从Phineas Gage到fMRI，探索心灵的物质基础。",
        "category": "neuropsychology",
        "difficulty": "advanced",
        "image_url": "",
        "content": [
            {"title": "第一章：Phineas Gage与额叶功能", "description": "神经心理学的起点。",
             "content": "# Phineas Gage与额叶功能\n\n1848年，铁路工头Phineas Gage被铁棍穿过前额叶后奇迹生还——但他的性格完全变了。这个案例首次揭示：大脑前额叶与人格、决策和社会行为密切相关。从此开启了神经心理学的探索。\n\n💭 **思考题**：如果大脑的一个区域受损会改变人格，那么「自我」到底是什么？"},
            {"title": "第二章：记忆、情绪与大脑", "description": "海马体和杏仁核的功能。",
             "content": "# 记忆、情绪与大脑\n\n海马体是将短期记忆转化为长期记忆的关键结构。病人H.M.切除海马体后再也不能形成新记忆。杏仁核是情绪——特别是恐惧——的处理中心。这两者共同工作，给你的记忆染上情绪的色彩。\n\n💭 **思考题**：为什么带有强烈情绪的记忆记得更牢？海马体和杏仁核的相互作用给出了答案。"},
            {"title": "第三章：神经可塑性", "description": "大脑终生都在改变。",
             "content": "# 神经可塑性\n\n神经可塑性是指大脑在经验中改变自身结构和功能的能力。伦敦出租车司机的海马体比常人大——因为导航经验重塑了大脑。正念冥想着的前额叶更厚，杏仁核更小。你的大脑在你每一天的每一个选择中都在变化。\n\n💭 **思考题**：你想通过什么样的日常练习来重塑你的大脑？"},
        ]
    },
    {
        "title": "情绪心理学：喜怒哀乐的科学",
        "description": "Ekman的六种基本情绪、情绪建构理论、情绪调节策略。情绪不是理性的敌人——它是决策和社交的核心。",
        "category": "emotion",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：基本情绪理论", "description": "Ekman的六种基本情绪。",
             "content": "# 基本情绪理论\n\nPaul Ekman通过跨文化研究发现六种人类普遍的基本情绪：快乐、悲伤、愤怒、恐惧、厌恶、惊讶。这些情绪有普遍的面部表情——巴布亚新几内亚孤立部落的人也能准确识别美国人的表情。\n\n💭 **思考题**：这六种基本情绪中，哪一种是你在生活中最常体验的？最不愿体验的？"},
            {"title": "第二章：情绪调节", "description": "如何与情绪相处。",
             "content": "# 情绪调节\n\nJames Gross提出情绪调节的过程模型：情境选择→情境修正→注意分配→认知改变→反应调节。关键在于：早期干预比晚期干预更有效。不要等到情绪爆发才想控制它。\n\n💭 **实践题**：下次你感到强烈情绪时，练习「命名它」——只是说「这是愤怒」或「这是焦虑」。命名情绪本身就有调节作用。"},
        ]
    },
    {
        "title": "教育心理学：如何有效学习",
        "description": "间隔效应、测试效应、成长型思维。从认知科学中提炼出真正有效的学习方法，告别低效努力。",
        "category": "educational",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：学习科学的四大发现", "description": "间隔重复、测试效应、交错练习、精细加工。",
             "content": "# 学习科学的四大发现\n\n认知科学揭示了真正有效的学习方法：间隔重复（分散学习比集中学习效果好）、测试效应（提取练习比重复阅读效果好）、交错练习（混合练习比专项练习效果好）、精细加工（理解比记忆效果好）。\n\n💭 **实践题**：你现在的学习方式中，有没有用到这些原则？如果没有，从哪一个开始改变？"},
            {"title": "第二章：成长型思维", "description": "Carol Dweck的革命性发现。",
             "content": "# 成长型思维\n\nCarol Dweck发现，人们对「智力是否可以改变」的信念深刻影响其成就。固定型思维者认为能力是天生的，遇到困难就放弃；成长型思维者认为能力可以培养，把困难视为学习机会。好消息是：思维方式可以被改变。\n\n💭 **思考题**：你在哪个领域是「固定型思维」，在哪个领域是「成长型思维」？"},
        ]
    },
    {
        "title": "儿童心理学：理解小小心灵",
        "description": "皮亚杰的认知发展、维果茨基的最近发展区、气质与依恋。从0到12岁，理解儿童的内心世界。",
        "category": "child",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：儿童认知发展的里程碑", "description": "从客体永久性到抽象思维。",
             "content": "# 儿童认知发展的里程碑\n\n从0到12岁，儿童的认知经历了惊人的转变：0-2岁发展客体永久性（物体不在眼前也存在），2-7岁发展符号思维和语言，7-11岁发展逻辑思维，11岁+发展抽象思维。\n\n💭 **思考题**：你有机会观察过一个小孩子的成长吗？你注意到了哪些认知飞跃？"},
            {"title": "第二章：游戏的重要性", "description": "游戏不是浪费时间——是儿童的工作。",
             "content": "# 游戏的重要性\n\n皮亚杰说：「游戏是儿童的工作。」通过游戏，儿童学习社交规则、练习情感调节、发展想象力和创造力。自由游戏时间的减少可能是当代儿童焦虑和抑郁上升的原因之一。\n\n💭 **思考题**：你小时候最喜欢玩什么游戏？它教会了你什么？"},
        ]
    },
    {
        "title": "爱情心理学：亲密关系的科学",
        "description": "斯滕伯格的爱情三角、Gottman的婚姻研究、吸引力的心理学原理。用科学理解人类最深刻的情感。",
        "category": "love",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：爱情的三角理论", "description": "激情、亲密、承诺。",
             "content": "# 爱情的三角理论\n\nRobert Sternberg提出爱情由三个成分组成：激情（生理唤醒和强烈吸引力）、亲密（情感连接和互相理解）、承诺（维持关系的决定）。不同的组合产生不同类型的爱——从浪漫爱到伴侣爱到完满爱。\n\n💭 **思考题**：在你最重要的一段关系中，激情、亲密、承诺各占多少比例？"},
            {"title": "第二章：Gottman的婚姻研究", "description": "为什么有些关系持续，有些破裂？",
             "content": "# Gottman的婚姻研究\n\nJohn Gottman追踪了数千对夫妻数十年，发现了「末日四骑士」——批评、蔑视、防御、冷漠。他能以90%以上的准确率预测一对夫妻是否会离婚。但好消息是：幸福的婚姻有其规律，这些规律可以被学习。\n\n💭 **思考题**：在你的关系中，你最容易落入哪个「骑士」的模式？"},
        ]
    },
    {
        "title": "创造性心理学：灵感从哪里来",
        "description": "发散思维与收敛思维、心流与创造、创新的人格特质。创造力不是天才的专属——它可以被培养。",
        "category": "creativity",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {"title": "第一章：创造力如何发生", "description": "发散思维、顿悟、酝酿效应。",
             "content": "# 创造力如何发生\n\nGuilford区分了发散思维（产生多个可能的解决方案）和收敛思维（找到唯一正确的答案）。创造力需要两者——先发散后收敛。酝酿效应表明：休息和分心有助于创造性问题解决。\n\n💭 **思考题**：你什么时候最有创造力？在什么环境中你的灵感最容易涌现？"},
            {"title": "第二章：培养创造力", "description": "创造力的可塑性。",
             "content": "# 培养创造力\n\n创造力不是天生的天才特质——它是一种可以培养的技能。研究表明：跨领域学习、保持好奇心、接受模糊性、创造性地拖延（给无意识加工留出时间）都能提升创造力。\n\n💭 **实践题**：这周尝试一件你从没做过的事——走一条新路、学一个新技能、看一部你平时不会看的电影。"},
        ]
    },
    {
        "title": "犯罪心理学：黑暗中的心灵",
        "description": "犯罪心理画像、精神病态、供述心理学。理解犯罪行为的心理机制——是为了预防，而不是猎奇。",
        "category": "forensic",
        "difficulty": "advanced",
        "image_url": "",
        "content": [
            {"title": "第一章：精神病态的心理画像", "description": "Hare的精神病态检查表（PCL-R）。",
             "content": "# 精神病态的心理画像\n\nRobert Hare开发了PCL-R（精神病态检查表），包含20个特征：表面魅力、夸大自我价值、病理性说谎、操纵性、缺乏内疚和悔恨、浅薄情感、无情……精神病态者的核心特征是「情感贫乏」——他们能理解行为对错但不能产生相应的情感反应。\n\n💭 **思考题**：精神病态是先天的还是后天形成的？最新研究表明，大约50%是遗传因素。"},
            {"title": "第二章：犯罪预防的心理学", "description": "从理解到预防。",
             "content": "# 犯罪预防的心理学\n\n研究犯罪心理的最终目的不是猎奇，而是预防。早期干预项目（如美国Nurse-Family Partnership）对高风险家庭提供育婴支持，显著降低儿童日后的犯罪率。好的社会政策是最好的犯罪预防。\n\n💭 **思考题**：你认为社会可以从心理学角度做些什么来减少犯罪？"},
        ]
    },
    {
        "title": "消费心理学：我们为什么购买",
        "description": "锚定效应、框架效应、稀缺性心理。商家如何利用认知偏差影响你的决策？了解这些，做更明智的消费者。",
        "category": "consumer",
        "difficulty": "beginner",
        "image_url": "",
        "content": [
            {"title": "第一章：锚定效应与框架效应", "description": "Kahneman和Tversky的发现。",
             "content": "# 锚定效应与框架效应\n\n锚定效应：你对一个数字的估计会被之前看到的任意数字影响（原价¥999，现价¥399——那个¥999就是「锚」）。框架效应：同样的选择用不同方式表述，人们会做出不同的决定（90%存活率 vs 10%死亡率）。\n\n💭 **思考题**：回想你最近一次购物，你被「锚定」了吗？"},
            {"title": "第二章：稀缺性心理与社会证明", "description": "为什么「限量版」和「已售5000件」如此有效？",
             "content": "# 稀缺性心理与社会证明\n\n稀缺性心理：当我们感觉某样东西稀缺时，我们会赋予它更高的价值。这就是「最后3件！」和「限时优惠」为什么有效的原因。社会证明：当我们不确定该怎么做时，我们会看别人怎么做。\n\n💭 **思考题**：商家在你身上用了哪些心理学技巧？你现在能识别出来吗？"},
        ]
    },
    {
        "title": "临终与死亡心理学：生命的最后一课",
        "description": "Kübler-Ross的五个阶段、死亡焦虑、临终关怀。面对生命的终点，找到活着的意义。",
        "category": "thanatology",
        "difficulty": "advanced",
        "image_url": "",
        "content": [
            {"title": "第一章：Kübler-Ross的五个阶段", "description": "面对死亡的心理历程。",
             "content": "# Kübler-Ross的五个阶段\n\nElisabeth Kübler-Ross通过访谈数百位临终病人，提出了死亡接受的五个阶段：否认→愤怒→讨价还价→抑郁→接受。重要的是：这不是线性过程——人们会在各阶段之间来回。\n\n💭 **思考题**：你在生活中（不一定是面对死亡）经历过这些阶段吗？"},
            {"title": "第二章：拒斥死亡——Becker的洞见", "description": "人类文明是死亡的副产品。",
             "content": "# 拒斥死亡——Becker的洞见\n\nErnest Becker在《拒斥死亡》中提出：人类一切文明建造——宗教、艺术、科学、财富——在某种程度上都是为了对抗对死亡的恐惧。恐惧管理理论（TMT）通过实验验证了这些假设：当人们被提醒死亡时，他们更倾向于捍卫自己的文化世界观。\n\n💭 **思考题**：如果生命没有终点，你会过着怎样不同的生活？"},
            {"title": "第三章：临终关怀与善终", "description": "心理学的最后一课。",
             "content": "# 临终关怀与善终\n\n现代临终关怀运动由Cicely Saunders创立，核心信念是：每个临终者都应在尊严、舒适和人际陪伴中度过最后的日子。心理学研究表明：临终者的首要需求不是延长生命，而是减轻痛苦、维护尊严、与所爱之人在一起。\n\n💭 **反思**：如果今天是你生命的最后一天，你会后悔什么？这些后悔能告诉你现在应该如何生活。"},
        ]
    },
    {
        "title": "运动心理学：巅峰状态的心理秘密",
        "description": "心理韧性、可视化训练、choking现象。顶尖运动员如何训练大脑？这些技巧同样适用于日常生活。",
        "category": "sports",
        "difficulty": "intermediate",
        "image_url": "",
        "content": [
            {"title": "第一章：Choking——为什么顶尖选手会在关键时刻失常", "description": "大脑的悖论。",
             "content": "# Choking——为什么顶尖选手会在关键时刻失常\n\n「Choking」是指在关键时刻因为过度关注执行过程而导致的表现下降。当意识过度干预自动化技能时，流畅性被打破——就像你一旦开始思考走路时哪条腿先迈出，反而会绊倒。\n\n💭 **思考题**：你是否有过在重要时刻「发挥失常」的经历？当时你的脑子里在想什么？"},
            {"title": "第二章：心理韧性与可视化训练", "description": "顶尖运动员的大脑训练。",
             "content": "# 心理韧性与可视化训练\n\n心理韧性是可训练的能力，包括：自信、注意控制、情绪调节、目标设定、积极自我对话。可视化训练已被神经科学证实有效——大脑无法区分真实体验和生动想象。奥运选手在脑中反复演练比赛，这在功能上等同于实际训练。\n\n💭 **实践题**：选一个你想提升的技能，在脑中做一次10分钟的生动演练。细节越具体越好。"},
        ]
    },
]


# ===== 心理测评量表种子数据 =====
# 所有量表均为国际标准量表的中文简化版
# SAS/SDS/SCL-90简版/大五BFI-20/PSQI简版/CD-RISC简版

def _qs(items):
    """Helper: 构建标准4点量表题目 [{id, text, options, reversed}]"""
    opts = [
        {"score": 1, "label": "没有/很少"},
        {"score": 2, "label": "有时"},
        {"score": 3, "label": "经常"},
        {"score": 4, "label": "总是/持续"},
    ]
    return [
        {"id": i+1, "text": t, "options": opts, "reversed": bool(r)}
        for i, (t, r) in enumerate(items)
    ]

def _qs_bigfive(items):
    """Helper: 大五5点量表"""
    opts = [
        {"score": 1, "label": "非常不同意"},
        {"score": 2, "label": "不同意"},
        {"score": 3, "label": "中立"},
        {"score": 4, "label": "同意"},
        {"score": 5, "label": "非常同意"},
    ]
    return [
        {"id": i+1, "text": t, "options": opts, "reversed": bool(r), "factor": f}
        for i, (t, r, f) in enumerate(items)
    ]

ASSESSMENTS = [
    {
        "name": "SAS 焦虑自评量表",
        "category": "anxiety",
        "description": "焦虑自评量表（Self-Rating Anxiety Scale）由 Zung 于 1971 年编制，用于评估焦虑程度的主观感受。本量表包含 20 个条目，从躯体症状到心理紧张，全面测量焦虑水平。",
        "instructions": "请根据您最近一周的实际感受作答，不要花太多时间思考每个问题。",
        "icon": "🌊",
        "disclaimer": "⚠️ 本测评仅为心理健康参考工具，SAS标准分≥50建议寻求专业评估。不能替代临床诊断。",
        "questions": _qs([
            ("我感到比平时更容易紧张和着急", False),
            ("我无缘无故地感到害怕", False),
            ("我容易心烦意乱或觉得恐慌", False),
            ("我觉得我可能将要发疯", False),
            ("我觉得一切都很好，不会发生不幸", True),
            ("我的手脚发抖打颤", False),
            ("我因为头痛、颈痛和背痛而苦恼", False),
            ("我感觉容易衰弱和疲乏", False),
            ("我觉得心平气和，并且容易安静坐着", True),
            ("我觉得心跳得很快", False),
            ("我因为一阵阵头晕而苦恼", False),
            ("我有晕倒发作，或觉得要晕倒似的", False),
            ("我吸气呼气都感到很容易", True),
            ("我的手脚麻木和刺痛", False),
            ("我因为胃痛和消化不良而苦恼", False),
            ("我常常要小便", False),
            ("我的手脚常常是干燥温暖的", True),
            ("我脸红发热", False),
            ("我容易入睡并且一夜睡得很好", True),
            ("我做噩梦", False),
        ]),
        "scoring_rules": {
            "multiplier": 1.25,
            "levels": [
                {"range": [25, 49], "label": "正常", "description": "焦虑水平在正常范围内，请继续保持良好的心理状态。", "color": "#B8D4C8"},
                {"range": [50, 59], "label": "轻度焦虑", "description": "存在轻度焦虑症状，建议尝试放松练习，关注情绪变化。", "color": "#F0C060"},
                {"range": [60, 69], "label": "中度焦虑", "description": "焦虑症状较明显，可能影响日常生活，建议寻求心理咨询。", "color": "#E8A598"},
                {"range": [70, 100], "label": "重度焦虑", "description": "焦虑症状严重，强烈建议尽快就医，寻求专业精神科帮助。", "color": "#FF8A7A"},
            ]
        },
    },
    {
        "name": "SDS 抑郁自评量表",
        "category": "depression",
        "description": "抑郁自评量表（Self-Rating Depression Scale）由 Zung 于 1965 年编制，用于评估抑郁程度。量表包含 20 个条目，涵盖情感、躯体、精神运动和心理四个维度。",
        "instructions": "请根据您最近一周的实际感受作答。",
        "icon": "🌧️",
        "disclaimer": "⚠️ 本测评仅为心理健康参考工具，如SDS指数≥0.5并持续两周以上，建议寻求专业帮助。",
        "questions": _qs([
            ("我觉得闷闷不乐，情绪低沉", False),
            ("我觉得一天之中早晨最好", True),
            ("我一阵阵哭出来或觉得想哭", False),
            ("我晚上睡眠不好", False),
            ("我吃得跟平常一样多", True),
            ("我与异性密切接触时和以往一样感到愉快", True),
            ("我发觉我的体重在下降", False),
            ("我有便秘的苦恼", False),
            ("我心跳比平时快", False),
            ("我无缘无故地感到疲乏", False),
            ("我的头脑跟平常一样清楚", True),
            ("我觉得经常做的事情并没有困难", True),
            ("我觉得不安而平静不下来", False),
            ("我对将来抱有希望", True),
            ("我比平常容易生气激动", False),
            ("我觉得做出决定是容易的", True),
            ("我觉得自己是个有用的人，有人需要我", True),
            ("我的生活过得很有意思", True),
            ("我认为如果我死了别人会生活得好些", False),
            ("平常感兴趣的事我仍然照样感兴趣", True),
        ]),
        "scoring_rules": {
            "divisor": 80,
            "levels": [
                {"range": [0.25, 0.49], "label": "正常", "description": "情绪状态良好，请继续保持积极的生活方式。", "color": "#B8D4C8"},
                {"range": [0.50, 0.59], "label": "轻度抑郁", "description": "可能有轻度抑郁情绪，建议增加户外活动和社交，关注心情变化。", "color": "#F0C060"},
                {"range": [0.60, 0.69], "label": "中度抑郁", "description": "抑郁症状较明显，可能需要专业心理支持，建议寻求心理咨询。", "color": "#E8A598"},
                {"range": [0.70, 1.0], "label": "重度抑郁", "description": "抑郁症状严重，请立即寻求精神科医生的帮助。你并不孤单。", "color": "#FF8A7A"},
            ]
        },
    },
    {
        "name": "大五人格简版 (BFI-20)",
        "category": "personality",
        "description": "大五人格模型是心理学界最广泛接受的人格理论之一，包含五大维度：开放性、尽责性、外向性、宜人性、神经质。本简版量表（BFI-20）仅需20题，快速了解你的性格画像。",
        "instructions": "请根据您日常行为的一般倾向作答，没有对错之分。",
        "icon": "🎭",
        "disclaimer": "⚠️ 本测评反映人格倾向而非病理诊断。人格特质无好坏之分，了解自己是为了更好地成长。",
        "questions": _qs_bigfive([
            ("我善于言辞，喜欢与人交谈", False, "E"),
            ("我倾向于发现别人的缺点", True, "A"),
            ("我做事情认真负责，有条理", False, "C"),
            ("我经常感到忧郁、沮丧", False, "N"),
            ("我对新事物充满好奇心", False, "O"),
            ("我性格外向，善于社交", False, "E"),
            ("我待人友善，愿意帮助别人", False, "A"),
            ("我做事有始有终，值得信赖", False, "C"),
            ("我容易紧张和焦虑", False, "N"),
            ("我有丰富的想象力和创造力", False, "O"),
            ("在人群中我通常是安静的", True, "E"),
            ("我有时对别人冷漠和疏远", True, "A"),
            ("我有时比较粗心大意", True, "C"),
            ("我情绪稳定，不容易烦恼", True, "N"),
            ("我喜欢常规和熟悉的事物", True, "O"),
            ("我充满能量，总是积极主动", False, "E"),
            ("我愿意与人合作而非竞争", False, "A"),
            ("我制定计划并能坚持执行", False, "C"),
            ("我经常情绪波动", False, "N"),
            ("我喜欢艺术和美的体验", False, "O"),
        ]),
        "scoring_rules": {
            "levels": [
                {"range": [1, 5], "label": "人格画像", "description": "您的五大人格维度得分。每项得分越高，表示该特质越突出。请查看各维度的详细分析。", "color": "#C4B5D4"},
            ]
        },
    },
    {
        "name": "匹兹堡睡眠质量指数 (简版)",
        "category": "sleep",
        "description": "匹兹堡睡眠质量指数（PSQI）是评估睡眠质量的金标准工具。本简版包含7个核心问题，涵盖睡眠时长、入睡时间、睡眠效率和日间功能。",
        "instructions": "请根据您最近一个月的睡眠情况作答。",
        "icon": "🌙",
        "disclaimer": "⚠️ 本测评仅评估睡眠质量，如长期失眠请咨询睡眠专科医生。",
        "questions": [
            {"id": 1, "text": "过去一个月，您每晚实际睡眠时间大约是多少？", "options": [
                {"score": 0, "label": ">7小时"}, {"score": 1, "label": "6-7小时"}, {"score": 2, "label": "5-6小时"}, {"score": 3, "label": "<5小时"},
            ], "reversed": False},
            {"id": 2, "text": "过去一个月，您每晚需要多长时间才能入睡？", "options": [
                {"score": 0, "label": "≤15分钟"}, {"score": 1, "label": "16-30分钟"}, {"score": 2, "label": "31-60分钟"}, {"score": 3, "label": ">60分钟"},
            ], "reversed": False},
            {"id": 3, "text": "过去一个月，您夜间或清晨容易醒来吗？", "options": [
                {"score": 0, "label": "从未"}, {"score": 1, "label": "<1次/周"}, {"score": 2, "label": "1-2次/周"}, {"score": 3, "label": "≥3次/周"},
            ], "reversed": False},
            {"id": 4, "text": "过去一个月，您觉得自己睡眠质量如何？", "options": [
                {"score": 0, "label": "很好"}, {"score": 1, "label": "较好"}, {"score": 2, "label": "较差"}, {"score": 3, "label": "很差"},
            ], "reversed": False},
            {"id": 5, "text": "过去一个月，您需要使用药物才能入睡吗？", "options": [
                {"score": 0, "label": "从未"}, {"score": 1, "label": "<1次/周"}, {"score": 2, "label": "1-2次/周"}, {"score": 3, "label": "≥3次/周"},
            ], "reversed": False},
            {"id": 6, "text": "过去一个月，您白天感到困倦吗？", "options": [
                {"score": 0, "label": "从未"}, {"score": 1, "label": "偶尔"}, {"score": 2, "label": "经常"}, {"score": 3, "label": "总是"},
            ], "reversed": False},
            {"id": 7, "text": "过去一个月，您做事情的精力如何？", "options": [
                {"score": 0, "label": "精力充沛"}, {"score": 1, "label": "精力一般"}, {"score": 2, "label": "精力不足"}, {"score": 3, "label": "非常疲倦"},
            ], "reversed": False},
        ],
        "scoring_rules": {
            "levels": [
                {"range": [0, 7], "label": "良好", "description": "睡眠质量良好，请继续保持健康的睡眠习惯。", "color": "#B8D4C8"},
                {"range": [8, 14], "label": "一般", "description": "睡眠质量一般，可以尝试改善睡眠环境和作息规律。", "color": "#F0C060"},
                {"range": [15, 21], "label": "较差", "description": "睡眠质量较差，建议关注睡眠卫生，如持续请咨询医生。", "color": "#FF8A7A"},
            ]
        },
    },
    {
        "name": "心理弹性量表 (CD-RISC 简版)",
        "category": "resilience",
        "description": "心理弹性量表（Connor-Davidson Resilience Scale）测量个体面对逆境时的恢复能力。心理弹性不是天生的，而是可以培养的心理肌肉。本简版包含10个条目。",
        "instructions": "请根据您过去一个月的实际情况作答。",
        "icon": "🌱",
        "disclaimer": "⚠️ 心理弹性是动态变化的，低分不代表脆弱，而是提醒我们可以有意识地锻炼心理韧性。",
        "questions": _qs([
            ("当事情发生变化时，我能够适应", True),
            ("无论发生什么我都能应付", True),
            ("我能看到事情幽默的一面", True),
            ("应对压力使我感到有力量", True),
            ("在生病或困难之后，我能够恢复过来", True),
            ("纵然有障碍，我也能实现目标", True),
            ("在压力下我能够集中注意力并清晰思考", True),
            ("我不会因失败而气馁", True),
            ("我认为自己是个坚强的人", True),
            ("我能够处理不愉快的情绪", True),
        ]),
        "scoring_rules": {
            "levels": [
                {"range": [10, 20], "label": "有待提升", "description": "当前心理弹性较低，可以通过正念练习、社会支持和心理教育来增强。", "color": "#E8A598"},
                {"range": [21, 30], "label": "中等", "description": "心理弹性处于中等水平，在多数情况下能够良好应对。", "color": "#F0C060"},
                {"range": [31, 40], "label": "良好", "description": "心理弹性良好，在面对挑战时展现出较强的适应能力。", "color": "#B8D4C8"},
            ]
        },
    },
    {
        "name": "SCL-90 症状自评 (简版)",
        "category": "symptom",
        "description": "SCL-90是评估心理健康症状的综合性量表。本简版包含36个条目，覆盖9个维度：躯体化、强迫、人际敏感、抑郁、焦虑、敌对、恐怖、偏执、精神病性。",
        "instructions": "请根据您最近一周的实际情况作答，不要遗漏任何问题。",
        "icon": "📋",
        "disclaimer": "⚠️ 本测评提供多维度心理健康参考，如有明显异常请咨询精神科医生。本量表不能替代临床诊断。",
        "questions": _qs([
            ("头痛或头部不适", False),
            ("神经过敏，心中不踏实", False),
            ("头脑中有不必要的想法盘旋", False),
            ("头晕或昏倒感", False),
            ("对异性的兴趣减退", False),
            ("感到别人能控制您的思想", False),
            ("责怪别人制造麻烦", False),
            ("容易忘记事情", False),
            ("担心自己的衣饰和仪态", False),
            ("容易烦恼和激动", False),
            ("胸痛", False),
            ("害怕空旷的场所或街道", False),
            ("感到自己的精力下降、活动减慢", False),
            ("想结束自己的生命", False),
            ("听到旁人听不到的声音", False),
            ("发抖", False),
            ("感到大多数人都不可信任", False),
            ("胃口不好", False),
            ("容易哭泣", False),
            ("感到孤独", False),
            ("感到苦闷", False),
            ("对事物过分担忧", False),
            ("对事物不感兴趣", False),
            ("感到害怕", False),
            ("我的感情容易受到伤害", False),
            ("感觉到旁人能知道您的私下想法", False),
            ("感到别人不理解您、不同情您", False),
            ("感到人们对您不友好、不喜欢您", False),
            ("做事必须很慢以保证正确", False),
            ("心跳得很厉害", False),
            ("恶心或胃部不舒服", False),
            ("感到比不上他人", False),
            ("肌肉酸痛", False),
            ("感到有人在监视您谈论您", False),
            ("难以入睡", False),
            ("做事必须反复检查", False),
        ]),
        "scoring_rules": {
            "levels": [
                {"range": [36, 71], "label": "健康", "description": "各项心理指标在正常范围内，心理健康状况良好。", "color": "#B8D4C8"},
                {"range": [72, 107], "label": "轻度异常", "description": "部分心理症状得分偏高，建议关注相应维度并适当调整。", "color": "#F0C060"},
                {"range": [108, 144], "label": "中度异常", "description": "多项心理症状较明显，建议寻求心理咨询进行深入评估。", "color": "#E8A598"},
            ]
        },
    },
]


async def seed(echo=True):
    """Seed database with initial data."""
    from backend.models import User, Course, Assessment, KnowledgeCategory, KnowledgeArticle

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    if echo:
        print("✅ Tables created")

    async with async_session() as session:
        from sqlalchemy import select

        result = await session.execute(select(User).where(User.username == "dreamer"))
        existing = result.scalar_one_or_none()

        if not existing:
            user = User(username="dreamer", email="dreamer@dreamlab.com")
            session.add(user)
            await session.flush()
            if echo:
                print(f"✅ Created user: dreamer (id={user.id})")

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

            if echo:
                print(f"✅ Created {len(COURSES)} courses")

        # Create assessments (idempotent)
        check = await session.execute(select(Assessment).limit(1))
        if check.scalar_one_or_none() is None:
            for a_data in ASSESSMENTS:
                assessment = Assessment(
                    name=a_data["name"],
                    category=a_data["category"],
                    description=a_data["description"],
                    instructions=a_data.get("instructions", ""),
                    questions=a_data["questions"],
                    scoring_rules=a_data["scoring_rules"],
                    disclaimer=a_data.get("disclaimer", ""),
                    icon=a_data.get("icon", "🪞"),
                )
                session.add(assessment)
            if echo:
                print(f"✅ Created {len(ASSESSMENTS)} assessments")

        # Create knowledge base (idempotent)
        from backend.seed_knowledge import KNOWLEDGE_CATEGORIES, KNOWLEDGE_ARTICLES

        check_cat = await session.execute(select(KnowledgeCategory).limit(1))
        if check_cat.scalar_one_or_none() is None:
            cat_map = {}
            for cat_data in KNOWLEDGE_CATEGORIES:
                cat = KnowledgeCategory(
                    name=cat_data["name"],
                    slug=cat_data["slug"],
                    description=cat_data["description"],
                    icon=cat_data["icon"],
                    color=cat_data["color"],
                    sort_order=cat_data["sort_order"],
                )
                session.add(cat)
                cat_map[cat_data["slug"]] = cat
            await session.flush()

            for article_data in KNOWLEDGE_ARTICLES:
                cat = cat_map.get(article_data["category_slug"])
                article = KnowledgeArticle(
                    category_id=cat.id if cat else None,
                    title=article_data["title"],
                    slug=article_data["slug"],
                    summary=article_data["summary"],
                    content=article_data["content"],
                    key_concepts=article_data["key_concepts"],
                    evidence_level=article_data["evidence_level"],
                    source=article_data["source"],
                    reading_time=article_data["reading_time"],
                    is_featured=article_data["is_featured"],
                    quiz=article_data["quiz"],
                )
                session.add(article)
            if echo:
                print(f"✅ Seeded {len(KNOWLEDGE_CATEGORIES)} categories, {len(KNOWLEDGE_ARTICLES)} articles")

        await session.commit()
        if echo:
            course_count = (await session.execute(select(Course))).scalars().all()
            assessment_count = (await session.execute(select(Assessment))).scalars().all()
            print(f"\n🎉 Seed complete! {len(course_count)} courses, {len(assessment_count)} assessments\n")


if __name__ == "__main__":
    asyncio.run(seed())
