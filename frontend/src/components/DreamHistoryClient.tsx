'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDreams } from '@/lib/api';

// ── 常见梦境符号 ──
const COMMON_SYMBOLS: Record<string, string> = {
  '飞翔': '对自由的渴望或对控制的追求。也可能是逃避现实的心理补偿。',
  '坠落': '对失控的恐惧、不安全感。常见于生活重大转折期。',
  '被追赶': '逃避某个问题或情绪。追赶者往往是你内心不愿面对的部分。',
  '水': '情绪与无意识的象征。清澈的水代表情绪顺畅，浑浊的水代表困惑。',
  '牙齿脱落': '对衰老、失去能力或被评判的焦虑。也是最常见的梦境之一。',
  '考试迟到': '对表现或被评价的焦虑。即使离开学校多年仍可能出现。',
  '迷路': '方向感丧失或人生抉择的迷茫。你在寻找什么路？',
  '死亡': '象征结束与新的开始——某个阶段或身份的终结，而非字面的死亡。',
};

export default function DreamHistoryClient() {
  const [dreams, setDreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    getDreams()
      .then(setDreams)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // ── 统计 ──
  const totalDreams = dreams.length;
  const allEmotions = dreams.flatMap((d: any) => d.emotions || []);
  const emotionCounts = allEmotions.reduce((acc: Record<string, number>, e: string) => {
    acc[e] = (acc[e] || 0) + 1;
    return acc;
  }, {});
  const topEmotions = (Object.entries(emotionCounts) as [string, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  const recentDreams = dreams.slice(0, 5);

  // ── 检测梦境中是否含有常见符号 ──
  const detectedSymbols = Object.entries(COMMON_SYMBOLS).filter(([key]) =>
    dreams.some(d => (d.content || '').includes(key))
  );

  return (
    <div style={{ background: '#060f18', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-32">
        
        {/* ════════════════ Hero ════════════════ */}
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-5xl mb-4">📖</div>
          <h1 className="font-bold mb-3" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: '#f5efe0',
          }}>
            你的梦境之书
          </h1>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: '#7a7062' }}>
            每一个记录下来的梦，都是你与自己的一次深度对话。
            翻看往日的梦境，发现潜意识在对你说了什么。
          </p>
        </div>

        {/* ════════════════ 统计总览 ════════════════ */}
        {dreams.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="p-4 text-center" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#e8a820' }}>{totalDreams}</div>
                <div className="text-xs" style={{ color: '#5a5246' }}>梦境总数</div>
              </div>
              <div className="p-4 text-center" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#8b7ab8' }}>{new Set(allEmotions).size}</div>
                <div className="text-xs" style={{ color: '#5a5246' }}>不同情绪</div>
              </div>
              <div className="p-4 text-center" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#4a90b8' }}>{detectedSymbols.length}</div>
                <div className="text-xs" style={{ color: '#5a5246' }}>识别符号</div>
              </div>
              <div className="p-4 text-center" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <Link href="/dream" className="inline-block w-full h-full">
                  <div className="text-3xl font-bold mb-1" style={{ color: '#6b9e7a' }}>+</div>
                  <div className="text-xs" style={{ color: '#6b9e7a' }}>记录新梦</div>
                </Link>
              </div>
            </div>

            {/* 情绪分布 */}
            {topEmotions.length > 0 && (
              <div className="p-5 mb-6" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#f5efe0' }}>😌 最常见的情绪</h3>
                <div className="flex flex-wrap gap-2">
                  {topEmotions.map(([emotion, count]) => (
                    <span key={emotion} className="text-xs px-3 py-1.5" style={{
                      background: 'rgba(232,168,32,0.08)',
                      border: '1px solid rgba(232,168,32,0.15)',
                      color: '#e8a820',
                      borderRadius: 2,
                    }}>
                      {emotion} × {count}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 识别到常见符号 */}
            {detectedSymbols.length > 0 && (
              <div className="p-5" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#f5efe0' }}>🔍 在你的梦境中识别到</h3>
                <div className="space-y-3">
                  {detectedSymbols.slice(0, 5).map(([key, meaning]) => (
                    <div key={key} className="p-3" style={{ background: '#060f18', borderRadius: 2 }}>
                      <div className="text-xs font-bold mb-1" style={{ color: '#4a90b8' }}>「{key}」</div>
                      <div className="text-xs leading-relaxed" style={{ color: '#7a7062' }}>{meaning}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════ 梦境列表 ════════════════ */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,168,32,0.5)' }}>
              {dreams.length > 0 ? `全部梦境 (${totalDreams})` : '梦境记录'}
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-5 animate-pulse" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <div className="h-5 w-1/3 mb-3" style={{ background: '#ffffff05', borderRadius: 1 }} />
                  <div className="h-4 w-full mb-2" style={{ background: '#ffffff05', borderRadius: 1 }} />
                  <div className="h-4 w-2/3" style={{ background: '#ffffff05', borderRadius: 1 }} />
                </div>
              ))}
            </div>
          ) : dreams.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">🌙</span>
              <p className="text-sm mb-2" style={{ color: '#7a7062' }}>梦境之书还是空白的</p>
              <p className="text-xs mb-6" style={{ color: '#5a5246' }}>
                梦是潜意识的信使——醒来后越早记录，能抓住的细节越多
              </p>
              <Link href="/dream"
                className="inline-block px-8 py-3 text-sm font-semibold transition-all hover:scale-105"
                style={{ background: '#e8a820', color: '#060f18', borderRadius: 2 }}>
                🌙 记录第一个梦
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {dreams.map((d: any) => (
                <Link key={d.id} href={`/dream/history/${d.id}`}
                  className="block p-5 transition-all hover:translate-x-1"
                  style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0' }}>
                      {d.title}
                    </h3>
                    <span className="text-xs shrink-0 ml-4" style={{ color: '#5a5246' }}>
                      {new Date(d.created_at || d.dream_date).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: '#b8ad9a', lineHeight: 1.7 }}>
                    {d.content}
                  </p>
                  {d.emotions?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {d.emotions.map((e: string) => (
                        <span key={e} className="text-xs px-2 py-0.5"
                          style={{
                            background: 'rgba(74,144,184,0.08)',
                            border: '1px solid rgba(74,144,184,0.15)',
                            color: '#4a90b8',
                            borderRadius: 2,
                          }}>
                          {e}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
