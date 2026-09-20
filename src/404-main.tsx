import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NotFoundPage } from './pages/NotFoundPage.tsx'

void import('./lib/consoleEasterEgg.ts').then((m) => m.printConsoleEasterEgg())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotFoundPage />
  </StrictMode>,
)
