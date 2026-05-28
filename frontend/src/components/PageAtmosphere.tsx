'use client';

/**
 * PageAtmosphere — 千与千寻漫画风格页面氛围
 * 墨染光斑 · 和纸星点 · 暖帘呼吸
 */
function seededRandom(seed: number) {
  const value = Math.sin(seed * 7919) * 10000;
  return value - Math.floor(value);
}

function formatNumber(value: number, digits = 3) {
  return Number(value.toFixed(digits)).toString();
}

export default function PageAtmosphere() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
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
            left: `${formatNumber(seededRandom(i + 1) * 100)}%`,
            top: `${formatNumber(seededRandom(i + 101) * 100)}%`,
            width: `${formatNumber(1 + seededRandom(i + 201) * 2)}px`,
            height: `${formatNumber(1 + seededRandom(i + 301) * 2)}px`,
            background: `rgba(245,239,224,${formatNumber(0.05 + seededRandom(i + 401) * 0.1)})`,
            animation: `atmo-twinkle ${formatNumber(3 + seededRandom(i + 501) * 5)}s ease-in-out infinite ${formatNumber(seededRandom(i + 601) * 4)}s`,
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
