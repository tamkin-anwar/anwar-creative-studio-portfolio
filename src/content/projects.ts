import { links } from './links'

export type Project = {
  motion: 'doorsong' | 'tether' | 'jotfield' | 'stub'
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
        "Every instrument is synthesized live, not sampled. The ektara's buzz comes from a sawtooth wave through a lowpass filter, with a pitch wobble that mimics a bent bamboo neck. The oud adds a constant low tone under every pluck, modeling its soundhole as a resonating cavity. The hanging strands move on a real damped spring equation.",
    },
  },
  {
    motion: 'tether',
    name: 'Tether',
    tagline: 'The same scene, at the same second.',
    description:
      'Watch Netflix, Hulu, Disney+, Crunchyroll, Max, and YouTube together from anywhere. Tether keeps play, pause, and seeking aligned, corrects drift, and gives two people shared notes and chat.',
    evidence: '6 streaming services',
    url: links.tether,
    // versioned: this one's still being iterated on, bump the number each
    // time the asset changes so browsers don't serve a stale cached image
    previewImage: `${import.meta.env.BASE_URL}tether-mark-wide.webp?v=3`,
    reducedMotionImage: `${import.meta.env.BASE_URL}tether-mark-wide.webp?v=3`,
    build: {
      stack: ['Manifest V3', 'Firebase REST', 'No SDK'],
      detail:
        "Tether skips the Firebase SDK entirely. It syncs with plain fetch calls and a server-sent-events stream, which keeps it clear of Manifest V3's remote-code restrictions. Clock sync is hand-rolled: a timestamp write round-trips to estimate the server's real clock, then corrects playback for exactly how long each message took in transit.",
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
    previewImage: `${import.meta.env.BASE_URL}jotfield-mark-wide.svg?v=3`,
    reducedMotionImage: `${import.meta.env.BASE_URL}jotfield-mark-wide.svg?v=3`,
    build: {
      stack: ['Vanilla JS', 'Web Crypto API', 'Supabase'],
      detail:
        "Sync is end-to-end encrypted. Notes are encrypted with AES-256-GCM in the browser before they ever leave it, using a key derived from a passphrase that's never transmitted. Supabase only ever sees ciphertext.",
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
        'Your personal list and a shared list are the same database table, just pointed at a different owner. Two ratings on one title come from a separate table, one row per person. Access control runs entirely on Postgres row-level security.',
    },
  },
]
