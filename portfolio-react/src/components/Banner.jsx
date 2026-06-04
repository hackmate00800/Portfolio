import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Banner() {
  const blobRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!blobRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      blobRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-[#2e0a5a] min-h-[420px] md:min-h-[520px] flex items-center">
      {/* Animated background blobs */}
      <div ref={blobRef} className="absolute inset-0 transition-transform duration-300 ease-out pointer-events-none">
        <div className="absolute w-[700px] h-[700px] rounded-full bg-[#5b1aa8]/30 blur-[120px] -top-48 -left-48 animate-pulse-slow" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#7b2dbf]/20 blur-[100px] top-1/4 -left-20 animate-pulse-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8b3fd9]/15 blur-[90px] -bottom-32 left-1/3 animate-pulse-slow" style={{ animationDelay: '6s' }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10 md:gap-16 py-10 md:py-12">
        {/* Left side - Profile photo */}
        <motion.div
          className="flex-shrink-0 w-[45%] max-w-[280px] md:max-w-[320px] flex justify-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
            <motion.div
              className="absolute inset-2 rounded-full border-[6px] border-white/30 shadow-2xl shadow-purple-900/60 bg-white/5"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 blur-sm"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
            />
            <motion.img
              src="/creative.png"
              alt="Ankit"
              className="relative z-10 w-[85%] h-[85%] object-cover rounded-full border-4 border-white/40 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Right side - Text */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.p
            className="font-['Caveat',cursive] text-4xl md:text-5xl lg:text-6xl text-white/90 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Ram Ram!
          </motion.p>
          <motion.h1
            className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-wide mt-1 leading-none"
            style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(120,80,200,0.3)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            I&apos;M ANKIT
          </motion.h1>
        </motion.div>
      </div>
    </section>
  )
}
