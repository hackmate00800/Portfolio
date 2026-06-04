import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const frontendSkills = [
  { name: 'HTML', pct: 95 },
  { name: 'CSS', pct: 90 },
  { name: 'JavaScript', pct: 85 },
  { name: 'React', pct: 80 },
]

const backendSkills = [
  { name: 'Node.js', pct: 78 },
  { name: 'MongoDB', pct: 75 },
  { name: 'Java', pct: 70 },
  { name: 'Git', pct: 85 },
]

function SkillBar({ name, pct }) {
  const barRef = useRef(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = pct + '%'
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [pct])

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text-secondary">{name}</span>
        <span className="text-xs font-bold text-accent-logical font-secondary">{pct}%</span>
      </div>
      <div className="h-[6px] bg-bg-card rounded-[3px] overflow-hidden">
        <div ref={barRef} className="h-full rounded-[3px] gradient-accent transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ width: '0%' }} />
      </div>
    </div>
  )
}

function SkillGroup({ title, skills, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}>
      <h3 className="text-xl font-semibold mb-6 text-text-primary relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-[2px] after:rounded-[1px] after:gradient-accent">
        {title}
      </h3>
      {skills.map((s) => (
        <SkillBar key={s.name} name={s.name} pct={s.pct} />
      ))}
    </motion.div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden scroll-mt-20">
      <div className="max-w-[1100px] mx-auto relative z-2">
        <motion.div className="mb-[60px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-secondary text-xs font-semibold text-accent-creative tracking-[3px] uppercase block mb-2">02</span>
          <h2 className="text-[2.5rem] max-sm:text-[1.8rem] font-bold tracking-tight leading-[1.2]">Skills &amp; Expertise</h2>
          <div className="w-[60px] h-[3px] rounded-[2px] gradient-accent mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 gap-12 max-lg:grid-cols-1">
          <SkillGroup title="Frontend" skills={frontendSkills} index={0} />
          <SkillGroup title="Backend &amp; Other" skills={backendSkills} index={1} />
        </div>
      </div>
    </section>
  )
}
