export type RoadmapStatus = 'in progress' | 'planned' | 'exploring'

export type RoadmapEntry = {
  name: string
  status: RoadmapStatus
  blurb: string
}

export const roadmap: RoadmapEntry[] = [
  {
    name: 'Looms',
    status: 'planned',
    blurb: 'Pattern-making tools, still taking shape.',
  },
  {
    name: 'Unnamed',
    status: 'exploring',
    blurb: 'Something new, not ready to name yet.',
  },
]
