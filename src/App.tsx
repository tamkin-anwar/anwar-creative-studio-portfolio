import { useState } from 'react'
import { Preloader } from './components/Preloader'
import { LazyAmbientField } from './components/LazyAmbientField'
import { ScrollProgressRail } from './components/ScrollProgressRail'
import { CommandPalette } from './components/CommandPalette'
import { Hero } from './components/sections/Hero'
import { StudioStatement } from './components/sections/StudioStatement'
import { Principles } from './components/sections/Principles'
import { Flagships } from './components/sections/Flagships'
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
      <LazyAmbientField />
      <ScrollProgressRail />
      <CommandPalette />
      <main id="main-content">
        <Hero />
        <StudioStatement />
        <Flagships />
        <Projects />
        <Principles />
        <Roadmap />
      </main>
      <Footer />
    </>
  )
}

export default App
