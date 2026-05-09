import Link from 'next/link';
import coursesData from '@/../public/data/courses.json';

const CATEGORY_GROUPS: Record<string, { label: string; icon: string; color: string; subtitle: string }> = {
  // 梦学基石
  freud: { label: '弗洛伊德学派', icon: '🛋️', color: '#d4a853', subtitle: '精神分析与梦的解析' },
  jung: { label: '荣格学派', icon: '🔮', color: '#8b7cf6', subtitle: '分析心理学与集体无意识' },
  modern: { label: '现代睡眠科学', icon: '🧠', color: '#4f9db8', subtitle: '神经科学与睡眠研究' },
  eastern: { label: '东方解梦', icon: '🏮', color: '#ef7d57', subtitle: '周公、佛道与东方智慧' },
  // 系统理论
  economics: { label: '康波周期', icon: '📈', color: '#d75f5f', subtitle: '经济长波与集体意识' },
  personality: { label: '人格心理学', icon: '🎭', color: '#a78bfa', subtitle: '认识你自己' },
  evolutionary: { label: '进化心理学', icon: '🧬', color: '#34d399', subtitle: '心灵的远古根源' },
  developmental: { label: '发展心理学', icon: '🌱', color: '#fbbf24', subtitle: '一生的成长旅程' },
  social: { label: '社会心理学', icon: '👥', color: '#60a5fa', subtitle: '情境的力量' },
  behaviorism: { label: '行为主义', icon: '🔄', color: '#f472b6', subtitle: '条件反射与行为改变' },
  gestalt: { label: '格式塔心理学', icon: '🔲', color: '#c084fc', subtitle: '整体大于部分之和' },
  existential: { label: '存在主义', icon: '🌌', color: '#94a3b8', subtitle: '自由、意义与死亡' },
  // 临床与应用
  cbt: { label: '认知行为疗法', icon: '💡', color: '#38bdf8', subtitle: '重塑思维模式' },
  positive: { label: '积极心理学', icon: '☀️', color: '#facc15', subtitle: '幸福科学入门' },
  mindfulness: { label: '正念冥想', icon: '🧘', color: '#4ade80', subtitle: '觉知的艺术' },
  attachment: { label: '依恋理论', icon: '💞', color: '#fb7185', subtitle: '亲密关系中的自我' },
  humanistic: { label: '人本主义', icon: '🤝', color: '#2dd4bf', subtitle: '成为一个人的旅程' },
  abnormal: { label: '异常心理学', icon: '🔍', color: '#e879f9', subtitle: '理解心理障碍' },
  trauma: { label: '创伤心理学', icon: '💔', color: '#f87171', subtitle: '创伤与修复' },
  health: { label: '健康心理学', icon: '💪', color: '#86efac', subtitle: '身心连接的科学' },
  // 专项
  neuropsychology: { label: '神经心理学', icon: '⚡', color: '#818cf8', subtitle: '大脑如何创造心灵' },
  emotion: { label: '情绪心理学', icon: '😊', color: '#fbbf24', subtitle: '喜怒哀乐的科学' },
  educational: { label: '教育心理学', icon: '📚', color: '#a3e635', subtitle: '如何有效学习' },
  child: { label: '儿童心理学', icon: '👶', color: '#fdba74', subtitle: '理解小小心灵' },
  love: { label: '爱情心理学', icon: '💝', color: '#f43f5e', subtitle: '亲密关系的科学' },
  creativity: { label: '创造性心理学', icon: '🎨', color: '#c084fc', subtitle: '灵感从哪里来' },
  forensic: { label: '犯罪心理学', icon: '🔪', color: '#64748b', subtitle: '黑暗中的心灵' },
  consumer: { label: '消费心理学', icon: '🛒', color: '#f59e0b', subtitle: '我们为什么购买' },
  thanatology: { label: '临终心理学', icon: '🕯️', color: '#9ca3af', subtitle: '生命的最后一课' },
  sports: { label: '运动心理学', icon: '🏃', color: '#22d3ee', subtitle: '巅峰状态的心理秘密' },
  // New dream-science
  'dream-science': { label: '梦的科学', icon: '💤', color: '#7c3aed', subtitle: '梦境探索前沿' },
  // New systems
  systems: { label: '系统理论', icon: '📊', color: '#0891b2', subtitle: '心理学理论体系' },
  // New clinical
  clinical: { label: '临床与应用', icon: '🏥', color: '#059669', subtitle: '心理治疗实践' },
  // New neuroscience
  neuroscience: { label: '神经科学', icon: '🔬', color: '#4f46e5', subtitle: '大脑与心智前沿' },
  // New applied
  applied: { label: '应用心理学', icon: '🎯', color: '#ea580c', subtitle: '心理学实战应用' },
  // New frontier
  frontier: { label: '前沿交叉', icon: '🚀', color: '#db2777', subtitle: '心理学未来探索' },
};

const DIFFICULTY_MAP: Record<string, { label: string; color: string }> = {
  beginner: { label: '入门', color: '#a1a1aa' },
  intermediate: { label: '进阶', color: '#d4a853' },
  advanced: { label: '高级', color: '#c4554d' },
};

// School groups for organization
const SCHOOLS = [
  { name: '梦学基石', icon: '🌙', categories: ['freud', 'jung', 'modern', 'eastern', 'dream-science'] },
  { name: '系统理论', icon: '📖', categories: ['economics', 'personality', 'evolutionary', 'developmental', 'social', 'behaviorism', 'gestalt', 'existential', 'systems'] },
  { name: '临床与应用', icon: '💊', categories: ['cbt', 'positive', 'mindfulness', 'attachment', 'humanistic', 'abnormal', 'trauma', 'health', 'clinical'] },
  { name: '神经科学与认知', icon: '🧠', categories: ['neuropsychology', 'emotion', 'neuroscience', 'creativity', 'educational', 'child'] },
  { name: '应用与实践', icon: '🔧', categories: ['love', 'forensic', 'consumer', 'sports', 'thanatology', 'applied'] },
  { name: '前沿与交叉', icon: '🚀', categories: ['frontier'] },
];

export default async function CoursesPage() {
  const courses = coursesData as any[];
  const chapters = courses.reduce((sum, c) => sum + (c.chapter_count || 0), 0);

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <div className="relative z-10">
        {/* Hero */}
        <section className="px-5 md:px-6 pt-16 md:pt-24 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.2em] mb-5" style={{ color: '#d4a853' }}>DREAMLAB 课程体系</p>
              <h1 className="font-bold mb-5" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(38px, 7vw, 76px)', lineHeight: 1.08, color: '#f4f4f6' }}>
                100门心理学课程
              </h1>
              <p className="text-base md:text-lg leading-8 max-w-2xl" style={{ color: '#a1a1aa' }}>
                从弗洛伊德到AI心理学，从梦的解析到太空心理学——7大学院、100门系统课程，
                每门课程采用「案例引入 · 理论阐释 · 反思与启发」三段式结构，帮你构建完整的心理学知识体系。
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-10">
              {[
                { value: '100', label: '系统课程' },
                { value: '7', label: '学院分类' },
                { value: String(chapters), label: '课程章节' },
                { value: '102万', label: '总字数' },
              ].map((item) => (
                <div key={item.label} className="p-5" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                  <div className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d4a853' }}>{item.value}</div>
                  <div className="text-xs mt-1" style={{ color: '#71717a' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools overview */}
        <section className="px-5 md:px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SCHOOLS.map((school) => {
                const schoolCourses = courses.filter((c: any) => school.categories.includes(c.category));
                return (
                  <div key={school.name} className="p-5" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                    <div className="text-2xl mb-2">{school.icon}</div>
                    <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{school.name}</h3>
                    <p className="text-xs" style={{ color: '#71717a' }}>{schoolCourses.length} 门课程</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Course grid by school */}
        {SCHOOLS.map((school) => {
          const schoolCourses = courses.filter((c: any) => school.categories.includes(c.category));
          if (schoolCourses.length === 0) return null;

          // Group within school by category
          const catsInSchool = [...new Set(schoolCourses.map((c: any) => c.category))];

          return catsInSchool.map((cat) => {
            const catCourses = schoolCourses.filter((c: any) => c.category === cat);
            const catInfo = CATEGORY_GROUPS[cat] || { label: cat, icon: '📝', color: '#d4a853', subtitle: '' };

            return (
              <section key={cat} className="px-5 md:px-6 pb-14">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-end justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{catInfo.icon}</span>
                        <h2 className="text-xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{catInfo.label}</h2>
                        <span className="text-xs px-2 py-0.5" style={{ color: catInfo.color, border: `1px solid ${catInfo.color}33`, borderRadius: 999 }}>{catCourses.length}门</span>
                      </div>
                      <p className="text-xs" style={{ color: '#71717a' }}>{catInfo.subtitle}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {catCourses.map((course: any) => {
                      const difficulty = DIFFICULTY_MAP[course.difficulty] || DIFFICULTY_MAP.beginner;
                      return (
                        <Link
                          key={course.id}
                          href={`/courses/${course.id}`}
                          className="group block p-5 transition-all duration-300 hover:translate-y-[-2px]"
                          style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 flex items-center justify-center text-sm font-bold shrink-0"
                              style={{ border: `1px solid ${catInfo.color}55`, color: catInfo.color, borderRadius: 8, background: `${catInfo.color}12` }}>
                              {course.id}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm font-bold leading-5 group-hover:text-[#f4f4f6]" style={{ color: '#d7d7dc' }}>{course.title}</h3>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                <span className="text-[11px] px-2 py-0.5" style={{ color: difficulty.color, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999 }}>{difficulty.label}</span>
                                <span className="text-[11px] px-2 py-0.5" style={{ color: '#71717a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999 }}>{course.chapter_count}章</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs leading-5" style={{ color: '#85858e' }}>{course.description}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          });
        })}
      </div>
    </div>
  );
}
