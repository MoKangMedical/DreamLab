export const USER_LOOP_STEPS = [
  {
    index: '01',
    title: '建立心理画像',
    desc: '新用户先完成一套轻量测评，得到焦虑、睡眠、人格或韧性的初始观察点。',
    action: '做一次测评',
    href: '/assessments',
    color: '#4f9db8',
  },
  {
    index: '02',
    title: '收集真实材料',
    desc: '把梦境、情绪波动或反复出现的念头记录下来，形成后续学习的个人素材。',
    action: '记录梦境',
    href: '/dream',
    color: '#c4554d',
  },
  {
    index: '03',
    title: '匹配课程路径',
    desc: '根据当前状态进入对应学院，从理论坐标、练习工具到生活应用逐层学习。',
    action: '进入课程',
    href: '/courses',
    color: '#d4a853',
  },
  {
    index: '04',
    title: '完成反思复盘',
    desc: '用四步反思法把情境、感受、理解和照护动作写成可回看的成长记录。',
    action: '写反思日志',
    href: '/reflect',
    color: '#72a66a',
  },
  {
    index: '05',
    title: '沉淀成长路线',
    desc: '每周回看测评、梦境、课程和反思，形成个人心智成长档案。',
    action: '查看成长',
    href: '/profile',
    color: '#cfa34d',
  },
] as const;

export const LOOP_RHYTHMS = [
  {
    title: '首次 7 天',
    desc: '完成 1 次测评、1 条梦境或情绪记录、3 节入门课程和 1 篇反思。',
    result: '让用户知道下一步该做什么',
  },
  {
    title: '每周复盘',
    desc: '用本周记录生成学习建议：继续课程、补做测评、回看梦境主题。',
    result: '把内容消费变成持续成长',
  },
  {
    title: '每月报告',
    desc: '沉淀情绪趋势、课程进度、主题词和照护动作，形成会员价值点。',
    result: '形成可付费的个人成长报告',
  },
] as const;

export const MEMBERSHIP_PLANS = [
  {
    name: '自由探索',
    price: '免费',
    desc: '适合第一次接触 DreamLab 的用户，先体验核心内容和基础记录。',
    features: ['基础课程目录', '心理测评入口', '梦境与反思记录', '个人中心基础路线'],
    cta: '开始体验',
    href: '/journey',
    featured: false,
  },
  {
    name: '成长会员',
    price: '¥29/月',
    desc: '适合希望每周复盘、持续学习心理学与自我照护工具的用户。',
    features: ['完整 100 门课程', '每周成长复盘', '主题课程推荐', '月度心理学习报告'],
    cta: '查看成长路径',
    href: '/journey',
    featured: true,
  },
  {
    name: '深度陪伴',
    price: '¥99/月',
    desc: '适合需要更高频记录、AI 陪伴和结构化练习计划的深度用户。',
    features: ['AI 心灵陪伴额度', '梦境主题追踪', '定制练习计划', '重要节点提醒'],
    cta: '进入个人中心',
    href: '/profile',
    featured: false,
  },
  {
    name: '机构方案',
    price: '定制',
    desc: '面向学校、企业 EAP、心理工作室和内容共创伙伴。',
    features: ['机构课程包', '匿名群体报告', '工作坊材料', '合规与伦理配置'],
    cta: '了解机构方案',
    href: '/membership',
    featured: false,
  },
] as const;

export const BUSINESS_STREAMS = [
  {
    title: 'B2C 会员订阅',
    desc: '以完整课程、周/月复盘报告、AI 陪伴额度和个性化路线作为持续付费理由。',
    stage: '第一阶段',
  },
  {
    title: '课程与工作坊',
    desc: '把 100 门课拆成入门营、睡眠营、关系营、正念营等主题训练营。',
    stage: '第二阶段',
  },
  {
    title: 'B2B 机构服务',
    desc: '为学校、企业和心理工作室提供课程包、匿名趋势报告和团体工作坊材料。',
    stage: '第三阶段',
  },
  {
    title: '专家与内容共创',
    desc: '引入心理咨询师、睡眠教练、正念老师和学术顾问，形成专业内容供给。',
    stage: '长期生态',
  },
] as const;

export const PRODUCT_METRICS = [
  { label: '首次完成率', value: '测评 + 记录 + 推荐课程' },
  { label: '7 日留存', value: '是否完成一轮反思复盘' },
  { label: '学习深度', value: '章节完成、练习次数、回看次数' },
  { label: '付费转化', value: '周报/月报、AI 陪伴、训练营' },
] as const;
