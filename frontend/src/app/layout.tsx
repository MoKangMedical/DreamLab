import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import InteractiveGhibli from "@/components/InteractiveGhibli";
import { SpiritedInteractions } from "@/components/SpiritedInteractions";
import MarginDecor from "@/components/MarginDecor";
import GlobalExploreMore from "@/components/GlobalExploreMore";
import GhibliMusic from "@/components/GhibliMusic";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export const metadata: Metadata = {
  title: "DreamLab — Evidence-Based Psychology Platform",
  description: "Understand your inner world. Standardized assessments, AI-powered interpretation, evidence-based knowledge.",
  manifest: "/DreamLab/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DreamLab",
  },
};

const DESKTOP_NAV = [
  { href: "/", label: "Home", icon: "" },
  { href: "/assessments", label: "Assessments", icon: "" },
  { href: "/companion", label: "Companion", icon: "" },
  { href: "/dream", label: "Dreams", icon: "" },
  { href: "/knowledge", label: "Knowledge", icon: "" },
  { href: "/courses", label: "Courses", icon: "" },
  { href: "/wellness", label: "Wellness", icon: "" },
];

const FOOTER_LINKS = {
  Platform: [
    { label: "Assessments", href: "/assessments" },
    { label: "AI Companion", href: "/companion" },
    { label: "Dream Analysis", href: "/dream" },
    { label: "Wellness Toolkit", href: "/wellness" },
  ],
  Learn: [
    { label: "Knowledge Base", href: "/knowledge" },
    { label: "Courses", href: "/courses" },
    { label: "Spirited Away Journey", href: "/spirited" },
  ],
  About: [
    { label: "Evidence & Sources", href: "/knowledge" },
    { label: "Scientific Advisory", href: "/knowledge" },
    { label: "Privacy & Ethics", href: "/" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overscroll-none">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/DreamLab/manifest.json" />
        <meta name="theme-color" content="#060f18" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>

      <body className="overscroll-none" style={{ background: '#060f18' }}>
        {/* Atmosphere layer */}
        <InteractiveGhibli />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex fixed top-0 w-full z-50 frost-panel">
          <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between w-full">
            <a href="/" className="flex items-center gap-3 group">
              <span className="font-bold text-white text-lg tracking-tight" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                DreamLab
              </span>
            </a>
            <div className="flex items-center gap-0">
              {DESKTOP_NAV.map(item => (
                <a key={item.href} href={item.href}
                  className="px-3 py-2 text-xs font-medium transition-colors duration-200 hover:text-[#f5efe0]"
                  style={{ color: '#7a7062', fontFamily: 'Inter, sans-serif' }}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Three-column grid (desktop) / centered (mobile) */}
        <div className="app-grid">
          <MarginDecor side="left" />
          <div className="content-col">
            <main style={{ minHeight: '100dvh', paddingTop: '56px', paddingBottom: '80px' }}>
              <SpiritedInteractions>
                <div className="page-transition">
                  {children}
                </div>
              </SpiritedInteractions>
            </main>

            {/* Global Explore More — hidden on mobile (bottom nav covers navigation) */}
            <div className="hidden md:block">
              <GlobalExploreMore />
            </div>

            {/* Professional Footer — hidden on mobile */}
            <footer className="hidden md:block" style={{ background: '#0a1620', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  <div className="col-span-2 md:col-span-1">
                    <a href="/" className="text-lg font-bold mb-4 block" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0' }}>
                      DreamLab
                    </a>
                    <p className="text-xs leading-relaxed mb-6" style={{ color: '#5a5246', lineHeight: 1.8 }}>
                      Evidence-based psychology platform.<br/>Understand your inner world.
                    </p>
                    <span className="text-xs tracking-wider" style={{ color: '#e8a820' }}>MoKangMedical · 2026</span>
                  </div>
                  {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                    <div key={category}>
                      <h4 className="text-xs font-semibold tracking-wider uppercase mb-5" style={{ color: '#f5efe0' }}>{category}</h4>
                      <ul className="space-y-3">
                        {links.map(link => (
                          <li key={link.label}>
                            <a href={link.href} className="text-xs transition-colors duration-200 hover:text-[#b8ad9a]" style={{ color: '#5a5246' }}>{link.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <p className="text-xs" style={{ color: '#3a352e' }}>© 2026 DreamLab by MoKangMedical.</p>
                  <div className="flex gap-6">
                    <a href="/" className="text-xs" style={{ color: '#3a352e' }}>Privacy</a>
                    <a href="/" className="text-xs" style={{ color: '#3a352e' }}>Terms</a>
                    <a href="/" className="text-xs" style={{ color: '#3a352e' }}>Ethics</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <MarginDecor side="right" />
        </div>

        <BottomNav />
        <PWAInstallPrompt />
        <GhibliMusic />
      </body>
    </html>
  );
}
