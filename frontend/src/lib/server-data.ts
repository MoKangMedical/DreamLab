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

// ── Mock fallback data (when DB unavailable or static export) ──
const MOCK_COURSES: Course[] = [
  { id: 1, title: '弗洛伊德：梦的解析入门', description: '从《梦的解析》出发，系统学习弗洛伊德精神分析解梦方法', category: 'freud', difficulty: 'beginner', content: [] },
  { id: 2, title: '荣格分析心理学与梦', description: '探索集体无意识、原型与梦的象征意义', category: 'jung', difficulty: 'intermediate', content: [] },
  { id: 3, title: '现代睡眠科学与梦境研究', description: '从神经科学角度理解睡眠阶段与梦境产生机制', category: 'modern', difficulty: 'intermediate', content: [] },
  { id: 4, title: '东方解梦文化探秘', description: '周易、周公解梦与东方文化中的梦学智慧', category: 'eastern', difficulty: 'beginner', content: [] },
];

// ── Safe parameter binding helper ──
// sqlite3 CLI doesn't support prepared statements, so we sanitize integers strictly
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
    // DB unavailable → fallback to mock
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
    // 表不存在或查询失败，返回空数组
    return [];
  }
}
