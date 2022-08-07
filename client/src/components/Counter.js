import React, { useState, useEffect } from 'react'
import Input from './Input'

const Counter = ({ onHandleCount }) => {
  const [counter, setCounter] = useState(10)

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    return () => {
      if (counter === 1) {
        onHandleCount()
      }
      clearInterval(timer)
    }
  }, [counter])

  return <Input value={counter}></Input>
}

export default Counter
