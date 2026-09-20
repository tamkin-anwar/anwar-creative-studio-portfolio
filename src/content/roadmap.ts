export type RoadmapStatus = 'in progress' | 'In development'

export type RoadmapEntry = {
  name: string
  status: RoadmapStatus
  blurb: string
  href?: string
}

export const roadmap: RoadmapEntry[] = [
  {
    name: 'Corres', status: 'In development',
    blurb: 'Email, considered. Building the native iPhone experience, starting with Brief, Needs You, and Waiting.',
    href: `${import.meta.env.BASE_URL}#corres`,
  },
  {
    name: 'Ranna',
    status: 'in progress',
    blurb: "Mom's handwritten recipes, kept for the next generation.",
  },
]
