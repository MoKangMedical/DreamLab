'use client';

import { useState } from 'react';
import { updateProgress } from '@/lib/api';

interface Chapter {
  title: string;
  description?: string;
  body?: string;
  content?: string;
  audio_intro?: string;
  order?: number;
}

interface ChapterListProps {
  chapters: Chapter[];
  courseId: number;
  progress: { chapter_index: number; completed: boolean }[];
}

export default function ChapterList({ chapters, courseId, progress }: ChapterListProps) {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [localProgress, setLocalProgress] = useState(progress);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

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

  const textContent = (ch: Chapter) => {
    const raw = (ch.body || ch.content || '');
    // Strip markdown headers that duplicate the chapter title
    return raw.replace(/^#+\s*第[一二三四五六七八九十\d]+章.*?\n/gm, '').trim();
  };

  const completedCount = localProgress.filter((p) => p.completed).length;
  const progressPercent = chapters.length > 0 ? Math.round((completedCount / chapters.length) * 100) : 0;

  return (
    <>
      {/* Progress Bar */}
      <div className="p-6 mb-8" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm" style={{ color: '#a1a1aa' }}>学习进度</span>
          <span className="text-sm font-medium" style={{ color: '#d4a853' }}>{progressPercent}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, #9B7ED8, #d4a853)' }} />
        </div>
        <p className="text-xs mt-3" style={{ color: '#52525b' }}>已完成 {completedCount}/{chapters.length} 章节</p>
      </div>

      {/* Chapter List */}
      <div className="space-y-4">
        {chapters.map((ch, i) => {
          const isDone = localProgress.some((p) => p.chapter_index === i && p.completed);
          const isActive = activeChapter === i;
          const content = textContent(ch);
          const wordCount = content.length;
          const hasAudio = (ch.audio_intro && ch.audio_intro.length > 10);
          const audioPath = `/DreamLab/audio/courses/course${courseId}_ch${ch.order || (i + 1)}.mp3`;

          return (
            <div key={i} style={{ background: '#111113', border: `1px solid ${isActive ? 'rgba(212,168,83,0.2)' : 'rgba(255,255,255,0.05)'}`, borderRadius: 8, overflow: 'hidden', transition: 'border-color 0.3s' }}>
              <button className="w-full p-5 flex items-center gap-4 text-left" onClick={() => setActiveChapter(isActive ? null : i)}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isDone ? 'text-white' : ''}`}
                  style={isDone ? { background: 'linear-gradient(135deg, #9B7ED8, #d4a853)' } : { background: 'rgba(255,255,255,0.06)', color: '#71717a' }}>
                  {isDone ? '✓' : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium truncate" style={{ color: isActive ? '#f4f4f6' : '#a1a1aa' }}>{ch.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs" style={{ color: '#52525b' }}>{wordCount.toLocaleString()}字</span>
                    {hasAudio && <span className="text-xs" style={{ color: '#d4a853' }}>🎙️ 音频</span>}
                  </div>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: '#52525b' }}>{isActive ? '收起 ▲' : '展开 ▼'}</span>
              </button>

              {isActive && (
                <div className="px-5 md:px-6 pb-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  {/* Audio Player */}
                  {hasAudio && (
                    <div className="mt-5 p-4 flex items-center gap-4" style={{ background: 'rgba(212,168,83,0.05)', border: '1px solid rgba(212,168,83,0.12)', borderRadius: 8 }}>
                      <button
                        onClick={() => setPlayingAudio(playingAudio === i ? null : i)}
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{ background: playingAudio === i ? '#d4a853' : 'rgba(212,168,83,0.15)', color: playingAudio === i ? '#0a0a0c' : '#d4a853' }}
                      >
                        {playingAudio === i ? '⏸' : '▶'}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: '#d4a853' }}>章节音频介绍</p>
                        <p className="text-xs truncate" style={{ color: '#71717a' }}>AI 晓晓语音 · 约1-2分钟</p>
                      </div>
                      {playingAudio === i && (
                        <audio autoPlay controls className="h-8 w-full max-w-[200px]" onEnded={() => setPlayingAudio(null)}>
                          <source src={audioPath} type="audio/mpeg" />
                        </audio>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="text-[15px] leading-[2.05] whitespace-pre-wrap" style={{ color: '#c8c8d0', fontFamily: "'Noto Serif SC', 'Inter', serif" }}>
                      {content || '章节内容加载中…'}
                    </div>
                    {/* Mark Complete */}
                    <button
                      className={`mt-7 text-xs px-4 py-2 rounded-full transition-colors ${isDone ? '' : 'hover:opacity-80'}`}
                      style={isDone
                        ? { background: 'rgba(155,126,216,0.1)', border: '1px solid rgba(155,126,216,0.3)', color: '#9B7ED8' }
                        : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#a1a1aa' }}
                      onClick={() => toggleChapter(i)}>
                      {isDone ? '✓ 已完成' : '标记为已完成'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {chapters.length === 0 && (
        <div className="text-center py-20" style={{ color: '#52525b' }}>
          <span className="text-4xl block mb-4">📖</span>
          <p>课程章节数据需要从后端加载</p>
        </div>
      )}
    </>
  );
}
