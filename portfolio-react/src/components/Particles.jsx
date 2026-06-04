import { useRef, useEffect } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let parts = []
    let frame

    const getColor = () => {
      const tmp = getComputedStyle(document.documentElement).getPropertyValue('--color-text-muted').trim()
      if (tmp.startsWith('#')) {
        const r = parseInt(tmp.slice(1, 3), 16); const g = parseInt(tmp.slice(3, 5), 16); const b = parseInt(tmp.slice(5, 7), 16)
        return { r, g, b }
      }
      return { r: 136, g: 136, b: 160 }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = 60
    for (let i = 0; i < count; i++) {
      parts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { r, g, b } = getColor()
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`
        ctx.fill()
      }
      frame = requestAnimationFrame(animate)
    }
    animate()

    const observer = new MutationObserver(() => {})
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-1" />
}
