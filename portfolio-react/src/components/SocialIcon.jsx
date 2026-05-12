import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

const platforms = {
  github: {
    icon: FaGithub,
    href: 'https://github.com/hackmate00800',
    label: 'GitHub',
    username: 'hackmate00800',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]',
    hoverBg: 'hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/40',
    color: 'text-purple-400',
  },
  linkedin: {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/ankit-singh-3ab014391',
    label: 'LinkedIn',
    username: 'ankit-singh-3ab014391',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]',
    hoverBg: 'hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/40',
    color: 'text-blue-400',
  },
  instagram: {
    icon: FaInstagram,
    href: 'https://www.instagram.com/_hack_mate_',
    label: 'Instagram',
    username: '_hack_mate_',
    glow: 'shadow-[0_0_20px_rgba(236,72,153,0.3)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]',
    hoverBg: 'hover:bg-pink-500/20 hover:text-pink-300 hover:border-pink-500/40',
    color: 'text-pink-400',
  },
}

export default function SocialIcon({ platform, size = 18, variant = 'default', className = '' }) {
  const p = platforms[platform]
  if (!p) return null
  const Icon = p.icon

  if (variant === 'card') {
    return (
      <motion.a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex items-center gap-4 p-5 glass rounded-xl border-border-glass transition-all duration-400 hover:-translate-y-1 ${p.hoverBg} ${className}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        aria-label={p.label}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-current/10 ${p.color} transition-transform duration-300 group-hover:scale-110`}>
          <Icon />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-text-primary">{p.label}</p>
          <p className="text-xs text-text-muted mt-0.5">{p.username}</p>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border border-border-glass ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </div>
      </motion.a>
    )
  }

  if (variant === 'footer') {
    return (
      <motion.a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-11 h-11 rounded-full glass flex items-center justify-center text-text-secondary transition-all duration-300 border border-border-glass ${p.hoverBg} ${p.glow} ${className}`}
        whileHover={{ scale: 1.15, y: -2 }}
        aria-label={p.label}>
        <Icon size={18} />
      </motion.a>
    )
  }

  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary transition-all duration-300 ${p.hoverBg} ${p.glow} ${className}`}
      whileHover={{ scale: 1.2, y: -3 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      aria-label={p.label}>
      <Icon size={size} />
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[0.6rem] font-semibold uppercase tracking-wider whitespace-nowrap bg-bg-primary text-text-primary border border-border-glass opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {p.label}
      </span>
    </motion.a>
  )
}

export { platforms }
