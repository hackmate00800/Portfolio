import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative z-2">
        <motion.div className="mb-[60px]" {...fadeUp}>
          <span className="font-secondary text-xs font-semibold text-accent-creative tracking-[3px] uppercase block mb-2">04</span>
          <h2 className="text-[2.5rem] max-sm:text-[1.8rem] font-bold tracking-tight leading-[1.2]">Experience</h2>
          <div className="w-[60px] h-[3px] rounded-[2px] gradient-accent mt-4" />
        </motion.div>

        <div className="relative pl-8 max-sm:pl-6 before:content-[''] before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-accent-creative before:to-accent-logical">
          <motion.div className="relative pb-12 last:pb-0" {...fadeUp}>
            <div className="absolute left-[-24px] top-1 w-4 h-4 rounded-full bg-accent-creative border-3 border-bg-primary shadow-[0_0_0_2px_var(--color-accent-creative)] max-sm:left-[-17px] max-sm:w-3 max-sm:h-3" />
            <div className="text-xs font-semibold text-accent-logical mb-2 font-secondary">2024 — Present</div>
            <div className="p-6 rounded-[16px] glass border-border-glass transition-all duration-300 hover:border-white/12 hover:translate-x-1">
              <h3 className="text-lg font-bold mb-1">Coding Mentor</h3>
              <h4 className="text-sm text-text-secondary font-medium mb-2.5 font-secondary">Vidya Darshan School</h4>
              <p className="text-sm text-text-secondary font-secondary leading-relaxed">
                Mentoring students in web development, guiding them through HTML, CSS, JavaScript, and modern frameworks. Conducting workshops and code reviews to foster a love for programming.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {['Mentoring', 'Web Dev', 'JavaScript'].map((t, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md text-[0.7rem] font-semibold bg-bg-card text-text-muted border border-border-glass">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
