import { PageShell } from '../components/PageShell'
import { EndMark } from '../components/identity/Lockup'

const BASE = import.meta.env.BASE_URL

// Pieces made to try out an idea, kept apart from the products the way
// Google keeps "Experiments with Google" apart from its own: a title, what
// it is, who it's by or after, and a link.
const experiments = [
  {
    name: 'Doorsong',
    kind: 'Interactive website',
    href: `${BASE}experiments/doorsong/`,
    image: `${BASE}experiments/doorsong/og-image.jpg`,
    alt: 'Doorsong: a red doorway hung with strands, under the line One time, one meeting',
    line: 'Six doorways, each tuned to a different place. Sweep through the hanging strands and each one rings with its own instrument: a bronze temple bell for China, a glass furin for Japan, an ektara for Bengal, bamboo for Việt Nam, an oud for Morocco and a marimba for México.',
    detail: 'Every sound is synthesized in the browser as you play, with no recordings, and each strand swings and settles like a real one.',
    credit: 'Inspired by Marina Budarina’s doors of the world idea.',
  },
]

export function ExperimentsPage() {
  return (
    <PageShell eyebrow="Experiments">
      <div className="prose-page flex flex-col gap-[var(--space-3)]">
        <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
          Experiments.
        </h1>
        <p>
          Small pieces we make to try out an idea: a sound, a motion, a new way of building something.
          They aren&rsquo;t products, so they don&rsquo;t get updates or support.
        </p>
        {experiments.map((item) => (
          <article key={item.name} className="experiment">
            <a href={item.href} className="experiment-shot" aria-label={`Open ${item.name}`}>
              <img src={item.image} alt={item.alt} width={1200} height={630} loading="lazy" decoding="async" />
            </a>
            <p className="font-mono journal-meta">{item.kind}</p>
            <h2 className="journal-title">{item.name}</h2>
            <p>{item.line}</p>
            <p>{item.detail}</p>
            <p className="experiment-credit">{item.credit}</p>
            <p>
              <a className="hit" href={item.href}>Open {item.name} &rarr;</a> <span className="experiment-note">Turn your sound on.</span>
            </p>
          </article>
        ))}
        <p>
          Our products are <a href={`${BASE}#artha`}>Artha</a>, <a href={`${BASE}#corres`}>Corres</a> and{' '}
          <a href={`${BASE}#more`}>Tether</a>.&nbsp;<EndMark />
        </p>
      </div>
    </PageShell>
  )
}
