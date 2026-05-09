import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const STATS = [
  { label: '课程', value: 12, icon: '课', color: '#d4a853' },
  { label: '复盘', value: 3, icon: '策', color: '#3b8b7a' },
  { label: '工具', value: 4, icon: '盘', color: '#5a7d9a' },
  { label: '画像', value: 2, icon: '镜', color: '#c4554d' },
  { label: '报告', value: 5, icon: '研', color: '#6b5b8a' },
  { label: '蓝图', value: 1, icon: '图', color: '#cfa34d' },
]

const MILESTONES = [
  { name: '周期定位', desc: '确认阶段', done: true, color: '#d4a853' },
  { name: '产业地图', desc: '筛选赛道', done: true, color: '#5a7d9a' },
  { name: '资产框架', desc: '配置原则', done: true, color: '#3b8b7a' },
  { name: '风险预案', desc: '压力测试', done: false, color: '#c4554d' },
  { name: '30年蓝图', desc: '代际传承', done: false, color: '#cfa34d' },
]

const ACTIVITIES = [
  { text: '学习：康波理论，完成周期四季定位图', time: '2小时前', icon: '课', color: '#d4a853' },
  { text: '复盘：AI 与能源赛道的主导产业假设', time: '昨天', icon: '策', color: '#3b8b7a' },
  { text: '完成投资者画像：风险偏好中等', time: '2天前', icon: '镜', color: '#c4554d' },
  { text: '学习：周金涛四周期嵌套模型', time: '3天前', icon: '研', color: '#5a7d9a' },
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
            <Text>康</Text>
          </View>
          <Text className='profile-name'>康波研究员</Text>
          <Text className='profile-desc'>把课程、复盘、资产配置与30年蓝图串成自己的周期路线。</Text>
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
            <Text className='card-title'>周期路线</Text>
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
            <Text className='quick-title'>投资者画像</Text>
          </View>
          <View className='quick-card' onClick={() => go('/pages/courses/index', true)}>
            <Text className='quick-icon'>书</Text>
            <Text className='quick-title'>继续学习</Text>
          </View>
          <View className='quick-card' onClick={() => go('/pages/reflect/index')}>
            <Text className='quick-icon'>思</Text>
            <Text className='quick-title'>写复盘</Text>
          </View>
          <View className='quick-card' onClick={() => go('/pages/index/index', true)}>
            <Text className='quick-icon'>康</Text>
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
          <Text className='quote-text'>每一次判断都要留下假设、证据、风险和复盘日期。</Text>
          <Text className='quote-author'>康波研究院</Text>
        </View>
      </ScrollView>
    </View>
  )
}
