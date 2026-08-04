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
    tagline: 'An ambient audio-visual instrument, played by scroll and touch.',
    description:
      'A living title card built with physics-driven strands and ambient sound, the first shipped project from the studio.',
    url: links.doorsong,
    previewImage: `${import.meta.env.BASE_URL}doorsong-mark.svg`,
  },
  {
    name: 'Artha',
    tagline: 'A self-hosted personal finance dashboard, with no tracking.',
    description:
      'Your numbers stay yours: nothing leaves the box it runs on, no analytics, no accounts sold to anyone.',
    url: links.artha,
  },
]
