import { StrictMode, type ComponentType } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { NowPage } from './pages/NowPage.tsx'
import { ColophonPage } from './pages/ColophonPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { ContactPage } from './pages/ContactPage.tsx'
import { PrivacyPage } from './pages/PrivacyPage.tsx'
import { TermsPage } from './pages/TermsPage.tsx'
import { JournalPage } from './pages/JournalPage.tsx'
import { PressPage } from './pages/PressPage.tsx'

// Used only at build time (scripts/prerender.mjs) so every page ships real
// HTML for search engines and link previews; the browser then hydrates it.
const pages: Record<string, ComponentType> = {
  home: App,
  now: NowPage,
  colophon: ColophonPage,
  notFound: NotFoundPage,
  about: AboutPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  journal: JournalPage,
  press: PressPage,
}

export function render(page: string) {
  const Page = pages[page]
  if (!Page) throw new Error(`No page called ${page}`)
  return renderToString(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
}
