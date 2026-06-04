import { motion } from 'framer-motion'
import { FaInstagram, FaPlay, FaHeart, FaComment, FaExternalLinkAlt } from 'react-icons/fa'

const posts = [
  { id: 1, label: 'React Project', gradient: 'from-pink-500 via-purple-500 to-blue-500' },
  { id: 2, label: 'UI Design', gradient: 'from-yellow-400 via-pink-500 to-red-500' },
  { id: 3, label: 'Code Snippet', gradient: 'from-green-400 via-teal-500 to-blue-600' },
  { id: 4, label: 'Dev Tips', gradient: 'from-purple-500 via-pink-500 to-red-500' },
  { id: 5, label: 'Open Source', gradient: 'from-blue-400 via-cyan-500 to-teal-500' },
  { id: 6, label: 'Mentorship', gradient: 'from-orange-400 via-red-500 to-pink-500' },
]

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] },
})

export default function InstagramShowcase() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[80px] top-[20%] -left-[5%] pointer-events-none animate-orb" style={{ animationDelay: '-3s' }} />
      <div className="absolute w-[250px] h-[250px] rounded-full bg-yellow-500/8 blur-[80px] bottom-[10%] right-[10%] pointer-events-none animate-orb" style={{ animationDelay: '-12s' }} />

      <div className="max-w-[1100px] mx-auto relative z-2">
        <motion.div className="mb-[60px]" {...fadeUp()}>
          <span className="font-secondary text-xs font-semibold text-accent-creative tracking-[3px] uppercase block mb-2">Social</span>
          <h2 className="text-[2.5rem] max-sm:text-[1.8rem] font-bold tracking-tight leading-[1.2]">Coding Journey</h2>
          <div className="w-[60px] h-[3px] rounded-[2px] gradient-accent mt-4" />
        </motion.div>

        {/* Instagram profile card */}
        <motion.div className="glass rounded-2xl border-border-glass p-6 mb-8 flex items-center gap-5 max-sm:flex-col max-sm:text-center" {...fadeUp(0.1)}>
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-500 p-[3px] shrink-0"
            whileHover={{ scale: 1.1 }}>
            <div className="w-full h-full rounded-full bg-bg-primary flex items-center justify-center text-2xl text-pink-400 font-bold">@</div>
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-text-primary">_hack_mate_</h3>
            <p className="text-sm text-text-muted font-secondary mt-1">Daily coding tips, project walkthroughs & dev life</p>
          </div>
          <a href="https://www.instagram.com/_hack_mate_" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/30 shrink-0">
            <FaInstagram size={16} /> Follow
          </a>
        </motion.div>

        {/* Post grid */}
        <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-2 max-[400px]:grid-cols-1">
          {posts.map((post, i) => (
            <motion.div key={post.id} {...fadeUp(0.2 + i * 0.08)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-border-glass"
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-400`} />
              <div className="absolute inset-0 bg-bg-primary/40" />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-400 bg-bg-primary/60 backdrop-blur-sm">
                <FaPlay className="text-text-primary text-3xl drop-shadow-lg" />
                <span className="text-text-primary text-xs font-semibold tracking-wide">{post.label}</span>
                <div className="flex items-center gap-4 text-text-secondary text-xs">
                  <span className="flex items-center gap-1"><FaHeart size={12} /> 42</span>
                  <span className="flex items-center gap-1"><FaComment size={12} /> 12</span>
                </div>
              </div>

              {/* Bottom label always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-bg-primary/80 to-transparent">
                <p className="text-text-primary text-xs font-medium truncate">{post.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visit button */}
        <motion.div className="text-center mt-8" {...fadeUp(0.6)}>
          <a href="https://www.instagram.com/_hack_mate_" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border-border-glass text-text-secondary text-sm font-semibold transition-all duration-300 hover:text-text-primary hover:border-pink-500/40 hover:-translate-y-0.5 hover:shadow-lg">
            <FaExternalLinkAlt size={12} /> View All Posts
          </a>
        </motion.div>
      </div>
    </section>
  )
}
