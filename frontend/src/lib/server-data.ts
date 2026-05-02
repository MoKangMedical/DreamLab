// 仅在 Server Component 中使用，通过 sqlite3 CLI 读数据库
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

export async function getCourse(id: number): Promise<Course | null> {
  try {
    const sql = `SELECT id, title, description, category, difficulty, content FROM courses WHERE id = ${id};`;
    const escapedSql = sql.replace(/"/g, '""');
    const { stdout } = await execAsync(`sqlite3 -json "${DB_PATH}" "${escapedSql}"`);
    const rows: any[] = stdout.trim() ? JSON.parse(stdout) : [];
    if (rows.length === 0) return null;
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
    return null;
  }
}

export async function getProgress(courseId: number, userId = 1): Promise<ProgressItem[]> {
  try {
    const sql = `SELECT chapter_index, completed FROM progress WHERE course_id = ${Number(courseId)} AND user_id = ${Number(userId)};`;
    const escapedSql = sql.replace(/"/g, '""');
    const { stdout } = await execAsync(`sqlite3 -json "${DB_PATH}" "${escapedSql}"`);
    const rows: any[] = stdout.trim() ? JSON.parse(stdout) : [];
    return rows.map(r => ({ chapter_index: r.chapter_index, completed: !!r.completed }));
  } catch {
    // 表不存在或查询失败，返回空数组
    return [];
  }
}
