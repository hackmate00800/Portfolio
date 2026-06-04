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
            {/* Deep purple ambient glow */}
            <motion.div
              className="absolute w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] rounded-full bg-purple-700/20 blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Main glass bubble sphere */}
            <motion.div
              className="absolute w-[15rem] h-[15rem] md:w-[19rem] md:h-[19rem] lg:w-[22.5rem] lg:h-[22.5rem] rounded-full bg-gradient-to-br from-white/[0.08] via-purple-500/[0.04] to-fuchsia-500/[0.06] backdrop-blur-xl border border-white/[0.10] shadow-2xl shadow-purple-900/50"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Glass highlight - top left crescent */}
            <div className="absolute w-40 h-24 md:w-52 md:h-32 lg:w-60 lg:h-36 rounded-full bg-gradient-to-br from-white/[0.10] via-white/[0.03] to-transparent blur-lg -top-2 -left-1 rotate-[-15deg]" />

            {/* Glass highlight - bottom right shimmer */}
            <div className="absolute w-28 h-20 md:w-36 md:h-24 lg:w-44 lg:h-28 rounded-full bg-gradient-to-bl from-white/[0.04] to-transparent blur-md bottom-4 -right-2 rotate-[20deg]" />

            {/* Light streak across the bubble */}
            <motion.div
              className="absolute w-32 h-8 md:w-40 md:h-10 lg:w-48 lg:h-12 rounded-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-sm top-8 -right-2 rotate-[35deg]"
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Attached droplet - top right */}
            <motion.div
              className="absolute w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-white/[0.08] to-purple-500/[0.06] backdrop-blur-md border border-white/[0.10] shadow-lg"
              animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              style={{ top: '-5%', right: '0%' }}
            />

            {/* Attached droplet - bottom left */}
            <motion.div
              className="absolute w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-white/[0.06] to-fuchsia-500/[0.05] backdrop-blur-md border border-white/[0.08] shadow-lg"
              animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{ bottom: '2%', left: '-3%' }}
            />

            {/* Attached droplet - top left */}
            <motion.div
              className="absolute w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-purple-400/[0.07] to-white/[0.04] backdrop-blur-sm border border-white/[0.06]"
              animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
              style={{ top: '6%', left: '-5%' }}
            />

            {/* Attached droplet - bottom right */}
            <motion.div
              className="absolute w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-tl from-white/[0.05] to-purple-500/[0.04] backdrop-blur-sm border border-white/[0.06]"
              animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
              style={{ bottom: '6%', right: '-4%' }}
            />

            {/* Inner glass ring framing the image */}
            <motion.div
              className="absolute inset-[22px] md:inset-[26px] lg:inset-[30px] rounded-full border-[2.5px] border-white/[0.20] shadow-lg shadow-purple-900/40 bg-white/[0.02]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            />

            {/* Profile image */}
            <motion.img
              src={creativeSrc}
              alt="Ankit"
              className="absolute inset-[30px] md:inset-[36px] lg:inset-[42px] z-10 rounded-full object-cover shadow-lg shadow-purple-900/50"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />

            {/* Foreground droplet - overlapping bottom-right edge */}
            <motion.div
              className="absolute w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-gradient-to-tl from-white/[0.08] to-purple-500/[0.05] backdrop-blur-md border border-white/[0.10] z-20"
              animate={{ y: [0, -6, 0], x: [0, 5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              style={{ bottom: '-1%', right: '-1%' }}
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
