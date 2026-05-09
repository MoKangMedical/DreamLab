// DreamLab 小程序 — 首页

import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Index() {
  const features = [
    { title: '心理课程', desc: '100门课 · 7学院', icon: '课', path: '/pages/courses/index', color: '#d4a853', tab: true },
    { title: '心理测评', desc: '情绪 · 睡眠 · 人格', icon: '◎', path: '/pages/assessments/index', color: '#c4554d', tab: true },
    { title: '反思日志', desc: '情境 · 感受 · 照护', icon: '思', path: '/pages/reflect/index', color: '#5a9a6f' },
    { title: '我的成长', desc: '课程进度与成长路线', icon: '图', path: '/pages/profile/index', color: '#6b5b8a', tab: true },
  ]

  return (
    <View className='page'>
      {/* Header */}
      <View className='hero'>
        <Text className='hero-tag'>DREAMLAB ACADEMY</Text>
        <Text className='hero-title'>
          梦境与心理{'\n'}
          <Text className='hero-title-gold'>成长系统</Text>
        </Text>
        <Text className='hero-desc'>
          梦境解析、心理测评、课程学习和反思日志
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
