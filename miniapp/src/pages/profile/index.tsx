import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const STATS = [
  { label: '课程', value: 12, icon: '课', color: '#d4a853' },
  { label: '反思', value: 3, icon: '思', color: '#3b8b7a' },
  { label: '梦境', value: 4, icon: '梦', color: '#5a7d9a' },
  { label: '测评', value: 2, icon: '镜', color: '#c4554d' },
  { label: '知识', value: 5, icon: '研', color: '#6b5b8a' },
  { label: '路线', value: 1, icon: '图', color: '#cfa34d' },
]

const MILESTONES = [
  { name: '梦境记录', desc: '收集素材', done: true, color: '#d4a853' },
  { name: '心理测评', desc: '建立画像', done: true, color: '#5a7d9a' },
  { name: '课程学习', desc: '建立坐标', done: true, color: '#3b8b7a' },
  { name: '反思日志', desc: '持续复盘', done: false, color: '#c4554d' },
  { name: '成长路线', desc: '长期照护', done: false, color: '#cfa34d' },
]

const ACTIVITIES = [
  { text: '学习：弗洛伊德梦的解析入门，完成梦境双层拆解', time: '2小时前', icon: '课', color: '#d4a853' },
  { text: '反思：反复梦到迷路后的情绪记录', time: '昨天', icon: '思', color: '#3b8b7a' },
  { text: '完成心理测评：睡眠与焦虑状态观察', time: '2天前', icon: '镜', color: '#c4554d' },
  { text: '学习：正念冥想，完成 10 分钟觉察练习', time: '3天前', icon: '研', color: '#5a7d9a' },
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
            <Text>梦</Text>
          </View>
          <Text className='profile-name'>DreamLab 探索者</Text>
          <Text className='profile-desc'>把课程、测评、梦境解析与反思日志串成自己的成长路线。</Text>
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
            <Text className='card-title'>成长路线</Text>
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
          <View className='quick-card' onClick={() => go('/pages/assessments/index', true)}>
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
          <View className='quick-card' onClick={() => go('/pages/index/index', true)}>
            <Text className='quick-icon'>梦</Text>
            <Text className='quick-title'>返回首页</Text>
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
          <Text className='quote-text'>把梦境、情绪和行动记录下来，成长才会留下线索。</Text>
          <Text className='quote-author'>DreamLab</Text>
        </View>
      </ScrollView>
    </View>
  )
}
