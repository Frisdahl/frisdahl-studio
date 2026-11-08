export interface TeamMember {
  name: string
  imageSrc: string | null
  imageAlt: string
}

export interface MeetUsTopic {
  /** The number beside the text; leave it out for a topic without one. */
  number?: string
  title: string
  /** Plain text under the heading. */
  text?: string
  /**
   * Content taken from the footer data instead of text: the place line (town,
   * country and flag), the social links, or the email with the contact button.
   */
  kind?: 'location' | 'socials' | 'contact'
}

export interface MeetUsPageContent {
  /** The page's heading, kept for screen readers and the page label only. */
  title: string
  /** The paragraphs beside the portrait. */
  intro: string[]
  /** Topics under the paragraphs: a heading, with its (optional) number and content beneath. */
  topics: MeetUsTopic[]
  members: TeamMember[]
}
