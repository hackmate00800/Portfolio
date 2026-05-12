import { motion } from 'framer-motion'
import SocialIcon from './SocialIcon'

const platforms = ['github', 'linkedin', 'instagram']

export default function SocialDock() {
  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 max-lg:hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2 }}>
      {platforms.map((p, i) => (
        <motion.div
          key={p}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 2 + i * 0.15 }}>
          <SocialIcon platform={p} size={16} />
        </motion.div>
      ))}
      <div className="w-px h-12 mx-auto mt-2 bg-gradient-to-b from-accent-creative to-accent-logical opacity-40" />
    </motion.div>
  )
}
