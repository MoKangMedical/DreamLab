'use client';

import { useState } from 'react';
import { updateProgress } from '@/lib/api';

interface Chapter {
  title: string;
  description: string;
  content?: string;
}

interface ChapterListProps {
  chapters: Chapter[];
  courseId: number;
  progress: { chapter_index: number; completed: boolean }[];
}

export default function ChapterList({ chapters, courseId, progress }: ChapterListProps) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [localProgress, setLocalProgress] = useState(progress);

  const toggleChapter = async (index: number) => {
    const existing = localProgress.find((p) => p.chapter_index === index);
    try {
      await updateProgress(courseId, {
        user_id: 1,
        chapter_index: index,
        completed: !existing?.completed,
      });
      setLocalProgress((prev) =>
        existing
          ? prev.map((p) => (p.chapter_index === index ? { ...p, completed: !p.completed } : p))
          : [...prev, { chapter_index: index, completed: true }],
      );
    } catch {}
  };

  const completedCount = localProgress.filter((p) => p.completed).length;
  const progressPercent = chapters.length > 0 ? Math.round((completedCount / chapters.length) * 100) : 0;

  return (
    <>
      {/* Progress Bar */}
      <div className="mt-6 glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#B0B0C0]">学习进度</span>
          <span className="text-sm font-medium text-[var(--accent-purple)]">{progressPercent}%</span>
        </div>
        <div className="h-2 bg-[#ffffff]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#9B7ED8] to-[#FF8A7A] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-[#B0B0C0] mt-2">
          已完成 {completedCount}/{chapters.length} 章节
        </p>
      </div>

      {/* Chapter List */}
      <div className="space-y-3 mt-6">
        {chapters.map((ch, i) => {
          const isDone = localProgress.some((p) => p.chapter_index === i && p.completed);
          const isActive = activeChapter === i;
          return (
            <div key={i} className="glass-card overflow-hidden">
              <button
                className="w-full p-5 flex items-center gap-4 text-left"
                onClick={() => setActiveChapter(isActive ? -1 : i)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    isDone
                      ? 'bg-gradient-to-br from-[#9B7ED8] to-[#FF8A7A] text-white'
                      : 'bg-[#ffffff]/10 text-[#B0B0C0]'
                  }`}
                >
                  {isDone ? '✓' : i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{ch.title}</h3>
                  <p className="text-sm text-[#B0B0C0]">{ch.description}</p>
                </div>
                <span className="text-[#B0B0C0] text-sm">{isActive ? '收起 ▲' : '展开 ▼'}</span>
              </button>
              {isActive && (
                <div className="px-5 pb-5">
                  <div className="border-t border-[var(--accent-purple)]/10 pt-4">
                    <div className="text-[#d0d0d0] leading-relaxed whitespace-pre-wrap text-sm">
                      {ch.content || '章节内容加载中…'}
                    </div>
                    <button
                      className={`mt-4 btn-ghost text-sm ${isDone ? '!border-[var(--accent-purple)]/40 !text-[var(--accent-purple)]' : ''}`}
                      onClick={() => toggleChapter(i)}
                    >
                      {isDone ? '✓ 已完成' : '标记完成'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {chapters.length === 0 && (
        <div className="text-center py-20 text-[#B0B0C0]">
          <span className="text-4xl block mb-4">📖</span>
          <p>课程章节数据需要从后端加载</p>
          <p className="text-sm mt-2">请确保后端服务已启动并执行了 seed 脚本</p>
        </div>
      )}
    </>
  );
}
