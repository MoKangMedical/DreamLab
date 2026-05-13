import Link from 'next/link';
import { BUSINESS_STREAMS, MEMBERSHIP_PLANS } from '@/lib/product-loop';

const GUARDRAILS = [
  '内容定位为心理学教育、自我观察和成长记录，不替代诊断或治疗。',
  '涉及测评结果、梦境和反思数据时，优先做本地化、匿名化和最小化采集。',
  '商业化先从会员内容、复盘报告和机构课程包开始，支付与咨询服务后置上线。',
];

export default function MembershipPage() {
  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <section className="px-5 md:px-8 pt-20 md:pt-32 pb-20 md:pb-24">
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-4xl">
            <h1
              className="font-bold mb-7"
              style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(46px, 7vw, 86px)', lineHeight: 1.06, color: '#f4f4f6' }}
            >
              DreamLab 会员与商业模式
            </h1>
            <p className="text-lg md:text-xl leading-10 mb-10 max-w-3xl" style={{ color: '#a1a1aa' }}>
              商业化不直接从“卖内容”开始，而是围绕用户成长闭环设计：
              用户愿意为持续复盘、个性化路线、AI 陪伴额度和机构级心理教育方案付费。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/journey" className="btn btn-primary" style={{ padding: '17px 34px' }}>
                先看用户闭环 →
              </Link>
              <Link href="/profile" className="btn btn-ghost" style={{ padding: '17px 34px' }}>
                查看个人中心
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>会员分层</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.name}
                className="p-7 flex flex-col"
                style={{
                  background: plan.featured ? 'rgba(212,168,83,0.08)' : '#111113',
                  border: plan.featured ? '1px solid rgba(212,168,83,0.28)' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8,
                }}
              >
                <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{plan.name}</h2>
                <div className="text-3xl font-bold mb-5" style={{ fontFamily: "'Noto Serif SC', serif", color: plan.featured ? '#d4a853' : '#a1a1aa' }}>
                  {plan.price}
                </div>
                <p className="text-sm leading-8 mb-7" style={{ color: '#85858e' }}>{plan.desc}</p>
                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-3 text-sm leading-6" style={{ color: '#a1a1aa' }}>
                      <span style={{ color: '#d4a853' }}>·</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href={plan.href} className={plan.featured ? 'btn btn-primary' : 'btn btn-ghost'}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-12 xl:gap-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>收入结构</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.18 }}>
              从个人成长到机构服务
            </h2>
            <p className="text-base leading-8" style={{ color: '#85858e' }}>
              前期优先验证 B2C 留存和复盘价值；中期把课程体系产品化；
              后期再扩展到学校、企业 EAP 和心理工作室的机构方案。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BUSINESS_STREAMS.map((stream) => (
              <div key={stream.title} className="p-7" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-xs mb-4" style={{ color: '#d4a853' }}>{stream.stage}</div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{stream.title}</h3>
                <p className="text-sm leading-8" style={{ color: '#85858e' }}>{stream.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 pt-20 md:pt-24 pb-32 md:pb-40">
        <div className="max-w-[1180px] mx-auto">
          <div className="p-8 md:p-10" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-7" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
              上线前的商业化边界
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {GUARDRAILS.map((item, index) => (
                <div key={item} className="p-6" style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                  <div className="text-sm mb-4" style={{ color: '#d4a853' }}>0{index + 1}</div>
                  <p className="text-sm leading-8" style={{ color: '#a1a1aa' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
