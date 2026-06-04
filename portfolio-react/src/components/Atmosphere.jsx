import { useEffect, useRef } from 'react'

const blobs = [
  { w: 'w-[500px] h-[500px]', top: '15%', left: '-8%', color: 'from-purple-600/6 to-fuchsia-600/4', dur: '28s', dx: '50px', dy: '-40px', delay: '0s' },
  { w: 'w-[400px] h-[400px]', top: '40%', right: '-5%', color: 'from-cyan-500/5 to-blue-500/3', dur: '24s', dx: '-40px', dy: '35px', delay: '3s' },
  { w: 'w-[350px] h-[350px]', top: '70%', left: '50%', color: 'from-fuchsia-500/4 to-purple-500/3', dur: '30s', dx: '35px', dy: '-30px', delay: '6s' },
  { w: 'w-[450px] h-[450px]', top: '90%', left: '-10%', color: 'from-violet-600/5 to-purple-600/3', dur: '26s', dx: '-45px', dy: '40px', delay: '9s' },
  { w: 'w-[300px] h-[300px]', top: '110%', right: '10%', color: 'from-blue-500/4 to-cyan-500/3', dur: '22s', dx: '30px', dy: '-25px', delay: '2s' },
]

export default function Atmosphere() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0
      el.style.setProperty('--scroll-progress', progress)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ perspective: '1px' }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute ${b.w} rounded-full bg-gradient-to-br ${b.color} blur-[120px] animate-blob-drift`}
          style={{
            top: b.top, left: b.left, right: b.right,
            '--dur': b.dur, '--drift-x': b.dx, '--drift-y': b.dy,
            '--opacity-from': '0.04', '--opacity-to': '0.12',
            animationDelay: b.delay,
            transform: `translateY(calc(var(--scroll-progress, 0) * ${80 + i * 30}px))`,
            transition: 'transform 0.15s ease-out',
          }}
        />
      ))}
    </div>
  )
}
