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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!blobRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      blobRef.current.style.transform = `translate(${x}px, ${y}px)`
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
        {/* Left side - Bubble profile composition */}
        <motion.div
          className="flex-shrink-0 w-[45%] max-w-[300px] md:max-w-[360px] flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
            {/* === BACKGROUND LAYER — large soft purple bubbles === */}
            <motion.div
              className="absolute w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-fuchsia-600/15 blur-2xl"
              animate={{ y: [0, -20, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-tr from-purple-600/25 to-purple-400/10 blur-3xl -top-4 -right-4"
              animate={{ y: [0, 16, 0], x: [0, -8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-36 h-36 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full bg-gradient-to-bl from-fuchsia-500/15 to-purple-700/20 blur-2xl -bottom-6 -left-4"
              animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* === MIDDLE LAYER — glass bubbles around the image === */}
            <motion.div
              className="absolute w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-lg -top-8 right-2"
              animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <div className="absolute w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/8 -bottom-4 -right-6" />
            <motion.div
              className="absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/10 -bottom-2 left-2"
              animate={{ y: [0, -10, 0], x: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            />
            <motion.div
              className="absolute w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-purple-400/10 to-fuchsia-500/10 backdrop-blur-md border border-white/10 top-4 -left-10"
              animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />

            {/* Small glowing bubbles */}
            <motion.div
              className="absolute w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-400/20 blur-sm -top-2 left-1/4"
              animate={{ y: [0, -14, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
            <motion.div
              className="absolute w-4 h-4 md:w-5 md:h-5 rounded-full bg-fuchsia-400/20 blur-sm top-1/3 -right-4"
              animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
            <motion.div
              className="absolute w-5 h-5 md:w-6 md:h-6 rounded-full bg-purple-300/20 blur-sm bottom-1/4 -left-3"
              animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            {/* Light reflection highlights on bubbles */}
            <div className="absolute w-24 h-10 bg-gradient-to-r from-white/[0.06] to-transparent rounded-full blur-md -top-4 left-6 rotate-[-20deg]" />
            <motion.div
              className="absolute w-16 h-6 bg-gradient-to-r from-white/[0.04] to-transparent rounded-full blur-sm top-8 right-8 rotate-[30deg]"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* === FRONT LAYER — profile image with glass frame === */}
            {/* White glass circle frame */}
            <motion.div
              className="absolute inset-8 md:inset-10 lg:inset-12 rounded-full border-[5px] border-white/40 shadow-2xl shadow-purple-900/80 bg-white/5 backdrop-blur-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Inner glow */}
            <motion.div
              className="absolute inset-10 md:inset-12 lg:inset-14 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
            />

            {/* Profile image */}
            <motion.img
              src={creativeSrc}
              alt="Ankit"
              className="absolute inset-[28px] md:inset-[34px] lg:inset-[40px] z-10 rounded-full object-cover shadow-lg shadow-purple-900/50"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />

            {/* Small bubble overlapping in front of the image (bottom-right edge) */}
            <motion.div
              className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 -bottom-2 -right-2 z-20"
              animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
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
