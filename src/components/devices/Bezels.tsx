// Apple's Product Bezels, drawn over the live screens. Each frame is a
// <picture> so the browser fetches only the one it shows: the black iPhone
// in dark mode, the silver one in light, and no MacBook at all on phones,
// where the Mac layout drops its frame.

const BASE = import.meta.env.BASE_URL
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export function IPhoneBezel() {
  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={`${BASE}devices/iphone-18-pro-black.webp`} />
      <img className="bezel" src={`${BASE}devices/iphone-18-pro-silver.webp`} alt="" loading="lazy" decoding="async" />
    </picture>
  )
}

export function MacBezel() {
  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={BLANK} />
      <img className="bezel" src={`${BASE}devices/macbook-pro-14-space-black.webp`} alt="" decoding="async" />
    </picture>
  )
}
