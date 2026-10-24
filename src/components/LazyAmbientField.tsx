import { lazy, Suspense, useEffect, useState } from 'react'

// Decorative and non-critical: split into its own chunk so first paint of
// real content never waits on it, on any page.
const AmbientField = lazy(() =>
  import('./scene/AmbientField').then((m) => ({ default: m.AmbientField })),
)

export function LazyAmbientField() {
  // Browser-only: prerendered HTML leaves it out, so hydration matches and
  // the field starts once the page is live.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <Suspense fallback={null}>
      <AmbientField />
    </Suspense>
  )
}
