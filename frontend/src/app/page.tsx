import Link from 'next/link';
import { DREAMLAB_COURSES, DREAMLAB_PHASES } from '@/lib/dreamlab-courses';
import { QUEST_BADGES, QUEST_PROFILE } from '@/lib/growth-quest';
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

export default function HomePage() {
  const totalMinutes = DREAMLAB_COURSES.reduce((sum, course) => sum + course.minutes, 0);
  const totalChapters = DREAMLAB_COURSES.reduce((sum, course) => sum + course.chapter_count, 0);
  const featured = DREAMLAB_COURSES.filter((course) => [1, 2, 3, 15, 31, 60].includes(course.id));

  return (
    <div style={{ background: '#0a0a0c' }}>
      <section className="px-5 md:px-8 pt-20 md:pt-32 pb-20 md:pb-28">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 xl:gap-20 items-center">
            <div>
              <h1
                className="font-bold mb-7"
                style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(52px, 8vw, 96px)', lineHeight: 1.04, color: '#f4f4f6' }}
              >
                DreamLab 心理研究院
              </h1>
              <p className="text-lg md:text-xl leading-10 max-w-2xl mb-10" style={{ color: '#a1a1aa' }}>
                用梦境解析、心理测评、经典课程、知识库和反思日志，建立一套可学习、可观察、可复盘的心智成长系统。
                从潜意识线索到日常照护动作，把心理学知识放进真实生活。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quest" className="btn btn-primary" style={{ padding: '17px 34px' }}>
                  进入成长游戏 →
                </Link>
                <Link href="/courses" className="btn btn-ghost" style={{ padding: '17px 34px' }}>
                  查看 100 门课程
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { value: '100', label: '心理课程' },
                { value: '7', label: '学院体系' },
                { value: `${Math.round(totalMinutes / 60)}h`, label: '学习时长' },
                { value: '6', label: '心理量表' },
                { value: 'AI', label: '梦境解析' },
                { value: `${totalChapters}`, label: '课程章节' },
              ].map((item) => (
                <div key={item.label} className="p-5 md:p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                  <div className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d4a853' }}>{item.value}</div>
                  <div className="text-[11px] mt-1" style={{ color: '#71717a' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-12 xl:gap-20 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>成长游戏</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.18 }}>
              像通关一样完成心理成长
            </h2>
            <p className="text-base leading-8 mb-8" style={{ color: '#85858e' }}>
              用户会看到等级、经验、主线任务、能力树和徽章，但每一次奖励都对应真实行动：
              做测评、记录梦境、学习课程、写反思、完成复盘。
            </p>
            <Link href="/quest" className="btn btn-primary">
              打开成长地图 →
            </Link>
          </div>

          <Link href="/quest" className="block p-7 md:p-8 transition-all duration-300 hover:translate-y-[-2px]" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: `Lv.${QUEST_PROFILE.level}`, label: QUEST_PROFILE.title },
                { value: `${QUEST_PROFILE.streakDays}天`, label: '连续探索' },
                { value: `${QUEST_PROFILE.completionRate}%`, label: '完成率' },
                { value: '6', label: '成长徽章' },
              ].map((item) => (
                <div key={item.label} className="p-4" style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                  <div className="text-2xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d4a853' }}>{item.value}</div>
                  <div className="text-xs mt-1" style={{ color: '#71717a' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {QUEST_BADGES.map((badge) => (
                <div key={badge.name} className="text-center p-3" style={{ background: badge.unlocked ? `${badge.color}10` : '#0a0a0c', border: `1px solid ${badge.unlocked ? `${badge.color}33` : 'rgba(255,255,255,0.05)'}`, borderRadius: 8, opacity: badge.unlocked ? 1 : 0.54 }}>
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center text-sm font-bold" style={{ color: badge.color, border: `1px solid ${badge.color}44`, borderRadius: '50%', fontFamily: "'Noto Serif SC', serif" }}>
                    {badge.icon}
                  </div>
                  <div className="text-[11px] leading-4" style={{ color: '#a1a1aa' }}>{badge.name}</div>
                </div>
              ))}
            </div>
          </Link>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center justify-between gap-6 mb-10">
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {USER_LOOP_STEPS.map((step) => (
              <Link key={step.index} href={step.href} className="block p-6 transition-all duration-300 hover:translate-y-[-2px]" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-sm mb-5" style={{ color: step.color }}>{step.index}</div>
                <h3 className="text-lg font-bold mb-3 leading-7" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{step.title}</h3>
                <p className="text-sm leading-7 mb-5" style={{ color: '#85858e' }}>{step.desc}</p>
                <span className="text-xs" style={{ color: step.color }}>{step.action} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>能力排布</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((item) => (
              <Link key={item.href} href={item.href} className="group block p-7 md:p-8 transition-all duration-300 hover:translate-y-[-2px]" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="w-9 h-1 mb-6" style={{ background: item.accent, borderRadius: 999 }} />
                <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{item.title}</h2>
                <p className="text-sm leading-8 mb-7" style={{ color: '#85858e' }}>{item.desc}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: item.accent }}>{item.metric}</span>
                  <span className="text-xs" style={{ color: '#71717a' }}>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-12 xl:gap-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>研究框架</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.18 }}>
              从梦境材料到成长路线
            </h2>
            <p className="text-base leading-8" style={{ color: '#85858e' }}>
              从一段梦境、一份量表或一次情绪波动开始，逐步连接理论、练习和反思。
              每一次记录都会成为下一次理解自己的线索。
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FRAMEWORK.map((item, index) => (
              <div key={item.title} className="p-7" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-sm mb-4" style={{ color: '#d4a853' }}>0{index + 1}</div>
                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{item.title}</h3>
                <p className="text-sm leading-8" style={{ color: '#85858e' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
                <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>课程路径</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>7 大学院</h2>
            </div>
            <Link href="/courses" className="hidden md:inline-flex text-sm" style={{ color: '#d4a853' }}>全部课程 →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DREAMLAB_PHASES.map((phase) => (
              <Link key={phase.key} href="/courses" className="p-6 md:p-7 flex gap-5 items-start transition-all duration-300 hover:translate-y-[-2px]" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="w-12 h-12 flex items-center justify-center text-sm font-bold shrink-0" style={{ background: phase.color, color: '#0a0a0c', borderRadius: 8 }}>
                  {phase.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{phase.title}</h3>
                  <p className="text-sm leading-7" style={{ color: '#71717a' }}>{phase.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-12 xl:gap-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>商业模式</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.18 }}>
              从学习系统走向会员服务
            </h2>
            <p className="text-base leading-8 mb-8" style={{ color: '#85858e' }}>
              免费体验负责建立信任，成长会员负责持续复盘，机构方案负责把课程和报告能力规模化。
            </p>
            <Link href="/membership" className="btn btn-ghost">
              查看会员与机构方案 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BUSINESS_STREAMS.slice(0, 4).map((stream) => (
              <div key={stream.title} className="p-7" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-xs mb-4" style={{ color: '#d4a853' }}>{stream.stage}</div>
                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{stream.title}</h3>
                <p className="text-sm leading-8" style={{ color: '#85858e' }}>{stream.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 pt-20 md:pt-24 pb-28 md:pb-36">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>先学这六课</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="block p-6 md:p-7" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-xs mb-4" style={{ color: '#d4a853' }}>Course {course.id}</div>
                <h3 className="text-lg font-bold mb-3 leading-7" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{course.title}</h3>
                <p className="text-sm leading-7 mb-4" style={{ color: '#85858e' }}>{course.description}</p>
                <p className="text-xs leading-6" style={{ color: '#d4a853' }}>产出：{course.outcome}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
