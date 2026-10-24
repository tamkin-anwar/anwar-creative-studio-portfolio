import { useEffect } from 'react'
import { LazyAmbientField } from './components/LazyAmbientField'
import { ScrollProgressRail } from './components/ScrollProgressRail'
import { CommandPalette } from './components/CommandPalette'
import { SiteHeader } from './components/SiteHeader'
import { Hero } from './components/sections/Hero'
import { StudioStatement } from './components/sections/StudioStatement'
import { Principles } from './components/sections/Principles'
import { Flagships } from './components/sections/Flagships'
import { Workshop } from './components/sections/Workshop'
import { Footer } from './components/sections/Footer'

function App() {
  // Links like /#corres from other pages arrive before sections have settled,
  // so the browser's own jump to the anchor can land short. Go there once ready.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const target = document.getElementById(id)
    if (!target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }))
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <LazyAmbientField />
      <SiteHeader />
      <ScrollProgressRail />
      <CommandPalette />
      <main id="main-content">
        <Hero />
        <StudioStatement />
        <Flagships />
        <Principles />
        <Workshop />
      </main>
      <Footer />
    </>
  )
}

export default App
