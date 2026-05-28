import Link from 'next/link';
import { DREAMLAB_COURSES, DREAMLAB_PHASES } from '@/lib/dreamlab-courses';
import { BUSINESS_STREAMS, USER_LOOP_STEPS } from '@/lib/product-loop';

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

const GRAPH_NODES = [
  { title: '梦境解析', sub: '潜意识入口', x: '50%', y: '18%' },
  { title: '心理测评', sub: '状态定位', x: '22%', y: '50%' },
  { title: '课程体系', sub: '理论坐标', x: '50%', y: '50%' },
  { title: '反思复盘', sub: '行动闭环', x: '78%', y: '50%' },
  { title: '成长档案', sub: '长期追踪', x: '50%', y: '82%' },
];

export default function HomePage() {
  const totalChapters = DREAMLAB_COURSES.reduce((sum, course) => sum + course.chapter_count, 0);
  const featured = DREAMLAB_COURSES.filter((course) => [1, 2, 3, 15, 31, 60].includes(course.id));

  return (
    <div className="academy-shell">
      <section className="academy-hero">
        <div className="academy-container relative z-10">
          <div className="academy-badge">DreamLab 心理研究院 · 2026 心智成长版本</div>
          <h1 className="academy-hero-title">
            用<span className="gold">心理学体系</span>建立可复盘的人生成长节奏
          </h1>
          <p className="academy-hero-copy">
            基于梦境解析、心理测评、经典理论、疗愈工具和反思日志，构建一套从自我观察到行动改变的完整心理学习框架。
          </p>
          <div className="academy-actions">
            <Link href="/courses" className="btn btn-primary">查看课程 →</Link>
            <Link href="/dream" className="btn btn-ghost">免费体验工具</Link>
          </div>
          <div className="academy-stats">
            <div>
              <div className="academy-stat-number">100门</div>
              <div className="academy-stat-label">心理学精编课程</div>
            </div>
            <div>
              <div className="academy-stat-number">7院</div>
              <div className="academy-stat-label">完整学院体系</div>
            </div>
            <div>
              <div className="academy-stat-number">{totalChapters}</div>
              <div className="academy-stat-label">课程章节与练习</div>
            </div>
          </div>
        </div>
      </section>

      <section className="academy-section academy-section-muted">
        <div className="academy-container">
          <div className="academy-section-header">
            <div className="academy-kicker">理论体系</div>
            <h2 className="academy-section-title">四维成长框架，一个完整心理系统</h2>
            <p className="academy-section-copy">
              DreamLab 把心理成长拆成四个维度：看见材料、定位状态、学习理论、完成复盘。每个维度都可以独立使用，也会互相校准。
            </p>
          </div>

          <div className="academy-graph">
            <div className="academy-graph-canvas">
              <div className="academy-graph-line" />
              {GRAPH_NODES.map((node) => (
                <div key={node.title} className="academy-graph-node" style={{ left: node.x, top: node.y }}>
                  {node.title}
                  <span>{node.sub}</span>
                </div>
              ))}
            </div>
            <div className="academy-graph-sidebar">
              <div className="academy-kicker">知识图谱</div>
              <h3 className="text-2xl font-bold mb-5" style={{ fontFamily: 'var(--font-serif)', color: '#fafafa' }}>
                从一个梦境开始，走到长期成长档案
              </h3>
              <p className="text-sm leading-9 mb-8" style={{ color: '#a1a1aa' }}>
                用户可以先写梦、做测评，也可以直接进入课程。系统会把学习记录、反思内容和成长任务沉淀为个人路线。
              </p>
              <Link href="/quest" className="btn btn-primary">进入成长仪表盘 →</Link>
            </div>
          </div>

          <div className="academy-pillars">
            {FRAMEWORK.map((item, index) => (
              <div key={item.title} className="academy-pillar">
                <div className="text-4xl mb-8" style={{ color: '#e2b64f', fontFamily: 'var(--font-serif)' }}>0{index + 1}</div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#fafafa', fontFamily: 'var(--font-serif)' }}>{item.title}</h3>
                <p className="text-sm leading-8" style={{ color: '#a1a1aa' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-28 md:py-40">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between gap-10 mb-20 md:mb-24">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
                <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>用户闭环</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.18 }}>
                第一次访问就知道下一步
              </h2>
            </div>
            <Link href="/journey" className="hidden md:inline-flex text-sm" style={{ color: '#d4a853' }}>查看完整闭环 →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 xl:gap-10">
            {USER_LOOP_STEPS.map((step) => (
            <Link key={step.index} href={step.href} className="premium-panel block p-8 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="text-sm mb-5" style={{ color: step.color }}>{step.index}</div>
                <h3 className="text-lg font-bold mb-3 leading-7" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{step.title}</h3>
                <p className="text-sm leading-8 mb-7" style={{ color: '#85858e' }}>{step.desc}</p>
                <span className="text-xs" style={{ color: step.color }}>{step.action} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-28 md:py-40">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4 mb-20 md:mb-24">
            <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>能力排布</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {CAPABILITIES.map((item) => (
              <Link key={item.href} href={item.href} className="premium-panel group block p-8 md:p-10 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="w-10 h-1 mb-8" style={{ background: item.accent, borderRadius: 999 }} />
                <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{item.title}</h2>
                <p className="text-sm leading-9 mb-9" style={{ color: '#85858e' }}>{item.desc}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: item.accent }}>{item.metric}</span>
                  <span className="text-xs" style={{ color: '#71717a' }}>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-28 md:py-40">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[0.76fr_1.24fr] gap-20 xl:gap-32">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>研究框架</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.18 }}>
              从梦境材料到成长路线
            </h2>
            <p className="text-base leading-10" style={{ color: '#85858e' }}>
              从一段梦境、一份量表或一次情绪波动开始，逐步连接理论、练习和反思。
              每一次记录都会成为下一次理解自己的线索。
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 xl:gap-10">
            {FRAMEWORK.map((item, index) => (
              <div key={item.title} className="premium-panel p-8 md:p-10">
                <div className="text-sm mb-5" style={{ color: '#d4a853' }}>0{index + 1}</div>
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{item.title}</h3>
                <p className="text-sm leading-9" style={{ color: '#85858e' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-28 md:py-40">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between gap-10 mb-20 md:mb-24">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
                <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>课程路径</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>7 大学院</h2>
            </div>
            <Link href="/courses" className="hidden md:inline-flex text-sm" style={{ color: '#d4a853' }}>全部课程 →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
            {DREAMLAB_PHASES.map((phase) => (
              <Link key={phase.key} href="/courses" className="premium-panel p-8 md:p-10 flex gap-7 items-start transition-all duration-300 hover:translate-y-[-2px]">
                <div className="w-12 h-12 flex items-center justify-center text-sm font-bold shrink-0" style={{ background: phase.color, color: '#0a0a0c', borderRadius: 8 }}>
                  {phase.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{phase.title}</h3>
                  <p className="text-sm leading-8" style={{ color: '#71717a' }}>{phase.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-28 md:py-40">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[0.76fr_1.24fr] gap-20 xl:gap-32">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>商业模式</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.18 }}>
              从学习系统走向会员服务
            </h2>
            <p className="text-base leading-10 mb-12" style={{ color: '#85858e' }}>
              免费体验负责建立信任，成长会员负责持续复盘，机构方案负责把课程和报告能力规模化。
            </p>
            <Link href="/membership" className="btn btn-ghost">
              查看会员与机构方案 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
            {BUSINESS_STREAMS.slice(0, 4).map((stream) => (
              <div key={stream.title} className="premium-panel p-8 md:p-10">
                <div className="text-xs mb-5" style={{ color: '#d4a853' }}>{stream.stage}</div>
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{stream.title}</h3>
                <p className="text-sm leading-9" style={{ color: '#85858e' }}>{stream.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 pt-28 md:pt-40 pb-36 md:pb-52">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4 mb-20 md:mb-24">
            <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>先学这六课</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10">
            {featured.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="premium-panel block p-8 md:p-10 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="text-xs mb-5" style={{ color: '#d4a853' }}>Course {course.id}</div>
                <h3 className="text-lg font-bold mb-4 leading-8" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{course.title}</h3>
                <p className="text-sm leading-8 mb-5" style={{ color: '#85858e' }}>{course.description}</p>
                <p className="text-xs leading-6" style={{ color: '#d4a853' }}>产出：{course.outcome}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
