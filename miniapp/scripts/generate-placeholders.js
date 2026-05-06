// 占位页面生成脚本 — courses, assessments, reflect, profile
// 这些页面由 Codex 后续完善

const pages = [
  { name: 'courses', title: '系统课程', emoji: '📚', desc: '10门心理学课程 · 39章 · 34万字' },
  { name: 'assessments', title: '心理测评', emoji: '◎', desc: '6 套标准化临床量表 · AI 深度解读' },
  { name: 'reflect', title: '人生思考', emoji: '💭', desc: '梦后反思 · AI 洞察报告' },
  { name: 'profile', title: '我的', emoji: '○', desc: '个人中心 · 成长记录' },
]

const fs = require('fs')
const path = require('path')

pages.forEach(({ name, title, emoji, desc }) => {
  const dir = path.join(__dirname, 'src', 'pages', name)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  // page.tsx
  fs.writeFileSync(path.join(dir, 'index.tsx'), `import { View, Text } from '@tarojs/components'
import './index.scss'

export default function ${name.charAt(0).toUpperCase() + name.slice(1)}Page() {
  return (
    <View className='page placeholder-page'>
      <View className='placeholder-card'>
        <Text className='placeholder-emoji'>${emoji}</Text>
        <Text className='placeholder-title'>${title}</Text>
        <Text className='placeholder-desc'>${desc}</Text>
        <Text className='placeholder-hint'>🚧 Codex 接管开发中...</Text>
      </View>
    </View>
  )
}
`)

  // page.config.ts
  fs.writeFileSync(path.join(dir, 'index.config.ts'), `export default definePageConfig({
  navigationBarTitleText: '${title}',
})
`)

  // page.scss
  fs.writeFileSync(path.join(dir, 'index.scss'), `.placeholder-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 24px;
}

.placeholder-card {
  text-align: center;
  background: rgba(24, 24, 27, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 40px 32px;
  width: 100%;
  max-width: 320px;
}

.placeholder-emoji {
  display: block;
  font-size: 48px;
  margin-bottom: 16px;
}

.placeholder-title {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #f4f4f6;
  margin-bottom: 8px;
}

.placeholder-desc {
  display: block;
  font-size: 14px;
  color: #71717a;
  line-height: 1.6;
  margin-bottom: 20px;
}

.placeholder-hint {
  display: block;
  font-size: 12px;
  color: #d4a853;
}
`)
})

// detail page for assessments
const assessmentsDetailDir = path.join(__dirname, 'src', 'pages', 'assessments', 'detail')
if (!fs.existsSync(assessmentsDetailDir)) fs.mkdirSync(assessmentsDetailDir, { recursive: true })

fs.writeFileSync(path.join(assessmentsDetailDir, 'index.tsx'), `import { View, Text } from '@tarojs/components'
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
`)

fs.writeFileSync(path.join(assessmentsDetailDir, 'index.config.ts'), `export default definePageConfig({
  navigationBarTitleText: '量表详情',
})
`)

fs.writeFileSync(path.join(assessmentsDetailDir, 'index.scss'), `.placeholder-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 24px;
}
.placeholder-card {
  text-align: center;
  background: rgba(24, 24, 27, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 40px 32px;
  width: 100%;
  max-width: 320px;
}
.placeholder-emoji { display: block; font-size: 48px; margin-bottom: 16px; }
.placeholder-title { display: block; font-size: 20px; font-weight: 700; color: #f4f4f6; margin-bottom: 8px; }
.placeholder-desc { display: block; font-size: 14px; color: #71717a; line-height: 1.6; margin-bottom: 20px; }
.placeholder-hint { display: block; font-size: 12px; color: #d4a853; }
`)

// courses detail placeholder
const coursesDetailDir = path.join(__dirname, 'src', 'pages', 'courses', 'detail')
if (!fs.existsSync(coursesDetailDir)) fs.mkdirSync(coursesDetailDir, { recursive: true })

fs.writeFileSync(path.join(coursesDetailDir, 'index.tsx'), `import { View, Text } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import './index.scss'

export default function CourseDetailPage() {
  const router = useRouter()
  return (
    <View className='page placeholder-page'>
      <View className='placeholder-card'>
        <Text className='placeholder-emoji'>📖</Text>
        <Text className='placeholder-title'>课程详情</Text>
        <Text className='placeholder-desc'>ID: {router.params.id}</Text>
        <Text className='placeholder-hint'>🚧 Codex 接管开发中...</Text>
      </View>
    </View>
  )
}
`)

fs.writeFileSync(path.join(coursesDetailDir, 'index.config.ts'), `export default definePageConfig({
  navigationBarTitleText: '课程详情',
})
`)

fs.writeFileSync(path.join(coursesDetailDir, 'index.scss'), `.placeholder-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 24px;
}
.placeholder-card {
  text-align: center;
  background: rgba(24, 24, 27, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 40px 32px;
  width: 100%;
  max-width: 320px;
}
.placeholder-emoji { display: block; font-size: 48px; margin-bottom: 16px; }
.placeholder-title { display: block; font-size: 20px; font-weight: 700; color: #f4f4f6; margin-bottom: 8px; }
.placeholder-desc { display: block; font-size: 14px; color: #71717a; line-height: 1.6; margin-bottom: 20px; }
.placeholder-hint { display: block; font-size: 12px; color: #d4a853; }
`)

console.log('✅ All placeholder pages created')
