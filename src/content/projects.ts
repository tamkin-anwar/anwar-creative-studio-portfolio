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
      'A living title card built with physics-driven strands and ambient sound, the first shipped project from the studio.',
    url: links.doorsong,
    previewImage: `${import.meta.env.BASE_URL}doorsong-mark-wide.webp`,
  },
  {
    name: 'Artha',
    tagline: 'A self-hosted personal finance dashboard, with no tracking.',
    description:
      'Your numbers stay yours: nothing leaves the box it runs on, no analytics, no accounts sold to anyone.',
    url: links.artha,
    previewImage: `${import.meta.env.BASE_URL}artha-mark-wide.webp`,
  },
]
