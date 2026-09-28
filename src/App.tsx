import { useEffect, useState } from 'react'
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

  // Links like /#corres (from the /now page) land here while the preloader
  // still covers the page and sections are still settling, so the browser's
  // own jump to the anchor is lost. Once the page is ready, go there.
  useEffect(() => {
    if (!loaded) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const target = document.getElementById(id)
    if (!target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }))
  }, [loaded])

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
