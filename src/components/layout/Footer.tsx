import type { IconType } from 'react-icons'
import { FaBehance, FaFacebookF, FaGithub } from 'react-icons/fa6'
import { HiEnvelope } from 'react-icons/hi2'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useLocale } from '../../context/LocaleContext'
import { getFooterContent, type FooterSocialLink } from '../../data/footer'
import { CASES_PATH } from '../../lib/routes'
import { BrandWordmark, Container } from '../ui'

function FooterLogo({ label }: { label: string }) {
  return (
    <Link to="/" className="site-footer-logo" aria-label={label}>
      <BrandWordmark />
    </Link>
  )
}

const socialIcons: Record<FooterSocialLink['icon'], IconType> = {
  facebook: FaFacebookF,
  behance: FaBehance,
  github: FaGithub,
}

function FooterSocialLinks({ links }: { links: readonly FooterSocialLink[] }) {
  if (links.length === 0) return null

  return (
    <div className="site-footer-social">
      {links.map((social) => {
        const Icon = socialIcons[social.icon]

        return (
          <a
            key={social.icon}
            href={social.href}
            className="site-footer-social-link"
            aria-label={social.label}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Icon className="h-5 w-5" aria-hidden />
          </a>
        )
      })}
    </div>
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

  return (
    <footer className="site-footer">
      {/* Full container so the footer frames the page on the same edges as the header. */}
      <Container fullWidth>
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <FooterLogo label={footer.logoLabel} />
            <FooterSocialLinks links={footer.socialLinks} />
          </div>

          <nav className="site-footer-nav" aria-label={footer.columnsAriaLabel}>
            <div className="site-footer-columns">
              {footer.columns.map((column, columnIndex) => (
                <div
                  key={column.links[0]?.href ?? columnIndex}
                  className="site-footer-column"
                >
                  <ul className="site-footer-links">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} className="site-footer-link">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <hr className="site-footer-divider" />

        <div className="site-footer-middle">
          <a href={footer.emailHref} className="site-footer-contact-link">
            <HiEnvelope className="site-footer-contact-icon" aria-hidden="true" />
            <span>{footer.email}</span>
          </a>

          <div className="site-footer-location">
            <p className="site-footer-location-title">{footer.locationTitle}</p>
            <p className="site-footer-address">{footer.address}</p>
          </div>
        </div>

        <hr className="site-footer-divider" />

        <div className="site-footer-bottom">
          <ul className="site-footer-legal">
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="site-footer-legal-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="site-footer-meta">
            <p className="site-footer-copyright">{footer.copyright}</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
