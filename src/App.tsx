import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { formatDate, randomColor } from './utils'

function App() {
  const [count, setCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [bgColor, setBgColor] = useState('#ffffff')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const changeBackgroundColor = () => {
    setBgColor(randomColor())
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <div className="card" style={{ backgroundColor: bgColor, padding: '20px', marginTop: '20px' }}>
        <h2>工具函数演示</h2>
        <p>当前时间: {formatDate(currentTime)}</p>
        <p>格式化时间 (YYYY年MM月DD日): {formatDate(currentTime, 'YYYY年MM月DD日')}</p>
        <button onClick={changeBackgroundColor}>
          更换背景颜色 (随机颜色生成)
        </button>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
