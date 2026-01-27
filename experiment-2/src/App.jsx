import { useState } from 'react'
import './App.css'
import SinglePageApp from './components/Spa'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
     <SinglePageApp />
    </>
  )
}

export default App
