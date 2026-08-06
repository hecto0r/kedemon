import { MotionConfig } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import HowItWorks from './components/HowItWorks'
import ForWhom from './components/ForWhom'
import Privacy from './components/Privacy'
import PilotForm from './components/PilotForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-lg focus-visible:bg-white focus-visible:px-4 focus-visible:py-3 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-navy focus-visible:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        <CustomCursor />
        <Navbar />
        <main id="main-content">
          <Hero />
          <StatsBar />
          <HowItWorks />
          <ForWhom />
          <Privacy />
          <PilotForm />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
