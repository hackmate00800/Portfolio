export default function TextPanel({ side, tag, title, desc, stats, onHover, onLeave }) {
  const isLeft = side === 'left'

  return (
    <div
      className={`flex-shrink-0 w-[200px] max-lg:w-full max-lg:max-w-[420px] z-10 transition-transform duration-400 ${
        isLeft ? '' : 'max-lg:text-left'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}>
      <div className="p-5 glass rounded-[16px] transition-all duration-400 relative overflow-hidden hover:-translate-y-1 group">
        <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ${
          isLeft ? 'bg-gradient-to-r from-accent-creative to-transparent' : 'bg-gradient-to-r from-transparent to-accent-logical'
        }`} />

        <span className={`inline-block text-[0.7rem] font-semibold uppercase tracking-[2px] px-2.5 py-1 rounded-full mb-2.5 ${
          isLeft
            ? 'text-accent-creative bg-accent-creative/20'
            : 'text-accent-logical bg-accent-logical/20'
        }`}>
          {tag}
        </span>

        <h2 className={`text-[1.8rem] font-bold leading-[1.1] mb-2 ${
          isLeft ? 'text-accent-creative' : 'text-accent-logical'
        }`}>
          {title}
        </h2>

        <p className="text-[0.8rem] text-text-secondary leading-relaxed font-secondary">{desc}</p>

        <div className={`flex gap-4 mt-3.5 pt-3.5 border-t border-border-glass ${!isLeft ? 'justify-end' : ''}`}>
          {stats.map((s, i) => (
            <div key={i} className={`flex flex-col ${!isLeft ? 'items-end' : ''}`}>
              <span className="text-[1.1rem] font-bold text-text-primary">{s.num}</span>
              <span className="text-[0.65rem] text-text-muted uppercase tracking-[0.5px]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
