// Every qualifier on the homepage, spelled out the way Apple and Stripe do
// at the foot of their pages. Numbers match the superscripts above.
const notes = [
  'Betas are installed with Apple’s free TestFlight app. Each beta build works for up to 90 days, and a newer build replaces it before then.',
  'Artha Pro isn’t on sale yet. During the beta everyone has it, and anyone who joins before it goes on sale keeps it free. Then it’s $9.99 a month or $79.99 a year in the US after a one-month free trial; Artha itself stays free.',
  'Corres Pro is included free in the TestFlight beta. After launch it’s $14.99 a month or $149.99 a year in the US after a two-week free trial; mail stays free.',
  'Artha needs iOS, iPadOS, macOS or watchOS 26 or later, or a current web browser. Corres needs iOS or iPadOS 17, macOS 15 or watchOS 10 or later. Corres summaries and suggested replies need a device with Apple Intelligence.',
  'Until Google finishes reviewing Corres, Gmail works in the beta only for addresses added to Google’s test list, and Google asks testers to sign in again every seven days. Outlook, iCloud and other email work right away.',
]

// One mark per qualifier; several notes on one word are listed as 1, 2
// so they never read as a single number.
export function Fn({ n }: { n: number | number[] }) {
  const ns = Array.isArray(n) ? n : [n]
  return (
    <sup className="fn">
      {ns.map((k, i) => (
        <span key={k}>{i > 0 ? ', ' : ''}<a href={`#fn-${k}`} aria-label={`Footnote ${k}`}>{k}</a></span>
      ))}
    </sup>
  )
}

export function Footnotes() {
  return (
    <section className="footnotes" aria-label="Footnotes">
      <ol>
        {notes.map((note, i) => (
          <li key={i} id={`fn-${i + 1}`}>{note}</li>
        ))}
      </ol>
      <p>The app screens on this page are drawn in code from the real apps, with sample figures and made-up people.</p>
    </section>
  )
}
