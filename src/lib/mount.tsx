import { StrictMode, type ReactNode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

/** Hydrates the prerendered HTML when it's there (production builds),
 * and renders from scratch when it isn't (the dev server). */
export function mount(root: HTMLElement, node: ReactNode) {
  const tree = <StrictMode>{node}</StrictMode>
  if (root.hasChildNodes()) hydrateRoot(root, tree)
  else createRoot(root).render(tree)
}
