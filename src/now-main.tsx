import { mount } from './lib/mount.tsx'
import './index.css'
import { NowPage } from './pages/NowPage.tsx'

void import('./lib/consoleEasterEgg.ts').then((m) => m.printConsoleEasterEgg())

mount(document.getElementById('root')!, <NowPage />)
