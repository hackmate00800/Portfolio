import { useEffect, useRef, useState } from 'react'
import logoAnkit from '../assets/im_ankit_logo.png'

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const prefersReduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(() => prefersReduced ? 'done' : 'loading')
  const [pct, setPct] = useState(0)
  const containerRef = useRef(null)
  const glowRef = useRef(null)
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
      const t = Math.min((now - start) / 3000, 1)
      setPct(Math.round(easeInOutCubic(t) * 100))
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setPct(100)
        setPhase('completion')
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [phase])

  useEffect(() => {
    if (phase !== 'completion') return
    const container = containerRef.current
    const glow = glowRef.current
    const start = performance.now()
    if (container) container.classList.add('loader-completion')
    const tick = (now) => {
      const t = Math.min((now - start) / 600, 1)
      const eased = easeInOutCubic(t)
      if (glow) {
        glow.style.transform = `scale(${1 + eased * 0.25})`
        glow.style.opacity = `${1 - eased * 0.3}`
      }
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setPhase('reveal')
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [phase])

  useEffect(() => {
    if (phase !== 'reveal') return
    const container = containerRef.current
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / 800, 1)
      const eased = easeInOutCubic(t)
      if (container) container.style.opacity = `${1 - eased}`
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
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10001] overflow-hidden bg-bg-primary"
    >
      {/* Energy core */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="relative w-[500px] h-[500px]">
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-full animate-core-pulse"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.12) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(217,70,239,0.08) 0%, transparent 60%), radial-gradient(circle at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)',
              filter: 'blur(40px)',
              willChange: 'transform, opacity',
            }}
          />
          <div className="absolute inset-[10%] rounded-full animate-core-breath"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 50%)',
              filter: 'blur(60px)',
            }}
          />
        </div>
      </div>

      {/* Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute rounded-full border border-purple-500/20 animate-ring-1" style={{ width: 300, height: 300 }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400/60 shadow-[0_0_6px_rgba(168,85,247,0.5)]" />
        </div>
        <div className="absolute rounded-full border border-fuchsia-500/15 animate-ring-2" style={{ width: 240, height: 240 }}>
          <div className="absolute inset-[3px] rounded-full border border-dashed border-fuchsia-500/10" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-fuchsia-400/60 shadow-[0_0_6px_rgba(217,70,239,0.5)]" />
        </div>
        <div className="absolute rounded-full animate-ring-3" style={{ width: 180, height: 180 }}>
          <div className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(6,182,212,0.25) 15deg, transparent 30deg, transparent 360deg)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 48%, black 49%, black 100%)',
              maskImage: 'radial-gradient(circle, transparent 48%, black 49%, black 100%)',
            }}
          />
          <div className="absolute inset-[2px] rounded-full border border-cyan-500/10" />
        </div>
      </div>

      {/* Scan beam */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="relative w-72 h-72 animate-scan-beam" style={{ opacity: 0.08 }}>
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ top: '-1px' }} />
        </div>
      </div>

      {/* Logo + text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none">
        <div className="relative w-32 sm:w-40 md:w-48" style={{ aspectRatio: '1536/1024' }}>
          <div className="absolute inset-[-20%] rounded-full animate-core-glow"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.2) 0%, rgba(217,70,239,0.1) 30%, transparent 60%)',
              filter: 'blur(15px)',
            }}
          />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, hsl(270,80%,60%) 0%, hsl(300,70%,55%) 30%, hsl(330,65%,50%) 60%, hsl(190,80%,55%) 100%)',
            WebkitMaskImage: `url(${logoAnkit})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: `url(${logoAnkit})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            filter: `drop-shadow(0 0 ${20 + pct * 0.5}px rgba(168,85,247,${0.15 + pct * 0.005})) drop-shadow(0 0 ${10 + pct * 0.3}px rgba(217,70,239,${0.1 + pct * 0.003}))`,
            willChange: 'filter',
          }} />
        </div>

        <div className="text-2xl md:text-4xl font-bold font-primary text-white/90 tracking-tight tabular-nums">
          {String(pct).padStart(3, '0')}%
        </div>

        <div className="text-[10px] md:text-xs font-secondary text-white/40 tracking-[4px] uppercase">
          Initializing System...
        </div>

        <svg className="w-10 h-10 md:w-12 md:h-12 -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="17" fill="none" stroke="url(#progressGrad)" strokeWidth="1.5"
            strokeLinecap="round" strokeDasharray={`${pct * 1.068} 106.8`}
            style={{ transition: 'stroke-dasharray 0.1s ease' }}
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none" style={{ background: 'radial-gradient(circle at 0% 0%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, rgba(217,70,239,0.05) 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none" style={{ background: 'radial-gradient(circle at 0% 100%, rgba(6,182,212,0.04) 0%, transparent 60%)' }} />
    </div>
  )
}
