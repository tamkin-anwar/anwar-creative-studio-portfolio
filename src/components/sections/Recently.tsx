import { journal } from '../../content/journal'

const BASE = import.meta.env.BASE_URL
const short = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

// The three newest journal entries: dated proof the studio is shipping.
export function Recently() {
  return (
    <section className="sec" aria-labelledby="recently-title">
      <p className="kicker">Where things stand</p>
      <h2 className="h2" id="recently-title">Recently.</h2>
      <div className="stand">
        {journal.slice(0, 3).map((entry) => (
          <a key={`${entry.date}-${entry.title}`} href={`${BASE}journal/`}>
            <time dateTime={entry.date}>{short(entry.date)}</time>
            <span>{entry.title}</span>
            <em>{entry.product}</em>
          </a>
        ))}
      </div>
      <a className="tlink more" href={`${BASE}journal/`}>The full journal →</a>
    </section>
  )
}
