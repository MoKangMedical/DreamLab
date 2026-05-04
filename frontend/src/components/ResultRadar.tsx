'use client';

// ═══════════════════════════════════════════════════
// ResultRadar — SVG 雷达图组件
// 用于心理测评结果页展示多维度得分
// ═══════════════════════════════════════════════════

interface RadarData {
  label: string;
  value: number; // 0-100
  maxValue?: number;
}

interface ResultRadarProps {
  data: RadarData[];
  size?: number;
  color?: string;
}

export default function ResultRadar({ data, size = 240, color = '#d4a853' }: ResultRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  const levels = 4; // concentric circles
  const angleStep = (2 * Math.PI) / data.length;

  const getPoint = (index: number, value: number, maxVal: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = radius * (value / maxVal);
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const gridPoints = (level: number) => {
    const r = radius * (level / levels);
    return data.map((_, i) => {
      const angle = angleStep * i - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');
  };

  // Data polygon
  const maxVal = data[0]?.maxValue || 100;
  const dataPoints = data.map((d, i) => {
    const p = getPoint(i, d.value, maxVal);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid */}
        {Array.from({ length: levels }).map((_, lvl) => (
          <polygon
            key={`grid-${lvl}`}
            points={gridPoints(lvl + 1)}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={lvl === levels - 1 ? 1.2 : 0.5}
          />
        ))}

        {/* Axes */}
        {data.map((_, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const x2 = cx + radius * Math.cos(angle);
          const y2 = cy + radius * Math.sin(angle);
          return (
            <line
              key={`axis-${i}`}
              x1={cx} y1={cy} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Data area */}
        <polygon
          points={dataPoints}
          fill={`${color}14`}
          stroke={color}
          strokeWidth={1.5}
          style={{ transition: 'all 0.8s ease-out' }}
        />

        {/* Data points */}
        {data.map((d, i) => {
          const p = getPoint(i, d.value, maxVal);
          return (
            <circle
              key={`dot-${i}`}
              cx={p.x} cy={p.y} r={3}
              fill={color}
              stroke={color}
              strokeWidth={0}
            />
          );
        })}
      </svg>

      {/* Labels */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 12px', maxWidth: size + 40 }}>
        {data.map((d, i) => (
          <span key={d.label} className="text-xs" style={{ color: '#71717a', whiteSpace: 'nowrap' }}>
            <span style={{ color, marginRight: 4 }}>●</span>
            {d.label}: {d.value}
          </span>
        ))}
      </div>
    </div>
  );
}
