import { FC, useEffect, useState } from 'react'

interface Props {
  text: string
}

export const TypingEffect: FC<Props> = ({ text = '' }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (text.length <= 0) return

    const randomTime = Math.floor(Math.random() * 40) + 15

    const intervalId = window.setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(intervalId)
        setShowCursor(false)
      }

      const nextIndex = text.indexOf(' ', currentIndex + 1)
      if (nextIndex < 0) {
        setDisplayText(text)
        setCurrentIndex(text.length)
        return
      }
      setDisplayText(text.slice(0, nextIndex))
      setCurrentIndex(currentIndex + 1)
    }, randomTime)

    return () => clearInterval(intervalId)
  }, [text, currentIndex])

  return (
    <span
      className={`${
        showCursor ? 'after:content-["▋"] after:ml-1 after:animate-typing' : ''
      }`}
    >
      {displayText}
    </span>
  )
}
