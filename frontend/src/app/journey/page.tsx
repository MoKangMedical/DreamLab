import Link from 'next/link';
import { LOOP_RHYTHMS, PRODUCT_METRICS, USER_LOOP_STEPS } from '@/lib/product-loop';

export default function JourneyPage() {
  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <section className="px-5 md:px-8 pt-20 md:pt-32 pb-20 md:pb-24">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-14 xl:gap-20 items-center">
          <div>
            <h1
              className="font-bold mb-7"
              style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(46px, 7vw, 86px)', lineHeight: 1.06, color: '#f4f4f6' }}
            >
              用户成长闭环
            </h1>
            <p className="text-lg md:text-xl leading-10 mb-10 max-w-2xl" style={{ color: '#a1a1aa' }}>
              DreamLab 不只是内容集合，而是一条可执行的心理成长路径：
              先理解状态，再记录真实材料，进入课程学习，最后用反思和个人中心完成复盘。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/assessments" className="btn btn-primary" style={{ padding: '17px 34px' }}>
                从测评开始 →
              </Link>
              <Link href="/membership" className="btn btn-ghost" style={{ padding: '17px 34px' }}>
                查看会员方案
              </Link>
            </div>
          </div>

          <div className="p-7 md:p-8" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
            <div className="text-xs tracking-[0.18em] mb-6" style={{ color: 'rgba(212,168,83,0.62)' }}>FIRST 7 DAYS</div>
            <div className="space-y-5">
              {USER_LOOP_STEPS.map((step) => (
                <Link key={step.index} href={step.href} className="group flex gap-5 items-start">
                  <div
                    className="w-12 h-12 shrink-0 flex items-center justify-center text-sm font-bold"
                    style={{ background: `${step.color}22`, border: `1px solid ${step.color}44`, color: step.color, borderRadius: 8 }}
                  >
                    {step.index}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold mb-1 group-hover:text-[#f4f4f6]" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d7d7dc' }}>
                      {step.title}
                    </h2>
                    <p className="text-sm leading-7" style={{ color: '#71717a' }}>
                      {step.action}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>闭环步骤</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {USER_LOOP_STEPS.map((step) => (
              <Link key={step.index} href={step.href} className="block p-6 transition-all duration-300 hover:translate-y-[-2px]" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-sm mb-5" style={{ color: step.color }}>{step.index}</div>
                <h2 className="text-xl font-bold mb-3 leading-7" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
                  {step.title}
                </h2>
                <p className="text-sm leading-8 mb-6" style={{ color: '#85858e' }}>{step.desc}</p>
                <span className="text-xs" style={{ color: step.color }}>{step.action} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 xl:gap-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>运营节奏</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.18 }}>
              把一次访问变成长期关系
            </h2>
            <p className="text-base leading-8" style={{ color: '#85858e' }}>
              用户闭环的核心不是增加更多页面，而是让每一次行动都有下一步：
              测评产生问题，记录提供材料，课程提供方法，反思完成复盘。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LOOP_RHYTHMS.map((item) => (
              <div key={item.title} className="p-7" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{item.title}</h3>
                <p className="text-sm leading-8 mb-6" style={{ color: '#85858e' }}>{item.desc}</p>
                <p className="text-xs leading-6" style={{ color: '#d4a853' }}>{item.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 pt-20 md:pt-24 pb-32 md:pb-40">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>产品指标</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {PRODUCT_METRICS.map((metric) => (
              <div key={metric.label} className="p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{metric.label}</h3>
                <p className="text-sm leading-7" style={{ color: '#85858e' }}>{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
