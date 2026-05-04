'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show after a short delay
      setTimeout(() => setShowPrompt(true), 2000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-80 z-[200] animate-card-rise"
      style={{ pointerEvents: 'auto' }}
    >
      <div
        className="p-4 flex items-center gap-3 shadow-2xl"
        style={{
          background: '#18181b',
          border: '1px solid rgba(212,168,83,0.2)',
          borderRadius: 14,
          backdropFilter: 'blur(20px)',
        }}
      >
        <span style={{ fontSize: 28 }}>📲</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium" style={{ color: '#f4f4f6' }}>
            添加到桌面
          </p>
          <p className="text-xs" style={{ color: '#71717a' }}>
            离线可用 · 如原生App般流畅
          </p>
        </div>
        <button
          onClick={handleInstall}
          className="shrink-0 px-4 py-2 text-xs font-semibold transition-all hover:scale-105"
          style={{
            background: '#d4a853',
            color: '#0a0a0c',
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          安装
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="shrink-0 text-xs transition-colors"
          style={{
            color: '#52525b',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
