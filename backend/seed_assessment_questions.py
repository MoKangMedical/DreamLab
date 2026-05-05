# -*- coding: utf-8 -*-
"""
Seed assessment questions for all 6 scales.
Usage: PYTHONPATH=/usr/local/lib64/python3.11/site-packages:/usr/local/lib/python3.11/site-packages python3 backend/seed_assessment_questions.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session
from config import SYNC_DATABASE_URL
from models import Base, Assessment

engine = create_engine(SYNC_DATABASE_URL, echo=False)
Base.metadata.create_all(bind=engine)

# ═══════════════════════════════════════════════════════════
# SAS 焦虑自评量表 (Zung, 1971)
# 20 items, 1-4 Likert, standard score = raw × 1.25
# ═══════════════════════════════════════════════════════════
SAS_QUESTIONS = [
    {"id": 1, "text": "我觉得比平常容易紧张和着急", "reversed": False},
    {"id": 2, "text": "我无缘无故地感到害怕", "reversed": False},
    {"id": 3, "text": "我容易心里烦乱或觉得惊恐", "reversed": False},
    {"id": 4, "text": "我觉得我可能将要发疯", "reversed": False},
    {"id": 5, "text": "我觉得一切都很好，也不会发生什么不幸", "reversed": True},
    {"id": 6, "text": "我手脚发抖打颤", "reversed": False},
    {"id": 7, "text": "我因为头痛、颈痛和背痛而苦恼", "reversed": False},
    {"id": 8, "text": "我觉得容易衰弱和疲乏", "reversed": False},
    {"id": 9, "text": "我觉得心平气和，并且容易安静坐着", "reversed": True},
    {"id": 10, "text": "我觉得心跳得很快", "reversed": False},
    {"id": 11, "text": "我因为一阵阵头晕而苦恼", "reversed": False},
    {"id": 12, "text": "我有晕倒发作，或觉得要晕倒似的", "reversed": False},
    {"id": 13, "text": "我吸气呼气都感到很容易", "reversed": True},
    {"id": 14, "text": "我的手脚麻木和刺痛", "reversed": False},
    {"id": 15, "text": "我因为胃痛和消化不良而苦恼", "reversed": False},
    {"id": 16, "text": "我常常要小便", "reversed": False},
    {"id": 17, "text": "我的手脚常常是干燥温暖的", "reversed": True},
    {"id": 18, "text": "我脸红发热", "reversed": False},
    {"id": 19, "text": "我容易入睡并且一夜睡得很好", "reversed": True},
    {"id": 20, "text": "我做噩梦", "reversed": False},
]
SAS_OPTIONS = [
    {"score": 1, "label": "没有或很少时间"},
    {"score": 2, "label": "小部分时间"},
    {"score": 3, "label": "相当多时间"},
    {"score": 4, "label": "绝大部分或全部时间"},
]
SAS_SCORING = {
    "method": "standard_score",
    "multiplier": 1.25,
    "levels": [
        {"range": [20, 35], "label": "正常范围", "description": "你目前没有明显的焦虑症状，保持良好的心理状态。", "color": "#3b8b7a"},
        {"range": [35, 49], "label": "正常范围", "description": "你目前没有明显的焦虑症状。", "color": "#3b8b7a"},
        {"range": [50, 59], "label": "轻度焦虑", "description": "存在轻度焦虑，建议关注自己的情绪状态，适当放松。", "color": "#d4a853"},
        {"range": [60, 69], "label": "中度焦虑", "description": "存在中度焦虑，建议寻求心理咨询师的帮助。", "color": "#c4554d"},
        {"range": [70, 80], "label": "重度焦虑", "description": "存在重度焦虑，强烈建议尽快咨询专业心理医生。", "color": "#c4554d"},
    ],
}

# ═══════════════════════════════════════════════════════════
# SDS 抑郁自评量表 (Zung, 1965)
# 20 items, 1-4 Likert, depression index = raw / 80
# ═══════════════════════════════════════════════════════════
SDS_QUESTIONS = [
    {"id": 1, "text": "我觉得闷闷不乐，情绪低沉", "reversed": False},
    {"id": 2, "text": "我觉得一天之中早晨最好", "reversed": True},
    {"id": 3, "text": "我一阵阵哭出来或觉得想哭", "reversed": False},
    {"id": 4, "text": "我晚上睡眠不好", "reversed": False},
    {"id": 5, "text": "我吃得跟平常一样多", "reversed": True},
    {"id": 6, "text": "我与异性密切接触时和以往一样感到愉快", "reversed": True},
    {"id": 7, "text": "我发觉我的体重在下降", "reversed": False},
    {"id": 8, "text": "我有便秘的苦恼", "reversed": False},
    {"id": 9, "text": "我心跳比平时快", "reversed": False},
    {"id": 10, "text": "我无缘无故地感到疲乏", "reversed": False},
    {"id": 11, "text": "我的头脑跟平常一样清楚", "reversed": True},
    {"id": 12, "text": "我觉得经常做的事情并没有困难", "reversed": True},
    {"id": 13, "text": "我觉得不安而平静不下来", "reversed": False},
    {"id": 14, "text": "我对将来抱有希望", "reversed": True},
    {"id": 15, "text": "我比平常容易生气激动", "reversed": False},
    {"id": 16, "text": "我觉得做出决定是容易的", "reversed": True},
    {"id": 17, "text": "我觉得自己是个有用的人，有人需要我", "reversed": True},
    {"id": 18, "text": "我的生活过得很有意思", "reversed": True},
    {"id": 19, "text": "我认为如果我死了别人会生活得好些", "reversed": False},
    {"id": 20, "text": "平常感兴趣的事我仍然照样感兴趣", "reversed": True},
]
SDS_OPTIONS = [
    {"score": 1, "label": "没有或很少时间"},
    {"score": 2, "label": "小部分时间"},
    {"score": 3, "label": "相当多时间"},
    {"score": 4, "label": "绝大部分或全部时间"},
]
SDS_SCORING = {
    "method": "index",
    "divisor": 80,
    "levels": [
        {"range": [0, 0.49], "label": "正常范围", "description": "没有明显抑郁症状。", "color": "#3b8b7a"},
        {"range": [0.50, 0.59], "label": "轻度抑郁", "description": "存在轻度抑郁倾向，建议关注情绪变化。", "color": "#d4a853"},
        {"range": [0.60, 0.69], "label": "中度抑郁", "description": "存在中度抑郁，建议寻求专业帮助。", "color": "#c4554d"},
        {"range": [0.70, 1.0], "label": "重度抑郁", "description": "存在重度抑郁，请务必尽快咨询心理医生。", "color": "#c4554d"},
    ],
}

# ═══════════════════════════════════════════════════════════
# BFI-20 大五人格简版 (John & Srivastava, 1999)
# 20 items, 1-5 Likert, 5 dimensions × 4 items each
# ═══════════════════════════════════════════════════════════
BFI_QUESTIONS = [
    {"id": 1, "text": "我是个健谈的人", "dimension": "extraversion", "reversed": False},
    {"id": 2, "text": "我经常挑别人的毛病", "dimension": "agreeableness", "reversed": True},
    {"id": 3, "text": "我做事认真负责，会坚持到底", "dimension": "conscientiousness", "reversed": False},
    {"id": 4, "text": "我经常感到忧郁、沮丧", "dimension": "neuroticism", "reversed": False},
    {"id": 5, "text": "我对许多事物都充满好奇", "dimension": "openness", "reversed": False},
    {"id": 6, "text": "我充满活力，精力充沛", "dimension": "extraversion", "reversed": False},
    {"id": 7, "text": "我待人友善，愿意帮助他人", "dimension": "agreeableness", "reversed": False},
    {"id": 8, "text": "我有时会不负责任", "dimension": "conscientiousness", "reversed": True},
    {"id": 9, "text": "我能够很好地应对压力", "dimension": "neuroticism", "reversed": True},
    {"id": 10, "text": "我富有想象力，喜欢创造性思考", "dimension": "openness", "reversed": False},
    {"id": 11, "text": "我喜欢独处胜于社交", "dimension": "extraversion", "reversed": True},
    {"id": 12, "text": "我容易与他人发生冲突", "dimension": "agreeableness", "reversed": True},
    {"id": 13, "text": "我做事情有计划有条理", "dimension": "conscientiousness", "reversed": False},
    {"id": 14, "text": "我经常感到紧张不安", "dimension": "neuroticism", "reversed": False},
    {"id": 15, "text": "我对艺术和美感有敏锐的欣赏力", "dimension": "openness", "reversed": False},
    {"id": 16, "text": "我在社交场合中总是积极主动", "dimension": "extraversion", "reversed": False},
    {"id": 17, "text": "我富有同情心，善于理解他人感受", "dimension": "agreeableness", "reversed": False},
    {"id": 18, "text": "我做事有恒心，不容易放弃", "dimension": "conscientiousness", "reversed": False},
    {"id": 19, "text": "我情绪稳定，不容易被外界影响", "dimension": "neuroticism", "reversed": True},
    {"id": 20, "text": "我喜欢尝试新事物和接受新观念", "dimension": "openness", "reversed": False},
]
BFI_OPTIONS = [
    {"score": 1, "label": "非常不同意"},
    {"score": 2, "label": "比较不同意"},
    {"score": 3, "label": "中立"},
    {"score": 4, "label": "比较同意"},
    {"score": 5, "label": "非常同意"},
]
BFI_DIMENSIONS = {
    "extraversion": {"name": "外向性", "desc": "反映社交活跃度和积极情绪倾向", "items": [1, 6, 11, 16]},
    "agreeableness": {"name": "宜人性", "desc": "反映合作性、同情心和对他人的信任", "items": [2, 7, 12, 17]},
    "conscientiousness": {"name": "尽责性", "desc": "反映自律、组织性和目标导向", "items": [3, 8, 13, 18]},
    "neuroticism": {"name": "情绪稳定性", "desc": "反映情绪调节能力和压力耐受性", "items": [4, 9, 14, 19]},
    "openness": {"name": "开放性", "desc": "反映好奇心、创造力和对经验的接纳", "items": [5, 10, 15, 20]},
}
BFI_SCORING = {
    "method": "dimension_average",
    "dimensions": BFI_DIMENSIONS,
    "levels": {
        "extraversion": [
            {"range": [1, 2.5], "label": "内向沉稳", "desc": "你更享受独处的深度，有丰富的内心世界。社交对你来说是消耗而非充电。", "color": "#6b5b8a"},
            {"range": [2.5, 3.5], "label": "平衡型", "desc": "你在社交与独处之间找到了舒适的平衡。", "color": "#5a7d9a"},
            {"range": [3.5, 5], "label": "外向活跃", "desc": "你是人群中的能量源，善于社交且充满活力。", "color": "#d4a853"},
        ],
        "agreeableness": [
            {"range": [1, 2.5], "label": "独立主见", "desc": "你敢于表达不同意见，不容易被他人左右。", "color": "#c4554d"},
            {"range": [2.5, 3.5], "label": "平衡型", "desc": "你能在坚持自我和顾及他人之间取得平衡。", "color": "#5a7d9a"},
            {"range": [3.5, 5], "label": "温和合作", "desc": "你天性善良，善于合作，是团队中值得信赖的伙伴。", "color": "#3b8b7a"},
        ],
        "conscientiousness": [
            {"range": [1, 2.5], "label": "灵活随性", "desc": "你喜欢随遇而安，适应力强。", "color": "#6b5b8a"},
            {"range": [2.5, 3.5], "label": "适度有序", "desc": "你能在计划和灵活之间找到平衡。", "color": "#5a7d9a"},
            {"range": [3.5, 5], "label": "高度自律", "desc": "你做事有板有眼，目标感强，是可靠的力量。", "color": "#d4a853"},
        ],
        "neuroticism": [
            {"range": [1, 2.5], "label": "情绪稳定", "desc": "你像河神一样平静沉稳，即使风雨来临也能安然应对。", "color": "#3b8b7a"},
            {"range": [2.5, 3.5], "label": "适度敏感", "desc": "你有时会感受到情绪波动，但总体能自我调节。", "color": "#d4a853"},
            {"range": [3.5, 5], "label": "高度敏感", "desc": "你像精密的情感雷达，感受力极强。要学会给自己建一个安静的角落。", "color": "#c4554d"},
        ],
        "openness": [
            {"range": [1, 2.5], "label": "务实传统", "desc": "你重视经验与实践，脚踏实地走好每一步。", "color": "#5a7d9a"},
            {"range": [2.5, 3.5], "label": "适度开放", "desc": "你对新事物持开放态度，同时保持理性判断。", "color": "#d4a853"},
            {"range": [3.5, 5], "label": "高度开放", "desc": "你充满好奇心和创造力，总能发现常人看不到的美。", "color": "#3b8b7a"},
        ],
    },
}

# ═══════════════════════════════════════════════════════════
# PSQI 匹兹堡睡眠质量指数简版
# 9 self-report items
# ═══════════════════════════════════════════════════════════
PSQI_QUESTIONS = [
    {"id": 1, "text": "过去一个月，你通常晚上几点上床睡觉？", "type": "time"},
    {"id": 2, "text": "过去一个月，你上床后通常需要多长时间才能入睡？", "type": "select", "options": [
        {"score": 0, "label": "≤15分钟"}, {"score": 1, "label": "16-30分钟"},
        {"score": 2, "label": "31-60分钟"}, {"score": 3, "label": ">60分钟"}]},
    {"id": 3, "text": "过去一个月，你通常早上几点起床？", "type": "time"},
    {"id": 4, "text": "过去一个月，你每晚实际睡眠时间大约多少小时？", "type": "select", "options": [
        {"score": 0, "label": ">7小时"}, {"score": 1, "label": "6-7小时"},
        {"score": 2, "label": "5-6小时"}, {"score": 3, "label": "<5小时"}]},
    {"id": 5, "text": "过去一个月，你是否因为以下问题而睡眠困难：入睡困难（30分钟内不能入睡）", "type": "scale", "reversed": False},
    {"id": 6, "text": "过去一个月，你是否因为：夜间易醒或早醒", "type": "scale", "reversed": False},
    {"id": 7, "text": "过去一个月，你是否因为：夜间上厕所", "type": "scale", "reversed": False},
    {"id": 8, "text": "过去一个月，你是否因为：呼吸不畅", "type": "scale", "reversed": False},
    {"id": 9, "text": "过去一个月，你是否因为：咳嗽或鼾声高", "type": "scale", "reversed": False},
    {"id": 10, "text": "过去一个月，你是否因为：感觉冷", "type": "scale", "reversed": False},
    {"id": 11, "text": "过去一个月，你是否因为：感觉热", "type": "scale", "reversed": False},
    {"id": 12, "text": "过去一个月，你是否因为：做噩梦", "type": "scale", "reversed": False},
    {"id": 13, "text": "过去一个月，你是否因为：疼痛不适", "type": "scale", "reversed": False},
    {"id": 14, "text": "过去一个月，你用药物帮助睡眠的情况？", "type": "select", "options": [
        {"score": 0, "label": "无"}, {"score": 1, "label": "<1次/周"},
        {"score": 2, "label": "1-2次/周"}, {"score": 3, "label": "≥3次/周"}]},
    {"id": 15, "text": "过去一个月，你白天感到困倦影响做事的程度？", "type": "select", "options": [
        {"score": 0, "label": "没有"}, {"score": 1, "label": "偶尔"},
        {"score": 2, "label": "有时"}, {"score": 3, "label": "经常"}]},
]
PSQI_SCALE_OPTIONS = [
    {"score": 0, "label": "没有"},
    {"score": 1, "label": "<1次/周"},
    {"score": 2, "label": "1-2次/周"},
    {"score": 3, "label": "≥3次/周"},
]
PSQI_SCORING = {
    "method": "sum",
    "levels": [
        {"range": [0, 5], "label": "睡眠质量良好", "description": "你的睡眠状况良好，继续保持健康的睡眠习惯。", "color": "#3b8b7a"},
        {"range": [5, 8], "label": "睡眠质量一般", "description": "你的睡眠质量有改善空间，建议关注睡眠卫生。", "color": "#d4a853"},
        {"range": [8, 15], "label": "睡眠质量较差", "description": "你的睡眠存在明显问题，建议咨询睡眠专科医生。", "color": "#c4554d"},
        {"range": [15, 21], "label": "睡眠质量严重受损", "description": "你的睡眠严重受损，强烈建议尽快就医。", "color": "#c4554d"},
    ],
}

# ═══════════════════════════════════════════════════════════
# CD-RISC 心理弹性量表简版 (Campbell-Sills & Stein, 2007)
# 10 items, 0-4 Likert
# ═══════════════════════════════════════════════════════════
CDRISC_QUESTIONS = [
    {"id": 1, "text": "我能够适应变化", "reversed": False},
    {"id": 2, "text": "无论发生什么我都能应付", "reversed": False},
    {"id": 3, "text": "我能看到事情幽默的一面", "reversed": False},
    {"id": 4, "text": "应对压力使我感到有力量", "reversed": False},
    {"id": 5, "text": "在生病或困难时期，我能恢复过来", "reversed": False},
    {"id": 6, "text": "我能实现自己的目标，尽管有障碍", "reversed": False},
    {"id": 7, "text": "在压力下，我能够集中注意力并清晰思考", "reversed": False},
    {"id": 8, "text": "我不会因失败而气馁", "reversed": False},
    {"id": 9, "text": "我认为自己是个坚强的人", "reversed": False},
    {"id": 10, "text": "我能处理不愉快的情绪", "reversed": False},
]
CDRISC_OPTIONS = [
    {"score": 0, "label": "完全不符合"},
    {"score": 1, "label": "很少符合"},
    {"score": 2, "label": "有时符合"},
    {"score": 3, "label": "经常符合"},
    {"score": 4, "label": "几乎总是符合"},
]
CDRISC_SCORING = {
    "method": "sum",
    "levels": [
        {"range": [0, 20], "label": "弹性较低", "description": "你目前的心理弹性较低。这不代表软弱——每个人都需要时间成长。建议从正念冥想和小目标开始练习。", "color": "#c4554d"},
        {"range": [20, 30], "label": "弹性中等", "description": "你有不错的应对能力，但仍有提升空间。遇到压力时记得调用你已有的资源。", "color": "#d4a853"},
        {"range": [30, 40], "label": "弹性较强", "description": "你具备良好的心理弹性，能在逆境中保持稳定和成长。你是自己的白龙。", "color": "#3b8b7a"},
    ],
}

# ═══════════════════════════════════════════════════════════
# SCL-90 症状自评简版 (9因子 × 4题 = 36题)
# ═══════════════════════════════════════════════════════════
SCL90_QUESTIONS = [
    {"id": 1, "text": "头痛", "factor": "somatization"},
    {"id": 2, "text": "神经过敏，心中不踏实", "factor": "anxiety"},
    {"id": 3, "text": "头脑中有不必要的想法或字句盘旋", "factor": "obsessive_compulsive"},
    {"id": 4, "text": "头昏或昏倒", "factor": "somatization"},
    {"id": 5, "text": "对异性的兴趣减退", "factor": "depression"},
    {"id": 6, "text": "对旁人责备求全", "factor": "hostility"},
    {"id": 7, "text": "感到别人能控制你的思想", "factor": "paranoid_ideation"},
    {"id": 8, "text": "责怪别人制造麻烦", "factor": "hostility"},
    {"id": 9, "text": "忘记性大", "factor": "obsessive_compulsive"},
    {"id": 10, "text": "担心自己的衣饰整齐及仪态的端正", "factor": "obsessive_compulsive"},
    {"id": 11, "text": "容易烦恼和激动", "factor": "hostility"},
    {"id": 12, "text": "胸痛", "factor": "somatization"},
    {"id": 13, "text": "害怕空旷的场所或街道", "factor": "phobic_anxiety"},
    {"id": 14, "text": "感到自己的精力下降，活动减慢", "factor": "depression"},
    {"id": 15, "text": "想结束自己的生命", "factor": "depression", "crisis": True},
    {"id": 16, "text": "听到旁人听不到的声音", "factor": "psychoticism"},
    {"id": 17, "text": "发抖", "factor": "anxiety"},
    {"id": 18, "text": "感到大多数人都不可信任", "factor": "paranoid_ideation"},
    {"id": 19, "text": "胃口不好", "factor": "depression"},
    {"id": 20, "text": "容易哭泣", "factor": "depression"},
    {"id": 21, "text": "感到孤独", "factor": "interpersonal_sensitivity"},
    {"id": 22, "text": "感到苦闷", "factor": "depression"},
    {"id": 23, "text": "过分担忧", "factor": "anxiety"},
    {"id": 24, "text": "对事物不感兴趣", "factor": "depression"},
    {"id": 25, "text": "感到害怕", "factor": "anxiety"},
    {"id": 26, "text": "我的感情容易受到伤害", "factor": "interpersonal_sensitivity"},
    {"id": 27, "text": "感到人们对我不友好，不喜欢我", "factor": "interpersonal_sensitivity"},
    {"id": 28, "text": "做事必须做得很慢以保证做得正确", "factor": "obsessive_compulsive"},
    {"id": 29, "text": "心跳得很厉害", "factor": "anxiety"},
    {"id": 30, "text": "恶心或胃部不舒服", "factor": "somatization"},
    {"id": 31, "text": "感到比不上他人", "factor": "interpersonal_sensitivity"},
    {"id": 32, "text": "肌肉酸痛", "factor": "somatization"},
    {"id": 33, "text": "感到有人在监视你、谈论你", "factor": "paranoid_ideation"},
    {"id": 34, "text": "难以入睡", "factor": "anxiety"},
    {"id": 35, "text": "做事必须反复检查", "factor": "obsessive_compulsive"},
    {"id": 36, "text": "感到任何事情都很困难", "factor": "depression"},
]
SCL90_OPTIONS = [
    {"score": 1, "label": "没有"},
    {"score": 2, "label": "很轻"},
    {"score": 3, "label": "中等"},
    {"score": 4, "label": "偏重"},
    {"score": 5, "label": "严重"},
]
SCL90_FACTORS = {
    "somatization": {"name": "躯体化", "desc": "反映身体不适感，包括心血管、胃肠道、呼吸等系统的主诉不适"},
    "obsessive_compulsive": {"name": "强迫症状", "desc": "反映明知没有必要但又无法摆脱的无意义想法和行为"},
    "interpersonal_sensitivity": {"name": "人际关系敏感", "desc": "反映人际交往中的不自在与自卑感"},
    "depression": {"name": "抑郁", "desc": "反映苦闷、兴趣减退、动力缺乏等抑郁相关体验"},
    "anxiety": {"name": "焦虑", "desc": "反映烦躁、紧张、担忧等焦虑相关体验"},
    "hostility": {"name": "敌对", "desc": "反映愤怒、攻击性和易激惹等情绪"},
    "phobic_anxiety": {"name": "恐怖", "desc": "反映对特定对象或情境的恐惧回避"},
    "paranoid_ideation": {"name": "偏执", "desc": "反映猜疑、不信任和关系妄想倾向"},
    "psychoticism": {"name": "精神病性", "desc": "反映思维异常和孤立感等精神病性症状"},
}
SCL90_SCORING = {
    "method": "factor_average",
    "factors": SCL90_FACTORS,
    "levels": {
        "default": [
            {"range": [1, 2], "label": "正常", "desc": "该维度没有明显问题。", "color": "#3b8b7a"},
            {"range": [2, 3], "label": "轻度", "desc": "该维度存在轻度偏离，建议关注。", "color": "#d4a853"},
            {"range": [3, 4], "label": "中度", "desc": "该维度存在中度问题，建议寻求专业评估。", "color": "#c4554d"},
            {"range": [4, 5], "label": "重度", "desc": "该维度问题较为严重，请尽快咨询专业医生。", "color": "#c4554d"},
        ],
    },
}

# ═══════════════════════════════════════════════════════════
# Apply to database
# ═══════════════════════════════════════════════════════════

SCALE_DATA = [
    (1, SAS_QUESTIONS, SAS_OPTIONS, SAS_SCORING, "SAS 焦虑自评量表", "请根据你最近一周的实际感受，选择最符合的选项。"),
    (2, SDS_QUESTIONS, SDS_OPTIONS, SDS_SCORING, "SDS 抑郁自评量表", "请根据你最近一周的实际感受，选择最符合的选项。"),
    (3, BFI_QUESTIONS, BFI_OPTIONS, BFI_SCORING, "大五人格简版", "请根据你日常的行为和感受，选择最符合的选项。没有对错之分。"),
    (4, PSQI_QUESTIONS, PSQI_SCALE_OPTIONS, PSQI_SCORING, "匹兹堡睡眠质量指数", "请根据过去一个月的睡眠情况回答。"),
    (5, CDRISC_QUESTIONS, CDRISC_OPTIONS, CDRISC_SCORING, "心理弹性量表", "请根据你通常的应对方式回答。"),
    (6, SCL90_QUESTIONS, SCL90_OPTIONS, SCL90_SCORING, "SCL-90 症状自评", "请根据最近一周（包括今天）的情况回答。"),
]

with Session(engine) as session:
    for assessment_id, questions, options, scoring, name, instructions in SCALE_DATA:
        assessment = session.execute(
            select(Assessment).where(Assessment.id == assessment_id)
        ).scalar_one_or_none()

        if not assessment:
            print(f"⚠ Assessment {assessment_id} ({name}) not found, skipping")
            continue

        # Check if already seeded
        if assessment.questions and len(assessment.questions) > 0:
            print(f"✓ {name}: already has {len(assessment.questions)} questions, skipping")
            continue

        # Format questions with options
        formatted_questions = []
        for q in questions:
            q_data = {"id": q["id"], "text": q["text"]}
            if "reversed" in q:
                q_data["reversed"] = q["reversed"]
            if "dimension" in q:
                q_data["dimension"] = q["dimension"]
            if "factor" in q:
                q_data["factor"] = q["factor"]
            if "crisis" in q:
                q_data["crisis"] = q["crisis"]
            if "type" in q:
                q_data["type"] = q["type"]
                if "options" in q:
                    q_data["options"] = q["options"]
            formatted_questions.append(q_data)

        assessment.questions = formatted_questions
        assessment.scoring_rules = scoring
        assessment.instructions = instructions

        # Add options to scoring rules for frontend
        if not isinstance(assessment.scoring_rules, dict):
            assessment.scoring_rules = {}
        assessment.scoring_rules["options"] = options

        print(f"✅ {name}: {len(formatted_questions)} questions seeded")

    session.commit()
    print(f"\n🎉 All assessment questions seeded!")
