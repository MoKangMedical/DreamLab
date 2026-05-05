import Link from 'next/link';
import { getCourses } from '@/lib/api';
import PageAtmosphere from '@/components/PageAtmosphere';

const CATEGORIES: Record<string, { label: string; icon: string; color: string }> = {
  freud:     { label: '弗洛伊德', icon: '🛋️', color: '#c4554d' },
  jung:      { label: '荣格',     icon: '🔮', color: '#6b5b8a' },
  modern:    { label: '神经科学', icon: '🧠', color: '#5a7d9a' },
  eastern:   { label: '东方解梦', icon: '🏮', color: '#d4a853' },
  economics: { label: '康波周期', icon: '🌊', color: '#5a9a6f' },
  positive:  { label: '积极心理', icon: '☀️', color: '#e8a850' },
  mindfulness: { label: '正念冥想', icon: '🧘', color: '#7a9aad' },
  cbt:       { label: '认知行为', icon: '🔧', color: '#4a90b8' },
  attachment: { label: '依恋理论', icon: '💕', color: '#c47a8a' },
  personality: { label: '人格心理', icon: '🪞', color: '#9a7ab8' },
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

// ═══════════════ 应用心理 — 六大学派 ═══════════════
const APP_SCHOOLS = [
  {
    name: '康波周期 × 意识', icon: '🌊', color: '#5a9a6f',
    founder: '尼古拉·康德拉季耶夫 × 荣格',
    desc: '50-60年长波周期如何塑造集体心理？从工业革命到AI时代，技术浪潮与人类意识的共振——在周期的低谷中找到内心的恒常。',
    tags: ['长波理论', '技术革命', '集体无意识', '人生规划'],
  },
  {
    name: '积极心理学', icon: '☀️', color: '#e8a850',
    founder: 'Martin Seligman',
    desc: '不研究疾病，而研究幸福。PERMA模型、心流体验、感恩实践、韧性培养——用科学方法构建丰盈人生。',
    tags: ['PERMA', '心流', '感恩', '韧性'],
  },
  {
    name: '正念冥想', icon: '🧘', color: '#7a9aad',
    founder: 'Jon Kabat-Zinn',
    desc: '从东方禅修到fMRI验证的大脑训练术。MBSR八周课程改变前额叶-杏仁核连接。不是宗教，是神经可塑性实践。',
    tags: ['MBSR', '神经可塑性', '减压', '觉知'],
  },
  {
    name: '认知行为疗法 CBT', icon: '🔧', color: '#4a90b8',
    founder: 'Aaron Beck',
    desc: '全世界研究最多的心理疗法。识别认知扭曲、挑战自动思维、重塑核心信念。不仅是疗法，更是一套终身受用的心理工具。',
    tags: ['认知三角', '认知扭曲', '苏格拉底提问', '行为激活'],
  },
  {
    name: '依恋理论', icon: '💕', color: '#c47a8a',
    founder: 'John Bowlby & Mary Ainsworth',
    desc: '童年依恋模式如何影响一生的亲密关系？安全型、焦虑型、回避型——认识你的依恋风格，理解关系冲突的根源，走向安全的修复之路。',
    tags: ['陌生情境', '安全型', '焦虑型', '内部工作模型'],
  },
  {
    name: '人格心理学', icon: '🪞', color: '#9a7ab8',
    founder: 'Gordon Allport · Myers & Briggs',
    desc: '大五人格（OCEAN）——科学界最认可的模型；MBTI——流行文化的宠儿。不同流派如何理解"我是谁"？认清人格轮廓，找到成长方向。',
    tags: ['OCEAN', 'MBTI', '特质论', '自知之明'],
  },
];

// ═══════════════ 学习路径 ═══════════════
const LEARNING_PATH = [
  { stage: 1, title: '梦学入门', desc: '弗洛伊德 · 东方解梦', courses: '1, 4', icon: '📖', color: '#c4554d' },
  { stage: 2, title: '深度解梦', desc: '荣格 · 神经科学 · 康波周期', courses: '2, 3, 5', icon: '🔬', color: '#6b5b8a' },
  { stage: 3, title: '幸福科学', desc: '积极心理学 · 正念 · 人格', courses: '6, 7, 10', icon: '☀️', color: '#e8a850' },
  { stage: 4, title: '实用工具', desc: 'CBT · 依恋理论', courses: '8, 9', icon: '🔧', color: '#4a90b8' },
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
            系统理解<br/>心灵世界
          </h1>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#71717a' }}>
            10门课程 · 39个章节 · 34万字深度内容
            <br />从弗洛伊德的沙发到神经科学的实验室，从周公的梦境到 CBT 的工具箱
            <br />——你需要的，这里都有。
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
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#a1a1aa', lineHeight: 1.8 }}>{s.theory}</p>
                <blockquote className="border-l-2 pl-4 mb-4 text-sm italic" style={{ borderColor: s.color + '40', color: '#71717a' }}>{s.quote}</blockquote>
                <div className="flex flex-wrap gap-1.5">
                  {s.keyTerms.map(t => <span key={t} className="text-xs px-2.5 py-1" style={{ background: s.color + '10', border: `1px solid ${s.color}20`, color: s.color, borderRadius: 2 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ 应用心理学 ═══════ */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} /><span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>应用心理学</span>
          </div>
          <h2 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 3vw, 36px)', color: '#f4f4f6' }}>六门学科，六种语言</h2>
          <p className="text-sm mb-8" style={{ color: '#71717a' }}>从宏观经济周期到个人幸福科学，从千年禅修到现代认知疗法。心理学远不止一把钥匙。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {APP_SCHOOLS.map(s => (
              <div key={s.name} className="p-6 group transition-all duration-300 hover:border-opacity-30" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: '#f4f4f6', fontFamily: "'Noto Serif SC', serif" }}>{s.name}</h3>
                    <p className="text-xs" style={{ color: s.color }}>{s.founder}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#71717a', lineHeight: 1.7 }}>{s.desc}</p>
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
          <h2 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 3vw, 36px)', color: '#f4f4f6' }}>推荐学习路径</h2>
          <p className="text-sm mb-8" style={{ color: '#71717a' }}>从入门到精通，四阶段递进。完成全部10门课程，获得「梦学与心灵解析师」称号。</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {LEARNING_PATH.map((stage, i) => (
              <div key={stage.stage} className="p-6 text-center relative" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 mx-auto"
                  style={{ background: stage.color + '15', border: `1px solid ${stage.color}30` }}>
                  <span className="text-base font-bold" style={{ color: stage.color }}>{stage.stage}</span>
                </div>
                <div className="text-2xl mb-2">{stage.icon}</div>
                <h3 className="text-sm font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{stage.title}</h3>
                <p className="text-xs mb-1" style={{ color: '#71717a' }}>{stage.desc}</p>
                <p className="text-xs" style={{ color: stage.color }}>课程 {stage.courses}</p>
                {i < 3 && <div className="hidden md:block absolute top-1/2 -right-1.5 w-3" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ 课程列表 ═══════ */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} /><span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>全部课程</span>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16"><div className="text-5xl mb-4">📭</div><p style={{ color: '#71717a' }}>暂无课程数据，请先启动后端服务</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    <span className="text-xs shrink-0" style={{ color: '#52525b' }}>{course.chapter_count}章</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#71717a', lineHeight: 1.6 }}>{course.description}</p>
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
