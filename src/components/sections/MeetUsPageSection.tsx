import { useLocale } from '../../context/LocaleContext'
import { getFooterContent } from '../../data/footer'
import { getMeetUsPageContent } from '../../data/meetUs'
import { CONTACT_PATH } from '../../lib/routes'
import type { MeetUsTopic, TeamMember } from '../../types/meetUs'
import { responsiveImageProps } from '../../lib/responsiveImage'
import { FooterLink } from '../layout/Footer'
import { ArrowButton, Container, DanishFlagIcon } from '../ui'

// Full width on phones, half on tablets, three of the twelve columns from desktop.
const MEMBER_IMAGE_SIZES = '(min-width: 64rem) 24vw, (min-width: 48rem) 50vw, 100vw'

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
    </article>
  )
}

export function MeetUsPageSection() {
  const { locale } = useLocale()
  const { title, intro, topics, members } = getMeetUsPageContent(locale)
  // The place, links and email come from the footer data, like in the menu.
  const footer = getFooterContent(locale)

  const renderTopicContent = (topic: MeetUsTopic) => {
    switch (topic.kind) {
      case 'location':
        return (
          <p className="meet-us-topic-text meet-us-topic-location">
            <span>
              {footer.locationTitle}, {footer.country}
            </span>
            <DanishFlagIcon />
          </p>
        )
      case 'socials':
        return (
          // The footer's own link, so the underline and its hover animation are the same.
          <ul className="site-footer-links">
            {footer.socialLinks.map((social) => (
              <li key={social.href}>
                <FooterLink href={social.href} target="_blank" rel="noreferrer noopener">
                  {social.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        )
      case 'contact':
        return (
          <div className="meet-us-topic-contact">
            <FooterLink href={footer.emailHref} withArrow>
              {footer.email}
            </FooterLink>
            <ArrowButton href={CONTACT_PATH}>{footer.ctaButton}</ArrowButton>
          </div>
        )
      default:
        return <p className="meet-us-topic-text">{topic.text}</p>
    }
  }

  return (
    <section className="meet-us-page relative isolate" aria-label={title}>
      {/* No visible heading; the page still needs its h1. */}
      <h1 className="sr-only">{title}</h1>
      <Container columns className="relative z-[1]">
        <div className="meet-us-team">
          {members.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
          <div className="meet-us-text">
            <div className="meet-us-intro">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {topics.map((topic, index) => (
              <section key={topic.title} className="meet-us-topic" aria-labelledby={`meet-us-topic-${index}`}>
                <h2 id={`meet-us-topic-${index}`} className="meet-us-topic-title">
                  {topic.title}
                </h2>
                <div className={`meet-us-topic-body${topic.number ? '' : ' meet-us-topic-body-plain'}`}>
                  {topic.number && <span className="meet-us-topic-number">{topic.number}</span>}
                  {renderTopicContent(topic)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
