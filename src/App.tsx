import { useState } from 'react'
import { Preloader } from './components/Preloader'
import { AmbientField } from './components/scene/AmbientField'
import { ScrollProgressRail } from './components/ScrollProgressRail'
import { Hero } from './components/sections/Hero'
import { StudioStatement } from './components/sections/StudioStatement'
import { Projects } from './components/sections/Projects'
import { Roadmap } from './components/sections/Roadmap'
import { Footer } from './components/sections/Footer'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <AmbientField />
      <ScrollProgressRail />
      <main id="main-content">
        <Hero />
        <StudioStatement />
        <Projects />
        <Roadmap />
      </main>
      <Footer />
    </>
  )
}

export default App
