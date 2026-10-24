import { mount } from './lib/mount.tsx'
import './index.css'
import { NotFoundPage } from './pages/NotFoundPage.tsx'

void import('./lib/consoleEasterEgg.ts').then((m) => m.printConsoleEasterEgg())

mount(document.getElementById('root')!, <NotFoundPage />)
