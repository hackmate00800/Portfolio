import { FiArrowUp } from 'react-icons/fi'
import SocialIcon from './SocialIcon'

const socials = ['github', 'linkedin', 'instagram']

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="py-12 px-6 border-t border-border-glass">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-4">
        <div className="text-lg font-bold tracking-tight">
          <span className="text-accent-logical/60 font-light">&lt;</span>
          <span className="text-text-primary">ankit</span>
          <span className="text-accent-logical/60 font-light">&nbsp;/&gt;</span>
        </div>
        <p className="text-sm text-text-secondary font-secondary">Creative Mind + Logical Thinking = Powerful Solutions</p>

        {/* Social icons with glow hover */}
        <div className="flex gap-3">
          {socials.map((p, i) => (
            <SocialIcon key={p} platform={p} variant="footer" />
          ))}
        </div>

        <p className="text-xs text-text-muted">
          &copy; {year} Ankit. All rights reserved. Built with React &amp; Tailwind CSS
        </p>

        <button onClick={scrollTop}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent-creative hover:border-accent-creative/40 hover:-translate-y-1 transition-all duration-300">
          <FiArrowUp size={16} />
        </button>
      </div>
    </footer>
  )
}
