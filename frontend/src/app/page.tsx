import Link from 'next/link';
import { DREAMLAB_COURSES, DREAMLAB_PHASES } from '@/lib/dreamlab-courses';

const CAPABILITIES = [
  {
    href: '/courses',
    title: 'DreamLab 课程体系',
    desc: '100 门心理学课程串联梦境解析、核心理论、疗愈工具、生活应用和前沿交叉。',
    metric: '100',
    label: '门课程',
    accent: '#d4a853',
  },
  {
    href: '/assessments',
    title: '心理测评矩阵',
    desc: '用标准化量表观察焦虑、抑郁、睡眠、人格、韧性和综合心理状态。',
    metric: '6',
    label: '套量表',
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
    title: '反思日志',
    desc: '把梦境、情绪、自动想法和行动选择写成可复盘的成长记录。',
    metric: '4',
    label: '记录维度',
    accent: '#72a66a',
  },
  {
    href: '/dream',
    title: '梦境解析',
    desc: '记录梦境文本，生成象征、情绪、潜意识主题和生活线索。',
    metric: 'AI',
    label: '解析',
    accent: '#c4554d',
  },
  {
    href: '/profile',
    title: '我的成长路线',
    desc: '跟踪课程、测评、梦境和反思记录，形成个人心理学习档案。',
    metric: '1',
    label: '路线图',
    accent: '#cfa34d',
  },
];

const FRAMEWORK = [
  { title: '梦境看入口', desc: '用梦境素材进入潜意识、情绪主题和未被表达的需求。' },
  { title: '理论建坐标', desc: '用人格、发展、社会、神经与存在主义理论建立理解框架。' },
  { title: '工具做练习', desc: '用 CBT、正念、依恋和创伤修复工具支持日常自我照护。' },
  { title: '记录成路线', desc: '把测评、课程、梦境和反思连接成可持续的个人成长档案。' },
];

export default function HomePage() {
  const totalMinutes = DREAMLAB_COURSES.reduce((sum, course) => sum + course.minutes, 0);
  const totalChapters = DREAMLAB_COURSES.reduce((sum, course) => sum + course.chapter_count, 0);
  const featured = DREAMLAB_COURSES.filter((course) => [1, 2, 3, 15, 31, 60].includes(course.id));

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
                DreamLab 心理研究院
              </h1>
              <p className="text-lg md:text-xl leading-9 max-w-2xl mb-8" style={{ color: '#a1a1aa' }}>
                用梦境解析、心理测评、经典课程、知识库和反思日志，建立一套可学习、可观察、可复盘的心智成长系统。
                从潜意识线索到日常照护动作，把心理学知识放进真实生活。
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/courses" className="btn btn-primary" style={{ padding: '15px 30px' }}>
                  查看 100 门课程 →
                </Link>
                <Link href="/reflect" className="btn btn-ghost">
                  开始反思记录
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '100', label: '心理课程' },
                { value: '7', label: '学院体系' },
                { value: `${Math.round(totalMinutes / 60)}h`, label: '学习时长' },
                { value: '6', label: '心理量表' },
                { value: 'AI', label: '梦境解析' },
                { value: `${totalChapters}`, label: '课程章节' },
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
              从梦境材料到成长路线
            </h2>
            <p className="text-sm leading-7" style={{ color: '#85858e' }}>
              从一段梦境、一份量表或一次情绪波动开始，逐步连接理论、练习和反思。
              每一次记录都会成为下一次理解自己的线索。
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
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>7 大学院</h2>
            </div>
            <Link href="/courses" className="hidden md:inline-flex text-sm" style={{ color: '#d4a853' }}>全部课程 →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DREAMLAB_PHASES.map((phase) => (
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
