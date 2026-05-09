export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/dream/index',
    'pages/dream/result',
    'pages/assessments/index',
    'pages/assessments/detail',
    'pages/courses/index',
    'pages/courses/detail',
    'pages/reflect/index',
    'pages/profile/index',
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#0a0a0c',
    navigationBarTitleText: '康波研究院',
    navigationBarTextStyle: 'white',
  },
  tabBar: {
    color: '#71717a',
    selectedColor: '#d4a853',
    backgroundColor: '#0a0a0c',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/assessments/index',
        text: '画像',
      },
      {
        pagePath: 'pages/courses/index',
        text: '康波课',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
      },
    ],
  },
})
