import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import creativeSrc from '../assets/bannerimg.png'
import logoAnkit from '../assets/im_ankit_logo.png'

const floatingBubbles = Array.from({ length: 14 }, () => ({
  size: 20 + Math.random() * 60,
  x: Math.random() * 100,
  y: Math.random() * 100,
  dur: 10 + Math.random() * 12,
  delay: Math.random() * -10,
  dx: (Math.random() - 0.5) * 40,
  dy: (Math.random() - 0.5) * 40,
}))

const particles = Array.from({ length: 40 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1.5 + Math.random() * 3,
  delay: Math.random() * 12,
  dur: 5 + Math.random() * 6,
  yOff: -(25 + Math.random() * 25),
}))

const orbitDroplets = [
  { size: 'w-11 h-11', top: '-3%', right: '2%', dx: 12, dy: -16, delay: 0.2, dur: 6 },
  { size: 'w-8 h-8', bottom: '2%', left: '-2%', dx: -10, dy: 12, delay: 1.2, dur: 5.5 },
  { size: 'w-6 h-6', top: '6%', left: '-5%', dx: -6, dy: -10, delay: 2.0, dur: 7 },
  { size: 'w-9 h-9', bottom: '5%', right: '-3%', dx: 8, dy: -8, delay: 2.8, dur: 5 },
  { size: 'w-5 h-5', top: '30%', right: '-5%', dx: 14, dy: 6, delay: 1.5, dur: 6.5 },
  { size: 'w-7 h-7', bottom: '35%', left: '-6%', dx: -12, dy: -14, delay: 3.2, dur: 5.5 },
]

export default function Banner() {
  const blobRef = useRef(null)
  const cardRef = useRef(null)
  const textGradientRef = useRef(null)
  const ticking = useRef(false)
  const logoRef = useRef(null)
  const glowRef = useRef(null)
  const glowTimeoutRef = useRef(null)


  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2
          const y = (e.clientY / window.innerHeight - 0.5) * 2
          if (blobRef.current) {
            blobRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`
          }
          if (cardRef.current) {
            cardRef.current.style.transform = `perspective(1000px) rotateX(${y * 8}deg) rotateY(${x * -8}deg)`
          }
          ticking.current = false
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const el = textGradientRef.current
    if (!el) return
    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const p = window.scrollY / maxScroll
      el.style.setProperty('--text-h1', (270 + p * 160) % 360)
      el.style.setProperty('--text-h2', (320 + p * 100) % 360)
      el.style.setProperty('--text-h3', (300 + p * 130) % 360)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const logo = logoRef.current
    const glow = glowRef.current
    if (!logo || !glow) return

    const handleMove = (e) => {
      const rect = logo.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      glow.style.setProperty('--gx', `${x}%`)
      glow.style.setProperty('--gy', `${y}%`)
      glow.style.opacity = '1'
      if (glowTimeoutRef.current) {
        clearTimeout(glowTimeoutRef.current)
        glowTimeoutRef.current = null
      }
    }

    const handleLeave = () => {
      glowTimeoutRef.current = setTimeout(() => {
        if (glow) glow.style.opacity = '0'
      }, 300)
    }

    logo.addEventListener('mousemove', handleMove, { passive: true })
    logo.addEventListener('mouseleave', handleLeave, { passive: true })

    return () => {
      logo.removeEventListener('mousemove', handleMove)
      logo.removeEventListener('mouseleave', handleLeave)
      if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current)
    }
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full h-dvh overflow-hidden bg-bg-primary flex items-center contain-layout">
      {/* Deep background layers */}
      <div ref={blobRef} className="absolute inset-0 transition-transform duration-200 ease-out pointer-events-none will-change-transform">
        <div className="absolute w-[1000px] h-[1000px] rounded-full bg-[#6d28d9]/10 blur-[180px] -top-64 -left-48 animate-pulse-slow" />
        <div className="absolute w-[800px] h-[800px] rounded-full bg-[#4c1d95]/15 blur-[150px] -bottom-40 -right-32 animate-pulse-slow" style={{ animationDelay: '6s' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#9333ea]/10 blur-[130px] top-1/3 left-1/3 animate-pulse-slow" style={{ animationDelay: '10s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#a21caf]/8 blur-[110px] top-1/4 right-1/4 animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute w-[700px] h-[700px] rounded-full bg-[#7c3aed]/8 blur-[140px] bottom-1/4 left-1/5 animate-pulse-slow" style={{ animationDelay: '8s' }} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-transparent to-bg-primary/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/30 via-transparent to-bg-primary/30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg-primary/60 to-transparent pointer-events-none z-10" />

      {/* Floating transparent bubbles - CSS animated */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingBubbles.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-white/[0.03] via-fuchsia-500/[0.02] to-purple-600/[0.03] border border-border-glass animate-bubble"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.x}%`,
              top: `${b.y}%`,
              '--dx': `${b.dx}px`,
              '--dy': `${b.dy}px`,
              '--dur': `${b.dur}s`,
              '--delay': `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating particles - CSS animated */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-text-muted animate-particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              '--y-off': `${p.yOff}px`,
              '--dur': `${p.dur}s`,
              '--delay': `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative wave curves - SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="70%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d="M0,50 Q50,0 100,50 T200,50 T300,50 T400,50" fill="none" stroke="url(#waveGrad)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" opacity="0.06" className="animate-pulse-opacity" style={{ top: '15%', position: 'absolute', '--dur': '6s' }} />
          <path d="M0,30 Q40,60 80,30 T160,30 T240,30 T320,30" fill="none" stroke="url(#waveGrad)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" opacity="0.04" className="animate-pulse-opacity" style={{ top: '30%', position: 'absolute', '--dur': '7s', animationDelay: '2s' }} />
          <path d="M0,70 Q60,20 120,70 T240,70 T360,70 T480,70" fill="none" stroke="url(#waveGrad)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" opacity="0.05" className="animate-pulse-opacity" style={{ top: '55%', position: 'absolute', '--dur': '8s', animationDelay: '4s' }} />
          <path d="M0,40 Q30,80 60,40 T120,40 T180,40 T240,40" fill="none" stroke="url(#waveGrad)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" opacity="0.03" className="animate-pulse-opacity" style={{ top: '75%', position: 'absolute', '--dur': '6s', animationDelay: '1s' }} />
        </svg>
      </div>

      {/* Neon glow ring accents - CSS animated */}
      <div className="animate-ring absolute w-[500px] h-[500px] rounded-full border border-purple-500/5 pointer-events-none" style={{ top: '20%', left: '55%', '--dur': '40s', '--s': '1.05' }} />
      <div className="animate-ring-reverse absolute w-[350px] h-[350px] rounded-full border border-fuchsia-500/5 pointer-events-none" style={{ top: '25%', left: '58%', '--dur': '30s' }} />

      {/* Main content - two column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-20 pt-16 pb-10 md:py-0">

        {/* Left column - Introduction text */}
        <motion.div
          ref={textGradientRef}
          className="flex-1 text-center md:text-left max-md:mt-4"
          style={{ '--text-h1': 270, '--text-h2': 320, '--text-h3': 300 }}
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Decorative sparkles */}
          <motion.svg
            className="absolute -top-2 -left-4 w-6 h-6 text-purple-400/60"
            viewBox="0 0 24 24"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <path d="M12 0l1.5 9.5L23 7l-6.5 6 5.5 9.5L12 18l-10 4.5L7.5 13 1 7l9.5 2.5z" />
          </motion.svg>
          <motion.svg
            className="absolute -top-1 -right-3 w-5 h-5 text-fuchsia-400/50 rotate-45"
            viewBox="0 0 24 24"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 45 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          >
            <path d="M12 0l1.5 9.5L23 7l-6.5 6 5.5 9.5L12 18l-10 4.5L7.5 13 1 7l9.5 2.5z" />
          </motion.svg>

          <div className="pt-0 md:pt-16 mb-0 md:-mb-16">
            <motion.div className="relative inline-block">
              <motion.p
                className="font-['Caveat',cursive] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-scroll-gradient leading-tight relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              >
                Ram Ram!
                <motion.span
                  className="absolute -right-6 bottom-1 text-lg md:text-xl"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 1.5 }}
                >
                  ✦
                </motion.span>
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.17, 0.85, 0.45, 1.2] }}
          >
            <div
              ref={glowRef}
              className="logo-glow absolute inset-0 z-0"
              style={{
                opacity: 0,
                background: 'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(168,85,247,0.45) 0%, rgba(217,70,239,0.2) 30%, transparent 60%)',
                filter: 'blur(25px)',
                WebkitMaskImage: `url(${logoAnkit})`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url(${logoAnkit})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
            <div
              ref={logoRef}
              className="logo-gradient logo-sizing mx-auto md:mx-0"
              style={{
                WebkitMaskImage: `url(${logoAnkit})`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url(${logoAnkit})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
          </motion.div>

          {/* Role badges */}
          <motion.div
            className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide bg-bg-glass/40 border-border-glass bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              Full Stack Developer
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide bg-bg-glass/40 border-border-glass bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              Cybersecurity Enthusiast
            </motion.span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="font-['Poppins',sans-serif] text-sm md:text-base lg:text-lg text-text-secondary mt-4 md:mt-5 font-light leading-relaxed max-w-xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
          >
            Passionate about crafting clean, scalable web experiences and securing digital ecosystems. I turn complex problems into elegant, user-friendly solutions.
          </motion.p>

          {/* Neon gradient line */}
          <motion.div
            className="w-20 h-[3px] bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400 rounded-full mt-5 md:mt-6 mx-auto md:mx-0 shadow-[0_0_15px_rgba(168,85,247,0.4),0_0_30px_rgba(168,85,247,0.2)]"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          />

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mt-6 md:mt-8 justify-center md:justify-start"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: 'easeOut' }}
          >
            <a href="#projects" onClick={scrollTo('#projects')} className="relative inline-flex items-center gap-2 px-7 py-3 rounded-full font-['Poppins',sans-serif] text-sm font-semibold tracking-wide transition-all duration-300 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-105 active:scale-95 will-change-transform">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
              View Projects
            </a>
            <a href="#contact" onClick={scrollTo('#contact')} className="relative inline-flex items-center gap-2 px-7 py-3 rounded-full font-['Poppins',sans-serif] text-sm font-semibold tracking-wide transition-all duration-300 glass bg-bg-glass border-border-glass text-text-secondary hover:bg-bg-card hover:border-purple-400/40 hover:text-text-primary hover:scale-105 active:scale-95 will-change-transform">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
              Contact Me
            </a>
          </motion.div>

          {/* Decorative dots - CSS animated */}
          <div className="flex gap-2 mt-6 justify-center md:justify-start">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-pulse-opacity"
                style={{ '--dur': '2s', animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right column - Glassmorphism card with image */}
        <motion.div
          className="flex-shrink-0 w-[45%] max-w-[320px] md:max-w-[380px] lg:max-w-[420px] flex justify-center max-md:mt-12"
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div ref={cardRef} className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[24rem] lg:h-[24rem] flex items-center justify-center transition-transform duration-200 ease-out will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
            {/* Outer radial glow - CSS animated */}
            <div className="absolute w-[20rem] h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] rounded-full bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-transparent blur-[100px] animate-pulse-slow" style={{ animationDuration: '7s' }} />

            {/* Orbital ring behind - CSS animated */}
            <div className="animate-ring absolute w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem] lg:w-[27rem] lg:h-[27rem] rounded-full border border-purple-500/10" style={{ '--dur': '25s', '--s': '1.03' }} />

            {/* Abstract blob shapes behind card - CSS animated */}
            <div className="animate-blob absolute w-[14rem] h-[10rem] md:w-[18rem] md:h-[13rem] lg:w-[22rem] lg:h-[16rem] rounded-full bg-gradient-to-br from-purple-500/8 to-fuchsia-500/5 blur-[60px]" style={{ top: '5%', left: '-10%', '--dur': '15s', zIndex: -1 }} />
            <div className="animate-blob absolute w-[12rem] h-[16rem] md:w-[15rem] md:h-[20rem] lg:w-[18rem] lg:h-[24rem] rounded-full bg-gradient-to-tr from-cyan-500/6 to-blue-500/4 blur-[70px]" style={{ bottom: '5%', right: '-8%', '--dur': '18s', '--delay': '3s', zIndex: -1 }} />

            {/* Glassmorphism card */}
            <div className="absolute w-[16rem] h-[16rem] md:w-[20rem] md:h-[20rem] lg:w-[24rem] lg:h-[24rem] rounded-[32px] bg-bg-glass/60 backdrop-blur-xl border border-border-glass shadow-[0_0_60px_rgba(168,85,247,0.15),0_0_120px_rgba(168,85,247,0.05)] overflow-hidden">
              {/* Inner glow edges */}
              <div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ boxShadow: 'inset 0 0 40px rgba(168,85,247,0.06)' }} />

              {/* Glass highlights */}
              <div className="absolute w-[70%] h-[40%] rounded-full bg-gradient-to-br from-white/[0.1] via-white/[0.03] to-transparent blur-xl -top-2 -left-4 rotate-[-18deg]" />
              <div className="absolute w-[50%] h-[30%] rounded-full bg-gradient-to-tl from-white/[0.04] via-fuchsia-500/[0.02] to-transparent blur-lg bottom-2 -right-4 rotate-[22deg]" />

              {/* Light streak - CSS animated */}
              <div className="animate-pulse-opacity absolute w-[60%] h-[8%] rounded-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-sm top-[15%] -right-[10%] rotate-[35deg]" style={{ '--dur': '5s' }} />

              {/* Border glow - CSS animated */}
              <div className="animate-pulse-opacity absolute inset-[1px] rounded-[31px] border border-border-glass pointer-events-none" style={{ '--dur': '4s', animationDelay: '0.5s' }} />

              {/* Profile image - CSS animated */}
              <img
                src={creativeSrc}
                alt="Ankit" loading="lazy"
                className="absolute inset-[8%] z-10 rounded-[20px] object-cover shadow-lg shadow-purple-900/40 animate-image-float"
              />

              {/* Neon accent ring behind image */}
              <div className="animate-pulse-opacity absolute inset-[6%] rounded-[24px] blur-md bg-gradient-to-br from-purple-500/15 via-fuchsia-500/10 to-purple-500/15" style={{ '--dur': '5s', animationDelay: '1s' }} />
            </div>

            {/* Orbiting droplets - CSS animated */}
            {orbitDroplets.map((d, i) => (
              <div
                key={i}
                className={`absolute ${d.size} rounded-full bg-gradient-to-br from-white/[0.06] via-purple-500/[0.04] to-fuchsia-500/[0.03] border border-border-glass shadow-lg animate-droplet`}
                style={{
                  top: d.top, bottom: d.bottom, left: d.left, right: d.right,
                  '--dx': `${d.dx}px`, '--dy': `${d.dy}px`,
                  '--dur': `${d.dur}s`, animationDelay: `${d.delay}s`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none z-10" />
    </section>
  )
}
