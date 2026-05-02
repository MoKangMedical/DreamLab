// 客户端 API 封装 + 静态导出 Mock 数据层
const API_BASE = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '') : '';

// 静态导出时的 Mock 数据（构建阶段使用）
const MOCK_COURSES = [
  { id: 1, title: '弗洛伊德：梦的解析入门', description: '从《梦的解析》出发，系统学习弗洛伊德精神分析解梦方法', category: 'freud', difficulty: 'beginner', content: [] },
  { id: 2, title: '荣格分析心理学与梦', description: '探索集体无意识、原型与梦的象征意义', category: 'jung', difficulty: 'intermediate', content: [] },
  { id: 3, title: '现代睡眠科学与梦境研究', description: '从神经科学角度理解睡眠阶段与梦境产生机制', category: 'modern', difficulty: 'intermediate', content: [] },
  { id: 4, title: '东方解梦文化探秘', description: '周易、周公解梦与东方文化中的梦学智慧', category: 'eastern', difficulty: 'beginner', content: [] },
];

const MOCK_DREAMS: any[] = [];
const MOCK_REFLECTIONS: any[] = [];

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  if (typeof window === 'undefined') {
    // SSR / 构建阶段：返回 mock 数据
    if (endpoint.startsWith('/api/courses') && !endpoint.includes('/')) {
      return MOCK_COURSES as T;
    }
    if (endpoint.match(/\/api\/courses\/\d+/)) {
      const id = Number(endpoint.split('/').pop()?.split('?')[0]);
      return (MOCK_COURSES.find(c => c.id === id) || null) as T;
    }
    if (endpoint.startsWith('/api/dreams')) return [] as T;
    if (endpoint.startsWith('/api/reflections')) return [] as T;
    if (endpoint.startsWith('/api/users')) return [] as T;
    return {} as T;
  }
  // 浏览器环境：正常调后端
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

// Users
export const getUsers = () => request<any[]>('/api/users');
export const createUser = (data: { username: string; email: string }) =>
  request<any>('/api/users', { method: 'POST', body: JSON.stringify(data) });

// Courses
export const getCourses = async (category?: string) => {
  if (typeof window === 'undefined') {
    // 构建阶段直接返回 mock
    const list = category ? MOCK_COURSES.filter(c => c.category === category) : MOCK_COURSES;
    return list as any;
  }
  return request<any[]>('/api/courses' + (category ? `?category=${category}` : ''));
};
export const getCourse = async (id: number) => {
  if (typeof window === 'undefined') {
    return MOCK_COURSES.find(c => c.id === id) || null as any;
  }
  return request<any>(`/api/courses/${id}`);
};
export const getProgress = (courseId: number, userId = 1) =>
  request<any>(`/api/courses/${courseId}/progress?user_id=${userId}`);
export const updateProgress = (courseId: number, data: any) =>
  request<any>(`/api/courses/${courseId}/progress`, { method: 'POST', body: JSON.stringify(data) });

// Dreams
export const getDreams = (userId = 1) => request<any[]>('/api/dreams?user_id=' + userId);
export const getDream = (id: number) => request<any>(`/api/dreams/${id}`);
export const createDream = (data: any) =>
  request<any>('/api/dreams', { method: 'POST', body: JSON.stringify(data) });
export const analyzeDream = (id: number) =>
  request<any>(`/api/dreams/${id}/analyze`, { method: 'POST' });

// Reflections
export const getReflections = (userId = 1) => request<any[]>('/api/reflections?user_id=' + userId);
export const createReflection = (data: any) =>
  request<any>('/api/reflections', { method: 'POST', body: JSON.stringify(data) });
export const generateInsight = (reflectionId: number) =>
  request<any>(`/api/reflections/${reflectionId}/insight`, { method: 'POST' });

// ===== Spirited (千与千寻游戏) =====
export const getSpiritedProgress = async () => {
  if (typeof window === 'undefined') return { current_floor: 1, keys_collected: [], title_earned: '' };
  return request<any>('/spirited/progress');
};
export const advanceSpiritedFloor = async (floor: number) => {
  if (typeof window === 'undefined') return null;
  return request<any>(`/spirited/progress/floor/${floor}`, { method: 'POST' });
};
export const spiritedForgetName = async () => {
  if (typeof window === 'undefined') return null;
  return request<any>('/spirited/progress/forget-name', { method: 'POST' });
};
export const collectSpiritedKey = async (keyData: any) => {
  if (typeof window === 'undefined') return null;
  return request<any>('/spirited/progress/collect-key', { method: 'POST', body: JSON.stringify(keyData) });
};
export const getSpiritedDialogues = async (floor: number, npc?: string) => {
  if (typeof window === 'undefined') return [];
  const url = `/spirited/dialogues/${floor}${npc ? `?npc=${npc}` : ''}`;
  return request<any[]>(url);
};
export const seedSpiritedDialogues = async () => {
  if (typeof window === 'undefined') return null;
  return request<any>('/spirited/seed-dialogues', { method: 'POST' });
};
