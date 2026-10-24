import type { ComponentType } from 'react'
import { mount } from './lib/mount.tsx'
import './index.css'
import { AboutPage } from './pages/AboutPage.tsx'
import { ContactPage } from './pages/ContactPage.tsx'
import { PrivacyPage } from './pages/PrivacyPage.tsx'
import { TermsPage } from './pages/TermsPage.tsx'
import { JournalPage } from './pages/JournalPage.tsx'
import { PressPage } from './pages/PressPage.tsx'

// One entry for the plain company pages; each HTML file names its page.
const pages: Record<string, ComponentType> = {
  about: AboutPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  journal: JournalPage,
  press: PressPage,
}

const root = document.getElementById('root')!
const Page = pages[root.dataset.page ?? ''] ?? AboutPage

mount(root, <Page />)
