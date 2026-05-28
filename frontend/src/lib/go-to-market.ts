export const GTM_FUNNEL = [
  {
    stage: '发现',
    goal: '让用户先看到一个与自己有关的问题',
    assets: ['小红书图文笔记', '抖音 30 秒短视频', '数字人口播切片'],
    metric: '主页访问、收藏率、完播率',
  },
  {
    stage: '体验',
    goal: '用免费工具建立第一次信任',
    assets: ['梦境解析', '心理测评', '7 天成长任务'],
    metric: '工具完成率、课程点击率',
  },
  {
    stage: '学习',
    goal: '把一次情绪兴趣转成持续课程路径',
    assets: ['100 门课程', '章节音频', '成长游戏地图'],
    metric: '章节完成、连续学习天数',
  },
  {
    stage: '转化',
    goal: '让用户为复盘、报告、陪伴和训练营付费',
    assets: ['成长会员', '月度报告', '主题训练营', '机构课程包'],
    metric: '会员转化、复购、机构线索',
  },
] as const;

export const CHANNEL_PLAYS = [
  {
    channel: '小红书',
    positioning: '心理学自救工具 + 梦境记录 + 真实成长复盘',
    cadence: '每天 2 篇笔记：1 篇工具型，1 篇故事型',
    format: '封面强问题 + 5-7 张图文卡 + 评论区引导做测评/记梦',
    caution: 'AI 生成图文和虚拟经历要如实标识，不伪造真人经历、截图或疗效。',
    topics: [
      '梦见被追赶，可能不是坏事',
      '焦虑的时候，先做这 3 个身体检查',
      '心理学入门不必硬啃书，先用 7 天建立观察习惯',
      '为什么你总是反复梦到同一个地方',
    ],
  },
  {
    channel: '抖音',
    positioning: '30-60 秒心理学口播 + 梦境案例 + 可跟做练习',
    cadence: '每天 2 条短视频：1 条热点钩子，1 条课程切片',
    format: '3 秒问题钩子 + 20 秒解释 + 10 秒工具动作 + 站内主页承接',
    caution: '涉及 AIGC/数字人时保留 AI 标识，不做诊断、恐吓或疗效承诺。',
    topics: [
      '你梦见掉牙，真正值得关注的是这个感受',
      '睡前 1 分钟，把今天的大脑后台关掉',
      '一个动作判断你是不是正在情绪过载',
      '心理学里，成长不是变强，而是能复盘',
    ],
  },
  {
    channel: '数字人',
    positioning: 'DreamLab 心理研究员，用稳定人格持续讲课',
    cadence: '每周生产 20 条：10 条课程口播，6 条工具演示，4 条问答',
    format: '固定人物形象 + 深色金色品牌背景 + 字幕 + DreamLab 露出',
    caution: '数字人不得冒充真人咨询师；所有内容标注为心理学教育与自我观察。',
    topics: [
      '今天用 40 秒讲清楚弗洛伊德如何看梦',
      '如果你总是睡前想太多，试试这个反思句式',
      '荣格说的阴影，不是你的缺点',
      'DreamLab 100 门课该从哪一门开始',
    ],
  },
] as const;

export const CONTENT_CALENDAR = [
  { day: 'D1', theme: '梦境钩子', xhs: '梦见被追赶的 4 个心理线索', douyin: '梦见被追赶，先别急着害怕', avatar: '梦境解析学院开场' },
  { day: 'D2', theme: '测评入口', xhs: '焦虑不是性格差，是系统提醒', douyin: '30 秒做一个焦虑自查', avatar: '测评结果如何看' },
  { day: 'D3', theme: '课程露出', xhs: '心理学入门的 7 天路线', douyin: '100 门课先学哪 3 门', avatar: '课程地图介绍' },
  { day: 'D4', theme: '睡眠工具', xhs: '睡前反复想事怎么办', douyin: '睡前关机句式', avatar: '睡眠科学导入' },
  { day: 'D5', theme: '荣格阴影', xhs: '你讨厌的人，可能藏着你的阴影', douyin: '阴影不是缺点', avatar: '荣格课程切片' },
  { day: 'D6', theme: '正念练习', xhs: '3 分钟身体扫描卡片', douyin: '跟我做一次身体扫描', avatar: '正念练习口播' },
  { day: 'D7', theme: '周复盘', xhs: '我用 7 天记录梦境后发现的模式', douyin: '成长游戏地图怎么用', avatar: '一周复盘模板' },
  { day: 'D8', theme: '会员承接', xhs: '月度成长报告应该长什么样', douyin: '你的成长需要被看见', avatar: '成长会员介绍' },
  { day: 'D9', theme: '关系议题', xhs: '为什么越亲密越容易生气', douyin: '依恋风格 30 秒解释', avatar: '依恋课程切片' },
  { day: 'D10', theme: '情绪调节', xhs: '情绪过载时，不要先讲道理', douyin: '情绪急救 3 步', avatar: '情绪心理学导入' },
  { day: 'D11', theme: '知识库', xhs: '5 个心理学概念救过我', douyin: '今天学一个心理学词', avatar: '知识库入口介绍' },
  { day: 'D12', theme: 'AI 陪伴', xhs: 'AI 陪伴适合什么时刻用', douyin: 'AI 不能替代咨询，但能陪你复盘', avatar: 'AI 陪伴边界说明' },
  { day: 'D13', theme: '机构方案', xhs: '学校心理课可以怎么做得更轻', douyin: '企业 EAP 不只是一张热线卡', avatar: '机构课程包介绍' },
  { day: 'D14', theme: '转化总结', xhs: '14 天后，我更理解自己的梦和情绪了', douyin: '从测评到课程到复盘', avatar: 'DreamLab 完整闭环' },
] as const;

export const SHORT_VIDEO_SCRIPTS = [
  {
    title: '梦见被追赶',
    hook: '如果你总是梦见被追赶，先别急着把它当成坏预兆。',
    body: '心理学里，我们更关心的是梦里的感受：你是在逃避、害怕，还是一直找不到出口？这些感受常常对应现实中还没处理完的压力。',
    cta: '把梦记下来，去 DreamLab 做一次梦境解析，再匹配一节梦境课程。',
  },
  {
    title: '焦虑自查',
    hook: '焦虑不一定是你想太多，有时候是身体在提醒你。',
    body: '先问自己三件事：最近睡眠有没有变浅？身体有没有紧绷？是否反复预演最坏结果？如果都有，先做记录，再做轻量测评。',
    cta: 'DreamLab 的测评和反思日志可以帮你建立第一张心理画像。',
  },
  {
    title: '心理学入门路线',
    hook: '不要从最厚的心理学教材开始学。',
    body: '先用一个真实问题进入：梦境、焦虑、关系、睡眠或拖延。然后学一节对应课程，写一段反思，最后形成自己的行动卡。',
    cta: 'DreamLab 已经把 100 门课拆成 7 个学院，你可以从一个问题开始。',
  },
] as const;

export const BUSINESS_ACTIVATION = [
  { name: '免费入口', detail: '梦境解析、心理测评、课程目录，用来降低第一次使用门槛。' },
  { name: '会员入口', detail: '成长会员 ¥29/月，承接完整课程、周复盘和月度报告。' },
  { name: '高阶入口', detail: '深度陪伴 ¥99/月，承接 AI 陪伴额度、定制练习和提醒。' },
  { name: '机构入口', detail: '学校、企业 EAP、心理工作室的课程包和匿名趋势报告。' },
  { name: '内容资产', detail: '小红书笔记、抖音短视频、数字人口播复用同一套课程口播稿。' },
] as const;

export const SOCIAL_LANDING_ROUTES = [
  {
    source: '小红书主页',
    url: '/start?utm_source=xhs&utm_medium=profile&utm_campaign=dreamlab_launch',
    promise: '3 分钟完成梦境或情绪入口体验',
  },
  {
    source: '抖音主页',
    url: '/start?utm_source=douyin&utm_medium=profile&utm_campaign=dreamlab_launch',
    promise: '先做一次轻测评，再进入课程路径',
  },
  {
    source: '数字人口播',
    url: '/start?utm_source=avatar&utm_medium=video&utm_campaign=dreamlab_launch',
    promise: '从视频里的主题继续学习对应课程',
  },
] as const;

export const XHS_LAUNCH_POSTS = [
  {
    day: 'D1',
    title: '总是梦见被追赶，是不是潜意识在提醒你？',
    cover: '梦见被追赶，先别急着害怕',
    cards: [
      '先看梦里的身体感受：喘不过气、跑不动，还是一直找不到出口？',
      '再看现实里的压力：是否有一个问题你一直拖着不处理？',
      '不要直接查“吉凶”，先记录：人物、地点、情绪、醒后感受。',
      '梦境解析不是诊断，它更像一次自我观察。',
      '记录 7 天后，再看重复出现的主题。',
    ],
    caption: '我更建议把梦当成一份夜间情绪材料，而不是预言。DreamLab 可以先帮你把梦拆成主题、情绪和可学习课程。',
    cta: '主页进 DreamLab，先做一次梦境记录。',
    tags: ['梦境解析', '心理学', '自我成长', '睡眠'],
    landing: '/start?utm_source=xhs&utm_medium=note&utm_campaign=dream_chase',
  },
  {
    day: 'D2',
    title: '焦虑不是你太脆弱，可能是系统已经过载',
    cover: '焦虑时，先检查这 3 个信号',
    cards: [
      '睡眠是否变浅：入睡慢、易醒、醒后累。',
      '身体是否变紧：肩颈、胃部、胸口或下颌。',
      '大脑是否反复预演最坏结果。',
      '先记录，不急着评价自己。',
      '轻量测评能帮你找到下一步学习入口。',
    ],
    caption: '焦虑感出现时，最容易做的是责备自己；更有效的是把它拆成可观察的身体和念头信号。',
    cta: '主页做一次心理测评，生成你的第一张观察图。',
    tags: ['焦虑自救', '心理测评', '情绪管理', 'DreamLab'],
    landing: '/start?utm_source=xhs&utm_medium=note&utm_campaign=anxiety_check',
  },
  {
    day: 'D3',
    title: '心理学入门别硬啃教材，先从一个真实问题开始',
    cover: '100 门心理课，先学哪 3 门？',
    cards: [
      '梦境困扰：先学弗洛伊德、荣格、睡眠科学。',
      '情绪困扰：先学 CBT、正念、情绪调节。',
      '关系困扰：先学依恋、沟通、家庭系统。',
      '拖延困扰：先学动机、习惯、时间知觉。',
      '每学一节课，都写一句今天能做的小动作。',
    ],
    caption: 'DreamLab 的课程不是为了堆知识，而是把一个真实问题变成一条可复盘的成长路线。',
    cta: '主页进入 100 门课程地图。',
    tags: ['心理学入门', '课程推荐', '成长路线', '学习方法'],
    landing: '/start?utm_source=xhs&utm_medium=note&utm_campaign=course_route',
  },
  {
    day: 'D4',
    title: '睡前反复想事的人，试试这句“关机句式”',
    cover: '睡前大脑停不下来，先写这一句',
    cards: [
      '我现在最担心的是：____。',
      '这件事明天最小一步是：____。',
      '今晚我允许自己先休息，因为：____。',
      '写完就停，不继续推演。',
      '第二天再用反思日志复盘。',
    ],
    caption: '睡前不是解决人生问题的最佳时段。先把问题交给明天的行动，而不是交给今晚的焦虑。',
    cta: '去 DreamLab 写一条反思日志。',
    tags: ['睡眠', '反思日志', '心理工具', '情绪稳定'],
    landing: '/start?utm_source=xhs&utm_medium=note&utm_campaign=sleep_shutdown',
  },
] as const;

export const DOUYIN_LAUNCH_VIDEOS = [
  {
    title: '梦见被追赶',
    duration: '35 秒',
    hook: '如果你总是梦见被追赶，先别急着说这是坏预兆。',
    voiceover: '梦里真正值得记录的不是“追赶”这件事，而是你当时的感受：害怕、无力、找不到出口，还是一直在逃。心理学里，梦可以被当成夜间情绪材料。你可以先写下人物、地点、身体感受和醒来后的第一句话。记录几次之后，再看它和现实压力有没有对应。',
    screenText: ['梦不是预言', '先记录感受', '再匹配课程'],
    cta: '主页进 DreamLab，做一次梦境记录。',
    landing: '/start?utm_source=douyin&utm_medium=video&utm_campaign=dream_chase',
  },
  {
    title: '焦虑自查',
    duration: '42 秒',
    hook: '焦虑不一定是你想太多，可能是身体在提醒你系统过载。',
    voiceover: '你可以先问自己三个问题：最近睡眠有没有变浅？身体有没有持续紧绷？大脑是不是反复预演最坏结果？如果三个都有，不要急着责备自己，先把它记录下来。DreamLab 会把测评、梦境和课程连接起来，让你知道下一步该学什么、做什么。',
    screenText: ['睡眠', '身体', '念头'],
    cta: '主页做轻量心理测评。',
    landing: '/start?utm_source=douyin&utm_medium=video&utm_campaign=anxiety_check',
  },
  {
    title: '100 门课入口',
    duration: '45 秒',
    hook: '心理学入门，不要从最厚的教材开始。',
    voiceover: '先从你现在最真实的问题开始：梦境、焦虑、关系、睡眠、拖延。每个问题都能对应一条课程路线。比如梦境先学弗洛伊德、荣格和睡眠科学；情绪先学 CBT、正念和情绪调节。DreamLab 已经把 100 门课拆成可学习、可记录、可复盘的成长地图。',
    screenText: ['一个问题', '一条路线', '一次复盘'],
    cta: '主页进入课程地图。',
    landing: '/start?utm_source=douyin&utm_medium=video&utm_campaign=course_route',
  },
  {
    title: 'AI 陪伴边界',
    duration: '38 秒',
    hook: 'AI 不能替代心理咨询，但它可以帮你做一件重要的事。',
    voiceover: '它可以陪你把混乱的感受整理成文字，把今天发生的事拆成情境、感受、理解和下一步动作。真正的成长不是一次被拯救，而是你越来越能看见自己的模式。DreamLab 把 AI 陪伴定位成心理学教育和自我复盘工具，不做诊断，不承诺治疗。',
    screenText: ['不替代咨询', '帮助记录', '辅助复盘'],
    cta: '主页体验反思日志。',
    landing: '/start?utm_source=douyin&utm_medium=video&utm_campaign=ai_reflect',
  },
] as const;

export const DIGITAL_HUMAN_EPISODES = [
  {
    episode: 'EP01',
    title: 'DreamLab 心理研究员开场',
    scene: '深色背景、金色 DreamLab 标识、研究员半身口播',
    script: '你好，我是 DreamLab 的 AI 心理研究员。这里不是诊断室，而是一间心理学学习与自我观察实验室。你可以从一个梦、一次测评、一段反思开始，慢慢建立自己的心智成长路线。',
    visual: '左侧浮现“梦境解析 / 心理测评 / 100 门课程 / 成长复盘”四个关键词。',
    label: '画面角落常驻：AI 数字人口播 · 心理学教育内容',
    cta: '从主页进入 DreamLab，完成第一次 3 分钟体验。',
  },
  {
    episode: 'EP02',
    title: '弗洛伊德如何看梦',
    scene: '数字人站在课程地图前，背景出现梦境剧场式光影',
    script: '弗洛伊德最重要的贡献，不是告诉你每个梦固定代表什么，而是提醒我们：梦可能是通往潜意识的一条线索。DreamLab 会把梦境拆成情绪、人物、场景和现实压力，再推荐对应课程。',
    visual: '梦境元素分解为“情绪、人物、场景、压力”四张卡。',
    label: 'AI 数字人口播 · 不替代专业诊断',
    cta: '记录一个最近印象最深的梦。',
  },
  {
    episode: 'EP03',
    title: '荣格说的阴影不是缺点',
    scene: '数字人旁边出现一面暗金色镜子',
    script: '荣格说的阴影，不是你的缺点清单，而是那些你不愿承认、还没有整合的部分。成长不是消灭阴影，而是学会看见它、理解它，并找到更成熟的表达方式。',
    visual: '镜面关键词从“讨厌”转为“未被理解的需要”。',
    label: 'AI 数字人口播 · 心理学教育内容',
    cta: '进入荣格课程，做一次阴影主题反思。',
  },
  {
    episode: 'EP04',
    title: '7 天成长任务',
    scene: '数字人指向成长游戏地图',
    script: '如果你不知道从哪里开始，先完成 7 天任务：一次测评，一条梦境或情绪记录，三节入门课程，一篇反思日志。你不需要一次改变人生，只要先建立一条能复盘的路线。',
    visual: '7 天路径逐格点亮。',
    label: 'AI 数字人口播 · 自我观察工具',
    cta: '进入 DreamLab 成长地图。',
  },
] as const;

export const LAUNCH_METRICS = [
  { metric: '内容触达', target: '14 天发布 28 篇小红书 + 28 条抖音 + 20 条数字人切片', owner: '内容运营' },
  { metric: '站内体验', target: '/start 到梦境/测评/课程的点击率达到 18%+', owner: '产品' },
  { metric: '首次闭环', target: '完成测评或梦境记录后进入课程的比例达到 12%+', owner: '产品运营' },
  { metric: '留存信号', target: '7 天内完成 2 次以上记录或章节学习', owner: '增长' },
  { metric: '商业验证', target: '会员页访问、机构咨询和训练营意向收集', owner: '商业化' },
] as const;

export const COMPLIANCE_CHECKLIST = [
  'AI 图文、音频、视频和数字人口播必须显式标识，不隐藏或移除平台标识。',
  '虚拟案例必须标注为改编/虚构/综合案例，不伪造真人经历、聊天截图或疗效证明。',
  '不使用“治愈、诊断、根治、保证改善”等医疗效果承诺。',
  '涉及危机、创伤、自伤等主题时，提供寻求专业帮助的提醒。',
  '数字人不冒充真人咨询师，不使用未授权真人肖像、声音或专家身份。',
  '所有 CTA 指向教育、记录、测评、课程和复盘，不引导用户替代线下专业服务。',
] as const;

export const MARKETING_ASSET_PACK = [
  {
    name: '小红书 D1 图文',
    type: '1080x1440 PNG/SVG',
    count: '1 张封面 + 5 张卡片',
    preview: '/marketing/xhs/d1-dream-chase-cover.png',
    href: '/marketing/xhs/d1-dream-chase-cover.png',
  },
  {
    name: '小红书 D2 图文',
    type: '1080x1440 PNG/SVG',
    count: '1 张封面 + 5 张卡片',
    preview: '/marketing/xhs/d2-anxiety-check-cover.png',
    href: '/marketing/xhs/d2-anxiety-check-cover.png',
  },
  {
    name: '抖音分镜脚本',
    type: '1080x1920 PNG/SVG',
    count: '4 张短视频分镜',
    preview: '/marketing/douyin/dream-chase-storyboard.png',
    href: '/marketing/douyin/dream-chase-storyboard.png',
  },
  {
    name: '数字人分镜',
    type: '1080x1920 PNG/SVG',
    count: '4 张数字人口播分镜',
    preview: '/marketing/digital-human/ep01-opening-storyboard.png',
    href: '/marketing/digital-human/ep01-opening-storyboard.png',
  },
] as const;
