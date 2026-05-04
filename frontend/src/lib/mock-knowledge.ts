// Knowledge Base Mock Data — 6 categories × 6 articles with full content + quiz
// Uses template literals for article content (clean, no escaping issues)

export const MOCK_KNOWLEDGE_CATEGORIES = [
  { id: 1, name: 'CBT 认知行为', slug: 'cbt', description: '认知行为疗法——改变思维，改变感受', icon: '\u{1F9E0}', color: '#e8a820' },
  { id: 2, name: '正念与冥想', slug: 'mindfulness', description: '当下的力量——注意力的科学', icon: '\u{1F9D8}', color: '#6b9e7a' },
  { id: 3, name: '依恋理论', slug: 'attachment', description: '从摇篮到坟墓——关系如何塑造我们', icon: '\u{1F49E}', color: '#c0392b' },
  { id: 4, name: '神经科学', slug: 'neuroscience', description: '大脑如何塑造心智', icon: '\u{1F52C}', color: '#4a90b8' },
  { id: 5, name: '积极心理学', slug: 'positive', description: '不只是修复问题——发现什么让人生值得活', icon: '\u2728', color: '#8b7ab8' },
  { id: 6, name: '睡眠科学', slug: 'sleep', description: '理解睡眠，理解心理健康', icon: '\u{1F319}', color: '#1e8568' },
];

export const MOCK_KNOWLEDGE_ARTICLES = [
  // ═══════════════ Article 1: CBT ═══════════════
  {
    id: 1, title: '认知行为疗法（CBT）入门', slug: 'cbt-intro',
    summary: 'CBT是当今循证心理治疗的金标准，核心思想是：情绪困扰源于功能失调的思维模式。通过识别和挑战自动负性思维，重建适应性行为。',
    key_concepts: ['自动负性思维', '认知三角', '行为激活', '苏格拉底式提问'],
    evidence_level: '强', reading_time: 8, is_featured: true,
    category_slug: 'cbt',
    content: `## 什么是认知行为疗法？

认知行为疗法（Cognitive Behavioral Therapy, CBT）由 Aaron Beck 于 1960 年代创立，是当今世界上循证证据最充分的心理治疗方法之一。

### 核心假设

CBT 的核心假设可以用一个简单的三角来解释：

**思想 ↔ 情绪 ↔ 行为**

三者相互影响、相互强化。

### 自动负性思维

自动负性思维（Automatic Negative Thoughts, ANTs）是不请自来、一闪而过的消极想法：

- **全或无思维**："如果我不是第一名，我就是失败者"
- **灾难化**："我这次演讲出了小错，职业生涯完了"
- **过度泛化**："他拒绝了我的邀请，没有人喜欢我"
- **情绪推理**："我感到焦虑，所以一定有危险"

### 技术工具箱

1. **苏格拉底式提问**：温和地质疑负性思维的证据
2. **认知重构**：用更加平衡、现实的视角替代扭曲思维
3. **行为激活**：通过增加愉快活动来对抗抑郁
4. **暴露疗法**：在安全环境中逐步面对恐惧

### 疗效证据

超过 2000 项随机对照试验支持 CBT 的有效性：抑郁症、焦虑障碍、强迫症、进食障碍、失眠（CBT-I）、慢性疼痛。

> "改变你的想法，就能改变你的世界。"`,
    source: 'Beck, A. T. (1979). Cognitive Therapy of Depression. Guilford Press.',
    quiz: [
      { question: 'CBT的核心三角不包括以下哪项？', options: ['思想', '情绪', '行为', '人格'], correct: 3, explanation: 'CBT的核心三角是思想、情绪和行为。人格虽然相关，但不是CBT理论模型的直接组成部分。' },
      { question: '以下哪项不是认知扭曲？', options: ['全或无思维', '苏格拉底式提问', '灾难化', '情绪推理'], correct: 1, explanation: '苏格拉底式提问是治疗技术，不是认知扭曲。它是用来解构认知扭曲的方法。' },
      { question: 'CBT对以下哪个问题的疗效证据最弱？', options: ['抑郁症', '焦虑障碍', '失眠', '精神分裂症急性期'], correct: 3, explanation: 'CBT对抑郁、焦虑、失眠都有强证据支持。精神分裂症急性期需要药物治疗为主。' },
    ]
  },
  // ═══════════════ Article 2: MBSR ═══════════════
  {
    id: 2, title: '正念减压（MBSR）的科学基础', slug: 'mbsr-science',
    summary: 'Jon Kabat-Zinn于1979年开发的8周正念减压课程，已被数百项研究证实对焦虑、抑郁、慢性疼痛有显著效果。',
    key_concepts: ['不评判的觉察', '活在当下', '接纳', '初学者之心'],
    evidence_level: '强', reading_time: 10, is_featured: true,
    category_slug: 'mindfulness',
    content: `## 正念的定义

正念（Mindfulness）被 Jon Kabat-Zinn 定义为："有意识地、不加评判地、关注当下的觉察。"

### 三个核心要素

1. **有意识的**：不是自动导航，而是主动选择注意力的方向
2. **关注当下**：不沉溺于过去，不担忧未来
3. **不加评判**：觉察到评判时，也不评判自己的评判

### MBSR 的八个核心练习

1. **身体扫描**：从头顶到脚趾，逐段觉察身体感受
2. **正念呼吸**：将呼吸作为锚点，训练注意力
3. **正念行走**：在日常生活中练习觉察
4. **正念瑜伽**：将正念融入温和的身体运动
5. **静坐冥想**：观察念头来了又走
6. **正念进食**：用葡萄干等食物练习全然地吃
7. **慈心冥想**：培养对自己的善意
8. **日常生活中的正念**：刷牙、洗碗都可以是练习

### 神经科学证据

- 8周 MBSR 后，**杏仁核灰质密度降低**（焦虑中枢变小）
- **前额叶皮层增厚**（理性判断和情绪调节能力增强）
- **海马体灰质增加**（记忆和情绪调节改善）
- **默认模式网络活动降低**（走神和自我参照思维减少）`,
    source: 'Kabat-Zinn, J. (1990). Full Catastrophe Living. Delta.',
    quiz: [
      { question: '正念的三个核心要素不包括？', options: ['有意识的', '关注当下', '不加评判', '积极思考'], correct: 3, explanation: '积极思考不是正念的核心要素。正念强调觉察和接纳，而非主动改变思维内容。' },
      { question: '8周MBSR训练后，大脑哪个区域活动增加？', options: ['杏仁核', '前额叶皮层', '小脑', '脑干'], correct: 1, explanation: '前额叶皮层负责执行功能和情绪调节，正念训练可增强其活动和结构。' },
      { question: 'MBCT主要设计用于什么目的？', options: ['治疗急性抑郁症', '预防抑郁复发', '治疗精神分裂症', '提升运动表现'], correct: 1, explanation: 'MBCT（正念认知疗法）主要设计用于预防有复发性抑郁史的人的抑郁复发。' },
    ]
  },
  // ═══════════════ Article 3: Attachment ═══════════════
  {
    id: 3, title: '依恋理论：从童年到成年', slug: 'attachment-theory',
    summary: 'Bowlby和Ainsworth的依恋理论揭示了早期亲子关系如何塑造终身的人际模式。四种依恋风格影响我们的亲密关系、情绪调节和压力应对。',
    key_concepts: ['安全基地', '内部工作模型', '依恋风格', '陌生情境实验'],
    evidence_level: '强', reading_time: 8, is_featured: false,
    category_slug: 'attachment',
    content: `## 依恋理论的起源

John Bowlby 在二战后的孤儿院研究中发现：与母亲分离的儿童表现出可预测的三阶段反应——抗议、绝望、疏离。

### 陌生情境实验

Ainsworth 的"陌生情境"实验识别出依恋风格：

**安全型（约60%）**：母亲回来时主动寻求接触，被安抚后继续探索。
**焦虑型（约15%）**：既寻求接触又抗拒安抚。
**回避型（约25%）**：回避接触，仿佛不在意。

### 内部工作模型

早期依恋经验形成关于自我和他人关系的内隐假设：
- 安全型："我值得被爱，他人是可靠的"
- 焦虑型："我可能不值得被爱，需要不断确认"
- 回避型："我不能依赖他人"

### 成人依恋

两个核心维度：依恋焦虑（对被抛弃的担忧）和依恋回避（对亲密的不适）。四个象限：安全、痴迷、疏离、恐惧。

### 改变的可能性

依恋风格并非终身不变——矫正性情感体验、心理治疗、自我觉察都可以带来改变。`,
    source: 'Bowlby, J. (1969). Attachment and Loss. Basic Books.',
    quiz: [
      { question: '陌生情境实验中，哪种依恋风格占比最大？', options: ['安全型', '焦虑型', '回避型', '混乱型'], correct: 0, explanation: '安全型约占60%，是三种主要依恋风格中比例最高的。' },
      { question: '内部工作模型是关于什么的假设？', options: ['工作方式', '自我、他人和关系', '职业发展', '学习方式'], correct: 1, explanation: '内部工作模型是儿童基于早期依恋经验形成的关于自我、他人和关系的心理表征。' },
      { question: '成人依恋的两个核心维度是？', options: ['焦虑和回避', '焦虑和愤怒', '回避和依赖', '安全和恐惧'], correct: 0, explanation: '成人依恋的两个核心维度是依恋焦虑和依恋回避。' },
    ]
  },
  // ═══════════════ Article 4: Neuroplasticity ═══════════════
  {
    id: 4, title: '神经可塑性：大脑终身可改变', slug: 'neuroplasticity',
    summary: '直到20世纪末，科学家认为成年大脑是固定不变的。现在我们知道：大脑具有可塑性——经验、学习、甚至心理治疗都可以改变神经回路。',
    key_concepts: ['突触可塑性', '长时程增强', '海马体神经发生', '默认模式网络'],
    evidence_level: '强', reading_time: 7, is_featured: false,
    category_slug: 'neuroscience',
    content: `## 从固定到可塑

20世纪的教条被颠覆：成年大脑具有神经可塑性。

### 突触可塑性

- **长时程增强（LTP）**：频繁共同激活的神经元连接会增强。"一起放电，就会连接在一起"（Hebb's rule）。
- **长时程抑制（LTD）**：不常用的连接会减弱。
- **树突棘重塑**：突触结构在数小时内可变化。

### 海马体神经发生

1998年证实成人海马体仍能产生新神经元。有氧运动是最有效的促进因子。慢性压力、睡眠剥夺、社交隔离抑制神经发生。

### 心理治疗改变大脑

- CBT降低杏仁核对负性刺激的反应，增强前额叶调控
- 正念训练减少默认模式网络活动
- 暴露疗法重塑恐惧记忆——学习新的安全记忆

### 启示

神经可塑性既是问题也是解药：不良经历可导致功能失调回路，但治疗和新的学习经验可通过同样机制重塑大脑。`,
    source: 'Doidge, N. (2007). The Brain That Changes Itself. Viking.',
    quiz: [
      { question: '成年人的海马体能否产生新的神经元？', options: ['不能', '能，1998年已被证实', '只在0-3岁期间', '只在受伤后'], correct: 1, explanation: '1998年Eriksson等人首次证实成人海马体存在神经发生。' },
      { question: '以下哪项最能促进海马体神经发生？', options: ['看电视', '有氧运动', '高脂饮食', '长期压力'], correct: 1, explanation: '有氧运动是目前已知最有效的神经发生促进因子。' },
      { question: '暴露疗法利用了哪种机制？', options: ['删除恐惧记忆', '学习新的安全记忆', '药物抑制', '逃避恐惧'], correct: 1, explanation: '暴露疗法在旧恐惧记忆旁建立新安全记忆，使安全记忆胜出。' },
    ]
  },
  // ═══════════════ Article 5: Positive Psychology ═══════════════
  {
    id: 5, title: '积极心理学：不只是修复问题', slug: 'positive-psychology',
    summary: `Seligman创立的积极心理学不关注"出了什么问题"，而是关注"什么让人生值得活"。PERMA模型概括了幸福的五个支柱。`,
    key_concepts: ['PERMA模型', '品格优势', '心流', '感恩干预'],
    evidence_level: '强', reading_time: 7, is_featured: false,
    category_slug: 'positive',
    content: `## 积极心理学的诞生

1998年，Seligman宣布心理学应研究"什么让人生值得活"。

### PERMA 模型

**P - Positive Emotion（积极情绪）**：扩展注意力和思维范围。
**E - Engagement（投入）**：心流状态——时间消失，活动本身就是奖赏。
**R - Relationships（人际关系）**：哈佛80年研究的最重要发现——良好关系是幸福的最强预测因子。
**M - Meaning（意义）**：归属于比自己更大的事物。
**A - Accomplishment（成就）**：掌握感和自我效能。

### 品格优势

24种跨文化品格优势，分为6大美德：智慧、勇气、人道、公正、节制、超越。每天使用标志性优势的人更幸福。

### 感恩干预

"三件好事"练习：每天写下三件好事及原因，持续一周，幸福感提升持续6个月。`,
    source: 'Seligman, M.E.P. (2011). Flourish. Free Press.',
    quiz: [
      { question: 'PERMA模型中，E代表什么？', options: ['Emotion', 'Engagement', 'Energy', 'Empathy'], correct: 1, explanation: 'E代表Engagement（投入），指全身心投入一项活动的心流状态。' },
      { question: '哈佛80年研究发现幸福的最强预测因子是？', options: ['财富', '成就', '良好的人际关系', '健康'], correct: 2, explanation: '良好的人际关系质量是幸福和健康的最强预测因子，超过财富和成就。' },
      { question: '"三件好事"感恩练习的效果持续多久？', options: ['当天', '一周', '6个月以上', '永久'], correct: 2, explanation: '一周的三件好事练习，幸福感提升效果可持续至少6个月。' },
    ]
  },
  // ═══════════════ Article 6: Sleep ═══════════════
  {
    id: 6, title: '睡眠与心理健康的双向关系', slug: 'sleep-mental-health',
    summary: '睡眠障碍和心理健康问题是双向因果：失眠增加抑郁风险，抑郁又加重失眠。理解睡眠的神经生物学基础至关重要。',
    key_concepts: ['REM与情绪调节', '慢波睡眠与记忆', '昼夜节律', 'CBT-I疗法'],
    evidence_level: '强', reading_time: 7, is_featured: true,
    category_slug: 'sleep',
    content: `## 睡眠不是大脑"关机"

睡眠是大脑最活跃的状态之一。

### NREM（非快速眼动睡眠）
- **N1（浅睡）**：入睡过渡期
- **N2（中睡）**：纺锤波和K-复合波——记忆巩固关键
- **N3（深睡/慢波睡眠）**：身体修复、免疫增强、废物清除

### REM（快速眼动睡眠）
- 大脑活跃如清醒时
- 身体暂时瘫痪（REM atonia）
- 梦最生动的阶段
- 情绪调节和创造力关键

### 睡眠-心理健康的双向关系

一晚睡眠剥夺增加杏仁核反应60%；长期失眠者抑郁风险2-4倍。焦虑导致入睡困难，抑郁导致早醒。

### CBT-I：失眠的认知行为治疗

一线治疗，效果优于安眠药。核心：睡眠限制、刺激控制、认知重构、放松训练。

### 类淋巴系统

深度睡眠时脑细胞间隙扩大60%，脑脊液冲刷清除β-淀粉样蛋白——大脑的自我清洁。`,
    source: 'Walker, M. (2017). Why We Sleep. Scribner.',
    quiz: [
      { question: 'REM睡眠期间，身体处于什么状态？', options: ['完全放松', '暂时瘫痪（atonia）', '比清醒时更活跃', '无变化'], correct: 1, explanation: 'REM睡眠期间身体处于暂时瘫痪状态（atonia），防止把梦内容付诸行动。' },
      { question: 'CBT-I中，睡眠限制的目的是？', options: ['减少总睡眠时间', '提高睡眠效率', '增加卧床时间', '练习少睡'], correct: 1, explanation: '通过缩短卧床时间提高睡眠效率，打破"睡不着→焦虑"的恶性循环。' },
      { question: '类淋巴系统在哪一阶段最活跃？', options: ['清醒时', '浅睡时', '深睡（慢波睡眠）时', 'REM时'], correct: 2, explanation: '深度慢波睡眠时类淋巴系统最活跃，脑细胞间隙扩大60%清除代谢废物。' },
    ]
  },
];

export const MOCK_KNOWLEDGE_FEATURED = MOCK_KNOWLEDGE_ARTICLES.filter(a => a.is_featured);

export const MOCK_QUIZ_RESULT = {
  score: 2, total: 3,
  feedback: [
    { correct: true, explanation: '你的回答正确。' },
    { correct: true, explanation: '你的回答正确。' },
    { correct: false, explanation: '你的回答不正确。请复习相关章节。' },
  ],
  message: '答对了 2/3 题！掌握得不错，继续加油。',
};
