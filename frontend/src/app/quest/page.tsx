import Link from 'next/link';
import GrowthQuestMap from '@/components/GrowthQuestMap';
import { QUEST_DESIGN_NOTES, QUEST_PROFILE } from '@/lib/growth-quest';

export default function QuestPage() {
  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <section className="px-5 md:px-8 pt-20 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.86fr_1.14fr] gap-14 xl:gap-20 items-end">
          <div>
            <h1
              className="font-bold mb-7"
              style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'var(--hero-lg)', lineHeight: 1.04, color: '#f4f4f6', letterSpacing: 0 }}
            >
              成长像一场游戏
            </h1>
            <p className="text-lg md:text-xl leading-10 mb-10 max-w-2xl" style={{ color: '#a1a1aa' }}>
              但奖励不是虚拟分数，而是更清晰的自我、更稳定的情绪、更能复盘的行动。
              DreamLab 把心理成长拆成任务、地图、能力树和徽章，让用户愿意持续走下去。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/assessments" className="btn btn-primary" style={{ padding: '17px 34px' }}>
                开始第一关 →
              </Link>
              <Link href="/journey" className="btn btn-ghost" style={{ padding: '17px 34px' }}>
                查看闭环逻辑
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: `Lv.${QUEST_PROFILE.level}`, label: QUEST_PROFILE.title },
              { value: String(QUEST_PROFILE.streakDays), label: '连续天数' },
              { value: `${QUEST_PROFILE.completionRate}%`, label: '本周完成率' },
              { value: QUEST_PROFILE.currentAct, label: '当前章节' },
            ].map((item) => (
              <div key={item.label} className="p-5 md:p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d4a853' }}>{item.value}</div>
                <div className="text-[11px] mt-2" style={{ color: '#71717a' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-12 md:py-16">
        <div className="max-w-[1180px] mx-auto">
          <GrowthQuestMap />
        </div>
      </section>

      <section className="px-5 md:px-8 pt-20 md:pt-24 pb-32 md:pb-40">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>设计原则</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {QUEST_DESIGN_NOTES.map((note, index) => (
              <div key={note} className="p-7" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-sm mb-4" style={{ color: '#d4a853' }}>0{index + 1}</div>
                <p className="text-sm leading-8" style={{ color: '#a1a1aa' }}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
