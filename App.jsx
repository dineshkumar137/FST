import { useState } from 'react'

import './App.css'
import Header from './Header'
import MainPage from './mainpage'
import Post from './Posthouse'


function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <Header/>
      <MainPage/> 
    </>
  )
}

export default App
