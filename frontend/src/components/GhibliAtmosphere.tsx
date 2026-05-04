'use client';

import { useEffect, useRef } from 'react';

/**
 * 宫崎骏治愈氛围层
 * ─ 萤火虫 (暖橙色光点)
 * ─ 风之轨迹 (极细白色弧线)
 * ─ 蒲公英种子 (飘浮绒毛)
 * ─ 软云 (低空浮云)
 */
export default function GhibliAtmosphere() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // ── 萤火虫 ──
  const fireflies = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${15 + Math.random() * 75}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 10}s`,
    size: 3 + Math.random() * 4,
    glow: 0.15 + Math.random() * 0.35,
    drift: (Math.random() - 0.5) * 40,
  }));

  // ── 风之轨迹 ──
  const windLines = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: `${10 + i * 14}%`,
    delay: `${i * 2.5}s`,
    duration: `${12 + Math.random() * 8}s`,
    width: 60 + Math.random() * 120,
  }));

  // ── 浮云 ──
  const clouds = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    top: `${5 + i * 18}%`,
    delay: `${i * 4}s`,
    duration: `${50 + Math.random() * 40}s`,
    scale: 0.4 + Math.random() * 0.8,
    opacity: 0.03 + Math.random() * 0.04,
  }));

  // ── 蒲公英种子 ──
  const dandelions = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 12}s`,
    duration: `${8 + Math.random() * 12}s`,
    size: 2 + Math.random() * 2,
  }));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* ── 萤火虫 ── */}
      {fireflies.map(f => (
        <div
          key={`ff-${f.id}`}
          style={{
            position: 'absolute',
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 40% 40%, #fef3c7, #e8a820)`,
            boxShadow: `0 0 ${f.size * 3}px rgba(232,168,32,${f.glow}), 0 0 ${f.size * 6}px rgba(232,168,32,${f.glow * 0.5})`,
            opacity: 0,
            animation: `firefly-float ${f.duration} ${f.delay} infinite ease-in-out`,
            // @ts-ignore
            '--drift': `${f.drift}px`,
          } as any}
        />
      ))}

      {/* ── 风之轨迹 ── */}
      {windLines.map(w => (
        <div
          key={`wl-${w.id}`}
          style={{
            position: 'absolute',
            left: '-10%',
            top: w.top,
            width: `${w.width}px`,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
            borderRadius: 1,
            animation: `wind-drift ${w.duration} ${w.delay} infinite linear`,
          }}
        />
      ))}

      {/* ── 软云 ── */}
      {clouds.map(c => (
        <div
          key={`cl-${c.id}`}
          style={{
            position: 'absolute',
            left: '-20%',
            top: c.top,
            opacity: c.opacity,
            animation: `cloud-drift ${c.duration} ${c.delay} infinite linear`,
          }}
        >
          <svg
            width={300 * c.scale}
            height={60 * c.scale}
            viewBox="0 0 300 60"
            fill="none"
          >
            <ellipse cx="60" cy="30" rx="55" ry="18" fill="rgba(255,255,255,0.6)" />
            <ellipse cx="120" cy="18" rx="70" ry="25" fill="rgba(255,255,255,0.8)" />
            <ellipse cx="180" cy="25" rx="60" ry="22" fill="rgba(255,255,255,0.7)" />
            <ellipse cx="240" cy="32" rx="50" ry="15" fill="rgba(255,255,255,0.5)" />
            <ellipse cx="150" cy="38" rx="110" ry="12" fill="rgba(255,255,255,0.4)" />
          </svg>
        </div>
      ))}

      {/* ── 蒲公英种子 ── */}
      {dandelions.map(d => (
        <div
          key={`dl-${d.id}`}
          style={{
            position: 'absolute',
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            boxShadow: '0 0 2px rgba(255,255,255,0.08)',
            animation: `dandelion-drift ${d.duration} ${d.delay} infinite ease-in-out`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
