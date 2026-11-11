import { useEffect } from 'react'
import { CommandPalette } from './components/CommandPalette'
import { SiteHeader } from './components/SiteHeader'
import { Hero } from './components/sections/Hero'
import { ArthaSection } from './components/sections/ArthaSection'
import { CorresSection } from './components/sections/CorresSection'
import { MoreProducts } from './components/sections/MoreProducts'
import { Recently } from './components/sections/Recently'
import { Principles } from './components/sections/Principles'
import { Closing } from './components/sections/Closing'
import { Privacy } from './components/sections/Privacy'
import { Faq } from './components/sections/Faq'
import { Footnotes } from './components/sections/Footnotes'
import { Footer } from './components/sections/Footer'

function App() {
  // Links like /#corres from other pages arrive before the page has settled,
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
      <SiteHeader />
      <CommandPalette />
      <main id="main-content" className="wrap">
        <Hero />
        <ArthaSection />
        <CorresSection />
        <MoreProducts />
        <Recently />
        <Principles />
        <Privacy />
        <Faq />
        <Closing />
        <Footnotes />
      </main>
      <Footer />
    </>
  )
}

export default App
