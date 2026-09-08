import { links } from './links'

export type Project = {
  name: string
  tagline: string
  description: string
  url: string
  previewImage?: string
}

export const projects: Project[] = [
  {
    name: 'Doorsong',
    tagline: 'Six cultural doorways, each with its own hand-built instrument.',
    description:
      'Hover or touch the strands and they swing and ring, tuned to how the real instrument actually sounds, a bell, an oud, an ektara, a marimba, not just synth presets.',
    url: links.doorsong,
    previewImage: `${import.meta.env.BASE_URL}doorsong-mark-wide.webp`,
  },
  {
    name: 'Artha',
    tagline: 'Your money, actually organized.',
    description:
      'Transactions, budgets, notes, and your calendar, all in one place. Ask, and the AI Assistant adds it for you.',
    url: links.artha,
    previewImage: `${import.meta.env.BASE_URL}artha-mark-wide.webp`,
  },
  {
    name: 'Tether',
    tagline: "Watch together, even when you can't be.",
    description:
      'A Chrome extension that keeps Netflix, Hulu, and Disney+ in sync between two people, anywhere, plus shared notes and chat. In review on the Chrome Web Store.',
    url: links.tether,
    // versioned: this one's still being iterated on, bump the number each
    // time the asset changes so browsers don't serve a stale cached image
    previewImage: `${import.meta.env.BASE_URL}tether-mark-wide.webp?v=3`,
  },
  {
    name: 'Stub',
    tagline: "Everything you've watched, rated together.",
    description:
      "Log films and shows as you watch, rate them next to someone else's score, and see IMDb, Rotten Tomatoes, and Metacritic on every title. Pair up for a shared list, or keep your own.",
    url: links.stub,
    previewImage: `${import.meta.env.BASE_URL}stub-mark-wide.webp?v=3`,
  },
]
