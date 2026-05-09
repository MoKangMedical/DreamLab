// 心理测评 Mock 数据 — 6大标准量表，真实题目
// SAS · SDS · BFI-20 · PSQI · CD-RISC · SCL-90

export const MOCK_ASSESSMENTS = [
  {
    id: 1, name: 'SAS 焦虑自评量表', category: 'anxiety',
    description: '焦虑自评量表（Self-Rating Anxiety Scale）由 Zung 于 1971 年编制，是国际上最广泛使用的焦虑评估工具之一。通过20个项目评估主观焦虑感受的四个维度：情感症状、躯体症状、运动性紧张和恐惧。',
    question_count: 20, icon: '🌊',
    disclaimer: '⚠️ 本测评仅供参考，不能替代专业诊断。如得分偏高，建议咨询心理医生。',
    instructions: '请根据过去一周的实际感受，选择最符合的选项。没有对错之分，请如实作答。',
    scoring_note: '标准分 = 总分 × 1.25。50-59轻度，60-69中度，≥70重度。',
    questions: [
    { id: 1, text: "我比平时更容易紧张和着急", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 2, text: "我无缘无故地感到害怕", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 3, text: "我容易心烦意乱或感到恐慌", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 4, text: "我觉得我可能将要发疯", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 5, text: "我觉得一切都很好，不会发生什么不幸", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 6, text: "我的手脚会发抖打颤", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 7, text: "我因头痛、颈痛和背痛而烦恼", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 8, text: "我感觉容易衰弱和疲乏", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 9, text: "我觉得心平气和，并且容易安静坐着", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 10, text: "我觉得心跳得很快", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 11, text: "我因一阵阵头晕而苦恼", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 12, text: "我有晕倒的感觉，或觉得要晕倒似的", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 13, text: "我呼气吸气都感到很容易", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 14, text: "我的手脚会感到麻木和刺痛", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 15, text: "我因胃痛和消化不良而苦恼", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 16, text: "我常常会想要小便", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 17, text: "我的手脚常常是干燥温暖的", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 18, text: "我的脸会发红发热", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 19, text: "我容易入睡，并且一夜睡得很好", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 20, text: "我会做噩梦", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] }
    ]
  },
  {
    id: 2, name: 'SDS 抑郁自评量表', category: 'depression',
    description: '抑郁自评量表（Self-Rating Depression Scale）由 Zung 于 1965 年编制，评估抑郁状态的四个维度：情感症状、躯体症状、精神运动性障碍和抑郁性心理障碍。',
    question_count: 20, icon: '🌧️',
    disclaimer: '⚠️ 本测评仅供参考，不能替代专业诊断。如果你正在经历持续的情绪低落，请寻求帮助。',
    instructions: '请根据过去一周的实际感受，选择最符合的选项。',
    scoring_note: '抑郁严重度指数 = 总分 / 80。0.5以下正常，0.5-0.59轻度，0.6-0.69中度，≥0.7重度。',
    questions: [
    { id: 1, text: "我觉得闷闷不乐，情绪低沉", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 2, text: "我觉得一天之中早晨最好", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 3, text: "我一阵阵哭出来或觉得想哭", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 4, text: "我晚上睡眠不好", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 5, text: "我吃得跟平常一样多", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 6, text: "我与异性密切接触时和以往一样感到愉快", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 7, text: "我发觉我的体重在下降", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 8, text: "我有便秘的苦恼", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 9, text: "我的心跳比平时快", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 10, text: "我无缘无故地感到疲乏", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 11, text: "我的头脑跟平常一样清楚", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 12, text: "我觉得经常做的事情并没有困难", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 13, text: "我觉得不安而平静不下来", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 14, text: "我对将来抱有希望", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 15, text: "我比平常容易生气激动", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 16, text: "我觉得做出决定是容易的", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 17, text: "我觉得自己是个有用的人，有人需要我", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 18, text: "我的生活过得很有意思", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 19, text: "我认为如果我死了别人会生活得更好些", reversed: false, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] },
    { id: 20, text: "平常感兴趣的事我仍然照样感兴趣", reversed: true, options: [
      {label: '没有或很少时间', score: 1},
      {label: '少部分时间', score: 2},
      {label: '相当多时间', score: 3},
      {label: '绝大部分时间', score: 4}
    ] }
    ]
  },
  {
    id: 3, name: '大五人格简版 (BFI-20)', category: 'personality',
    description: '大五人格量表（Big Five Inventory）基于人格五因素模型，评估五个核心维度：开放性(O)、尽责性(C)、外向性(E)、宜人性(A)、神经质(N)。简版20题适合快速画像。',
    question_count: 20, icon: '🎭',
    disclaimer: '⚠️ 人格无好坏之分。每个维度都是一条光谱，了解自己是成长的开始。',
    instructions: '请根据你平时的真实情况回答，而不是理想中的自己。',
    dimensions_info: {
      E: '外向性 — 热情、社交、活跃、寻求刺激',
      A: '宜人性 — 信任、利他、顺从、谦逊、温柔',
      C: '尽责性 — 能力、条理、责任感、自律、审慎',
      N: '神经质 — 焦虑、敌意、抑郁、自我意识、冲动',
      O: '开放性 — 幻想、审美、感受、行动、观念',
    },
    questions: [
    { id: 1, text: "我是健谈的，喜欢与人交流", dimension: "E", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 2, text: "我倾向于挑剔别人的错误", dimension: "A", reversed: true, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 3, text: "我做事情认真负责，会坚持到底", dimension: "C", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 4, text: "我经常感到忧郁、沮丧", dimension: "N", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 5, text: "我对新事物充满好奇心，富有创造力", dimension: "O", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 6, text: "我性格内向，喜欢独处", dimension: "E", reversed: true, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 7, text: "我乐于助人，不自私", dimension: "A", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 8, text: "我有时会有些粗心大意", dimension: "C", reversed: true, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 9, text: "我心态放松，能很好地应对压力", dimension: "N", reversed: true, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 10, text: "我热爱艺术、音乐和文学", dimension: "O", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 11, text: "我充满活力，精力充沛", dimension: "E", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 12, text: "我容易与人发生争执", dimension: "A", reversed: true, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 13, text: "我是一个值得信赖的人", dimension: "C", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 14, text: "我容易紧张不安", dimension: "N", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 15, text: "我擅长深入思考复杂问题", dimension: "O", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 16, text: "我热情洋溢，能带动气氛", dimension: "E", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 17, text: "我有宽容的天性，不容易记恨", dimension: "A", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 18, text: "我做事往往缺乏条理", dimension: "C", reversed: true, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 19, text: "我经常担心各种事情", dimension: "N", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] },
    { id: 20, text: "我的想象力非常活跃", dimension: "O", reversed: false, options: [
      {label: '完全不同意', score: 1},
      {label: '不太同意', score: 2},
      {label: '中立', score: 3},
      {label: '比较同意', score: 4},
      {label: '完全同意', score: 5}
    ] }
    ]
  },
  {
    id: 4, name: '匹兹堡睡眠质量指数 (PSQI 简版)', category: 'sleep',
    description: '匹兹堡睡眠质量指数（Pittsburgh Sleep Quality Index）是评估睡眠质量的黄金标准工具。涵盖主观睡眠质量、入睡时间、睡眠时长、睡眠效率和日间功能障碍。',
    question_count: 7, icon: '🌙',
    disclaimer: '⚠️ 长期失眠（PSQI>7）请咨询睡眠专科医生。睡眠是心理健康的基石。',
    instructions: '请根据过去一个月的睡眠情况回答。',
    scoring_note: '总分0-21分。≤5分睡眠质量良好，6-7分一般，≥8分可能存在睡眠障碍。',
    questions: [
        { id: 1, text: "在过去一个月里，你通常晚上几点上床睡觉？", type: "time" },
    { id: 2, text: "在过去一个月里，你从上床到入睡通常需要多长时间？", options: [{"label": "≤15分钟", "score": 0}, {"label": "16-30分钟", "score": 1}, {"label": "31-60分钟", "score": 2}, {"label": "≥60分钟", "score": 3}] },
    { id: 3, text: "在过去一个月里，你通常每天早上几点起床？", type: "time" },
    { id: 4, text: "在过去一个月里，你每晚实际睡眠时间大约是多少？", options: [{"label": ">7小时", "score": 0}, {"label": "6-7小时", "score": 1}, {"label": "5-6小时", "score": 2}, {"label": "<5小时", "score": 3}] },
    { id: 5, text: "在过去一个月里，你是否因以下问题影响睡眠：难以在30分钟内入睡？", options: [{"label": "从不", "score": 0}, {"label": "每周少于1次", "score": 1}, {"label": "每周1-2次", "score": 2}, {"label": "每周3次以上", "score": 3}] },
    { id: 6, text: "在过去一个月里，你如何评价自己的整体睡眠质量？", options: [{"label": "非常好", "score": 0}, {"label": "较好", "score": 1}, {"label": "较差", "score": 2}, {"label": "非常差", "score": 3}] },
    { id: 7, text: "在过去一个月里，你是否因睡眠不足而影响日间活动？", options: [{"label": "没有影响", "score": 0}, {"label": "轻微影响", "score": 1}, {"label": "明显影响", "score": 2}, {"label": "严重影响", "score": 3}] }
    ]
  },
  {
    id: 5, name: '心理弹性量表 (CD-RISC 简版)', category: 'resilience',
    description: '心理弹性量表（Connor-Davidson Resilience Scale）测量个体面对逆境、创伤和重大压力时的适应与恢复能力。心理弹性是可以培养的"心理肌肉"。',
    question_count: 10, icon: '🌱',
    disclaimer: '⚠️ 低分不是缺陷，而是提醒我们有意识地锻炼心理韧性。',
    instructions: '请根据你应对困难时的真实感受回答。',
    scoring_note: '总分10-50分。分数越高心理弹性越强。',
    questions: [
    { id: 1, text: "我有能力适应变化", options: [
      {label: '从不', score: 1},
      {label: '偶尔', score: 2},
      {label: '有时', score: 3},
      {label: '经常', score: 4},
      {label: '几乎总是', score: 5}
    ] },
    { id: 2, text: "不管发生什么事情，我都能处理", options: [
      {label: '从不', score: 1},
      {label: '偶尔', score: 2},
      {label: '有时', score: 3},
      {label: '经常', score: 4},
      {label: '几乎总是', score: 5}
    ] },
    { id: 3, text: "面对问题时，我试着看到事情幽默的一面", options: [
      {label: '从不', score: 1},
      {label: '偶尔', score: 2},
      {label: '有时', score: 3},
      {label: '经常', score: 4},
      {label: '几乎总是', score: 5}
    ] },
    { id: 4, text: "应对压力使我感到更有力量", options: [
      {label: '从不', score: 1},
      {label: '偶尔', score: 2},
      {label: '有时', score: 3},
      {label: '经常', score: 4},
      {label: '几乎总是', score: 5}
    ] },
    { id: 5, text: "经历困难或疾病后，我往往会很快恢复", options: [
      {label: '从不', score: 1},
      {label: '偶尔', score: 2},
      {label: '有时', score: 3},
      {label: '经常', score: 4},
      {label: '几乎总是', score: 5}
    ] },
    { id: 6, text: "纵然有阻碍，我相信我能够实现我的目标", options: [
      {label: '从不', score: 1},
      {label: '偶尔', score: 2},
      {label: '有时', score: 3},
      {label: '经常', score: 4},
      {label: '几乎总是', score: 5}
    ] },
    { id: 7, text: "在压力下，我仍然能够集中精神并清晰思考", options: [
      {label: '从不', score: 1},
      {label: '偶尔', score: 2},
      {label: '有时', score: 3},
      {label: '经常', score: 4},
      {label: '几乎总是', score: 5}
    ] },
    { id: 8, text: "我不会轻易被失败打倒", options: [
      {label: '从不', score: 1},
      {label: '偶尔', score: 2},
      {label: '有时', score: 3},
      {label: '经常', score: 4},
      {label: '几乎总是', score: 5}
    ] },
    { id: 9, text: "在处理生活中的挑战时，我觉得自己是个坚强的人", options: [
      {label: '从不', score: 1},
      {label: '偶尔', score: 2},
      {label: '有时', score: 3},
      {label: '经常', score: 4},
      {label: '几乎总是', score: 5}
    ] },
    { id: 10, text: "我能够处理一些不愉快或痛苦的感觉，如悲伤、恐惧和愤怒", options: [
      {label: '从不', score: 1},
      {label: '偶尔', score: 2},
      {label: '有时', score: 3},
      {label: '经常', score: 4},
      {label: '几乎总是', score: 5}
    ] }
    ]
  },
  {
    id: 6, name: 'SCL-90 症状自评 (简版)', category: 'symptom',
    description: '症状自评量表（Symptom Checklist-90）是心理健康综合评估的经典工具。简版覆盖9个维度：躯体化、强迫、人际敏感、抑郁、焦虑、敌对、恐怖、偏执、精神病性。',
    question_count: 36, icon: '📋',
    disclaimer: '⚠️ 本测评提供多维度心理健康参考，不能替代临床诊断。得分偏高提示值得关注。',
    instructions: '请根据过去一周的实际感受回答。',
    dimensions_info: {
      SOM: '躯体化 — 身体不适的主观感受',
      'O-C': '强迫症状 — 无法摆脱的无意义想法和行为',
      'I-S': '人际敏感 — 与他人相比的自卑感和不自在',
      DEP: '抑郁 — 生活兴趣减退、动力缺乏',
      ANX: '焦虑 — 神经过敏、紧张及躯体表现',
      HOS: '敌对 — 愤怒、攻击和易怒的表现',
      PHOB: '恐怖 — 对特定事物或情境的持久恐惧',
      PAR: '偏执 — 投射性思维、猜疑和敌对',
      PSY: '精神病性 — 人际疏离和思维异常',
    },
    questions: [
    { id: 1, text: "头痛或头晕", dimension: "SOM", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 2, text: "心中不踏实，神经过敏", dimension: "ANX", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 3, text: "头脑中有不必要的想法或字句盘旋", dimension: "O-C", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 4, text: "头昏或昏倒的感觉", dimension: "SOM", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 5, text: "对异性的兴趣减退", dimension: "DEP", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 6, text: "感到别人能控制你的思想", dimension: "PSY", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 7, text: "责怪别人制造麻烦", dimension: "PAR", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 8, text: "忘记一些重要的事情", dimension: "O-C", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 9, text: "担心自己的衣饰整齐及仪态的端正", dimension: "O-C", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 10, text: "感到身体的某部分软弱无力", dimension: "SOM", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 11, text: "感到精力不足或比以前慢", dimension: "DEP", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 12, text: "当别人看着你或谈论你时感到不自在", dimension: "I-S", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 13, text: "有一些不属于你自己的想法", dimension: "PSY", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 14, text: "感到孤独", dimension: "DEP", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 15, text: "感到事事都没有兴趣", dimension: "DEP", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 16, text: "感到害怕", dimension: "ANX", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 17, text: "容易受到伤害", dimension: "I-S", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 18, text: "感到人们不友好并且不喜欢你", dimension: "PAR", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 19, text: "做事必须做得很慢以保证做得正确", dimension: "O-C", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 20, text: "对声音敏感", dimension: "ANX", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 21, text: "心中不平静，不能安静坐着", dimension: "ANX", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 22, text: "感到在公共场合吃东西很不舒服", dimension: "PHOB", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 23, text: "与他人相比感到自己不足", dimension: "I-S", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 24, text: "发抖或颤抖", dimension: "ANX", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 25, text: "感到别人不理解你、不同情你", dimension: "PAR", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 26, text: "感到对别人神经过敏", dimension: "PAR", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 27, text: "恶心或胃部不舒服", dimension: "SOM", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 28, text: "感到比不上他人", dimension: "I-S", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 29, text: "必须反复洗手、点数目或触摸某些东西", dimension: "O-C", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 30, text: "感到自己的脑子有毛病", dimension: "PSY", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 31, text: "单独一人时感到很紧张", dimension: "PHOB", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 32, text: "做事必须反复检查", dimension: "O-C", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 33, text: "难以入睡或睡得不深", dimension: "DEP", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 34, text: "即使在人群中也会感到孤独", dimension: "PSY", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 35, text: "呼吸有困难", dimension: "SOM", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] },
    { id: 36, text: "感到紧张或容易紧张", dimension: "ANX", options: [
      {label: '没有', score: 1},
      {label: '轻度', score: 2},
      {label: '中度', score: 3},
      {label: '偏重', score: 4},
      {label: '严重', score: 5}
    ] }
    ]
  }
];
