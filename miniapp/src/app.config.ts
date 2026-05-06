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
    navigationBarTitleText: 'DreamLab',
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
        pagePath: 'pages/dream/index',
        text: '解梦',
      },
      {
        pagePath: 'pages/courses/index',
        text: '课程',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
      },
    ],
  },
})
