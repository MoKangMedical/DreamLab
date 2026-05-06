'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * 久石让音乐播放器 — 分页感知
 * 每个页面自动匹配最合适的久石譲钢琴曲
 * 右下角浮动按钮 → 点击展开精简播放器
 */

// 每个页面对应的 Joe Hisaishi YouTube 曲目
const PAGE_MUSIC: Record<string, { videoId: string; title: string; subtitle: string }> = {
  '/': {
    videoId: 'f7SS57LFPco',
    title: '人生のメリーゴーランド',
    subtitle: 'ハウルの動く城',
  },
  '/assessments': {
    videoId: 'z9TGgQY1noE',
    title: 'あの夏へ',
    subtitle: '千と千尋の神隠し',
  },
  '/companion': {
    videoId: 'QAoQK4CKlPY',
    title: '6番目の駅',
    subtitle: '千と千尋の神隠し',
  },
  '/dream': {
    videoId: '7LEmer7wwVI',
    title: '海の見える街',
    subtitle: '魔女の宅急便',
  },
  '/knowledge': {
    videoId: 'f7SS57LFPco',
    title: '人生のメリーゴーランド',
    subtitle: 'ハウルの動く城',
  },
  '/wellness': {
    videoId: 'X6R7fT_V0gA',
    title: '風のとおり道',
    subtitle: 'となりのトトロ',
  },
  '/community': {
    videoId: 'V3V72pNQgc0',
    title: 'ふたたび',
    subtitle: '千と千尋の神隠し',
  },
  '/courses': {
    videoId: 'DpN3O-sDTec',
    title: 'いつも何度でも',
    subtitle: '千と千尋の神隠し',
  },
  '/predict': {
    videoId: 'HQKBwYPR4y8',
    title: 'アシタカとサン',
    subtitle: 'もののけ姫',
  },
  '/bathhouse': {
    videoId: 'z9TGgQY1noE',
    title: 'あの夏へ',
    subtitle: '千と千尋の神隠し',
  },
  '/profile': {
    videoId: 'X6R7fT_V0gA',
    title: '風のとおり道',
    subtitle: 'となりのトトロ',
  },
  '/spirited': {
    videoId: 'DpN3O-sDTec',
    title: 'いつも何度でも',
    subtitle: '千と千尋の神隠し',
  },
  '/reflect': {
    videoId: 'V3V72pNQgc0',
    title: 'ふたたび',
    subtitle: '千と千尋の神隠し',
  },
};

export default function GhibliMusic() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 匹配当前路径（处理 /assessments/1 这类子路由）
  const matchedKey = Object.keys(PAGE_MUSIC).find((key) => {
    if (key === '/') return pathname === '/';
    return pathname === key || pathname.startsWith(key + '/');
  });
  const track = PAGE_MUSIC[matchedKey || '/'] || PAGE_MUSIC['/'];

  // 路由切换时自动换曲
  useEffect(() => {
    if (playing && iframeRef.current) {
      const src = `https://www.youtube.com/embed/${track.videoId}?autoplay=1&loop=1&playlist=${track.videoId}&controls=0&disablekb=1&modestbranding=1&rel=0&volume=${volume}`;
      iframeRef.current.src = src;
    }
  }, [pathname]);

  const togglePlay = () => {
    if (!open) {
      setOpen(true);
      setTimeout(() => {
        if (iframeRef.current) {
          const src = `https://www.youtube.com/embed/${track.videoId}?autoplay=1&loop=1&playlist=${track.videoId}&controls=0&disablekb=1&modestbranding=1&rel=0&volume=${volume}`;
          iframeRef.current.src = src;
        }
        setPlaying(true);
      }, 200);
    } else {
      setPlaying(!playing);
      if (iframeRef.current?.contentWindow) {
        if (playing) {
          iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } else {
          iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      }
    }
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${v}]}`, '*');
    }
  };

  const close = () => {
    setOpen(false);
    setPlaying(false);
    if (iframeRef.current) iframeRef.current.src = '';
  };

  return (
    <>
      {/* 音乐按钮 */}
      <button
        onClick={togglePlay}
        className="fixed z-[200] rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95"
        style={{
          bottom: 'clamp(80px, 10vh, 120px)',
          right: 'clamp(16px, 4vw, 32px)',
          width: 44,
          height: 44,
          background: playing ? 'rgba(212,168,83,0.12)' : 'rgba(9,9,11,0.8)',
          border: playing ? '1px solid rgba(212,168,83,0.3)' : '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          color: playing ? '#d4a853' : '#71717a',
          fontSize: 20,
          cursor: 'pointer',
          boxShadow: playing ? '0 0 20px rgba(212,168,83,0.1)' : 'none',
        }}
        title={playing ? '暂停音乐' : '久石譲 · 背景音乐'}
      >
        {playing ? '🎶' : '🎵'}
      </button>

      {/* 展开式播放器 */}
      {open && (
        <div
          className="fixed z-[200] transition-all duration-500"
          style={{
            bottom: 'clamp(136px, 16vh, 176px)',
            right: 'clamp(16px, 4vw, 32px)',
            width: 260,
            background: 'rgba(9,9,11,0.94)',
            border: '1px solid rgba(212,168,83,0.12)',
            borderRadius: 2,
            backdropFilter: 'blur(20px)',
            padding: '12px 14px',
            animation: 'card-rise 0.4s ease-out',
          }}
        >
          {/* 标题 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 14 }}>{playing ? '🎶' : '🎵'}</span>
              <div>
                <span style={{ fontSize: 11, color: '#a1a1aa', fontWeight: 500 }}>
                  {track.title}
                </span>
                <br />
                <span style={{ fontSize: 9, color: '#52525b' }}>
                  {track.subtitle}
                </span>
              </div>
            </div>
            <button
              onClick={close}
              style={{
                background: 'none',
                border: 'none',
                color: '#52525b',
                cursor: 'pointer',
                fontSize: 14,
                padding: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* YouTube iframe (hidden) */}
          <iframe
            ref={iframeRef}
            style={{ display: 'none' }}
            allow="autoplay"
            title="Joe Hisaishi BGM"
          />

          {/* 控制条 */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              style={{
                background: 'none',
                border: '1px solid rgba(212,168,83,0.2)',
                borderRadius: 2,
                color: '#d4a853',
                cursor: 'pointer',
                fontSize: 16,
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {playing ? '⏸' : '▶'}
            </button>

            {/* 音量滑条 */}
            <div className="flex-1 flex items-center gap-2">
              <span style={{ fontSize: 12, color: '#52525b' }}>🔈</span>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={e => changeVolume(Number(e.target.value))}
                style={{
                  flex: 1,
                  height: 3,
                  appearance: 'none' as any,
                  background: `linear-gradient(90deg, #d4a853 ${volume}%, rgba(255,255,255,0.06) ${volume}%)`,
                  borderRadius: 2,
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>

          <p style={{ fontSize: 10, color: '#52525b', marginTop: 8, textAlign: 'center' }}>
            久石譲 · スタジオジブリ
          </p>
        </div>
      )}
    </>
  );
}
