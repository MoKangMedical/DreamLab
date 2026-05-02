'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDreams } from '@/lib/api';

export default function DreamHistoryClient() {
  const [dreams, setDreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDreams()
      .then(setDreams)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">梦境记录</span>
          </h1>
          <p className="text-[#B0B0C0]">你做过的梦，都在这里</p>
        </div>
        <Link href="/dream" className="btn-primary">
          + 记录新梦
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card p-5 animate-pulse">
              <div className="h-5 w-1/3 bg-[#ffffff]/5 rounded mb-3" />
              <div className="h-4 w-full bg-[#ffffff]/5 rounded mb-2" />
              <div className="h-4 w-2/3 bg-[#ffffff]/5 rounded" />
            </div>
          ))}
        </div>
      ) : dreams.length === 0 ? (
        <div className="text-center py-20 text-[#B0B0C0]">
          <span className="text-5xl block mb-4">🌙</span>
          <p className="mb-4">还没有梦境记录</p>
          <Link href="/dream" className="btn-primary">去记录第一个梦</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {dreams.map(d => (
            <Link key={d.id} href={`/dream/history/${d.id}`} className="glass-card p-5 block group">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent-purple)] transition-colors">
                  {d.title}
                </h3>
                <span className="text-xs text-[#B0B0C0]">
                  {new Date(d.created_at || d.dream_date).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <p className="text-sm text-[#B0B0C0] line-clamp-2">{d.content}</p>
              {d.emotions?.length > 0 && (
                <div className="flex gap-1 mt-3">
                  {d.emotions.slice(0, 3).map((e: string) => (
                    <span key={e} className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]">
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
  );
}
