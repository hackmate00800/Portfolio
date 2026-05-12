import { motion } from 'framer-motion'
import { FaLinkedin, FaExternalLinkAlt, FaUserCircle } from 'react-icons/fa'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
}

export default function LinkedInCard() {
  return (
    <section className="relative py-24 px-6 bg-bg-secondary overflow-hidden">
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[80px] bottom-[10%] left-[5%] pointer-events-none animate-orb" style={{ animationDelay: '-5s' }} />
      <div className="max-w-[1100px] mx-auto relative z-2">
        <motion.div className="mb-[60px]" {...fadeUp}>
          <span className="font-secondary text-xs font-semibold text-accent-creative tracking-[3px] uppercase block mb-2">Connect</span>
          <h2 className="text-[2.5rem] max-sm:text-[1.8rem] font-bold tracking-tight leading-[1.2]">Professional Network</h2>
          <div className="w-[60px] h-[3px] rounded-[2px] gradient-accent mt-4" />
        </motion.div>

        <motion.div className="max-w-lg mx-auto relative" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
          {/* Animated border glow */}
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-sm animate-pulse" />

          <div className="relative p-8 glass rounded-2xl border-border-glass text-center">
            {/* Glow orbs */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500/20 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-500/20 blur-[60px] pointer-events-none" />

            <motion.div
              className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl text-blue-400 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-3 border-blue-500/40"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}>
              <FaUserCircle />
            </motion.div>

            <h3 className="text-xl font-bold text-text-primary">Ankit Singh</h3>
            <p className="text-sm text-text-muted font-secondary mt-1">Full-Stack Developer & Creative Designer</p>

            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                Open to opportunities
              </span>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <a href="https://www.linkedin.com/in/ankit-singh-3ab014391" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold transition-all duration-300 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30">
                <FaLinkedin size={16} /> Connect
              </a>
              <a href="https://www.linkedin.com/in/ankit-singh-3ab014391" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass border-border-glass text-text-secondary text-sm font-semibold transition-all duration-300 hover:text-text-primary hover:border-blue-500/40 hover:-translate-y-0.5">
                <FaExternalLinkAlt size={12} /> Visit
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
