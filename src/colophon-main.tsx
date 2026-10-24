import { mount } from './lib/mount.tsx'
import './index.css'
import { ColophonPage } from './pages/ColophonPage.tsx'

void import('./lib/consoleEasterEgg.ts').then((m) => m.printConsoleEasterEgg())

mount(document.getElementById('root')!, <ColophonPage />)
