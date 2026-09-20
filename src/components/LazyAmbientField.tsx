import { lazy, Suspense } from 'react'

// Decorative and non-critical: split into its own chunk so first paint of
// real content never waits on it, on any page.
const AmbientField = lazy(() =>
  import('./scene/AmbientField').then((m) => ({ default: m.AmbientField })),
)

export function LazyAmbientField() {
  return (
    <Suspense fallback={null}>
      <AmbientField />
    </Suspense>
  )
}
