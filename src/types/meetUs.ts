export interface TeamMember {
  name: string
  title: string
  imageSrc: string | null
  imageAlt: string
}

export interface MeetUsPageContent {
  eyebrow: string
  title: string
  members: TeamMember[]
}
