// 服务端数据读取 — SQLite 优先 + Mock 降级
// 仅在 Server Component 中使用
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const DB_PATH = process.env.DATABASE_PATH || '/root/.openclaw/workspace/dreamlab/data/dreamlab.db';

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  content: any[];
}

export interface ProgressItem {
  chapter_index: number;
  completed: boolean;
}

// ── Mock fallback data (30门课程，when DB unavailable or static export) ──
const MOCK_COURSES: Course[] = [
  // 梦学基石
  { id: 1, title: '弗洛伊德：梦的解析入门', description: '从《梦的解析》出发，系统学习弗洛伊德精神分析解梦方法', category: 'freud', difficulty: 'beginner', content: [] },
  { id: 2, title: '荣格分析心理学与梦', description: '探索集体无意识、原型与梦的象征意义', category: 'jung', difficulty: 'intermediate', content: [] },
  { id: 3, title: '现代睡眠科学与梦境研究', description: '从神经科学角度理解睡眠阶段与梦境产生机制', category: 'modern', difficulty: 'intermediate', content: [] },
  { id: 4, title: '东方解梦文化探秘', description: '周公解梦与东方文化中的梦学智慧', category: 'eastern', difficulty: 'beginner', content: [] },
  // 系统理论
  { id: 5, title: '康波周期与人类意识演化', description: '50-60年长波周期如何塑造集体意识', category: 'economics', difficulty: 'advanced', content: [] },
  { id: 6, title: '人格心理学：认识你自己', description: '从大五模型到MBTI，系统理解人格理论的各大流派', category: 'personality', difficulty: 'beginner', content: [] },
  { id: 7, title: '进化心理学：心灵的远古根源', description: '理解人类心理机制如何被百万年进化所塑造', category: 'evolutionary', difficulty: 'intermediate', content: [] },
  { id: 8, title: '发展心理学：一生的成长旅程', description: '从婴儿到老年，人类心理发展的完整旅程', category: 'developmental', difficulty: 'beginner', content: [] },
  { id: 9, title: '社会心理学：情境的力量', description: '从众、服从、归因——社会情境如何塑造个体行为', category: 'social', difficulty: 'intermediate', content: [] },
  { id: 10, title: '行为主义心理学：从条件反射到行为改变', description: '经典条件反射和操作性条件反射如何解释和改变行为', category: 'behaviorism', difficulty: 'beginner', content: [] },
  { id: 11, title: '格式塔心理学：整体大于部分之和', description: '知觉组织的科学——我们如何将碎片整合为整体', category: 'gestalt', difficulty: 'intermediate', content: [] },
  { id: 12, title: '存在主义心理学：自由、意义与死亡', description: '面对生命的基本焦虑，如何活出真实的人生', category: 'existential', difficulty: 'advanced', content: [] },
  // 临床与应用
  { id: 13, title: '认知行为疗法：重塑思维模式', description: '识别认知扭曲、挑战自动思维、重塑核心信念', category: 'cbt', difficulty: 'intermediate', content: [] },
  { id: 14, title: '积极心理学：幸福科学入门', description: 'PERMA模型、心流体验、感恩实践——用科学构建丰盈人生', category: 'positive', difficulty: 'beginner', content: [] },
  { id: 15, title: '正念冥想：觉知的艺术', description: '从东方禅修到fMRI验证的大脑训练术', category: 'mindfulness', difficulty: 'beginner', content: [] },
  { id: 16, title: '依恋理论：亲密关系中的自我', description: '童年依恋模式如何影响一生的亲密关系', category: 'attachment', difficulty: 'intermediate', content: [] },
  { id: 17, title: '人本主义心理学：成为一个人的旅程', description: '马斯洛需求金字塔、罗杰斯无条件积极关注', category: 'humanistic', difficulty: 'beginner', content: [] },
  { id: 18, title: '异常心理学：理解心理障碍', description: 'DSM-5框架，科学理解心境障碍与精神分裂症谱系', category: 'abnormal', difficulty: 'advanced', content: [] },
  { id: 19, title: '创伤与修复心理学', description: '创伤如何改变大脑与身体，科学证明的修复路径', category: 'trauma', difficulty: 'intermediate', content: [] },
  { id: 20, title: '健康心理学：身心连接的科学', description: '心理神经免疫学——信念和情绪如何影响身体健康', category: 'health', difficulty: 'beginner', content: [] },
  // 神经科学与专项
  { id: 21, title: '神经心理学：大脑如何创造心灵', description: '从Phineas Gage到fMRI，探索心灵的物质基础', category: 'neuropsychology', difficulty: 'advanced', content: [] },
  { id: 22, title: '情绪心理学：喜怒哀乐的科学', description: '基本情绪、情绪建构理论、情绪调节策略', category: 'emotion', difficulty: 'beginner', content: [] },
  { id: 23, title: '教育心理学：如何有效学习', description: '间隔效应、测试效应、成长型思维——真正有效的学习方法', category: 'educational', difficulty: 'beginner', content: [] },
  { id: 24, title: '儿童心理学：理解小小心灵', description: '从0到12岁，理解儿童认知与情感发展的规律', category: 'child', difficulty: 'beginner', content: [] },
  { id: 25, title: '爱情心理学：亲密关系的科学', description: '爱情三角理论、吸引力原理——用科学理解人类最深刻的情感', category: 'love', difficulty: 'beginner', content: [] },
  { id: 26, title: '创造性心理学：灵感从哪里来', description: '发散思维、心流与创造——创造力可以培养', category: 'creativity', difficulty: 'intermediate', content: [] },
  { id: 27, title: '犯罪心理学：黑暗中的心灵', description: '犯罪心理画像、精神病态——理解犯罪行为，是为了预防', category: 'forensic', difficulty: 'advanced', content: [] },
  { id: 28, title: '消费心理学：我们为什么购买', description: '锚定效应、框架效应——商家如何影响你的决策', category: 'consumer', difficulty: 'beginner', content: [] },
  { id: 29, title: '临终与死亡心理学：生命的最后一课', description: 'Kübler-Ross五个阶段、死亡焦虑——面对终点找到意义', category: 'thanatology', difficulty: 'advanced', content: [] },
  { id: 30, title: '运动心理学：巅峰状态的心理秘密', description: '心理韧性、可视化训练——顶尖运动员的大脑训练法', category: 'sports', difficulty: 'intermediate', content: [] },
];

// ── Safe parameter binding helper ──
function sanitizeInt(val: unknown): number {
  const n = Number(val);
  if (!Number.isInteger(n) || n < 0 || n > 999999) {
    throw new Error(`Invalid integer parameter: ${val}`);
  }
  return n;
}

export async function getCourse(id: number): Promise<Course | null> {
  try {
    const safeId = sanitizeInt(id);
    const sql = `SELECT id, title, description, category, difficulty, content FROM courses WHERE id = ${safeId};`;
    const escapedSql = sql.replace(/"/g, '""');
    const { stdout } = await execAsync(`sqlite3 -json "${DB_PATH}" "${escapedSql}"`);
    const rows: any[] = stdout.trim() ? JSON.parse(stdout) : [];
    if (rows.length === 0) return MOCK_COURSES.find(c => c.id === id) || null;
    const row = rows[0];
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      category: row.category,
      difficulty: row.difficulty,
      content: JSON.parse(row.content || '[]'),
    };
  } catch {
    return MOCK_COURSES.find(c => c.id === id) || null;
  }
}

export async function getProgress(courseId: number, userId = 1): Promise<ProgressItem[]> {
  try {
    const safeCourseId = sanitizeInt(courseId);
    const safeUserId = sanitizeInt(userId);
    const sql = `SELECT chapter_index, completed FROM progress WHERE course_id = ${safeCourseId} AND user_id = ${safeUserId};`;
    const escapedSql = sql.replace(/"/g, '""');
    const { stdout } = await execAsync(`sqlite3 -json "${DB_PATH}" "${escapedSql}"`);
    const rows: any[] = stdout.trim() ? JSON.parse(stdout) : [];
    return rows.map(r => ({ chapter_index: r.chapter_index, completed: !!r.completed }));
  } catch {
    return [];
  }
}
