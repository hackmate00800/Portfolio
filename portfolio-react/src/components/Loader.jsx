import { useState, useEffect } from 'react'

export default function Loader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const handle = () => setTimeout(() => setLoaded(true), 400)
    if (document.readyState === 'complete') handle()
    else window.addEventListener('load', handle)
    return () => window.removeEventListener('load', handle)
  }, [])

  return (
    <div className={`fixed inset-0 z-[10000] flex items-center justify-center bg-bg-primary transition-opacity duration-800 ${loaded ? 'opacity-0 pointer-events-none' : ''}`}>
      <div className="flex flex-col items-center gap-8">
        <div className="w-[60px] h-[60px] rounded-full border-3 border-border-glass border-t-accent-creative border-r-accent-logical animate-spin" />
        <div className="flex gap-1 font-secondary font-semibold text-lg tracking-[4px] uppercase text-text-secondary">
          {'Loading'.split('').map((c, i) => (
            <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1.4s' }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
