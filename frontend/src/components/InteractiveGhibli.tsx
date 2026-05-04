'use client';

import { useState, useCallback, useRef } from 'react';

interface Whisper {
  id: number; x: number; y: number;
  haiku: string; message: string; feeling: string; element_type: string; fading: boolean;
}

/**
 * InteractiveGhibli — 全屏背景氛围 + 精灵低语
 * 水彩纹理 · 体积光 · 黄金粉尘 · 萤火虫可点击
 * 互动元素已移至 MarginDecor，此处仅保留氛围层
 */
export default function InteractiveGhibli() {
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [loading, setLoading] = useState(false);
  const nextId = useRef(0);

  // ── 全局黄金粉尘 ──
  const goldDust = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 12}s`,
    duration: `${8 + Math.random() * 18}s`,
    size: 1 + Math.random() * 1.5,
    opacity: 0.06 + Math.random() * 0.2,
  }));

  // ── 背景萤火虫（不可点击，纯装饰） ──
  const bgFireflies = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${8 + Math.random() * 84}%`,
    top: `${5 + Math.random() * 90}%`,
    delay: `${i * 2}s`,
    duration: `${7 + Math.random() * 8}s`,
    size: 3 + Math.random() * 3,
    drift: (Math.random() - 0.5) * 50,
  }));

  const fetchWhisper = useCallback(async (element: string, x: number, y: number) => {
    if (loading) return; setLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${apiBase}/api/whisper/whisper`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ element }),
      });
      const data = await res.json();
      const id = nextId.current++;
      const w: Whisper = { id, x, y, ...data, fading: false };
      setWhispers(prev => [...prev.slice(-4), w]);
      setTimeout(() => setWhispers(prev => prev.map(w => w.id === id ? { ...w, fading: true } : w)), 6500);
      setTimeout(() => setWhispers(prev => prev.filter(w => w.id !== id)), 7500);
    } catch {
      const quotes = [
        { haiku: '夜の海\n光る蛍は\n心の灯', message: '每一只萤火虫都是你心中未说完的话。', feeling: '温暖' },
        { haiku: '風の道\n見えないけれど\n進んでる', message: '看不见风，但你知道它在推着你向前。', feeling: '勇气' },
        { haiku: '雲の上\n誰かの夢が\n浮かんでる', message: '每一片云都载着一个未完成的梦。', feeling: '希望' },
      ];
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      const id = nextId.current++;
      const w: Whisper = { id, x, y, ...q, element_type: element, fading: false };
      setWhispers(prev => [...prev.slice(-4), w]);
      setTimeout(() => setWhispers(prev => prev.map(w => w.id === id ? { ...w, fading: true } : w)), 6500);
      setTimeout(() => setWhispers(prev => prev.filter(w => w.id !== id)), 7500);
    } finally { setLoading(false); }
  }, [loading]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      
      {/* ════════════ 暖色渐变雾 — 模拟水墨黄昏 ════════════ */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 70% 30%, rgba(232,168,32,0.025) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 20% 70%, rgba(192,57,43,0.015) 0%, transparent 50%),
          radial-gradient(ellipse 50% 40% at 50% 90%, rgba(232,168,32,0.03) 0%, transparent 40%)
        `,
        animation: 'warm-breathe 12s ease-in-out infinite',
      }} />

      {/* ════════════ 水彩纸纹理 ════════════ */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
        mixBlendMode: 'overlay' as any,
      }} />

      {/* ════════════ 体积光射线 ════════════ */}
      {[1, 2, 3].map(i => (
        <div key={`ray-${i}`} style={{
          position: 'absolute',
          top: `${10 + i * 25}%`,
          left: `${20 + i * 25}%`,
          width: '2px',
          height: '50vh',
          background: `linear-gradient(180deg, rgba(232,168,32,${0.03 + i * 0.015}) 0%, transparent 100%)`,
          transform: `rotate(${-10 + i * 10}deg)`,
          transformOrigin: 'top center',
          animation: `godray-sway ${14 + i * 3}s ease-in-out infinite`,
          animationDelay: `${i * 4}s`,
          filter: 'blur(6px)',
          opacity: 0.4,
        }} />
      ))}

      {/* ════════════ 黄金粉尘 ════════════ */}
      {goldDust.map(d => (
        <div key={`gd-${d.id}`} style={{
          position: 'absolute', left: d.left, top: d.top,
          width: d.size, height: d.size, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(254,249,195,${d.opacity * 1.4}), transparent)`,
          boxShadow: `0 0 ${d.size * 2}px rgba(232,168,32,${d.opacity})`,
          animation: `golddust-float ${d.duration} ${d.delay} infinite ease-in-out`,
          opacity: 0,
        }} />
      ))}

      {/* ════════════ 散布萤火虫（纯装饰） ════════════ */}
      {bgFireflies.map(f => (
        <div key={`bff-${f.id}`} style={{
          position: 'absolute', left: f.left, top: f.top,
          width: f.size, height: f.size,
          animation: `firefly-float ${f.duration} ${f.delay} infinite ease-in-out`,
          // @ts-ignore
          '--drift': `${f.drift}px`,
        } as any}>
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            width: f.size * 4, height: f.size * 4,
            marginLeft: -(f.size * 2), marginTop: -(f.size * 2),
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,168,32,0.04) 0%, rgba(232,168,32,0.01) 40%, transparent 70%)',
            filter: 'blur(3px)',
          }} />
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            width: f.size * 0.5, height: f.size * 0.5,
            marginLeft: -(f.size * 0.25), marginTop: -(f.size * 0.25),
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fffef8 0%, #e8a820 80%)',
            boxShadow: `0 0 ${f.size}px rgba(254,249,195,0.2)`,
          }} />
        </div>
      ))}

      {/* ════════════ 低语气泡 ════════════ */}
      {whispers.map(w => (
        <div key={`ws-${w.id}`} style={{
          position: 'fixed',
          left: Math.min(w.x, typeof window !== 'undefined' ? window.innerWidth - 280 : 500),
          top: Math.max(w.y - 130, 20),
          zIndex: 300, maxWidth: 260, pointerEvents: 'auto',
          background: 'rgba(9,9,11,0.96)',
          border: '1px solid rgba(232,168,32,0.18)',
          borderRadius: 1,
          padding: '16px 20px',
          animation: `bubble-rise 0.5s ease-out${w.fading ? ', fade-out 0.7s ease-in forwards' : ''}`,
          boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(232,168,32,0.04), inset 0 1px 0 rgba(255,255,255,0.02)',
        }}>
          <p style={{ fontSize: 13, color: '#e8a820', lineHeight: 2, fontFamily: "'Noto Serif SC', serif", margin: '0 0 10px', whiteSpace: 'pre-line', letterSpacing: '0.02em' }}>
            {w.haiku}
          </p>
          <div style={{ width: 24, height: 1, background: 'linear-gradient(90deg, rgba(232,168,32,0.3), transparent)', marginBottom: 8 }} />
          <p style={{ fontSize: 12, color: '#b8ad9a', lineHeight: 1.7, margin: 0 }}>
            {w.message}
          </p>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, padding: '1px 10px', background: 'rgba(232,168,32,0.08)', color: '#e8a820', borderRadius: 1, letterSpacing: '0.05em' }}>
              {w.feeling}
            </span>
            <span style={{ fontSize: 10, color: '#4a4038' }}>
              {w.element_type === 'firefly' ? '蛍' : w.element_type === 'cloud' ? '雲' : w.element_type === 'kanji' ? '夢' : '煤'}
            </span>
          </div>
          <button onClick={() => setWhispers(prev => prev.filter(ws => ws.id !== w.id))}
            style={{ position: 'absolute', top: 8, right: 10, background: 'none', border: 'none', color: '#5a5246', cursor: 'pointer', fontSize: 11, padding: 2 }}>
            ✕
          </button>
        </div>
      ))}

      {/* ════════════ 加载指示器 ════════════ */}
      {loading && (
        <div style={{
          position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          zIndex: 300, padding: '10px 20px',
          background: 'rgba(9,9,11,0.92)', border: '1px solid rgba(232,168,32,0.12)', borderRadius: 1,
          fontSize: 12, color: '#e8a820', fontFamily: "'Noto Serif SC', serif",
          display: 'flex', alignItems: 'center', gap: 10,
          animation: 'warm-breathe 2s ease-in-out infinite',
        }}>
          <span style={{ display: 'inline-block', animation: 'twinkle 0.8s infinite' }}>✦</span>
          精灵正在聆听...
          <span style={{ display: 'inline-block', animation: 'twinkle 0.8s 0.4s infinite' }}>✦</span>
        </div>
      )}
    </div>
  );
}
