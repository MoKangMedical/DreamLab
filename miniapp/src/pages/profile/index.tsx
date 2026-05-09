import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const STATS = [
  { label: '梦境', value: 12, icon: '月', color: '#d4a853' },
  { label: '测评', value: 3, icon: '镜', color: '#c4554d' },
  { label: '课程', value: 8, icon: '书', color: '#5a7d9a' },
  { label: '反思', value: 7, icon: '思', color: '#3b8b7a' },
  { label: '陪伴', value: 24, icon: '伴', color: '#6b5b8a' },
  { label: '冥想', value: 5, icon: '息', color: '#3b8b7a' },
]

const MILESTONES = [
  { name: '穿越遗忘之桥', desc: '面对阴影', done: true, color: '#c4554d' },
  { name: '汤婆婆的锅炉房', desc: '识别欲望', done: true, color: '#d4a853' },
  { name: '无脸男的浴场', desc: '接纳孤独', done: true, color: '#6b5b8a' },
  { name: '河神的净化', desc: '释放淤积', done: false, color: '#3b8b7a' },
  { name: '白龙的天空', desc: '找回名字', done: false, color: '#5a7d9a' },
]

const ACTIVITIES = [
  { text: '完成 SAS 焦虑自评量表 · 正常范围', time: '2小时前', icon: '镜', color: '#c4554d' },
  { text: '记录梦境：飞翔在城市上空', time: '昨天', icon: '月', color: '#d4a853' },
  { text: '写下梦后的反思：关于边界', time: '2天前', icon: '思', color: '#3b8b7a' },
  { text: '学习荣格：集体无意识与原型', time: '3天前', icon: '书', color: '#5a7d9a' },
]

function go(url: string, tab = false) {
  if (tab) {
    Taro.switchTab({ url })
    return
  }
  Taro.navigateTo({ url })
}

export default function ProfilePage() {
  const [reflectionCount, setReflectionCount] = useState(0)
  const doneCount = MILESTONES.filter((item) => item.done).length
  const progress = Math.round((doneCount / MILESTONES.length) * 100)

  useEffect(() => {
    try {
      const stored = Taro.getStorageSync('dreamlab_reflections')
      setReflectionCount(Array.isArray(stored) ? stored.length : 0)
    } catch {
      setReflectionCount(0)
    }
  }, [])

  return (
    <View className='page profile-page'>
      <ScrollView scrollY className='profile-scroll'>
        <View className='profile-hero'>
          <View className='avatar-ring'>
            <Text>千</Text>
          </View>
          <Text className='profile-name'>DreamLab 探索者</Text>
          <Text className='profile-desc'>把梦境、测评、课程与反思串成自己的成长路径。</Text>
        </View>

        <View className='stats-grid'>
          {STATS.map((stat) => (
            <View key={stat.label} className='stat-card'>
              <Text className='stat-icon' style={{ color: stat.color }}>{stat.icon}</Text>
              <Text className='stat-value' style={{ color: stat.color }}>
                {stat.label === '反思' ? reflectionCount : stat.value}
              </Text>
              <Text className='stat-label'>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View className='journey-card'>
          <View className='journey-head'>
            <Text className='card-title'>千寻之旅</Text>
            <Text className='journey-count'>{doneCount}/{MILESTONES.length}</Text>
          </View>
          <View className='journey-track'>
            <View className='journey-fill' style={{ width: `${progress}%` }} />
          </View>
          <View className='milestone-list'>
            {MILESTONES.map((item, index) => (
              <View key={item.name} className='milestone-item'>
                <View
                  className={`milestone-dot ${item.done ? 'milestone-done' : ''}`}
                  style={item.done ? { borderColor: `${item.color}55`, background: `${item.color}18`, color: item.color } : {}}
                >
                  <Text>{item.done ? '✓' : index + 1}</Text>
                </View>
                <Text className='milestone-name'>{item.name}</Text>
                <Text className='milestone-desc'>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className='quick-grid'>
          <View className='quick-card' onClick={() => go('/pages/assessments/index')}>
            <Text className='quick-icon'>镜</Text>
            <Text className='quick-title'>心理测评</Text>
          </View>
          <View className='quick-card' onClick={() => go('/pages/courses/index', true)}>
            <Text className='quick-icon'>书</Text>
            <Text className='quick-title'>继续学习</Text>
          </View>
          <View className='quick-card' onClick={() => go('/pages/reflect/index')}>
            <Text className='quick-icon'>思</Text>
            <Text className='quick-title'>写反思</Text>
          </View>
          <View className='quick-card' onClick={() => go('/pages/dream/index', true)}>
            <Text className='quick-icon'>月</Text>
            <Text className='quick-title'>记录梦境</Text>
          </View>
        </View>

        <View className='activity-card'>
          <Text className='card-title'>最近活动</Text>
          {ACTIVITIES.map((activity, index) => (
            <View key={activity.text} className={`activity-row ${index === ACTIVITIES.length - 1 ? 'activity-last' : ''}`}>
              <Text className='activity-icon' style={{ color: activity.color }}>{activity.icon}</Text>
              <Text className='activity-text'>{activity.text}</Text>
              <Text className='activity-time'>{activity.time}</Text>
            </View>
          ))}
        </View>

        <View className='quote-card'>
          <Text className='quote-text'>每完成一次测评、每写下一段反思，都是向真实的自己靠近一步。</Text>
          <Text className='quote-author'>钱婆婆</Text>
        </View>
      </ScrollView>
    </View>
  )
}
