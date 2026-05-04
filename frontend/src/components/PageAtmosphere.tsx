'use client';

/**
 * PageAtmosphere — 千与千寻漫画风格页面氛围
 * 墨染光斑 · 和纸星点 · 暖帘呼吸
 */
export default function PageAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* 灯笼柔光 — 3个大圆，模拟油屋灯光 */}
      {[
        { color: 'rgba(212,168,83,0.03)', top: '8%', left: '15%', size: 350 },
        { color: 'rgba(196,85,77,0.02)', top: '55%', left: '80%', size: 280 },
        { color: 'rgba(59,139,122,0.02)', top: '75%', left: '25%', size: 300 },
      ].map((p, i) => (
        <div
          key={`atmo-${i}`}
          className="absolute rounded-full"
          style={{
            top: p.top, left: p.left,
            width: p.size, height: p.size,
            background: `radial-gradient(circle, ${p.color}, transparent 70%)`,
            filter: 'blur(50px)',
            transform: 'translate(-50%, -50%)',
            animation: `atmo-breathe ${8 + i * 3}s ease-in-out infinite ${i * 1.5}s`,
          }}
        />
      ))}

      {/* 微型星点 — 纸窗透光 */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            background: `rgba(245,239,224,${0.05 + Math.random() * 0.1})`,
            animation: `atmo-twinkle ${3 + Math.random() * 5}s ease-in-out infinite ${Math.random() * 4}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes atmo-breathe {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes atmo-twinkle {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
