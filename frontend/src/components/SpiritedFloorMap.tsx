'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProgress } from '@/lib/storage';

const FLOORS = [
  { floor: 1, name: '遗忘之桥', icon: '◇', colorFrom: '#E8A598', colorTo: '#FF8A7A', locked: false, desc: '油屋入口' },
  { floor: 2, name: '汤婆婆', icon: '◎', colorFrom: '#FF8A7A', colorTo: '#9B7ED8', locked: true, desc: '锅炉房' },
  { floor: 3, name: '无脸男', icon: '◈', colorFrom: '#9B7ED8', colorTo: '#B8D4C8', locked: true, desc: '浴场' },
  { floor: 4, name: '河神', icon: '⬡', colorFrom: '#B8D4C8', colorTo: '#F0C060', locked: true, desc: '花园' },
  { floor: 5, name: '白龙', icon: '◆', colorFrom: '#F0C060', colorTo: '#E8A598', locked: true, desc: '顶层' },
];

const FLOOR_THEMES = [
  '面对阴影，认识完整的自己',
  '识别情绪，不被欲望吞噬',
  '净化梦境，转化内在能量',
  '找回名字，成为梦的解析师',
  '整合自我，万物归一',
];

export default function SpiritedFloorMap() {
  const router = useRouter();
  const [progress, setProgress] = useState(getProgress());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="text-center py-16">
        <div className="inline-block w-8 h-8 rotate-45 rounded-sm animate-pulse"
          style={{ background: 'linear-gradient(135deg, var(--geo-coral), var(--accent-purple))', opacity: 0.5 }} />
        <p className="text-[#707090] mt-4 text-sm">探索中...</p>
      </div>
    );
  }

  const currentFloor = progress.current_floor || 1;
  const keys = progress.keys_collected || [];
  const title = progress.title_earned || '';

  const unlockedFloors = FLOORS.map(f => ({
    ...f,
    locked: f.floor > currentFloor,
  }));

  return (
    <div className="relative">
      {/* 标题徽章 */}
      {title && (
        <div className="text-center mb-8 animate-card-rise">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'linear-gradient(135deg, rgba(232,165,152,0.12), rgba(155,126,216,0.12))',
              border: '1px solid rgba(232,165,152,0.25)',
              color: 'var(--geo-gold)',
            }}>
            ◆ {title}
          </span>
        </div>
      )}

      {/* ── 等距层叠平台 ── */}
      <div className="space-y-4">
        {unlockedFloors.map((f, i) => {
          const isCurrent = f.floor === currentFloor;
          const isUnlocked = !f.locked;
          const hasKey = keys.some((k: any) => k.floor === f.floor);

          return (
            <div
              key={f.floor}
              className="relative animate-card-rise"
              style={{
                animationDelay: `${i * 0.1}s`,
                zIndex: 5 - i,
              }}
            >
              {/* 等距平台底座（透视阴影） */}
              <div className="absolute -bottom-1.5 left-2 right-2 h-3 rounded-2xl opacity-15 transition-all duration-500"
                style={{ background: f.colorFrom }} />

              {/* 主平台卡片 */}
              <div
                className={`
                  relative p-5 rounded-2xl cursor-pointer overflow-hidden
                  transition-all duration-500
                  ${isUnlocked ? 'hover:scale-[1.02] active:scale-[0.98]' : 'cursor-not-allowed'}
                `}
                style={{
                  background: isUnlocked
                    ? `linear-gradient(135deg, ${f.colorFrom}08, ${f.colorTo}05, rgba(20,20,40,0.9))`
                    : 'rgba(20,20,40,0.4)',
                  border: isCurrent
                    ? `1px solid ${f.colorFrom}40`
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: isCurrent ? `0 0 30px ${f.colorFrom}15, inset 0 0 30px ${f.colorFrom}08` : 'none',
                  opacity: isUnlocked ? 1 : 0.35,
                }}
                onClick={() => isUnlocked && router.push(`/spirited/${f.floor}`)}
              >
                {/* 发光边框 — 已解锁层 */}
                {isUnlocked && !isCurrent && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${f.colorFrom}10, transparent 60%)`,
                      opacity: 0.6,
                    }} />
                )}

                {/* 当前层光晕动画 */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none animate-glow"
                    style={{
                      boxShadow: `inset 0 0 40px ${f.colorFrom}10`,
                    }} />
                )}

                <div className="relative z-10 flex items-center gap-5">
                  {/* 几何层图标 */}
                  <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center relative transition-transform duration-500"
                    style={{
                      background: isUnlocked
                        ? `linear-gradient(135deg, ${f.colorFrom}20, ${f.colorTo}15)`
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isUnlocked ? f.colorFrom + '25' : 'rgba(255,255,255,0.06)'}`,
                    }}>
                    <span className={`text-xl ${isUnlocked ? '' : 'opacity-30'}`}
                      style={isUnlocked ? { color: f.colorFrom, filter: `drop-shadow(0 0 6px ${f.colorFrom}40)` } : {}}>
                      {f.icon}
                    </span>
                    {/* 锁定图标 */}
                    {!isUnlocked && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                        style={{ background: 'rgba(20,20,40,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        ◈
                      </div>
                    )}
                  </div>

                  {/* 层信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs tracking-wider opacity-40"
                        style={{ color: isUnlocked ? f.colorFrom : '#505060' }}>
                        第{f.floor}层
                      </span>
                      <span className="w-2 h-px opacity-20" style={{ backgroundColor: f.colorFrom }} />
                      <h3 className={`font-bold text-base ${isUnlocked ? 'text-white' : 'text-[#505060]'}`}>
                        {f.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#707090]">{f.desc} · {FLOOR_THEMES[i]}</p>
                  </div>

                  {/* 状态徽章 */}
                  <div className="shrink-0 flex items-center gap-2">
                    {hasKey && (
                      <span className="text-lg" style={{ filter: 'drop-shadow(0 0 6px rgba(240,192,96,0.5))' }}>
                        ◆
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${f.colorFrom}18`, color: f.colorFrom, border: `1px solid ${f.colorFrom}30` }}>
                        当前
                      </span>
                    )}
                    {!isCurrent && isUnlocked && i + 1 === currentFloor && (
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                        style={{ background: 'rgba(232,165,152,0.12)', color: 'var(--geo-coral)', border: '1px solid rgba(232,165,152,0.25)' }}>
                        可进入
                      </span>
                    )}
                    {!isUnlocked && (
                      <span className="text-xs opacity-25">◈</span>
                    )}
                  </div>
                </div>

                {/* 进度条 — 仅当前层 */}
                {isCurrent && (
                  <div className="mt-4 relative z-10">
                    <div className="h-1 bg-[#ffffff]/06 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${(currentFloor / 5) * 100}%`,
                          background: `linear-gradient(90deg, ${f.colorFrom}, ${f.colorTo})`,
                        }} />
                    </div>
                    <p className="text-[10px] text-[#707090] mt-1.5">探索进度：{currentFloor} / 5 层</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 收集的钥匙 ── */}
      {keys.length > 0 && (
        <div className="mt-8 geo-card p-5 animate-card-rise" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rotate-45" style={{ backgroundColor: 'var(--geo-gold)' }} />
            <h4 className="text-sm text-[#B0B0C0] font-medium">已收集的钥匙</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {keys.map((k: any, i: number) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                style={{
                  background: 'rgba(240,192,96,0.08)',
                  color: 'var(--geo-gold)',
                  border: '1px solid rgba(240,192,96,0.2)',
                }}
              >
                ◆ {k.floor}F · {k.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
