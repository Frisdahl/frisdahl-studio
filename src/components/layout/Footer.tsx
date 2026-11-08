import { useRef, useState, type AnchorHTMLAttributes } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { useLocale } from '../../context/LocaleContext'
import { getFooterContent } from '../../data/footer'
import { CASES_PATH, CONTACT_PATH } from '../../lib/routes'
import { scrollToTarget } from '../../lib/scroll'
import { ArrowIcon, Container, ArrowButton } from '../ui'

type UnderlinePhase = 'idle' | 'in' | 'held' | 'out'

/**
 * A footer link with a sliding underline: it grows in from the left on hover
 * and leaves to the right on hover out. Each slide always plays through, so a
 * quick in-and-out shows the whole line sweep across instead of flashing: the
 * phase only moves on when the running slide has ended (animationend), and
 * the keyframes are in index.css (.site-footer-link[data-phase]).
 */
export function FooterLink({
  children,
  withArrow = false,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { withArrow?: boolean }) {
  const [phase, setPhase] = useState<UnderlinePhase>('idle')
  const active = useRef({ pointer: false, focus: false })
  const phaseRef = useRef<UnderlinePhase>('idle')

  const go = (next: UnderlinePhase) => {
    phaseRef.current = next
    setPhase(next)
  }
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isActive = () => active.current.pointer || active.current.focus

  const sync = () => {
    const current = phaseRef.current
    if (reduced()) {
      go(isActive() ? 'held' : 'idle')
    } else if (isActive() && current === 'idle') {
      go('in')
    } else if (!isActive() && current === 'held') {
      go('out')
    }
    // During a running slide nothing changes here: onAnimationEnd decides.
  }

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLAnchorElement>) => {
    if (!event.animationName.startsWith('footer-underline')) return
    if (phaseRef.current === 'in') go(isActive() ? 'held' : 'out')
    else if (phaseRef.current === 'out') go(isActive() ? 'in' : 'idle')
  }

  return (
    <a
      {...props}
      className={className ? `site-footer-link ${className}` : 'site-footer-link'}
      data-phase={phase}
      onPointerEnter={() => {
        active.current.pointer = true
        sync()
      }}
      onPointerLeave={() => {
        active.current.pointer = false
        sync()
      }}
      onFocus={(event) => {
        active.current.focus = event.currentTarget.matches(':focus-visible')
        sync()
      }}
      onBlur={() => {
        active.current.focus = false
        sync()
      }}
      onAnimationEnd={handleAnimationEnd}
    >
      {withArrow && (
        <span className="site-footer-link-icon" aria-hidden="true">
          <ArrowIcon />
        </span>
      )}
      {children}
    </a>
  )
}

export function Footer() {
  const { locale } = useLocale()
  const { pathname } = useLocation()
  const isCaseDetailPage = Boolean(
    matchPath({ path: `${CASES_PATH}/:caseSlug`, end: true }, pathname),
  )
  const footer = getFooterContent(locale)

  if (isCaseDetailPage) {
    return null
  }

  const { columnTitles } = footer

  return (
    <footer className="site-footer">
      {/* Full container so the footer frames the page on the same edges as the header. */}
      <Container fullWidth className="site-footer-inner">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <h2 className="site-footer-logo">{footer.ctaTitle}</h2>

            <div className="site-footer-cta-row">
              <ArrowButton href={CONTACT_PATH}>{footer.ctaButton}</ArrowButton>
              <ul className="site-footer-links site-footer-cta-links">
                <li>
                  <FooterLink href={footer.emailHref} withArrow>
                    {footer.email}
                  </FooterLink>
                </li>
                {footer.phone && (
                  <li>
                    <FooterLink href={footer.phoneHref}>
                      {footer.phone}
                    </FooterLink>
                  </li>
                )}
              </ul>
            </div>

            <div className="site-footer-link-columns">
              <nav className="site-footer-column" aria-label={footer.navAriaLabel}>
                <h2 className="site-footer-column-title">{columnTitles.nav}</h2>
                <ul className="site-footer-links site-footer-links-nav">
                  {footer.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href}>
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {footer.socialLinks.length > 0 && (
                <div className="site-footer-column">
                  <h2 className="site-footer-column-title">{columnTitles.contact}</h2>
                  <ul className="site-footer-links">
                    {footer.socialLinks.map((social) => (
                      <li key={social.href}>
                        <FooterLink href={social.href} target="_blank" rel="noreferrer noopener">
                          {social.label}
                        </FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="site-footer-cta">
            <img
              className="site-footer-image"
              src={footer.image.src}
              alt={footer.image.alt}
              width={1496}
              height={1122}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="site-footer-bottom-start">
            <p className="site-footer-copyright">{footer.copyright}</p>
          </div>
          <button type="button" className="site-footer-top-button" onClick={() => scrollToTarget(0)}>
            {footer.backToTop}
          </button>
        </div>
      </Container>
    </footer>
  )
}
