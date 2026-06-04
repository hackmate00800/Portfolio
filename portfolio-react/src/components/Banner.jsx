import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import creativeSrc from '../assets/creative.png'

const bgParticles = Array.from({ length: 40 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  delay: Math.random() * 10,
  duration: Math.random() * 8 + 6,
}))

const techDots = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${10 + (i * 7.5) % 85}%`,
  top: `${8 + (i * 9) % 84}%`,
  delay: i * 0.5,
}))

const orbitBubbles = [
  { size: 'w-12 h-12', top: '-8%', right: '-4%', xOff: 10, yOff: -18, delay: 0.3 },
  { size: 'w-9 h-9', bottom: '0%', left: '-5%', xOff: -10, yOff: 14, delay: 1 },
  { size: 'w-7 h-7', top: '4%', left: '-7%', xOff: -6, yOff: -12, delay: 1.8 },
  { size: 'w-8 h-8', bottom: '4%', right: '-5%', xOff: 8, yOff: -10, delay: 2.4 },
]

export default function Banner() {
  const blobRef = useRef(null)
  const bubbleRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      if (blobRef.current) blobRef.current.style.transform = `translate(${x}px, ${y}px)`
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative w-full h-dvh overflow-hidden bg-gradient-to-br from-[#120028] via-[#1f0542] to-[#0a0016] flex items-center">
      {/* Central light ray */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-purple-500/8 to-transparent rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      {/* Depth background blobs */}
      <div ref={blobRef} className="absolute inset-0 transition-transform duration-300 ease-out pointer-events-none">
        <div className="absolute w-[900px] h-[900px] rounded-full bg-[#7b2dbf]/15 blur-[160px] -top-48 -left-48 animate-pulse-slow" />
        <div className="absolute w-[650px] h-[650px] rounded-full bg-[#5b1aa8]/20 blur-[130px] bottom-1/3 -right-32 animate-pulse-slow" style={{ animationDelay: '5s' }} />
        <div className="absolute w-[550px] h-[550px] rounded-full bg-[#9b4de0]/12 blur-[110px] top-1/3 left-1/4 animate-pulse-slow" style={{ animationDelay: '9s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#3d0b78]/30 blur-[90px] -bottom-24 left-[20%] animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Glass gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0016]/70 via-transparent to-[#120028]/30 pointer-events-none" />

      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bgParticles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/25"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -35, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Tech dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {techDots.map((d) => (
          <motion.div
            key={d.id}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{ left: d.left, top: d.top }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Abstract thin lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute w-[300px] h-px bg-gradient-to-r from-transparent via-purple-400/15 to-transparent top-[20%] left-[10%] rotate-[25deg]" animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute w-[200px] h-px bg-gradient-to-r from-transparent via-fuchsia-400/10 to-transparent bottom-[30%] right-[15%] rotate-[-15deg]" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }} />
        <motion.div className="absolute w-[250px] h-px bg-gradient-to-r from-transparent via-purple-400/12 to-transparent top-[60%] left-[5%] rotate-[40deg]" animate={{ opacity: [0.05, 0.35, 0.05] }} transition={{ duration: 8, repeat: Infinity, delay: 4 }} />
      </div>

      {/* Code symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['{', '}', '/>', '=>', '[]', '/*', 'const', 'fn', '</', '()', '...', '#', '&&', '||'].map((sym, i) => (
          <motion.span
            key={sym}
            className="absolute text-white/[0.06] text-sm md:text-base font-mono"
            style={{ left: `${3 + (i * 7) % 92}%`, top: `${12 + (i * 11) % 76}%` }}
            animate={{ y: [0, -15 - (i % 3) * 8, 0], opacity: [0.04, 0.15, 0.04] }}
            transition={{ duration: 9 + (i % 5), repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
          >
            {sym}
          </motion.span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 py-10 md:py-0">
        {/* Left - Profile bubble composition */}
        <motion.div
          className="flex-shrink-0 w-[45%] max-w-[300px] md:max-w-[360px] flex justify-center"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div ref={bubbleRef} className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center transition-transform duration-200 ease-out">
            {/* Outer ambient glow */}
            <motion.div
              className="absolute w-[19rem] h-[19rem] md:w-[24rem] md:h-[24rem] lg:w-[28rem] lg:h-[28rem] rounded-full bg-purple-600/15 blur-[80px]"
              animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Main glass sphere */}
            <motion.div
              className="absolute w-[16rem] h-[16rem] md:w-[20rem] md:h-[20rem] lg:w-[24rem] lg:h-[24rem] rounded-full bg-gradient-to-br from-white/[0.06] via-purple-500/[0.03] to-fuchsia-500/[0.05] backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-purple-900/40"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Glass highlight crescents */}
            <div className="absolute w-[10rem] h-[5rem] md:w-[13rem] md:h-[6.5rem] lg:w-[15rem] lg:h-[7.5rem] rounded-full bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent blur-lg -top-1 -left-2 rotate-[-18deg]" />
            <div className="absolute w-[7rem] h-[4rem] md:w-[9rem] md:h-[5rem] lg:w-[11rem] lg:h-[6rem] rounded-full bg-gradient-to-tl from-white/[0.03] to-transparent blur-md bottom-2 -right-3 rotate-[22deg]" />

            {/* Light streak */}
            <motion.div
              className="absolute w-[8rem] h-[1.5rem] md:w-[10rem] md:h-[1.8rem] lg:w-[12rem] lg:h-[2rem] rounded-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-sm top-6 -right-1 rotate-[38deg]"
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Orbiting bubbles */}
            {orbitBubbles.map((b, i) => (
              <motion.div
                key={i}
                className={`absolute ${b.size} rounded-full bg-gradient-to-br from-white/[0.06] to-purple-500/[0.05] backdrop-blur-md border border-white/[0.08] shadow-lg`}
                style={{ top: b.top, bottom: b.bottom, left: b.left, right: b.right }}
                animate={{ y: [0, b.yOff, 0], x: [0, b.xOff, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
              />
            ))}

            {/* Inner glass frame */}
            <motion.div
              className="absolute inset-[1.4rem] md:inset-[1.8rem] lg:inset-[2rem] rounded-full border-[2.5px] border-white/[0.18] shadow-lg shadow-purple-900/30 bg-white/[0.015]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            />

            {/* Neon glow ring behind image */}
            <motion.div
              className="absolute inset-[1.8rem] md:inset-[2.2rem] lg:inset-[2.5rem] rounded-full blur-md bg-purple-500/10"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Profile image */}
            <motion.img
              src={creativeSrc}
              alt="Ankit"
              className="absolute inset-[1.8rem] md:inset-[2.2rem] lg:inset-[2.5rem] z-10 rounded-full object-cover shadow-lg shadow-purple-900/50"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />

            {/* Foreground overlapping droplet (bottom-right) */}
            <motion.div
              className="absolute w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-gradient-to-tl from-white/[0.07] to-purple-500/[0.04] backdrop-blur-md border border-white/[0.09] z-20"
              animate={{ y: [0, -7, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
              style={{ bottom: '-1%', right: '-2%' }}
            />

            {/* Foreground overlapping droplet (top-left) */}
            <motion.div
              className="absolute w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-white/[0.06] to-fuchsia-500/[0.03] backdrop-blur-sm border border-white/[0.07] z-20"
              animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
              style={{ top: '1%', left: '-3%' }}
            />
          </div>
        </motion.div>

        {/* Right - Text */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.p
            className="font-['Caveat',cursive] text-4xl md:text-5xl lg:text-6xl text-white/90 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Ram Ram!
          </motion.p>

          <motion.h1
            className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-wide mt-1 leading-none"
            style={{ textShadow: '0 0 40px rgba(168,85,247,0.25), 2px 2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(120,80,200,0.3)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            I&apos;M ANKIT
          </motion.h1>

          <motion.p
            className="font-['Poppins',sans-serif] text-base md:text-lg lg:text-xl text-white/70 mt-4 md:mt-6 font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Developer <span className="text-purple-300/50 mx-2">•</span> Designer <span className="text-purple-300/50 mx-2">•</span> Problem Solver
          </motion.p>

          {/* Neon accent line */}
          <motion.div
            className="w-20 h-[3px] bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400 rounded-full mt-6 md:mt-8 mx-auto md:mx-0 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  )
}
