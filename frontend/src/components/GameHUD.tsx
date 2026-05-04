'use client';

import { useState, useEffect } from 'react';
import { getProgress } from '@/lib/storage';

export default function GameHUD() {
  const [progress, setProgress] = useState(getProgress());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentFloor = progress.current_floor || 1;
  const keys = progress.keys_collected || [];
  const title = progress.title_earned || '';

  const floorIcons: Record<number, string> = {
    1: '🌉', 2: '🔥', 3: '👤', 4: '🏞️', 5: '🐉',
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#1a1a2a]/80 backdrop-blur-sm border border-[#ffffff]/10">
      {/* 左：称号 */}
      <div className="flex items-center gap-3">
        <span className="text-xl">{floorIcons[currentFloor] || '🌉'}</span>
        <div>
          <p className="text-xs text-[#7a7062]">当前称号</p>
          <p className="text-sm font-bold text-white">{title || '初入油屋者'}</p>
        </div>
      </div>

      {/* 中：楼层进度 */}
      <div className="flex-1 mx-6 max-w-xs">
        <div className="flex justify-between text-xs text-[#7a7062] mb-1">
          <span>F1</span><span>F2</span><span>F3</span><span>F4</span><span>F5</span>
        </div>
        <div className="h-1.5 bg-[#ffffff]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#9B7ED8] via-[#FF8A7A] to-[#F0C060] rounded-full transition-all duration-1000"
            style={{ width: `${(currentFloor / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* 右：钥匙数 */}
      <div className="flex items-center gap-2">
        <span className="text-[#f7b232] text-lg">🔑</span>
        <div>
          <p className="text-xs text-[#7a7062]">钥匙</p>
          <p className="text-sm font-bold text-[#f7b232]">{keys.length}/5</p>
        </div>
      </div>
    </div>
  );
}
