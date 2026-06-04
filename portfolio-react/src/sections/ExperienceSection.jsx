import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
}

const experiences = [
  {
    date: '2022 — Present',
    role: 'Teacher / Educator',
    subtitle: '',
    description: [
      '3+ years of experience in teaching and mentoring students.',
      'Designed structured learning plans and simplified complex concepts for better understanding.',
      'Managed classroom activities, student engagement, and performance improvement.',
      'Developed strong communication, problem-solving, and leadership skills through education.',
    ],
    tags: ['Teaching', 'Mentoring', 'Curriculum Design', 'Communication', 'Leadership'],
    dotColor: 'bg-accent-creative',
    borderColor: 'shadow-[0_0_0_2px_var(--color-accent-creative)]',
  },
  {
    date: '2024 (6 Months)',
    role: 'Web Development Intern',
    subtitle: 'Whitedavid23',
    description: [
      'Gained practical industry experience in website development and real-world workflows.',
      'Worked on frontend development, UI improvements, and responsive design implementations.',
      'Learned professional debugging, version control, and project handling methodologies.',
      'Collaborated with the team to optimize website performance and enhance user experience.',
    ],
    tags: ['Frontend', 'UI/UX', 'Responsive Design', 'Debugging', 'Collaboration'],
    dotColor: 'bg-accent-logical',
    borderColor: 'shadow-[0_0_0_2px_var(--color-accent-logical)]',
  },
  {
    date: '2023 — Present',
    role: 'Website Developer & Digital Solutions Provider',
    subtitle: 'Freelance',
    description: [
      'Delivered custom websites for clients tailored to their business requirements and goals.',
      'Converted ideas into modern, responsive, and user-friendly digital experiences.',
      'Handled end-to-end website structure, design implementation, optimization, and deployment.',
      'Client Projects: Mitra Packers & Movers — business website • SR Industries — company website',
    ],
    tags: ['Custom Websites', 'React', 'Responsive Design', 'Optimization', 'Deployment'],
    dotColor: 'bg-accent-creative',
    borderColor: 'shadow-[0_0_0_2px_var(--color-accent-creative)]',
  },
  {
    date: '2024 — Present',
    role: 'Shopify Store Developer',
    subtitle: 'Freelance',
    description: [
      'Build and customize Shopify-based online stores with tailored functionality.',
      'Create attractive product pages and improve store layouts for better conversions.',
      'Manage e-commerce features, product setup, and overall website optimization.',
      'Focus on delivering smooth user experiences and conversion-friendly store designs.',
    ],
    tags: ['Shopify', 'E-commerce', 'Product Pages', 'Store Optimization', 'Conversion'],
    dotColor: 'bg-accent-logical',
    borderColor: 'shadow-[0_0_0_2px_var(--color-accent-logical)]',
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative z-2">
        <motion.div className="mb-[60px]" {...fadeUp}>
          <span className="font-secondary text-xs font-semibold text-accent-creative tracking-[3px] uppercase block mb-2">04</span>
          <h2 className="text-[2.5rem] max-sm:text-[1.8rem] font-bold tracking-tight leading-[1.2]">Experience</h2>
          <div className="w-[60px] h-[3px] rounded-[2px] gradient-accent mt-4" />
        </motion.div>

        <div className="relative pl-8 max-sm:pl-6 before:content-[''] before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-accent-creative before:to-accent-logical">
          {experiences.map((exp, idx) => (
            <motion.div key={idx} className="relative pb-12 last:pb-0" {...fadeUp}>
              <div className={`absolute left-[-24px] top-1 w-4 h-4 rounded-full ${exp.dotColor} border-3 border-bg-primary ${exp.borderColor} max-sm:left-[-17px] max-sm:w-3 max-sm:h-3`} />
              <div className="p-6 rounded-[16px] glass border-border-glass transition-all duration-300 hover:border-white/12 hover:translate-x-1">
                <h3 className="text-lg font-bold mb-1">{exp.role}</h3>
                {exp.subtitle && (
                  <h4 className="text-sm text-text-secondary font-medium mb-2.5 font-secondary">{exp.subtitle}</h4>
                )}
                <ul className="space-y-1.5">
                  {exp.description.map((line, i) => (
                    <li key={i} className="text-sm text-text-secondary font-secondary leading-relaxed flex items-start gap-2">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-text-muted flex-shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.tags.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-[0.7rem] font-semibold bg-bg-card text-text-muted border border-border-glass">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
