/** Printed once per page load for anyone who opens devtools. Real
 * substance, not a joke: what this is and where to actually look next. */
export function printConsoleEasterEgg() {
  if (typeof window === 'undefined' || typeof console === 'undefined') return

  const site = 'https://anwarcreativestudio.com/'
  const bg = 'background:#0b0b0e;'
  const gold = 'color:#e2ac5f;'
  const ink = 'color:#f2ede2;'
  const dim = 'color:rgba(242,237,226,.72);'
  const link = 'color:#d9a15c;'
  const serif = 'font-family:Fraunces,ui-serif,Georgia,serif;'
  const mono = 'font-family:ui-monospace,"JetBrains Mono",monospace;'

  // The wordmark, ending on the studio's gold point.
  console.log(
    '%cAnwar%c.',
    `${bg}${ink}${serif}font-size:30px;letter-spacing:-0.02em;padding:10px 0 6px 12px;`,
    `${bg}${gold}${serif}font-size:30px;padding:10px 12px 6px 0;`,
  )
  console.log(
    "%cLooked for it. Didn't love it. Built it.",
    `${bg}${ink}${serif}font-size:14px;padding:0 12px 8px;`,
  )
  console.log(
    '%cAn independent software company. Corres is in beta; Artha is live on the web.',
    `${bg}${dim}${mono}font-size:12px;padding:0 12px 6px;`,
  )
  console.log(
    `%cHow this is built  →  %c${site}colophon/`,
    `${bg}${ink}${mono}font-size:12px;padding-left:12px;`,
    `${bg}${link}${mono}font-size:12px;padding-right:12px;`,
  )
  console.log(
    `%cWhat's active now  →  %c${site}now/`,
    `${bg}${ink}${mono}font-size:12px;padding-left:12px;`,
    `${bg}${link}${mono}font-size:12px;padding-right:12px;`,
  )
  console.log(
    `%cSource             →  %chttps://github.com/tamkin-anwar/anwar-creative-studio-portfolio`,
    `${bg}${ink}${mono}font-size:12px;padding-left:12px;`,
    `${bg}${link}${mono}font-size:12px;padding-right:12px;`,
  )
}
