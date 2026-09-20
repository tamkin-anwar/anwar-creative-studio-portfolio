/** Printed once per page load for anyone who opens devtools. Real
 * substance, not a joke: what this is and where to actually look next. */
export function printConsoleEasterEgg() {
  if (typeof window === 'undefined' || typeof console === 'undefined') return

  const site = `https://tamkin-anwar.github.io${import.meta.env.BASE_URL}`
  const bg = 'background:#0a0a0d;'
  const warm = 'color:#d9a15c;'
  const cool = 'color:#7c6fa8;'
  const ink = 'color:#f2ede2;'
  const dim = 'color:#f2ede299;'
  const mono = 'font-family:ui-monospace,"JetBrains Mono",monospace;'

  console.log('%c✦', `${bg}${warm}font-size:32px;line-height:1;padding:4px 0 0;`)
  console.log(
    '%cANWAR CREATIVE STUDIO',
    `${bg}${ink}${mono}font-size:20px;font-weight:700;letter-spacing:3px;padding:2px 0 8px;`,
  )
  console.log(
    "%cLooked for it. Didn't love it. Built it.",
    `${bg}${cool}${mono}font-style:italic;font-size:13px;padding-bottom:8px;`,
  )
  console.log(
    '%cFive live projects. Corres and Ranna in development.',
    `${bg}${dim}${mono}font-size:12px;padding-bottom:6px;`,
  )
  console.log(
    `%cHow this is built  →  %c${site}colophon/`,
    `${bg}${ink}${mono}font-size:12px;`,
    `${bg}${warm}${mono}font-size:12px;`,
  )
  console.log(
    `%cWhat's active now  →  %c${site}now/`,
    `${bg}${ink}${mono}font-size:12px;`,
    `${bg}${warm}${mono}font-size:12px;`,
  )
  console.log(
    `%cSource              →  %chttps://github.com/tamkin-anwar/anwar-creative-studio-portfolio`,
    `${bg}${ink}${mono}font-size:12px;`,
    `${bg}${warm}${mono}font-size:12px;`,
  )
}
