import { mount } from './lib/mount.tsx'
import './index.css'
import App from './App.tsx'

void import('./lib/consoleEasterEgg.ts').then((m) => m.printConsoleEasterEgg())

mount(document.getElementById('root')!, <App />)
