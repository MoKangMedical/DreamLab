// 课程 Mock 数据 — 30门课程，覆盖全部心理学经典

export const MOCK_COURSES = [
  // ━━━ 梦学基石 (4门) ━━━
  {
    id: 1, title: '弗洛伊德：梦的解析入门', category: 'freud', difficulty: 'beginner',
    description: '从《梦的解析》出发，系统学习弗洛伊德精神分析解梦方法。理解潜意识、自由联想与梦的工作机制。',
    chapters: [
      { title: '第一章：梦是通往潜意识的皇家大道', content: '1900年，弗洛伊德出版了《梦的解析》，标志着精神分析的诞生。他提出革命性的观点：梦不是无意义的随机活动，而是被压抑愿望的伪装满足。每一个梦都有显性内容（我们记得的故事）和隐性内容（潜藏的愿望）。理解这个"梦的工作"机制，是进入潜意识世界的第一步。' },
      { title: '第二章：自由联想技术', content: '弗洛伊德的核心方法是自由联想——让来访者不加审查地报告脑中浮现的任何想法。通过追踪从一个念头到另一个念头的联想链，分析师可以追溯到被压抑的记忆和情感。这个过程就像在梦的碎片中寻找联系的蛛丝，最终拼出完整的心理图谱。' },
      { title: '第三章：梦的四种工作机制', content: '弗洛伊德识别了梦形成的四种机制：凝缩（多个想法合并为一个形象）、移置（情感从重要对象转移到次要对象）、象征化（抽象概念以具体形象表达）和二次加工（醒后对梦的逻辑化整理）。理解这些机制，就像学会了解读潜意识的语法。' },
      { title: '第四章：俄狄浦斯情结与梦', content: '弗洛伊德认为，儿童早期的性心理发展深刻影响成年后的人格和梦境。俄狄浦斯情结——对异性父母的潜意识爱慕和对同性父母的竞争——是许多梦境的底层脚本。虽然这个理论在现代备受争议，但它开启了我们对童年经验如何塑造梦境的理解。' },
    ]
  },
  {
    id: 2, title: '荣格分析心理学与梦', category: 'jung', difficulty: 'intermediate',
    description: '探索集体无意识、原型、自性化过程与梦的象征意义。从荣格视角理解梦如何引领个人成长。',
    chapters: [
      { title: '第一章：超越弗洛伊德——集体无意识的发现', content: '荣格曾是弗洛伊德最看重的继承人，但两人在1913年决裂。核心分歧在于：荣格认为无意识不仅仅是个人被压抑的记忆，还包含了人类共有的、与生俱来的"集体无意识"——一个由原型（Archetype）构成的精神遗传层。梦境往往通向这个更深的精神维度。' },
      { title: '第二章：原型——心灵的基本模式', content: '原型是集体无意识中的基本模式：人格面具（我们展示给世界的脸）、阴影（被否认的自我）、阿尼玛/阿尼姆斯（内心的异性形象）、智慧老人、自性。这些原型在梦中以人物和符号的形式出现，每一个都代表心理发展的不同面向。认识你的原型，就是认识你的完整自我。' },
      { title: '第三章：自性化——成为完整的自己', content: '荣格心理学的终极目标是"自性化"——整合意识与无意识的对立面，成为完整的自己。梦在这一过程中扮演关键角色：它们不断补偿意识的片面性，把被忽略的部分带回意识。一个反复出现的梦，可能就是你的无意识在不断敲门，邀请你看见被忽视的那部分自己。' },
      { title: '第四章：积极想象与梦的工作', content: '荣格发展出"积极想象"技术：在清醒状态下主动与梦中的人物和符号对话。不同于弗洛伊德的自由联想，积极想象要求你"进入"梦境场景，与其中的人物互动、提问、甚至争辩。这是一种主动的、创造性的梦的工作方式。' },
    ]
  },
  {
    id: 3, title: '现代睡眠科学与梦境研究', category: 'modern', difficulty: 'intermediate',
    description: '从神经科学角度理解睡眠阶段、REM梦境生成机制、记忆巩固与情绪调节功能。',
    chapters: [
      { title: '第一章：睡眠的神经科学基础', content: '睡眠不是大脑"关机"，而是一个高度活跃的生理过程。通过EEG、fMRI等技术，科学家发现睡眠分为NREM（非快速眼动）和REM（快速眼动）两大阶段，每90分钟循环一次。每个阶段都有独特的脑电波模式、神经递质环境和生理功能。' },
      { title: '第二章：REM睡眠——梦的舞台', content: 'REM睡眠是梦境最生动的阶段。此时大脑几乎和清醒时一样活跃，但身体处于暂时瘫痪状态（REM atonia）。脑桥的PGO波触发视觉皮层的激活，边缘系统（情绪中心）高度活跃，而前额叶（理性判断）活动降低——这解释了为什么梦境如此情绪化和不合逻辑。' },
      { title: '第三章：激活-合成假说与梦的功能', content: 'Hobson和McCarley提出激活-合成假说：梦是脑干随机神经信号被大脑皮层"缝合"成的叙事。但现代研究补充了更多功能：梦帮助记忆巩固（将短期记忆转化为长期记忆）、情绪调节（在安全环境中"排练"威胁情境）、和创造性问题解决（自由组合记忆碎片）。' },
      { title: '第四章：清醒梦——在梦中醒来', content: '清醒梦（Lucid Dream）是做梦者意识到自己在做梦，并能一定程度上控制梦境的现象。研究证实前额叶在清醒梦期间恢复活动。清醒梦训练已被用于治疗噩梦障碍、提升运动技能（心理排练）和创造性探索。' },
    ]
  },
  {
    id: 4, title: '东方解梦文化探秘', category: 'eastern', difficulty: 'beginner',
    description: '从周公解梦到周易占梦，探索东方文化中独特的梦学智慧与象征体系。',
    chapters: [
      { title: '第一章：周公解梦——最早的梦典', content: '《周公解梦》是中国古代最系统的梦学典籍，将梦分为天象、地理、人事、器物等类别，建立了详尽的梦象-吉凶对应体系。不同于西方心理学的"为什么做这个梦"，东方更关注"这个梦预示什么"——这是一种面向未来的、实践导向的梦学。' },
      { title: '第二章：周易与梦的哲学', content: '《周易》的核心思想"阴阳相生"深刻影响了东方梦学。梦被视为阴阳交替之际的精神活动——"魂"在睡眠中暂离身体，游历他方。梦中的意象不是私人化的心理投射，而是天人感应的媒介，连接着个人的微观世界与宇宙的宏观秩序。' },
      { title: '第三章：佛教与梦——一切有为法如梦幻泡影', content: '佛教将梦作为"空性"的核心比喻。《金刚经》说"一切有为法，如梦幻泡影"。在佛教视角下，不仅梦是虚幻的，清醒时的经验同样如幻。梦被用作修行的工具——通过观察梦的虚幻本质，修行者领悟一切现象的"无自性"。' },
      { title: '第四章：东西方梦学的对话', content: '西方追问梦的"来源"（过去的记忆和欲望），东方关注梦的"去向"（未来的征兆和启示）。弗洛伊德问"这个梦隐藏了什么"，周公问"这个梦预示了什么"。当代整合视角认为两者并不矛盾：梦既是心理历史的回响，也是未来可能性的探照灯。' },
    ]
  },
  // ━━━ 系统理论 (8门) ━━━
  {
    id: 5, title: '康波周期与人类意识演化', category: 'economics', difficulty: 'advanced',
    description: '50-60年长波周期如何塑造集体意识？从工业革命到AI时代，技术浪潮与人类心理的共振。',
    chapters: [
      { title: '第一章：什么是康波周期', content: '康德拉季耶夫长波理论揭示了经济-技术约50-60年的周期性波动。从蒸汽机到AI，每一次技术浪潮不仅重塑了生产方式，也深刻改变了人类的集体心理结构和意识状态。' },
      { title: '第二章：集体意识的浪潮', content: '在康波的繁荣期，乐观主义盛行，人们更愿意冒险、创业、追求新体验。在衰退期，保守主义抬头，人们更关注安全、稳定和传统价值。一代人的核心价值观很大程度上由成长期的经济环境塑造。' },
    ]
  },
  {
    id: 6, title: '人格心理学：认识你自己', category: 'personality', difficulty: 'beginner',
    description: '从大五模型到MBTI，从特质论到叙事认同。系统理解人格理论的各大流派与自我认知工具。',
    chapters: [
      { title: '第一章：人格是什么', content: '德尔斐神庙刻着"认识你自己"。人格心理学研究的是使每个人独特的、相对稳定的思维、情感和行为模式。本课程将带你深入大五人格、MBTI、叙事认同等人格理论，找到认识自己的科学路径。' },
      { title: '第二章：大五人格（OCEAN）', content: '开放性、尽责性、外向性、宜人性、神经质——这五大维度构成了科学界公认的人格结构。每个维度不是非此即彼，而是一个连续谱。你在每个维度上的位置，构成了你独特的人格画像。' },
    ]
  },
  {
    id: 7, title: '进化心理学：心灵的远古根源', category: 'evolutionary', difficulty: 'intermediate',
    description: '从达尔文到现代进化心理学。理解人类心理机制如何被百万年的自然选择和性选择所塑造。',
    chapters: []
  },
  {
    id: 8, title: '发展心理学：一生的成长旅程', category: 'developmental', difficulty: 'beginner',
    description: '从婴儿到老年，人类心理发展的完整旅程。皮亚杰、维果茨基、埃里克森的发展阶段理论。',
    chapters: []
  },
  {
    id: 9, title: '社会心理学：情境的力量', category: 'social', difficulty: 'intermediate',
    description: '从众、服从、归因、刻板印象。理解社会情境如何塑造个体行为——有时比性格更强大。',
    chapters: []
  },
  {
    id: 10, title: '行为主义心理学：从条件反射到行为改变', category: 'behaviorism', difficulty: 'beginner',
    description: '巴甫洛夫的狗、斯金纳的鸽子、华生的小艾伯特。经典条件反射和操作性条件反射如何解释和改变行为。',
    chapters: []
  },
  {
    id: 11, title: '格式塔心理学：整体大于部分之和', category: 'gestalt', difficulty: 'intermediate',
    description: '知觉组织的科学——我们如何将碎片整合为整体？从视觉错觉到问题解决的顿悟，格式塔重塑了我们对"理解"的理解。',
    chapters: []
  },
  {
    id: 12, title: '存在主义心理学：自由、意义与死亡', category: 'existential', difficulty: 'advanced',
    description: '弗兰克尔、罗洛·梅、欧文·亚隆。面对生命的基本焦虑——死亡、自由、孤独、无意义——如何活出真实的人生？',
    chapters: []
  },
  // ━━━ 临床与应用 (8门) ━━━
  {
    id: 13, title: '认知行为疗法：重塑思维模式', category: 'cbt', difficulty: 'intermediate',
    description: '全世界研究最多的心理疗法。识别认知扭曲、挑战自动思维、重塑核心信念。终身受用的心理工具。',
    chapters: []
  },
  {
    id: 14, title: '积极心理学：幸福科学入门', category: 'positive', difficulty: 'beginner',
    description: '不研究疾病，而是研究幸福。PERMA模型、心流体验、感恩实践、韧性培养——用科学方法构建丰盈人生。',
    chapters: []
  },
  {
    id: 15, title: '正念冥想：觉知的艺术', category: 'mindfulness', difficulty: 'beginner',
    description: '从东方禅修到fMRI验证的大脑训练术。MBSR八周课程改变前额叶-杏仁核连接。不是宗教，是神经可塑性实践。',
    chapters: []
  },
  {
    id: 16, title: '依恋理论：亲密关系中的自我', category: 'attachment', difficulty: 'intermediate',
    description: '童年依恋模式如何影响一生的亲密关系？安全型、焦虑型、回避型——认识你的依恋风格，走向修复之旅。',
    chapters: []
  },
  {
    id: 17, title: '人本主义心理学：成为一个人的旅程', category: 'humanistic', difficulty: 'beginner',
    description: '马斯洛的需求金字塔、罗杰斯的无条件积极关注。相信每个人都有自我实现的潜能——心理学不只是修复缺陷，更是释放潜能。',
    chapters: []
  },
  {
    id: 18, title: '异常心理学：理解心理障碍', category: 'abnormal', difficulty: 'advanced',
    description: 'DSM-5诊断框架、心境障碍、焦虑障碍、精神分裂症谱系。减少偏见，科学理解心理疾病。不是标签，是理解。',
    chapters: []
  },
  {
    id: 19, title: '创伤与修复心理学', category: 'trauma', difficulty: 'intermediate',
    description: 'PTSD、童年创伤、代际创伤。创伤如何改变大脑和身体？EMDR、体感疗法、叙事暴露——科学证明的修复路径。',
    chapters: []
  },
  {
    id: 20, title: '健康心理学：身心连接的科学', category: 'health', difficulty: 'beginner',
    description: '心理神经免疫学、应激-疾病连接、行为改变模型。你的信念和情绪如何影响身体健康？从科学到自我关怀。',
    chapters: []
  },
  // ━━━ 神经科学与专项 (10门) ━━━
  {
    id: 21, title: '神经心理学：大脑如何创造心灵', category: 'neuropsychology', difficulty: 'advanced',
    description: '前额叶与人格、海马体与记忆、杏仁核与情绪。从Phineas Gage到fMRI，探索心灵的物质基础。',
    chapters: []
  },
  {
    id: 22, title: '情绪心理学：喜怒哀乐的科学', category: 'emotion', difficulty: 'beginner',
    description: 'Ekman的六种基本情绪、情绪建构理论、情绪调节策略。情绪不是理性的敌人——它是决策和社交的核心。',
    chapters: []
  },
  {
    id: 23, title: '教育心理学：如何有效学习', category: 'educational', difficulty: 'beginner',
    description: '间隔效应、测试效应、成长型思维。从认知科学中提炼出真正有效的学习方法，告别低效努力。',
    chapters: []
  },
  {
    id: 24, title: '儿童心理学：理解小小心灵', category: 'child', difficulty: 'beginner',
    description: '皮亚杰的认知发展、维果茨基的最近发展区、气质与依恋。从0到12岁，理解儿童的内心世界。',
    chapters: []
  },
  {
    id: 25, title: '爱情心理学：亲密关系的科学', category: 'love', difficulty: 'beginner',
    description: '斯滕伯格的爱情三角、Gottman的婚姻研究、吸引力的心理学原理。用科学理解人类最深刻的情感。',
    chapters: []
  },
  {
    id: 26, title: '创造性心理学：灵感从哪里来', category: 'creativity', difficulty: 'intermediate',
    description: '发散思维与收敛思维、心流与创造、创新的人格特质。创造力不是天才的专属——它可以被培养。',
    chapters: []
  },
  {
    id: 27, title: '犯罪心理学：黑暗中的心灵', category: 'forensic', difficulty: 'advanced',
    description: '犯罪心理画像、精神病态、供述心理学。理解犯罪行为的心理机制——是为了预防，而不是猎奇。',
    chapters: []
  },
  {
    id: 28, title: '消费心理学：我们为什么购买', category: 'consumer', difficulty: 'beginner',
    description: '锚定效应、框架效应、稀缺性心理。商家如何利用认知偏差影响你的决策？了解这些，做更明智的消费者。',
    chapters: []
  },
  {
    id: 29, title: '临终与死亡心理学：生命的最后一课', category: 'thanatology', difficulty: 'advanced',
    description: 'Kübler-Ross的五个阶段、死亡焦虑、临终关怀。面对生命的终点，找到活着的意义。',
    chapters: []
  },
  {
    id: 30, title: '运动心理学：巅峰状态的心理秘密', category: 'sports', difficulty: 'intermediate',
    description: '心理韧性、可视化训练、choking现象。顶尖运动员如何训练大脑？这些技巧同样适用于日常生活。',
    chapters: []
  },
];
