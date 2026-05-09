// 服务端数据读取 — SQLite 优先 + Mock 降级
// 仅在 Server Component 中使用
import { exec } from 'child_process';
import { promisify } from 'util';
import { KANGBO_COURSES } from './kangbo-courses';

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

const KANGBO_SERVER_COURSES: Course[] = KANGBO_COURSES.map((course) => ({
  id: course.id,
  title: course.title,
  description: course.description,
  category: course.category,
  difficulty: course.difficulty,
  content: course.chapters.map((chapter) => ({
    title: chapter.title,
    content: chapter.content,
    body: chapter.body,
    order: chapter.order,
  })),
}));

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
    if (rows.length === 0) return KANGBO_SERVER_COURSES.find(c => c.id === id) || null;
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
    return KANGBO_SERVER_COURSES.find(c => c.id === id) || null;
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
