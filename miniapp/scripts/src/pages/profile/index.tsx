import { View, Text } from '@tarojs/components'
import './index.scss'

export default function ProfilePage() {
  return (
    <View className='page placeholder-page'>
      <View className='placeholder-card'>
        <Text className='placeholder-emoji'>○</Text>
        <Text className='placeholder-title'>我的</Text>
        <Text className='placeholder-desc'>个人中心 · 成长记录</Text>
        <Text className='placeholder-hint'>🚧 Codex 接管开发中...</Text>
      </View>
    </View>
  )
}
