export type RoadmapStatus = 'in progress'

export type RoadmapEntry = {
  name: string
  status: RoadmapStatus
  blurb: string
}

export const roadmap: RoadmapEntry[] = [
  {
    name: 'Ranna',
    status: 'in progress',
    blurb: "Mom's handwritten recipes, kept for the next generation.",
  },
]
