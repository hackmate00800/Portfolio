import { motion } from 'framer-motion'
import { FiDroplet, FiCode } from 'react-icons/fi'

const info = [
  { label: 'Name', value: 'Ankit' },
  { label: 'Role', value: 'Full-Stack Developer' },
  { label: 'Location', value: 'India' },
  { label: 'Available', value: 'Freelance / Full-time', status: true },
]

const cards = [
  { icon: FiDroplet, title: 'Creative Design', desc: 'UI/UX, Visual Design, Brand Identity, Prototyping', gradient: 'from-accent-creative to-transparent' },
  { icon: FiCode, title: 'Logical Dev', desc: 'Full-Stack, Architecture, Optimization, APIs', gradient: 'from-transparent to-accent-logical' },
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6 bg-bg-secondary overflow-hidden">
      <div className="absolute w-[350px] h-[350px] rounded-full bg-accent-creative/15 blur-[80px] top-1/4 -right-[5%] pointer-events-none animate-orb" style={{ animationDelay: '-3s' }} />
      <div className="max-w-[1100px] mx-auto relative z-2">
        <motion.div className="mb-[60px]" {...fadeUp}>
          <span className="font-secondary text-xs font-semibold text-accent-creative tracking-[3px] uppercase block mb-2">01</span>
          <h2 className="text-[2.5rem] max-sm:text-[1.8rem] font-bold tracking-tight leading-[1.2]">About Me</h2>
          <div className="w-[60px] h-[3px] rounded-[2px] gradient-accent mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 gap-12 items-start max-lg:grid-cols-1">
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <p className="font-secondary text-base leading-relaxed text-text-secondary mb-4">
              I&apos;m a passionate <strong className="text-text-primary font-semibold">Creative Designer</strong> and <strong className="text-text-primary font-semibold">Full-Stack Developer</strong> who bridges the gap between aesthetics and functionality. With a keen eye for design and a love for clean code, I craft digital experiences that are both beautiful and performant.
            </p>
            <p className="font-secondary text-base leading-relaxed text-text-secondary mb-4">
              When I&apos;m not coding or designing, you&apos;ll find me exploring new technologies, contributing to open-source, or mentoring aspiring developers.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-7 p-5 glass rounded-xl border-border-glass max-sm:grid-cols-1">
              {info.map((item, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="text-[0.7rem] uppercase tracking-[1px] text-text-muted font-semibold">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.status ? 'text-emerald-400' : 'text-text-primary'}`}>
                    {item.status && <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full mr-2 align-middle animate-pulse-dot" />}
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {cards.map((card, i) => (
              <motion.div key={i}
                className="p-6 rounded-[16px] glass border-border-glass transition-all duration-400 hover:-translate-y-1 hover:border-white/15 hover:shadow-xl relative overflow-hidden"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 + i * 0.15 }}>
                <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${card.gradient}`} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg mb-3.5 bg-accent-creative/20 text-accent-creative">
                  <card.icon />
                </div>
                <h3 className="text-lg font-bold mb-1.5">{card.title}</h3>
                <p className="text-sm text-text-secondary font-secondary leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
