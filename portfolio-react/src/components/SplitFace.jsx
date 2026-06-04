import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { motion } from 'framer-motion'
import creativeSrc from '../assets/creative.png'
import logicSrc from '../assets/logic.png'

const SplitFace = forwardRef(function SplitFace(_, ref) {
  const frontRef = useRef(null)
  const dividerRef = useRef(null)
  const containerRef = useRef(null)
  const targetPct = useRef(50)
  const currentPct = useRef(50)
  const isDragging = useRef(false)
  const frameRef = useRef(null)

  useImperativeHandle(ref, () => ({
    expandLeft: () => { targetPct.current = 100 },
    expandRight: () => { targetPct.current = 0 },
    resetPct: () => { if (!isDragging.current) targetPct.current = 50 },
  }))

  useEffect(() => {
    const tick = () => {
      currentPct.current += (targetPct.current - currentPct.current) * 0.08
      const p = currentPct.current
      if (frontRef.current) frontRef.current.style.width = p + '%'
      if (dividerRef.current) dividerRef.current.style.left = p + '%'
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  useEffect(() => {
    const div = dividerRef.current
    const cont = containerRef.current
    if (!div || !cont) return

    const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX)

    const onStart = (e) => {
      isDragging.current = true
      e.preventDefault()
    }

    const onMove = (e) => {
      if (!isDragging.current) return
      const rect = cont.getBoundingClientRect()
      targetPct.current = Math.max(0, Math.min(100, ((getX(e) - rect.left) / rect.width) * 100))
    }

    const onEnd = () => { isDragging.current = false }

    div.addEventListener('mousedown', onStart)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onEnd)
    div.addEventListener('touchstart', onStart, { passive: false })
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)

    return () => {
      div.removeEventListener('mousedown', onStart)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onEnd)
      div.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-[420px] h-[520px] max-md:w-[320px] max-md:h-[420px] max-sm:w-[280px] max-sm:h-[370px] flex-shrink-0 rounded-[20px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4),0_0_80px_var(--color-accent-creative-glow)] hover:shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_100px_var(--color-accent-creative-glow)] transition-shadow duration-500 group">
      {/* Back face — Logical Developer */}
      <div className="absolute inset-0 z-1 noise-overlay overflow-hidden">
        <motion.img
          src={logicSrc} alt="Logical Developer"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeOut' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-primary/60 pointer-events-none" />
      </div>

      {/* Front face — Creative Designer */}
      <div ref={frontRef} className="absolute inset-0 z-2 overflow-hidden noise-overlay" style={{ width: '50%' }}>
        <motion.img
          src={creativeSrc} alt="Creative Designer"
          className="absolute top-0 left-0 h-full object-cover"
          style={{ width: '420px', maxWidth: 'none' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeOut' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-primary/60 pointer-events-none" />
      </div>

      {/* Draggable Divider */}
      <div ref={dividerRef} id="splitDivider"
        className="absolute inset-y-0 z-5 touch-none"
        style={{ left: '50%', width: '3px', transform: 'translateX(-50%)', cursor: 'ew-resize' }}>
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-border-glass transition-all duration-300 group-hover:w-[3px] group-hover:bg-text-primary/60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass backdrop-blur-sm border-2 border-border-glass flex items-center justify-center text-text-secondary text-xs transition-all duration-300 shadow-lg group-hover:w-11 group-hover:h-11 group-hover:border-text-primary/60 group-hover:bg-bg-glass group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h.01M12 7h.01M16 7h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[60px] bg-gradient-to-r from-transparent via-accent-creative/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none blur-xl" />
      </div>

      {/* Center text */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-6 flex items-center gap-2.5 glass backdrop-blur-md px-5 py-2.5 rounded-full border-border-glass whitespace-nowrap pointer-events-none">
        <span className="text-[0.7rem] font-semibold tracking-[1px] uppercase text-text-primary/90">Creative Mind</span>
        <span className="text-sm text-accent-creative font-bold">+</span>
        <span className="text-[0.7rem] font-semibold tracking-[1px] uppercase text-text-primary/90">Logical Thinking</span>
      </div>
    </div>
  )
})

export default SplitFace
