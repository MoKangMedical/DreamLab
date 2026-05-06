// DreamLab 小程序 — 首页
// 轻量版平台入口，仅展示核心功能卡片

import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Index() {
  const features = [
    { title: '梦境解析', desc: '四重视角解读你的梦', icon: '🌙', path: '/pages/dream/index', color: '#d4a853' },
    { title: '心理测评', desc: '6 套临床量表', icon: '◎', path: '/pages/assessments/index', color: '#c4554d' },
    { title: '系统课程', desc: '10门课 · 39章', icon: '📚', path: '/pages/courses/index', color: '#6b5b8a' },
    { title: '人生思考', desc: '梦后反思 · AI洞察', icon: '💭', path: '/pages/reflect/index', color: '#5a9a6f' },
  ]

  return (
    <View className='page'>
      {/* Header */}
      <View className='hero'>
        <Text className='hero-tag'>循证心理 · AI 驱动</Text>
        <Text className='hero-title'>
          读懂你的{'\n'}
          <Text className='hero-title-gold'>内心世界</Text>
        </Text>
        <Text className='hero-desc'>
          基于标准化心理测评、AI深度解读与循证知识库
        </Text>
      </View>

      {/* Features Grid */}
      <View className='features'>
        {features.map((f, i) => (
          <View
            key={i}
            className='feature-card'
            onClick={() => Taro.navigateTo({ url: f.path })}
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
          onClick={() => Taro.navigateTo({ url: '/pages/dream/index' })}
        >
          <Text>开始解梦 →</Text>
        </View>
      </View>
    </View>
  )
}
