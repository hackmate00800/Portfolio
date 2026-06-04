import { useState, useEffect, useCallback } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    setMounted(true)
  }, [theme])

  const toggle = useCallback(() => {
    const html = document.documentElement
    html.classList.add('is-transitioning')
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
    setTimeout(() => html.classList.remove('is-transitioning'), 450)
  }, [])

  return { theme, toggle, mounted }
}
