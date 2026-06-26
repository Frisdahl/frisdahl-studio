import type { IconType } from 'react-icons'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useLocale } from '../../context/LocaleContext'
import { getFooterContent, type FooterSocialLink } from '../../data/footer'
import { useBrandWordmarkAnimation } from '../../hooks/useBrandWordmarkAnimation'
import { BrandWordmark, Container } from '../ui'

function FooterLogo({ label }: { label: string }) {
  const { phase, wordmarkHandlers } = useBrandWordmarkAnimation()

  return (
    <Link to="/" className="site-footer-logo" aria-label={label} {...wordmarkHandlers}>
      <BrandWordmark phase={phase} />
    </Link>
  )
}

const socialIcons: Record<FooterSocialLink['icon'], IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
}

function FooterSocialLinks({ links }: { links: readonly FooterSocialLink[] }) {
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
  const footer = getFooterContent(locale)

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer-top">
          <FooterLogo label={footer.logoLabel} />

          <nav className="site-footer-nav" aria-label={footer.columnsAriaLabel}>
            <div className="site-footer-columns">
              {footer.columns.map((column) => (
                <div key={column.title} className="site-footer-column">
                  <p className="site-footer-column-title">{column.title}</p>
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
          <FooterSocialLinks links={footer.socialLinks} />

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
            <a href={footer.phoneHref} className="site-footer-phone">
              {footer.phone}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
