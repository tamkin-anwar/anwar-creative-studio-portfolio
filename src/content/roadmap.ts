export type RoadmapStatus = 'in progress' | 'planned' | 'exploring'

export type RoadmapEntry = {
  name: string
  status: RoadmapStatus
  blurb: string
}

export const roadmap: RoadmapEntry[] = [
  {
    name: 'Ranna',
    status: 'planned',
    blurb: "Digitizing the recipes that only live in mom's handwriting.",
  },
  {
    name: 'Unnamed',
    status: 'exploring',
    blurb: 'Something new, not ready to name yet.',
  },
]
