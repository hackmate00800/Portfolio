import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaBookOpen } from 'react-icons/fa'
import { VscLoading } from 'react-icons/vsc'

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] },
})

export default function GitHubStats() {
  const [data, setData] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const username = 'hackmate00800'
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`).then(r => r.json()),
    ])
      .then(([userData, repoData]) => {
        setData(userData)
        setRepos(Array.isArray(repoData) ? repoData : [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-[1100px] mx-auto flex items-center justify-center py-20">
          <VscLoading className="text-3xl text-accent-creative animate-spin" />
        </div>
      </section>
    )
  }

  const stats = [
    { label: 'Repositories', value: data?.public_repos ?? '-', icon: FaBookOpen, color: 'text-accent-creative', bg: 'bg-accent-creative/10' },
    { label: 'Followers', value: data?.followers ?? '-', icon: FaUsers, color: 'text-accent-logical', bg: 'bg-accent-logical/10' },
    { label: 'Following', value: data?.following ?? '-', icon: FaStar, color: 'text-accent-creative', bg: 'bg-accent-creative/10' },
    { label: 'Stars', value: repos.reduce((a, r) => a + (r.stargazers_count || 0), 0), icon: FaStar, color: 'text-accent-logical', bg: 'bg-accent-logical/10' },
  ]

  return (
    <section id="github" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute w-[350px] h-[350px] rounded-full bg-accent-creative/8 blur-[80px] top-1/3 -right-[10%] pointer-events-none animate-orb" style={{ animationDelay: '-8s' }} />
      <div className="max-w-[1100px] mx-auto relative z-2">
        <motion.div className="mb-[60px]" {...fadeUp()}>
          <span className="font-secondary text-xs font-semibold text-accent-creative tracking-[3px] uppercase block mb-2">06</span>
          <h2 className="text-[2.5rem] max-sm:text-[1.8rem] font-bold tracking-tight leading-[1.2]">GitHub Presence</h2>
          <div className="w-[60px] h-[3px] rounded-[2px] gradient-accent mt-4" />
        </motion.div>

        {/* Profile card */}
        <motion.div className="p-8 glass rounded-2xl border-border-glass mb-10 flex items-center gap-6 max-sm:flex-col max-sm:text-center" {...fadeUp(0.1)}>
          <motion.img
            src={data?.avatar_url || 'https://avatars.githubusercontent.com/u/0'}
            alt="GitHub Avatar"
            className="w-24 h-24 rounded-full border-3 border-accent-creative/40"
            whileHover={{ scale: 1.1, rotate: 5 }}
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text-primary">{data?.name || 'hackmate00800'}</h3>
            <p className="text-sm text-text-muted font-secondary mt-1">{data?.bio || 'Full-Stack Developer & Creative Designer'}</p>
            <a href="https://github.com/hackmate00800" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-full gradient-accent text-white text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
              <FaGithub size={14} /> View Profile
            </a>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-4 mb-12 max-sm:grid-cols-2 max-sm:gap-3">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div key={s.label} {...fadeUp(0.2 + i * 0.1)}
                className="p-5 glass rounded-xl border-border-glass text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/12">
                <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={16} />
                </div>
                <p className="text-2xl font-bold text-text-primary">{s.value}</p>
                <p className="text-xs text-text-muted font-secondary mt-1">{s.label}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Repos */}
        <h3 className="text-lg font-semibold text-text-primary mb-5">Recent Repositories</h3>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 glass rounded-xl border-border-glass transition-all duration-300 hover:-translate-y-1 hover:border-accent-creative/30 hover:shadow-[0_0_30px_var(--color-accent-creative-glow)] group"
              {...fadeUp(0.3 + i * 0.08)}>
              <div className="flex items-start gap-3">
                <FaBookOpen className="text-accent-creative mt-0.5 shrink-0" size={14} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate group-hover:text-accent-creative transition-colors">{repo.name}</p>
                  <p className="text-xs text-text-muted font-secondary mt-1 line-clamp-2">{repo.description || 'No description'}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-text-muted">
                    {repo.language && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-logical" />{repo.language}</span>}
                    <span className="flex items-center gap-1"><FaStar size={10} />{repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><FaCodeBranch size={10} />{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
