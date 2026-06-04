import useScrollProgress from '../hooks/useScrollProgress'

export default function ScrollProgress() {
  const ref = useScrollProgress()
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 h-[3px] z-[9999] gradient-accent origin-left will-change-transform"
    />
  )
}
