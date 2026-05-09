import Link from 'next/link';
import { KANGBO_COURSES, KANGBO_PHASES } from '@/lib/kangbo-courses';

const CAPABILITIES = [
  {
    href: '/courses',
    title: '康波课程体系',
    desc: '65 门课程串联长波理论、投资大师、宏观指标、资产配置和传承方案。',
    metric: '65',
    label: '门课程',
    accent: '#d4a853',
  },
  {
    href: '/predict',
    title: '周期定位工具',
    desc: '用年龄、资产、风险偏好和关键变量生成 2026-2040 的观察与行动框架。',
    metric: '2040',
    label: '规划终点',
    accent: '#4f9db8',
  },
  {
    href: '/knowledge',
    title: '心理学知识库',
    desc: '保留 CBT、正念、依恋、神经科学、积极心理学和睡眠科学等原有知识内容。',
    metric: '10',
    label: '知识主题',
    accent: '#8b7cf6',
  },
  {
    href: '/reflect',
    title: '策略复盘',
    desc: '把每次判断写成假设、证据、风险和下次复盘日期，形成个人研究档案。',
    metric: '4',
    label: '复盘字段',
    accent: '#72a66a',
  },
  {
    href: '/assessments',
    title: '投资者画像',
    desc: '保留心理测评能力，用于识别风险承受力、情绪波动和行为偏差。',
    metric: '6',
    label: '量表',
    accent: '#c4554d',
  },
  {
    href: '/profile',
    title: '我的财富路线',
    desc: '跟踪课程进度、复盘记录和长期目标，形成可持续的学习闭环。',
    metric: '30Y',
    label: '路线图',
    accent: '#cfa34d',
  },
];

const FRAMEWORK = [
  { title: '长波定方向', desc: '用 50-60 年技术与资本开支周期判断大方向。' },
  { title: '中周期定节奏', desc: '结合债务、库存、地产和政策周期决定等待或行动。' },
  { title: '产业定赛道', desc: '观察 AI、能源、生物科技、先进制造等主导产业扩散。' },
  { title: '家庭定方案', desc: '把资产、职业、城市、教育和传承放进同一张路线图。' },
];

export default function HomePage() {
  const totalMinutes = KANGBO_COURSES.reduce((sum, course) => sum + course.minutes, 0);
  const featured = KANGBO_COURSES.filter((course) => [1, 2, 3, 6, 20, 50].includes(course.id));

  return (
    <div style={{ background: '#0a0a0c' }}>
      <section className="px-5 md:px-6 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 items-end">
            <div>
              <h1
                className="font-bold mb-5"
                style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(48px, 9vw, 92px)', lineHeight: 1.02, color: '#f4f4f6' }}
              >
                康波研究院
              </h1>
              <p className="text-lg md:text-xl leading-9 max-w-2xl mb-8" style={{ color: '#a1a1aa' }}>
                掌握 50 年财富周期，把宏观长波、产业变迁、资产配置和人生阶段放进同一套研究系统。
                从 2026 到 2040，做有证据、有节奏、有复盘的长期决策。
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/courses" className="btn btn-primary" style={{ padding: '15px 30px' }}>
                  查看 65 门课程 →
                </Link>
                <Link href="/reflect" className="btn btn-ghost">
                  开始策略复盘
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '65', label: '精编课程' },
                { value: '10', label: '阶段体系' },
                { value: `${Math.round(totalMinutes / 60)}h`, label: '学习时长' },
                { value: '4', label: '共振框架' },
                { value: '2026', label: '回升窗口' },
                { value: '2040', label: '路线终点' },
              ].map((item) => (
                <div key={item.label} className="p-4 md:p-5" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                  <div className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d4a853' }}>{item.value}</div>
                  <div className="text-[11px] mt-1" style={{ color: '#71717a' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: 28, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>能力排布</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CAPABILITIES.map((item) => (
              <Link key={item.href} href={item.href} className="group block p-6 transition-all duration-300 hover:translate-y-[-2px]" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="w-8 h-1 mb-5" style={{ background: item.accent, borderRadius: 999 }} />
                <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{item.title}</h2>
                <p className="text-sm leading-7 mb-5" style={{ color: '#85858e' }}>{item.desc}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: item.accent }}>{item.metric}</span>
                  <span className="text-xs" style={{ color: '#71717a' }}>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 28, height: 1, background: 'rgba(212,168,83,0.2)' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>研究框架</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
              从宏观周期到个人方案
            </h2>
            <p className="text-sm leading-7" style={{ color: '#85858e' }}>
              首页不再按心理功能堆叠，而是按照“研究框架 → 课程体系 → 工具复盘 → 个人路线”组织。
              这样用户进入后先理解方法，再进入课程和实践。
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FRAMEWORK.map((item, index) => (
              <div key={item.title} className="p-5" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-sm mb-3" style={{ color: '#d4a853' }}>0{index + 1}</div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{item.title}</h3>
                <p className="text-sm leading-7" style={{ color: '#85858e' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 28, height: 1, background: 'rgba(212,168,83,0.2)' }} />
                <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>课程路径</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>10 大阶段</h2>
            </div>
            <Link href="/courses" className="hidden md:inline-flex text-sm" style={{ color: '#d4a853' }}>全部课程 →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {KANGBO_PHASES.map((phase) => (
              <Link key={phase.key} href="/courses" className="p-5 flex gap-4 items-start transition-all duration-300 hover:translate-y-[-2px]" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="w-11 h-11 flex items-center justify-center text-sm font-bold shrink-0" style={{ background: phase.color, color: '#0a0a0c', borderRadius: 8 }}>
                  {phase.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{phase.title}</h3>
                  <p className="text-xs leading-6" style={{ color: '#71717a' }}>{phase.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-6 pt-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: 28, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>先学这六课</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featured.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="block p-5" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-xs mb-3" style={{ color: '#d4a853' }}>Course {course.id}</div>
                <h3 className="font-bold mb-2 leading-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{course.title}</h3>
                <p className="text-xs leading-6 mb-3" style={{ color: '#85858e' }}>{course.description}</p>
                <p className="text-xs" style={{ color: '#d4a853' }}>产出：{course.outcome}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
