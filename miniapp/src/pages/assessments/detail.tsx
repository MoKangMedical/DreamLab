import { useMemo, useState } from 'react'
import { Picker, ScrollView, Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { MOCK_ASSESSMENTS } from '../../data/mock-assessments'
import './detail.scss'

type Phase = 'taking' | 'result'
type AnswerValue = number | string

const CATEGORY_COLORS: Record<string, string> = {
  anxiety: '#c4554d',
  depression: '#6b5b8a',
  personality: '#d4a853',
  sleep: '#5a7d9a',
  resilience: '#3b8b7a',
  symptom: '#d4a853',
}

const DIMENSION_LABELS: Record<string, string> = {
  O: '开放性',
  C: '尽责性',
  E: '外向性',
  A: '宜人性',
  N: '神经质',
  SOM: '躯体化',
  'O-C': '强迫',
  'I-S': '人际敏感',
  DEP: '抑郁',
  ANX: '焦虑',
  HOS: '敌对',
  PHOB: '恐怖',
  PAR: '偏执',
  PSY: '精神病性',
}

function scoreQuestion(question: any, rawValue: AnswerValue): number | null {
  if (typeof rawValue !== 'number') return null
  if (!question.reversed) return rawValue

  const scores = (question.options || []).map((option) => option.score)
  const min = Math.min(...scores)
  const max = Math.max(...scores)
  return max + min - rawValue
}

function getLevel(category: string, rawScore: number) {
  if (category === 'anxiety') {
    const standard = Math.round(rawScore * 1.25)
    if (standard >= 70) return { score: standard, level: '重度焦虑风险', color: '#c4554d' }
    if (standard >= 60) return { score: standard, level: '中度焦虑风险', color: '#d48653' }
    if (standard >= 50) return { score: standard, level: '轻度焦虑风险', color: '#d4a853' }
    return { score: standard, level: '正常范围', color: '#5a9a6f' }
  }

  if (category === 'depression') {
    const index = rawScore / 80
    const standard = Math.round(index * 100)
    if (index >= 0.7) return { score: standard, level: '重度抑郁风险', color: '#c4554d' }
    if (index >= 0.6) return { score: standard, level: '中度抑郁风险', color: '#d48653' }
    if (index >= 0.5) return { score: standard, level: '轻度抑郁风险', color: '#d4a853' }
    return { score: standard, level: '正常范围', color: '#5a9a6f' }
  }

  if (category === 'sleep') {
    if (rawScore >= 8) return { score: rawScore, level: '睡眠质量需关注', color: '#c4554d' }
    if (rawScore >= 6) return { score: rawScore, level: '睡眠质量一般', color: '#d4a853' }
    return { score: rawScore, level: '睡眠质量良好', color: '#5a9a6f' }
  }

  if (category === 'resilience') {
    if (rawScore >= 40) return { score: rawScore, level: '心理韧性良好', color: '#5a9a6f' }
    if (rawScore >= 28) return { score: rawScore, level: '心理韧性中等', color: '#d4a853' }
    return { score: rawScore, level: '韧性可继续锻炼', color: '#c4554d' }
  }

  if (category === 'symptom') {
    if (rawScore >= 108) return { score: rawScore, level: '中度异常信号', color: '#c4554d' }
    if (rawScore >= 72) return { score: rawScore, level: '轻度异常信号', color: '#d4a853' }
    return { score: rawScore, level: '健康范围', color: '#5a9a6f' }
  }

  return { score: rawScore, level: '人格画像完成', color: '#d4a853' }
}

function buildInterpretation(category: string, level: string) {
  if (category === 'personality') {
    return '人格测评没有好坏之分。它更像一张地图，帮助你看见自己如何获取能量、处理关系、面对压力与新经验。'
  }
  if (category === 'resilience') {
    return '心理韧性是可以训练的能力。规律睡眠、稳定关系、可完成的小目标，都会让你的恢复力一点点变强。'
  }
  if (category === 'sleep') {
    return '睡眠是心理健康的底座。如果长期入睡困难、早醒或白天功能受影响，建议优先调整作息并考虑专业帮助。'
  }
  return `${level} 只是一个筛查信号，不是诊断。把它当作一次提醒：看见自己的状态，然后选择更适合当下的照顾方式。`
}

export default function AssessmentDetailPage() {
  const router = useRouter()
  const assessmentId = Number(router.params.id || 1)
  const assessment = MOCK_ASSESSMENTS.find((item) => item.id === assessmentId) || MOCK_ASSESSMENTS[0]
  const questions = assessment.questions || []
  const accent = CATEGORY_COLORS[assessment.category] || '#d4a853'

  const [phase, setPhase] = useState<Phase>('taking')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({})

  const answeredCount = Object.keys(answers).length
  const totalQuestions = questions.length
  const progress = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0
  const question = questions[currentQ] as any

  const result = useMemo(() => {
    let rawScore = 0
    const dimensions: Record<string, { total: number; count: number }> = {}

    questions.forEach((q: any) => {
      const value = answers[q.id]
      const score = scoreQuestion(q, value)
      if (score === null) return
      rawScore += score
      if (q.dimension) {
        const item = dimensions[q.dimension] || { total: 0, count: 0 }
        item.total += score
        item.count += 1
        dimensions[q.dimension] = item
      }
    })

    const level = getLevel(assessment.category, rawScore)
    const dimensionRows = Object.entries(dimensions).map(([key, value]) => ({
      key,
      label: DIMENSION_LABELS[key] || key,
      score: Math.round((value.total / value.count) * 20),
    }))

    return {
      rawScore,
      ...level,
      dimensions: dimensionRows,
      interpretation: buildInterpretation(assessment.category, level.level),
    }
  }, [answers, assessment.category, questions])

  const selectOption = (score: number) => {
    if (!question) return
    setAnswers((prev) => ({ ...prev, [question.id]: score }))
    if (currentQ < totalQuestions - 1) {
      setTimeout(() => setCurrentQ((value) => value + 1), 180)
    }
  }

  const selectTime = (value: string) => {
    if (!question) return
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  const submit = () => {
    if (answeredCount < totalQuestions) {
      Taro.showToast({ title: '请完成所有题目', icon: 'none' })
      return
    }
    setPhase('result')
  }

  if (phase === 'result') {
    return (
      <View className='page assessment-detail-page'>
        <ScrollView scrollY className='assessment-scroll'>
          <View className='result-hero'>
            <Text className='result-icon'>{assessment.icon}</Text>
            <Text className='result-title'>{assessment.name}</Text>
            <View className='score-circle' style={{ borderColor: `${result.color}55` }}>
              <Text className='score-value' style={{ color: result.color }}>{result.score}</Text>
              <Text className='score-label'>{assessment.category === 'personality' ? '画像分' : '得分'}</Text>
            </View>
            <View className='level-badge' style={{ borderColor: `${result.color}55`, background: `${result.color}18` }}>
              <Text style={{ color: result.color }}>{result.level}</Text>
            </View>
          </View>

          {result.dimensions.length > 0 && (
            <View className='dimension-card'>
              <Text className='section-title'>维度概览</Text>
              {result.dimensions.map((item) => (
                <View key={item.key} className='dimension-row'>
                  <Text className='dimension-label'>{item.label}</Text>
                  <View className='dimension-bar'>
                    <View className='dimension-fill' style={{ width: `${Math.min(item.score, 100)}%`, background: accent }} />
                  </View>
                  <Text className='dimension-score'>{item.score}</Text>
                </View>
              ))}
            </View>
          )}

          <View className='interpret-card'>
            <Text className='section-title'>白龙的低语</Text>
            <Text className='interpret-text'>{result.interpretation}</Text>
          </View>

          <View className='interpret-card muted-card'>
            <Text className='interpret-text'>{assessment.disclaimer}</Text>
          </View>

          <View className='detail-actions'>
            <View className='ghost-btn' onClick={() => Taro.navigateBack()}>
              <Text>返回列表</Text>
            </View>
            <View
              className='gold-btn'
              onClick={() => {
                setAnswers({})
                setCurrentQ(0)
                setPhase('taking')
              }}
            >
              <Text>重新测试</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

  return (
    <View className='page assessment-detail-page'>
      <ScrollView scrollY className='assessment-scroll'>
        <View className='take-header'>
          <Text className='back-link' onClick={() => Taro.navigateBack()}>← 返回列表</Text>
          <Text className='take-title'>{assessment.name}</Text>
          <Text className='take-desc'>{assessment.instructions}</Text>
        </View>

        <View className='progress-block'>
          <View className='progress-meta'>
            <Text>第 {currentQ + 1} / {totalQuestions} 题</Text>
            <Text>{progress}%</Text>
          </View>
          <View className='progress-track'>
            <View className='progress-fill' style={{ width: `${progress}%`, background: accent }} />
          </View>
        </View>

        {question && (
          <View className='question-card'>
            <Text className='question-index'>Q{question.id}</Text>
            <Text className='question-text'>{question.text}</Text>

            {question.type === 'time' ? (
              <Picker mode='time' onChange={(event) => selectTime(String(event.detail.value))}>
                <View className='time-picker'>
                  <Text>{answers[question.id] ? String(answers[question.id]) : '选择时间'}</Text>
                </View>
              </Picker>
            ) : (
              <View className='option-list'>
                {(question.options || []).map((option) => {
                  const selected = answers[question.id] === option.score
                  return (
                    <View
                      key={option.score}
                      className={`option-item ${selected ? 'option-selected' : ''}`}
                      style={selected ? { borderColor: accent, background: `${accent}18` } : {}}
                      onClick={() => selectOption(option.score)}
                    >
                      <Text className='option-label'>{option.label}</Text>
                    </View>
                  )
                })}
              </View>
            )}
          </View>
        )}

        <View className='question-nav'>
          <View
            className={`ghost-btn ${currentQ === 0 ? 'btn-disabled' : ''}`}
            onClick={() => setCurrentQ((value) => Math.max(0, value - 1))}
          >
            <Text>上一题</Text>
          </View>
          {currentQ === totalQuestions - 1 ? (
            <View className='gold-btn' onClick={submit}>
              <Text>照见自己</Text>
            </View>
          ) : (
            <View
              className={`ghost-btn ${!question || answers[question.id] === undefined ? 'btn-disabled' : ''}`}
              onClick={() => {
                if (question && answers[question.id] !== undefined) {
                  setCurrentQ((value) => Math.min(totalQuestions - 1, value + 1))
                }
              }}
            >
              <Text>下一题</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
