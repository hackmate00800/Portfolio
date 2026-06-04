import { motion } from 'framer-motion'

const waves = [
  'M0,40 C30,60 70,20 100,40 C130,60 170,20 200,40 C230,60 270,20 300,40 C330,60 370,20 400,40 L400,60 L0,60 Z',
  'M0,50 C40,30 80,70 120,50 C160,30 200,70 240,50 C280,30 320,70 360,50 C400,30 440,70 480,50 L480,60 L0,60 Z',
]

const blobs = [
  { w: 'w-72 h-72', top: '-20%', left: '-10%', color: 'from-purple-600/8 to-fuchsia-600/5', dur: '22s', dx: '40px', dy: '-35px' },
  { w: 'w-56 h-56', top: '-15%', right: '-5%', color: 'from-cyan-500/6 to-blue-500/4', dur: '18s', dx: '-30px', dy: '-25px' },
  { w: 'w-64 h-64', top: '-5%', left: '40%', color: 'from-fuchsia-500/5 to-purple-500/4', dur: '25s', dx: '20px', dy: '-40px' },
]

export default function SectionConnector({ fromColor = 'bg-bg-primary', toColor = 'bg-bg-secondary' }) {
  return (
    <div className={`relative w-full h-32 md:h-40 overflow-hidden ${fromColor}`}>
      {/* Gradient fade transition */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${toColor === 'bg-bg-secondary' ? 'to-[#12121a]' : 'to-[#0a0a0f]'} pointer-events-none`} />

      {/* Floating blobs at boundary */}
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute ${b.w} rounded-full bg-gradient-to-br ${b.color} blur-[80px] animate-blob-drift`}
          style={{
            top: b.top, left: b.left, right: b.right,
            '--dur': b.dur, '--drift-x': b.dx, '--drift-y': b.dy,
            '--opacity-from': '0.04', '--opacity-to': '0.12',
          }}
        />
      ))}

      {/* Wave SVG divider */}
      <div className="absolute bottom-0 left-0 w-[200%] h-full pointer-events-none">
        <svg className="w-full h-full animate-wave-flow" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="waveGradA" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="25%" stopColor="#a855f7" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#d946ef" stopOpacity="0.08" />
              <stop offset="75%" stopColor="#a855f7" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={waves[0]} fill="url(#waveGradA)" opacity="0.6" />
        </svg>
      </div>

      {/* Secondary wave (opposite direction) */}
      <div className="absolute bottom-0 left-[-50%] w-[200%] h-full pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true" style={{ animation: 'wave-flow 10s linear infinite reverse' }}>
          <defs>
            <linearGradient id="waveGradB" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.06" />
              <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={waves[1]} fill="url(#waveGradB)" opacity="0.4" />
        </svg>
      </div>

      {/* Glass edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* Particles at boundary */}
      <div className="absolute inset-0 pointer-events-none">
        {[0.15, 0.35, 0.55, 0.75, 0.9].map((x, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{ left: `${x * 100}%`, top: `${20 + i * 12}%` }}
            animate={{ y: [0, -8, 0], opacity: [0.05, 0.2, 0.05] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  )
}
