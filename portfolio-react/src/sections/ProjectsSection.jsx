import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiUser } from 'react-icons/fi'
import { FaYoutube, FaPinterest, FaTruck, FaIndustry } from 'react-icons/fa'
import mitraThumb from '../assets/mitrapackermover.png'
import srThumb from '../assets/srindustries.png'

const projects = [
  {
    title: 'FunTube',
    desc: 'YouTube clone with video streaming, user authentication, and real-time comments.',
    tags: ['React', 'Node.js', 'MongoDB'],
    icon: FaYoutube,
    gradient: 'from-[#ff6b6b] to-[#ee5a24]',
    link: 'https://funtime-eohve8tjj-hackmate-s-projects.vercel.app/login',
  },
  {
    title: 'Pixtract',
    desc: 'Pinterest clone with image uploads, boards, and social features.',
    tags: ['React', 'Express', 'PostgreSQL'],
    icon: FaPinterest,
    gradient: 'from-[#e84393] to-[#fd79a8]',
    link: 'https://pixtract.onrender.com',
  },
  {
    title: 'Portfolio',
    desc: 'Premium interactive portfolio with split-face concept and cinematic UI.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    icon: FiUser,
    gradient: 'from-[#6c5ce7] to-[#a29bfe]',
    link: 'https://hackmateportfolio.vercel.app/',
  },
  {
    title: 'Mitra Packer Mover',
    desc: 'Packers and movers service website with AI cost estimation, FAQ schema, and pan-India service coverage.',
    tags: ['React', 'Vite', 'Tailwind CSS'],
    icon: FaTruck,
    gradient: 'from-[#1e3a5f] to-[#4a90d9]',
    label: 'Freelancing',
    link: 'https://mitrapackermover.com',
    image: mitraThumb,
  },
  {
    title: 'SR Industries',
    desc: 'Industrial service provider website showcasing manufacturing capabilities and client portfolio.',
    tags: ['React', 'Vite', 'Tailwind CSS'],
    icon: FaIndustry,
    gradient: 'from-[#e67e22] to-[#f39c12]',
    label: 'Freelancing',
    link: 'https://srindustriesindia.org',
    image: srThumb,
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
    <section id="projects" className="relative py-24 px-6 bg-bg-secondary overflow-hidden scroll-mt-20">
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
                  <div className="absolute inset-0 bg-bg-primary/30 group-hover:bg-bg-primary/10 transition-colors duration-400" />
                  {p.label && (
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[0.65rem] font-bold uppercase tracking-wider glass text-text-primary border-border-glass backdrop-blur-sm">
                      {p.label}
                    </span>
                  )}
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <Icon className="text-5xl text-text-primary/60 z-1 transition-all duration-400 group-hover:opacity-100 group-hover:scale-115" />
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
                  <div className="flex gap-2">
                    <a href="#" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-bg-card text-text-secondary border border-border-glass transition-all duration-300 hover:bg-glass hover:text-text-primary">
                      <FiGithub size={13} /> Code
                    </a>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold gradient-accent text-text-primary border-transparent transition-all duration-300 hover:opacity-90 hover:-translate-y-px hover:shadow-lg">
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
