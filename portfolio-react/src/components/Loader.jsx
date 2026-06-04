import { useEffect, useRef, useState } from 'react'
import logoAnkit from '../assets/im_ankit_logo.png'

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const prefersReduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(() => prefersReduced ? 'done' : 'loading')
  const [pct, setPct] = useState(0)
  const contentRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const frameRef = useRef(null)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (phase !== 'done' || doneRef.current) return
    doneRef.current = true
    document.documentElement.setAttribute('data-loaded', 'true')
    onCompleteRef.current?.()
  }, [phase])

  useEffect(() => {
    if (phase !== 'loading') return
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / 2500, 1)
      setPct(Math.round(easeInOutCubic(t) * 100))
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setPhase('pause')
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [phase])

  useEffect(() => {
    if (phase !== 'pause') return
    const t = setTimeout(() => setPhase('reveal'), 350)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'reveal') return
    if (contentRef.current) contentRef.current.style.opacity = '0'
    const left = leftRef.current
    const right = rightRef.current
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / 700, 1)
      const p = easeInOutCubic(t) * 100
      if (left) left.style.transform = `translateX(-${p}%)`
      if (right) right.style.transform = `translateX(${p}%)`
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setPhase('done')
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [phase])

  if (phase === 'done') return null

  return (
    <div className="fixed inset-0 z-[10001] overflow-hidden">
      <div ref={leftRef} className="absolute top-0 left-0 w-1/2 h-full bg-bg-primary z-0" />
      <div ref={rightRef} className="absolute top-0 right-0 w-1/2 h-full bg-bg-primary z-0" />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-600/[0.06] blur-[120px] -top-32 -left-32 animate-pulse-slow" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-fuchsia-600/[0.05] blur-[100px] -bottom-32 -right-32 animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      <div ref={contentRef} className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-5" style={{ transition: 'opacity 400ms ease' }}>
        <div className="w-48 sm:w-56 md:w-64" style={{
          aspectRatio: '1536/1024',
          background: 'radial-gradient(circle at 50% 50%, hsl(270,80%,60%) 0%, hsl(300,70%,55%) 30%, hsl(330,65%,50%) 60%, hsl(190,80%,55%) 100%)',
          WebkitMaskImage: `url(${logoAnkit})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskImage: `url(${logoAnkit})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          filter: `drop-shadow(0 0 ${15 + pct * 0.15}px rgba(168,85,247,${0.1 + pct * 0.003}))`,
        }} />

        <div className="text-3xl md:text-4xl font-bold font-primary text-text-primary/90 tracking-tight">
          {pct}%
        </div>

        <div className="text-xs md:text-sm font-secondary text-text-muted tracking-[3px] uppercase">
          Loading Experience...
        </div>

        <div className="w-48 md:w-56 h-[2px] bg-border-glass rounded-full overflow-hidden shadow-[0_0_8px_rgba(168,85,247,0.15)]">
          <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 origin-left will-change-transform" style={{
            transform: `scaleX(${pct / 100})`,
            boxShadow: '0 0 12px rgba(168,85,247,0.5)',
          }} />
        </div>
      </div>
    </div>
  )
}
