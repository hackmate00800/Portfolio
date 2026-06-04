import { useState, useEffect, useRef } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import useTheme from '../hooks/useTheme'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
]

const socials = [
  { icon: FaGithub, href: 'https://github.com/hackmate00800', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/ankit-singh-3ab014391', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://www.instagram.com/_hack_mate_', label: 'Instagram' },
]

export default function Navbar({ loaded = false }) {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const navRef = useRef(null)
  const bgRef = useRef(null)
  const ticking = useRef(false)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(() => {
          const y = window.scrollY
          const opacity = Math.min(y / 120, 1)
          bg.style.setProperty('--nav-bg-opacity', String(opacity))
          ticking.current = false
        })
      }

      for (const { href } of links) {
        const el = document.querySelector(href)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(href)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Mobile menu backdrop */}
      {menuOpen && (
        <div
          className="fixed left-0 right-0 z-[9998] bg-black/40 backdrop-blur-sm"
          style={{ top: '64px', bottom: 0 }}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9999]"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          willChange: 'opacity',
        }}
      >
        <div
          ref={bgRef}
          className="px-6 backdrop-blur-xl"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-nav-bg) calc(60% + 35% * var(--nav-bg-opacity, 0)), transparent)',
            transition: 'background-color 0.3s ease',
          }}
        >
          <nav className="max-w-[1280px] mx-auto flex items-center justify-between h-16">
            <button
              onClick={() => scrollTo('#hero')}
              className="text-lg font-bold flex items-center gap-0 tracking-tight"
              aria-label="Scroll to top"
            >
              <span className="text-accent-logical/60 font-light">&lt;</span>
              <span className="text-text-primary">ankit</span>
              <span className="text-accent-logical/60 font-light">&nbsp;/&gt;</span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              {links.map(({ href, label }) => (
                <button key={href} onClick={() => scrollTo(href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                    active === href ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                  aria-current={active === href ? 'true' : undefined}
                >
                  {label}
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full gradient-accent transition-all duration-300 ${
                    active === href ? 'w-[60%]' : 'w-0'
                  }`} />
                </button>
              ))}

              <div className="w-px h-5 mx-1 bg-border-glass" />

              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary transition-all duration-300 hover:bg-bg-card"
                  aria-label={label}>
                  <Icon size={14} />
                </a>
              ))}

              <button onClick={toggle}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-card transition-all duration-300 ml-1"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                {theme === 'dark' ? <FiMoon size={14} /> : <FiSun size={14} />}
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button onClick={toggle}
                className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary glass hover:text-text-primary hover:bg-bg-card transition-all duration-300"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                {theme === 'dark' ? <FiMoon size={16} /> : <FiSun size={16} />}
              </button>
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="flex flex-col gap-[5px] p-2 w-10 h-10 items-center justify-center"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span className={`block w-5 h-[2px] bg-text-primary rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block w-5 h-[2px] bg-text-primary rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-[2px] bg-text-primary rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" role="menu"
          className={`bg-nav-bg/95 backdrop-blur-xl overflow-hidden transition-all duration-300 border-b border-border-glass ${
            menuOpen ? 'max-h-[500px] px-6 py-4' : 'max-h-0 px-6 py-0'
          }`}>
          <div className="flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <button key={href} onClick={() => scrollTo(href)} role="menuitem"
                className="py-3 px-4 rounded-lg text-base font-medium text-text-secondary hover:bg-bg-card hover:text-text-primary transition-all text-left">
                {label}
              </button>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-border-glass">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" role="menuitem"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300"
                  aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
