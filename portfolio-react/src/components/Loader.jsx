import { useEffect, useRef, useState } from 'react'
import logoAnkit from '../assets/im_ankit_logo.png'

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const prefersReduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const INFINITY_PATH = 'M50 30 C50 8,88 8,94 32 C100 52,78 62,58 48 C52 42,50 34,50 30 C50 8,12 8,6 32 C0 52,22 62,42 48 C48 42,50 34,50 30'

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(() => prefersReduced ? 'done' : 'loading')
  const [pct, setPct] = useState(0)
  const containerRef = useRef(null)
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
    const start = performance.now()
    if (container) container.classList.add('loader-completion')
    const tick = (now) => {
      const t = Math.min((now - start) / 600, 1)
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

  const trailBias = 80
  const dotOffset = 0
  const t4Offset = trailBias
  const t3Offset = Math.round(trailBias * 0.55)
  const t2Offset = Math.round(trailBias * 0.3)
  const t1Offset = Math.round(trailBias * 0.12)

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10001] overflow-hidden bg-bg-primary"
      style={{ color: 'var(--color-text-primary)' }}
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[240px] sm:w-[300px] md:w-[400px]">
          <svg viewBox="0 0 100 60" className="w-full h-auto" style={{ overflow: 'visible' }}>
            <defs>
              <filter id="dotGlow">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
              <filter id="trailGlow">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            {/* Background ambient glow */}
            <path d={INFINITY_PATH} stroke="currentColor" strokeWidth="14" fill="none"
              opacity={0.035 + pct * 0.0005} filter="url(#trailGlow)" />

            {/* Track */}
            <path d={INFINITY_PATH} stroke="currentColor" strokeWidth="1.2" fill="none"
              opacity={0.08 + pct * 0.0004} />

            {/* Trail layer 4 — widest, faintest */}
            <path d={INFINITY_PATH} stroke="currentColor" strokeWidth="2.8" fill="none"
              strokeLinecap="round" pathLength="400"
              strokeDasharray={`${t4Offset} ${400 - t4Offset}`}
              opacity={0.06 + pct * 0.0003}
              className="animate-inf-trail" />

            {/* Trail layer 3 */}
            <path d={INFINITY_PATH} stroke="currentColor" strokeWidth="2.2" fill="none"
              strokeLinecap="round" pathLength="400"
              strokeDasharray={`${t3Offset} ${400 - t3Offset}`}
              opacity={0.12 + pct * 0.0005}
              className="animate-inf-trail" />

            {/* Trail layer 2 */}
            <path d={INFINITY_PATH} stroke="currentColor" strokeWidth="1.8" fill="none"
              strokeLinecap="round" pathLength="400"
              strokeDasharray={`${t2Offset} ${400 - t2Offset}`}
              opacity={0.22 + pct * 0.001}
              className="animate-inf-trail" />

            {/* Trail layer 1 — tight to dot */}
            <path d={INFINITY_PATH} stroke="currentColor" strokeWidth="1.5" fill="none"
              strokeLinecap="round" pathLength="400"
              strokeDasharray={`${t1Offset} ${400 - t1Offset}`}
              opacity={0.4 + pct * 0.002}
              className="animate-inf-trail" />

            {/* Dot glow */}
            <path d={INFINITY_PATH} stroke="currentColor" strokeWidth="7" fill="none"
              strokeLinecap="round" pathLength="400"
              strokeDasharray={`${dotOffset + 0.5} ${400 - dotOffset - 0.5}`}
              opacity={0.25 + pct * 0.002} filter="url(#dotGlow)"
              className="animate-inf-dot" />

            {/* Traveling dot */}
            <path d={INFINITY_PATH} stroke="currentColor" strokeWidth="2.5" fill="none"
              strokeLinecap="round" pathLength="400"
              strokeDasharray={`${dotOffset + 1} ${400 - dotOffset - 1}`}
              opacity={0.8 + pct * 0.002}
              className="animate-inf-dot" />
          </svg>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[15%] sm:pb-[18%] pointer-events-none select-none">
        <div className="text-3xl md:text-5xl font-bold font-primary tracking-tight tabular-nums"
          style={{ color: 'var(--color-text-primary)', opacity: 0.75 + pct * 0.002 }}>
          {String(pct).padStart(3, '0')}%
        </div>
        <div className="text-[10px] md:text-xs font-secondary tracking-[4px] uppercase mt-3"
          style={{ color: 'var(--color-text-primary)', opacity: 0.25 + pct * 0.001 }}>
          Initializing System...
        </div>
      </div>

      {/* Logo watermark */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ opacity: 0.02 + pct * 0.0002 }}>
        <div className="w-16 h-auto" style={{
          aspectRatio: '1536/1024',
          background: 'currentColor',
          WebkitMaskImage: `url(${logoAnkit})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskImage: `url(${logoAnkit})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        }} />
      </div>
    </div>
  )
}
