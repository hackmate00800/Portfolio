import { useEffect, useRef } from 'react'

export default function ScrollGradient() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const p = window.scrollY / maxScroll
      const hue1 = 270 + p * 160
      const hue2 = 320 + p * 100
      el.style.setProperty('--hue1', hue1 % 360)
      el.style.setProperty('--hue2', hue2 % 360)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div ref={ref} className="scroll-gradient" />
}
