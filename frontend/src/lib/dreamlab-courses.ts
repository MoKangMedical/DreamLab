import rawCourses from '@/../public/data/courses.json';

export interface DreamLabChapter {
  title: string;
  content: string;
  body: string;
  order: number;
}

export interface DreamLabCourse {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  phaseKey: string;
  phaseIndex: number;
  phaseTitle: string;
  phaseIcon: string;
  minutes: number;
  tags: string[];
  outcome: string;
  content: DreamLabChapter[];
  chapters: DreamLabChapter[];
  chapter_count: number;
}

interface RawCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  chapter_count: number;
  content: Array<{ title: string; body: string; order?: number }>;
}

interface AcademyBlueprint {
  key: string;
  title: string;
  icon: string;
  subtitle: string;
  color: string;
  categories: string[];
}

export const DREAMLAB_CATEGORIES: Record<string, { label: string; icon: string; color: string }> = {
  freud: { label: '弗洛伊德学派', icon: '弗', color: '#d4a853' },
  jung: { label: '荣格学派', icon: '荣', color: '#8b7cf6' },
  modern: { label: '睡眠科学', icon: '眠', color: '#4f9db8' },
  eastern: { label: '东方梦学', icon: '易', color: '#ef7d57' },
  'dream-science': { label: '梦的科学', icon: '梦', color: '#7c3aed' },
  systems: { label: '系统理论', icon: '理', color: '#0891b2' },
  personality: { label: '人格心理学', icon: '格', color: '#a78bfa' },
  evolutionary: { label: '进化心理学', icon: '演', color: '#34d399' },
  developmental: { label: '发展心理学', icon: '生', color: '#fbbf24' },
  social: { label: '社会心理学', icon: '群', color: '#60a5fa' },
  behaviorism: { label: '行为主义', icon: '行', color: '#f472b6' },
  gestalt: { label: '格式塔', icon: '整', color: '#c084fc' },
  existential: { label: '存在主义', icon: '存', color: '#94a3b8' },
  cbt: { label: '认知行为疗法', icon: '认', color: '#38bdf8' },
  clinical: { label: '临床应用', icon: '疗', color: '#059669' },
  abnormal: { label: '异常心理学', icon: '异', color: '#e879f9' },
  trauma: { label: '创伤心理学', icon: '创', color: '#f87171' },
  positive: { label: '积极心理学', icon: '幸', color: '#facc15' },
  mindfulness: { label: '正念冥想', icon: '念', color: '#4ade80' },
  attachment: { label: '依恋理论', icon: '恋', color: '#fb7185' },
  humanistic: { label: '人本主义', icon: '人', color: '#2dd4bf' },
  health: { label: '健康心理学', icon: '健', color: '#86efac' },
  emotion: { label: '情绪心理学', icon: '情', color: '#fbbf24' },
  neuropsychology: { label: '神经心理学', icon: '脑', color: '#818cf8' },
  neuroscience: { label: '神经科学', icon: '神', color: '#4f46e5' },
  creativity: { label: '创造心理学', icon: '创', color: '#c084fc' },
  educational: { label: '教育心理学', icon: '学', color: '#a3e635' },
  child: { label: '儿童心理学', icon: '童', color: '#fdba74' },
  love: { label: '爱情心理学', icon: '爱', color: '#f43f5e' },
  forensic: { label: '犯罪心理学', icon: '察', color: '#64748b' },
  consumer: { label: '消费心理学', icon: '购', color: '#f59e0b' },
  sports: { label: '运动心理学', icon: '动', color: '#22d3ee' },
  thanatology: { label: '临终心理学', icon: '终', color: '#9ca3af' },
  applied: { label: '应用心理学', icon: '用', color: '#ea580c' },
  frontier: { label: '前沿交叉', icon: '新', color: '#db2777' },
};

const ACADEMIES: AcademyBlueprint[] = [
  {
    key: 'dream-academy',
    title: '梦境解析学院',
    icon: '01',
    subtitle: '精神分析、荣格、睡眠科学、东方梦学与梦境研究前沿',
    color: '#d4a853',
    categories: ['freud', 'jung', 'modern', 'eastern', 'dream-science'],
  },
  {
    key: 'theory-academy',
    title: '心理理论学院',
    icon: '02',
    subtitle: '人格、发展、社会、行为、格式塔、存在主义与系统理论',
    color: '#8b7cf6',
    categories: ['systems', 'personality', 'evolutionary', 'developmental', 'social', 'behaviorism', 'gestalt', 'existential'],
  },
  {
    key: 'clinical-academy',
    title: '心理疗法学院',
    icon: '03',
    subtitle: 'CBT、临床应用、异常心理、创伤理解与修复路径',
    color: '#5da38f',
    categories: ['cbt', 'clinical', 'abnormal', 'trauma'],
  },
  {
    key: 'wellbeing-academy',
    title: '心智健康学院',
    icon: '04',
    subtitle: '积极心理、正念、依恋、人本主义、健康与情绪调节',
    color: '#ef7d57',
    categories: ['positive', 'mindfulness', 'attachment', 'humanistic', 'health', 'emotion'],
  },
  {
    key: 'cognitive-academy',
    title: '神经认知学院',
    icon: '05',
    subtitle: '大脑、神经科学、创造、教育与儿童心理发展',
    color: '#4f9db8',
    categories: ['neuropsychology', 'neuroscience', 'creativity', 'educational', 'child'],
  },
  {
    key: 'applied-academy',
    title: '生活应用学院',
    icon: '06',
    subtitle: '亲密关系、消费、运动、司法、临终与生活场景应用',
    color: '#c4554d',
    categories: ['love', 'forensic', 'consumer', 'sports', 'thanatology', 'applied'],
  },
  {
    key: 'frontier-academy',
    title: '前沿交叉学院',
    icon: '07',
    subtitle: 'AI、数字疗法、跨文化、组织与未来心理学议题',
    color: '#b879c8',
    categories: ['frontier'],
  },
];

const raw = rawCourses as RawCourse[];

function getAcademy(category: string) {
  return ACADEMIES.find((academy) => academy.categories.includes(category)) || ACADEMIES[1];
}

function getMinutes(chapters: DreamLabChapter[]) {
  const words = chapters.reduce((sum, chapter) => sum + chapter.body.length, 0);
  return Math.max(20, Math.round(words / 420));
}

export const DREAMLAB_PHASES = ACADEMIES.map((academy, index) => {
  const courseIds = raw.filter((course) => academy.categories.includes(course.category)).map((course) => course.id);
  return {
    key: academy.key,
    title: academy.title,
    icon: academy.icon,
    subtitle: academy.subtitle,
    color: academy.color,
    index: index + 1,
    courseIds,
    courseCount: courseIds.length,
  };
});

export const DREAMLAB_COURSES: DreamLabCourse[] = raw.map((course) => {
  const academy = getAcademy(course.category);
  const phaseIndex = ACADEMIES.findIndex((item) => item.key === academy.key) + 1;
  const chapters = course.content.map((chapter, index) => ({
    title: chapter.title,
    content: chapter.body,
    body: chapter.body,
    order: chapter.order || index + 1,
  }));

  return {
    id: course.id,
    title: course.title,
    category: course.category,
    difficulty: course.difficulty,
    description: course.description,
    phaseKey: academy.key,
    phaseIndex,
    phaseTitle: academy.title,
    phaseIcon: academy.icon,
    minutes: getMinutes(chapters),
    tags: [DREAMLAB_CATEGORIES[course.category]?.label || course.category, academy.title],
    outcome: `完成「${course.title}」的案例、理论与反思记录`,
    content: chapters,
    chapters,
    chapter_count: chapters.length,
  };
});

export const MOCK_COURSES = DREAMLAB_COURSES;
