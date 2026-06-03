import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiUser, FiPackage, FiBriefcase, FiCheckCircle } from 'react-icons/fi'
import { FaYoutube, FaPinterest } from 'react-icons/fa'

const projects = [
  {
    title: 'FunTube',
    desc: 'YouTube clone with video streaming, user authentication, and real-time comments.',
    tags: ['React', 'Node.js', 'MongoDB'],
    icon: FaYoutube,
    gradient: 'from-[#ff6b6b] to-[#ee5a24]',
  },
  {
    title: 'Pixtract',
    desc: 'Pinterest clone with image uploads, boards, and social features.',
    tags: ['React', 'Express', 'PostgreSQL'],
    icon: FaPinterest,
    gradient: 'from-[#e84393] to-[#fd79a8]',
  },
  {
    title: 'Portfolio',
    desc: 'Premium interactive portfolio with split-face concept and cinematic UI.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    icon: FiUser,
    gradient: 'from-[#6c5ce7] to-[#a29bfe]',
  },
  {
    title: 'Mitra Packer Mover',
    desc: 'Full-featured packers & movers website with AI cost estimator, real-time tracking, and WhatsApp integration.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    icon: FiPackage,
    gradient: 'from-[#0A3D91] to-[#1a6bff]',
    freelance: true,
    links: {
      github: 'https://github.com/hackmate00800/mitrapackermover',
      live: 'https://mitrapackermover.com',
    },
  },
  {
    title: 'SR Industries',
    desc: 'Professional industrial website for SR Industries showcasing manufacturing capabilities, products, and client portfolio.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    icon: FiBriefcase,
    gradient: 'from-[#dc2626] to-[#f97316]',
    freelance: true,
    links: {
      github: 'https://github.com/hackmate00800/SRindustries',
      live: 'https://srindustriesindia.org',
    },
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 px-6 bg-bg-secondary overflow-hidden">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-logical/15 blur-[80px] -bottom-[10%] -left-[5%] pointer-events-none animate-orb" style={{ animationDelay: '-10s' }} />
      <div className="max-w-[1100px] mx-auto relative z-2">
        <motion.div className="mb-[60px]" {...fadeUp()}>
          <span className="font-secondary text-xs font-semibold text-accent-creative tracking-[3px] uppercase block mb-2">03</span>
          <h2 className="text-[2.5rem] max-sm:text-[1.8rem] font-bold tracking-tight leading-[1.2]">Featured Projects</h2>
          <div className="w-[60px] h-[3px] rounded-[2px] gradient-accent mt-4" />
        </motion.div>

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {projects.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div key={i}
                className="rounded-[16px] glass border-border-glass overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:border-white/12 hover:shadow-2xl group"
                {...fadeUp(i * 0.15)}>
                <div className={`h-[180px] flex items-center justify-center bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-400" />
                  <Icon className="text-5xl text-white/60 z-1 transition-all duration-400 group-hover:opacity-100 group-hover:scale-115" />
                  {p.freelance && (
                    <div className="absolute top-3 left-3 z-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-md">
                      <FiCheckCircle size={11} className="text-green-600" />
                      <span className="text-[0.6rem] font-bold text-gray-800 tracking-wide uppercase">Freelance</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-text-secondary font-secondary leading-relaxed mb-3.5">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t, j) => (
                      <span key={j} className="px-2.5 py-1 rounded-md text-[0.7rem] font-semibold bg-bg-card text-text-muted border border-border-glass">{t}</span>
                    ))}
                  </div>
                  {p.freelance && (
                    <div className="flex items-center gap-1.5 mb-3 text-[0.65rem] font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-md w-fit">
                      <FiCheckCircle size={12} />
                      Client Fully Satisfied
                    </div>
                  )}
                  <div className="flex gap-2">
                    <a href="#" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-bg-card text-text-secondary border border-border-glass transition-all duration-300 hover:bg-glass hover:text-text-primary">
                      <FiGithub size={13} /> Code
                    </a>
                    <a href="#" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold gradient-accent text-white border-transparent transition-all duration-300 hover:opacity-90 hover:-translate-y-px hover:shadow-lg">
                      <FiExternalLink size={13} /> Live
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
