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
                {"score": 0, "label": ">7小时"},
                {"score": 1, "label": "6-7小时"},
                {"score": 2, "label": "5-6小时"},
                {"score": 3, "label": "<5小时"},
            ], "reversed": False},
            {"id": 2, "text": "过去一个月，您每晚需要多长时间才能入睡？", "options": [
                {"score": 0, "label": "≤15分钟"},
                {"score": 1, "label": "16-30分钟"},
                {"score": 2, "label": "31-60分钟"},
                {"score": 3, "label": ">60分钟"},
            ], "reversed": False},
            {"id": 3, "text": "过去一个月，您夜间或清晨容易醒来吗？", "options": [
                {"score": 0, "label": "从未"},
                {"score": 1, "label": "<1次/周"},
                {"score": 2, "label": "1-2次/周"},
                {"score": 3, "label": "≥3次/周"},
            ], "reversed": False},
            {"id": 4, "text": "过去一个月，您觉得自己睡眠质量如何？", "options": [
                {"score": 0, "label": "很好"},
                {"score": 1, "label": "较好"},
                {"score": 2, "label": "较差"},
                {"score": 3, "label": "很差"},
            ], "reversed": False},
            {"id": 5, "text": "过去一个月，您需要使用药物才能入睡吗？", "options": [
                {"score": 0, "label": "从未"},
                {"score": 1, "label": "<1次/周"},
                {"score": 2, "label": "1-2次/周"},
                {"score": 3, "label": "≥3次/周"},
            ], "reversed": False},
            {"id": 6, "text": "过去一个月，您白天感到困倦吗？", "options": [
                {"score": 0, "label": "从未"},
                {"score": 1, "label": "偶尔"},
                {"score": 2, "label": "经常"},
                {"score": 3, "label": "总是"},
            ], "reversed": False},
            {"id": 7, "text": "过去一个月，您做事情的精力如何？", "options": [
                {"score": 0, "label": "精力充沛"},
                {"score": 1, "label": "精力一般"},
                {"score": 2, "label": "精力不足"},
                {"score": 3, "label": "非常疲倦"},
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
    from backend.models import User
    
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    if echo:
        print("✅ Tables created")
    
    async with async_session() as session:
        # Check if already seeded (only check courses; assessments may be new)
        from sqlalchemy import select
        result = await session.execute(select(User).where(User.username == "dreamer"))
        existing = result.scalar_one_or_none()
        
        if not existing:
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
        
        # Create assessments (idempotent — skip if already exist)
        from backend.models import Assessment
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
        
        await session.commit()
        if echo:
            # Count what we have
            from backend.models import Course
            course_count = (await session.execute(select(Course))).scalars().all()
            assessment_count = (await session.execute(select(Assessment))).scalars().all()
            print(f"\n🎉 Seed complete! {len(course_count)} courses, {len(assessment_count)} assessments\n")


if __name__ == "__main__":
    asyncio.run(seed())
