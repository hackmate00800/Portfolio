import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import creativeSrc from '../assets/creative.png'

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 8,
  duration: Math.random() * 6 + 6,
}))

const codeSymbols = ['{', '}', '/>', '</', '()', '=>', '[]', '/*', '*/', 'const', 'let', 'fn']

export default function Banner() {
  const blobRef = useRef(null)
  const rayRef = useRef(null)
  const bubbleRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
      if (bubbleRef.current) {
        const bx = (e.clientX / window.innerWidth - 0.5) * 10
        const by = (e.clientY / window.innerHeight - 0.5) * 10
        bubbleRef.current.style.transform = `translate(${bx}px, ${by}px)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative w-full h-dvh overflow-hidden bg-gradient-to-br from-[#1a0533] via-[#2e0a5a] to-[#0f0220] flex items-center">
      {/* Light ray */}
      <div ref={rayRef} className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-purple-500/10 to-transparent rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />

      {/* Background blobs */}
      <div ref={blobRef} className="absolute inset-0 transition-transform duration-300 ease-out pointer-events-none">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-[#7b2dbf]/20 blur-[140px] -top-48 -left-48 animate-pulse-slow" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#5b1aa8]/25 blur-[120px] bottom-1/4 -right-24 animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#9b4de0]/15 blur-[100px] top-1/3 left-1/3 animate-pulse-slow" style={{ animationDelay: '8s' }} />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[#3d0b78]/40 blur-[80px] -bottom-20 left-[15%] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0220]/60 via-transparent to-[#1a0533]/30 pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Code symbols floating */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {codeSymbols.map((sym, i) => (
          <motion.span
            key={sym}
            className="absolute text-white/10 text-sm md:text-base font-mono"
            style={{
              left: `${5 + (i * 8) % 90}%`,
              top: `${10 + (i * 13) % 80}%`,
            }}
            animate={{
              y: [0, -20 - (i * 3) % 20, 0],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: 8 + (i % 4),
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
          >
            {sym}
          </motion.span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10 md:gap-20 py-10 md:py-0">
        {/* Left side - Glass bubble profile frame */}
        <motion.div
          className="flex-shrink-0 w-[45%] max-w-[300px] md:max-w-[360px] flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div ref={bubbleRef} className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center transition-transform duration-200 ease-out">
            {/* Ambient purple glow behind the bubble */}
            <motion.div
              className="absolute w-72 h-72 md:w-88 md:h-88 lg:w-104 lg:h-104 rounded-full bg-purple-600/15 blur-3xl"
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Main glass bubble sphere */}
            <motion.div
              className="absolute w-60 h-60 md:w-76 md:h-76 lg:w-90 lg:h-90 rounded-full bg-gradient-to-br from-white/[0.07] via-purple-500/[0.05] to-fuchsia-500/[0.08] backdrop-blur-lg border border-white/[0.12] shadow-2xl shadow-purple-900/60"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Bubble rim highlight (top-left crescent) */}
            <div className="absolute w-44 h-28 md:w-56 md:h-36 lg:w-64 lg:h-40 rounded-full bg-gradient-to-br from-white/[0.08] to-transparent blur-md -top-3 -left-2 rotate-[-20deg]" />

            {/* Curved light streak across the bubble */}
            <motion.div
              className="absolute w-36 h-12 md:w-48 md:h-14 lg:w-56 lg:h-16 rounded-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-sm top-6 -right-4 rotate-[40deg]"
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Small orbiting bubble - top right */}
            <motion.div
              className="absolute w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-white/[0.06] to-purple-400/[0.08] backdrop-blur-md border border-white/[0.10] shadow-lg"
              animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              style={{ top: '-6%', right: '2%' }}
            />

            {/* Small orbiting bubble - bottom left */}
            <motion.div
              className="absolute w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-white/[0.05] to-fuchsia-500/[0.07] backdrop-blur-sm border border-white/[0.08] shadow-lg"
              animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              style={{ bottom: '4%', left: '-4%' }}
            />

            {/* Small orbiting bubble - top left */}
            <motion.div
              className="absolute w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-purple-400/[0.08] to-white/[0.04] backdrop-blur-sm border border-white/[0.06]"
              animate={{ y: [0, -12, 0], x: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              style={{ top: '8%', left: '-6%' }}
            />

            {/* Tiny glowing dot - right side */}
            <motion.div
              className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-purple-400/30 blur-[2px]"
              animate={{ y: [0, -10, 0], opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              style={{ top: '30%', right: '-5%' }}
            />

            {/* Tiny glowing dot - bottom */}
            <motion.div
              className="absolute w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-fuchsia-400/25 blur-[2px]"
              animate={{ y: [0, 8, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{ bottom: '8%', right: '10%' }}
            />

            {/* Inner glass circle frame for the image */}
            <motion.div
              className="absolute inset-[18px] md:inset-[22px] lg:inset-[26px] rounded-full border-2 border-white/[0.25] shadow-xl shadow-purple-900/60 bg-white/[0.03] backdrop-blur-[2px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            />

            {/* Inner subtle glow behind image */}
            <motion.div
              className="absolute inset-[24px] md:inset-[28px] lg:inset-[32px] rounded-full bg-gradient-to-br from-white/[0.06] to-transparent blur-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />

            {/* Profile image */}
            <motion.img
              src={creativeSrc}
              alt="Ankit"
              className="absolute inset-[28px] md:inset-[34px] lg:inset-[40px] z-10 rounded-full object-cover shadow-lg shadow-purple-900/50"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />

            {/* Foreground bubble overlapping image edge (bottom-right) */}
            <motion.div
              className="absolute w-9 h-9 md:w-11 md:h-11 lg:w-13 lg:h-13 rounded-full bg-gradient-to-tl from-white/[0.07] to-purple-500/[0.05] backdrop-blur-sm border border-white/[0.10] z-20"
              animate={{ y: [0, -8, 0], x: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ bottom: '-2%', right: '-2%' }}
            />

            {/* Foreground bubble overlapping image edge (top-left) */}
            <motion.div
              className="absolute w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-white/[0.06] to-fuchsia-500/[0.04] backdrop-blur-sm border border-white/[0.08] z-20"
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
              style={{ top: '2%', left: '-3%' }}
            />
          </div>
        </motion.div>

        {/* Right side - Text */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
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
            style={{ textShadow: '0 0 30px rgba(168,85,247,0.3), 2px 2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(120,80,200,0.3)' }}
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
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Developer <span className="text-purple-300/50 mx-2">•</span> Designer <span className="text-purple-300/50 mx-2">•</span> Problem Solver
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-full mt-6 md:mt-8 mx-auto md:mx-0"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  )
}
