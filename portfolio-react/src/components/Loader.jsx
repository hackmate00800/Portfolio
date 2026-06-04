import { useEffect, useRef, useState } from 'react'
import logoAnkit from '../assets/im_ankit_logo.png'

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const prefersReduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const PI2 = Math.PI * 2

function createOrbitParticles(cx, cy, count) {
  const colors = ['270', '300', '330', '190']
  return Array.from({ length: count }, (_, i) => ({
    angle: (i / count) * PI2 + Math.random() * 0.3,
    radius: 80 + Math.random() * 120,
    speed: (0.3 + Math.random() * 0.7) * (Math.random() > 0.5 ? 1 : -1),
    size: 1.5 + Math.random() * 2.5,
    color: colors[i % colors.length],
    opacity: 0.2 + Math.random() * 0.6,
    trail: [],
    cx,
    cy,
  }))
}

function createBgParticles(w, h, count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.15,
    size: 0.5 + Math.random() * 1.2,
    opacity: 0.05 + Math.random() * 0.1,
  }))
}

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(() => prefersReduced ? 'done' : 'loading')
  const [pct, setPct] = useState(0)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const glowRef = useRef(null)
  const contentRef = useRef(null)
  const frameRef = useRef(null)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  const phaseRef = useRef(phase)
  onCompleteRef.current = onComplete

  phaseRef.current = phase

  /* ── done effect ── */
  useEffect(() => {
    if (phase !== 'done' || doneRef.current) return
    doneRef.current = true
    document.documentElement.setAttribute('data-loaded', 'true')
    onCompleteRef.current?.()
  }, [phase])

  /* ── counter animation ── */
  useEffect(() => {
    if (phase !== 'loading') return
    const start = performance.now()
    const DURATION = 3000
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
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

  /* ── completion: rings accelerate, particles explode, glow peaks ── */
  useEffect(() => {
    if (phase !== 'completion') return
    const container = containerRef.current
    const glow = glowRef.current
    const start = performance.now()
    const DURATION = 600

    if (container) container.classList.add('loader-completion')

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
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

  /* ── reveal: dissolve loader ── */
  useEffect(() => {
    if (phase !== 'reveal') return
    const container = containerRef.current
    const canvas = canvasRef.current
    const start = performance.now()
    const DURATION = 800

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
      const eased = easeInOutCubic(t)
      if (container) container.style.opacity = `${1 - eased}`
      if (canvas) canvas.style.opacity = `${1 - eased}`
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setPhase('done')
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [phase])

  /* ── canvas particle loop (uses phaseRef, never restarts) ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReduced) return
    const ctx = canvas.getContext('2d')

    let animId
    let lastTime = 0
    let orbitP = []
    let bgP = []
    let initialResize = true

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
      const cx = w / 2
      const cy = h / 2
      const isMobile = w < 768
      if (initialResize) {
        orbitP = createOrbitParticles(cx, cy, isMobile ? 8 : 14)
        bgP = createBgParticles(w, h, isMobile ? 20 : 40)
        initialResize = false
      } else {
        for (const p of orbitP) { p.cx = cx; p.cy = cy }
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = (now) => {
      const dt = lastTime ? Math.min((now - lastTime) / 16.67, 3) : 1
      lastTime = now
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const currentPhase = phaseRef.current

      /* bg particles */
      const revealStart = performance.now()
      for (const p of bgP) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
        const alpha = currentPhase === 'reveal'
          ? p.opacity * (1 - Math.min((revealStart - 0) / 800, 1))
          : p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, PI2)
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`
        ctx.fill()
      }

      /* orbit particles */
      const cx = w / 2
      const cy = h / 2
      const completionFactor = currentPhase === 'completion'
        ? Math.min((revealStart - 0) / 600, 1)
        : currentPhase === 'reveal' ? 1 : 0
      const explodeRadius = completionFactor * 300
      const fadeAlpha = currentPhase === 'reveal'
        ? 1 - Math.min((revealStart - 0) / 800, 1)
        : currentPhase === 'completion'
          ? 1 - completionFactor * 0.5
          : 1

      for (const p of orbitP) {
        p.angle += p.speed * 0.02 * dt
        const r = p.radius + explodeRadius
        const x = cx + Math.cos(p.angle) * r
        const y = cy + Math.sin(p.angle) * r
        p.trail.push({ x, y })
        if (p.trail.length > 6) p.trail.shift()

        const alpha = p.opacity * fadeAlpha

        if (p.trail.length > 1) {
          ctx.beginPath()
          for (let i = 0; i < p.trail.length; i++) {
            const t = p.trail[i]
            if (i === 0) ctx.moveTo(t.x, t.y)
            else ctx.lineTo(t.x, t.y)
          }
          ctx.strokeStyle = `hsla(${p.color}, 70%, 60%, ${alpha * 0.15})`
          ctx.lineWidth = p.size * 0.6
          ctx.stroke()
        }

        const glowR = p.size * 4
        const grd = ctx.createRadialGradient(x, y, 0, x, y, glowR)
        grd.addColorStop(0, `hsla(${p.color}, 80%, 70%, ${alpha * 0.4})`)
        grd.addColorStop(1, `hsla(${p.color}, 80%, 70%, 0)`)
        ctx.beginPath()
        ctx.arc(x, y, glowR, 0, PI2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, PI2)
        ctx.fillStyle = `hsla(${p.color}, 80%, 75%, ${alpha})`
        ctx.fill()
      }

      if (currentPhase !== 'done') {
        animId = requestAnimationFrame(draw)
      }
    }
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10001] overflow-hidden bg-bg-primary"
      style={{ transition: 'opacity 0.15s ease' }}
    >
      {/* Canvas particle layer */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" style={{ transition: 'opacity 0.15s ease' }} />

      {/* Energy core background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="relative w-[500px] h-[500px]">
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-full animate-core-pulse"
            style={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.12) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(217,70,239,0.08) 0%, transparent 60%)',
                'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)',
              ].join(','),
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

      {/* Rotating technology rings */}
      <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center">
        {/* Ring 1 — slow clockwise */}
        <div className="absolute rounded-full border border-purple-500/20 animate-ring-1"
          style={{ width: 300, height: 300 }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400/60 shadow-[0_0_6px_rgba(168,85,247,0.5)]" />
        </div>

        {/* Ring 2 — medium counter-clockwise */}
        <div className="absolute rounded-full border border-fuchsia-500/15 animate-ring-2"
          style={{ width: 240, height: 240 }}>
          <div className="absolute inset-[3px] rounded-full border border-dashed border-fuchsia-500/10" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-fuchsia-400/60 shadow-[0_0_6px_rgba(217,70,239,0.5)]" />
        </div>

        {/* Ring 3 — fast scanning radar */}
        <div className="absolute rounded-full animate-ring-3"
          style={{ width: 180, height: 180 }}>
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

      {/* AI Scan beam — sweeps periodically */}
      <div ref={scanCountRef} className="absolute inset-0 z-[2] pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="relative w-72 h-72 animate-scan-beam"
          style={{ opacity: 0.08 }}>
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </div>
      </div>

      {/* Center logo + loading text */}
      <div ref={contentRef} className="absolute inset-0 z-[3] flex flex-col items-center justify-center gap-5 pointer-events-none">
        {/* Logo with energy glow */}
        <div className="relative w-32 sm:w-40 md:w-48" style={{ aspectRatio: '1536/1024' }}>
          {/* Inner core glow */}
          <div className="absolute inset-[-20%] rounded-full animate-core-glow"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.2) 0%, rgba(217,70,239,0.1) 30%, transparent 60%)',
              filter: 'blur(15px)',
            }}
          />
          {/* Logo */}
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

        {/* Percentage */}
        <div className="text-2xl md:text-4xl font-bold font-primary text-white/90 tracking-tight tabular-nums">
          {String(pct).padStart(3, '0')}%
        </div>

        {/* Sub-label */}
        <div className="text-[10px] md:text-xs font-secondary text-white/40 tracking-[4px] uppercase">
          Initializing System...
        </div>

        {/* Circular progress */}
        <svg className="w-10 h-10 md:w-12 md:h-12 -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="17" fill="none" stroke="url(#progressGrad)" strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={`${pct * 1.068} 106.8`}
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

      {/* Corner accent lights */}
      <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 0% 0%, rgba(168,85,247,0.06) 0%, transparent 60%)',
        }}
      />
      <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 100% 0%, rgba(217,70,239,0.05) 0%, transparent 60%)',
        }}
      />
      <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 0% 100%, rgba(6,182,212,0.04) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}
