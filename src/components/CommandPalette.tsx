import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { links } from '../content/links'

const BASE = import.meta.env.BASE_URL

type Item = {
  group: string
  label: string
  href: string
  external?: boolean
}

const ITEMS: Item[] = [
  { group: 'Jump to', label: 'Top', href: `${BASE}#hero` },
  { group: 'Jump to', label: 'Studio', href: `${BASE}#about` },
  { group: 'Jump to', label: 'Principles', href: `${BASE}#principles` },
  { group: 'Jump to', label: 'Work', href: `${BASE}#work` },
  { group: 'Jump to', label: 'Now building', href: `${BASE}#roadmap` },
  { group: 'Jump to', label: 'Contact', href: `${BASE}#contact` },
  { group: 'Pages', label: 'Home', href: BASE },
  { group: 'Pages', label: 'Now', href: `${BASE}now/` },
  { group: 'Pages', label: 'Colophon', href: `${BASE}colophon/` },
  { group: 'Products', label: 'Doorsong', href: links.doorsong, external: true },
  { group: 'Products', label: 'Artha', href: links.artha, external: true },
  { group: 'Products', label: 'Tether', href: links.tether, external: true },
  { group: 'Products', label: 'Stub', href: links.stub, external: true },
  { group: 'Products', label: 'Jotfield', href: links.jotfield, external: true },
  { group: 'Elsewhere', label: 'GitHub', href: links.github, external: true },
].filter((item) => item.href)

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const items = q ? ITEMS.filter((item) => item.label.toLowerCase().includes(q)) : ITEMS
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
      setSelected((s) => Math.min(s + 1, flat.length - 1))
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-mono fixed right-[var(--space-4)] top-[var(--space-4)] z-40 flex items-center gap-1 rounded-full border tracking-[0.06em] backdrop-blur-sm transition-colors"
        style={{
          padding: '6px 10px',
          fontSize: 'var(--text-label)',
          color: 'var(--ink-faint)',
          borderColor: 'var(--line)',
          background: 'rgba(10,10,13,0.6)',
        }}
        aria-label="Open command palette"
      >
        Search
        <span
          className="rounded"
          style={{
            border: '1px solid var(--line-strong)',
            padding: '1px 5px',
            fontSize: '10px',
            color: 'var(--ink-faint)',
          }}
        >
          &#8984;K
        </span>
      </button>

      {open
        ? createPortal(
            <div
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
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Jump to a section, page, or product"
                  className="font-mono w-full bg-transparent outline-none"
                  style={{
                    padding: 'var(--space-3)',
                    fontSize: 'var(--text-body)',
                    color: 'var(--ink)',
                    borderBottom: '1px solid var(--line)',
                  }}
                />
                <div className="max-h-[50vh] overflow-y-auto py-[var(--space-2)]">
                  {flat.length === 0 ? (
                    <p
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
                    results.map((group) => (
                      <div key={group.group}>
                        <p
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
                              key={`${item.group}-${item.label}`}
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
                              <span>{item.label}</span>
                              {item.external ? (
                                <span
                                  className="font-mono"
                                  style={{ fontSize: '10px', color: 'var(--ink-faint)' }}
                                >
                                  &#8599;
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
