// 游戏进度 localStorage 存储层 — 不依赖后端

interface GameKey {
  floor: number;
  name: string;
  type: string;
}

interface GameProgress {
  current_floor: number;
  keys_collected: GameKey[];
  title_earned: string;
}

const STORAGE_KEY = 'dreamlab_spirited_progress';

const DEFAULT_PROGRESS: GameProgress = {
  current_floor: 1,
  keys_collected: [],
  title_earned: '',
};

export function getProgress(): GameProgress {
  if (typeof window === 'undefined') return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    return JSON.parse(raw);
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(p: GameProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function advanceFloor(floor: number): void {
  const p = getProgress();
  if (floor > p.current_floor) {
    p.current_floor = floor;
  }
  saveProgress(p);
}

export function forgetName(): void {
  const p = getProgress();
  p.title_earned = '名字被遗忘者';
  saveProgress(p);
}

export function collectKey(key: GameKey): void {
  const p = getProgress();
  if (!p.keys_collected.some(k => k.floor === key.floor)) {
    p.keys_collected.push(key);
  }
  saveProgress(p);
}

export function setTitle(title: string): void {
  const p = getProgress();
  p.title_earned = title;
  saveProgress(p);
}
