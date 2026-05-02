import { getDreams, getReflections } from '@/lib/api';

export default async function ProfilePage() {
  const [dreams, reflections] = await Promise.all([
    getDreams(),
    getReflections(),
  ]);

  const totalDreams = dreams.length;
  const totalReflections = reflections.length;
  const avgMood = reflections.length > 0
    ? Math.round(reflections.reduce((sum: number, r: any) => sum + (r.mood_score || 5), 0) / reflections.length)
    : 0;

  // Emotion distribution
  const emotionCounts: Record<string, number> = {};
  dreams.forEach((d: any) => {
    (d.emotions || []).forEach((e: string) => {
      emotionCounts[e] = (emotionCounts[e] || 0) + 1;
    });
  });
  const sortedEmotions = Object.entries(emotionCounts)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 8);
  const maxCount = sortedEmotions.length > 0 ? Math.max(...sortedEmotions.map((e) => e[1] as number)) : 1;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9B7ED8] to-[#FF8A7A] flex items-center justify-center text-3xl mx-auto mb-4">
          🌙
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Dreamer</h1>
        <p className="text-[#B0B0C0]">你的梦境探索之旅</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { value: totalDreams, label: '记录梦境', icon: '🌙', color: 'from-[#9B7ED8]/20' },
          { value: totalReflections, label: '反思记录', icon: '🌱', color: 'from-[#00d2ff]/20' },
          { value: avgMood, label: '平均心情', icon: '💫', color: 'from-[#e94560]/20' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <span className="text-3xl font-bold gradient-text block">{stat.value}</span>
            <span className="text-xs text-[#B0B0C0] mt-1 block">{stat.label}</span>
          </div>
        ))}
      </div>

      {sortedEmotions.length > 0 && (
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold mb-4">😶 梦境情绪分布</h3>
          <div className="space-y-3">
            {sortedEmotions.map(([emotion, count]) => (
              <div key={emotion} className="flex items-center gap-3">
                <span className="text-sm text-[#B0B0C0] w-16 text-right flex-shrink-0">{emotion}</span>
                <div className="flex-1 h-6 bg-[#ffffff]/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#9B7ED8] to-[#FF8A7A] rounded-full transition-all duration-1000"
                    style={{ width: `${(Number(count) / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-[var(--accent-purple)] font-medium w-8">{String(count)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="glass-card p-6">
        <h3 className="text-white font-bold mb-4">📋 最近活动</h3>
        {totalDreams === 0 && totalReflections === 0 ? (
          <p className="text-center text-[#B0B0C0] py-8">还没有任何记录，开始你的探索之旅吧！</p>
        ) : (
          <div className="space-y-2">
            {dreams.slice(0, 5).map((d: any) => (
              <div key={`d-${d.id}`} className="flex items-center gap-3 py-2 text-sm">
                <span>🌙</span>
                <span className="text-[#B0B0C0] flex-shrink-0">
                  {new Date(d.created_at).toLocaleDateString('zh-CN')}
                </span>
                <span className="text-white truncate">记录了梦境「{d.title}」</span>
              </div>
            ))}
            {reflections.slice(0, 5).map((r: any) => (
              <div key={`r-${r.id}`} className="flex items-center gap-3 py-2 text-sm">
                <span>✍️</span>
                <span className="text-[#B0B0C0] flex-shrink-0">
                  {new Date(r.created_at).toLocaleDateString('zh-CN')}
                </span>
                <span className="text-white truncate">写了反思「{r.title}」</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
