export const QUEST_PROFILE = {
  level: 12,
  title: '心智旅人',
  xp: 2840,
  nextLevelXp: 3600,
  streakDays: 7,
  completionRate: 68,
  currentAct: '第二章：情绪地图',
} as const;

export const QUEST_NODES = [
  {
    id: 'mirror',
    act: '序章',
    title: '镜前初见',
    desc: '完成一次心理测评，得到第一张自我画像。',
    reward: '+120 XP · 解锁画像',
    href: '/assessments',
    color: '#4f9db8',
    status: 'done',
    x: 8,
    y: 62,
  },
  {
    id: 'dream',
    act: '第一章',
    title: '梦境采集',
    desc: '记录一个梦境或情绪片段，收集真实材料。',
    reward: '+160 XP · 获得梦石',
    href: '/dream',
    color: '#c4554d',
    status: 'done',
    x: 25,
    y: 38,
  },
  {
    id: 'course',
    act: '第二章',
    title: '进入学院',
    desc: '学习 3 节课程，把混乱经验放进心理学坐标。',
    reward: '+240 XP · 解锁能力树',
    href: '/courses',
    color: '#d4a853',
    status: 'active',
    x: 45,
    y: 56,
  },
  {
    id: 'reflect',
    act: '第三章',
    title: '写下转折',
    desc: '完成一篇四步反思，把觉察转成照护动作。',
    reward: '+220 XP · 复盘徽章',
    href: '/reflect',
    color: '#72a66a',
    status: 'open',
    x: 64,
    y: 30,
  },
  {
    id: 'wellness',
    act: '第四章',
    title: '稳定练习',
    desc: '完成一次呼吸或正念练习，让成长进入身体。',
    reward: '+180 XP · 情绪韧性',
    href: '/wellness',
    color: '#5a7d9a',
    status: 'open',
    x: 82,
    y: 52,
  },
  {
    id: 'profile',
    act: '终章',
    title: '回看路线',
    desc: '在个人中心回看本周记录，生成下一轮任务。',
    reward: '+300 XP · 周复盘',
    href: '/profile',
    color: '#cfa34d',
    status: 'locked',
    x: 94,
    y: 26,
  },
] as const;

export const DAILY_QUESTS = [
  {
    title: '今日主线',
    task: '完成 1 节课程，并写下一个能立刻使用的照护动作。',
    progress: 66,
    reward: '+90 XP',
    href: '/courses',
    color: '#d4a853',
  },
  {
    title: '支线探索',
    task: '记录一个梦境符号，给它写下三个可能含义。',
    progress: 20,
    reward: '+60 XP',
    href: '/dream',
    color: '#c4554d',
  },
  {
    title: '恢复任务',
    task: '做一次 4-7-8 呼吸，把身体状态从 1 到 5 打分。',
    progress: 0,
    reward: '+50 XP',
    href: '/wellness',
    color: '#5a7d9a',
  },
] as const;

export const SKILL_TREE = [
  { name: '自我觉察', level: 8, max: 10, color: '#d4a853', desc: '看见情绪、念头和身体信号' },
  { name: '情绪调节', level: 6, max: 10, color: '#72a66a', desc: '从反应走向选择' },
  { name: '关系理解', level: 5, max: 10, color: '#c4554d', desc: '理解依恋、边界与沟通' },
  { name: '睡眠恢复', level: 4, max: 10, color: '#5a7d9a', desc: '稳定睡眠和日常节律' },
  { name: '意义建构', level: 7, max: 10, color: '#8b7cf6', desc: '把经历整合成成长叙事' },
] as const;

export const QUEST_BADGES = [
  { name: '镜前初见', desc: '完成第一次测评', icon: '镜', unlocked: true, color: '#4f9db8' },
  { name: '梦石采集者', desc: '记录 3 个梦境片段', icon: '梦', unlocked: true, color: '#c4554d' },
  { name: '课程旅人', desc: '完成 10 个章节', icon: '课', unlocked: true, color: '#d4a853' },
  { name: '反思炼金术', desc: '完成 7 篇反思', icon: '思', unlocked: false, color: '#72a66a' },
  { name: '稳定呼吸', desc: '连续 7 天练习', icon: '息', unlocked: false, color: '#5a7d9a' },
  { name: '完整路线', desc: '完成一轮月度复盘', icon: '图', unlocked: false, color: '#cfa34d' },
] as const;

export const QUEST_DESIGN_NOTES = [
  '用户不是被动浏览内容，而是在一张成长地图上移动。',
  '每个任务必须对应真实心理行动：测评、记录、学习、反思、练习、复盘。',
  '奖励用经验、徽章和能力树表达，但避免制造医疗效果承诺。',
] as const;
