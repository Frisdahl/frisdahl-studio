import { MaskedLineReveal } from '../ui/MaskedLineReveal'
import { LoopVideo } from '../ui/LoopVideo'
import { STAGGER } from '../../lib/motion'
import { ROW_REVEAL, keywordsWithDots } from './caseCardText'

export interface CaseVideoCardProps {
  client: string
  keywords: string
  videoSrc: string
  /** The still the clip starts from, and what reduced motion shows. */
  posterSrc: string
  imageAlt: string
}

/**
 * A tall frame showing the centre of a landscape (4:3) clip, the phone in the middle of it, with its
 * title and keywords underneath, in the same text style as the project rows. It stands beside a project on the home page (CSS: .case-card-portrait) and
 * drops under it on narrower screens. It plays while it is on screen. Not a link: there is no
 * case page for it.
 */
export function CaseVideoCard({ client, keywords, videoSrc, posterSrc, imageAlt }: CaseVideoCardProps) {
  return (
    <div className="case-card case-card-meta-below case-card-portrait">
      <div className="case-card-meta">
        <MaskedLineReveal as="h3" className="case-card-client" {...ROW_REVEAL}>
          {client}
        </MaskedLineReveal>
        <MaskedLineReveal as="p" className="case-card-keywords" {...ROW_REVEAL} delay={STAGGER.lines}>
          {keywordsWithDots(keywords)}
        </MaskedLineReveal>
      </div>
      <div className="case-card-media">
        <LoopVideo src={videoSrc} poster={posterSrc} label={imageAlt} className="case-card-image case-card-video" mode="visible" />
      </div>
    </div>
  )
}
