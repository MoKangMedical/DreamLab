import Link from 'next/link';
import { getCourses } from '@/lib/api';
import PageAtmosphere from '@/components/PageAtmosphere';

const CATEGORIES: Record<string, { label: string; icon: string; color: string }> = {
  freud:     { label: '弗洛伊德', icon: '🛋️', color: '#c4554d' },
  jung:      { label: '荣格',     icon: '🔮', color: '#6b5b8a' },
  modern:    { label: '神经科学', icon: '🧠', color: '#5a7d9a' },
  eastern:   { label: '东方解梦', icon: '🏮', color: '#d4a853' },
  economics: { label: '康波周期', icon: '🌊', color: '#5a9a6f' },
  personality: { label: '人格心理', icon: '🪞', color: '#9a7ab8' },
  evolutionary: { label: '进化心理', icon: '🧬', color: '#8a9a5a' },
  developmental: { label: '发展心理', icon: '🌱', color: '#6aab8a' },
  social:    { label: '社会心理', icon: '👥', color: '#5a8aba' },
  behaviorism: { label: '行为主义', icon: '🐕', color: '#aa7a5a' },
  gestalt:   { label: '格式塔',   icon: '🔷', color: '#7a6aaa' },
  existential: { label: '存在主义', icon: '🌌', color: '#5a6a9a' },
  cbt:       { label: '认知行为', icon: '🔧', color: '#4a90b8' },
  positive:  { label: '积极心理', icon: '☀️', color: '#e8a850' },
  mindfulness: { label: '正念冥想', icon: '🧘', color: '#7a9aad' },
  attachment: { label: '依恋理论', icon: '💕', color: '#c47a8a' },
  humanistic: { label: '人本主义', icon: '🌻', color: '#d4a860' },
  abnormal:  { label: '异常心理', icon: '🩺', color: '#9a5a6a' },
  trauma:    { label: '创伤修复', icon: '🕊️', color: '#8a8a6a' },
  health:    { label: '健康心理', icon: '🍃', color: '#6a9a6a' },
  neuropsychology: { label: '神经心理', icon: '⚡', color: '#5a6aba' },
  emotion:   { label: '情绪心理', icon: '🌈', color: '#d4708a' },
  educational: { label: '教育心理', icon: '📚', color: '#4a8a9a' },
  child:     { label: '儿童心理', icon: '🧸', color: '#d4906a' },
  love:      { label: '爱情心理', icon: '💝', color: '#d4607a' },
  creativity: { label: '创造心理', icon: '🎨', color: '#aa7aba' },
  forensic:  { label: '犯罪心理', icon: '🔍', color: '#6a5a6a' },
  consumer:  { label: '消费心理', icon: '🛒', color: '#5a9a8a' },
  thanatology: { label: '死亡心理', icon: '🕯️', color: '#7a7a8a' },
  sports:    { label: '运动心理', icon: '🏃', color: '#4a8a6a' },
};

const DIFFICULTY_MAP: Record<string, { label: string; style: React.CSSProperties }> = {
  beginner: { label: '入门', style: { background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa' } },
  intermediate: { label: '进阶', style: { background: 'rgba(212,168,83,0.08)', border: '1px solid rgba(212,168,83,0.2)', color: '#d4a853' } },
  advanced: { label: '高级', style: { background: 'rgba(196,85,77,0.08)', border: '1px solid rgba(196,85,77,0.2)', color: '#c4554d' } },
};

// ═══════════════ 梦学基石 — 四大学派 ═══════════════
const DREAM_SCHOOLS = [
  {
    name: '弗洛伊德精神分析', icon: '🛋️', color: '#c4554d',
    founder: '西格蒙德·弗洛伊德', year: '1900年 《梦的解析》出版',
    theory: '梦是通往潜意识的皇家大道。每一个梦都是被压抑欲望的伪装满足——白天的冲动在睡眠中绕过"稽查"，以象征、凝缩、移置的方式显现。',
    keyTerms: ['潜意识', '压抑', '愿望达成', '稽查机制', '凝缩与移置'],
    quote: '"梦的解析是通往无意识心理活动的康庄大道。"',
  },
  {
    name: '荣格分析心理学', icon: '🔮', color: '#6b5b8a',
    founder: '卡尔·荣格', year: '1913年 与弗洛伊德决裂后独立发展',
    theory: '梦承载着全人类共享的"集体无意识"。原型、阴影、阿尼玛/阿尼姆斯——梦是心灵自我调节的自然表达，补偿白天的片面态度。',
    keyTerms: ['集体无意识', '原型', '阴影', '补偿功能', '个性化'],
    quote: '"谁向外看，他就在梦中；谁向内看，他就会醒来。"',
  },
  {
    name: '现代神经科学', icon: '🧠', color: '#5a7d9a',
    founder: 'Aserinsky & Kleitman', year: '1953年 REM睡眠的发现',
    theory: 'REM睡眠中，PGO波激活视觉皮层产生生动梦境。前额叶活动降低解释了梦的荒诞。功能假说包括记忆巩固、情绪调节和威胁模拟。',
    keyTerms: ['REM睡眠', 'PGO波', '前额叶皮层', '记忆巩固', '情绪调节'],
    quote: '"我们每晚用梦来整理白天的记忆，调节明日的情绪。"',
  },
  {
    name: '东方解梦传统', icon: '🏮', color: '#d4a853',
    founder: '周公 · 庄子 · 佛学唯识宗', year: '距今2500年以上',
    theory: '东方不纠结"真伪"，将梦视为"天人感应"的桥梁。《周公解梦》系统分类梦境符号，《庄子》提出庄周梦蝶，佛学唯识宗认为梦是第八阿赖耶识种子的现行。',
    keyTerms: ['天人感应', '庄周梦蝶', '周公解梦', '阿赖耶识', '五行阴阳'],
    quote: '"昔者庄周梦为蝴蝶，栩栩然蝴蝶也。"',
  },
];

// ═══════════════ 系统理论 — 八大学派 ═══════════════
const THEORY_SCHOOLS = [
  { name: '康波周期 × 意识', icon: '🌊', color: '#5a9a6f', founder: '康德拉季耶夫 × 荣格', desc: '50-60年长波周期如何塑造集体心理？从工业革命到AI时代，技术浪潮与人类意识的共振。', tags: ['长波理论', '集体无意识', '人生规划'] },
  { name: '人格心理学', icon: '🪞', color: '#9a7ab8', founder: 'Allport · Costa & McCrae', desc: '大五人格（OCEAN）——科学界最认可的人格模型。不同流派如何理解"我是谁"？', tags: ['OCEAN', 'MBTI', '特质论'] },
  { name: '进化心理学', icon: '🧬', color: '#8a9a5a', founder: 'David Buss · John Tooby', desc: '为什么我们害怕蛇而不是插座？百万年进化如何塑造了今天的心智模块。', tags: ['性选择', '亲代投资', '模块化心智'] },
  { name: '发展心理学', icon: '🌱', color: '#6aab8a', founder: '皮亚杰 · 维果茨基 · 埃里克森', desc: '从婴儿的客体永久性到老年的智慧整合——人一生心理发展的完整地图。', tags: ['认知发展', '心理社会阶段', '毕生发展'] },
  { name: '社会心理学', icon: '👥', color: '#5a8aba', founder: 'Kurt Lewin · Solomon Asch', desc: '斯坦福监狱实验、米尔格拉姆服从实验——情境的力量有时比性格更强大。', tags: ['从众', '服从', '归因', '刻板印象'] },
  { name: '行为主义心理学', icon: '🐕', color: '#aa7a5a', founder: '巴甫洛夫 · 斯金纳 · 华生', desc: '给我一打婴儿，我能把他们塑造成任何人。经典条件反射和操作性条件反射如何解释行为。', tags: ['条件反射', '强化', '行为塑造'] },
  { name: '格式塔心理学', icon: '🔷', color: '#7a6aaa', founder: 'Wertheimer · Köhler · Koffka', desc: '整体大于部分之和。我们不是先看到线条再组成脸——我们直接看到了脸。', tags: ['知觉组织', '顿悟', '场论'] },
  { name: '存在主义心理学', icon: '🌌', color: '#5a6a9a', founder: '弗兰克尔 · 罗洛·梅 · 亚隆', desc: '死亡、自由、孤独、无意义——四大终极关怀。面对生命的根本焦虑，如何活出真实？', tags: ['意义治疗', '死亡焦虑', '真实性'] },
];

// ═══════════════ 临床与应用 — 八大学派 ═══════════════
const CLINICAL_SCHOOLS = [
  { name: '认知行为疗法 CBT', icon: '🔧', color: '#4a90b8', founder: 'Aaron Beck · Albert Ellis', desc: '全世界研究最多的心理疗法。认知三角、认知扭曲、苏格拉底提问——一套终身受用的心理工具。', tags: ['认知三角', '思维记录', '行为激活'] },
  { name: '积极心理学', icon: '☀️', color: '#e8a850', founder: 'Martin Seligman', desc: '不研究疾病，研究幸福。PERMA模型、心流、感恩——科学告诉我们什么让生活值得活。', tags: ['PERMA', '心流', '感恩', '韧性'] },
  { name: '正念冥想', icon: '🧘', color: '#7a9aad', founder: 'Jon Kabat-Zinn', desc: '从东方禅修到fMRI验证的大脑训练术。MBSR八周课程改变前额叶-杏仁核连接。', tags: ['MBSR', '神经可塑性', '减压'] },
  { name: '依恋理论', icon: '💕', color: '#c47a8a', founder: 'John Bowlby · Mary Ainsworth', desc: '童年的陌生情境实验如何预测成年亲密关系？认识你的内在工作模型。', tags: ['安全型', '焦虑型', '回避型'] },
  { name: '人本主义心理学', icon: '🌻', color: '#d4a860', founder: '马斯洛 · 卡尔·罗杰斯', desc: '相信每个人有自我实现的潜能。无条件积极关注、共情、真诚——治疗关系的三根支柱。', tags: ['自我实现', '来访者中心', '需求层次'] },
  { name: '异常心理学', icon: '🩺', color: '#9a5a6a', founder: 'Emil Kraepelin · DSM工作组', desc: 'DSM-5诊断框架下理解心境障碍、焦虑障碍和精神分裂症。减少偏见，用知识替代恐惧。', tags: ['DSM-5', '心境障碍', '精神分裂症'] },
  { name: '创伤与修复', icon: '🕊️', color: '#8a8a6a', founder: 'Bessel van der Kolk · Judith Herman', desc: '"身体从未忘记"——创伤如何在大脑和身体中留下印记，以及科学证明的修复路径。', tags: ['PTSD', 'EMDR', '体感疗法'] },
  { name: '健康心理学', icon: '🍃', color: '#6a9a6a', founder: 'Robert Ader · 心理神经免疫学', desc: '心理神经免疫学揭示的压力-疾病连接。你的信念和情绪如何通过神经内分泌系统影响健康？', tags: ['PNI', '应激', '行为改变'] },
];

// ═══════════════ 神经科学与专项 — 十大学派 ═══════════════
const SPECIAL_SCHOOLS = [
  { name: '神经心理学', icon: '⚡', color: '#5a6aba', founder: 'Luria · Sperry · Damasio', desc: 'Phineas Gage的铁棍穿过前额叶后，他"不再是同一个人"。大脑如何创造心灵？', tags: ['fMRI', '脑损伤', '认知功能'] },
  { name: '情绪心理学', icon: '🌈', color: '#d4708a', founder: 'Paul Ekman · Lisa Barrett', desc: '基本情绪是普遍的还是建构的？Ekman的面部表情跨文化研究vs Barrett的情绪建构论。', tags: ['基本情绪', '情绪调节', '微表情'] },
  { name: '教育心理学', icon: '📚', color: '#4a8a9a', founder: 'Vygotsky · Dweck · Bjork', desc: '间隔重复、测试效应、成长型思维——从认知科学中提炼真正有效的学习方法。', tags: ['学习科学', '动机', '评估'] },
  { name: '儿童心理学', icon: '🧸', color: '#d4906a', founder: '皮亚杰 · 鲍尔比 · 维果茨基', desc: '从0到12岁，儿童的认知、语言、情感和道德发展。理解孩子的内心世界。', tags: ['依恋', '游戏', '语言发展'] },
  { name: '爱情心理学', icon: '💝', color: '#d4607a', founder: 'Sternberg · Gottman · Helen Fisher', desc: '爱情的三角理论、Gottman的"末日四骑士"、吸引力背后的神经化学。', tags: ['亲密', '激情', '承诺'] },
  { name: '创造性心理学', icon: '🎨', color: '#aa7aba', founder: 'Guilford · Csikszentmihalyi', desc: '发散思维、顿悟与酝酿效应。创造力如何发生？它可以被培养吗？', tags: ['发散思维', '心流', '顿悟'] },
  { name: '犯罪心理学', icon: '🔍', color: '#6a5a6a', founder: 'Hare · Eysenck · FBI BAU', desc: '精神病态(PCL-R)、犯罪侧写、供述心理学。理解是为了预防，不是为了猎奇。', tags: ['精神病态', '侧写', '再犯预防'] },
  { name: '消费心理学', icon: '🛒', color: '#5a9a8a', founder: 'Kahneman · Cialdini · Ariely', desc: '锚定效应、稀缺心理、社会证明——了解认知偏差如何影响购买决策。', tags: ['行为经济学', '定价心理', '决策偏差'] },
  { name: '死亡心理学', icon: '🕯️', color: '#7a7a8a', founder: 'Kübler-Ross · Ernest Becker', desc: '"拒斥死亡"——人类一切文明建造都是为了对抗对死亡的恐惧？面对终点，找到意义。', tags: ['五个阶段', '死亡焦虑', '临终关怀'] },
  { name: '运动心理学', icon: '🏃', color: '#4a8a6a', founder: 'Coleman Griffith · 奥运心理团队', desc: '为什么顶尖运动员会在关键时刻"窒息"？心理韧性、可视化训练——大脑是最后的竞技场。', tags: ['心理韧性', '可视化', 'Choking'] },
];

// ═══════════════ 学习路径 ═══════════════
const LEARNING_PATH = [
  { stage: 1, title: '梦学入门', desc: '弗洛伊德 · 东方解梦 · 正念冥想', courses: '1, 4, 15', icon: '📖', color: '#c4554d' },
  { stage: 2, title: '深度解梦', desc: '荣格 · 神经科学 · 存在主义', courses: '2, 3, 12', icon: '🔬', color: '#6b5b8a' },
  { stage: 3, title: '系统理论', desc: '人格 · 进化 · 发展 · 社会', courses: '6-11', icon: '📊', color: '#5a7d9a' },
  { stage: 4, title: '幸福科学', desc: '积极心理学 · CBT · 依恋 · 人本', courses: '13, 14, 16, 17', icon: '☀️', color: '#e8a850' },
  { stage: 5, title: '临床应用', desc: '异常 · 创伤 · 健康 · 儿童', courses: '18-20, 24', icon: '🩺', color: '#9a5a6a' },
  { stage: 6, title: '专项精通', desc: '情绪 · 爱情 · 创造 · 运动等', courses: '22, 25-30', icon: '🎯', color: '#4a8a6a' },
];

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <PageAtmosphere />
      <div className="relative z-10">

      {/* ═══════ Hero ═══════ */}
      <div className="relative pt-14 md:pt-20 pb-12 md:pb-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 text-xs tracking-[0.2em] uppercase"
            style={{ color: 'rgba(212,168,83,0.5)', fontFamily: 'Inter, sans-serif' }}>
            <span className="w-6 h-px" style={{ background: 'rgba(212,168,83,0.15)' }} />梦学の殿堂<span className="w-6 h-px" style={{ background: 'rgba(212,168,83,0.15)' }} />
          </div>
          <h1 className="font-bold mb-4" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(36px, 6vw, 64px)', color: '#f4f4f6', lineHeight: 1.1 }}>
            心理学<br/>完整知识体系
          </h1>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#71717a' }}>
            30门课程 · 120+章节 · 50万+字深度内容
            <br />从弗洛伊德的沙发到神经科学的实验室，从周公的梦境到CBT的工具箱
            <br />——覆盖心理学全部经典流派，一次学透。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">

        {/* ═══════ 梦学基石 ═══════ */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} /><span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>梦学基石</span>
          </div>
          <h2 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 3vw, 36px)', color: '#f4f4f6' }}>四把钥匙，同一个梦</h2>
          <p className="text-sm mb-8" style={{ color: '#71717a' }}>没有对错，只有不同的观察角度。四重视角叠加，才能看清全貌。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DREAM_SCHOOLS.map(s => (
              <div key={s.name} className="p-7" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl shrink-0">{s.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{s.name}</h3>
                    <p className="text-xs" style={{ color: s.color }}>{s.founder}</p>
                    <p className="text-xs" style={{ color: '#52525b' }}>{s.year}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#a1a1aa', lineHeight: 2.0 }}>{s.theory}</p>
                <blockquote className="border-l-2 pl-4 mb-4 text-sm italic" style={{ borderColor: s.color + '40', color: '#71717a' }}>{s.quote}</blockquote>
                <div className="flex flex-wrap gap-1.5">
                  {s.keyTerms.map(t => <span key={t} className="text-xs px-2.5 py-1" style={{ background: s.color + '10', border: `1px solid ${s.color}20`, color: s.color, borderRadius: 2 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ 系统理论 ═══════ */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} /><span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>系统理论</span>
          </div>
          <h2 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 3vw, 36px)', color: '#f4f4f6' }}>八大学派，理解心灵的基本架构</h2>
          <p className="text-sm mb-8" style={{ color: '#71717a' }}>从宏观经济周期到人格特质，从进化根源到社会情境——理解心理学的基础理论大厦。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {THEORY_SCHOOLS.map(s => (
              <div key={s.name} className="p-5 group transition-all duration-300 hover:border-opacity-30" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: '#f4f4f6', fontFamily: "'Noto Serif SC', serif" }}>{s.name}</h3>
                    <p className="text-xs" style={{ color: s.color }}>{s.founder}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#71717a', lineHeight: 1.9 }}>{s.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {s.tags.map(t => <span key={t} className="text-xs px-2 py-0.5" style={{ background: s.color + '08', color: s.color + 'cc', borderRadius: 1 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ 临床与应用 ═══════ */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} /><span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>临床与应用</span>
          </div>
          <h2 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 3vw, 36px)', color: '#f4f4f6' }}>八种工具，治愈与成长的方法</h2>
          <p className="text-sm mb-8" style={{ color: '#71717a' }}>从CBT的工具箱到积极心理学的幸福科学，从创伤修复到身心连接——实用的心理学方法。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {CLINICAL_SCHOOLS.map(s => (
              <div key={s.name} className="p-5 group transition-all duration-300 hover:border-opacity-30" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: '#f4f4f6', fontFamily: "'Noto Serif SC', serif" }}>{s.name}</h3>
                    <p className="text-xs" style={{ color: s.color }}>{s.founder}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#71717a', lineHeight: 1.9 }}>{s.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {s.tags.map(t => <span key={t} className="text-xs px-2 py-0.5" style={{ background: s.color + '08', color: s.color + 'cc', borderRadius: 1 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ 神经科学与专项 ═══════ */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} /><span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>神经科学与专项</span>
          </div>
          <h2 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 3vw, 36px)', color: '#f4f4f6' }}>十个领域，心理学的无限疆界</h2>
          <p className="text-sm mb-8" style={{ color: '#71717a' }}>从大脑神经到消费决策，从儿童发展到临终关怀——心理学触达人类经验的每一个角落。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {SPECIAL_SCHOOLS.map(s => (
              <div key={s.name} className="p-5 group transition-all duration-300 hover:border-opacity-30" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: '#f4f4f6', fontFamily: "'Noto Serif SC', serif" }}>{s.name}</h3>
                    <p className="text-xs" style={{ color: s.color }}>{s.founder}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#71717a', lineHeight: 1.9 }}>{s.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {s.tags.map(t => <span key={t} className="text-xs px-2 py-0.5" style={{ background: s.color + '08', color: s.color + 'cc', borderRadius: 1 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ 学习路径 ═══════ */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} /><span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>学习路线</span>
          </div>
          <h2 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 3vw, 36px)', color: '#f4f4f6' }}>六阶段学习路径</h2>
          <p className="text-sm mb-8" style={{ color: '#71717a' }}>从入门到精通的完整旅程。完成全部30门课程，获得「心理学完整学者」称号。</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {LEARNING_PATH.map((stage, i) => (
              <div key={stage.stage} className="p-5 text-center relative" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 mx-auto"
                  style={{ background: stage.color + '15', border: `1px solid ${stage.color}30` }}>
                  <span className="text-base font-bold" style={{ color: stage.color }}>{stage.stage}</span>
                </div>
                <div className="text-2xl mb-2">{stage.icon}</div>
                <h3 className="text-sm font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{stage.title}</h3>
                <p className="text-xs mb-1" style={{ color: '#71717a', lineHeight: 1.6 }}>{stage.desc}</p>
                <p className="text-xs" style={{ color: stage.color }}>课程 {stage.courses}</p>
                {i < 5 && <div className="hidden md:block absolute top-1/2 -right-1.5 w-3" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ 课程列表 ═══════ */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} /><span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>全部课程 · 30门</span>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16"><div className="text-5xl mb-4">📭</div><p style={{ color: '#71717a' }}>暂无课程数据，请先启动后端服务</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {courses.map((course: any) => {
              const cat = CATEGORIES[course.category] || { label: course.category, icon: '📖', color: '#6b5b8a' };
              const diff = DIFFICULTY_MAP[course.difficulty] || DIFFICULTY_MAP.beginner;
              return (
                <Link key={course.id} href={`/courses/${course.id}`}
                  className="group block p-5 md:p-6 transition-all duration-300 hover:scale-[1.005]"
                  style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{cat.icon}</span>
                      <div>
                        <h3 className="text-base font-bold group-hover:text-[#f4f4f6] transition-colors"
                          style={{ fontFamily: "'Noto Serif SC', serif", color: '#a1a1aa' }}>{course.title}</h3>
                        <div className="flex gap-1.5 mt-1">
                          <span className="text-xs px-2 py-0.5" style={{ background: cat.color + '12', border: `1px solid ${cat.color}22`, color: cat.color, borderRadius: 2 }}>{cat.label}</span>
                          <span className="text-xs px-2 py-0.5" style={{ ...diff.style, borderRadius: 2 }}>{diff.label}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs shrink-0" style={{ color: '#52525b' }}>{course.chapter_count || (course.chapters?.length || 4)}章</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#71717a', lineHeight: 1.85 }}>{course.description}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
