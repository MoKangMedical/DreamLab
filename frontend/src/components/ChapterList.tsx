'use client';

import { useState } from 'react';
import { updateProgress } from '@/lib/api';
import { showBathToken, showShikigami } from '@/components/SpiritedInteractions';

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
    const nextCompleted = !existing?.completed;
    try {
      await updateProgress(courseId, {
        user_id: 1,
        chapter_index: index,
        completed: nextCompleted,
      });
      setLocalProgress((prev) =>
        existing
          ? prev.map((p) => (p.chapter_index === index ? { ...p, completed: nextCompleted } : p))
          : [...prev, { chapter_index: index, completed: true }],
      );
      if (nextCompleted) {
        showBathToken('获得学习浴牌', '札', `第 ${index + 1} 章已完成`);
        showShikigami('新的课程进度已写入成长路线', 'success');
      }
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
      <div className="premium-panel p-8 md:p-10 mb-16 md:mb-20">
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm" style={{ color: '#a1a1aa' }}>学习进度</span>
          <span className="text-sm font-medium" style={{ color: '#d4a853' }}>{progressPercent}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, #9B7ED8, #d4a853)' }} />
        </div>
        <p className="text-xs mt-5" style={{ color: '#52525b' }}>已完成 {completedCount}/{chapters.length} 章节</p>
      </div>

      {/* Chapter List */}
      <div className="space-y-7 md:space-y-9">
        {chapters.map((ch, i) => {
          const isDone = localProgress.some((p) => p.chapter_index === i && p.completed);
          const isActive = activeChapter === i;
          const content = textContent(ch);
          const wordCount = content.length;
          const chapterOrder = ch.order ?? (i + 1);
          const hasAudio = courseId > 0 && chapterOrder > 0;
          const audioPath = `/DreamLab/audio/courses/course${courseId}_ch${chapterOrder}.mp3`;

          return (
            <div key={i} className="premium-panel" style={{ borderColor: isActive ? 'rgba(212,168,83,0.2)' : 'rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'border-color 0.3s' }}>
              <button className="w-full p-7 md:p-10 flex items-center gap-6 md:gap-8 text-left" onClick={() => setActiveChapter(isActive ? null : i)}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isDone ? 'text-white' : ''}`}
                  style={isDone ? { background: 'linear-gradient(135deg, #9B7ED8, #d4a853)' } : { background: 'rgba(255,255,255,0.06)', color: '#71717a' }}>
                  {isDone ? '✓' : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-medium leading-7 break-words" style={{ color: isActive ? '#f4f4f6' : '#a1a1aa' }}>{ch.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs" style={{ color: '#52525b' }}>{wordCount.toLocaleString()}字</span>
                    {hasAudio && <span className="text-xs" style={{ color: '#d4a853' }}>🎙️ 音频</span>}
                  </div>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: '#52525b' }}>{isActive ? '收起 ▲' : '展开 ▼'}</span>
              </button>

              {isActive && (
                <div className="px-7 md:px-12 pb-10 md:pb-14 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  {/* Audio Player */}
                  {hasAudio && (
                    <div className="mt-10 p-6 md:p-7 flex items-center gap-6" style={{ background: 'rgba(212,168,83,0.05)', border: '1px solid rgba(212,168,83,0.12)', borderRadius: 8 }}>
                      <button
                        onClick={() => setPlayingAudio(playingAudio === i ? null : i)}
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{ background: playingAudio === i ? '#d4a853' : 'rgba(212,168,83,0.15)', color: playingAudio === i ? '#0a0a0c' : '#d4a853' }}
                      >
                        {playingAudio === i ? '⏸' : '▶'}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: '#d4a853' }}>章节音频介绍</p>
                        <p className="text-xs truncate" style={{ color: '#71717a' }}>YunyangNeural 男声 · 慢速低音调 · 标准化音频</p>
                      </div>
                      {playingAudio === i && (
                        <audio autoPlay controls className="h-8 w-full max-w-[200px]" onEnded={() => setPlayingAudio(null)}>
                          <source src={audioPath} type="audio/mpeg" />
                        </audio>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="mt-10 pt-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="max-w-[880px] mx-auto text-[17px] leading-[2.32] whitespace-pre-wrap" style={{ color: '#c8c8d0', fontFamily: "'Noto Serif SC', 'Inter', serif" }}>
                      {content || '章节内容加载中…'}
                    </div>
                    {/* Mark Complete */}
                    <button
                      className={`mt-10 text-xs px-5 py-2.5 rounded-full transition-colors ${isDone ? '' : 'hover:opacity-80'}`}
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
