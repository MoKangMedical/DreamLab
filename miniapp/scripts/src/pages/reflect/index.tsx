import { View, Text } from '@tarojs/components'
import './index.scss'

export default function ReflectPage() {
  return (
    <View className='page placeholder-page'>
      <View className='placeholder-card'>
        <Text className='placeholder-emoji'>💭</Text>
        <Text className='placeholder-title'>人生思考</Text>
        <Text className='placeholder-desc'>梦后反思 · AI 洞察报告</Text>
        <Text className='placeholder-hint'>🚧 Codex 接管开发中...</Text>
      </View>
    </View>
  )
}
