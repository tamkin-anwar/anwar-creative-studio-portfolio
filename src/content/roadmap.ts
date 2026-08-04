export type RoadmapStatus = 'in progress' | 'planned' | 'exploring'

export type RoadmapEntry = {
  name: string
  status: RoadmapStatus
  blurb: string
}

export const roadmap: RoadmapEntry[] = [
  {
    name: 'Gardens',
    status: 'in progress',
    blurb: 'A slower, plant-tending kind of app — early days.',
  },
  {
    name: 'Looms',
    status: 'planned',
    blurb: 'Pattern-making tools, still taking shape.',
  },
  {
    name: 'Unnamed',
    status: 'exploring',
    blurb: 'Something new — not ready to name yet.',
  },
]
