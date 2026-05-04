"""
Module 4 Knowledge Base — Seed Data

Contains categories and articles for the evidence-based psychology knowledge library.
Imported by backend.seed — do not run standalone.
"""

KNOWLEDGE_CATEGORIES = [
    {"name": "焦虑与压力", "slug": "anxiety-stress", "description": "焦虑的本质、类型与管理策略", "icon": "😰", "color": "#c47868", "sort_order": 1},
    {"name": "抑郁与情绪", "slug": "depression-mood", "description": "抑郁的科学、情绪调节与自我关怀", "icon": "🌧️", "color": "#9b8ab8", "sort_order": 2},
    {"name": "睡眠与梦境", "slug": "sleep-dreams", "description": "睡眠科学、梦境理论与优化策略", "icon": "🌙", "color": "#7eb8da", "sort_order": 3},
    {"name": "认知与行为", "slug": "cognition-behavior", "description": "思维模式、行为习惯与改变科学", "icon": "🧠", "color": "#8aaf9d", "sort_order": 4},
    {"name": "人际关系", "slug": "relationships", "description": "依恋、沟通与亲密关系的心理学", "icon": "👥", "color": "#e2b64f", "sort_order": 5},
    {"name": "正念与成长", "slug": "mindfulness-growth", "description": "正念冥想、心理弹性与个人成长", "icon": "🌱", "color": "#8aaf9d", "sort_order": 6},
]

KNOWLEDGE_ARTICLES = [
    # === 焦虑与压力 ===
    {
        "title": "焦虑的大脑：杏仁核如何劫持你的理性",
        "slug": "anxiety-brain-amygdala-hijack",
        "category_slug": "anxiety-stress",
        "summary": "了解焦虑的神经基础——当杏仁核过度激活时，前额叶皮层如何被劫持，以及你可以如何逆转这一过程。",
        "key_concepts": ["杏仁核劫持", "前额叶皮层", "战斗逃跑反应", "情绪命名", "认知重评"],
        "evidence_level": "强",
        "source": "LeDoux JE (2000). Annual Review of Neuroscience. Goldin PR et al. (2008). Biological Psychiatry.",
        "reading_time": 6,
        "is_featured": True,
        "content": (
            "# 焦虑的大脑：杏仁核如何劫持你的理性\n\n"
            "## 杏仁核：大脑的烟雾探测器\n\n"
            "杏仁核（Amygdala）是位于颞叶深处的一对杏仁状结构，体积虽小（约1.5cm³），"
            "却是大脑的情绪中枢总管。它负责：\n"
            "- 快速检测威胁（<100毫秒）\n"
            "- 激活战斗-逃跑-冻结反应\n"
            "- 储存恐惧记忆\n\n"
            "演化上，杏仁核是一个「宁可误报、不可漏报」的警报系统。"
            "在远古大草原上，把树枝误认为蛇只是虚惊一场；把蛇误认为树枝则可能致命。"
            "这一演化遗产，在现代社会却常常过度警报。\n\n"
            "## 前额叶的劫持\n\n"
            "前额叶皮层（PFC）是大脑的CEO——负责理性思考、冲动控制和长远规划。"
            "当杏仁核极度活跃时：\n"
            "- PFC的血流量减少\n"
            "- 理性思考能力下降\n"
            "- 你进入「生存模式」，而非「思考模式」\n\n"
            "这就是为什么在极度焦虑时，你会感觉脑子一片空白——不是你的问题，是你的PFC被暂时下线了。\n\n"
            "## 镜像神经元与焦虑传染\n\n"
            "研究表明（Singer et al., 2004），观察他人焦虑会激活你自己大脑中的相同神经网络。"
            "这就是「焦虑传染」的神经基础——如果你身边的人都焦虑，你的大脑会不自觉地加入。\n\n"
            "## 如何逆转杏仁核劫持\n\n"
            "### 1. 命名即驯服（Name it to Tame it）\n"
            "Lieberman et al. (2007) 发现，仅仅是给情绪贴上标签这一行为，"
            "就能降低杏仁核活动并增强PFC活动。下次焦虑时，试着说：我感到焦虑，因为……\n\n"
            "### 2. 4-7-8 呼吸法\n"
            "延长呼气时间直接激活迷走神经，触发副交感神经系统的放松反应。"
            "吸气4秒、屏息7秒、呼气8秒，重复3-5次。\n\n"
            "### 3. 认知重评（Cognitive Reappraisal）\n"
            "Goldin et al. (2008) 的fMRI研究表明，重新解读压力情境"
            "（这是一个挑战，而非威胁）可显著降低杏仁核活动。\n\n"
            "### 4. 运动\n"
            "30分钟中等强度运动可降低杏仁核对压力的反应性达24小时以上（Zschucke et al., 2015）。\n\n"
            "## 参考文献\n"
            "- LeDoux, J. E. (2000). Emotion circuits in the brain. *Annual Review of Neuroscience.*\n"
            "- Lieberman, M. D., et al. (2007). Putting feelings into words. *Psychological Science.*\n"
            "- Goldin, P. R., et al. (2008). The neural bases of emotion regulation. *Biological Psychiatry.*"
        ),
        "quiz": [
            {
                "question": "杏仁核被称为什么？",
                "options": ["大脑的CEO", "大脑的烟雾探测器", "记忆仓库", "视觉中枢"],
                "answer": 1,
                "explanation": "杏仁核是大脑的情绪警报系统，因其对威胁的快速反应而被比喻为烟雾探测器。",
            },
            {
                "question": "哪种技术被证明可以降低杏仁核活动？",
                "options": ["多喝咖啡", "给情绪贴上标签", "强迫自己不焦虑", "忽视情绪"],
                "answer": 1,
                "explanation": "Lieberman (2007) 发现用语言描述情绪（情绪命名）可降低杏仁核活动并增强前额叶控制。",
            },
        ],
    },
    {
        "title": "广泛性焦虑障碍（GAD）的科学与治疗",
        "slug": "generalized-anxiety-disorder-science",
        "category_slug": "anxiety-stress",
        "summary": "GAD是最常见的焦虑障碍之一，以持续、无法控制的担忧为特征。了解CBT和正念如何有效治疗GAD。",
        "key_concepts": ["广泛性焦虑障碍", "CBT", "认知重构", "正念减压MBSR", "担忧时间"],
        "evidence_level": "强",
        "source": "Hofmann SG et al. (2012). Cognitive Therapy and Research.",
        "reading_time": 7,
        "is_featured": True,
        "content": (
            "# 广泛性焦虑障碍（GAD）的科学与治疗\n\n"
            "## 什么是GAD？\n\n"
            "广泛性焦虑障碍（Generalized Anxiety Disorder）影响全球约3-6%的人口。核心特征是：\n\n"
            "- 对多种事件或活动过度、难以控制的担忧\n"
            "- 持续至少6个月\n"
            "- 伴随至少3项：坐立不安、易疲劳、注意力不集中、易怒、肌肉紧张、睡眠障碍\n\n"
            "## GAD的神经基础\n\n"
            "神经影像学研究（Etkin et al., 2009）发现GAD患者：\n"
            "- 杏仁核对中性刺激也过度反应\n"
            "- 前额叶对杏仁核的自上而下调控减弱\n"
            "- 默认模式网络（DMN）过度活跃——表现为反刍思维\n\n"
            "## CBT：金标准治疗\n\n"
            "### 核心组件\n"
            "1. **心理教育**：理解担忧的机制——担忧不是现实预演，而是情绪回避\n"
            "2. **认知重构**：识别和挑战灾难化思维\n"
            "3. **行为实验**：故意体验担忧的情境，发现预期的灾难并未发生\n"
            "4. **担忧时间**：每天指定15分钟担忧时段，其他时间的担忧推迟处理\n\n"
            "### 疗效数据\n"
            "Hofmann et al. (2012) 的元分析（269项研究）显示CBT对焦虑障碍的效应值d=0.73。"
        ),
        "quiz": [
            {
                "question": "GAD的核心特征是什么？",
                "options": ["特定恐惧", "反复做同一件事", "对多种事件过度、难以控制的担忧", "社交回避"],
                "answer": 2,
                "explanation": "GAD的核心是对多种生活事件的过度、弥散性担忧，持续至少6个月。",
            },
            {
                "question": "CBT治疗GAD的哪个技术最独特？",
                "options": ["暴露疗法", "担忧时间（worry time）", "催眠", "自由联想"],
                "answer": 1,
                "explanation": "担忧时间是CBT治疗GAD的特色技术——每天预留固定时间处理担忧，其他时间把担忧推迟。",
            },
        ],
    },
    # === 抑郁与情绪 ===
    {
        "title": "抑郁不仅仅是「不开心」——理解抑郁的多维面孔",
        "slug": "depression-beyond-sadness",
        "category_slug": "depression-mood",
        "summary": "抑郁是一种复杂的生物-心理-社会现象。了解认知三联征、行为激活和神经炎症假说，重新理解抑郁。",
        "key_concepts": ["贝克认知三联征", "行为激活(BA)", "神经炎症假说", "自我关怀"],
        "evidence_level": "强",
        "source": "Dimidjian S et al. (2006). Journal of Consulting and Clinical Psychology.",
        "reading_time": 7,
        "is_featured": True,
        "content": (
            "# 抑郁不仅仅是「不开心」\n\n"
            "## 贝克认知三联征\n\n"
            "Aaron Beck（认知疗法创始人）提出抑郁者的三个核心信念：\n\n"
            "1. **对自己**：我是无能/不值得的\n"
            "2. **对世界**：世界是充满敌意/不公平的\n"
            "3. **对未来**：未来是无望的\n\n"
            "这三者形成互相强化闭环。\n\n"
            "## 行为激活：做起来，感觉就会改变\n\n"
            "当人抑郁时，通常会减少活动（卧床、不出门）——活动减少→正性强化减少→情绪更差→继续退缩。\n"
            "BA通过反向操作打破循环：即使不想做，也先做一点点。\n\n"
            "Dimidjian et al. (2006) 将241名重度抑郁症患者随机分为BA组、CBT组、药物组和安慰剂组。结果：\n"
            "- BA组的疗效与药物组相当\n"
            "- BA组对重度抑郁的效果优于CBT组\n\n"
            "## 抑郁症的炎症假说\n\n"
            "- 抑郁症患者血液中促炎因子（IL-6, TNF-α, CRP）显著升高\n"
            "- 炎症刺激（如注射IFN-α）可引发抑郁症状\n"
            "- 抗炎药物对部分抑郁患者有辅助疗效\n\n"
            "## 自我关怀的三步法\n\n"
            "1. **正念**：承认我此刻在受苦——不加评判\n"
            "2. **共通人性**：理解不是只有我一个人有这种感受\n"
            "3. **自我善意**：像对待朋友一样对待自己"
        ),
        "quiz": [
            {
                "question": "贝克认知三联征不包括哪个？",
                "options": ["对自我的负面看法", "对世界的负面看法", "对他人的负面看法", "对未来的负面看法"],
                "answer": 2,
                "explanation": "贝克三联征是：对自我、对世界、对未来的负面看法。",
            },
            {
                "question": "Dimidjian (2006) 发现行为激活对重度抑郁症的效果如何？",
                "options": ["无效", "比CBT更好", "与抗抑郁药相当", "只对轻度有效"],
                "answer": 2,
                "explanation": "里程碑RCT显示，BA与药物组疗效相当，且对重度抑郁的效果优于CBT。",
            },
        ],
    },
    # === 睡眠与梦境 ===
    {
        "title": "REM睡眠：夜间情绪治疗师",
        "slug": "rem-sleep-emotional-therapy",
        "category_slug": "sleep-dreams",
        "summary": "Matthew Walker提出REM睡眠是夜间情绪治疗师的理论——它如何帮助我们从痛苦记忆中剥离情绪？",
        "key_concepts": ["REM睡眠", "情绪剥离", "去甲肾上腺素", "PTSD与睡眠"],
        "evidence_level": "强",
        "source": "Walker MP & van der Helm E (2009). Annals of the NYAS.",
        "reading_time": 6,
        "is_featured": True,
        "content": (
            "# REM睡眠：夜间情绪治疗师\n\n"
            "## Walker的「睡前-睡后」法则\n\n"
            "Matthew Walker提出：REM睡眠就像一个夜间心理治疗师，"
            "它帮助我们将痛苦记忆中的情绪刺痛剥离，保留信息的认知要点。\n\n"
            "## 去甲肾上腺素的魔术\n\n"
            "REM睡眠期间，大脑中去甲肾上腺素完全停止释放。"
            "去甲肾上腺素是压力的化学信使——它在REM中的消失创造了一个独特的无压力窗口。\n\n"
            "## 实验证据\n\n"
            "Walker et al. (2009) 的fMRI实验：\n"
            "- 受试者在睡前观看情绪性图片\n"
            "- 一组正常睡眠，一组睡眠剥夺\n"
            "- 12小时后：睡眠组的杏仁核对图片的情绪反应下降40%\n"
            "- 睡眠剥夺组的杏仁核反应反而增强\n\n"
            "## PTSD与REM睡眠\n\n"
            "PTSD患者的一个显著特征：REM睡眠片段化。"
            "在REM中反复惊醒使得情绪剥离过程被打断。\n\n"
            "这解释了PTSD的核心机制：\n"
            "1. 创伤 → REM睡眠被打断\n"
            "2. REM不足 → 记忆的情绪不被处理\n"
            "3. 情绪不被处理 → 闪回和过度警觉\n\n"
            "## 优化你的REM睡眠\n\n"
            "1. 睡足7-9小时：REM集中在睡眠的后半夜\n"
            "2. 避免酒精：酒精抑制REM睡眠\n"
            "3. 恒温19°C：凉爽环境有利于REM的启动\n"
            "4. 规律作息：固定的起床时间是稳定REM节律的最强锚点"
        ),
        "quiz": [
            {
                "question": "REM睡眠中哪种神经递质完全停止释放？",
                "options": ["多巴胺", "血清素", "去甲肾上腺素", "乙酰胆碱"],
                "answer": 2,
                "explanation": "REM睡眠期间去甲肾上腺素完全停止——这创造了独特的无压力窗口，使情绪记忆得以安全处理。",
            },
            {
                "question": "PTSD与REM睡眠的关系是什么？",
                "options": ["PTSD患者REM过度增加", "PTSD患者的REM睡眠片段化", "两者无关", "PTSD患者不做梦"],
                "answer": 1,
                "explanation": "PTSD的核心问题之一是REM睡眠被打断，导致情绪处理不完整。",
            },
        ],
    },
    # === 认知与行为 ===
    {
        "title": "认知行为疗法（CBT）核心原理",
        "slug": "cbt-core-principles",
        "category_slug": "cognition-behavior",
        "summary": "CBT是循证心理治疗的黄金标准——理解情境-思维-情绪-行为的循环，掌握5个核心工具。",
        "key_concepts": ["ABC模型", "认知扭曲", "思维记录", "苏格拉底式提问"],
        "evidence_level": "强",
        "source": "Beck AT (1979). Cognitive Therapy of Depression.",
        "reading_time": 8,
        "is_featured": True,
        "content": (
            "# 认知行为疗法（CBT）核心原理\n\n"
            "## 认知模型\n\n"
            "CBT的核心公式：**不是事件本身困扰你，而是你对事件的解读**\n\n"
            "A（触发事件） → B（信念/解读） → C（情绪和行为后果）\n\n"
            "事件相同，信念不同，结果就不同。\n\n"
            "## 常见的认知扭曲\n\n"
            "David Burns总结了10种常见的认知扭曲：\n\n"
            "1. 全或无思维：如果我不是完美的，我就是失败者\n"
            "2. 过度概括：这次失败了，我以后做什么都不会成功\n"
            "3. 心理滤镜：只关注负面细节，忽略整个画面\n"
            "4. 贬低积极面：那只是运气好，不代表我有能力\n"
            "5. 妄下结论：读心术 + 预测未来\n"
            "6. 放大或缩小：把小问题放大成灾难\n"
            "7. 情绪推理：我感觉很糟，所以事情一定很糟\n"
            "8. 应该陈述：我应该做得更好，他不应该那样对我\n"
            "9. 标签化：我是个loser，而不是我这次没做好\n"
            "10. 个人化：把不属于自己责任的事情归咎于自己\n\n"
            "## 5个核心CBT工具\n\n"
            "### 1. 思维记录表\n"
            "写下：情境 → 自动化思维 → 情绪 → 证据（支持/反对）→ 替代性思维 → 新情绪\n\n"
            "### 2. 行为实验\n"
            "设计一个小实验来测试你的信念。\n\n"
            "### 3. 苏格拉底式提问\n"
            "- 有证据支持这个想法吗？\n"
            "- 有其他可能的解释吗？\n"
            "- 如果朋友有这种想法，我会对他说什么？\n\n"
            "### 4. 暴露疗法\n"
            "逐步面对恐惧而非回避——每次面对，焦虑曲线会自然下降。\n\n"
            "### 5. 行为激活\n"
            "先行动，再感觉——不要等待感觉好才行动。"
        ),
        "quiz": [
            {
                "question": "CBT的核心公式是？",
                "options": ["A→B→C", "S→R", "P→C", "E→I→E"],
                "answer": 0,
                "explanation": "A（触发事件）→ B（信念/解读）→ C（情绪和行为后果）。不是事件本身，而是你对事件的解读造成了情绪。",
            },
            {
                "question": "以下哪个不是认知扭曲？",
                "options": ["全或无思维", "过度概括", "认知重构", "情绪推理"],
                "answer": 2,
                "explanation": "认知重构是CBT的治疗技术，用于挑战和替代扭曲思维——它不是认知扭曲，而是治疗方法。",
            },
        ],
    },
    {
        "title": "斯坦福棉花糖实验与延迟满足的真相",
        "slug": "marshmallow-test-delayed-gratification",
        "category_slug": "cognition-behavior",
        "summary": "2018年的重复实验颠覆了经典结论——延迟满足的能力可能更多取决于环境而非性格特质。",
        "key_concepts": ["棉花糖实验", "延迟满足", "可重复性危机", "信任vs自制力"],
        "evidence_level": "中等",
        "source": "Watts TW et al. (2018). Psychological Science.",
        "reading_time": 5,
        "is_featured": False,
        "content": (
            "# 斯坦福棉花糖实验与延迟满足的真相\n\n"
            "## 原始实验（1970）\n\n"
            "Walter Mischel在斯坦福的Bing幼儿园进行了著名的棉花糖实验：\n"
            "- 4-6岁的孩子面前放一块棉花糖\n"
            "- 你可以现在吃，也可以等我回来，那时你可以得到两块\n"
            "- 约1/3的孩子成功等待了15分钟\n\n"
            "Mischel追踪这些孩子多年，发现等待时间越长的人SAT分数越高（平均高出210分）。\n\n"
            "## 颠覆性的重复实验（2018）\n\n"
            "Tyler Watts重新设计了实验：样本量是原始的10倍（900+儿童），控制了社会经济地位。\n\n"
            "### 关键发现\n"
            "1. 控制SES后，棉花糖等待时间与长期成就的关联消失了\n"
            "2. 来自可靠环境的孩子更愿意等待——他们相信等一等真的会有第二块\n"
            "3. 来自不稳定环境的孩子选择现在吃——这是一种理性适应\n\n"
            "## 深层启示\n\n"
            "棉花糖实验测的不是意志力，而是信任。\n\n"
            "如果一个孩子在生活中经常遇到承诺不兑现的情况，那么现在吃了至少有一块是理性的选择。\n"
            "这不是性格缺陷——这是环境塑造的生存策略。"
        ),
        "quiz": [
            {
                "question": "2018年重复实验的关键发现是什么？",
                "options": ["棉花糖实验完全正确", "控制SES后，等待时间与长期成就的关联消失了", "棉花糖实验只对男孩有效", "什么都不变"],
                "answer": 1,
                "explanation": "Watts (2018) 发现当控制社会经济地位后，棉花糖等待时间和SAT分数的关联几乎消失。",
            },
            {
                "question": "最新解读认为棉花糖实验实际上测的是什么？",
                "options": ["智力", "意志力", "信任", "食欲"],
                "answer": 2,
                "explanation": "来自可靠环境的孩子更愿意等待——这测的是信任，不是意志力。",
            },
        ],
    },
    # === 人际关系 ===
    {
        "title": "依恋理论：你与亲密关系的操作系统",
        "slug": "attachment-theory-operating-system",
        "category_slug": "relationships",
        "summary": "John Bowlby的依恋理论解释了为什么我们在亲密关系中有不同的反应模式——安全型、焦虑型、回避型。",
        "key_concepts": ["依恋理论", "安全型", "焦虑型", "回避型", "获得性安全"],
        "evidence_level": "强",
        "source": "Bowlby J (1969). Attachment and Loss. Ainsworth MDS (1978). Patterns of Attachment.",
        "reading_time": 7,
        "is_featured": True,
        "content": (
            "# 依恋理论\n\n"
            "## Bowlby的洞见\n\n"
            "John Bowlby在观察到二战孤儿院儿童后提出：婴儿对主要照顾者的依恋是一种与生俱来的生存本能。\n\n"
            "## 四种依恋模式\n\n"
            "### 安全型（约60%）\n"
            "- 信任他人，既不过度依赖也不过度独立\n"
            "- 形成条件：照顾者持续响应、可预测、温暖\n\n"
            "### 焦虑型（约20%）\n"
            "- 担心伴侣不爱自己，需要频繁确认\n"
            "- 形成条件：照顾者响应时有时无、不可预测\n\n"
            "### 回避型（约20%）\n"
            "- 强调独立，难以信任和亲密\n"
            "- 形成条件：照顾者持续拒绝或不响应\n\n"
            "### 混乱型（约5-10%）\n"
            "- 无组织的应对策略\n"
            "- 通常与童年创伤或虐待有关\n\n"
            "## 依恋不是命运\n\n"
            "依恋模式可以改变：\n"
            "1. 获得性安全：一段稳定的安全关系可以在2-5年内改变依恋风格\n"
            "2. 自我反思和治疗：理解自己的依恋策略，做出不同的选择\n"
            "3. 意识是关键：知道自己倾向于焦虑或回避，已经是改变的第一步"
        ),
        "quiz": [
            {
                "question": "陌生情境实验中，安全型婴儿约占多少？",
                "options": ["10%", "30%", "60%", "90%"],
                "answer": 2,
                "explanation": "约60%的婴儿表现安全型依恋——妈妈离开时不安，回来时主动寻求安慰。",
            },
            {
                "question": "依恋风格可以改变吗？",
                "options": ["完全不能改变", "只能通过药物改变", "可以通过稳定的关系或治疗改变", "成年后自动改变"],
                "answer": 2,
                "explanation": "获得性安全可以通过一段稳定的安全关系或治疗在2-5年内实现。",
            },
        ],
    },
    {
        "title": "非暴力沟通：说需要，不说评判",
        "slug": "nonviolent-communication",
        "category_slug": "relationships",
        "summary": "Marshall Rosenberg的NVC框架：观察-感受-需要-请求。一种不攻击、不退缩、不伪装的沟通方式。",
        "key_concepts": ["非暴力沟通NVC", "观察vs评判", "感受vs想法", "需要vs策略"],
        "evidence_level": "中等",
        "source": "Rosenberg MB (2003). Nonviolent Communication.",
        "reading_time": 6,
        "is_featured": False,
        "content": (
            "# 非暴力沟通\n\n"
            "## NVC的四个步骤\n\n"
            "Marshall Rosenberg开发的非暴力沟通（NVC）框架：\n\n"
            "### 1. 观察（不加评判）\n"
            "- ❌ 你总是迟到！（评判）\n"
            "- ✅ 这是我们第三次约定的时间，你晚了20分钟。（观察）\n\n"
            "### 2. 感受（而非想法）\n"
            "- ❌ 我觉得你不在乎我。（想法——对他人动机的揣测）\n"
            "- ✅ 我感到难过和孤单。（感受）\n\n"
            "### 3. 需要（而非策略）\n"
            "- ❌ 我需要你每天给我打电话。（策略——规定了怎么做）\n"
            "- ✅ 我需要连接感和重要性。（需要——驱动策略的内在价值）\n\n"
            "### 4. 请求（而非命令）\n"
            "- ❌ 你必须……（命令）\n"
            "- ✅ 你愿意……吗？（请求）\n\n"
            "## 完整示例\n\n"
            "常见版本：你总是沉迷手机！根本不关心我！\n\n"
            "NVC版本：过去30分钟你一直在看手机（观察），我感到孤单（感受），"
            "因为我需要一些连接（需要）。你愿意接下来的20分钟我们聊聊吗？（请求）\n\n"
            "## 为什么不直接说？\n\n"
            "- 指责触发防御——对方立刻进入战斗模式\n"
            "- 说需要邀请共情——对方的大脑更容易产生合作意愿"
        ),
        "quiz": [
            {
                "question": "NVC四步骤的正确顺序是什么？",
                "options": ["感受→需要→观察→请求", "观察→感受→需要→请求", "请求→观察→需要→感受", "需要→请求→观察→感受"],
                "answer": 1,
                "explanation": "NVC框架：观察→感受→需要→请求。先描述事实，再表达感受，说出内在需要，最后提出具体请求。",
            },
        ],
    },
    # === 正念与成长 ===
    {
        "title": "正念冥想如何改变大脑——8周的结构性改变",
        "slug": "mindfulness-brain-changes-8-weeks",
        "category_slug": "mindfulness-growth",
        "summary": "哈佛的Sara Lazar用MRI扫描发现：8周正念减压（MBSR）可增加海马体灰质密度，缩小杏仁核。",
        "key_concepts": ["MBSR", "海马体", "杏仁核缩小", "神经可塑性"],
        "evidence_level": "强",
        "source": "Hölzel BK, Lazar SW et al. (2011). Psychiatry Research: Neuroimaging.",
        "reading_time": 6,
        "is_featured": False,
        "content": (
            "# 正念冥想如何改变大脑\n\n"
            "## Lazar的里程碑研究（2011）\n\n"
            "哈佛医学院的Sara Lazar进行了第一个证实正念冥想导致大脑结构变化的RCT：\n\n"
            "- 16名受试者接受标准的8周MBSR训练\n"
            "- 17名对照组在等待名单上\n"
            "- 所有人在前后都进行了结构MRI扫描\n\n"
            "### 结果：4个可测量的大脑变化\n\n"
            "1. **海马体灰质增加**：学习和记忆的关键结构，情绪调节的重要脑区\n"
            "2. **杏仁核灰质减少**：压力警报中心的体积缩小——对压力的反应不那么剧烈\n"
            "3. **颞顶联合区增加**：与共情和观点采纳相关\n"
            "4. **后扣带回活动变化**：减少走神和反刍思维\n\n"
            "## 这不是「放下」，这是「训练」\n\n"
            "你不是在清空大脑——你在观察大脑。\n"
            "你不是在停止思考——你在觉察思考。\n"
            "每一次注意到走神并带回来，都是一次注意力的俯卧撑。\n\n"
            "## 冥想的剂量效应\n\n"
            "- 每天10-20分钟，8周后出现可测量的变化\n"
            "- 持续性是关键——停止练习后，大脑变化可能回退\n\n"
            "## 实践指引\n"
            "1. 从每天5分钟开始\n"
            "2. 固定时间和地点\n"
            "3. 使用引导音频降低门槛\n"
            "4. 耐心——大脑的改变需要时间"
        ),
        "quiz": [
            {
                "question": "8周MBSR对大脑的哪个结构产生灰质增加？",
                "options": ["杏仁核", "海马体", "小脑", "脑干"],
                "answer": 1,
                "explanation": "Lazar (2011) 发现8周MBSR后海马体灰质密度增加，杏仁核灰质减少。",
            },
            {
                "question": "冥想的核心是什么？",
                "options": ["完全停止思考", "观察大脑活动并觉察走神", "强迫集中注意力", "进入催眠状态"],
                "answer": 1,
                "explanation": "冥想不是清空大脑，而是观察大脑——每次注意到走神并温柔地带回来，都是一次注意力的训练。",
            },
        ],
    },
]
