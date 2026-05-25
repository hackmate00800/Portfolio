import { motion } from 'framer-motion'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import FloatingShapes from './components/FloatingShapes'
import SocialDock from './components/SocialDock'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ExperienceSection from './sections/ExperienceSection'
import GitHubStats from './components/GitHubStats'
import LinkedInCard from './components/LinkedInCard'
import InstagramShowcase from './components/InstagramShowcase'
import ContactSection from './sections/ContactSection'

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-bg-primary text-text-primary font-primary overflow-x-hidden">
      <Banner />
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <FloatingShapes />
      <SocialDock />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <GitHubStats />
        <LinkedInCard />
        <InstagramShowcase />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />
    </motion.div>
  )
}
