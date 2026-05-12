import { useRef, useEffect, useState } from 'react'
import useMousePosition from '../hooks/useMousePosition'

const hoverSelectors = [
  { sel: 'a, button, .nav-link, .social-link, .resume-btn, .btn-sm, .form-submit, .project-card, .badge', type: 'link' },
  { sel: '#splitDivider', type: 'split' },
  { sel: '.icon-btn', type: 'btn' },
]

export default function Cursor() {
  const mouse = useMousePosition()
  const ringRef = useRef(null)
  const ringPos = useRef({ x: -100, y: -100 })
  const [hoverType, setHoverType] = useState('')
  const frameRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      ringPos.current.x += (mouse.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mouse.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top = ringPos.current.y + 'px'
      }
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [mouse])

  useEffect(() => {
    const handlers = []

    hoverSelectors.forEach(({ sel, type }) => {
      document.querySelectorAll(sel).forEach(el => {
        const enter = () => setHoverType(type)
        const leave = () => setHoverType('')
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        handlers.push({ el, enter, leave })
      })
    })

    return () => {
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  const ringSize = hoverType === 'link' ? 'w-[50px] h-[50px]'
    : hoverType === 'split' ? 'w-[55px] h-[55px]'
    : hoverType === 'btn' ? 'w-[65px] h-[65px]'
    : 'w-[30px] h-[30px]'

  const ringBorder = hoverType === 'split'
    ? 'border-transparent bg-accent-creative/20'
    : hoverType === 'btn'
      ? 'border-accent-logical bg-white/8'
      : 'border-accent-logical'

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block">
      <div className="fixed w-[6px] h-[6px] bg-accent-creative rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-200"
        style={{ left: mouse.x, top: mouse.y }} />
      <div ref={ringRef}
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 border transition-all duration-300 ${ringSize} ${ringBorder}`}>
        {hoverType === 'split' && (
          <div className="w-[30px] h-[30px] border-2 border-dashed border-accent-creative/60 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </div>
  )
}
