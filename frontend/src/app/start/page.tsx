import Link from 'next/link';

const ENTRY_STEPS = [
  {
    title: '从一个梦开始',
    desc: '写下最近印象最深的梦，先看情绪、人物和重复主题。',
    href: '/dream',
    action: '记录梦境',
  },
  {
    title: '做一次轻测评',
    desc: '用 3 分钟建立第一张心理观察图，不把结果当标签。',
    href: '/assessments',
    action: '开始测评',
  },
  {
    title: '匹配一节课程',
    desc: '从梦境、焦虑、关系、睡眠或拖延进入对应课程。',
    href: '/courses',
    action: '看课程地图',
  },
] as const;

const ROUTES = [
  '梦境困扰：弗洛伊德、荣格、现代睡眠科学',
  '情绪过载：CBT、正念、情绪调节',
  '关系反复：依恋理论、沟通心理学、家庭系统',
  '睡眠问题：睡眠卫生、噩梦心理学、梦的神经科学',
] as const;

export default function StartPage() {
  return (
    <div className="academy-shell">
      <section className="academy-hero" style={{ minHeight: 760 }}>
        <div className="academy-container relative z-10">
          <div className="academy-badge">DreamLab · 3 分钟开始</div>
          <h1 className="academy-hero-title">
            从一个真实问题，进入你的<span className="gold">心理成长路线</span>
          </h1>
          <p className="academy-hero-copy">
            这里不是诊断室，而是心理学学习与自我观察实验室。你可以从梦境、测评或课程开始，
            形成一条可记录、可学习、可复盘的成长路径。
          </p>
          <div className="academy-actions">
            <Link href="/dream" className="btn btn-primary">记录一个梦 →</Link>
            <Link href="/assessments" className="btn btn-ghost">做一次轻测评</Link>
          </div>
        </div>
      </section>

      <section className="academy-section academy-section-muted">
        <div className="academy-container">
          <div className="academy-section-header">
            <div className="academy-kicker">第一次体验</div>
            <h2 className="academy-section-title">先完成一个很小的闭环</h2>
            <p className="academy-section-copy">
              外部平台来的用户不用先理解整个系统，只需要完成一次记录、一次测评或一节课。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENTRY_STEPS.map((step, index) => (
              <Link key={step.title} href={step.href} className="premium-panel p-8 md:p-10 block">
                <div className="text-sm mb-6" style={{ color: '#e2b64f' }}>0{index + 1}</div>
                <h3 className="text-2xl font-bold mb-5" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-8 mb-7" style={{ color: '#a1a1aa' }}>{step.desc}</p>
                <span className="text-sm" style={{ color: '#e2b64f' }}>{step.action} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section">
        <div className="academy-container-wide grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-12 xl:gap-20 items-start">
          <div>
            <div className="academy-kicker mb-5">课程承接</div>
            <h2 className="academy-section-title mb-7">100 门课不是让你一次学完</h2>
            <p className="academy-section-copy mx-0">
              DreamLab 会把你正在面对的问题，连接到一组心理学课程、章节音频和反思动作。
              成长不是刷完内容，而是形成自己的观察方法。
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link href="/courses" className="btn btn-primary">进入课程体系</Link>
              <Link href="/quest" className="btn btn-ghost">查看成长地图</Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ROUTES.map((route) => (
              <div key={route} className="premium-panel p-7">
                <p className="text-sm leading-8" style={{ color: '#c8c8d0' }}>{route}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section academy-section-muted">
        <div className="academy-container">
          <div className="premium-panel p-8 md:p-12 text-center">
            <div className="academy-kicker mb-5">商业边界</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-7" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>
              心理学教育、自我观察和成长复盘
            </h2>
            <p className="text-base md:text-lg leading-9 max-w-3xl mx-auto mb-9" style={{ color: '#a1a1aa' }}>
              DreamLab 不替代专业诊断或治疗。会员价值来自持续课程、周/月复盘、AI 陪伴额度和个人成长路线。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/membership" className="btn btn-primary">查看会员方案</Link>
              <Link href="/reflect" className="btn btn-ghost">写一条反思日志</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
