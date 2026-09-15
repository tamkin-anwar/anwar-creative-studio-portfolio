import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { printConsoleEasterEgg } from './lib/consoleEasterEgg.ts'

printConsoleEasterEgg()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotFoundPage />
  </StrictMode>,
)
