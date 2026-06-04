import { useState } from 'react'
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

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div
        className="relative min-h-screen bg-bg-primary text-text-primary font-primary overflow-x-hidden"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease, background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, fill 0.4s ease, stroke 0.4s ease'
        }}
      >
        <Banner loaded={loaded} />
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <FloatingShapes />
        <Atmosphere />
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
          <SectionConnector fromColor="bg-bg-secondary" toColor="bg-bg-primary" />
          <LinkedInCard />
          <SectionConnector fromColor="bg-bg-secondary" toColor="bg-bg-primary" />
          <InstagramShowcase />
          <SectionConnector fromColor="bg-bg-primary" toColor="bg-bg-primary" />
          <ExperienceSection />
          <SectionConnector fromColor="bg-bg-primary" toColor="bg-bg-secondary" />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  )
}
