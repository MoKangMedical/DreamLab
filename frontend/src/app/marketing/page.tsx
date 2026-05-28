import Link from 'next/link';
import {
  BUSINESS_ACTIVATION,
  CHANNEL_PLAYS,
  COMPLIANCE_CHECKLIST,
  CONTENT_CALENDAR,
  DIGITAL_HUMAN_EPISODES,
  DOUYIN_LAUNCH_VIDEOS,
  GTM_FUNNEL,
  LAUNCH_METRICS,
  MARKETING_ASSET_PACK,
  SHORT_VIDEO_SCRIPTS,
  SOCIAL_LANDING_ROUTES,
  XHS_LAUNCH_POSTS,
} from '@/lib/go-to-market';

export default function MarketingPage() {
  return (
    <div className="academy-shell">
      <section className="academy-hero" style={{ minHeight: 840 }}>
        <div className="academy-container relative z-10">
          <div className="academy-badge">DreamLab 增长作战室 · 商业落地版本</div>
          <h1 className="academy-hero-title">
            把心理学产品做成<span className="gold">可传播、可转化、可复盘</span>的增长系统
          </h1>
          <p className="academy-hero-copy">
            围绕免费工具、100 门课程、成长会员、机构方案和数字人内容，把小红书、抖音与站内商业闭环连接起来。
          </p>
          <div className="academy-actions">
            <Link href="/start" className="btn btn-primary">打开外部落地页 →</Link>
            <Link href="/membership" className="btn btn-ghost">查看会员承接</Link>
            <Link href="/courses" className="btn btn-ghost">进入课程体系</Link>
          </div>
        </div>
      </section>

      <section className="academy-section academy-section-muted">
        <div className="academy-container">
          <div className="academy-section-header">
            <div className="academy-kicker">增长漏斗</div>
            <h2 className="academy-section-title">先做信任，再做转化</h2>
            <p className="academy-section-copy">
              外部内容负责发现与信任，站内工具负责体验，课程和报告负责留存，会员与机构方案负责收入。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {GTM_FUNNEL.map((item, index) => (
              <div key={item.stage} className="premium-panel p-7">
                <div className="text-sm mb-5" style={{ color: '#e2b64f' }}>0{index + 1}</div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>{item.stage}</h3>
                <p className="text-sm leading-8 mb-5" style={{ color: '#a1a1aa' }}>{item.goal}</p>
                <div className="space-y-2 mb-5">
                  {item.assets.map((asset) => (
                    <div key={asset} className="text-xs" style={{ color: '#71717a' }}>· {asset}</div>
                  ))}
                </div>
                <div className="text-xs" style={{ color: '#e2b64f' }}>{item.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section academy-section-muted">
        <div className="academy-container-wide">
          <div className="academy-section-header">
            <div className="academy-kicker">可下载视觉资产</div>
            <h2 className="academy-section-title">首批小红书、抖音和数字人素材已生成</h2>
            <p className="academy-section-copy">
              所有资产位于 public/marketing，同时提供 PNG 和 SVG。PNG 可直接进入小红书、剪映或数字人制作工具，SVG 便于继续改字。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {MARKETING_ASSET_PACK.map((asset) => (
              <a key={asset.name} href={`/DreamLab${asset.href}`} className="premium-panel block overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden" style={{ background: '#050506' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/DreamLab${asset.preview}`} alt={asset.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>{asset.name}</h3>
                  <p className="text-xs leading-6 mb-2" style={{ color: '#a1a1aa' }}>{asset.type}</p>
                  <p className="text-xs leading-6" style={{ color: '#71717a' }}>{asset.count}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section">
        <div className="academy-container-wide">
          <div className="academy-section-header">
            <div className="academy-kicker">三大宣传阵地</div>
            <h2 className="academy-section-title">小红书、抖音、数字人各自承担不同任务</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CHANNEL_PLAYS.map((channel) => (
              <div key={channel.channel} className="premium-panel p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>{channel.channel}</h3>
                <p className="text-sm leading-8 mb-6" style={{ color: '#a1a1aa' }}>{channel.positioning}</p>
                <div className="space-y-4 text-sm leading-7" style={{ color: '#85858e' }}>
                  <p><span style={{ color: '#e2b64f' }}>频率：</span>{channel.cadence}</p>
                  <p><span style={{ color: '#e2b64f' }}>格式：</span>{channel.format}</p>
                  <p><span style={{ color: '#c4554d' }}>边界：</span>{channel.caution}</p>
                </div>
                <div className="mt-7 space-y-3">
                  {channel.topics.map((topic) => (
                    <div key={topic} className="text-xs leading-6 px-3 py-2" style={{ color: '#c8c8d0', background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section academy-section-muted">
        <div className="academy-container-wide">
          <div className="academy-section-header">
            <div className="academy-kicker">统一承接页</div>
            <h2 className="academy-section-title">所有外部内容先引导到 /start</h2>
            <p className="academy-section-copy">
              小红书、抖音和数字人视频不要直接把新用户丢进首页；统一先承接到 3 分钟体验页，再分流到梦境、测评、课程和会员。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOCIAL_LANDING_ROUTES.map((route) => (
              <div key={route.source} className="premium-panel p-7">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>{route.source}</h3>
                <p className="text-sm leading-8 mb-5" style={{ color: '#a1a1aa' }}>{route.promise}</p>
                <code className="block text-xs leading-6 break-all" style={{ color: '#e2b64f' }}>{route.url}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section academy-section-muted">
        <div className="academy-container-wide">
          <div className="academy-section-header">
            <div className="academy-kicker">14 天内容排期</div>
            <h2 className="academy-section-title">每天都有选题、渠道和数字人口播任务</h2>
          </div>
          <div className="premium-panel overflow-x-auto hidden md:block">
            <div style={{ minWidth: 900 }}>
              <div className="grid grid-cols-[70px_1fr_1fr_1fr_1fr] gap-0 text-xs font-semibold" style={{ color: '#e2b64f', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['天数', '主题', '小红书', '抖音', '数字人'].map((head) => (
                  <div key={head} className="p-4">{head}</div>
                ))}
              </div>
              {CONTENT_CALENDAR.map((row) => (
                <div key={row.day} className="grid grid-cols-[70px_1fr_1fr_1fr_1fr] gap-0 text-sm" style={{ color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="p-4" style={{ color: '#e2b64f' }}>{row.day}</div>
                  <div className="p-4">{row.theme}</div>
                  <div className="p-4">{row.xhs}</div>
                  <div className="p-4">{row.douyin}</div>
                  <div className="p-4">{row.avatar}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {CONTENT_CALENDAR.map((row) => (
              <div key={row.day} className="premium-panel p-5">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-sm font-bold" style={{ color: '#e2b64f' }}>{row.day}</span>
                  <span className="text-sm" style={{ color: '#fafafa' }}>{row.theme}</span>
                </div>
                <div className="space-y-3 text-xs leading-6" style={{ color: '#a1a1aa' }}>
                  <p><span style={{ color: '#e2b64f' }}>小红书：</span>{row.xhs}</p>
                  <p><span style={{ color: '#e2b64f' }}>抖音：</span>{row.douyin}</p>
                  <p><span style={{ color: '#e2b64f' }}>数字人：</span>{row.avatar}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section">
        <div className="academy-container-wide">
          <div className="academy-section-header">
            <div className="academy-kicker">首批可发布素材</div>
            <h2 className="academy-section-title">把选题拆成图文、短视频和数字人口播</h2>
            <p className="academy-section-copy">
              下面是第一批可直接进入制作的素材，完整文案已经沉淀到执行文档，方便运营按日发布和复盘。
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="premium-panel p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>小红书笔记</h3>
              <div className="space-y-5">
                {XHS_LAUNCH_POSTS.slice(0, 3).map((post) => (
                  <div key={post.title} className="p-4" style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                    <div className="text-xs mb-2" style={{ color: '#e2b64f' }}>{post.day}</div>
                    <h4 className="text-base font-semibold mb-3" style={{ color: '#f4f4f6' }}>{post.title}</h4>
                    <p className="text-xs leading-6 mb-3" style={{ color: '#a1a1aa' }}>封面：{post.cover}</p>
                    <p className="text-xs leading-6" style={{ color: '#71717a' }}>{post.cta}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-panel p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>抖音短视频</h3>
              <div className="space-y-5">
                {DOUYIN_LAUNCH_VIDEOS.slice(0, 3).map((video) => (
                  <div key={video.title} className="p-4" style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                    <div className="text-xs mb-2" style={{ color: '#e2b64f' }}>{video.duration}</div>
                    <h4 className="text-base font-semibold mb-3" style={{ color: '#f4f4f6' }}>{video.title}</h4>
                    <p className="text-xs leading-6 mb-3" style={{ color: '#a1a1aa' }}>{video.hook}</p>
                    <p className="text-xs leading-6" style={{ color: '#71717a' }}>CTA：{video.cta}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-panel p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>数字人口播</h3>
              <div className="space-y-5">
                {DIGITAL_HUMAN_EPISODES.slice(0, 3).map((episode) => (
                  <div key={episode.episode} className="p-4" style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                    <div className="text-xs mb-2" style={{ color: '#e2b64f' }}>{episode.episode}</div>
                    <h4 className="text-base font-semibold mb-3" style={{ color: '#f4f4f6' }}>{episode.title}</h4>
                    <p className="text-xs leading-6 mb-3" style={{ color: '#a1a1aa' }}>{episode.scene}</p>
                    <p className="text-xs leading-6" style={{ color: '#71717a' }}>{episode.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="academy-section">
        <div className="academy-container">
          <div className="academy-section-header">
            <div className="academy-kicker">可直接拍摄的短视频脚本</div>
            <h2 className="academy-section-title">一条脚本拆成钩子、解释和站内承接</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHORT_VIDEO_SCRIPTS.map((script) => (
              <div key={script.title} className="premium-panel p-8">
                <h3 className="text-xl font-bold mb-5" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>{script.title}</h3>
                <p className="text-sm leading-8 mb-4" style={{ color: '#e2b64f' }}>{script.hook}</p>
                <p className="text-sm leading-8 mb-5" style={{ color: '#a1a1aa' }}>{script.body}</p>
                <p className="text-xs leading-6" style={{ color: '#71717a' }}>CTA：{script.cta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section academy-section-muted">
        <div className="academy-container">
          <div className="academy-section-header">
            <div className="academy-kicker">商业化承接</div>
            <h2 className="academy-section-title">每一条内容都要有明确的下一步</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {BUSINESS_ACTIVATION.map((item) => (
              <div key={item.name} className="premium-panel p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>{item.name}</h3>
                <p className="text-sm leading-8" style={{ color: '#85858e' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section">
        <div className="academy-container-wide">
          <div className="academy-section-header">
            <div className="academy-kicker">上线看板</div>
            <h2 className="academy-section-title">用指标验证宣传是否真的形成闭环</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="premium-panel p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-7" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>14 天验证指标</h3>
              <div className="space-y-5">
                {LAUNCH_METRICS.map((item) => (
                  <div key={item.metric} className="grid grid-cols-1 md:grid-cols-[120px_1fr_100px] gap-3 text-sm leading-7" style={{ color: '#a1a1aa' }}>
                    <div style={{ color: '#e2b64f' }}>{item.metric}</div>
                    <div>{item.target}</div>
                    <div style={{ color: '#71717a' }}>{item.owner}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="premium-panel p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-7" style={{ color: '#fafafa', fontFamily: "'Noto Serif SC', serif" }}>合规检查</h3>
              <div className="space-y-4">
                {COMPLIANCE_CHECKLIST.map((item) => (
                  <p key={item} className="text-sm leading-8" style={{ color: '#a1a1aa' }}>
                    <span style={{ color: '#e2b64f' }}>· </span>{item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
