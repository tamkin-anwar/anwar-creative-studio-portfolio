// The studio's identity. The hanging a: a lowercase a hanging from a
// Bengali-style headline, with the gold point in its counter. The lockup sets
// the symbol at exactly the cap height of "Anwar." (bar on the cap line, foot on
// the baseline), two stem widths from the A, and the gold full stop matches
// the point. Rules: design/README.md.

export function Symbol({ className = 'sym' }: { className?: string }) {
  return (
    <svg className={className} viewBox="8 9 48 46.5" aria-hidden="true">
      <rect x="8" y="9" width="48" height="7.5" rx="1" fill="currentColor" />
      <rect x="40.5" y="9" width="8" height="46" rx="1" fill="currentColor" />
      <circle cx="28" cy="40" r="11.5" fill="none" stroke="currentColor" strokeWidth="8" />
      <circle cx="28" cy="40" r="3.6" fill="var(--gold-pt)" />
    </svg>
  )
}

export function Lockup({ big = false }: { big?: boolean }) {
  return (
    <span className={big ? 'lockup big' : 'lockup'}>
      <Symbol />
      <span className="wm">
        Anwar<i className="pt" />
      </span>
    </span>
  )
}

/** "a." closes the studio's long-form writing, like a magazine's end mark. */
export function EndMark() {
  return (
    <span className="endmark" aria-hidden="true">
      a<i className="pt" />
    </span>
  )
}
