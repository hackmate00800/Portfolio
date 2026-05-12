import { motion } from 'framer-motion'

const badges = [
  { label: 'React', top: '10%', left: '8%' },
  { label: 'Node.js', top: '18%', right: '12%' },
  { label: 'HTML', top: '50%', left: '4%' },
  { label: 'CSS', top: '70%', right: '6%' },
  { label: 'JavaScript', top: '35%', right: '4%' },
  { label: 'MongoDB', top: '60%', left: '6%' },
  { label: 'Java', bottom: '15%', left: '50%' },
]

export default function FloatingBadges() {
  return (
    <div className="absolute inset-0 pointer-events-none z-2 hidden xl:block">
      {badges.map((b, i) => (
        <motion.span
          key={i}
          className="absolute px-4 py-2 rounded-full text-[0.72rem] font-semibold font-secondary glass text-text-secondary uppercase tracking-wide cursor-default pointer-events-auto"
          style={{ top: b.top, bottom: b.bottom, left: b.left, right: b.right }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: i * -1.2 }}
          whileHover={{ scale: 1.1, color: 'var(--color-text-primary)', borderColor: 'var(--color-accent-creative)' }}>
          {b.label}
        </motion.span>
      ))}
    </div>
  )
}
