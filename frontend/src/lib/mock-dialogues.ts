// 游戏对话数据 — 完全自包含，不依赖后端API
// 用于静态导出部署

interface DialogueChoice {
  text: string;
  next_key: string;
  effect?: {
    advance_floor?: number;
    forget_name?: boolean;
    flag?: string;
  };
}

interface DialogueNode {
  npc_name: string;
  npc_text: string;
  player_choices: DialogueChoice[];
  dialogue_key: string;
  next_dialogue: string;
}

// 1F 油屋入口·遗忘之桥 — 汤婆婆
export const DIALOGUES_F1: DialogueNode[] = [
  {
    dialogue_key: 'f1_start',
    npc_name: '汤婆婆',
    npc_text: '欢迎来到油屋！我是这里的老板娘汤婆婆。每一个来这里工作的人，我都会收走他的名字，给他一个新的。你来的话，也要把名字交给我哦～怎么样？愿意在我这里工作吗？',
    next_dialogue: '',
    player_choices: [
      { text: '我愿意在这里工作，请收下我的名字吧', next_key: 'f1_give_name', effect: { forget_name: true } },
      { text: '我不能交出名字，这是我的根', next_key: 'f1_refuse', effect: { flag: 'name_remembered' } },
    ],
  },
  {
    dialogue_key: 'f1_give_name',
    npc_name: '汤婆婆',
    npc_text: '呵呵呵，很好。从今天起你就叫"梦"吧。名字这种东西，记不记得都无所谓。在这里待久了，你自然会忘记的。（汤婆婆意味深长地笑了）',
    next_dialogue: 'f1_lose_name',
    player_choices: [],
  },
  {
    dialogue_key: 'f1_lose_name',
    npc_name: '汤婆婆',
    npc_text: '去吧，去工作吧。记住，你现在是"梦"。（你感觉心里空落落的，好像失去了什么重要的东西...但你已经完成了1F的旅程）',
    next_dialogue: '',
    player_choices: [
      { text: '（默然离开，心中隐隐不安）', next_key: 'f1_end', effect: { advance_floor: 2 } },
    ],
  },
  {
    dialogue_key: 'f1_refuse',
    npc_name: '汤婆婆',
    npc_text: '噢？有意思。你是第一个敢拒绝我的人。好吧，但你得记住——保持自我，不是一件容易的事。在白龙的帮助下，也许你能坚持。这层你通过了，拿着这把"自我认知之钥"去下一层吧。',
    next_dialogue: '',
    player_choices: [
      { text: '感谢汤婆婆，我会记住的', next_key: 'f1_end', effect: { advance_floor: 2 } },
    ],
  },
];

// 2F 锅炉房·汤婆婆的考验 — 锅炉爷爷
export const DIALOGUES_F2: DialogueNode[] = [
  {
    dialogue_key: 'f2_start',
    npc_name: '锅炉爷爷',
    npc_text: '咳咳...又一个新来的。汤婆婆让你来锅炉房帮忙。这里又热又闷，很少有人愿意留下来。但锅炉房的火不能灭，它维持着整个油屋的运转。你知道这火代表什么吗？',
    next_dialogue: '',
    player_choices: [
      { text: '代表内心的热情和动力？', next_key: 'f2_insight' },
      { text: '就是普通的火，烧水用的？', next_key: 'f2_mundane' },
    ],
  },
  {
    dialogue_key: 'f2_insight',
    npc_name: '锅炉爷爷',
    npc_text: '呵呵，聪明。这火就是我们的"力比多"——生命的原动力。弗洛伊德说，梦就是被压抑欲望的满足。你看到的每一簇火焰，都是你内心深处未被表达的渴望。能认识到这一点，说明你不简单。',
    next_dialogue: '',
    player_choices: [
      { text: '那我该如何面对自己的阴影？', next_key: 'f2_shadow' },
    ],
  },
  {
    dialogue_key: 'f2_mundane',
    npc_name: '锅炉爷爷',
    npc_text: '（叹了口气）年轻人，只看表面可不行。这火啊，是欲望之火，也是生命之火。每个人心里都有一座锅炉房，烧着各种各样的渴望。学会看清自己的渴望，就是心理学的第一课。',
    next_dialogue: '',
    player_choices: [
      { text: '那我该如何面对自己的阴影？', next_key: 'f2_shadow' },
    ],
  },
  {
    dialogue_key: 'f2_shadow',
    npc_name: '锅炉爷爷',
    npc_text: '阴影？哈哈哈，荣格那小子的话吧。阴影不是敌人，是被你藏起来的那部分自己。承认它，它就不再控制你；否认它，它就会在梦中反过来控制你。好了，2F你通过了。记住了，接纳完整的自己。',
    next_dialogue: '',
    player_choices: [
      { text: '谢谢锅炉爷爷的教导', next_key: 'f2_end', effect: { advance_floor: 3 } },
    ],
  },
];

// 3F 浴场·无脸男 — 无脸男
export const DIALOGUES_F3: DialogueNode[] = [
  {
    dialogue_key: 'f3_start',
    npc_name: '无脸男',
    npc_text: '......（无脸男安静地坐在角落，手里捧着金子。他似乎想说什么，但又没有脸可以表达。他只是静静地看着你，递过来一块金子。）',
    next_dialogue: '',
    player_choices: [
      { text: '（收下金子）谢谢你！', next_key: 'f3_greed' },
      { text: '（轻轻推开金子）我不需要这个。你是不是...想跟我说话？', next_key: 'f3_empathy', effect: { flag: 'empathy_shown' } },
    ],
  },
  {
    dialogue_key: 'f3_greed',
    npc_name: '无脸男',
    npc_text: '......！！！（无脸男开始变大，浑身冒出更多的金子，但表情越来越狂躁。你意识到——他一直在用金子换来关注，却越来越孤独。贪欲填不满内心的空洞。）',
    next_dialogue: '',
    player_choices: [
      { text: '对不起，请停下！我不能助长你的孤独', next_key: 'f3_rescue' },
    ],
  },
  {
    dialogue_key: 'f3_empathy',
    npc_name: '无脸男',
    npc_text: '......嗯。（无脸男慢慢收回了金子，原本模糊的脸上似乎浮现出一个淡淡的微笑。他终于被人看见了——不是因为他能给什么，而是因为他就是他自己。）',
    next_dialogue: '',
    player_choices: [
      { text: '真正的连接，不需要金子的中介', next_key: 'f3_rescue' },
    ],
  },
  {
    dialogue_key: 'f3_rescue',
    npc_name: '无脸男',
    npc_text: '......谢谢。（无脸男的身体慢慢缩小，变回了那个安静的存在。他递给你一把钥匙——"情绪辨识之钥"。能理解无脸男的人，也能读懂自己的情绪。）',
    next_dialogue: '',
    player_choices: [
      { text: '谢谢你，无脸男。我会记住你说的', next_key: 'f3_end', effect: { advance_floor: 4 } },
    ],
  },
];

// 4F 花园·河神 — 河神
export const DIALOGUES_F4: DialogueNode[] = [
  {
    dialogue_key: 'f4_start',
    npc_name: '河神',
    npc_text: '咕噜噜...我身体里塞满了垃圾。人类往河里丢了太多东西——旧家具、废电池、还有...被遗忘的梦。你能帮我清理一下吗？',
    next_dialogue: '',
    player_choices: [
      { text: '好的，我来帮你清理。先从什么开始？', next_key: 'f4_clean' },
      { text: '这些垃圾太脏了，我不想碰', next_key: 'f4_refuse' },
    ],
  },
  {
    dialogue_key: 'f4_clean',
    npc_name: '河神',
    npc_text: '就从那团最暗的垃圾开始吧。那是某个人的噩梦，在河里泡了很多年。如果你能理解它、净化它，它就会变成有用的东西。',
    next_dialogue: '',
    player_choices: [
      { text: '（伸出手，尝试感受那个噩梦）', next_key: 'f4_dream', effect: { flag: 'dream_analyzed' } },
    ],
  },
  {
    dialogue_key: 'f4_refuse',
    npc_name: '河神',
    npc_text: '哼...也是。不是每个人都有勇气触碰别人的创伤。但如果你连面对自己梦境的勇气都没有，又怎么成为梦的解析师呢？再考虑一下吧。',
    next_dialogue: '',
    player_choices: [
      { text: '好吧，我试试。从那个噩梦开始', next_key: 'f4_dream', effect: { flag: 'dream_analyzed' } },
    ],
  },
  {
    dialogue_key: 'f4_dream',
    npc_name: '河神',
    npc_text: '哗——！河神喷出水柱，那个黑色的梦物质在水中散开，变成了一颗晶莹的宝石。河神舒展了身体，整个花园都亮了起来。」啊...舒服多了。这把"梦境净化之钥"送给你。能净化他人梦境的人，也能净化自己的内心。',
    next_dialogue: '',
    player_choices: [
      { text: '感谢河神！我感觉内心也被净化了', next_key: 'f4_end', effect: { advance_floor: 5 } },
    ],
  },
];

// 5F 顶层·白龙 — 白龙
export const DIALOGUES_F5: DialogueNode[] = [
  {
    dialogue_key: 'f5_start',
    npc_name: '白龙',
    npc_text: '你来了。我等了你很久。千寻——不，你应该已经不记得这个名字了。但我记得我的名字——震早剑琥珀主。你还记得你是谁吗？',
    next_dialogue: '',
    player_choices: [
      { text: '我...我不记得了。我是"梦"吗？', next_key: 'f5_forgot' },
      { text: '我记得。我是来学习解梦的探索者', next_key: 'f5_remember' },
    ],
  },
  {
    dialogue_key: 'f5_forgot',
    npc_name: '白龙',
    npc_text: '没关系。汤婆婆偷走了你的名字，但偷不走你的本质。看——（白龙化身为巨大的龙，盘旋在空中）你收集的那些钥匙，就是你拼回自己的碎片。自我认知、情绪洞察、心灵净化...你已经是完整的了。',
    next_dialogue: '',
    player_choices: [
      { text: '那么，我真正的名字是？', next_key: 'f5_title' },
    ],
  },
  {
    dialogue_key: 'f5_remember',
    npc_name: '白龙',
    npc_text: '（白龙欣慰地笑了）很好。能记住自己是谁的人，不会被油屋吞噬。你一路走来——拒绝汤婆婆、理解无脸男、净化河神、面对锅炉爷爷——每一步都在证明你的完整。现在，是时候获得你的真名了。',
    next_dialogue: '',
    player_choices: [
      { text: '请告诉我，我真正的使命是什么？', next_key: 'f5_title' },
    ],
  },
  {
    dialogue_key: 'f5_title',
    npc_name: '白龙',
    npc_text: '你的名字是——"梦的解析师"。这不是汤婆婆给的替代品，而是你一路走来的证明。梦不是需要解答的谜题，而是需要被理解的另一个自己。从今天起，你就是能引领他人穿越梦境迷雾的存在了。',
    next_dialogue: '',
    player_choices: [
      {
        text: '谢谢你，白龙。我会用这个名字帮助更多人理解他们的梦',
        next_key: 'f5_end',
        effect: { flag: 'final_title' },
      },
    ],
  },
];

export const ALL_DIALOGUES: Record<number, DialogueNode[]> = {
  1: DIALOGUES_F1,
  2: DIALOGUES_F2,
  3: DIALOGUES_F3,
  4: DIALOGUES_F4,
  5: DIALOGUES_F5,
};
