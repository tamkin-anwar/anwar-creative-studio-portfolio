export type RoadmapStatus = 'in progress' | 'planned'

export type RoadmapEntry = {
  name: string
  status: RoadmapStatus
  blurb: string
  href?: string
}

export const roadmap: RoadmapEntry[] = [
  {
    name: 'Ranna',
    status: 'planned',
    blurb: "Mom's handwritten recipes, kept for the next generation.",
  },
]
