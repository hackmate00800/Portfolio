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
import SectionConnector from './components/SectionConnector'
import Atmosphere from './components/Atmosphere'
import ScrollGradient from './components/ScrollGradient'

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
      <Atmosphere />
      <ScrollGradient />
      <SocialDock />

      <main>
        <HeroSection />
        <SectionConnector fromColor="bg-bg-primary" toColor="bg-bg-secondary" />
        <AboutSection />
        <SectionConnector fromColor="bg-bg-secondary" toColor="bg-bg-primary" />
        <SkillsSection />
        <SectionConnector fromColor="bg-bg-primary" toColor="bg-bg-secondary" />
        <ProjectsSection />
        <SectionConnector fromColor="bg-bg-secondary" toColor="bg-bg-primary" />
        <GitHubStats />
        <SectionConnector fromColor="bg-bg-primary" toColor="bg-bg-secondary" />
        <LinkedInCard />
        <SectionConnector fromColor="bg-bg-secondary" toColor="bg-bg-primary" />
        <InstagramShowcase />
        <SectionConnector fromColor="bg-bg-primary" toColor="bg-bg-primary" />
        <ExperienceSection />
        <SectionConnector fromColor="bg-bg-primary" toColor="bg-bg-secondary" />
        <ContactSection />
      </main>

      <Footer />
    </motion.div>
  )
}
