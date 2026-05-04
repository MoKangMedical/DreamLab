'use client';

import { useState } from 'react';

/**
 * MarginDecor — 侧边留白装饰
 * @param side 'left' | 'right' 
 */
export default function MarginDecor({ side }: { side: 'left' | 'right' }) {
  const [hoveredFirefly, setHoveredFirefly] = useState<number | null>(null);
  const [whisper, setWhisper] = useState<{ haiku: string; message: string; feeling: string } | null>(null);
  const [whisperLoading, setWhisperLoading] = useState(false);

  const handleFireflyClick = async (e: React.MouseEvent) => {
    if (whisperLoading) return;
    setWhisperLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${apiBase}/api/whisper/whisper`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ element: 'firefly' }),
      });
      const data = await res.json();
      setWhisper(data);
    } catch {
      const fallbacks = [
        { haiku: '夜の海\n光る蛍は\n心の灯', message: '每一只萤火虫都是你心中未说完的话。', feeling: '温暖' },
        { haiku: '風の道\n見えないけれど\n進んでる', message: '看不见风，但你知道它在推着你向前。', feeling: '勇气' },
        { haiku: '静けさ\n耳を澄ませば\n星の声', message: '在安静下来的时候，你会听见内心深处的声音。', feeling: '宁静' },
        { haiku: '闇の中\n小さな光が\n道を示す', message: '最深的黑暗中，最微小的光也能指引方向。', feeling: '希望' },
      ];
      setWhisper(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    } finally { setWhisperLoading(false); }
  };

  const count = 7;
  const fireflies = Array.from({ length: count }, (_, i) => ({
    id: side === 'left' ? i : i + count,
    top: `${8 + i * 12 + (side === 'right' ? 4 : 0)}%`,
    delay: `${i * 1.3 + (side === 'right' ? 0.6 : 0)}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: 4 + Math.random() * 4,
    drift: (Math.random() - 0.5) * 40,
  }));

  const isLeft = side === 'left';
  const kanjis = isLeft ? ['夢', '心', '風'] : ['光', '祈', '霊'];
  
  const sootSprites = !isLeft ? [
    { bottom: '15%', delay: '0s' },
    { bottom: '28%', delay: '1.2s' },
  ] : [];

  const cloud = {
    top: isLeft ? '8%' : '70%',
    delay: isLeft ? '0s' : '15s',
    translateX: isLeft ? '-70%' : '-30%',
  };

  const renderFirefly = (f: typeof fireflies[0], globalIdx: number) => {
    const isHovered = hoveredFirefly === globalIdx;
    return (
      <div
        key={`ff-${globalIdx}`}
        onMouseEnter={() => setHoveredFirefly(globalIdx)}
        onMouseLeave={() => setHoveredFirefly(null)}
        onClick={handleFireflyClick}
        style={{
          position: 'absolute', left: '50%', top: f.top,
          width: f.size, height: f.size,
          pointerEvents: 'auto', cursor: 'pointer',
          animation: `firefly-float ${f.duration} ${f.delay} infinite ease-in-out`,
          zIndex: isHovered ? 10 : 1,
          transition: 'filter 0.4s',
          filter: isHovered ? 'brightness(1.4)' : 'none',
          // @ts-ignore
          '--drift': `${f.drift}px`,
          transform: 'translateX(-50%)',
        } as any}
      >
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: f.size * 8, height: f.size * 8,
          marginLeft: -(f.size * 4), marginTop: -(f.size * 4),
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 60%)',
          filter: 'blur(4px)',
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: f.size * 4, height: f.size * 4,
          marginLeft: -(f.size * 2), marginTop: -(f.size * 2),
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,168,83,0.10) 0%, rgba(212,168,83,0.03) 50%, transparent 70%)',
          filter: isHovered ? 'blur(1px)' : 'blur(3px)',
          transition: 'filter 0.4s',
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: f.size * 0.5, height: f.size * 0.5,
          marginLeft: -(f.size * 0.25), marginTop: -(f.size * 0.25),
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fffef8 0%, #d4a853 100%)',
          boxShadow: isHovered
            ? `0 0 ${f.size * 2}px #fef7d4, 0 0 ${f.size * 4}px rgba(212,168,83,0.5)`
            : `0 0 ${f.size * 0.8}px rgba(254,249,195,0.25)`,
          transition: 'box-shadow 0.4s',
        }} />
        {isHovered && [0, 72, 144, 216, 288].map(angle => (
          <div key={`sp-${angle}`} style={{
            position: 'absolute', left: '50%', top: '50%',
            width: 2, height: 2, borderRadius: '50%',
            background: 'rgba(254,249,195,0.5)',
            animation: `sparkle-scatter 1.2s ${angle * 0.02}s ease-out infinite`,
            transform: `rotate(${angle}deg) translateY(${-(f.size * 2.5)})`,
          }} />
        ))}
      </div>
    );
  };

  return (
    <div className="margin-col" style={{
      position: 'relative', width: '100%', height: '100%',
      minHeight: '100vh',
    }}>
      {/* 浮动汉字 */}
      {kanjis.map((k, i) => (
        <div
          key={`kj-${side}-${i}`}
          style={{
            position: 'absolute',
            left: '50%',
            top: `${15 + i * 28}%`,
            transform: 'translateX(-50%)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontFamily: "'Noto Serif SC', serif",
            fontWeight: 900,
            color: 'transparent',
            background: 'linear-gradient(180deg, rgba(212,168,83,0.06) 0%, rgba(212,168,83,0.02) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            animation: `float-kanji 14s ${i * 4}s infinite ease-in-out`,
            userSelect: 'none',
            filter: 'blur(0.5px)',
            textShadow: '0 0 30px rgba(212,168,83,0.03)',
          }}
        >
          {k}
        </div>
      ))}

      {/* 萤火虫 */}
      {fireflies.map((f, i) => renderFirefly(f, isLeft ? i : i + count))}

      {/* 软云 */}
      <div style={{
        position: 'absolute', left: '50%', top: cloud.top,
        transform: `translateX(${cloud.translateX})`,
        opacity: 0.025,
        animation: `cloud-drift ${50 + (isLeft ? 10 : 0)}s ${cloud.delay} infinite linear`,
        filter: 'blur(2px)',
      }}>
        <svg width={isLeft ? 180 : 200} height={45} viewBox="0 0 180 45" fill="none">
          <defs>
            <radialGradient id={`cmg${side}`} cx="40%" cy="30%">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="60%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="40" cy="24" rx="35" ry="13" fill={`url(#cmg${side})`} />
          <ellipse cx="80" cy="17" rx="45" ry="18" fill={`url(#cmg${side})`} />
          <ellipse cx="120" cy="22" rx="38" ry="15" fill={`url(#cmg${side})`} />
          <ellipse cx="155" cy="26" rx="28" ry="10" fill={`url(#cmg${side})`} />
        </svg>
      </div>

      {/* 煤煤虫（右栏） */}
      {sootSprites.map(s => (
        <div key={`st-${side}-${s.bottom}`} style={{
          position: 'absolute', right: '30%', bottom: s.bottom,
          width: 12, height: 12, pointerEvents: 'auto',
          animation: `soot-sprite ${2.5 + Math.random() * 0.8}s ease-in-out infinite ${s.delay}`,
        }}>
          <div style={{
            width: 12, height: 12, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #52525b 0%, #18181b 60%, #0a0a0c 100%)',
            boxShadow: '0 0 3px rgba(0,0,0,0.5)',
          }} />
          <div style={{
            position: 'absolute', top: 2.5, left: 3.5,
            width: 2, height: 2, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
          }} />
        </div>
      ))}

      {/* 低语气泡 */}
      {whisper && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 400, maxWidth: 260, pointerEvents: 'auto',
          background: 'rgba(9,9,11,0.96)', border: '1px solid rgba(212,168,83,0.18)',
          borderRadius: 1, padding: '16px 20px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(212,168,83,0.04)',
          animation: 'bubble-rise 0.5s ease-out',
        }}>
          <p style={{ fontSize: 13, color: '#d4a853', lineHeight: 2, fontFamily: "'Noto Serif SC', serif", margin: '0 0 10px', whiteSpace: 'pre-line', letterSpacing: '0.02em' }}>
            {whisper.haiku}
          </p>
          <div style={{ width: 24, height: 1, background: 'linear-gradient(90deg, rgba(212,168,83,0.3), transparent)', marginBottom: 8 }} />
          <p style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.7, margin: 0 }}>
            {whisper.message}
          </p>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, padding: '1px 10px', background: 'rgba(212,168,83,0.08)', color: '#d4a853', borderRadius: 1, letterSpacing: '0.05em' }}>
              {whisper.feeling}
            </span>
          </div>
          <button onClick={() => setWhisper(null)}
            style={{ position: 'absolute', top: 8, right: 10, background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', fontSize: 11, padding: 2 }}>
            ✕
          </button>
        </div>
      )}
      {whisperLoading && (
        <div style={{
          position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          zIndex: 400, padding: '10px 20px',
          background: 'rgba(9,9,11,0.92)', border: '1px solid rgba(212,168,83,0.12)', borderRadius: 1,
          fontSize: 12, color: '#d4a853', fontFamily: "'Noto Serif SC', serif",
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ display: 'inline-block', animation: 'twinkle 0.8s infinite' }}>✦</span>
          精灵正在聆听...
          <span style={{ display: 'inline-block', animation: 'twinkle 0.8s 0.4s infinite' }}>✦</span>
        </div>
      )}
    </div>
  );
}
