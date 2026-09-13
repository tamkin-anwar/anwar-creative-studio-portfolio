import { links } from './links'

export type Project = {
  name: string
  tagline: string
  description: string
  url: string
  previewImage?: string
  reducedMotionImage?: string
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
    tagline: 'Understand your money. Plan what comes next.',
    description:
      'Track spending, budgets, bills, notes, and your calendar in one private workspace. Import statements, model major decisions, and approve actions from a built-in assistant.',
    url: links.artha,
    previewImage: `${import.meta.env.BASE_URL}artha-mark-wide.webp`,
  },
  {
    name: 'Tether',
    tagline: 'The same scene, at the same second.',
    description:
      'Watch Netflix, Hulu, Disney+, Crunchyroll, and Max together from anywhere. Tether keeps play, pause, and seeking aligned, corrects drift, and gives two people shared notes and chat.',
    url: links.tether,
    // versioned: this one's still being iterated on, bump the number each
    // time the asset changes so browsers don't serve a stale cached image
    previewImage: `${import.meta.env.BASE_URL}tether-mark-wide.webp?v=3`,
  },
  {
    name: 'Jotfield',
    tagline: 'A place for every thought.',
    description:
      'A private, local-first notebook with fast capture, rich writing, tasks, backlinks, daily notes, and optional encrypted sync across your devices.',
    url: links.jotfield,
    previewImage: `${import.meta.env.BASE_URL}jotfield-mark-wide.gif?v=1`,
    reducedMotionImage: `${import.meta.env.BASE_URL}jotfield-mark-wide.webp?v=1`,
  },
  {
    name: 'Stub',
    tagline: "Everything you've watched, and what you made of it.",
    description:
      "Every film and show you've seen, with your own rating and notes and the IMDb, Rotten Tomatoes and Metacritic scores. One list stays yours; the other you share with the person you watch with.",
    url: links.stub,
    previewImage: `${import.meta.env.BASE_URL}stub-mark-wide.webp?v=3`,
  },
]
