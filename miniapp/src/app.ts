import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.scss'

function App({ children }: PropsWithChildren<object>) {
  useLaunch(() => {
    console.log('康波研究院 MiniApp launched')
  })

  return children
}

export default App
