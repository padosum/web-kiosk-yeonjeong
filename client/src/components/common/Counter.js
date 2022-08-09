import React, { useState, useEffect } from 'react'
import Input from './Input'

const Counter = ({ seconds, stop, onTimeout }) => {
  const [counter, setCounter] = useState(seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!stop) {
        if (counter > 0) {
          setCounter(counter - 1)
        } else {
          onTimeout()
        }
      } else {
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [counter])

  return <Input value={counter}></Input>
}

export default Counter
