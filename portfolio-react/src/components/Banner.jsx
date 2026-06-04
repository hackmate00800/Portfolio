import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import creativeSrc from '../assets/creative.png'

const floatingBubbles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 20 + Math.random() * 60,
  x: Math.random() * 100,
  y: Math.random() * 100,
  dur: 8 + Math.random() * 14,
  delay: Math.random() * -10,
  xDrift: (Math.random() - 0.5) * 40,
  yDrift: (Math.random() - 0.5) * 40,
}))

const particles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1.5 + Math.random() * 3,
  delay: Math.random() * 12,
  dur: 4 + Math.random() * 8,
  yOff: -(30 + Math.random() * 20),
}))

const waveLines = [
  { d: 'M0,50 Q50,0 100,50 T200,50 T300,50 T400,50', top: '15%', delay: 0, opacity: 0.06 },
  { d: 'M0,30 Q40,60 80,30 T160,30 T240,30 T320,30', top: '30%', delay: 2, opacity: 0.04 },
  { d: 'M0,70 Q60,20 120,70 T240,70 T360,70 T480,70', top: '55%', delay: 4, opacity: 0.05 },
  { d: 'M0,40 Q30,80 60,40 T120,40 T180,40 T240,40', top: '75%', delay: 1, opacity: 0.03 },
]

const orbitDroplets = [
  { size: 'w-11 h-11', top: '-3%', right: '2%', xOff: 12, yOff: -16, delay: 0.2 },
  { size: 'w-8 h-8', bottom: '2%', left: '-2%', xOff: -10, yOff: 12, delay: 1.2 },
  { size: 'w-6 h-6', top: '6%', left: '-5%', xOff: -6, yOff: -10, delay: 2.0 },
  { size: 'w-9 h-9', bottom: '5%', right: '-3%', xOff: 8, yOff: -8, delay: 2.8 },
  { size: 'w-5 h-5', top: '30%', right: '-5%', xOff: 14, yOff: 6, delay: 1.5 },
  { size: 'w-7 h-7', bottom: '35%', left: '-6%', xOff: -12, yOff: -14, delay: 3.2 },
]

export default function Banner() {
  const blobRef = useRef(null)
  const cardRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseRef.current = { x, y }
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`
      }
      if (cardRef.current) {
        const rx = y * 8
        const ry = x * -8
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative w-full h-dvh overflow-hidden bg-[#080012] flex items-center">
      {/* Deep background layers */}
      <div ref={blobRef} className="absolute inset-0 transition-transform duration-200 ease-out pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] rounded-full bg-[#6d28d9]/10 blur-[180px] -top-64 -left-48 animate-pulse-slow" />
        <div className="absolute w-[800px] h-[800px] rounded-full bg-[#4c1d95]/15 blur-[150px] -bottom-40 -right-32 animate-pulse-slow" style={{ animationDelay: '6s' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#9333ea]/10 blur-[130px] top-1/3 left-1/3 animate-pulse-slow" style={{ animationDelay: '10s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#a21caf]/8 blur-[110px] top-1/4 right-1/4 animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute w-[700px] h-[700px] rounded-full bg-[#7c3aed]/8 blur-[140px] bottom-1/4 left-1/5 animate-pulse-slow" style={{ animationDelay: '8s' }} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0016]/40 via-transparent to-[#080012]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080012]/30 via-transparent to-[#080012]/30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080012]/60 to-transparent pointer-events-none z-10" />

      {/* Floating transparent bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingBubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full bg-gradient-to-br from-white/[0.03] via-fuchsia-500/[0.02] to-purple-600/[0.03] backdrop-blur-[2px] border border-white/[0.04]"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.x}%`,
              top: `${b.y}%`,
            }}
            animate={{
              y: [0, b.yDrift, 0],
              x: [0, b.xDrift, 0],
              scale: [1, 1.08, 0.95, 1],
              opacity: [0.15, 0.4, 0.2, 0.15],
            }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              delay: b.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, p.yOff, 0],
              opacity: [0.05, 0.35, 0.05],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Abstract 3D wave curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          {waveLines.map((w, i) => (
            <motion.path
              key={i}
              d={w.d}
              fill="none"
              stroke="url(#waveGrad)"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
              style={{ position: 'absolute', top: w.top, left: 0, right: 0 }}
              animate={{ opacity: [w.opacity, w.opacity * 2.5, w.opacity] }}
              transition={{ duration: 6, repeat: Infinity, delay: w.delay, ease: 'easeInOut' }}
            />
          ))}
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="70%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Neon glow ring accents */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full border border-purple-500/5 pointer-events-none"
        style={{ top: '20%', left: '55%' }}
        animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full border border-fuchsia-500/5 pointer-events-none"
        style={{ top: '25%', left: '58%' }}
        animate={{ rotate: [360, 0], scale: [1.05, 0.95, 1.05] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-6 md:gap-20 py-10 md:py-0">
        {/* Left - Glassmorphism card with image */}
        <motion.div
          className="flex-shrink-0 w-[45%] max-w-[320px] md:max-w-[380px] lg:max-w-[420px] flex justify-center"
          initial={{ opacity: 0, x: -80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div ref={cardRef} className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[24rem] lg:h-[24rem] flex items-center justify-center transition-all duration-200 ease-out" style={{ transformStyle: 'preserve-3d' }}>
            {/* Outer radial glow */}
            <motion.div
              className="absolute w-[20rem] h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] rounded-full bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-transparent blur-[100px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Orbital ring behind */}
            <motion.div
              className="absolute w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem] lg:w-[27rem] lg:h-[27rem] rounded-full border border-purple-500/10"
              animate={{ rotate: [0, 360], scale: [1, 1.03, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            {/* Glassmorphism card */}
            <div className="absolute w-[16rem] h-[16rem] md:w-[20rem] md:h-[20rem] lg:w-[24rem] lg:h-[24rem] rounded-[32px] bg-gradient-to-br from-white/[0.07] via-purple-500/[0.04] to-fuchsia-500/[0.03] backdrop-blur-xl border border-white/[0.12] shadow-[0_0_60px_rgba(168,85,247,0.15),0_0_120px_rgba(168,85,247,0.05)] overflow-hidden">
              {/* Inner glow edges */}
              <div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ boxShadow: 'inset 0 0 40px rgba(168,85,247,0.06)' }} />

              {/* Glass highlight - top left crescent */}
              <div className="absolute w-[70%] h-[40%] rounded-full bg-gradient-to-br from-white/[0.1] via-white/[0.03] to-transparent blur-xl -top-2 -left-4 rotate-[-18deg]" />

              {/* Glass highlight - bottom right crescent */}
              <div className="absolute w-[50%] h-[30%] rounded-full bg-gradient-to-tl from-white/[0.04] via-fuchsia-500/[0.02] to-transparent blur-lg bottom-2 -right-4 rotate-[22deg]" />

              {/* Light streak across top */}
              <motion.div
                className="absolute w-[60%] h-[8%] rounded-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-sm top-[15%] -right-[10%] rotate-[35deg]"
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Inner border glow */}
              <motion.div
                className="absolute inset-[1px] rounded-[31px] border border-white/[0.06] pointer-events-none"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Profile image */}
              <motion.img
                src={creativeSrc}
                alt="Ankit"
                className="absolute inset-[8%] z-10 rounded-[20px] object-cover shadow-lg shadow-purple-900/40"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />

              {/* Neon accent ring behind image */}
              <motion.div
                className="absolute inset-[6%] rounded-[24px] blur-md bg-gradient-to-br from-purple-500/15 via-fuchsia-500/10 to-purple-500/15"
                animate={{ opacity: [0.15, 0.45, 0.15] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Orbiting droplets */}
            {orbitDroplets.map((d, i) => (
              <motion.div
                key={i}
                className={`absolute ${d.size} rounded-full bg-gradient-to-br from-white/[0.06] via-purple-500/[0.04] to-fuchsia-500/[0.03] backdrop-blur-md border border-white/[0.08] shadow-lg`}
                style={{ top: d.top, bottom: d.bottom, left: d.left, right: d.right }}
                animate={{ y: [0, d.yOff, 0], x: [0, d.xOff, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right - Typography area */}
        <motion.div
          className="flex-1 text-center md:text-left max-lg:mt-4"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.p
            className="font-['Caveat',cursive] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white/90 leading-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.15)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Ram Ram!
          </motion.p>

          <motion.h1
            className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-wide mt-1 leading-none"
            style={{ textShadow: '0 0 60px rgba(168,85,247,0.2), 0 0 120px rgba(168,85,247,0.1), 2px 2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(120,80,200,0.2)' }}
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

          {/* Neon gradient line */}
          <motion.div
            className="w-24 h-[3px] bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400 rounded-full mt-6 md:mt-8 mx-auto md:mx-0 shadow-[0_0_15px_rgba(168,85,247,0.4),0_0_30px_rgba(168,85,247,0.2)]"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          />

          {/* Subtle decorative dots after text */}
          <motion.div
            className="flex gap-2 mt-6 md:mt-8 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-purple-400/40"
                animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-10" />
    </section>
  )
}
