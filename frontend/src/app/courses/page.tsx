import Link from 'next/link';
import { getCourses } from '@/lib/api';
import PageAtmosphere from '@/components/PageAtmosphere';

const CATEGORIES: Record<string, { label: string; icon: string; badge: string; color: string }> = {
  freud: { label: '弗洛伊德', icon: '🛋️', badge: 'badge-coral', color: 'var(--geo-coral)' },
  jung: { label: '荣格', icon: '🔮', badge: 'badge-lavender', color: 'var(--geo-lavender)' },
  modern: { label: '现代科学', icon: '🧠', badge: 'badge-mint', color: 'var(--geo-mint)' },
  eastern: { label: '东方解梦', icon: '🏮', badge: 'badge-sand', color: 'var(--geo-sand)' },
};

const DIFFICULTY_MAP: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

// ══════════════════════════════
// 四大学派详解
// ══════════════════════════════
const SCHOOLS = [
  {
    name: '弗洛伊德精神分析',
    icon: '🛋️',
    color: '#c0392b',
    founder: '西格蒙德·弗洛伊德',
    year: '1900年 《梦的解析》出版',
    theory: '梦是通往潜意识的皇家大道。每一个梦都是被压抑欲望的伪裝满足——白天的冲动在睡眠中绕过"稽查"，以象征、凝缩、移置的方式显现。',
    keyTerms: ['潜意意识', '压抑', '愿望达成', '稽查机制', '凝缩与移置', '童年创伤'],
    quote: '"梦的解析是通往无意识心理活动的康庄大道。"',
  },
  {
    name: '荣格分析心理学',
    icon: '🔮',
    color: '#8b7ab8',
    founder: '卡尔·荣格',
    year: '1913年 与弗洛伊德决裂后独立发展',
    theory: '梦不仅来自个人被压抑的内容，更承载着全人类共享的"集体无意识"。原型、阴影、阿尼玛/阿尼姆斯——梦是心灵自我调节的自然表达，补偿白天的片面态度。',
    keyTerms: ['集体无意识', '原型', '阴影', '阿尼玛/阿尼姆斯', '补偿功能', '个性化'],
    quote: '"谁向外看，他就在梦中；谁向内看，他就会醒来。"',
  },
  {
    name: '现代神经科学',
    icon: '🧠',
    color: '#4a90b8',
    founder: 'Aserinsky & Kleitman',
    year: '1953年 REM睡眠的发现',
    theory: 'REM睡眠中，脑桥-膝状体-枕叶（PGO）波激活视觉皮层，产生生动的梦境。前额叶皮层活动降低解释了梦的荒诞与逻辑缺失。功能假说包括：记忆巩固、情绪调节、威胁模拟和突触修剪。',
    keyTerms: ['REM睡眠', 'PGO波', '前额叶皮层', '记忆巩固', '情绪调节', '默认模式网络'],
    quote: '"我们每晚用梦来整理白天的记忆，调节明日的情绪。"',
  },
  {
    name: '东方解梦传统',
    icon: '🏮',
    color: '#e8a820',
    founder: '周公 · 庄子 · 佛学唯识宗',
    year: '距今2500年以上',
    theory: '东方解梦不纠结于"真伪"，而是将梦视为"天人感应"的桥梁——《周公解梦》系统分类梦境符号，《庄子·齐物论》提出"不知周之梦为蝴蝶与，蝴蝶之梦为周与"，佛学唯识宗认为梦是第八阿赖耶识种子的现行。',
    keyTerms: ['天人感应', '庄周梦蝶', '周公解梦', '阿赖耶识', '五行', '阴阳'],
    quote: '"昔者庄周梦为蝴蝶，栩栩然蝴蝶也。"',
  },
];

// ══════════════════════════════
// 学习路径
// ══════════════════════════════
const LEARNING_PATH = [
  { stage: 1, title: '初识梦境', desc: '弗洛伊德入门 · 东方解梦文化', courses: '1, 4', icon: '📖' },
  { stage: 2, title: '深入潜意', desc: '荣格分析心理学 · 现代科学', courses: '2, 3', icon: '🔬' },
  { stage: 3, title: '实践整合', desc: '应用所学解读真实梦境 · 写反思日记', icon: '✍️' },
];

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div style={{ background: '#060f18', minHeight: '100vh' }}>
      <PageAtmosphere />
      <div className="relative z-10">{/* ════════════════ Hero ════════════════ */}
      <div className="relative pt-14 md:pt-20 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 text-xs tracking-[0.2em] uppercase"
            style={{ color: 'rgba(232,168,32,0.5)', fontFamily: 'Inter, sans-serif' }}>
            <span className="w-6 h-px" style={{ background: 'rgba(232,168,32,0.15)' }} />
            梦学の殿堂
            <span className="w-6 h-px" style={{ background: 'rgba(232,168,32,0.15)' }} />
          </div>
          <h1 className="font-bold mb-4" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(36px, 6vw, 64px)',
            color: '#f5efe0',
            lineHeight: 1.1,
          }}>
            系统理解<br/>梦的世界
          </h1>
          <p className="max-w-xl mx-auto text-sm leading-relaxed mb-3" style={{ color: '#b8ad9a' }}>
            从弗洛伊德到神经科学、从周公解梦到荣格原型——
          </p>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#7a7062' }}>
            四个学派、四把钥匙，帮你用多维度的眼睛看清同一个梦。
            每一门课都是一层油屋，穿越即成长。
          </p>
        </div>
      </div>

      {/* ════════════════ 四大学派详解 ════════════════ */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,168,32,0.5)' }}>四大学派</span>
          </div>
          <h2 className="font-bold mb-2" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(24px, 3vw, 40px)',
            color: '#f5efe0',
          }}>
            四把钥匙，同一个梦
          </h2>
          <p className="text-sm" style={{ color: '#7a7062' }}>
            没有对错，只有不同的观察角度。四重视角叠加，才能看到全貌。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {SCHOOLS.map(school => (
            <div key={school.name} className="p-8" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
              {/* 头部 */}
              <div className="flex items-start gap-4 mb-5">
                <span className="text-4xl shrink-0">{school.icon}</span>
                <div>
                  <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0' }}>
                    {school.name}
                  </h3>
                  <p className="text-xs mb-1" style={{ color: school.color }}>{school.founder}</p>
                  <p className="text-xs" style={{ color: '#5a5246' }}>{school.year}</p>
                </div>
              </div>

              {/* 理论 */}
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#b8ad9a', lineHeight: 1.8 }}>
                {school.theory}
              </p>

              {/* 名言 */}
              <blockquote className="border-l-2 pl-4 mb-5 text-sm italic leading-relaxed"
                style={{ borderColor: school.color + '40', color: '#7a7062' }}>
                {school.quote}
              </blockquote>

              {/* 核心概念 */}
              <div className="flex flex-wrap gap-1.5">
                {school.keyTerms.map(term => (
                  <span key={term} className="text-xs px-2.5 py-1"
                    style={{
                      background: school.color + '10',
                      border: `1px solid ${school.color}20`,
                      color: school.color,
                      borderRadius: 2,
                    }}>
                    {term}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ════════════════ 学习路径 ════════════════ */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,168,32,0.5)' }}>学习路线</span>
          </div>
          <h2 className="font-bold mb-2" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(24px, 3vw, 40px)',
            color: '#f5efe0',
          }}>
            推荐学习路径
          </h2>
          <p className="text-sm mb-8" style={{ color: '#7a7062' }}>
            从入门到精通，三阶段递进。完成所有课程，获得「梦学解析师」称号。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEARNING_PATH.map((stage, i) => (
              <div key={stage.stage} className="p-8 text-center relative" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                {/* 阶段号 */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 mx-auto"
                  style={{ background: '#e8a82015', border: '1px solid #e8a82030' }}>
                  <span className="text-lg font-bold" style={{ color: '#e8a820' }}>{stage.stage}</span>
                </div>
                <div className="text-3xl mb-3">{stage.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0' }}>
                  {stage.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7a7062' }}>
                  {stage.desc}
                </p>

                {/* 阶段间连线 */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ 课程列表 ════════════════ */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,168,32,0.5)' }}>全部课程</span>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📭</div>
            <p style={{ color: '#7a7062' }}>暂无课程数据，请先启动后端服务并运行 seed 脚本</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course: any, idx: number) => {
              const cat = CATEGORIES[course.category] || { label: course.category, icon: '📖', badge: '', color: '#8b7ab8' };
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group block p-6 md:p-8 transition-all duration-400 hover:scale-[1.01]"
                  style={{
                    background: '#0a1620',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 2,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{cat.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-[#f5efe0] transition-colors"
                          style={{ fontFamily: "'Noto Serif SC', serif", color: '#b8ad9a' }}>
                          {course.title}
                        </h3>
                        <div className="flex gap-2">
                          <span className="text-xs px-2 py-0.5" style={{
                            background: cat.color + '12',
                            border: `1px solid ${cat.color}22`,
                            color: cat.color,
                            borderRadius: 2,
                          }}>{cat.label}</span>
                          <span className="text-xs px-2 py-0.5" style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.06)',
                            color: '#5a5246',
                            borderRadius: 2,
                          }}>{DIFFICULTY_MAP[course.difficulty] || course.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#7a7062', lineHeight: 1.7 }}>
                    {course.description}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      </div>{/* close relative z-10 */}
    </div>
  );
}
