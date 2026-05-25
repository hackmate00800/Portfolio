import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiChevronDown } from 'react-icons/fi'
import SplitFace from '../components/SplitFace'
import TextPanel from '../components/TextPanel'
import TypingEffect from '../components/TypingEffect'
import FloatingBadges from '../components/FloatingBadges'
import Particles from '../components/Particles'
import SocialIcon from '../components/SocialIcon'

const socials = ['github', 'linkedin', 'instagram']

export default function HeroSection() {
  const splitRef = useRef(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10 px-6 max-md:min-h-auto max-md:pt-24 max-md:pb-6 max-md:px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-creative/30 blur-[80px] -top-[10%] -left-[10%] animate-orb" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-logical/30 blur-[80px] -bottom-[10%] -right-[10%] animate-orb" style={{ animationDelay: '-7s' }} />
      </div>

      <Particles />
      <FloatingBadges />

      <motion.div
        className="relative z-5 text-center mb-10"
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.8 }}>
        <p className="font-secondary text-base font-normal text-text-secondary mb-2 max-sm:text-sm">
          Ram Ram I am <span className="gradient-accent text-gradient font-bold">Ankit</span>
        </p>
        <p className="text-[1.6rem] font-semibold min-h-[2rem] max-sm:text-lg">
          <TypingEffect />
        </p>
      </motion.div>

      <div className="relative z-5 flex items-center justify-center gap-5 w-full max-w-[1280px] max-lg:flex-col max-lg:gap-6">
        <TextPanel
          side="left"
          tag="Designer"
          title="Creative"
          desc="Passion for crafting beautiful visual experiences"
          stats={[{ num: '2+', label: 'Years Design' }, { num: '50+', label: 'Projects' }]}
          onHover={() => splitRef.current?.expandLeft()}
          onLeave={() => splitRef.current?.resetPct()}
        />
        <SplitFace ref={splitRef} />
        <TextPanel
          side="right"
          tag="Developer"
          title="Logical"
          desc="Intense knowledge in modern web development"
          stats={[{ num: '3+', label: 'Years Code' }, { num: '30+', label: 'Repos' }]}
          onHover={() => splitRef.current?.expandRight()}
          onLeave={() => splitRef.current?.resetPct()}
        />
      </div>

      {/* Bottom bar */}
      <motion.div
        className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-5 max-w-[1280px] mx-auto max-lg:relative max-lg:mt-8 max-lg:flex-col max-lg:gap-4"
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 1.4 }}>
        {/* Social icons with tooltip + animation */}
        <div className="flex gap-3">
          {socials.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 + i * 0.12 }}>
              <SocialIcon platform={p} size={16} />
            </motion.div>
          ))}
        </div>

        <a href="#" className="flex items-center gap-2 px-6 py-2.5 rounded-full gradient-accent text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-xl">
          <FiDownload size={14} /> Resume
        </a>

        <div className="flex flex-col items-center gap-1.5 text-text-muted max-lg:hidden">
          <span className="text-[0.65rem] uppercase tracking-[2px] font-semibold">Scroll</span>
          <div className="w-px h-6 bg-text-muted relative overflow-hidden">
            <div className="absolute w-full h-full gradient-accent animate-scroll-line" />
          </div>
          <FiChevronDown className="text-xs animate-scroll-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
