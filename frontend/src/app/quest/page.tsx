import Link from 'next/link';
import GrowthQuestMap from '@/components/GrowthQuestMap';
import { QUEST_DESIGN_NOTES, QUEST_PROFILE } from '@/lib/growth-quest';

export default function QuestPage() {
  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <section className="px-5 md:px-10 pt-28 md:pt-48 pb-24 md:pb-36">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-20 xl:gap-32 items-end">
          <div>
            <h1
              className="font-bold mb-7"
              style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'var(--hero-lg)', lineHeight: 1.04, color: '#f4f4f6', letterSpacing: 0 }}
            >
              成长像一场游戏
            </h1>
            <p className="text-lg md:text-xl leading-[2.05] mb-14 max-w-3xl" style={{ color: '#a1a1aa' }}>
              但奖励不是虚拟分数，而是更清晰的自我、更稳定的情绪、更能复盘的行动。
              DreamLab 把心理成长拆成任务、地图、能力树和徽章，让用户愿意持续走下去。
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/assessments" className="btn btn-primary" style={{ padding: '18px 38px' }}>
                开始第一关 →
              </Link>
              <Link href="/journey" className="btn btn-ghost" style={{ padding: '18px 38px' }}>
                查看闭环逻辑
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {[
              { value: `Lv.${QUEST_PROFILE.level}`, label: QUEST_PROFILE.title },
              { value: String(QUEST_PROFILE.streakDays), label: '连续天数' },
              { value: `${QUEST_PROFILE.completionRate}%`, label: '本周完成率' },
              { value: QUEST_PROFILE.currentAct, label: '当前章节' },
            ].map((item) => (
              <div key={item.label} className={`p-7 md:p-8 ${item.label === '当前章节' ? 'col-span-2 md:col-span-1' : ''}`} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className={item.label === '当前章节' ? 'text-xl md:text-2xl font-bold leading-8' : 'text-2xl md:text-3xl font-bold'} style={{ fontFamily: "'Noto Serif SC', serif", color: '#d4a853' }}>{item.value}</div>
                <div className="text-[11px] mt-2" style={{ color: '#71717a' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-24 md:py-36">
        <div className="max-w-[1280px] mx-auto">
          <GrowthQuestMap />
        </div>
      </section>

      <section className="px-5 md:px-10 pt-28 md:pt-40 pb-40 md:pb-56">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4 mb-20 md:mb-24">
            <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.2)' }} />
            <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>设计原则</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-10">
            {QUEST_DESIGN_NOTES.map((note, index) => (
              <div key={note} className="p-8 md:p-10" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <div className="text-sm mb-5" style={{ color: '#d4a853' }}>0{index + 1}</div>
                <p className="text-sm leading-9" style={{ color: '#a1a1aa' }}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
