import useScrollProgress from '../hooks/useScrollProgress'

export default function ScrollProgress() {
  const ref = useScrollProgress()
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 h-[3px] z-[10000] gradient-accent origin-left pointer-events-none will-change-transform"
    />
  )
}
