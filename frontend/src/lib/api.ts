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

  // Community — mock fallback
  if (endpoint.startsWith('/api/community')) {
    const SEED = [
      { id:1, author:'小玲', title:'做完SAS测评，发现自己比想象中更焦虑', content:'一直以为自己只是\u201c想太多\u201d，做完量表才发现标准分到了58。看到\u201c轻度焦虑\u201d的结果反而松了口气——原来这不是我的错。', category:'mood', likes:12, is_pinned:false, comment_count:2, comments:[{id:1,author:'锅炉爷爷',content:'焦虑不是缺陷，是身体在提醒你。锅炉房的火大一些没关系。'},{id:2,author:'无脸男',content:'......嗯。（默默递给你一杯热茶）'}] },
      { id:2, author:'千寻', title:'连续7天记录梦境，发现了惊人的模式', content:'反复出现\u201c被追赶\u201d和\u201c找不到路\u201d的主题。弗洛伊德说这些可能和安全感的缺失有关。', category:'dream', likes:8, is_pinned:false, comment_count:1, comments:[{id:1,author:'白龙',content:'被追赶的梦往往与现实中逃避的问题有关。转过身，看看追赶你的是什么。'}] },
      { id:3, author:'坊宝宝', title:'学到荣格\u201c阴影\u201d概念，整个人都不好了——但是好的那种', content:'之前不能接受自己会嫉妒朋友的成功。荣格说阴影不是敌人，承认之后反而轻松了。', category:'growth', likes:15, is_pinned:false, comment_count:1, comments:[{id:1,author:'钱婆婆',content:'能承认阴影的人，已经比大多数人勇敢了。'}] },
      { id:4, author:'煤煤虫', title:'失眠三周，4-7-8呼吸法让我昨晚睡了6小时', content:'之前觉得呼吸法太简单不可能有用，但昨晚真的在第三轮就睡着了。建议大家都试试。', category:'help', likes:20, is_pinned:false, comment_count:2, comments:[{id:1,author:'锅炉爷爷',content:'睡前泡个热水澡。最好的安眠药就是热水。'},{id:2,author:'小玲',content:'我也是！试了三天，第一天没用，第二天只睡了4小时，第三天突然就睡着了。坚持很重要。'}] },
      { id:5, author:'白龙', title:'关于\u201c正念\u201d这件事，我有个秘密想分享', content:'以前觉得正念冥想是玄学。但连续两周每天10分钟身体扫描后，注意力的改善是实实在在的。', category:'growth', likes:18, is_pinned:false, comment_count:2, comments:[{id:1,author:'千寻',content:'能分享一下你用的引导音频吗？'},{id:2,author:'白龙',content:'油屋知识库里有一篇讲正念神经科学的文章，里面有引导音频链接。'}] },
      { id:6, author:'河神', title:'分享一个对抗负面自我对话的技巧', content:'每次脑子里出现\u201c我什么都做不好\u201d的时候，我问自己：如果最好的朋友对我说这句话，我会怎么回应？然后把这个回应写给自己。', category:'mood', likes:25, is_pinned:false, comment_count:3, comments:[{id:1,author:'钱婆婆',content:'这个方法在CBT里叫\u201c苏格拉底式提问\u201d。能自己发明出来，你很了不起。'},{id:2,author:'坊宝宝',content:'试了一下，眼泪出来了。但也确实有用。'},{id:3,author:'锅炉爷爷',content:'好方法。记住，你不只是那个说狠话的人，你也是那个会安慰朋友的人。'}] },
      { id:7, author:'小玲', title:'昨晚梦到自己在油屋打工，醒来后想明白了工作上的焦虑', content:'梦里的汤婆婆一直在给我加工作。醒来后意识到现实中我给自己加了太多不必要的压力。', category:'dream', likes:14, is_pinned:false, comment_count:1, comments:[{id:1,author:'无脸男',content:'......（在纸上写了一个\u201c减\u201d字）'}] },
    ];
    // Like endpoint
    if (endpoint.includes('/like')) return { post_id: 0, likes: 0 } as T;
    // Comment endpoint
    if (endpoint.includes('/comments') && endpoint.includes('POST')) return { id: Date.now() } as T;
    // Filter by category
    const url = new URL(`http://localhost${endpoint}`);
    const cat = url.searchParams.get('category');
    let filtered = SEED;
    if (cat) filtered = SEED.filter((p: any) => p.category === cat);
    return { total: filtered.length, items: filtered } as T;
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

// Community
export const getCommunityPosts = async (category?: string) => {
  const query = category ? `?category=${category}` : '';
  return request<any>(`/api/community/posts${query}`);
};
export const createCommunityPost = async (data: { author: string; title: string; content: string; category: string }) => {
  return request<any>('/api/community/posts', { method: 'POST', body: JSON.stringify(data) });
};
export const likeCommunityPost = async (postId: number) => {
  return request<any>(`/api/community/posts/${postId}/like`, { method: 'POST' });
};
export const addCommunityComment = async (postId: number, data: { author: string; content: string }) => {
  return request<any>(`/api/community/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify(data) });
};
