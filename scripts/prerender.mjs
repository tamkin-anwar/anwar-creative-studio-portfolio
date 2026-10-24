// Fills each built page's empty #root with its server-rendered HTML.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const { render } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href)

const pages = {
  'index.html': 'home',
  'now/index.html': 'now',
  'colophon/index.html': 'colophon',
  '404.html': 'notFound',
  'about/index.html': 'about',
  'contact/index.html': 'contact',
  'privacy/index.html': 'privacy',
  'terms/index.html': 'terms',
  'journal/index.html': 'journal',
  'press/index.html': 'press',
}

for (const [file, page] of Object.entries(pages)) {
  const path = join(root, 'dist', file)
  const html = readFileSync(path, 'utf8')
  const filled = html.replace(/(<div id="root"[^>]*>)(<\/div>)/, (_, open, close) => `${open}${render(page)}${close}`)
  if (filled === html) throw new Error(`No empty #root in ${file}`)
  writeFileSync(path, filled)
}

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Prerendered ${Object.keys(pages).length} pages`)
