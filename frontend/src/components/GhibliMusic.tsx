'use client';

import { useState, useRef } from 'react';

/**
 * 宫崎骏音乐播放器
 * 使用 YouTube 播放 Joe Hisaishi 经典曲目
 * 右下角浮动按钮 → 点击展开精简播放器
 */
export default function GhibliMusic() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Joe Hisaishi Piano Collection — YouTube playlist
  const playlistId = 'PL2C9DA302B3C8E2C6';
  const videoId = 'DpN3O-sDTec'; // 千与千寻 主题曲钢琴版

  const togglePlay = () => {
    if (!open) {
      setOpen(true);
      setTimeout(() => {
        if (iframeRef.current) {
          const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&modestbranding=1&rel=0&volume=${volume}`;
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
          background: playing ? 'rgba(232,168,32,0.12)' : 'rgba(9,9,11,0.8)',
          border: playing ? '1px solid rgba(232,168,32,0.3)' : '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          color: playing ? '#e8a820' : '#7a7062',
          fontSize: 20,
          cursor: 'pointer',
          boxShadow: playing ? '0 0 20px rgba(232,168,32,0.1)' : 'none',
        }}
        title={playing ? '暂停音乐' : '播放宫崎骏音乐 🎵'}
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
            border: '1px solid rgba(232,168,32,0.12)',
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
              <span style={{ fontSize: 11, color: '#b8ad9a', fontWeight: 500 }}>
                いつも何度でも
              </span>
            </div>
            <button
              onClick={close}
              style={{
                background: 'none',
                border: 'none',
                color: '#5a5246',
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
            title="Ghibli Music"
          />

          {/* 控制条 */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              style={{
                background: 'none',
                border: '1px solid rgba(232,168,32,0.2)',
                borderRadius: 2,
                color: '#e8a820',
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
              <span style={{ fontSize: 12, color: '#5a5246' }}>🔈</span>
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
                  background: `linear-gradient(90deg, #e8a820 ${volume}%, rgba(255,255,255,0.06) ${volume}%)`,
                  borderRadius: 2,
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>

          <p style={{ fontSize: 10, color: '#4a4038', marginTop: 8, textAlign: 'center' }}>
            久石譲 · 千と千尋の神隠し
          </p>
        </div>
      )}
    </>
  );
}
