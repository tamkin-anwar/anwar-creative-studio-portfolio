import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ColophonPage } from './pages/ColophonPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColophonPage />
  </StrictMode>,
)
