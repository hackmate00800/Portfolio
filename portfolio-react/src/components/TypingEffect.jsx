import { useState, useEffect, useRef } from 'react'

const words = ['Creative Designer', 'Full-Stack Developer', 'UI/UX Enthusiast', 'Code Mentor', 'Problem Solver']

export default function TypingEffect() {
  const [text, setText] = useState('')
  const idxRef = useRef(0)
  const charRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    let timer
    const tick = () => {
      const word = words[idxRef.current]
      if (deletingRef.current) {
        charRef.current--
        setText(word.substring(0, charRef.current))
      } else {
        charRef.current++
        setText(word.substring(0, charRef.current))
      }

      if (!deletingRef.current && charRef.current === word.length) {
        deletingRef.current = true
        timer = setTimeout(tick, 1800)
        return
      }
      if (deletingRef.current && charRef.current === 0) {
        deletingRef.current = false
        idxRef.current = (idxRef.current + 1) % words.length
      }
      timer = setTimeout(tick, deletingRef.current ? 40 : 80)
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span>
      {text}<span className="text-accent-creative animate-blink font-light">|</span>
    </span>
  )
}
