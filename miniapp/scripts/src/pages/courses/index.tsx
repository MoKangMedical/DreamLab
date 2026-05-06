import { View, Text } from '@tarojs/components'
import './index.scss'

export default function CoursesPage() {
  return (
    <View className='page placeholder-page'>
      <View className='placeholder-card'>
        <Text className='placeholder-emoji'>📚</Text>
        <Text className='placeholder-title'>系统课程</Text>
        <Text className='placeholder-desc'>10门心理学课程 · 39章 · 34万字</Text>
        <Text className='placeholder-hint'>🚧 Codex 接管开发中...</Text>
      </View>
    </View>
  )
}
