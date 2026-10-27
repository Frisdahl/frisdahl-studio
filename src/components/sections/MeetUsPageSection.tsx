import { useLocale } from '../../context/LocaleContext'
import { getMeetUsPageContent } from '../../data/meetUs'
import type { TeamMember } from '../../types/meetUs'
import { responsiveImageProps } from '../../lib/responsiveImage'
import { Container } from '../ui'

// One column on phones, two on tablets, three from desktop.
const MEMBER_IMAGE_SIZES = '(min-width: 64rem) 30vw, (min-width: 48rem) 50vw, 100vw'

interface TeamMemberCardProps {
  member: TeamMember
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="meet-us-member">
      <div className="meet-us-member-portrait">
        {member.imageSrc ? (
          <img
            {...responsiveImageProps(member.imageSrc, MEMBER_IMAGE_SIZES)}
            alt={member.imageAlt}
            className="meet-us-member-image"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="meet-us-member-placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="meet-us-member-meta">
        <p className="meet-us-member-name">{member.name}</p>
        <p className="meet-us-member-title">{member.title}</p>
      </div>

      <div className="meet-us-member-overlay">
        <p className="meet-us-member-overlay-label">{member.bioLabel}</p>
        <p className="meet-us-member-overlay-text">{member.bio}</p>
      </div>
    </article>
  )
}

export function MeetUsPageSection() {
  const { locale } = useLocale()
  const { eyebrow, title, members } = getMeetUsPageContent(locale)

  return (
    <section className="meet-us-page relative isolate py-section-sm lg:py-section" aria-label={title}>
      <Container className="relative z-[1]">
        <div className="cases-page-intro">
          <p className="eyebrow eyebrow-accent">{eyebrow}</p>
          <h1 className="cases-page-title mt-md">{title}</h1>
        </div>

        <div className="cases-page-divider" role="separator" aria-hidden="true" />

        <div className="meet-us-team">
          {members.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </Container>
    </section>
  )
}
