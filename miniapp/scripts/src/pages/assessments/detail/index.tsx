import { View, Text } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import './index.scss'

export default function AssessmentDetailPage() {
  const router = useRouter()
  return (
    <View className='page placeholder-page'>
      <View className='placeholder-card'>
        <Text className='placeholder-emoji'>📋</Text>
        <Text className='placeholder-title'>量表详情</Text>
        <Text className='placeholder-desc'>ID: {router.params.id}</Text>
        <Text className='placeholder-hint'>🚧 Codex 接管开发中...</Text>
      </View>
    </View>
  )
}
