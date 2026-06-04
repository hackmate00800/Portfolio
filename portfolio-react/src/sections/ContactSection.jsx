import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiCheckCircle, FiMail, FiMapPin, FiCopy } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import SocialIcon from '../components/SocialIcon'

const fields = [
  { key: 'name', label: 'Your Name', type: 'text' },
  { key: 'email', label: 'Your Email', type: 'email' },
  { key: 'message', label: 'Your Message', type: 'textarea' },
]

const connectCards = [
  { platform: 'github', title: 'GitHub', desc: 'Explore my projects and open-source work' },
  { platform: 'linkedin', title: 'LinkedIn', desc: 'Connect professionally and view experience' },
  { platform: 'instagram', title: 'Instagram', desc: 'Follow my coding journey and updates' },
]

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] },
})

export default function ContactSection() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [focused, setFocused] = useState({})
  const [values, setValues] = useState({})
  const [copied, setCopied] = useState(false)
  const formRef = useRef(null)

  const handleFocus = (key) => setFocused(prev => ({ ...prev, [key]: true }))
  const handleBlur = (key) => setFocused(prev => ({ ...prev, [key]: false }))
  const handleChange = (key, val) => setValues(prev => ({ ...prev, [key]: val }))
  const isFloating = (key) => focused[key] || values[key]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData(formRef.current)
    if (!fd.get('name') || !fd.get('email') || !fd.get('message')) return
    setLoading(true)
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSuccess(true)
      formRef.current.reset()
      setValues({})
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      alert('Failed to send. Check console for details.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('ankit9958707659@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative py-24 px-6 bg-bg-secondary overflow-hidden">
      <div className="absolute w-[300px] h-[300px] rounded-full bg-accent-creative/10 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-orb" style={{ animationDelay: '-5s' }} />
      <div className="max-w-[1100px] mx-auto relative z-2">
        <motion.div className="mb-[60px]" {...fadeUp()}>
          <span className="font-secondary text-xs font-semibold text-accent-creative tracking-[3px] uppercase block mb-2">05</span>
          <h2 className="text-[2.5rem] max-sm:text-[1.8rem] font-bold tracking-tight leading-[1.2]">Get In Touch</h2>
          <div className="w-[60px] h-[3px] rounded-[2px] gradient-accent mt-4" />
        </motion.div>

        {/* Connect With Me Cards */}
        <motion.div className="mb-12" {...fadeUp(0.05)}>
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-[2px] mb-5">Connect With Me</h3>
          <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
            {connectCards.map((card) => (
              <SocialIcon key={card.platform} platform={card.platform} variant="card" />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-[1fr_1.2fr] gap-12 max-lg:grid-cols-1">
          {/* Contact info */}
          <motion.div {...fadeUp(0.1)}>
            <p className="text-base font-secondary text-text-secondary leading-relaxed mb-7">
              Have a project in mind? Let&apos;s build something amazing together.
            </p>
            {[
              { icon: FiMail, label: 'Email', value: 'ankit9958707659@gmail.com', action: copyEmail, actionLabel: copied ? 'Copied!' : 'Copy' },
              { icon: FiMapPin, label: 'Location', value: 'India' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 glass rounded-xl border-border-glass mb-3 transition-all duration-300 hover:translate-x-1 hover:border-white/12">
                <div className="w-10 h-10 rounded-xl bg-accent-creative/20 text-accent-creative flex items-center justify-center flex-shrink-0">
                  <item.icon size={16} />
                </div>
                <div className="flex-1">
                  <span className="block text-[0.7rem] uppercase tracking-[1px] text-text-muted font-semibold">{item.label}</span>
                  <span className="block text-sm font-semibold text-text-primary">{item.value}</span>
                </div>
                {item.action && (
                  <button onClick={item.action} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted glass hover:text-accent-creative transition-all duration-300 shrink-0">
                    <FiCopy size={12} /> {item.actionLabel}
                  </button>
                )}
              </div>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form ref={formRef} onSubmit={handleSubmit} noValidate className="relative" {...fadeUp(0.15)}>
            {fields.map(({ key, label, type }) => {
              const isTextarea = type === 'textarea'
              const floating = isFloating(key)
              return (
                <div key={key} className="relative mb-5">
                  {isTextarea ? (
                    <textarea name={key} id={`form${key}`} required rows="4"
                      onFocus={() => handleFocus(key)} onBlur={() => handleBlur(key)}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full px-[18px] pt-6 pb-2 glass border-border-glass rounded-xl text-text-primary font-primary text-sm outline-none transition-all duration-300 focus:border-accent-logical focus:shadow-[0_0_0_3px_var(--color-accent-logical-glow)] resize-y min-h-[120px]" />
                  ) : (
                    <input type={type} name={key} id={`form${key}`} required
                      onFocus={() => handleFocus(key)} onBlur={() => handleBlur(key)}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full px-[18px] pt-6 pb-2 glass border-border-glass rounded-xl text-text-primary font-primary text-sm outline-none transition-all duration-300 focus:border-accent-logical focus:shadow-[0_0_0_3px_var(--color-accent-logical-glow)]" />
                  )}
                  <label htmlFor={`form${key}`}
                    className={`absolute left-[18px] text-text-muted pointer-events-none transition-all duration-300 px-1 bg-bg-primary
                      ${floating ? '-top-2.5 text-[0.7rem] text-accent-logical' : 'top-4 text-sm'}`}>
                    {label}
                  </label>
                </div>
              )
            })}

            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-xl gradient-accent text-white text-base font-semibold transition-all duration-300 hover:opacity-92 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 relative overflow-hidden">
              <span className={`transition-opacity duration-300 ${loading ? 'opacity-0' : ''}`}>Send Message</span>
              <FiSend className={`transition-opacity duration-300 ${loading ? 'opacity-0' : ''}`} />
              {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                </span>
              )}
            </button>

            {success && (
              <div className="flex items-center gap-2 p-4 mt-4 rounded-xl bg-accent-creative/10 border border-accent-creative/30 text-accent-creative font-semibold text-sm">
                <FiCheckCircle size={18} />
                <span>Message sent successfully!</span>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
