import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AboutPage } from './pages/AboutPage.tsx'
import { ContactPage } from './pages/ContactPage.tsx'
import { PrivacyPage } from './pages/PrivacyPage.tsx'
import { TermsPage } from './pages/TermsPage.tsx'

// One entry for the plain company pages; each HTML file names its page.
const pages: Record<string, ComponentType> = {
  about: AboutPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  terms: TermsPage,
}

const root = document.getElementById('root')!
const Page = pages[root.dataset.page ?? ''] ?? AboutPage

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
