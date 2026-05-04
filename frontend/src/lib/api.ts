// 客户端 API 封装 + Mock 降级层
// 无后端时自动降级为 Mock 数据，确保静态站点内容完整可用
import { MOCK_ASSESSMENTS } from './mock-assessments';
import { MOCK_COURSES } from './mock-courses';
import { MOCK_WELLNESS, MOCK_COMPANION_REPLIES } from './mock-data';
import { MOCK_KNOWLEDGE_CATEGORIES, MOCK_KNOWLEDGE_ARTICLES, MOCK_KNOWLEDGE_FEATURED, MOCK_QUIZ_RESULT } from './mock-knowledge';

const API_BASE = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '') : '';

// ── 统一的 request 函数：客户端无后端时自动降级 ──
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // SSR / 构建阶段：直接返回 mock 数据
  if (typeof window === 'undefined') {
    return getMockData<T>(endpoint);
  }

  // 浏览器环境：尝试调后端，失败则降级为 mock
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      ...options,
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  } catch {
    // 后端不可用 → 降级为 mock 数据
    console.warn(`[DreamLab] Backend unreachable for ${endpoint}, using mock data`);
    return getMockData<T>(endpoint);
  }
}

function getMockData<T>(endpoint: string): T {
  // Courses
  if (endpoint.startsWith('/api/courses')) {
    if (endpoint.match(/\/api\/courses\/\d+/)) {
      const id = Number(endpoint.split('/').pop()?.split('?')[0]);
      return (MOCK_COURSES.find(c => c.id === id) || null) as T;
    }
    return MOCK_COURSES as T;
  }

  // Assessments
  if (endpoint.startsWith('/api/assessments')) {
    if (endpoint.match(/\/api\/assessments\/\d+$/)) {
      const id = Number(endpoint.split('/').pop());
      return (MOCK_ASSESSMENTS.find(a => a.id === id) || null) as T;
    }
    if (endpoint.includes('/results/')) return [] as T;
    if (endpoint.includes('/submit')) {
      // Mock submit: generate a contextual interpretation based on the scale
      return {
        level: '正常范围',
        standard_score: 45,
        level_info: { color: '#d4a853', description: '你的得分在正常范围内，目前没有明显的问题信号。继续保持！' },
        interpretation: '从你的回答来看，目前的心理状态处于健康水平。生活中偶尔的焦虑和低落是正常的——重要的是你愿意倾听自己的内心。\n\n如果未来感到压力增大，记得油屋永远为你敞开。无脸男在安静地等着你。',
      } as T;
    }
    return MOCK_ASSESSMENTS as T;
  }

  // Companion chat — diverse empathetic replies
  if (endpoint.includes('/api/companion/chat')) {
    const i = Math.floor(Math.random() * MOCK_COMPANION_REPLIES.length);
    return { session_id: 1, reply: MOCK_COMPANION_REPLIES[i] } as T;
  }

  // Wellness
  if (endpoint.startsWith('/api/wellness')) return MOCK_WELLNESS as T;

  // Knowledge
  if (endpoint.startsWith('/api/knowledge')) {
    // Quiz submit
    if (endpoint.includes('/quiz/submit')) return MOCK_QUIZ_RESULT as T;
    // Categories
    if (endpoint.includes('/categories')) return MOCK_KNOWLEDGE_CATEGORIES as T;
    // Featured
    if (endpoint.includes('/featured')) return MOCK_KNOWLEDGE_FEATURED as T;
    // Article detail by slug: /api/knowledge/{slug}
    const slugMatch = endpoint.match(/\/api\/knowledge\/([a-z-]+)$/);
    if (slugMatch) {
      const article = MOCK_KNOWLEDGE_ARTICLES.find(a => a.slug === slugMatch[1]);
      if (!article) return { error: 'Article not found' } as T;
      const category = MOCK_KNOWLEDGE_CATEGORIES.find(c => c.slug === article.category_slug) || null;
      return { ...article, category, created_at: '2026-04-15T08:00:00Z' } as T;
    }
    // List with optional category filter: /api/knowledge?category=X&search=Y
    let filtered = [...MOCK_KNOWLEDGE_ARTICLES];
    const url = new URL(`http://localhost${endpoint}`);
    const cat = url.searchParams.get('category');
    const q = url.searchParams.get('search')?.toLowerCase();
    if (cat) filtered = filtered.filter(a => a.category_slug === cat);
    if (q) filtered = filtered.filter(a => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
    return { items: filtered } as T;
  }

  // Dreams, Reflections, Users — empty arrays
  if (endpoint.startsWith('/api/dreams')) return [] as T;
  if (endpoint.startsWith('/api/reflections')) return [] as T;
  if (endpoint.startsWith('/api/users')) return [] as T;

  // Spirited
  if (endpoint.includes('/spirited')) return {} as T;

  return {} as T;
}

// ── 对外导出的 API 函数 ──

// Users
export const getUsers = () => request<any[]>('/api/users');
export const createUser = (data: { username: string; email: string }) =>
  request<any>('/api/users', { method: 'POST', body: JSON.stringify(data) });

// Courses
export const getCourses = async (category?: string) => {
  const courses = await request<any[]>('/api/courses');
  if (category) return courses.filter((c: any) => c.category === category);
  return courses;
};
export const getCourse = async (id: number) => {
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

// Spirited
export const getSpiritedProgress = async () => request<any>('/spirited/progress');
export const advanceSpiritedFloor = async (floor: number) =>
  request<any>(`/spirited/progress/floor/${floor}`, { method: 'POST' });
export const spiritedForgetName = async () =>
  request<any>('/spirited/progress/forget-name', { method: 'POST' });
export const collectSpiritedKey = async (keyData: any) =>
  request<any>('/spirited/progress/collect-key', { method: 'POST', body: JSON.stringify(keyData) });
export const getSpiritedDialogues = async (floor: number, npc?: string) => {
  const url = `/spirited/dialogues/${floor}${npc ? `?npc=${npc}` : ''}`;
  return request<any[]>(url);
};
export const seedSpiritedDialogues = async () =>
  request<any>('/spirited/seed-dialogues', { method: 'POST' });

// Assessments
export const getAssessments = async () => {
  return request<any[]>('/api/assessments');
};
export const getAssessment = async (id: number) => {
  return request<any>(`/api/assessments/${id}`);
};
export const submitAssessment = async (id: number, data: { user_id: number; answers: { question_id: number; score: number }[] }) => {
  return request<any>(`/api/assessments/${id}/submit`, { method: 'POST', body: JSON.stringify(data) });
};
export const getAssessmentTrends = async (userId = 1) => {
  return request<any[]>(`/api/assessments/results/${userId}`);
};
