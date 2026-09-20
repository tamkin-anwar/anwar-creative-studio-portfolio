import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NowPage } from './pages/NowPage.tsx'

void import('./lib/consoleEasterEgg.ts').then((m) => m.printConsoleEasterEgg())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NowPage />
  </StrictMode>,
)
