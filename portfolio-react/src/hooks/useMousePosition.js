import { useRef, useEffect } from 'react'

export default function useMousePosition() {
  const ref = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const handle = (e) => {
      ref.current.x = e.clientX
      ref.current.y = e.clientY
    }
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return ref
}
