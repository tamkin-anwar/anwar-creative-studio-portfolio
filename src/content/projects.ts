import { links } from './links'

export type Project = {
  motion: 'doorsong' | 'artha' | 'tether' | 'jotfield' | 'stub'
  name: string
  tagline: string
  description: string
  evidence: string
  url: string
  previewImage?: string
  reducedMotionImage?: string
  previewVideoWebm?: string
  previewVideoMp4?: string
  build: {
    stack: string[]
    detail: string
  }
}

export const projects: Project[] = [
  {
    motion: 'doorsong',
    name: 'Doorsong',
    tagline: 'Six doorways, each tuned to a different place.',
    description:
      'Move the hanging strands and they swing and ring like temple bells, wind chimes, an ektara, bamboo, an oud, and a marimba. Every sound is synthesized live.',
    evidence: '6 instruments synthesized live',
    url: links.doorsong,
    previewImage: `${import.meta.env.BASE_URL}doorsong-mark-wide.webp`,
    reducedMotionImage: `${import.meta.env.BASE_URL}doorsong-mark-wide.webp`,
    build: {
      stack: ['Vanilla JS', 'Web Audio API', 'No build step'],
      detail:
        "Every instrument is synthesized from real acoustic mechanics, not samples: the ektara's buzz comes from a sawtooth wave through a lowpass filter with a pitch wobble that mimics a bent bamboo neck, and the oud gets a constant low tone under every pluck to model its soundhole as a resonating cavity. The hanging strands run on an actual damped spring equation, not a canned animation.",
    },
  },
  {
    motion: 'artha',
    name: 'Artha',
    tagline: 'Understand your money. Plan what comes next.',
    description:
      'Track spending, budgets, bills, notes, and your calendar in one private workspace. Import statements, model major decisions, and approve actions from a built-in assistant.',
    evidence: '353 automated tests',
    url: links.artha,
    previewImage: `${import.meta.env.BASE_URL}artha-mark-wide.webp`,
    reducedMotionImage: `${import.meta.env.BASE_URL}artha-mark-wide.webp`,
    build: {
      stack: ['Flask', 'SQLAlchemy', 'Postgres', 'Claude API'],
      detail:
        'The AI assistant calls Claude directly, but nothing it proposes runs on its own: every tool call becomes a card you have to approve, and only then does it hit the same validated route a manual entry would. The test suite is real integration tests against actual routes and a database, not mocks.',
    },
  },
  {
    motion: 'tether',
    name: 'Tether',
    tagline: 'The same scene, at the same second.',
    description:
      'Watch Netflix, Hulu, Disney+, Crunchyroll, and Max together from anywhere. Tether keeps play, pause, and seeking aligned, corrects drift, and gives two people shared notes and chat.',
    evidence: '5 streaming services',
    url: links.tether,
    // versioned: this one's still being iterated on, bump the number each
    // time the asset changes so browsers don't serve a stale cached image
    previewImage: `${import.meta.env.BASE_URL}tether-mark-wide.webp?v=3`,
    reducedMotionImage: `${import.meta.env.BASE_URL}tether-mark-wide.webp?v=3`,
    build: {
      stack: ['Manifest V3', 'Firebase REST', 'No SDK'],
      detail:
        "No Firebase SDK at all, just plain fetch calls and a server-sent-events stream, to stay clear of Chrome's remote-code restrictions in Manifest V3. The clock sync is hand-rolled too: it round-trips a timestamp write to estimate the server's real clock, then corrects for exactly how long a message took in transit.",
    },
  },
  {
    motion: 'jotfield',
    name: 'Jotfield',
    tagline: 'A place for every thought.',
    description:
      'Open it and start writing. Organize later with spaces, tags, tasks, and daily notes. Everything stays on your device unless you turn on encrypted sync.',
    evidence: 'End-to-end encrypted sync',
    url: links.jotfield,
    previewImage: `${import.meta.env.BASE_URL}jotfield-mark-wide.webp?v=2`,
    reducedMotionImage: `${import.meta.env.BASE_URL}jotfield-mark-wide.webp?v=1`,
    previewVideoWebm: `${import.meta.env.BASE_URL}jotfield-mark-wide.webm?v=2`,
    previewVideoMp4: `${import.meta.env.BASE_URL}jotfield-mark-wide.mp4?v=2`,
    build: {
      stack: ['Vanilla JS', 'Web Crypto API', 'Supabase'],
      detail:
        "Sync is genuinely end-to-end encrypted: notes are AES-256-GCM encrypted in the browser before they ever leave it, with a key derived from a passphrase that's never transmitted. Supabase only ever sees ciphertext.",
    },
  },
  {
    motion: 'stub',
    name: 'Stub',
    tagline: 'What we watched, and what we thought.',
    description:
      'Keep your own film and TV list, make one with a friend, and rate everything separately. See what you agree on and choose what to watch next.',
    evidence: 'Separate ratings on shared lists',
    url: links.stub,
    previewImage: `${import.meta.env.BASE_URL}stub-mark-wide.webp?v=3`,
    reducedMotionImage: `${import.meta.env.BASE_URL}stub-mark-wide.webp?v=3`,
    build: {
      stack: ['React', 'Supabase', 'Postgres RLS', 'TMDB via Vercel Edge'],
      detail:
        'The shared list and your personal list are the same database table, just pointed at a different owner. Two ratings on one title come from a separate table with one row per person, and access control is pure Postgres row-level security, not app-side checks.',
    },
  },
]
