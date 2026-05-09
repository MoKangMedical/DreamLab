import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import InteractiveGhibli from "@/components/InteractiveGhibli";
import { SpiritedInteractions } from "@/components/SpiritedInteractions";
import GlobalExploreMore from "@/components/GlobalExploreMore";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export const metadata: Metadata = {
  title: "DreamLab 心理研究院",
  description: "DreamLab 提供梦境解析、心理测评、心理学课程、知识库和反思日志，帮助用户建立可复盘的心智成长系统。",
  manifest: "/DreamLab/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DreamLab",
  },
};

const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/courses", label: "心理课程" },
  { href: "/assessments", label: "心理测评" },
  { href: "/dream", label: "梦境解析" },
  { href: "/knowledge", label: "心理知识库" },
  { href: "/reflect", label: "反思日志" },
  { href: "/profile", label: "我的成长" },
];

const FOOTER_COLUMNS = {
  研究能力: [
    { label: "心理课程", href: "/courses" },
    { label: "心理测评", href: "/assessments" },
    { label: "梦境解析", href: "/dream" },
    { label: "心理知识库", href: "/knowledge" },
    { label: "反思日志", href: "/reflect" },
  ],
  学习路径: [
    { label: "梦境解析与象征基础", href: "/courses" },
    { label: "心理学核心理论", href: "/courses" },
    { label: "疗愈工具与心智健康", href: "/courses" },
    { label: "关系、学习与生活应用", href: "/courses" },
  ],
  项目: [
    { label: "心理测评", href: "/assessments" },
    { label: "个人中心", href: "/profile" },
    { label: "GitHub", href: "https://github.com/MoKangMedical/DreamLab" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="overscroll-none">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/DreamLab/manifest.json" />
        <meta name="theme-color" content="#0a0a0c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>

      <body className="overscroll-none" style={{ background: '#0a0a0c' }}>
        {/* Atmosphere */}
        <InteractiveGhibli />

        {/* Desktop Navigation — Glass */}
        <nav className="hidden md:block glass-nav">
          <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <span
                className="font-bold text-lg tracking-tight"
                style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}
              >
                DreamLab
              </span>
            </a>
            <div className="flex items-center gap-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-[13px] font-medium transition-colors duration-200 hover:text-[#f4f4f6]"
                  style={{ color: '#71717a', fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Layout Grid */}
        <div className="app-grid">
          {/* Left margin — desktop decorations */}
          <div className="margin-col">
            <MarginDecorations side="left" />
          </div>

          {/* Content */}
          <div className="content-col">
            <main style={{ minHeight: '100dvh', paddingTop: '56px', paddingBottom: '80px' }}>
              <SpiritedInteractions>
                <div className="page-enter">{children}</div>
              </SpiritedInteractions>
            </main>

            {/* Desktop: Global Explore More */}
            <div className="hidden md:block">
              <GlobalExploreMore />
            </div>

            {/* Desktop Footer */}
            <footer
              className="hidden md:block"
              style={{
                background: '#0a0a0c',
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <div className="max-w-6xl mx-auto px-6 py-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
                  {/* Brand */}
                  <div className="col-span-2 md:col-span-1">
                    <a
                      href="/"
                      className="text-lg font-bold mb-6 block"
                      style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}
                    >
                      DreamLab
                    </a>
                    <p
                      className="text-sm leading-relaxed mb-8"
                      style={{ color: '#71717a', lineHeight: 1.8 }}
                    >
                      梦境、测评、课程与反思。
                      <br />
                      建立可复盘的心智成长路线。
                    </p>
                    <span
                      className="text-xs tracking-wider"
                      style={{ color: '#d4a853' }}
                    >
                      MoKangMedical · 2026
                    </span>
                  </div>
                  {Object.entries(FOOTER_COLUMNS).map(([category, links]) => (
                    <div key={category}>
                      <h4
                        className="text-xs font-semibold tracking-wider uppercase mb-6"
                        style={{ color: '#f4f4f6' }}
                      >
                        {category}
                      </h4>
                      <ul className="space-y-3">
                        {links.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              className="text-sm transition-colors duration-200 hover:text-[#a1a1aa]"
                              style={{ color: '#71717a' }}
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <p className="text-xs" style={{ color: '#52525b' }}>
                    © 2026 DreamLab by MoKangMedical. 内容仅用于心理学教育与自我观察，不能替代专业诊断或治疗。
                  </p>
                  <div className="flex gap-6">
                    <a href="/" className="text-xs" style={{ color: '#52525b' }}>
                      Privacy
                    </a>
                    <a href="/" className="text-xs" style={{ color: '#52525b' }}>
                      Terms
                    </a>
                    <a href="/" className="text-xs" style={{ color: '#52525b' }}>
                      Research Ethics
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>

          {/* Right margin — desktop decorations */}
          <div className="margin-col">
            <MarginDecorations side="right" />
          </div>
        </div>

        <BottomNav />
        <PWAInstallPrompt />
      </body>
    </html>
  );
}

/* ── Margin Decorations — subtle DreamLab atmosphere in side columns ── */
function MarginDecorations({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  const kanji = isLeft ? ['梦', '心', '识'] : ['觉', '察', '思'];
  const fireflyCount = 4;

  // Generate stable fireflies
  const fireflies = Array.from({ length: fireflyCount }, (_, i) => ({
    id: `${side}-f-${i}`,
    top: `${15 + i * 20 + (isLeft ? 5 : 0)}%`,
    delay: `${i * 1.5 + (isLeft ? 0 : 0.5)}s`,
    duration: `${7 + i * 2}s`,
    size: 3 + (i % 2),
    drift: (isLeft ? 1 : -1) * (10 + i * 5),
  }));

  return (
    <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
      {/* Floating kanji */}
      {kanji.map((char, i) => (
        <div
          key={char}
          className="absolute font-bold pointer-events-none"
          style={{
            left: `${30 + i * 26}%`,
            top: `${20 + i * 28}%`,
            fontSize: `${20 + i * 10}px`,
            color: '#d4a853',
            opacity: 0.04 + i * 0.02,
            fontFamily: "'Noto Serif SC', serif",
            animation: `float-kanji ${7 + i * 2}s ease-in-out infinite ${i * 1.2}s`,
            filter: 'blur(0.5px)',
          }}
        >
          {char}
        </div>
      ))}

      {/* Fireflies */}
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${40 + (f.id.charCodeAt(0) % 30)}%`,
            top: f.top,
            width: f.size,
            height: f.size,
            background: 'radial-gradient(circle at 40% 40%, #fef9e7, #d4a853)',
            boxShadow: `0 0 ${f.size * 3}px rgba(212,168,83,0.2)`,
            animation: `firefly-drift ${f.duration}s ${f.delay} infinite ease-in-out`,
            '--drift': `${f.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
