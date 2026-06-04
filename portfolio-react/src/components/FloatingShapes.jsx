import { useState, useEffect, useRef } from 'react'

const shapes = [
  { w: 300, h: 300, t: '15%', l: '5%', color: 'bg-accent-creative', dur: 20, scrollFactor: 0.03 },
  { w: 200, h: 200, b: '20%', r: '10%', color: 'bg-accent-logical', dur: 18, scrollFactor: 0.05 },
  { w: 150, h: 150, t: '60%', l: '30%', color: 'bg-accent-creative', dur: 22, scrollFactor: 0.04 },
  { w: 100, h: 100, t: '25%', r: '25%', color: 'bg-accent-logical', dur: 16, scrollFactor: 0.06 },
  { w: 250, h: 250, b: '10%', l: '20%', color: 'bg-accent-creative', dur: 24, scrollFactor: 0.02 },
  { w: 120, h: 120, t: '10%', r: '40%', color: 'bg-accent-logical', dur: 19, scrollFactor: 0.07 },
]

export default function FloatingShapes() {
  const [offsets, setOffsets] = useState(shapes.map(() => ({ x: 0, y: 0 })))
  const scrollY = useRef(0)

  useEffect(() => {
    const handleMouse = (e) => {
      const xF = (e.clientX / window.innerWidth - 0.5) * 2
      const yF = (e.clientY / window.innerHeight - 0.5) * 2
      setOffsets(shapes.map((s, i) => ({
        x: xF * (i + 1) * 5,
        y: yF * (i + 1) * 5 + scrollY.current * s.scrollFactor,
      })))
    }

    const handleScroll = () => {
      scrollY.current = window.scrollY
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((s, i) => (
        <div key={i}
          className={`absolute rounded-full opacity-4 ${s.color} animate-shape`}
          style={{
            width: s.w,
            height: s.h,
            top: s.t,
            bottom: s.b,
            left: s.l,
            right: s.r,
            transform: `translate(${offsets[i]?.x || 0}px, ${offsets[i]?.y || 0}px)`,
            animationDuration: `${s.dur}s`,
            animationDelay: `-${i * 3}s`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
