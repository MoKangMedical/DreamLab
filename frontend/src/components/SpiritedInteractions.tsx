'use client';

import { useEffect, useRef, useState, useCallback, createContext, useContext } from 'react';

/* ═══════════════════════════════════════════════
   千与千寻全局交互系统
   — 灰尘精灵点击散射
   — 灵光鼠标拖尾
   — 纸鸟通知 (Shikigami)
   — 浴牌奖励
   — 油屋入场欢迎
   ═══════════════════════════════════════════════ */

// ==================== 灰尘精灵点击特效 ====================
interface SootParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
}

export function SootSprites() {
  const [particles, setParticles] = useState<SootParticle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const count = 5 + Math.floor(Math.random() * 8);
      const newParticles: SootParticle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        newParticles.push({
          id: ++idRef.current,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: 4 + Math.random() * 8,
          life: 1,
        });
      }
      setParticles(prev => [...prev, ...newParticles].slice(-80));
    };

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.3,
            life: p.life - 0.025,
          }))
          .filter(p => p.life > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [particles.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999]" style={{ overflow: 'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="soot-sprite"
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.life,
            transform: `scale(${p.life})`,
            transition: 'none',
          }}
        />
      ))}
    </div>
  );
}

// ==================== 浴牌奖励弹窗 ====================
interface Reward {
  id: number;
  title: string;
  icon: string;
  message: string;
}

let _showReward: ((r: Omit<Reward, 'id'>) => void) | null = null;

export function showBathToken(title: string, icon: string, message: string) {
  _showReward?.({ title, icon, message });
}

export function BathTokenOverlay() {
  const [reward, setReward] = useState<Reward | null>(null);
  const [visible, setVisible] = useState(false);

  _showReward = useCallback((r: Omit<Reward, 'id'>) => {
    const item = { ...r, id: Date.now() };
    setReward(item);
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
    setTimeout(() => setReward(null), 3000);
  }, []);

  if (!reward) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none"
      style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div
        className={`text-center transition-all duration-500 ${visible ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}`}
        style={{
          background: 'linear-gradient(135deg, rgba(15,43,69,0.95), rgba(22,45,72,0.95))',
          border: '1px solid rgba(240,192,96,0.3)',
          borderRadius: 24,
          padding: '32px 40px',
          boxShadow: '0 0 60px rgba(240,192,96,0.2), 0 20px 60px rgba(0,0,0,0.5)',
        }}>
        {/* 浴牌 */}
        <div className="relative mb-4 mx-auto" style={{ width: 64, height: 80 }}>
          <div className="animate-float-slow" style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #f0c060, #e8a040)',
            borderRadius: 8,
            border: '2px solid rgba(255,255,255,0.3)',
            boxShadow: '0 8px 32px rgba(240,192,96,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="text-3xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
              {reward.icon}
            </span>
          </div>
          {/* 牌孔 */}
          <div style={{
            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
            width: 10, height: 10, borderRadius: '50%',
            background: '#0a1628', border: '1px solid rgba(255,255,255,0.2)',
          }} />
        </div>
        <p className="text-white text-lg font-bold mb-1">{reward.title}</p>
        <p className="text-[#8aa8c0] text-sm">{reward.message}</p>
      </div>
    </div>
  );
}

// ==================== 纸鸟通知 (Shikigami Toast) ====================
interface Toast {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warm';
  visible: boolean;
}

let _showToast: ((msg: string, type?: 'info' | 'success' | 'warm') => void) | null = null;

export function showShikigami(message: string, type: 'info' | 'success' | 'warm' = 'info') {
  _showToast?.(message, type);
}

export function ShikigamiToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  _showToast = useCallback((message: string, type: 'info' | 'success' | 'warm' = 'info') => {
    const toast: Toast = { id: Date.now(), message, type, visible: true };
    setToasts(prev => [...prev, toast].slice(-3));
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === toast.id ? { ...t, visible: false } : t));
    }, 2800);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 3500);
  }, []);

  const typeStyles: Record<string, { bg: string; border: string; icon: string }> = {
    success: { bg: 'rgba(92,138,110,0.15)', border: 'rgba(141,181,128,0.3)', icon: '🪶' },
    warm: { bg: 'rgba(240,192,96,0.1)', border: 'rgba(240,192,96,0.3)', icon: '🏮' },
    info: { bg: 'rgba(168,216,234,0.1)', border: 'rgba(168,216,234,0.3)', icon: '🕊️' },
  };

  return (
    <div className="fixed top-4 right-4 z-[1001] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => {
        const s = typeStyles[t.type];
        return (
          <div key={t.id}
            className={`transition-all duration-700 ${t.visible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
            style={{
              background: s.bg,
              border: `1px solid ${s.border}`,
              borderRadius: 16,
              padding: '10px 20px',
              backdropFilter: 'blur(12px)',
              animation: t.visible ? 'card-rise 0.5s ease-out' : undefined,
            }}>
            <span className="text-sm mr-2">{s.icon}</span>
            <span className="text-sm text-[#d0e0f0]">{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}

// ==================== 油屋入场欢迎 ====================
export function WelcomeCeremony({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState<'card' | 'bridge' | 'enter' | 'done'>('card');
  const [name, setName] = useState('');
  const [written, setWritten] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return;
    setWritten(true);
    setTimeout(() => setPhase('bridge'), 500);
    setTimeout(() => setPhase('enter'), 1200);
    setTimeout(() => { setPhase('done'); onEnter(); }, 1800);
  };

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[1002] flex items-center justify-center"
      style={{
        background: phase === 'enter'
          ? 'radial-gradient(circle at 50% 50%, #0f2b45 0%, #0a1628 100%)'
          : 'radial-gradient(circle at 50% 30%, #1a4570 0%, #0a1628 100%)',
      }}>
      {phase === 'card' && (
        <div className="text-center animate-card-rise" style={{ padding: 40 }}>
          {/* 名字牌 */}
          <div className="mb-6" style={{
            width: 200, height: 120, margin: '0 auto',
            background: 'linear-gradient(135deg, #f5e6d3, #e8d5c0)',
            borderRadius: 8, border: '2px solid #d4c0a0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            padding: 24,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="text-[#2d1810] text-xs mb-3 tracking-widest">油 屋 契 约 书</span>
            {written ? (
              <span className="text-[#2d1810] text-2xl font-bold"
                style={{ fontFamily: "'Noto Serif SC', serif" }}>
                {name}
              </span>
            ) : (
              <input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="写下你的名字..."
                maxLength={10}
                className="text-center text-xl bg-transparent border-b-2 border-[#c8b898] text-[#2d1810] outline-none w-full"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              />
            )}
          </div>
          {!written ? (
            <button onClick={handleSubmit} disabled={!name.trim()}
              className="px-8 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                background: 'linear-gradient(135deg, #f0c060, #c44536)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(240,192,96,0.3)',
                opacity: name.trim() ? 1 : 0.5,
              }}>
              签下契约
            </button>
          ) : (
            <p className="text-[#a8d8ea] text-sm animate-pulse mt-4">
              契约成立... 正在打开油屋大门...
            </p>
          )}
        </div>
      )}

      {phase === 'bridge' && (
        <div className="text-center animate-card-rise">
          <div className="text-6xl mb-4 animate-float-slow">🏯</div>
          <p className="text-[#ffd89b] text-2xl font-bold mb-2"
            style={{ fontFamily: "'Noto Serif SC', serif" }}>
            {name}、いらっしゃい
          </p>
          <p className="text-[#8aa8c0] text-sm">欢迎来到油屋...</p>
          <p className="text-[#5a8aa8] text-xs mt-2 animate-pulse">正在走过红桥</p>
        </div>
      )}

      {phase === 'enter' && (
        <div className="text-center">
          <div className="text-5xl mb-3" style={{
            animation: 'float-slower 2s ease-in-out infinite',
          }}>🪞</div>
          <p className="text-[#f0c060] text-lg font-bold">契约之镜已开启</p>
          <p className="text-[#8aa8c0] text-sm mt-1">在这里，你会找到真正的自己</p>
        </div>
      )}
    </div>
  );
}

// ==================== 全局交互容器 (精简版 — 无阻塞入场) ====================
export function SpiritedInteractions({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SootSprites />
      <BathTokenOverlay />
      <ShikigamiToast />
      {children}
    </>
  );
}
