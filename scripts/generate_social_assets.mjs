#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = join(ROOT, 'frontend/public/marketing');

const BRAND = {
  bg: '#0a0a0c',
  panel: '#111113',
  gold: '#d4a853',
  gold2: '#e8bd55',
  text: '#f4f4f6',
  muted: '#a1a1aa',
  dim: '#71717a',
  red: '#c4554d',
  green: '#72a66a',
};

const xhsPosts = [
  {
    id: 'd1-dream-chase',
    day: 'D1',
    title: '总是梦见被追赶，是不是潜意识在提醒你？',
    cover: '梦见被追赶，先别急着害怕',
    cards: [
      ['先看身体感受', '喘不过气、跑不动，还是一直找不到出口？'],
      ['再看现实压力', '是否有一个问题你一直拖着不处理？'],
      ['不要直接查吉凶', '先记录人物、地点、情绪和醒后感受。'],
      ['梦境不是诊断', '它更像一次温和的自我观察。'],
      ['连续记录 7 天', '再看那些重复出现的主题。'],
    ],
    cta: '主页进入 DreamLab，做一次梦境记录',
  },
  {
    id: 'd2-anxiety-check',
    day: 'D2',
    title: '焦虑不是你太脆弱，可能是系统已经过载',
    cover: '焦虑时，先检查这 3 个信号',
    cards: [
      ['睡眠是否变浅', '入睡慢、易醒、醒后仍然累。'],
      ['身体是否变紧', '肩颈、胃部、胸口或下颌持续紧绷。'],
      ['大脑是否预演', '反复推演最坏结果，很难停下来。'],
      ['先记录不评价', '把焦虑拆成身体、念头和情境。'],
      ['再做轻测评', '找到下一步学习入口，而不是给自己贴标签。'],
    ],
    cta: '主页做一次心理测评',
  },
  {
    id: 'd3-course-route',
    day: 'D3',
    title: '心理学入门别硬啃教材，先从一个真实问题开始',
    cover: '100 门心理课，先学哪 3 门？',
    cards: [
      ['梦境困扰', '弗洛伊德、荣格、现代睡眠科学。'],
      ['情绪困扰', 'CBT、正念、情绪调节。'],
      ['关系困扰', '依恋理论、沟通心理学、家庭系统。'],
      ['拖延困扰', '动机、习惯、时间知觉。'],
      ['每学一节课', '写一句今天能做的小动作。'],
    ],
    cta: '主页进入 100 门课程地图',
  },
  {
    id: 'd4-sleep-shutdown',
    day: 'D4',
    title: '睡前反复想事的人，试试这句关机句式',
    cover: '睡前大脑停不下来，先写这一句',
    cards: [
      ['我最担心的是', '把脑内循环的问题写成一句话。'],
      ['明天最小一步', '只写一个可执行动作，不继续推演。'],
      ['今晚先休息', '给自己一个允许暂停的理由。'],
      ['写完就停', '不要把床变成深夜会议室。'],
      ['第二天复盘', '再用反思日志处理它。'],
    ],
    cta: '去 DreamLab 写一条反思日志',
  },
];

const douyinVideos = [
  {
    id: 'dream-chase',
    title: '梦见被追赶',
    hook: '如果你总是梦见被追赶，先别急着说这是坏预兆。',
    screenText: ['梦不是预言', '先记录感受', '再匹配课程'],
    cta: '主页进 DreamLab，做一次梦境记录',
  },
  {
    id: 'anxiety-check',
    title: '焦虑自查',
    hook: '焦虑不一定是你想太多，可能是身体在提醒你系统过载。',
    screenText: ['睡眠', '身体', '念头'],
    cta: '主页做轻量心理测评',
  },
  {
    id: 'course-route',
    title: '100 门课入口',
    hook: '心理学入门，不要从最厚的教材开始。',
    screenText: ['一个问题', '一条路线', '一次复盘'],
    cta: '主页进入课程地图',
  },
  {
    id: 'ai-reflect',
    title: 'AI 陪伴边界',
    hook: 'AI 不能替代心理咨询，但它可以帮你整理今天的混乱感受。',
    screenText: ['不替代咨询', '帮助记录', '辅助复盘'],
    cta: '主页体验反思日志',
  },
];

const digitalHumanEpisodes = [
  {
    id: 'ep01-opening',
    episode: 'EP01',
    title: 'DreamLab 心理研究员开场',
    scene: '深色背景、金色 DreamLab 标识、研究员半身口播',
    script: '你好，我是 DreamLab 的 AI 心理研究员。这里不是诊断室，而是一间心理学学习与自我观察实验室。',
    visual: '梦境解析 / 心理测评 / 100 门课程 / 成长复盘',
  },
  {
    id: 'ep02-freud-dream',
    episode: 'EP02',
    title: '弗洛伊德如何看梦',
    scene: '数字人站在课程地图前，背景出现梦境剧场式光影',
    script: '梦不是固定符号表，而可能是通往潜意识的一条线索。',
    visual: '情绪 / 人物 / 场景 / 压力',
  },
  {
    id: 'ep03-jung-shadow',
    episode: 'EP03',
    title: '荣格说的阴影不是缺点',
    scene: '数字人旁边出现一面暗金色镜子',
    script: '阴影不是你的缺点清单，而是还没有被整合的部分。',
    visual: '讨厌 -> 未被理解的需要',
  },
  {
    id: 'ep04-seven-day-quest',
    episode: 'EP04',
    title: '7 天成长任务',
    scene: '数字人指向成长游戏地图',
    script: '一次测评，一条记录，三节课程，一篇反思。先建立能复盘的路线。',
    visual: '7 天路径逐格点亮',
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function wrapText(text, maxChars) {
  const chars = Array.from(text);
  const lines = [];
  let line = '';
  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index];
    line += char;
    const next = chars[index + 1] || '';
    const shouldBreak = /[，。！？、]/.test(char) || (line.length >= maxChars && !/[，。！？、]/.test(next));
    if (shouldBreak) {
      lines.push(line.trim());
      line = '';
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines.reduce((merged, item) => {
    if (/^[，。！？、]+$/.test(item) && merged.length) {
      merged[merged.length - 1] += item;
    } else {
      merged.push(item);
    }
    return merged;
  }, []);
}

function textBlock(text, x, y, options = {}) {
  const {
    size = 48,
    maxChars = 14,
    lineHeight = size * 1.36,
    fill = BRAND.text,
    weight = 600,
    anchor = 'start',
    family = 'Noto Serif SC, Songti SC, serif',
  } = options;
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" font-family="${family}">${wrapText(text, maxChars).map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`).join('')}</text>`;
}

function stars(width, height, count = 28) {
  return Array.from({ length: count }, (_, index) => {
    const x = (index * 173) % width;
    const y = 80 + ((index * 263) % (height - 160));
    const opacity = 0.22 + (index % 5) * 0.12;
    const r = 2 + (index % 2);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${BRAND.gold}" opacity="${opacity}"/>`;
  }).join('');
}

function brandHeader(day = '') {
  return `
    <circle cx="84" cy="82" r="30" fill="rgba(212,168,83,0.12)" stroke="${BRAND.gold}" stroke-opacity="0.7"/>
    <text x="84" y="93" fill="${BRAND.gold}" font-size="24" font-weight="700" text-anchor="middle" font-family="Noto Serif SC, serif">梦</text>
    <text x="130" y="92" fill="${BRAND.gold2}" font-size="30" font-weight="700" font-family="Noto Serif SC, serif">DreamLab</text>
    <text x="930" y="91" fill="${BRAND.dim}" font-size="24" text-anchor="end" font-family="Inter, sans-serif">${day}</text>
  `;
}

function xhsCover(post) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1440" viewBox="0 0 1080 1440" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1440" fill="${BRAND.bg}"/>
  ${stars(1080, 1440, 34)}
  <rect x="58" y="58" width="964" height="1324" rx="34" fill="#0d0d10" stroke="rgba(212,168,83,0.18)"/>
  ${brandHeader(post.day)}
  <rect x="104" y="216" width="240" height="54" rx="27" fill="rgba(212,168,83,0.12)" stroke="rgba(212,168,83,0.42)"/>
  <circle cx="135" cy="243" r="7" fill="${BRAND.gold}"/>
  <text x="156" y="252" fill="${BRAND.gold2}" font-size="24" font-weight="700" font-family="Inter, sans-serif">心理学自我观察</text>
  ${textBlock(post.cover, 104, 430, { size: 86, maxChars: 9, lineHeight: 112, fill: BRAND.text, weight: 800 })}
  ${textBlock(post.title, 108, 805, { size: 40, maxChars: 18, lineHeight: 62, fill: BRAND.muted, weight: 500, family: 'Noto Serif SC, serif' })}
  <rect x="104" y="1068" width="872" height="132" rx="24" fill="rgba(212,168,83,0.1)" stroke="rgba(212,168,83,0.25)"/>
  ${textBlock(post.cta, 150, 1148, { size: 34, maxChars: 18, lineHeight: 46, fill: BRAND.gold2, weight: 700 })}
  <text x="104" y="1292" fill="${BRAND.dim}" font-size="26" font-family="Inter, sans-serif">AI assisted content · 心理学教育内容</text>
</svg>`;
}

function xhsCard(post, card, cardIndex) {
  const [heading, body] = card;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1440" viewBox="0 0 1080 1440" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1440" fill="${BRAND.bg}"/>
  ${stars(1080, 1440, 24)}
  <rect x="58" y="58" width="964" height="1324" rx="34" fill="${BRAND.panel}" stroke="rgba(255,255,255,0.08)"/>
  ${brandHeader(`${post.day}.${cardIndex}`)}
  <text x="104" y="292" fill="${BRAND.gold}" font-size="54" font-weight="800" font-family="Inter, sans-serif">0${cardIndex}</text>
  ${textBlock(heading, 104, 430, { size: 82, maxChars: 8, lineHeight: 108, fill: BRAND.text, weight: 800 })}
  <rect x="104" y="690" width="872" height="2" fill="rgba(212,168,83,0.28)"/>
  ${textBlock(body, 104, 810, { size: 54, maxChars: 13, lineHeight: 82, fill: BRAND.muted, weight: 500 })}
  <rect x="104" y="1194" width="872" height="102" rx="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
  <text x="540" y="1258" fill="${BRAND.gold2}" font-size="30" font-weight="700" text-anchor="middle" font-family="Noto Serif SC, serif">${escapeXml(post.cta)}</text>
</svg>`;
}

function douyinStoryboard(video) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1920" fill="${BRAND.bg}"/>
  ${stars(1080, 1920, 40)}
  <rect x="64" y="92" width="952" height="1736" rx="42" fill="#0d0d10" stroke="rgba(212,168,83,0.18)"/>
  ${brandHeader('抖音脚本')}
  <text x="104" y="282" fill="${BRAND.gold}" font-size="40" font-weight="700" font-family="Inter, sans-serif">30-45 秒短视频</text>
  ${textBlock(video.hook, 104, 430, { size: 72, maxChars: 10, lineHeight: 96, fill: BRAND.text, weight: 800 })}
  <rect x="104" y="860" width="872" height="520" rx="28" fill="rgba(212,168,83,0.07)" stroke="rgba(212,168,83,0.20)"/>
  <text x="150" y="940" fill="${BRAND.gold2}" font-size="34" font-weight="700" font-family="Noto Serif SC, serif">画面字幕</text>
  ${video.screenText.map((line, index) => `<text x="150" y="${1040 + index * 105}" fill="${BRAND.text}" font-size="58" font-weight="800" font-family="Noto Serif SC, serif">${escapeXml(line)}</text>`).join('')}
  <rect x="104" y="1508" width="872" height="112" rx="22" fill="${BRAND.gold}"/>
  <text x="540" y="1578" fill="#0a0a0c" font-size="34" font-weight="800" text-anchor="middle" font-family="Noto Serif SC, serif">${escapeXml(video.cta)}</text>
  <text x="104" y="1728" fill="${BRAND.dim}" font-size="26" font-family="Noto Serif SC, serif">AI 生成辅助脚本 · 发布时保留平台 AI 标识</text>
</svg>`;
}

function digitalHumanStoryboard(episode) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1920" fill="${BRAND.bg}"/>
  ${stars(1080, 1920, 36)}
  <rect x="64" y="92" width="952" height="1736" rx="42" fill="${BRAND.panel}" stroke="rgba(255,255,255,0.08)"/>
  ${brandHeader(episode.episode)}
  <circle cx="540" cy="440" r="160" fill="rgba(212,168,83,0.10)" stroke="rgba(212,168,83,0.32)"/>
  <circle cx="540" cy="382" r="66" fill="rgba(244,244,246,0.10)" stroke="rgba(244,244,246,0.18)"/>
  <path d="M420 590 C455 510 625 510 660 590 Z" fill="rgba(244,244,246,0.10)" stroke="rgba(244,244,246,0.18)"/>
  ${textBlock(episode.title, 104, 760, { size: 64, maxChars: 10, lineHeight: 86, fill: BRAND.text, weight: 800 })}
  <rect x="104" y="1012" width="872" height="2" fill="rgba(212,168,83,0.28)"/>
  <text x="104" y="1100" fill="${BRAND.gold2}" font-size="32" font-weight="700" font-family="Noto Serif SC, serif">场景</text>
  ${textBlock(episode.scene, 104, 1160, { size: 38, maxChars: 18, lineHeight: 58, fill: BRAND.muted, weight: 500 })}
  <text x="104" y="1350" fill="${BRAND.gold2}" font-size="32" font-weight="700" font-family="Noto Serif SC, serif">口播</text>
  ${textBlock(episode.script, 104, 1410, { size: 36, maxChars: 20, lineHeight: 54, fill: BRAND.muted, weight: 500 })}
  <rect x="104" y="1660" width="872" height="96" rx="18" fill="rgba(212,168,83,0.1)" stroke="rgba(212,168,83,0.24)"/>
  <text x="540" y="1720" fill="${BRAND.gold2}" font-size="28" font-weight="700" text-anchor="middle" font-family="Noto Serif SC, serif">AI 数字人口播 · 心理学教育内容</text>
</svg>`;
}

function writeAsset(relativePath, svg) {
  const svgPath = join(OUT_DIR, relativePath);
  mkdirSync(dirname(svgPath), { recursive: true });
  writeFileSync(svgPath, svg, 'utf8');

  const pngPath = svgPath.replace(/\.svg$/, '.png');
  const result = spawnSync('rsvg-convert', ['-f', 'png', '-o', pngPath, svgPath], { encoding: 'utf8' });
  if (result.status !== 0) {
    console.warn(`PNG conversion failed for ${relativePath}: ${result.stderr || result.stdout}`);
    return { svg: `/marketing/${relativePath}` };
  }
  return { svg: `/marketing/${relativePath}`, png: `/marketing/${relativePath.replace(/\.svg$/, '.png')}` };
}

const manifest = {
  generatedAt: new Date().toISOString(),
  xhs: [],
  douyin: [],
  digitalHuman: [],
};

for (const post of xhsPosts) {
  const cover = writeAsset(`xhs/${post.id}-cover.svg`, xhsCover(post));
  const cards = post.cards.map((card, index) => writeAsset(`xhs/${post.id}-card${index + 1}.svg`, xhsCard(post, card, index + 1)));
  manifest.xhs.push({ id: post.id, day: post.day, title: post.title, cover, cards });
}

for (const video of douyinVideos) {
  manifest.douyin.push({
    id: video.id,
    title: video.title,
    storyboard: writeAsset(`douyin/${video.id}-storyboard.svg`, douyinStoryboard(video)),
  });
}

for (const episode of digitalHumanEpisodes) {
  manifest.digitalHuman.push({
    id: episode.id,
    episode: episode.episode,
    title: episode.title,
    storyboard: writeAsset(`digital-human/${episode.id}-storyboard.svg`, digitalHumanStoryboard(episode)),
  });
}

writeFileSync(join(OUT_DIR, 'asset-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`Generated ${manifest.xhs.length} XHS posts, ${manifest.douyin.length} Douyin storyboards, ${manifest.digitalHuman.length} digital human storyboards.`);
console.log(`Output: ${OUT_DIR}`);
