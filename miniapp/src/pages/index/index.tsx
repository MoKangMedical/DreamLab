// 康波研究院小程序 — 首页

import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Index() {
  const features = [
    { title: '康波课程', desc: '65门课 · 10阶段', icon: '周', path: '/pages/courses/index', color: '#d4a853', tab: true },
    { title: '周期测评', desc: '风险偏好与行为偏差', icon: '◎', path: '/pages/assessments/index', color: '#c4554d', tab: true },
    { title: '策略复盘', desc: '假设 · 证据 · 风险', icon: '策', path: '/pages/reflect/index', color: '#5a9a6f' },
    { title: '我的路线', desc: '课程进度与30年蓝图', icon: '图', path: '/pages/profile/index', color: '#6b5b8a', tab: true },
  ]

  return (
    <View className='page'>
      {/* Header */}
      <View className='hero'>
        <Text className='hero-tag'>KANGBO ACADEMY · 2026-2040</Text>
        <Text className='hero-title'>
          掌握50年{'\n'}
          <Text className='hero-title-gold'>财富周期</Text>
        </Text>
        <Text className='hero-desc'>
          康波理论、产业地图、资产配置和个人路线图
        </Text>
      </View>

      {/* Features Grid */}
      <View className='features'>
        {features.map((f, i) => (
          <View
            key={i}
            className='feature-card'
            onClick={() => f.tab ? Taro.switchTab({ url: f.path }) : Taro.navigateTo({ url: f.path })}
          >
            <View className='feature-accent' style={{ background: f.color }} />
            <Text className='feature-icon'>{f.icon}</Text>
            <Text className='feature-title'>{f.title}</Text>
            <Text className='feature-desc'>{f.desc}</Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View className='cta'>
        <View
          className='btn-gold'
          onClick={() => Taro.switchTab({ url: '/pages/courses/index' })}
        >
          <Text>进入课程体系 →</Text>
        </View>
      </View>
    </View>
  )
}
