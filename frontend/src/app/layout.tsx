import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "DreamLab - 千と千尋の夢の解析",
  description: "油屋梦境探索 — AI驱动的深度解梦与顶级心理学平台",
  manifest: "/DreamLab/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DreamLab·千与千寻",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="overscroll-none">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/DreamLab/manifest.json" />
        <meta name="theme-color" content="#0a1628" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DreamLab" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/DreamLab/icons/icon-192.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/DreamLab/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </head>
      <body className="overscroll-none">
        {/* ── 桌面端悬浮顶栏 ── */}
        <nav className="hidden md:flex fixed top-0 w-full z-50 frost-panel border-b border-[#ffffff]/05"
          style={{ background: 'rgba(10,22,40,0.85)', backdropFilter: 'blur(24px) saturate(180%)' }}>
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between w-full">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">🏯</span>
              <span className="font-bold text-white text-lg hidden sm:inline">DreamLab</span>
              <span className="text-[#6A8AA8] text-xs hidden md:inline">千と千尋の夢の解析</span>
            </a>
            <div className="flex items-center gap-1">
              {[
                { href: "/", label: "首页", icon: "🏠" },
                { href: "/assessments", label: "测评", icon: "🪞" },
                { href: "/companion", label: "陪伴", icon: "👤" },
                { href: "/wellness", label: "健康", icon: "♨️" },
                { href: "/spirited", label: "油屋", icon: "👘" },
                { href: "/courses", label: "课程", icon: "📜" },
                { href: "/dream", label: "解梦", icon: "🌙" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 text-[#8aa8c0] hover:text-white px-2.5 py-2 rounded-xl text-xs transition-all duration-300 hover:bg-[#ffffff]/05 active:scale-95"
                  style={{ touchAction: 'manipulation' }}
                >
                  <span>{item.icon}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ── 内容区 ── */}
        <main className="min-h-screen md:pt-14 relative z-10">
          <div className="page-transition">
            {children}
          </div>
        </main>

        {/* ── 移动端底部导航 ── */}
        <BottomNav />

        {/* ── 桌面端底部 ── */}
        <footer className="hidden md:block relative border-t border-[#ffffff]/04 py-6 text-center text-xs text-[#3A5A78] bg-[#0a1628]/60">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span>◇</span>
              <span>DreamLab · 千と千尋の夢の解析</span>
              <span>◇</span>
            </div>
            <p className="opacity-40">梦是一面镜子，照见被遗忘的那个自己</p>
            <p className="mt-4 opacity-20">MoKangMedical · 2026</p>
          </div>
        </footer>

        {/* 底部安全区占位 */}
        <div className="md:hidden h-16" />
      </body>
    </html>
  );
}
