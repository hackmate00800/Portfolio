import useScrollProgress from '../hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[9999] gradient-accent"
      style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
    />
  )
}
