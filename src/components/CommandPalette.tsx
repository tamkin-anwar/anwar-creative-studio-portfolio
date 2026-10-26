import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { links } from '../content/links'
import { OPEN_EVENT } from '../lib/commandPalette'

const BASE = import.meta.env.BASE_URL

type Item = {
  group: string
  label: string
  href: string
  external?: boolean
  description?: string
}

const ITEMS: Item[] = [
  { group: 'Products', label: 'Corres', description: 'Email, considered. In beta on iPhone, iPad, Mac and Apple Watch.', href: links.corres, external: true },
  { group: 'Products', label: 'Artha', description: 'Know what’s safe to spend. On the web, and in beta on iPhone, iPad and Mac.', href: links.artha, external: true },
  { group: 'Company', label: 'Home', href: BASE },
  { group: 'Company', label: 'About', href: `${BASE}about/` },
  { group: 'Company', label: 'Journal', description: 'Releases and milestones', href: `${BASE}journal/` },
  { group: 'Company', label: 'Press kit', href: `${BASE}press/` },
  { group: 'Company', label: 'Contact and support', href: `${BASE}contact/` },
  { group: 'Company', label: 'Now', description: 'What the studio is working on', href: `${BASE}now/` },
  { group: 'Company', label: 'Colophon', description: 'How this site is built', href: `${BASE}colophon/` },
  { group: 'Company', label: 'Privacy', href: `${BASE}privacy/` },
  { group: 'Company', label: 'Terms', href: `${BASE}terms/` },
  { group: 'Jump to', label: 'Corres, the tour', description: 'Corres on the Mac and iPhone', href: `${BASE}#corres` },
  { group: 'Jump to', label: 'Artha, the tour', description: 'Artha on the iPhone', href: `${BASE}#artha` },
  { group: 'Jump to', label: 'Recently', href: `${BASE}#recently` },
  { group: 'Jump to', label: 'Principles', href: `${BASE}#principles` },
  { group: 'Jump to', label: 'From the workshop', href: `${BASE}#workshop` },
  { group: 'From the workshop', label: 'Tether', href: links.tether, external: true },
  { group: 'From the workshop', label: 'Jotfield', href: links.jotfield, external: true },
  { group: 'From the workshop', label: 'Doorsong', href: links.doorsong, external: true },
  { group: 'Elsewhere', label: 'Email the studio', description: links.email, href: `mailto:${links.email}` },
  { group: 'Elsewhere', label: 'GitHub', href: links.github, external: true },
].filter((item) => item.href)

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const items = q ? ITEMS.filter((item) => `${item.label} ${item.description ?? ''}`.toLowerCase().includes(q)) : ITEMS
    const groups: { group: string; items: Item[] }[] = []
    for (const item of items) {
      const last = groups[groups.length - 1]
      if (last && last.group === item.group) last.items.push(item)
      else groups.push({ group: item.group, items: [item] })
    }
    return groups
  }, [query])

  const flat = useMemo(() => results.flatMap((g) => g.items), [results])

  useEffect(() => {
    setSelected(0)
  }, [query])

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key === 'k' || e.key === 'K'
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault()
        setOpen((o) => !o)
        return
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement
      setQuery('')
      const t = setTimeout(() => inputRef.current?.focus(), 10)
      return () => clearTimeout(t)
    }
    lastFocused.current?.focus()
  }, [open])

  useEffect(() => {
    if (open) dialogRef.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [open, selected, query])

  const navigate = (item: Item) => {
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = item.href
    }
    setOpen(false)
  }

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.max(0, Math.min(s + 1, flat.length - 1)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = flat[selected]
      if (item) navigate(item)
    }
  }

  return (
    <>
      {open
        ? createPortal(
            <div
              ref={dialogRef}
              onKeyDown={(event) => {
                // the search field is the palette's only stop: arrows move through results
                if (event.key !== 'Tab') return
                event.preventDefault()
                inputRef.current?.focus()
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="fixed inset-0 z-[70] flex items-start justify-center px-[var(--space-3)] pt-[15vh]"
              style={{ background: 'rgba(10,10,13,0.7)' }}
              onClick={() => setOpen(false)}
            >
              <div
                className="w-full max-w-lg overflow-hidden rounded-2xl border"
                style={{ background: 'var(--bg)', borderColor: 'var(--line-strong)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  ref={inputRef}
                  aria-label="Search sections, pages, and products"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-results"
                  aria-autocomplete="list"
                  aria-activedescendant={flat.length ? `palette-option-${selected}` : undefined}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Go to a page or product"
                  className="font-mono w-full bg-transparent outline-none"
                  style={{
                    padding: 'var(--space-3)',
                    fontSize: 'var(--text-body)',
                    color: 'var(--ink)',
                    borderBottom: '1px solid var(--line)',
                  }}
                />
                <div id="palette-results" role="listbox" aria-label="Results" className="max-h-[50vh] overflow-y-auto py-[var(--space-2)]">
                  {flat.length === 0 ? (
                    <p
                      role="status"
                      className="font-mono"
                      style={{
                        padding: 'var(--space-3)',
                        color: 'var(--ink-faint)',
                        fontSize: 'var(--text-caption)',
                      }}
                    >
                      No matches.
                    </p>
                  ) : (
                    results.map((group, g) => (
                      <div key={group.group} role="group" aria-labelledby={`palette-group-${g}`}>
                        <p
                          id={`palette-group-${g}`}
                          className="eyebrow"
                          style={{ padding: '8px var(--space-3) 4px', fontSize: '10px' }}
                        >
                          {group.group}
                        </p>
                        {group.items.map((item) => {
                          const index = flat.indexOf(item)
                          const isSelected = index === selected
                          return (
                            <button
                              data-selected={isSelected}
                              key={`${item.group}-${item.label}`}
                              id={`palette-option-${index}`}
                              role="option"
                              aria-selected={isSelected}
                              tabIndex={-1}
                              type="button"
                              onMouseEnter={() => setSelected(index)}
                              onClick={() => navigate(item)}
                              className="flex w-full items-center justify-between text-left"
                              style={{
                                padding: '10px var(--space-3)',
                                background: isSelected ? 'var(--line)' : 'transparent',
                                color: 'var(--ink)',
                              }}
                            >
                              <span>{item.label}{item.description ? <span className="block text-sm" style={{ color: 'var(--ink-dim)' }}>{item.description}</span> : null}</span>
                              {item.external ? (
                                <span
                                  className="font-mono"
                                  style={{ fontSize: '10px', color: 'var(--ink-faint)' }}
                                >
                                  <span aria-hidden="true">&#8599;</span>
                                  <span className="sr-only">, opens in a new tab</span>
                                </span>
                              ) : null}
                            </button>
                          )
                        })}
                      </div>
                    ))
                  )}
                </div>
                <div
                  className="font-mono flex items-center justify-end gap-[var(--space-3)]"
                  style={{
                    padding: '8px var(--space-3)',
                    borderTop: '1px solid var(--line)',
                    fontSize: '10px',
                    color: 'var(--ink-faint)',
                  }}
                >
                  <span>&#8593;&#8595; navigate</span>
                  <span>&#8629; go</span>
                  <span>esc close</span>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
